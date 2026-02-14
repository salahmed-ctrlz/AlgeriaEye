"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteReviewAdmin } from "@/actions/admin";
import { toast } from "sonner";

export function AdminReviewActions({ reviewId, adminUserId }: { reviewId: string; adminUserId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this review?")) return;

        setIsDeleting(true);
        const result = await deleteReviewAdmin(reviewId, adminUserId);
        setIsDeleting(false);

        if (result.success) {
            toast.success("Review deleted successfully");
        } else {
            toast.error(result.error || "Failed to delete review");
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-lg border border-red-100 text-red-500 bg-red-50 hover:bg-red-100 transition-all"
            title="Delete Review"
        >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
    );
}
