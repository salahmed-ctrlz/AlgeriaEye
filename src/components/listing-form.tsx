"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    listingSchema,
    listingFeatures,
    listingTypes,
    type ListingFormData
} from "@/lib/validations/listing";
import { wilayas, getWilayaName } from "@/data/wilayas";
import { createListing, updateListing } from "@/actions/listing";
import { ImageUpload } from "@/components/image-upload"; // Assuming export is named or default
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ListingFormProps {
    userId: string;
    initialData?: any; // Using any for flexibility with DB types vs Form types
    onSuccess: () => void;
    onCancel: () => void;
}

export function ListingForm({ userId, initialData, onSuccess, onCancel }: ListingFormProps) {
    const [saving, setSaving] = useState(false);

    const form = useForm<ListingFormData>({
        resolver: zodResolver(listingSchema),
        defaultValues: initialData ? {
            title: initialData.title,
            description: initialData.description,
            type: initialData.type,
            wilaya: initialData.wilaya,
            address: initialData.address,
            location_url: initialData.location_url || "",
            price: initialData.price_per_night?.toString(),
            images: initialData.images || [],
            features: Array.isArray(initialData.features) ? initialData.features : [], // Ensure array
        } : {
            type: "hotel",
            images: [],
            features: [],
        },
    });

    const { register, handleSubmit, setValue, watch, formState: { errors } } = form;
    const selectedType = watch("type") as keyof typeof listingFeatures;
    const rawFeatures = watch("features");
    const currentFeatures = Array.isArray(rawFeatures) ? rawFeatures : [];

    const availableFeatures = listingFeatures[selectedType] || listingFeatures["other"];

    const toggleFeature = (feature: string) => {
        const newFeatures = currentFeatures.includes(feature)
            ? currentFeatures.filter((f) => f !== feature)
            : [...currentFeatures, feature];
        setValue("features", newFeatures);
    };

    const onSubmit = async (data: ListingFormData) => {
        setSaving(true);
        try {
            let result;
            if (initialData) {
                result = await updateListing(initialData.id, data, userId);
            } else {
                result = await createListing(data, userId);
            }

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(initialData ? "Listing updated!" : "Listing created!");
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            toast.error("An unexpected error occurred.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-base font-semibold">Basic Info</Label>
                    <Input
                        id="title"
                        placeholder="Property Title (e.g. Luxury Apartment)"
                        {...register("title")}
                    />
                    {errors.title && (
                        <p className="text-xs text-destructive">{errors.title.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                            onValueChange={(val) => setValue("type", val as any)}
                            defaultValue={initialData?.type || "hotel"}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {listingTypes.map((t) => (
                                    <SelectItem key={t} value={t} className="capitalize">
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Wilaya</Label>
                        <Select
                            onValueChange={(val) => setValue("wilaya", val)}
                            defaultValue={initialData?.wilaya || ""}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Wilaya" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                                {wilayas.map((w) => (
                                    <SelectItem key={w.code} value={w.slug}>
                                        {w.code} - {getWilayaName(w, "en")}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.wilaya && (
                            <p className="text-xs text-destructive">{errors.wilaya.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-semibold">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Describe your property amenities, view, etc..."
                    rows={4}
                    {...register("description")}
                />
                {errors.description && (
                    <p className="text-xs text-destructive">{errors.description.message}</p>
                )}
            </div>

            {/* Dynamic Features & Tags Section */}
            <div className="space-y-4">
                <Label className="text-base font-semibold">Features & Amenities</Label>

                {/* Standard Features */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {availableFeatures.map((feature) => (
                        <label
                            key={feature}
                            className="flex items-center space-x-2 rounded-md border p-2 cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                            <input
                                type="checkbox"
                                checked={currentFeatures.includes(feature)}
                                onChange={() => toggleFeature(feature)}
                                className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                            />
                            <span className="text-sm font-medium">{feature}</span>
                        </label>
                    ))}
                </div>

                {/* Additional Tags for Restaurants */}
                {selectedType === "restaurant" && (
                    <div className="space-y-3 pt-2 border-t">
                        <Label className="text-sm font-medium">Cuisine & Vibe (Select to add)</Label>
                        <div className="flex flex-wrap gap-2">
                            {["Traditional", "Modern", "Fast Food", "Seafood", "Italian", "French", "Asian", "Syrian", "Casual", "Fancy", "Family Friendly", "Romantic", "Cafe", "Street Food"].map(tag => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => toggleFeature(tag)}
                                    className={cn(
                                        "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                                        currentFeatures.includes(tag)
                                            ? "bg-brand text-white border-brand"
                                            : "bg-background text-muted-foreground border-border hover:border-brand/50"
                                    )}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="price" className="text-base font-semibold">Pricing & Location</Label>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                        id="price"
                        placeholder="Price per night (DZD)"
                        type="number"
                        {...register("price")}
                    />
                    <Input
                        id="address"
                        placeholder="Full Address"
                        {...register("address")}
                    />
                    <div className="col-span-2">
                        <Input
                            id="location_url"
                            placeholder="Google Maps Location URL (Optional)"
                            {...register("location_url")}
                        />
                        {errors.location_url && <p className="text-xs text-destructive mt-1">{errors.location_url.message}</p>}
                    </div>
                </div>
                {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
                {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-base font-semibold">Gallery</Label>
                <ImageUpload
                    value={watch("images") || []}
                    onChange={(urls) => setValue("images", urls)}
                    maxFiles={5}
                    bucketName="listing-images"
                />
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={saving}
                    className="bg-brand text-white hover:bg-brand-light"
                >
                    {saving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {initialData ? "Update Listing" : "Publish Listing"}
                </Button>
            </div>
        </form>
    );
}
