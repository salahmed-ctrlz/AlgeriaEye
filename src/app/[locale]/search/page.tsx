"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
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

interface Listing {
    id: string;
    title: string;
    type: string;
    wilaya: string;
    images: string[];
    price_per_night: number;
    rating_avg: number;
}

interface SearchPageProps {
    hideTitle?: boolean;
}

export default function SearchPage({ hideTitle = false }: SearchPageProps) {
    const t = useTranslations("search");
    const locale = useLocale();
    const searchParams = useSearchParams();
    const queryParam = searchParams.get("q") || "";
    const wilayaParam = searchParams.get("wilaya") || "";
    const typeParam = searchParams.get("type") || "";

    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState(queryParam);
    const [type, setType] = useState(typeParam);
    const [selectedWilaya, setSelectedWilaya] = useState(wilayaParam);
    const [showFilters, setShowFilters] = useState(false);

    const listingTypes = [
        "hotel",
        "restaurant",
        "guesthouse",
        "tour",
        "experience",
        "transport",
    ] as const;

    useEffect(() => {
        fetchListings();
    }, [query, type, selectedWilaya]);

    const fetchListings = async () => {
        setLoading(true);
        const supabase = createClient();

        let q = supabase.from("listings").select("*");

        if (query) {
            q = q.or(`title.ilike.%${query}%,description.ilike.%${query}%,wilaya.ilike.%${query}%,address.ilike.%${query}%`);
        }
        if (type && type !== "all") {
            q = q.eq("type", type);
        }
        if (selectedWilaya && selectedWilaya !== "all") {
            q = q.eq("wilaya", selectedWilaya);
        }

        const { data } = await q.order("created_at", { ascending: false }).limit(50);
        setListings((data as Listing[]) || []);
        setLoading(false);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            {!hideTitle && (
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
                    {!loading && (
                        <p className="mt-2 text-sm text-muted-foreground">
                            {t("resultsCount", { count: listings.length })}
                        </p>
                    )}
                </div>
            )}

            {/* Filters Toggle */}
            <div className="mb-6">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    {t("filters")}
                </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="mb-8 grid grid-cols-1 gap-4 rounded-xl border border-border/50 bg-card p-6 sm:grid-cols-3">
                    {/* Search */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Search</Label>
                        <Input
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    {/* Type */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">{t("type")}</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue placeholder={t("allTypes")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t("allTypes")}</SelectItem>
                                {listingTypes.map((lt) => (
                                    <SelectItem key={lt} value={lt}>
                                        {t(lt)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Wilaya */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium">Wilaya</Label>
                        <Select value={selectedWilaya} onValueChange={setSelectedWilaya}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Wilayas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Wilayas</SelectItem>
                                {wilayas.map((w) => (
                                    <SelectItem key={w.slug} value={w.slug}>
                                        {getWilayaName(w, locale)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )}

            {/* Results */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                </div>
            ) : listings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-lg text-muted-foreground">{t("noResults")}</p>
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
                            price={listing.price_per_night}
                            ratingAvg={listing.rating_avg}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
