"use client";

import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HighRatedSection() {
    const t = useTranslations("home");
    const locale = useLocale();
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
        <section className="py-12 px-4 md:px-8 bg-zinc-50/50 dark:bg-zinc-900/10">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">{t("topRated")}</h2>
                        <p className="text-muted-foreground mt-1">Most loved experiences in Algeria</p>
                    </div>
                    <Button variant="link" className="text-brand font-semibold hover:no-underline px-0">
                        Explore all <span className="ml-2">→</span>
                    </Button>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide -mx-4 px-4">
                    {listings.map((item) => (
                        <Link key={item.id} href={`/${locale}/listing/${item.id}`} className="min-w-[280px] md:min-w-[320px] group">
                            <Card className="overflow-hidden border border-white/40 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-brand/20 transition-all duration-500 hover:-translate-y-3 rounded-[2.5rem]">
                                <div className="relative h-48 w-full bg-muted overflow-hidden">
                                    {item.images && item.images[0] ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-brand/5">
                                            <Star className="h-10 w-10 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 shadow-lg px-3 py-1 text-xs font-bold text-white backdrop-blur-xl border border-white/20">
                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                        <span>{item.rating_avg}</span>
                                    </div>

                                    <div className="absolute bottom-4 left-4">
                                        <Badge className="bg-white/90 dark:bg-black/60 text-foreground dark:text-white backdrop-blur-md border-0 text-[10px] uppercase font-bold tracking-widest px-3">
                                            {item.type}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl truncate text-foreground group-hover:text-brand transition-colors duration-300">{item.title}</h3>
                                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                                        <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                                        <span className="text-sm font-medium">{item.wilaya}</span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
