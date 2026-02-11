"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, Users, CheckCircle, Receipt, ArrowLeft, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { PaymentMethods } from "@/components/booking/payment-methods";
import { CardScanner } from "@/components/booking/card-scanner";
import { Separator } from "@/components/ui/separator";

interface BookingModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    listingId: string;
    listingTitle: string;
    ownerId: string;
    pricePerNight: number;
}

export function BookingModal({
    open,
    onOpenChange,
    listingId,
    listingTitle,
    ownerId,
    pricePerNight,
}: BookingModalProps) {
    const t = useTranslations("booking");
    const ct = useTranslations("common");
    const [step, setStep] = useState(1);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("visa");
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    // Pricing Calculation
    const nights =
        checkIn && checkOut
            ? Math.max(
                1,
                Math.ceil(
                    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
                    (1000 * 60 * 60 * 24)
                )
            )
            : 0;

    const subtotal = nights * pricePerNight;
    const serviceFee = Math.round(subtotal * 0.05); // 5% service fee
    const items = subtotal + serviceFee;
    const taxes = Math.round(items * 0.19); // 19% TVA (Algerian VAT)
    const totalPrice = subtotal + serviceFee + taxes;

    // Reset state when modal opens/closes
    useEffect(() => {
        if (!open) {
            setStep(1);
            setSuccess(false);
            setIsProcessingPayment(false);
        }
    }, [open]);

    const handleBooking = async () => {
        setIsProcessingPayment(true);
        setLoading(true);

        // Simulate payment processing time matching the animation
        await new Promise((resolve) => setTimeout(resolve, 3000));

        try {
            const supabase = createClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                alert("Please log in to book.");
                setLoading(false);
                setIsProcessingPayment(false);
                return;
            }

            await supabase.from("bookings").insert({
                listing_id: listingId,
                tourist_id: user.id,
                owner_id: ownerId,
                check_in: checkIn,
                check_out: checkOut,
                guests,
                total_price: totalPrice,
                status: "confirmed",
                payment_status: "paid",
                notes,
            });

            setSuccess(true);
        } catch {
            alert("Booking failed. Please try again.");
        } finally {
            setLoading(false);
            setIsProcessingPayment(false);
        }
    };

    if (success) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-md">
                    <div className="flex flex-col items-center gap-4 py-8">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 animate-in zoom-in duration-300">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold">Booking Confirmed!</h2>
                        <p className="text-center text-sm text-muted-foreground max-w-xs">
                            Your reservation at <span className="font-semibold">{listingTitle}</span> is secured. A receipt has been sent to your email.
                        </p>
                        <div className="bg-slate-50 p-4 rounded-lg w-full text-sm space-y-2 mt-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Amount Paid:</span>
                                <span className="font-bold">{totalPrice.toLocaleString()} {ct("dzd")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Method:</span>
                                <span className="capitalize">{paymentMethod}</span>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                onOpenChange(false);
                            }}
                            className="w-full bg-brand text-white hover:bg-brand-light mt-2"
                        >
                            Done
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    // Payment Animation View
    if (isProcessingPayment) {
        return (
            <Dialog open={open} onOpenChange={(val) => !loading && onOpenChange(val)}>
                <DialogContent className="sm:max-w-md flex flex-col items-center justify-center py-12">
                    <h2 className="text-xl font-semibold mb-8">Processing Payment...</h2>
                    <div className="scale-125 mb-8">
                        <CardScanner price={totalPrice} />
                    </div>
                    <p className="text-sm text-muted-foreground text-center max-w-xs mt-8 animate-pulse">
                        Please do not close this window while we securely process your transaction.
                    </p>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        {step === 2 && (
                            <Button variant="ghost" size="icon" className="-ml-2 h-8 w-8" onClick={() => setStep(1)}>
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        )}
                        <DialogTitle className="text-xl">
                            {step === 1 ? t("title") : "Secure Checkout"}
                        </DialogTitle>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {step === 1 ? listingTitle : `Complete your booking for ${listingTitle}`}
                    </div>
                </DialogHeader>

                {step === 1 ? (
                    <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-1.5 text-xs">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    {t("checkIn")}
                                </Label>
                                <Input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                // min={new Date().toISOString().split('T')[0]} // Optional: prevent past dates
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-1.5 text-xs">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    {t("checkOut")}
                                </Label>
                                <Input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    min={checkIn}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-1.5 text-xs">
                                <Users className="h-3.5 w-3.5" />
                                {t("guests")}
                            </Label>
                            <Input
                                type="number"
                                min={1}
                                max={20}
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs">{t("notes")}</Label>
                            <Textarea
                                placeholder="Special requests, arrival time, etc..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={2}
                            />
                        </div>

                        {nights > 0 && (
                            <div className="rounded-lg border bg-slate-50 p-4 space-y-2">
                                <h4 className="font-medium text-sm flex items-center gap-2">
                                    <Receipt className="h-4 w-4" />
                                    Price Breakdown
                                </h4>
                                <Separator />
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">{pricePerNight.toLocaleString()} × {nights} nights</span>
                                        <span>{subtotal.toLocaleString()} {ct("dzd")}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Service Fee (5%)</span>
                                        <span>{serviceFee.toLocaleString()} {ct("dzd")}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Taxes (19%)</span>
                                        <span>{taxes.toLocaleString()} {ct("dzd")}</span>
                                    </div>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-brand">{totalPrice.toLocaleString()} {ct("dzd")}</span>
                                </div>
                            </div>
                        )}

                        <Button
                            onClick={() => setStep(2)}
                            disabled={!checkIn || !checkOut || nights <= 0}
                            className="w-full bg-brand text-white hover:bg-brand-light"
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6 pt-2">
                        <div className="bg-slate-50 p-4 rounded-lg border">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Total to pay</span>
                                <span className="text-xl font-bold text-brand">{totalPrice.toLocaleString()} {ct("dzd")}</span>
                            </div>
                            <div className="text-xs text-muted-foreground flex gap-2">
                                <span>{nights} nights</span>
                                <span>•</span>
                                <span>{guests} guests</span>
                                <span>•</span>
                                <span>{checkIn} to {checkOut}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Select Payment Method</Label>
                            <PaymentMethods
                                selected={paymentMethod}
                                onSelect={setPaymentMethod}
                            />
                        </div>

                        <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium">Secure Transaction</p>
                                <p className="opacity-90">Your payment information is encrypted. This is a simulation, no real charge will occur.</p>
                            </div>
                        </div>

                        <Button
                            onClick={handleBooking}
                            disabled={loading}
                            className="w-full bg-brand text-white hover:bg-brand-light h-12 text-base shadow-md"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                                </>
                            ) : (
                                `Pay ${totalPrice.toLocaleString()} ${ct("dzd")}`
                            )}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

