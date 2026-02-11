"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

interface ProfileData {
    full_name?: string;
    wilaya?: string;
    phone?: string;
    bio?: string;
    avatar_url?: string;
}

export async function updateProfile(userId: string, data: ProfileData) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await adminClient
        .from("profiles")
        .update(data)
        .eq("id", userId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/[locale]/dashboard", "page");
    return { success: true };
}
