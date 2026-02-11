"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const FEATURED_WILAYAS = [
    { slug: "algiers", image: "/images/algiers.jpg" },
    { slug: "constantine", image: "/images/constantine.jpg" },
    { slug: "oran", image: "/images/oran.jpg" },
    { slug: "annaba", image: "/images/annaba.jpg" },
    { slug: "msila", image: "/images/msila.jpg" },
    { slug: "biskra", image: "/images/biskra.jpg" },
    { slug: "tamanrasset", image: "/images/tamanrasset.jpg" },
];

export function FeaturedWilayas() {
    const t = useTranslations("home");
    const wt = useTranslations("wilayas");
    const locale = useLocale();
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = 340;
        scrollRef.current.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <section className="py-24 overflow-hidden bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            {t("featuredWilayasTitle")}
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            {t("featuredWilayasSubtitle")}
                        </p>
                    </div>
                    <div className="hidden gap-2 sm:flex">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("left")}
                            className="h-10 w-10 rounded-full border-border/50 hover:bg-brand/5 hover:border-brand/30"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("right")}
                            className="h-10 w-10 rounded-full border-border/50 hover:bg-brand/5 hover:border-brand/30"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {FEATURED_WILAYAS.map((wilaya, i) => (
                        <Link
                            key={wilaya.slug}
                            href={`/${locale}/wilaya/${wilaya.slug}`}
                            className="group flex-shrink-0 snap-start"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="relative h-[420px] w-[300px] overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-brand/20 hover:-translate-y-2">
                                {/* Image Background */}
                                <div className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={wilaya.image}
                                        alt={wt(`${wilaya.slug}.name`)}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Gradient Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                                {/* Content overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {wt(`${wilaya.slug}.name`)}
                                    </h3>
                                    <p className="text-sm text-white/80 leading-relaxed line-clamp-2">
                                        {wt(`${wilaya.slug}.desc`)}
                                    </p>

                                    {/* Explore indicator */}
                                    <div className="mt-4 flex items-center gap-2 text-white/60 text-xs font-medium tracking-wider uppercase transition-colors group-hover:text-white">
                                        <span>Explore</span>
                                        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
