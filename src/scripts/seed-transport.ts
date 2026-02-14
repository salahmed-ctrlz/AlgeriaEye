import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load Environment Variables
const envPath = path.resolve(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const envVars: Record<string, string> = {};

envContent.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
        envVars[key.trim()] = value.trim();
    }
});

const SUPABASE_URL = envVars["NEXT_PUBLIC_SUPABASE_URL"];
const SERVICE_KEY = envVars["SUPABASE_SERVICE_ROLE_KEY"];
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function seedTransport() {
    console.log("Creating Transport Listing...");

    // Get central user
    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users.users.find(u => u.email === "test@travel.agency");

    if (!user) {
        console.error("User not found");
        return;
    }

    const { error } = await supabase.from("listings").insert({
        owner_id: user.id,
        title: "Samir Car Rental",
        description: "Best car rental service in Algiers. Wide range of vehicles available.",
        type: "transport",
        wilaya: "Algiers",
        address: "Houari Boumediene Airport",
        price_per_night: 4500, // Price per day
        images: ["/images/placeholders/car-rental.jpg"],
        features: ["AC", "Insurance Included", "Unlimited Mileage"],
        created_at: new Date().toISOString()
    });

    if (error) {
        console.error("INSERT FAILED:", error);
    } else {
        console.log("INSERT SUCCESS: Samir Car Rental created.");
    }
}

seedTransport();
