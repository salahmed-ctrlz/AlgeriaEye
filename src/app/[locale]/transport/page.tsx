"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Smartphone, Bus, Star, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { InstagramEmbed } from "@/components/creators/instagram-embed";
import { BookingModal } from "@/components/booking-modal";

interface Listing {
    id: string;
    owner_id: string;
    title: string;
    description: string;
    images: string[];
    price_per_night: number;
    wilaya: string;
    rating_avg: number;
    owner?: {
        full_name: string;
        phone: string;
        avatar_url?: string;
    };
    socials?: {
        instagram?: string;
        tiktok?: string;
        posts?: string;
        followers?: string;
        following?: string;
    };
    content?: { type: 'instagram' | 'tiktok', url: string }[];
}

// ... existing code ...



const RIDE_APPS = [
    {
        name: "Yassir",
        desc: "Algeria's #1 Ride Hailing App",
        icon: "/images/Apps/yassir.png",
        android: "https://play.google.com/store/apps/details?id=com.yatechnologies.yassir_rider",
        ios: "https://apps.apple.com/nz/app/yassir/id1239926325"
    },
    {
        name: "Indrive",
        desc: "Name your price",
        icon: "/images/Apps/indrive.png",
        android: "https://play.google.com/store/apps/details?id=sinet.startup.inDriver",
        ios: "https://apps.apple.com/us/app/indrive-save-on-city-rides/id780125801"
    },
    {
        name: "Heetch",
        desc: "Reliable rides 24/7",
        icon: "/images/Apps/heetch.png",
        android: "https://play.google.com/store/apps/details?id=com.heetch&hl=fr",
        ios: "https://apps.apple.com/us/app/heetch-ride-hailing-app-24-7/id693137280"
    },
    {
        name: "Mahatati",
        desc: "Bus & Train Stations",
        icon: "/images/Apps/Mahatati.png",
        android: "https://play.google.com/store/apps/details?id=com.sogral.mobile",
        ios: "https://apps.apple.com/pk/app/mahatati/id6754021775"
    },
    {
        name: "EtusaMob",
        desc: "Public Transport Algiers",
        icon: "/images/Apps/etusamob.png",
        android: "https://play.google.com/store/apps/details?id=dz.etusa.etusa_mob",
        ios: "https://apps.apple.com/us/app/etusamob/id6572304866"
    }
];



export default function TransportPage() {
    const t = useTranslations("transport");
    const [rentals, setRentals] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRental, setSelectedRental] = useState<Listing | null>(null);
    const [bookingOpen, setBookingOpen] = useState(false);

    const SERVICES = [
        { icon: Car, label: t("services.carRental") },
        { icon: CheckCircle2, label: t("services.airportTransfer") }
    ];

    useEffect(() => {
        const fetchRentals = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from("listings")
                .select("*, owner:profiles(full_name, phone, avatar_url)")
                .eq("type", "transport")
                .order("created_at", { ascending: false });

            if (data) {
                const augmented = data
                    .filter((item: any) => !item.title.toLowerCase().includes("samir"))
                    .map((item: any) => {
                        // Keep AutoLuxe logic if it exists separately, or just return item
                        if (item.title === "AutoLuxe Yanis" || item.title.includes("AutoLuxe")) {
                            return {
                                ...item,
                                title: "autoluxeyanis",
                                description: `Car Rental
 ${t('services.carRental')}
 ${t('services.airportTransfer')}
 0560.90.51.31`,
                                owner: {
                                    ...item.owner,
                                    full_name: "yanisautoluxe",
                                    avatar_url: "/images/yanisautolux.png",
                                    phone: "0560.90.51.31"
                                },
                                images: ["/images/car.png"],
                                socials: {
                                    instagram: "yanisautoluxe",
                                    posts: "26",
                                    followers: "19",
                                    following: "9"
                                },
                                content: [
                                    { type: 'instagram', url: 'https://www.instagram.com/p/DNWaJ70t4W3/' },
                                    { type: 'instagram', url: 'https://www.instagram.com/p/DNJj_q_NuBs/' },
                                    { type: 'instagram', url: 'https://www.instagram.com/p/DNA_hAANqd3/' }
                                ]
                            };
                        }
                        return item;
                    });
                setRentals(augmented);
            }
            setLoading(false);
        };

        fetchRentals();
    }, [t]);

    return (
        <div className="min-h-screen bg-muted/5 dark:bg-background pb-20">
            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                <Image
                    src="/images/buses.png"
                    alt="Transport in Algeria"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Vignette & Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-0 flex items-center justify-center p-8 container mx-auto z-20 text-center">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">
                            {t("title")}
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-sm">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            {/* Apps Section (Clean Grid, No Overlap) */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3">{t("rideApps")}</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("rideAppsDesc")}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {RIDE_APPS.map((app) => (
                        <Card key={app.name} className="group hover:shadow-xl transition-all border-0 shadow-md overflow-hidden bg-white dark:bg-card hover:-translate-y-1 duration-300">
                            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                <div className="relative h-20 w-20 rounded-2xl shadow-sm overflow-hidden shrink-0 transition-transform bg-transparent">
                                    <Image
                                        src={app.icon}
                                        alt={app.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex-1 min-h-[3rem]">
                                    <h3 className="font-bold text-lg">{app.name}</h3>
                                    <p className="text-xs text-muted-foreground">{app.desc}</p>
                                </div>
                                <div className="flex flex-col gap-2 w-full mt-2">
                                    <a
                                        href={app.ios}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative h-9 w-full opacity-90 hover:opacity-100 transition-opacity"
                                    >
                                        <Image
                                            src="/images/Apps/getonappstore.png"
                                            alt="Download on App Store"
                                            fill
                                            className="object-contain"
                                        />
                                    </a>
                                    <a
                                        href={app.android}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative h-9 w-full opacity-90 hover:opacity-100 transition-opacity"
                                    >
                                        <Image
                                            src="/images/Apps/getongoogleplay.png"
                                            alt="Get it on Google Play"
                                            fill
                                            className="object-contain"
                                        />
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Car Rentals (Profile Style) */}
            <section className="py-4">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                            <Car className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{t("carRentals")}</h2>
                            <p className="text-muted-foreground">{t("carRentalsDesc")}</p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {loading ? (
                            <div className="text-center py-10">Loading...</div>
                        ) : rentals.length > 0 ? (
                            rentals.map((rental) => (
                                <TransportProfileCard
                                    key={rental.id}
                                    rental={rental}
                                    t={t}
                                    onBook={() => {
                                        setSelectedRental(rental);
                                        setBookingOpen(true);
                                    }}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-3xl border border-dashed">
                                <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                                <h3 className="text-lg font-medium">No rentals found yet</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Bus / Public Transport */}
            <div className="container mx-auto px-4 mt-12">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 border border-blue-100 dark:border-blue-900/50 backdrop-blur-xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <Bus className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{t("busSchedules")}</h2>
                    </div>
                    <Badge variant="outline" className="border-blue-200 text-blue-600 bg-white/50 dark:bg-black/20 px-4 py-1">
                        {t("comingSoon")}
                    </Badge>
                </div>
            </div>

            {/* Booking Modal */}
            {selectedRental && (
                <BookingModal
                    open={bookingOpen}
                    onOpenChange={setBookingOpen}
                    listingId={selectedRental.id}
                    listingTitle={selectedRental.title}
                    ownerId={selectedRental.owner_id}
                    pricePerNight={selectedRental.price_per_night}
                    listingType="transport"
                />
            )}
        </div>
    );
}

function TransportProfileCard({ rental, t, onBook }: { rental: Listing, t: any, onBook: () => void }) {
    return (
        <Card className="overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl bg-white/80 dark:bg-card/80 backdrop-blur-md rounded-[2rem]">
            {/* Header / Profile Info */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start border-b border-border/40">
                {/* Avatar */}
                <div className="relative group">
                    <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-[6px] border-white dark:border-card shadow-2xl overflow-hidden relative bg-muted z-10 transition-transform transform group-hover:scale-105">
                        <Image
                            src={rental.owner?.avatar_url || rental.images[0] || "/images/placeholders/car-rental.jpg"}
                            alt={rental.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white dark:border-card z-20">
                        <CheckCircle2 className="h-4 w-4" />
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4 pt-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-3xl font-bold">{rental.owner?.full_name || rental.title}</h3>
                                {rental.title === "AutoLuxe Yanis" && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200">
                                        Verified
                                    </Badge>
                                )}
                            </div>
                            {/* Stats Row */}
                            {rental.socials && (
                                <div className="flex items-center gap-6 text-sm mb-3">
                                    <div className="flex flex-col items-center md:items-start">
                                        <span className="font-bold text-foreground">{rental.socials.posts || 0}</span>
                                        <span className="text-muted-foreground">posts</span>
                                    </div>
                                    <div className="flex flex-col items-center md:items-start">
                                        <span className="font-bold text-foreground">{rental.socials.followers || 0}</span>
                                        <span className="text-muted-foreground">followers</span>
                                    </div>
                                    <div className="flex flex-col items-center md:items-start">
                                        <span className="font-bold text-foreground">{rental.socials.following || 0}</span>
                                        <span className="text-muted-foreground">following</span>
                                    </div>
                                </div>
                            )}

                            {/* Bio */}
                            <div className="text-sm md:text-base text-foreground/90 max-w-2xl leading-relaxed whitespace-pre-line font-medium dark:font-light">
                                {rental.description}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[140px]">
                            <Button
                                onClick={onBook}
                                className="rounded-full w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                            >
                                {t("bookNow")}
                            </Button>
                            {rental.owner?.phone && (
                                <Button variant="outline" className="rounded-full w-full border-2">
                                    {rental.owner.phone}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content / Embeds Section */}
            <div className="p-1 md:p-2 bg-muted/5 dark:bg-muted/10">
                {/* Grid of posts */}
                <div className="grid grid-cols-3 gap-0.5 md:gap-4">
                    {rental.content ? (
                        rental.content.map((item, i) => (
                            <div key={i} className="aspect-square relative group overflow-hidden bg-black/5 dark:bg-black/20 md:rounded-xl">
                                {item.type === 'instagram' ? (
                                    <div className="w-full h-full relative">
                                        <InstagramEmbed url={item.url} />
                                        {/* Overlay to catch clicks if needed, or allow interaction */}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground">
                                        No Embed
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        rental.images.map((img, i) => (
                            <div key={i} className="aspect-square relative group overflow-hidden md:rounded-xl bg-muted">
                                <Image
                                    src={img}
                                    alt={`Gallery ${i}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Card>
    );
}
