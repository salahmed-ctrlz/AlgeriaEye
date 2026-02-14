"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Verify if the performing user is an admin
 */
async function verifyAdmin(userId: string) {
    const { data: profile } = await adminClient
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

    return profile?.role === "admin";
}

export async function deleteListingAdmin(listingId: string, adminUserId: string) {
    if (!(await verifyAdmin(adminUserId))) {
        return { error: "Unauthorized" };
    }

    const { error } = await adminClient
        .from("listings")
        .delete()
        .eq("id", listingId);

    if (error) return { error: error.message };

    revalidatePath("/[locale]/control-center/listings", "page");
    revalidatePath("/[locale]/explore", "page");
    return { success: true };
}

export async function deleteReviewAdmin(reviewId: string, adminUserId: string) {
    if (!(await verifyAdmin(adminUserId))) {
        return { error: "Unauthorized" };
    }

    const { error } = await adminClient
        .from("reviews")
        .delete()
        .eq("id", reviewId);

    if (error) return { error: error.message };

    revalidatePath("/[locale]/control-center/reviews", "page");
    return { success: true };
}

export async function toggleListingFeaturedAdmin(listingId: string, isFeatured: boolean, adminUserId: string) {
    if (!(await verifyAdmin(adminUserId))) {
        return { error: "Unauthorized" };
    }

    const { error } = await adminClient
        .from("listings")
        .update({ is_featured: isFeatured })
        .eq("id", listingId);

    if (error) return { error: error.message };

    revalidatePath("/[locale]/control-center/listings", "page");
    return { success: true };
}
