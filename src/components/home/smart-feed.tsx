"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/listing-card"; // Assuming this exists or using a simplified version
import { createClient } from "@/lib/supabase/client";
import { Sparkles } from "lucide-react";

export function SmartFeed() {
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false); // Default false for now as we mock

    // Simulator for "Smart Algorithm"
    // In real app: fetch based on user tags, history, location
    useEffect(() => {
        // Mock data
        setRecommendations([
            {
                id: "rec1",
                title: "Sunset in Timgad",
                wilaya: "Batna",
                price_per_night: 4000,
                rating: 4.8,
                images: ["https://images.unsplash.com/photo-1590074256667-8e1263c9327d?auto=format&fit=crop&w=800&q=80"]
            },
            {
                id: "rec2",
                title: "Casbah Tour",
                wilaya: "Algiers",
                price_per_night: 2500,
                rating: 4.9,
                images: ["https://images.unsplash.com/photo-1627823624326-8c0817c1bf1d?auto=format&fit=crop&w=800&q=80"]
            }
        ]);
    }, []);

    return (
        <section className="py-8 px-4 md:px-8 bg-muted/20">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="h-5 w-5 text-brand fill-brand" />
                    <h2 className="text-2xl font-bold">Recommended for You</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {recommendations.map((item) => (
                        <div key={item.id} className="group relative overflow-hidden rounded-xl bg-background border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="aspect-[4/3] overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{item.wilaya}</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-brand">{item.price_per_night} DZD</span>
                                    <span className="text-xs bg-brand/10 text-brand px-2 py-1 rounded-full">
                                        Match 98%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
