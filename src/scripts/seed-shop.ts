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
const SERVICE_KEY = envVars["SUPABASE_SERVICE_ROLE_KEY"];

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("Missing Env Vars");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function seedShop() {
    console.log("🌱 Seeding Shop Plans...");

    // 1. Get or Create a generic 'Agency' user to own these listings
    let { data: owner } = await supabase
        .from("profiles")
        .select("id")
        .eq("role", "agency")
        .limit(1)
        .single();

    if (!owner) {
        console.log("No agency user found, fetching any user...");
        const { data: anyUser } = await supabase.from("profiles").select("id").limit(1).single();
        if (anyUser) {
            owner = anyUser;
        } else {
            console.error("No users found to assign listings to. Please register a user first.");
            return;
        }
    }

    console.log(`Using Owner ID: ${owner.id}`);

    // 2. Insert Plans
    for (const plan of travelPlans) {
        // Check if exists
        const { data: existing } = await supabase
            .from("listings")
            .select("id")
            .eq("title", plan.title)
            .maybeSingle();

        if (existing) {
            console.log(`Plan already exists: ${plan.title}`);
            continue;
        }

        const { error } = await supabase.from("listings").insert({
            title: plan.title,
            description: plan.description,
            type: "tour", // Using valid enum value 'tour'
            wilaya: plan.locations[0], // First location as wilaya
            address: plan.locations.join(", "),
            price_per_night: plan.price,
            images: [plan.image],
            owner_id: owner.id,
            features: [plan.duration, ...plan.itinerary.map(d => d.title)],
            created_at: new Date().toISOString()
        });

        if (error) {
            console.error(`Error inserting ${plan.title}:`, error.message);
        } else {
            console.log(`Inserted: ${plan.title}`);
        }
    }
    console.log("✅ Shop Seeding Complete.");
}

seedShop();
