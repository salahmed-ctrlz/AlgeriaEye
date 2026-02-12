
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// 1. Load Environment Variables from .env.local
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
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function checkData() {
    console.log("🔍 Checking Database Content...");

    // Count Users
    const { count: userCount, error: userError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "owner");

    if (userError) console.error("Error checking users:", userError.message);
    else console.log(`✅ Owners found: ${userCount}`);

    // Count Listings
    const { count: listingCount, error: listingError } = await supabase
        .from("listings")
        .select("*", { count: "exact", head: true });

    if (listingError) console.error("Error checking listings:", listingError.message);
    else console.log(`✅ Listings found: ${listingCount}`);

    // Count Menus
    const { count: menuCount, error: menuError } = await supabase
        .from("menus")
        .select("*", { count: "exact", head: true });

    if (menuError) console.error("Error checking menus:", menuError.message);
    else console.log(`✅ Menus found: ${menuCount}`);

    // Count Menu Items
    const { count: menuItemCount, error: menuItemError } = await supabase
        .from("menu_items")
        .select("*", { count: "exact", head: true });

    if (menuItemError) console.error("Error checking menu items:", menuItemError.message);
    else console.log(`✅ Menu Items found: ${menuItemCount}`);

    // List Details
    if (listingCount && listingCount > 0) {
        console.log("\n--- Listing Details ---");
        const { data: listings } = await supabase.from("listings").select("title, type, wilaya");
        listings?.forEach(l => console.log(`- [${l.type}] ${l.title} (${l.wilaya})`));
    }
}

checkData();
