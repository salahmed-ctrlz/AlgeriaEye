"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { SlidersHorizontal, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ListingCard } from "@/components/listing-card";
import { createClient } from "@/lib/supabase/client";
import { wilayas, getWilayaName } from "@/data/wilayas";
import { Badge } from "@/components/ui/badge";

interface Listing {
    id: string;
    title: string;
    type: string;
    wilaya: string;
    images: string[];
    price_details: Record<string, number>;
    rating_avg: number;
    features: string[]; // Using features to store cuisine/vibe tags for now
}

export default function RestaurantSearchPage() {
    const t = useTranslations("search");
    const locale = useLocale();
    const searchParams = useSearchParams();

    // Filters
    const [query, setQuery] = useState("");
    const [selectedWilaya, setSelectedWilaya] = useState("all");
    const [cuisine, setCuisine] = useState("all");
    const [vibe, setVibe] = useState("all");
    const [showFilters, setShowFilters] = useState(true);

    // Data
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    const cuisines = [
        { key: "traditional", label: t("cuisines.traditional") },
        { key: "modern", label: t("cuisines.modern") },
        { key: "fastFood", label: t("cuisines.fastFood") },
        { key: "seafood", label: t("cuisines.seafood") },
        { key: "italian", label: t("cuisines.italian") },
        { key: "french", label: t("cuisines.french") },
        { key: "asian", label: t("cuisines.asian") },
        { key: "syrian", label: t("cuisines.syrian") },
    ];

    const vibes = [
        { key: "casual", label: t("vibes.casual") },
        { key: "fancy", label: t("vibes.fancy") },
        { key: "familyFriendly", label: t("vibes.familyFriendly") },
        { key: "business", label: t("vibes.business") },
        { key: "romantic", label: t("vibes.romantic") },
        { key: "cafe", label: t("vibes.cafe") },
        { key: "streetFood", label: t("vibes.streetFood") },
    ];

    useEffect(() => {
        fetchListings();
    }, [query, selectedWilaya, cuisine, vibe]);

    const fetchListings = async () => {
        setLoading(true);
        const supabase = createClient();

        let q = supabase
            .from("listings")
            .select("*")
            .eq("type", "restaurant");

        if (query) {
            q = q.or(`title.ilike.%${query}%,description.ilike.%${query}%,wilaya.ilike.%${query}%`);
        }

        if (selectedWilaya && selectedWilaya !== "all") {
            q = q.eq("wilaya", selectedWilaya);
        }

        // Note: In a real app, cuisine and vibe would likely be separate columns or a jsonb field. 
        // For now, we'll simulate filtering by checking if the description or features contains the tag.
        // utilizing client-side filtering for these specific tags if not in DB column yet.

        const { data, error } = await q.order("created_at", { ascending: false });

        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }

        let filtered = (data as Listing[]) || [];

        if (cuisine !== "all") {
            // Map back Key to english for search or use key if stored as key in DB
            // For simulation, we'll try to match the english label or the key
            const selectedCuisineLabel = cuisines.find(c => c.key === cuisine)?.label || cuisine;

            filtered = filtered.filter(l =>
                l.title.toLowerCase().includes(selectedCuisineLabel.toLowerCase()) ||
                l.title.toLowerCase().includes(cuisine.toLowerCase()) ||
                (l.features && l.features.some(f => f.toLowerCase().includes(selectedCuisineLabel.toLowerCase()) || f.toLowerCase().includes(cuisine.toLowerCase())))
            );
        }

        if (vibe !== "all") {
            const selectedVibeLabel = vibes.find(v => v.key === vibe)?.label || vibe;

            filtered = filtered.filter(l =>
                l.title.toLowerCase().includes(selectedVibeLabel.toLowerCase()) ||
                l.title.toLowerCase().includes(vibe.toLowerCase()) ||
                (l.features && l.features.some(f => f.toLowerCase().includes(selectedVibeLabel.toLowerCase()) || f.toLowerCase().includes(vibe.toLowerCase())))
            );
        }

        setListings(filtered);
        setLoading(false);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <UtensilsCrossed className="h-8 w-8 text-brand" />
                        {locale === "ar" ? "المطاعم و المأكولات" : "Restaurants & Dining"}
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        {locale === "ar"
                            ? "اكتشف أفضل النكهات، من الأطباق التقليدية إلى المطاعم الفاخرة."
                            : "Discover local flavors, from traditional dishes to fine dining experiences."}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-8 grid grid-cols-1 gap-4 rounded-xl border border-border/50 bg-card p-6 sm:grid-cols-4 shadow-sm">
                {/* Search */}
                <div className="space-y-2">
                    <Label className="text-xs font-medium">{t("title")}</Label>
                    <Input
                        placeholder={locale === "ar" ? "ابحث عن مطعم..." : "Search restaurants..."}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Wilaya */}
                <div className="space-y-2">
                    <Label className="text-xs font-medium">Wilaya</Label>
                    <Select value={selectedWilaya} onValueChange={setSelectedWilaya}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Wilayas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("allTypes")}</SelectItem>
                            {wilayas.map((w) => (
                                <SelectItem key={w.slug} value={w.slug}>
                                    {getWilayaName(w, locale)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Cuisine */}
                <div className="space-y-2">
                    <Label className="text-xs font-medium">{t("cuisine")}</Label>
                    <Select value={cuisine} onValueChange={setCuisine}>
                        <SelectTrigger>
                            <SelectValue placeholder={t("allTypes")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("allTypes")}</SelectItem>
                            {cuisines.map((c) => (
                                <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Vibe */}
                <div className="space-y-2">
                    <Label className="text-xs font-medium">{t("vibe")}</Label>
                    <Select value={vibe} onValueChange={setVibe}>
                        <SelectTrigger>
                            <SelectValue placeholder={t("allTypes")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("allTypes")}</SelectItem>
                            {vibes.map((v) => (
                                <SelectItem key={v.key} value={v.key}>{v.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Active Filters Display */}
            {(cuisine !== "all" || vibe !== "all") && (
                <div className="mb-6 flex gap-2">
                    {cuisine !== "all" && (
                        <Badge variant="secondary" className="gap-1 pl-1 pr-2">
                            <span className="rounded-full bg-background px-1 text-[10px] text-muted-foreground">x</span>
                            {cuisines.find(c => c.key === cuisine)?.label}
                        </Badge>
                    )}
                    {vibe !== "all" && (
                        <Badge variant="secondary" className="gap-1 pl-1 pr-2">
                            <span className="rounded-full bg-background px-1 text-[10px] text-muted-foreground">x</span>
                            {vibes.find(v => v.key === vibe)?.label}
                        </Badge>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => { setCuisine("all"); setVibe("all") }} className="h-6 text-xs text-muted-foreground">
                        Clear all
                    </Button>
                </div>
            )}

            {/* Results */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                </div>
            ) : listings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed">
                    <UtensilsCrossed className="mb-4 h-12 w-12 text-muted-foreground/30" />
                    <p className="text-lg text-muted-foreground">{t("noResults")}</p>
                    <Button variant="link" onClick={() => { setQuery(""); setCuisine("all"); setVibe("all"); setSelectedWilaya("all") }} >
                        {t("noResults").split(".")[1] || "Reset Filters"}
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            id={listing.id}
                            title={listing.title}
                            type={listing.type}
                            wilaya={listing.wilaya}
                            image={listing.images?.[0]}
                            price={listing.price_details?.per_night}
                            ratingAvg={listing.rating_avg}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
