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
import { toast } from "sonner";

interface BookingModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    listingId: string;
    listingTitle: string;
    ownerId: string;
    pricePerNight: number;
    listingType?: string;
}

export function BookingModal({
    open,
    onOpenChange,
    listingId,
    listingTitle,
    ownerId,
    pricePerNight,
    listingType = "hotel",
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
    // Restaurant Specific State
    const [time, setTime] = useState("");
    const [selectedItems, setSelectedItems] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (open && listingType === "restaurant") {
            const fetchMenu = async () => {
                const supabase = createClient();
                const { data } = await supabase
                    .from("menu_items")
                    .select("*")
                    .eq("menu_id", (await supabase.from("menus").select("id").eq("listing_id", listingId).limit(1).single()).data?.id);
                setMenuItems(data || []);
            };
            fetchMenu();
        }
    }, [open, listingType, listingId]);

    const handleItemToggle = (item: any, quantity: number) => {
        setSelectedItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (quantity <= 0) {
                return prev.filter(i => i.id !== item.id);
            }
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity } : i);
            }
            return [...prev, { id: item.id, name: item.name, price: item.price, quantity }];
        });
    };

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

    // Calculate Totals
    const foodTotal = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Logic split based on type
    const isRestaurant = listingType === "restaurant";

    // For restaurants: base cost = pricePerNight * guests (reservation fee per person) + any pre-ordered food
    // For hotels: standard nights * pricePerNight
    const reservationCost = isRestaurant ? pricePerNight * guests : 0;
    const subtotal = isRestaurant ? (reservationCost + foodTotal) : (nights * pricePerNight);
    const totalPrice = subtotal;

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

            // Insert Booking
            const bookingData = {
                listing_id: listingId,
                tourist_id: user.id,
                owner_id: ownerId,
                start_date: checkIn,
                end_date: isRestaurant ? checkIn : checkOut,
                guests_count: guests,
                total_price: totalPrice,
                status: "confirmed",
                payment_status: "simulated_paid",
                type: isRestaurant ? "table" : "stay",
                booking_time: isRestaurant ? (time ? `${time}:00` : null) : null,
                notes: notes,
            };

            const { data: booking, error: bookingError } = await supabase.from("bookings").insert(bookingData).select().single();

            if (bookingError) throw bookingError;

            // Insert Booking Items (Food)
            if (isRestaurant && selectedItems.length > 0 && booking) {
                const bookingItemsData = selectedItems.map(item => ({
                    booking_id: booking.id,
                    menu_item_id: item.id,
                    quantity: item.quantity,
                    price_at_booking: item.price
                }));

                const { error: itemsError } = await supabase.from("booking_items").insert(bookingItemsData);
                if (itemsError) {
                    console.error("Error creating booking items:", itemsError);
                    toast.error("Booking created but failed to save menu items.");
                }
            }

            setSuccess(true);
        } catch (err: any) {
            console.error("Booking Error Full Object:", JSON.stringify(err, null, 2));
            console.error("Booking Error Message:", err.message);
            console.error("Booking Error Details:", err.details);
            console.error("Booking Error Hint:", err.hint);

            // Check for common RLS or column errors
            if (err.message && err.message.includes("column")) {
                toast.error("Database schema mismatch. Please run the SQL update script.");
            } else if (err.code === "42501") {
                toast.error("Permission denied. RLS policy violation.");
            } else {
                toast.error(`Booking failed: ${err.message || "Unknown error"}`);
            }
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
                            Your reservation at <span className="font-semibold">{listingTitle}</span> is secured.
                        </p>
                        <div className="bg-slate-50 p-4 rounded-lg w-full text-sm space-y-2 mt-2">
                            {isRestaurant && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Time:</span>
                                    <span className="font-bold">{checkIn} at {time}</span>
                                </div>
                            )}
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
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        {step === 2 && (
                            <Button variant="ghost" size="icon" className="-ml-2 h-8 w-8" onClick={() => setStep(1)}>
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        )}
                        <DialogTitle className="text-xl">
                            {step === 1 ? (isRestaurant ? "Reserve a Table" : t("title")) : "Secure Checkout"}
                        </DialogTitle>
                    </div>
                    {step === 1 && isRestaurant && <p className="text-sm text-muted-foreground">Select date, time, and pre-order food.</p>}
                    <div className="text-sm text-muted-foreground">
                        {step === 1 ? listingTitle : `Complete your booking for ${listingTitle}`}
                    </div>
                </DialogHeader>

                {step === 1 ? (
                    <div className="space-y-4 pt-2">
                        {/* Restaurant / Hotel Input Split */}
                        {isRestaurant ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs">Date</Label>
                                    <Input
                                        type="date"
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Time</Label>
                                    <Input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        ) : (
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
                                    // min={new Date().toISOString().split('T')[0]}
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
                        )}

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



                        {/* Food Pre-ordering for Restaurant */}
                        {isRestaurant && menuItems.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2 border p-3 rounded-lg bg-muted/20">
                                    <input
                                        type="checkbox"
                                        id="pre-order"
                                        checked={showMenu}
                                        className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                                        onChange={(e) => {
                                            setShowMenu(e.target.checked);
                                            if (!e.target.checked) setSelectedItems([]);
                                        }}
                                    />
                                    <Label htmlFor="pre-order" className="text-sm font-semibold cursor-pointer select-none">
                                        I want to pre-order food
                                    </Label>
                                </div>

                                {showMenu && (
                                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1 border rounded-lg p-3 animate-in fade-in slide-in-from-top-2">
                                        {menuItems.map(item => (
                                            <div key={item.id} className="flex items-center justify-between text-sm py-2 border-b last:border-0">
                                                <div className="flex flex-col flex-1 mr-2">
                                                    <span className="font-medium">{item.name}</span>
                                                    <span className="text-xs text-muted-foreground">{item.price} DA</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        className="h-7 w-7"
                                                        onClick={() => handleItemToggle(item, (selectedItems.find(i => i.id === item.id)?.quantity || 0) - 1)}
                                                    >-</Button>
                                                    <span className="w-6 text-center font-medium">{selectedItems.find(i => i.id === item.id)?.quantity || 0}</span>
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        className="h-7 w-7"
                                                        onClick={() => handleItemToggle(item, (selectedItems.find(i => i.id === item.id)?.quantity || 0) + 1)}
                                                    >+</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {(nights > 0 || isRestaurant) && totalPrice > 0 && (
                            <div className="rounded-lg border bg-slate-50 p-4 space-y-2">
                                <h4 className="font-medium text-sm flex items-center gap-2">
                                    <Receipt className="h-4 w-4" />
                                    Price Breakdown
                                </h4>
                                <Separator />
                                <div className="space-y-1 text-sm">
                                    {isRestaurant ? (
                                        <>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Reservation ({guests} {guests > 1 ? 'guests' : 'guest'} × {pricePerNight.toLocaleString()} {ct("dzd")})</span>
                                                <span>{reservationCost.toLocaleString()} {ct("dzd")}</span>
                                            </div>
                                            {foodTotal > 0 && (
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Food & Drinks pre-order</span>
                                                    <span>{foodTotal.toLocaleString()} {ct("dzd")}</span>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">{pricePerNight.toLocaleString()} × {nights} nights</span>
                                                <span>{subtotal.toLocaleString()} {ct("dzd")}</span>
                                            </div>
                                        </>
                                    )}
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
                            disabled={isRestaurant ? (!checkIn || !time) : (!checkIn || !checkOut || nights <= 0)}
                            className="w-full bg-brand text-white hover:bg-brand-light h-12 text-base"
                        >
                            Proceed to Checkout — {totalPrice.toLocaleString()} {ct("dzd")}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6 pt-2">
                        {/* Checkout Step (Reused) */}
                        <div className="bg-slate-50 p-4 rounded-lg border">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Total to pay</span>
                                <span className="text-xl font-bold text-brand">{totalPrice.toLocaleString()} {ct("dzd")}</span>
                            </div>
                            <div className="text-xs text-muted-foreground flex gap-2">
                                {isRestaurant ? (
                                    <>
                                        <span>{checkIn} at {time}</span>
                                        <span>•</span>
                                        <span>{guests} guests</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{nights} nights</span>
                                        <span>•</span>
                                        <span>{guests} guests</span>
                                        <span>•</span>
                                        <span>{checkIn} to {checkOut}</span>
                                    </>
                                )}
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
        </Dialog >
    );
}

