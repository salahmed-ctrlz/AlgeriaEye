"use client";

import { useState } from "react";
import { Trash2, Star, Loader2 } from "lucide-react";
import { deleteListingAdmin, toggleListingFeaturedAdmin } from "@/actions/admin";
import { toast } from "sonner";

export function AdminListingActions({ listingId, adminUserId, isFeatured: initialFeatured }: { listingId: string; adminUserId: string; isFeatured: boolean }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isToggling, setIsToggling] = useState(false);
    const [isFeatured, setIsFeatured] = useState(initialFeatured);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this listing? This action cannot be undone.")) return;

        setIsDeleting(true);
        const result = await deleteListingAdmin(listingId, adminUserId);
        setIsDeleting(false);

        if (result.success) {
            toast.success("Listing deleted successfully");
        } else {
            toast.error(result.error || "Failed to delete listing");
        }
    };

    const handleToggleFeatured = async () => {
        setIsToggling(true);
        const result = await toggleListingFeaturedAdmin(listingId, !isFeatured, adminUserId);
        setIsToggling(false);

        if (result.success) {
            setIsFeatured(!isFeatured);
            toast.success(`Listing ${!isFeatured ? "featured" : "unfeatured"} successfully`);
        } else {
            toast.error(result.error || "Failed to toggle featured status");
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleToggleFeatured}
                disabled={isToggling}
                className={`p-2 rounded-lg border transition-all ${isFeatured
                        ? "bg-yellow-50 border-yellow-200 text-yellow-600 hover:bg-yellow-100"
                        : "bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    }`}
                title={isFeatured ? "Remove from Featured" : "Mark as Featured"}
            >
                {isToggling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className={`w-4 h-4 ${isFeatured ? "fill-current" : ""}`} />}
            </button>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 rounded-lg border border-red-100 text-red-500 bg-red-50 hover:bg-red-100 transition-all"
                title="Delete Listing"
            >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
        </div>
    );
}
