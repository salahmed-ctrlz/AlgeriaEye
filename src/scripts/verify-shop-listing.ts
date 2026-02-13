
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { travelPlans } from "../lib/data/shop-plans";

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
const SERVICE_KEY = envVars["SUPABASE_SERVICE_ROLE_KEY"]; // Using Service Key to bypass RLS for now to check existence

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("Missing Env Vars");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function verifyListings() {
    console.log("🔍 Verifying Shop Listings...");

    for (const plan of travelPlans) {
        console.log(`Checking plan: "${plan.title}"`);

        const { data: listing, error } = await supabase
            .from("listings")
            .select("id, title, type")
            .eq("title", plan.title)
            .select("id, title, type")
            .eq("title", plan.title);

        if (error) {
            console.error(`❌ Error fetching "${plan.title}":`, error.message);
        } else if (!listing || listing.length === 0) {
            console.error(`❌ Plan not found: "${plan.title}"`);
        } else {
            console.log(`✅ Found ${listing.length} rows for: "${plan.title}"`);
            listing.forEach(l => console.log(`   - ID: ${l.id}, Type: ${l.type}`));
        }
    }
}

verifyListings();
