"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/listing-card"; // Assuming this exists or using a simplified version
import { createClient } from "@/lib/supabase/client";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function SmartFeed() {
    const t = useTranslations("home");
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
        <section className="py-12 px-4 md:px-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] -z-10 rounded-full" />

            <div className="mx-auto max-w-7xl">
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 rounded-[1.25rem] bg-brand/10 text-brand shadow-inner">
                        <Sparkles className="h-7 w-7 fill-brand/30" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-foreground">{t("recommended")}</h2>
                        <p className="text-muted-foreground mt-1">Hand-picked for your next adventure</p>
                    </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {recommendations.map((item) => (
                        <div key={item.id} className="group relative">
                            {/* Hover Shadow Glow */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-brand/20 to-emerald-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <ListingCard
                                id={item.id}
                                title={item.title}
                                type={item.type}
                                wilaya={item.wilaya}
                                price={item.price_per_night}
                                ratingAvg={item.rating_avg}
                                image={item.images?.[0]}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
