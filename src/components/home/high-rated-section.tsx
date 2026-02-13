"use client";

import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function HighRatedSection() {
    const t = useTranslations("home");
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from("listings")
                .select("id, title, type, rating_avg, rating_count, images, wilaya")
                .order("rating_avg", { ascending: false })
                .limit(5);

            if (data) setListings(data);
            setLoading(false);
        };
        fetchListings();
    }, []);

    if (loading) return null;
    if (listings.length === 0) return null;

    return (
        <section className="px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-4 text-lg font-medium text-muted-foreground">{t("topRated")}</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {listings.map((item) => (
                        <Link key={item.id} href={`/listing/${item.id}`} className="min-w-[200px] md:min-w-[240px]">
                            <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative h-32 w-full bg-muted">
                                    {item.images && item.images[0] ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                            <Star className="h-8 w-8 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/50 px-1.5 py-0.5 text-xs text-white backdrop-blur-sm">
                                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                        <span>{item.rating_avg}</span>
                                        <span className="text-[10px] text-white/70">({item.rating_count})</span>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold truncate text-sm">{item.title}</h3>
                                    <p className="text-xs text-muted-foreground capitalize">{item.type} • {item.wilaya}</p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
