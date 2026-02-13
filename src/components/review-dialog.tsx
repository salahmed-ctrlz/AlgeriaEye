"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Star, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const reviewSchema = z.object({
    rating: z.number().min(1, "Please select a rating").max(5),
    comment: z.string().max(500, "Review is too long").optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewDialogProps {
    listingId: string;
    onSuccess: () => void;
}

export function ReviewDialog({ listingId, onSuccess }: ReviewDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 0,
            comment: "",
        },
    });

    const onSubmit = async (data: ReviewFormData) => {
        setLoading(true);
        const supabase = createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            toast.error("You must be logged in to review.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.from("reviews").insert({
            listing_id: listingId,
            user_id: user.id,
            rating: data.rating,
            comment: data.comment,
        });

        if (error) {
            if (error.code === "23505") {
                toast.error("You have already reviewed this listing.");
            } else {
                toast.error("Failed to submit review.");
                console.error(error);
            }
        } else {
            toast.success("Review submitted successfully!");
            setOpen(false);
            reset();
            setRating(0);
            onSuccess();
        }
        setLoading(false);
    };

    const handleRating = (value: number) => {
        setRating(value);
        setValue("rating", value, { shouldValidate: true });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Write a Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rate your experience</DialogTitle>
                    <DialogDescription>
                        Share your thoughts about this listing with other travelers.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex justify-center gap-2 py-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => handleRating(star)}
                                className="focus:outline-none transition-transform hover:scale-110"
                            >
                                <Star
                                    className={cn(
                                        "h-8 w-8 transition-colors",
                                        star <= rating
                                            ? "fill-amber-400 text-amber-400"
                                            : "text-muted-foreground/30"
                                    )}
                                />
                            </button>
                        ))}
                    </div>
                    {errors.rating && (
                        <p className="text-center text-sm text-destructive">{errors.rating.message}</p>
                    )}

                    <div className="space-y-2">
                        <Textarea
                            placeholder="Tell us about your stay..."
                            className="min-h-[100px]"
                            {...register("comment")}
                        />
                        {errors.comment && (
                            <p className="text-sm text-destructive">{errors.comment.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full bg-brand text-white hover:bg-brand-light">
                            {loading ? "Submitting..." : "Submit Review"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
