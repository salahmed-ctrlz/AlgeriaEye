
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

async function inspectTypes() {
    console.log("🔍 Inspecting existing listings...");

    const { data: listings, error } = await supabase
        .from("listings")
        .select("type")
        .limit(20);

    if (error) {
        console.error("❌ Error:", error.message);
        return;
    }

    const types = new Set(listings.map(l => l.type));
    console.log("✅ Current listing types in DB:", Array.from(types));
}

inspectTypes();
