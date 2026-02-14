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

const centralEmail = "test@travel.agency";

async function checkAgencies() {
    console.log(`🔍 Checking Listings for ${centralEmail}...`);

    // 1. Get User ID
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const user = usersData?.users.find(u => u.email === centralEmail);

    if (!user) {
        console.error("Central user not found!");
        return;
    }

    console.log(`User Found: ${user.id} | Role: ${user.user_metadata.role} | Biz: ${user.user_metadata.business_type}`);

    // 2. Get Listings
    const { data: listings, error } = await supabase
        .from("listings")
        .select("id, title, type, wilaya")
        .eq("owner_id", user.id);

    if (error) {
        console.error("Error fetching listings:", error);
        return;
    }

    console.log("--- Listings for test@travel.agency ---");
    listings?.forEach(l => {
        console.log(`[${l.type}] ${l.title} (${l.wilaya})`);
    });
    console.log(`Total: ${listings?.length}`);
}

checkAgencies();
