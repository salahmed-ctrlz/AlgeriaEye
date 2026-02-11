"use client";

import { useEffect, useState } from "react";
import { Tag, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function OffersSection() {
    // Mock data
    const offers = [
        {
            id: 1,
            title: "Summer in Bejaia",
            discount: "30% OFF",
            timeLeft: "2 days",
            image: "https://images.unsplash.com/photo-1627823624326-8c0817c1bf1d?auto=format&fit=crop&w=800&q=80",
            provider: "Numidia Travel"
        },
        {
            id: 2,
            title: "Sahara Adventure",
            discount: "15% OFF",
            timeLeft: "5 hours",
            image: "https://images.unsplash.com/photo-1549643276-fbc2bd380629?auto=format&fit=crop&w=800&q=80",
            provider: "Touareg Tours"
        }
    ];

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

                <div className="grid gap-6 md:grid-cols-2">
                    {offers.map((offer) => (
                        <div key={offer.id} className="group relative overflow-hidden rounded-xl bg-background border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row h-full sm:h-48">
                            <div className="w-full sm:w-2/5 relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="h-full w-full object-cover"
                                />
                                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                    {offer.discount}
                                </Badge>
                            </div>
                            <div className="p-4 flex flex-col justify-between w-full sm:w-3/5">
                                <div>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{offer.provider}</span>
                                    <h3 className="text-lg font-bold mt-1 group-hover:text-brand transition-colors">{offer.title}</h3>
                                    <div className="flex items-center gap-1 text-sm text-red-500 mt-2">
                                        <Clock className="h-3 w-3" />
                                        <span>Ends in {offer.timeLeft}</span>
                                    </div>
                                </div>
                                <Button className="w-full mt-4 bg-brand text-white hover:bg-brand-light">Book Now</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
