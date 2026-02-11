import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Shared fields
const emailPassword = {
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
};

export const touristSchema = z.object({
    ...emailPassword,
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    role: z.literal("tourist"),
    nationality: z.string().min(1, "Please select your nationality"),
});

export const partnerSchema = z.object({
    ...emailPassword,
    businessName: z.string().min(2, "Business Name must be at least 2 characters"),
    role: z.literal("owner"),
    businessType: z.enum(["hotel", "agency", "taxi", "guide"]),
    wilaya: z.string().min(1, "Please select a wilaya"),
    phone: z.string().min(10, "Please enter a valid phone number").optional(),
});

// Union for the action
export const registerSchema = z.discriminatedUnion("role", [
    touristSchema,
    partnerSchema,
]);

export type RegisterFormData = z.infer<typeof registerSchema>;
export type TouristFormData = z.infer<typeof touristSchema>;
export type PartnerFormData = z.infer<typeof partnerSchema>;
