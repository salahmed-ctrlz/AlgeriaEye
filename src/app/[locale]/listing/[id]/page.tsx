"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
    MapPin,
    Star,
    ArrowLeft,
    Heart,
    Share2,
    Wifi,
    Car,
    Waves,
    Utensils,
    Tv,
    Thermometer,
    Briefcase,
    Coffee,
    Dumbbell,
    Flame,
    Bath,
    CheckCircle2,
    Snowflake,
    ChefHat,
    Music,
    Gamepad2,
    Trees
} from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookingModal } from "@/components/booking-modal";
import { createClient } from "@/lib/supabase/client";
import { ReviewDialog } from "@/components/review-dialog";
import { MessageDialog } from "@/components/message-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface Listing {
    id: string;
    owner_id: string;
    title: string;
    description: string;
    type: string;
    wilaya: string;
    address: string;
    price_per_night: number;
    images: string[];
    rating_avg: number;
    rating_count: number;
    created_at: string;
    features: string[] | null;
    location_url?: string;
}

export default function ListingPage() {
    const params = useParams();
    const id = params.id as string;
    const locale = useLocale();
    const t = useTranslations("listing");
    const ct = useTranslations("categories");
    const comm = useTranslations("common");

    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favLoading, setFavLoading] = useState(false);
    const [reviews, setReviews] = useState<any[]>([]);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchListing = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from("listings")
                .select("*")
                .eq("id", id)
                .single();
            setListing(data as Listing | null);
            setLoading(false);

            // Check favorite status
            const { data: { user } } = await supabase.auth.getUser();
            if (user && data) {
                const { data: fav } = await supabase
                    .from("favorites")
                    .select("*")
                    .eq("user_id", user.id)
                    .eq("listing_id", id)
                    .single();
                setIsFavorite(!!fav);

                // Get User Role
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.id)
                    .single();
                setUserRole(profile?.role || null);
            }

            // Fetch Reviews
            const { data: reviewsData } = await supabase
                .from("reviews")
                .select("*, profiles(full_name, avatar_url)")
                .eq("listing_id", id)
                .order("created_at", { ascending: false });
            setReviews(reviewsData || []);
        };
        fetchListing();
    }, [id]);

    const refreshReviews = async () => {
        const supabase = createClient();
        const { data: reviewsData } = await supabase
            .from("reviews")
            .select("*, profiles(full_name, avatar_url)")
            .eq("listing_id", id as string)
            .order("created_at", { ascending: false });
        setReviews(reviewsData || []);
    };

    const toggleFavorite = async () => {
        setFavLoading(true);
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("Please log in to save favorites.");
            setFavLoading(false);
            return;
        }

        if (isFavorite) {
            await supabase
                .from("favorites")
                .delete()
                .eq("user_id", user.id)
                .eq("listing_id", id);
            setIsFavorite(false);
        } else {
            await supabase
                .from("favorites")
                .insert({ user_id: user.id, listing_id: id });
            setIsFavorite(true);
        }
        setFavLoading(false);
    };

    const getFeatureIcon = (feature: string) => {
        const lower = feature.toLowerCase();
        if (lower.includes("wifi") || lower.includes("internet")) return Wifi;
        if (lower.includes("parking") || lower.includes("car") || lower.includes("garage")) return Car;
        if (lower.includes("pool") || lower.includes("swim") || lower.includes("jacuzzi")) return Waves;
        if (lower.includes("ac") || lower.includes("condition") || lower.includes("cool")) return Snowflake;
        if (lower.includes("kitchen") || lower.includes("cook") || lower.includes("stove")) return Utensils;
        if (lower.includes("tv") || lower.includes("tele") || lower.includes("netflix")) return Tv;
        if (lower.includes("heat") || lower.includes("warm") || lower.includes("fire")) return Thermometer;
        if (lower.includes("work") || lower.includes("laptop") || lower.includes("desk") || lower.includes("office")) return Briefcase;
        if (lower.includes("breakfast") || lower.includes("coffee") || lower.includes("tea")) return Coffee;
        if (lower.includes("gym") || lower.includes("fitness") || lower.includes("exercise")) return Dumbbell;
        if (lower.includes("bath") || lower.includes("tub") || lower.includes("shower")) return Bath;
        if (lower.includes("bbq") || lower.includes("grill")) return Flame;
        if (lower.includes("garden") || lower.includes("park") || lower.includes("view")) return Trees;
        if (lower.includes("game") || lower.includes("play")) return Gamepad2;
        if (lower.includes("music") || lower.includes("sound")) return Music;
        return CheckCircle2; // Default
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <p className="text-lg text-muted-foreground">{comm("error")}</p>
                <Link href={`/${locale}`}>
                    <Button variant="outline">{comm("back")}</Button>
                </Link>
            </div>
        );
    }

    const price = listing.price_per_night || 0;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Back */}
            <Link
                href={`/${locale}/search`}
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                {comm("back")}
            </Link>

            <div className="grid gap-10 lg:grid-cols-3">
                {/* Left: Gallery + Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Gallery */}
                    <div className="space-y-3">
                        <div className="aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                            {listing.images?.length > 0 ? (
                                <img
                                    src={listing.images[selectedImage]}
                                    alt={listing.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                    <MapPin className="h-16 w-16" />
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {listing.images?.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {listing.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${selectedImage === i
                                            ? "border-brand"
                                            : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Title & Meta */}
                    <div>
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                {listing.title}
                            </h1>
                            <div className="flex items-center gap-2 shrink-0">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={toggleFavorite}
                                    disabled={favLoading}
                                    className="rounded-full"
                                >
                                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-brand text-brand" : "text-muted-foreground"}`} />
                                </Button>
                                <MessageDialog listingId={listing.id} ownerId={listing.owner_id} listingTitle={listing.title} />
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Share2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                                <Badge variant="secondary" className="shrink-0 h-9 px-4 text-sm font-medium">
                                    {ct(listing.type.toLowerCase())}
                                </Badge>
                            </div>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {listing.wilaya}
                                {listing.address && ` — ${listing.address}`}

                            </span>
                            {listing.rating_avg > 0 && (
                                <span className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    {listing.rating_avg} ({listing.rating_count})
                                </span>
                            )}
                            {listing.location_url && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-2 text-brand border-brand/20 hover:bg-brand/5 hover:text-brand"
                                    asChild
                                >
                                    <a
                                        href={listing.location_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MapPin className="h-3.5 w-3.5" />
                                        {t("viewOnMap")}
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <Label className="col-span-full text-base font-semibold">{t("amenities")}</Label>
                        {listing.features && listing.features.length > 0 ? (
                            listing.features.map((feature) => {
                                const Icon = getFeatureIcon(feature);
                                return (
                                    <div key={feature} className="flex items-center gap-2 rounded-lg border p-3 bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <Icon className="h-4 w-4 text-brand" />
                                        <span className="text-sm font-medium">{feature}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="col-span-full text-sm text-muted-foreground italic">{t("noAmenities")}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-lg font-semibold">{t("description")}</h2>
                        <p className="mt-3 leading-relaxed text-muted-foreground whitespace-pre-line">
                            {listing.description || t("noDescription")}
                        </p>
                    </div>

                    <Separator />

                    {/* Restaurant Menu Section */}
                    {listing.type === "restaurant" && <RestaurantMenu listingId={listing.id} />}

                    <Separator />

                    {/* Reviews Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">{t("reviews")}</h2>
                            {userRole === "tourist" && (
                                <ReviewDialog listingId={listing.id} onSuccess={refreshReviews} />
                            )}
                        </div>

                        {reviews.length === 0 ? (
                            <div className="text-center py-8 bg-muted/30 rounded-lg">
                                <p className="text-muted-foreground">{t("noReviewsMsg")}</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="flex gap-4 border-b pb-6 last:border-0">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={review.profiles?.avatar_url} />
                                            <AvatarFallback>{review.profiles?.full_name?.[0] || "U"}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold">{review.profiles?.full_name || t("anonymous")}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {format(new Date(review.created_at), "MMM d, yyyy")}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-amber-500">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={cn(
                                                            "h-3 w-3",
                                                            i < review.rating ? "fill-current" : "text-muted-foreground/30"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Booking Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                        {price > 0 && (
                            <div className="mb-4">
                                <span className="text-2xl font-bold">
                                    {price.toLocaleString()} {comm("dzd")}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {" "}
                                    {listing.type === "restaurant" ? t("averageCost") : t("perNight")}
                                </span>
                            </div>
                        )}

                        <Button
                            onClick={() => setBookingOpen(true)}
                            className="w-full bg-brand text-white hover:bg-brand-light"
                            size="lg"
                        >
                            {listing.type === "restaurant" ? t("reserveTable") : t("bookNow")}
                        </Button>

                        {listing.rating_avg > 0 && (
                            <div className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium text-foreground">
                                    {listing.rating_avg}
                                </span>
                                · {listing.rating_count} {t("reviews")}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <BookingModal
                open={bookingOpen}
                onOpenChange={setBookingOpen}
                listingId={listing.id}
                listingTitle={listing.title}
                ownerId={listing.owner_id}
                pricePerNight={price}
                listingType={listing.type}
            />
        </div >
    );
}

function RestaurantMenu({ listingId }: { listingId: string }) {
    const t = useTranslations("listing");
    const comm = useTranslations("common");
    const [menus, setMenus] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuData = async () => {
            const supabase = createClient();
            const { data: menuData } = await supabase
                .from("menus")
                .select("*")
                .eq("listing_id", listingId)
                .order("created_at", { ascending: false });

            setMenus(menuData || []);
            if (menuData && menuData.length > 0) {
                setActiveMenu(menuData[0].id);
            }
            setLoading(false);
        };
        fetchMenuData();
    }, [listingId]);

    useEffect(() => {
        if (!activeMenu) return;
        const fetchItems = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from("menu_items")
                .select("*")
                .eq("menu_id", activeMenu)
                .order("category", { ascending: true });
            setItems(data || []);
        };
        fetchItems();
    }, [activeMenu]);

    if (loading) return null;
    if (menus.length === 0) return null;

    // Group items by category
    const groupedItems = items.reduce((acc, item) => {
        const cat = item.category || comm("general");
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {} as Record<string, any[]>);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{t("ourMenu")}</h2>
            </div>

            {/* Menu Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {menus.map((menu) => (
                    <button
                        key={menu.id}
                        onClick={() => setActiveMenu(menu.id)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
                            activeMenu === menu.id
                                ? "bg-brand text-white border-brand"
                                : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                        )}
                    >
                        {menu.title}
                    </button>
                ))}
            </div>

            {/* Menu Content */}
            <div className="space-y-8">
                {Object.entries(groupedItems).map(([category, categoryItems]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold mb-3 text-brand">{category}</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {(categoryItems as any[]).map((item) => (
                                <div key={item.id} className="flex gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                                    <div className="h-20 w-20 bg-muted rounded-md shrink-0 overflow-hidden">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-muted/50">
                                                <Utensils className="h-8 w-8 text-muted-foreground/20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                                <span className="font-semibold text-sm shrink-0">{item.price} {comm("dzd")}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
