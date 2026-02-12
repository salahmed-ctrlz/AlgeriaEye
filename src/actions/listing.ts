"use server";

import { createClient } from "@supabase/supabase-js";
import { listingSchema, ListingFormData } from "@/lib/validations/listing";
import { revalidatePath } from "next/cache";

export async function createListing(data: ListingFormData, userId: string) {
    const valid = listingSchema.safeParse(data);
    if (!valid.success) {
        return { error: "Invalid data" };
    }

    const { title, description, type, wilaya, address, price, images, features } = valid.data;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Ensure Profile Exists & Enforce 'owner' Role
    const { data: profile } = await adminClient
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

    if (!profile) {
        // Create profile if missing
        const { data: userData } = await adminClient.auth.admin.getUserById(userId);
        if (!userData.user) return { error: "User not found" };

        const meta = userData.user.user_metadata;

        await adminClient.from("profiles").insert({
            id: userId,
            full_name: meta.full_name || "Host",
            role: "owner",
            wilaya: wilaya,
        });
    } else if (profile.role !== "owner") {
        await adminClient
            .from("profiles")
            .update({ role: "owner" })
            .eq("id", userId);
    }

    // 2. Insert Listing
    const { error } = await adminClient.from("listings").insert({
        owner_id: userId,
        title,
        description,
        type,
        wilaya,
        address,
        location_url: valid.data.location_url,
        price_per_night: parseFloat(price),
        images: images || [],
        features: features || [],
        updated_at: new Date().toISOString(),
    });

    if (error) {
        return { error: `Failed to create listing: ${error.message}` };
    }

    revalidatePath("/[locale]/dashboard", "page");
    return { success: true };
}

export async function updateListing(listingId: string, data: ListingFormData, userId: string) {
    const valid = listingSchema.safeParse(data);
    if (!valid.success) {
        return { error: "Invalid data" };
    }

    const { title, description, type, wilaya, address, price, images, features } = valid.data;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Update Listing (Check ownership via RLS or explicit check? AdminClient bypasses RLS)
    // We should verify ownership manually for safety, though standard RLS policies enforce it on client side.
    // For AdminClient, we MUST check ownership.

    const { data: existing } = await adminClient
        .from("listings")
        .select("owner_id")
        .eq("id", listingId)
        .single();

    if (!existing || existing.owner_id !== userId) {
        return { error: "Unauthorized or Listing not found" };
    }

    const { error } = await adminClient.from("listings").update({
        title,
        description,
        type,
        wilaya,
        address,
        location_url: valid.data.location_url,
        price_per_night: parseFloat(price),
        images: images || [],
        features: features || [],
        updated_at: new Date().toISOString(),
    }).eq("id", listingId);

    if (error) {
        return { error: `Failed to update listing: ${error.message}` };
    }

    revalidatePath("/[locale]/dashboard", "page");
    return { success: true };
}
