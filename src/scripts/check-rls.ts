
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

async function checkPolicies() {
    console.log("🛡️ Checking RLS Policies...");

    const { data: policies, error } = await supabase
        .rpc('get_policies', { table_name: 'listings' }); // This might not work if RPC doesn't exist

    if (error) {
        console.log("No custom RPC, trying direct SQL via query if possible (not supported in JS SDK easily).");
        console.log("Let's try to select via ANON key to see if it works.");

        const ANON_KEY = envVars["NEXT_PUBLIC_SUPABASE_ANON_KEY"];
        const anonClient = createClient(SUPABASE_URL, ANON_KEY);

        const { data: anonData, error: anonError } = await anonClient
            .from("listings")
            .select("id")
            .limit(1);

        if (anonError) {
            console.error("❌ Anon Read Error:", anonError.message);
        } else {
            console.log("✅ Anon Read Success. Listings count visible to anon:", anonData?.length);
        }
    } else {
        console.log("Policies:", policies);
    }
}

checkPolicies();
