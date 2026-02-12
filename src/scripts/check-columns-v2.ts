
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

async function checkColumns() {
    console.log("Checking for Sofitel coordinates...");
    const { data, error } = await supabase
        .from("listings")
        .select("title, location_lat, location_lng")
        .ilike("title", "%Sofitel%")
        .limit(1);

    if (error) {
        console.error("Query failed:", error.message);
    } else {
        console.log("Sofitel Data:", data);
    }
}

checkColumns();
