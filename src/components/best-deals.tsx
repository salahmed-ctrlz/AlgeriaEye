"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-DZ", {
        style: "currency",
        currency: "DZD",
        maximumFractionDigits: 0,
    }).format(amount);
};

interface Listing {
    id: string;
    title: string;
    price_per_night: number;
    images: string[] | null;
    wilaya: string;
    type: string;
    rating?: number; // Optional until backend sends it
}

const CATEGORIES = ["All", "Hotel", "Agency", "Transport"];

// ... imports

export function BestDeals() {
    // ... hooks
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: true }),
    ]);
    const [listings, setListings] = useState<Listing[]>([]);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const fetchDeals = async () => {
            const supabase = createClient();
            let query = supabase
                .from("listings")
                .select("id, title, price_per_night, images, wilaya, type")
                .order("price_per_night", { ascending: true })
                .limit(10); // Get top 10 cheapest

            if (activeCategory !== "All") {
                query = query.eq("type", activeCategory.toLowerCase());
            }

            const { data } = await query;
            if (data) setListings(data as Listing[]);
        };

        fetchDeals();
    }, [activeCategory]);

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Unbeatable Deals</h2>
                        <p className="text-muted-foreground mt-2">
                            Top-rated stays and experiences at the lowest prices.
                        </p>
                    </div>

                    {/* Categories Tabs */}
                    <div className="flex gap-2 p-1 bg-muted rounded-full overflow-x-auto max-w-full">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                                    activeCategory === cat
                                        ? "bg-brand text-white shadow-md transform scale-105"
                                        : "hover:bg-background/50 hover:text-foreground text-muted-foreground"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4">
                        {listings.map((listing) => (
                            <div key={listing.id} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_30%] min-w-0 pl-4">
                                <Link href={`/listing/${listing.id}`}>
                                    <Card className="group h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            {listing.images?.[0] ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={listing.images[0]}
                                                    alt={listing.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-muted flex items-center justify-center">
                                                    <span className="text-muted-foreground">No Image</span>
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2">
                                                <Badge className="bg-background/80 hover:bg-background/90 text-foreground backdrop-blur-md shadow-sm">
                                                    {listing.type}
                                                </Badge>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <p className="text-white font-medium flex items-center gap-1">
                                                    View Details <ArrowRight className="h-4 w-4" />
                                                </p>
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg line-clamp-1 group-hover:text-brand transition-colors">
                                                    {listing.title}
                                                </h3>
                                                <div className="flex items-center gap-1 text-amber-500">
                                                    <Star className="h-4 w-4 fill-current" />
                                                    <span className="text-sm font-medium">4.8</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center text-muted-foreground text-sm mb-4">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                <span className="capitalize">{listing.wilaya}</span>
                                            </div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-bold text-brand">
                                                    {listing.price_per_night.toLocaleString()} DZD
                                                </span>
                                                <span className="text-xs text-muted-foreground">/ night</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                        {listings.length === 0 && (
                            <div className="flex-[0_0_100%] pl-4 text-center py-12">
                                <p className="text-muted-foreground">No deals found for this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
