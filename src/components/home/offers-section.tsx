"use client";

import { useEffect, useState } from "react";
import { Tag, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { createClient } from "@/lib/supabase/client";
import { ListingCard } from "@/components/listing-card";

export function OffersSection() {
    const [offers, setOffers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("listings")
                .select("*")
                .order("price_per_night", { ascending: true }) // Cheapest first
                .limit(4);

            if (data) {
                setOffers(data);
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
                        <h2 className="text-2xl font-bold">Special Offers</h2>
                    </div>
                    <Button variant="link" className="text-brand">View All</Button>
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
                                Best Price
                            </Badge>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
