"use client";

import { useState } from "react";
import { ListingCard } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";

interface WilayaListingGridProps {
    listings: any[];
}

export function WilayaListingGrid({ listings }: WilayaListingGridProps) {
    const t = useTranslations("common");
    const locale = useLocale();
    const [visibleCount, setVisibleCount] = useState(8); // Start with 8 (2 rows of 4)

    const showMore = () => {
        setVisibleCount((prev) => prev + 8); // Load another 2 rows
    };

    const isAr = locale === "ar";

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {listings.slice(0, visibleCount).map((listing) => (
                    <ListingCard
                        key={listing.id}
                        id={listing.id}
                        title={listing.title}
                        type={listing.type}
                        wilaya={listing.wilaya}
                        price={listing.price_per_night}
                        ratingAvg={listing.rating_avg}
                        image={listing.images?.[0]}
                    />
                ))}
            </div>

            {visibleCount < listings.length && (
                <div className="flex justify-center pt-8">
                    <Button
                        onClick={showMore}
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8 border-brand/20 text-brand hover:bg-brand/5 hover:text-brand-dark hover:border-brand/40 transition-all text-base h-12"
                    >
                        {isAr ? "عرض المزيد" : "Show More Listings"}
                    </Button>
                </div>
            )}
        </div>
    );
}
