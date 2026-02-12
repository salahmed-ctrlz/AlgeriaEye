"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/listing-card"; // Assuming this exists or using a simplified version
import { createClient } from "@/lib/supabase/client";
import { Sparkles } from "lucide-react";

export function SmartFeed() {
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("listings")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(4);

            if (data) {
                setRecommendations(data);
            }
            setLoading(false);
        };

        fetchRecommendations();
    }, []);

    if (loading) return null; // Or a skeleton

    return (
        <section className="py-8 px-4 md:px-8 bg-muted/20">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="h-5 w-5 text-brand fill-brand" />
                    <h2 className="text-2xl font-bold">Recommended for You</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {recommendations.map((item) => (
                        <ListingCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            type={item.type}
                            wilaya={item.wilaya}
                            price={item.price_per_night}
                            ratingAvg={item.rating_avg}
                            image={item.images?.[0]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
