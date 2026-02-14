"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

async function verifyAdmin(userId: string) {
    const { data: profile } = await adminClient
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

    return profile?.role === "admin";
}

export async function updateUserRoleAdmin(targetUserId: string, newRole: 'admin' | 'owner' | 'tourist', adminUserId: string) {
    if (!(await verifyAdmin(adminUserId))) {
        return { error: "Unauthorized" };
    }

    // 1. Update Profile Role
    const { error: profileError } = await adminClient
        .from("profiles")
        .update({ role: newRole })
        .eq("id", targetUserId);

    if (profileError) return { error: profileError.message };

    // 2. Update Auth Metadata (so middleware/standard client see it immediately)
    const { error: authError } = await adminClient.auth.admin.updateUserById(targetUserId, {
        user_metadata: { role: newRole }
    });

    if (authError) {
        console.error("Auth metadata update failed:", authError.message);
    }

    revalidatePath("/[locale]/control-center/users", "page");
    return { success: true };
}
