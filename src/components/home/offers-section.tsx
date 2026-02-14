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
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-2xl bg-red-500/10 text-red-500 shadow-sm">
                            <Tag className="h-6 w-6 transform rotate-90" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">{t("specialOffers")}</h2>
                            <p className="text-base text-muted-foreground hidden sm:block mt-1">Limited time deals for you</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="text-brand hover:text-brand-dark hover:bg-brand/5 group rounded-xl px-4">
                        {t("viewAll")} <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </Button>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {offers.map((offer) => (
                        <div key={offer.id} className="relative group">
                            {/* Animated Border Glow */}
                            <div className="absolute -inset-[1px] bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500" />

                            <div className="relative">
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
                                <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 z-10 shadow-xl shadow-red-500/40 border-0 px-4 py-1.5 text-xs font-bold rounded-full animate-bounce-subtle">
                                    {t("bestPrice")}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
