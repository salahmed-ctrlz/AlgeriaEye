"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { MapPin, Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/store/use-favorites";

interface ListingCardProps {
    id: string;
    title: string;
    type: string;
    wilaya: string;
    image?: string;
    price?: number;
    ratingAvg?: number;
    ratingCount?: number;
}

export function ListingCard({
    id,
    title,
    type,
    wilaya,
    image,
    price,
    ratingAvg,
    ratingCount,
}: ListingCardProps) {
    const t = useTranslations("listing");
    const ct = useTranslations("categories");
    const comm = useTranslations("common");
    const locale = useLocale();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const fav = mounted && isFavorite(id);
    const isTopRated = ratingAvg && ratingAvg >= 4.5 && ratingCount && ratingCount >= 5;

    return (
        <Link href={`/${locale}/listing/${id}`}>
            <Card className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            <MapPin className="h-10 w-10" />
                        </div>
                    )}

                    {/* Favorite Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(id);
                        }}
                    >
                        <Heart
                            className={`h-4 w-4 transition-colors ${fav ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                        />
                    </Button>

                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                        {/* Type Badge */}
                        <Badge
                            variant="secondary"
                            className="bg-background/80 text-xs backdrop-blur-sm"
                        >
                            {ct(type.toLowerCase())}
                        </Badge>

                        {/* Top Rated Badge */}
                        {isTopRated && (
                            <Badge className="bg-amber-500/90 hover:bg-amber-500 text-white text-[10px] backdrop-blur-sm border-none shadow-sm">
                                Top Rated
                            </Badge>
                        )}
                    </div>
                </div>

                <CardContent className="p-4">
                    <h3 className="font-semibold leading-tight line-clamp-1">{title}</h3>

                    <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-1">{wilaya}</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        {price !== undefined && price > 0 && (
                            <span className="text-sm font-bold">
                                {price.toLocaleString()} {comm("dzd")}{" "}
                                <span className="text-xs font-normal text-muted-foreground">
                                    {t("perNight")}
                                </span>
                            </span>
                        )}

                        {ratingAvg !== undefined && ratingAvg > 0 && (
                            <div className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                <span className="text-sm font-medium">{ratingAvg}</span>
                                {ratingCount !== undefined && (
                                    <span className="text-xs text-muted-foreground">({ratingCount})</span>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
