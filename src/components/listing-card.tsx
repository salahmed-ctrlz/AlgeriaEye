"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
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
}

export function ListingCard({
    id,
    title,
    type,
    wilaya,
    image,
    price,
    ratingAvg,
}: ListingCardProps) {
    const t = useTranslations("listing");
    const ct = useTranslations("common");
    const locale = useLocale();
    const { isFavorite, toggleFavorite } = useFavorites();
    const fav = isFavorite(id);

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
                            className={`h-4 w-4 transition-colors ${fav ? "fill-red-500 text-red-500" : "text-muted-foreground"
                                }`}
                        />
                    </Button>

                    {/* Type Badge */}
                    <Badge
                        variant="secondary"
                        className="absolute bottom-3 left-3 bg-background/80 text-xs backdrop-blur-sm"
                    >
                        {type}
                    </Badge>
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
                                {price.toLocaleString()} {ct("dzd")}{" "}
                                <span className="text-xs font-normal text-muted-foreground">
                                    {t("perNight")}
                                </span>
                            </span>
                        )}

                        {ratingAvg !== undefined && ratingAvg > 0 && (
                            <div className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{ratingAvg}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
