
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

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("Missing Env Vars");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function listActivities() {
    console.log("📋 Listing all 'activity' type listings...");

    const { data: listings, error } = await supabase
        .from("listings")
        .select("id, title, type, owner_id")
        .eq("type", "activity");

    if (error) {
        console.error("❌ Error:", error.message);
        return;
    }

    if (!listings || listings.length === 0) {
        console.log("📭 No 'activity' listings found.");
    } else {
        console.log(`✅ Found ${listings.length} listings:`);
        listings.forEach(l => {
            console.log(`   - [${l.id}] "${l.title}" (Owner: ${l.owner_id})`);
        });
    }
}

listActivities();
