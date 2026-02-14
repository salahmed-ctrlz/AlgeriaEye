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

async function testInsert() {
    console.log("Testing insert type='agency'...");

    // Get central user
    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users.users.find(u => u.email === "test@travel.agency");

    if (!user) {
        console.error("User not found");
        return;
    }

    const { data, error } = await supabase.from("listings").insert({
        owner_id: user.id,
        title: "Test Agency Listing",
        description: "Testing type agency",
        type: "agency",
        wilaya: "algiers",
        price_per_night: 0,
        images: [],
        features: [],
        created_at: new Date().toISOString()
    }).select();

    if (error) {
        console.error("INSERT FAILED:", error);
    } else {
        console.log("INSERT SUCCESS:", data);
        // Clean up
        await supabase.from("listings").delete().eq("id", data[0].id);
    }
}

testInsert();
