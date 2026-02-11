"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
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

const messageSchema = z.object({
    content: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface MessageDialogProps {
    listingId: string;
    ownerId: string;
    listingTitle: string;
}

export function MessageDialog({ listingId, ownerId, listingTitle }: MessageDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MessageFormData>({
        resolver: zodResolver(messageSchema),
    });

    const onSubmit = async (data: MessageFormData) => {
        setLoading(true);
        const supabase = createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            toast.error("You must be logged in to send a message.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.from("messages").insert({
            sender_id: user.id,
            receiver_id: ownerId,
            listing_id: listingId,
            content: data.content,
        });

        if (error) {
            toast.error("Failed to send message.");
            console.error(error);
        } else {
            toast.success("Message sent to host!");
            setOpen(false);
            reset();
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Contact Host
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Contact Host</DialogTitle>
                    <DialogDescription>
                        Send a message regarding <strong>{listingTitle}</strong>.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Hi, I'm interested in this listing..."
                            className="min-h-[120px]"
                            {...register("content")}
                        />
                        {errors.content && (
                            <p className="text-sm text-destructive">{errors.content.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="w-full bg-brand text-white hover:bg-brand-light">
                            {loading ? "Sending..." : (
                                <>
                                    <Send className="mr-2 h-4 w-4" /> Send Message
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
