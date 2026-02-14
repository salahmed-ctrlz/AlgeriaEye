
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

async function seedAdmin() {
    console.log("🚀 Seeding Admin User...");

    const email = "admin@admin.admin";
    const password = "admin123";

    // 1. Create User in Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
            full_name: "System Admin",
            role: "admin",
        },
    });

    if (authError) {
        if (authError.message.includes("already registered")) {
            console.log("ℹ️ Admin user already exists in Auth.");

            // Get user by email
            const { data: users } = await supabase.auth.admin.listUsers();
            const existingUser = users.users.find(u => u.email === email);

            if (existingUser) {
                // Update profile role just in case
                const { error: profileError } = await supabase
                    .from("profiles")
                    .update({ role: "admin" })
                    .eq("id", existingUser.id);

                if (profileError) console.error("❌ Failed to update profile:", profileError.message);
                else console.log("✅ Admin profile verified.");
            }
        } else {
            console.error("❌ Auth creation failed:", authError.message);
            return;
        }
    } else {
        console.log("✅ Admin user created in Auth.");

        // Profiles trigger should handle the profile creation, but let's be sure
        const { error: profileError } = await supabase
            .from("profiles")
            .upsert({
                id: authData.user.id,
                full_name: "System Admin",
                role: "admin",
            });

        if (profileError) console.error("❌ Profile creation failed:", profileError.message);
        else console.log("✅ Admin profile created.");
    }

    console.log("🎉 Done!");
}

seedAdmin();
