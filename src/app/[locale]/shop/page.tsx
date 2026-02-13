"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { travelPlans, TravelPlan } from "@/lib/data/shop-plans";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, MapPin, CheckCircle2, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function ShopPage() {
    const t = useTranslations("shop");
    const ct = useTranslations("common");
    const [selectedPlan, setSelectedPlan] = useState<TravelPlan | null>(null);
    const [heroImage, setHeroImage] = useState("/images/hero-image.webp");
    const [open, setOpen] = useState(false);

    // Booking State
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [bookingStep, setBookingStep] = useState<"form" | "processing" | "success">("form");

    // Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const HERO_IMAGES = [
            "/images/hero-image.webp",
            "/images/wilayas/Algiers/hero.jpg",
            "/images/wilayas/Constantine/hero.webp",
            "/images/wilayas/Oran/hero.jpg",
            "/images/wilayas/Tamanrasset/hero.jpg",
        ];
        const random = HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)];
        setHeroImage(random);
    }, []);

    const handleBookClick = (plan: TravelPlan) => {
        setSelectedPlan(plan);
        setBookingStep("form");
        setSuccess(false);
        setOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setBookingStep("processing");

        try {
            const supabase = createClient();

            // 1. Get Current User
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast.error("Please login to book a trip.");
                setLoading(false);
                setBookingStep("form");
                return;
            }

            // 2. Find the Listing ID for this plan
            const { data: listing, error: listingError } = await supabase
                .from("listings")
                .select("id, owner_id")
                .eq("title", selectedPlan?.title)
                .single();

            if (listingError || !listing) {
                throw new Error("Plan not found in database. Please contact support.");
            }

            // 3. Simulate Processing Animation
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 4. Insert Booking
            const { error: bookingError } = await supabase.from("bookings").insert({
                listing_id: listing.id,
                tourist_id: user.id,
                owner_id: listing.owner_id,
                start_date: date,
                end_date: date, // For now single date or calculate based on duration
                status: "pending",
                total_price: selectedPlan?.price,
                payment_status: "pending",
                type: "travel_plan",
                guests_count: 1 // Default
            });

            if (bookingError) throw bookingError;

            setSuccess(true);
            setBookingStep("success");
            toast.success(t("alert", { planTitle: selectedPlan?.title || "" }));

        } catch (error: any) {
            console.error("Booking Error:", error);
            toast.error(error.message || "Failed to book trip.");
            setBookingStep("form");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
                <Image
                    src={heroImage}
                    alt="Travel Plans"
                    fill
                    className="object-cover opacity-30 dark:opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight drop-shadow-md">
                        {t("title")}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium drop-shadow-sm">
                        {t("subtitle")}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {travelPlans.map((plan) => (
                        <Card key={plan.id} className="group overflow-hidden border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-card rounded-2xl flex flex-col h-full dark:bg-card/95">
                            {/* Image Section */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={plan.image}
                                    alt={t(`plans.${plan.id}.title`)}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-3 right-3">
                                    <Badge className="bg-background/90 text-foreground hover:bg-background backdrop-blur-md px-3 py-1 text-xs font-bold shadow-sm">
                                        {plan.duration}
                                    </Badge>
                                </div>
                            </div>

                            {/* Details Section */}
                            <CardHeader className="p-5 pb-2">
                                <h3 className="text-xl font-bold text-card-foreground leading-tight group-hover:text-brand transition-colors">
                                    {t(`plans.${plan.id}.title`)}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                                    <MapPin className="h-3 w-3 text-brand" />
                                    <span>{plan.locations.join(" • ")}</span>
                                </div>
                            </CardHeader>

                            <CardContent className="p-5 pt-2 flex-grow">
                                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                    {t(`plans.${plan.id}.description`)}
                                </p>

                                {/* Mini Itinerary Preview */}
                                <div className="space-y-2 mb-4">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("highlights")}</h4>
                                    <ul className="space-y-1">
                                        {[1, 2].map((dayNum) => (
                                            <li key={dayNum} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                                                <span>{t(`plans.${plan.id}.itinerary.day${dayNum}`)}</span>
                                            </li>
                                        ))}
                                        <li className="text-xs text-brand font-medium pl-5">{t("moreActivities")}</li>
                                    </ul>
                                </div>
                            </CardContent>

                            <CardFooter className="p-5 pt-0 border-t border-border/50 bg-muted/20 mt-auto flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground">{t("startingFrom")}</p>
                                    <p className="text-lg font-bold text-brand">
                                        {plan.price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">{ct("dzd")}</span>
                                    </p>
                                </div>
                                <Button
                                    className="gap-2 rounded-full shadow-md hover:shadow-lg transition-all bg-brand text-primary-foreground hover:bg-brand/90"
                                    size="sm"
                                    onClick={() => handleBookClick(plan)}
                                >
                                    {t("bookNow")} <ArrowRight className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Booking Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {bookingStep === "success" ? t("success") : t("bookTitle", { planTitle: selectedPlan ? t(`plans.${selectedPlan.id}.title`) : "" })}
                        </DialogTitle>
                        <DialogDescription>
                            {bookingStep === "success" ? t("alert", { planTitle: "" }) : t("bookDesc")}
                        </DialogDescription>
                    </DialogHeader>

                    {bookingStep === "processing" ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full blur-xl bg-brand/30 animate-pulse"></div>
                                <Loader2 className="h-12 w-12 text-brand animate-spin relative z-10" />
                            </div>
                            <p className="text-sm text-muted-foreground animate-pulse">Processing your request...</p>
                        </div>
                    ) : bookingStep === "success" ? (
                        <div className="flex flex-col items-center justify-center py-6 space-y-4">
                            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <p className="text-center text-muted-foreground">
                                Your booking is now pending approval. You can track its status in your dashboard.
                            </p>
                            <Button className="w-full mt-4" onClick={() => setOpen(false)}>
                                Close
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">{t("name")}</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">{t("email")}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@email.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">{t("phone")}</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+213..."
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="date">{t("date")}</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={loading} className="w-full">
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    {t("submit")}
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
