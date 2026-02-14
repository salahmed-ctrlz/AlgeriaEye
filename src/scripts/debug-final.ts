import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function debug() {
    const anonClient = createClient(supabaseUrl, anonKey);

    console.log("--- DEBUGGING LISTINGS (ANON) ---");
    const lRes = await anonClient.from("listings").select("*");
    if (lRes.error) {
        console.log("LISTINGS ERROR:", lRes.error.message);
        console.log("CODE:", lRes.error.code);
        console.log("HINT:", lRes.error.hint);
    } else {
        console.log("LISTINGS SUCCESS:", lRes.data.length, "rows found");
    }

    console.log("\n--- DEBUGGING PROFILES (ANON) ---");
    const pRes = await anonClient.from("profiles").select("*");
    if (pRes.error) {
        console.log("PROFILES ERROR:", pRes.error.message);
        console.log("CODE:", pRes.error.code);
        console.log("HINT:", pRes.error.hint);
    } else {
        console.log("PROFILES SUCCESS:", pRes.data.length, "rows found");
    }
}

debug();
