import { z } from "zod";

export const listingTypes = [
    "hotel",
    "restaurant",
    "guesthouse",
    "tour",
    "experience",
    "transport",
] as const;

export const listingFeatures = {
    hotel: ["Wifi", "Pool", "Gym", "Breakfast", "Parking", "AC", "Kitchen", "TV"],
    guesthouse: ["Wifi", "Pool", "Breakfast", "Parking", "AC", "Kitchen", "TV", "Garden"],
    restaurant: ["Reservations", "Outdoor Seating", "Wifi", "Parking", "Alcohol", "Live Music"],
    appartment: ["Wifi", "AC", "Kitchen", "TV", "Washer", "Parking", "Elevator"],
    tour: ["Guide", "Transport", "Food Included", "Entrance Fees", "Private"],
    experience: ["Guide", "Transport", "Food Included", "Equipment"],
    transport: ["AC", "English Speaking", "Wifi", "Luxury"],
    other: ["Wifi", "Parking"]
};

export const listingSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100),
    description: z.string().min(10, "Description must be at least 10 characters").max(2000),
    type: z.enum(listingTypes),
    wilaya: z.string().min(1, "Please select a wilaya"),
    address: z.string().min(5, "Address must be at least 5 characters").max(200),
    price: z.string().min(1, "Price is required"),
    images: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
});

export type ListingFormData = z.infer<typeof listingSchema>;
