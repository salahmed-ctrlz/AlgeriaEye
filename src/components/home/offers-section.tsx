"use client";

import { useEffect, useState } from "react";
import { Tag, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { createClient } from "@/lib/supabase/client";
import { ListingCard } from "@/components/listing-card";
import { useTranslations } from "next-intl";

export function OffersSection() {
    const t = useTranslations("home");
    const [offers, setOffers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            const supabase = createClient();
            // Fetch a mix of listings (random sort using UUID if supported or just random client side after fetch)
            // Since Supabase random() is not directly exposed easily in JS client without RPC, 
            // we will fetch a larger batch and shuffle client-side for "random mix" effect.
            const { data, error } = await supabase
                .from("listings")
                .select("*")
                .limit(20);

            if (data) {
                // Shuffle array
                const shuffled = data.sort(() => 0.5 - Math.random());
                // Take first 4
                setOffers(shuffled.slice(0, 4));
            }
            setLoading(false);
        };

        fetchOffers();
    }, []);

    if (loading) return null;

    return (
        <section className="py-8 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-red-500 transform rotate-90" />
                        <h2 className="text-2xl font-bold">{t("specialOffers")}</h2>
                    </div>
                    <Button variant="link" className="text-brand">{t("viewAll")}</Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {offers.map((offer) => (
                        <div key={offer.id} className="relative">
                            <ListingCard
                                id={offer.id}
                                title={offer.title}
                                type={offer.type}
                                wilaya={offer.wilaya}
                                price={offer.price_per_night}
                                ratingAvg={offer.rating_avg}
                                image={offer.images?.[0]}
                            />
                            {/* Overlay Discount Badge */}
                            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 z-10">
                                {t("bestPrice")}
                            </Badge>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
