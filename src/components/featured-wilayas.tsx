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
        <section className="py-12 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="rounded-[2.5rem] bg-white/50 dark:bg-card/50 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-2xl shadow-brand/5 p-8 md:p-12 overflow-hidden relative">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand/5 via-transparent to-brand/5 opacity-50 pointer-events-none" />

                    {/* Header */}
                    <div className="relative mb-10 flex items-end justify-between z-10">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                                {t("featuredWilayasTitle")}
                            </h2>
                            <p className="mt-2 text-muted-foreground text-lg">
                                {t("featuredWilayasSubtitle")}
                            </p>
                        </div>
                        <div className="hidden gap-2 sm:flex">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => scroll("left")}
                                className="h-12 w-12 rounded-full border-border/50 bg-background/50 backdrop-blur-md hover:bg-brand hover:text-white hover:border-brand transition-all duration-300"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => scroll("right")}
                                className="h-12 w-12 rounded-full border-border/50 bg-background/50 backdrop-blur-md hover:bg-brand hover:text-white hover:border-brand transition-all duration-300"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div
                        ref={scrollRef}
                        className="relative z-10 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide pt-2"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {FEATURED_WILAYAS.map((wilaya, i) => (
                            <Link
                                key={wilaya.slug}
                                href={`/${locale}/wilaya/${wilaya.slug}`}
                                className="group flex-shrink-0 snap-start"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="relative h-[400px] w-[280px] overflow-hidden rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-brand/20 hover:-translate-y-2 group-hover:scale-[1.02]">
                                    {/* Image Background */}
                                    <div className="absolute inset-0 h-full w-full">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={wilaya.image}
                                            alt={wt(`${wilaya.slug}.name`)}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Gradient Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                    {/* Content overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                                        <h3 className="text-2xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            {wt(`${wilaya.slug}.name`)}
                                        </h3>
                                        <p className="text-sm text-white/90 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                                            {wt(`${wilaya.slug}.desc`)}
                                        </p>

                                        {/* Explore indicator */}
                                        <div className="mt-4 flex items-center gap-2 text-brand-light text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150">
                                            <span>Explore</span>
                                            <ChevronRight className="h-3 w-3" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
