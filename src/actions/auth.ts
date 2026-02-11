"use server";

import { createClient } from "@supabase/supabase-js";
import { RegisterFormData, registerSchema } from "@/lib/validations/auth";

export async function registerUser(data: RegisterFormData) {
    const valid = registerSchema.safeParse(data);
    if (!valid.success) {
        return { error: "Invalid data" };
    }

    const formData = valid.data;
    const { email, password, role } = formData;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    // Client for Auth (Simulates public signup)
    const publicClient = createClient(supabaseUrl, supabaseAnonKey);

    // Admin Client for Database (Bypasses RLS)
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Prepare metadata based on role
    let metadata: any = {
        full_name: role === 'tourist' ? formData.fullName : formData.businessName,
        role: role,
    };

    if (role === 'tourist') {
        metadata.nationality = formData.nationality;
    } else {
        metadata.business_type = formData.businessType;
        metadata.wilaya = formData.wilaya;
        metadata.phone = formData.phone;
    }

    // 1. Sign Up
    const { data: authData, error: authError } = await publicClient.auth.signUp({
        email,
        password,
        options: {
            data: metadata,
        },
    });

    if (authError) {
        if (authError.message.includes("rate limit")) {
            return { error: "Too many attempts. Please try again in a few minutes." };
        }
        return { error: authError.message };
    }
    if (!authData.user) return { error: "User creation failed" };

    // 2. Insert Profile manually
    // We insert into profiles to ensure fields like business_name/type are stored
    const profileData: any = {
        id: authData.user.id,
        role: role,
        ...metadata // Spread metadata (full_name, nationality, business_*, wilaya)
    };

    // Remove extra fields if any (auth metadata might not map 1:1, but here it mostly does)
    // The profiles table column names must match.
    // metadata: business_type -> profiles: business_type (matches)

    const { error: profileError } = await adminClient.from("profiles").insert(profileData);

    if (profileError) {
        console.error("Profile creation failed:", profileError);
        return { error: `User created but profile failed: ${profileError.message}` };
    }

    return { success: true };
}
