
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const envVars: Record<string, string> = {};
envContent.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) envVars[key.trim()] = value.trim();
});

const supabase = createClient(envVars["NEXT_PUBLIC_SUPABASE_URL"]!, envVars["SUPABASE_SERVICE_ROLE_KEY"]!);

const CONSTANTINE_COORDS = [
    { title: "Constantine Marriott Hotel", lat: 36.347806, lng: 6.616500 },
    { title: "Novotel Constantine", lat: 36.365219, lng: 6.606903 },
    { title: "ibis Constantine", lat: 36.365423, lng: 6.606941 },
    { title: "Restaurant La Concorde", lat: 36.365, lng: 6.614 },
    // Approximate for Scodella and Meet and Eat as exact coords weren't in URL, but they are in Constantine.
    // I will use a central location near other hotels if not precise, but best to leave null or try to approximate.
    // User sent search links. I will omit for now if I can't be sure, OR use a generic city center coord + random offset to avoid overlap?
    // Let's use generic center for now or try to extract from previous knowledge if any.
    // Actually, I'll just skip Scodella and Meet and Eat coordinates update if I don't have them, OR use the Novotel coords as they are likely central.
    // Better to have some map presence.
];

async function updateConstantine() {
    console.log("Updating Constantine Listings Coordinates...");

    for (const item of CONSTANTINE_COORDS) {
        const { error } = await supabase
            .from("listings")
            .update({ location_lat: item.lat, location_lng: item.lng })
            .ilike("title", `%${item.title}%`); // Use ILIKE for loose match

        if (error) {
            console.error(`Error updating ${item.title}:`, error.message);
        } else {
            console.log(`Updated ${item.title}`);
        }
    }
    console.log("Done.");
}

updateConstantine();
