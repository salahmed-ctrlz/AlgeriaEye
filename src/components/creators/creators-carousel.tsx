"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { creators } from "@/data/creators";
import { InstagramEmbed } from "./instagram-embed";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useCallback, useEffect, useState } from "react";

export function CreatorsCarousel() {
    const t = useTranslations("home");
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        skipSnaps: false,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        onSelect();
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const featuredCreator = creators[0];
    const latestContent = featuredCreator.content.slice(0, 5);

    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Layered Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <Badge
                            variant="outline"
                            className="border-brand/20 text-brand bg-brand/5 backdrop-blur-xl px-3 py-1 text-xs font-medium tracking-wide uppercase"
                        >
                            <Sparkles className="h-3 w-3 mr-1.5" />
                            {t("trendingNow")}
                        </Badge>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                            {t("seenByCreators")}
                        </h2>
                        <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
                            {t("creatorsSubtitle")}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={scrollPrev}
                                className="
                                    relative rounded-full h-11 w-11
                                    border border-white/[0.08]
                                    bg-white/[0.03] backdrop-blur-xl
                                    hover:bg-white/[0.08] hover:border-white/[0.15]
                                    transition-all duration-300 ease-out
                                    shadow-[0_0_1px_0_rgba(255,255,255,0.05),0_2px_8px_-2px_rgba(0,0,0,0.3)]
                                    hover:shadow-[0_0_1px_0_rgba(255,255,255,0.1),0_4px_16px_-4px_rgba(0,0,0,0.4)]
                                "
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={scrollNext}
                                className="
                                    relative rounded-full h-11 w-11
                                    border border-white/[0.08]
                                    bg-white/[0.03] backdrop-blur-xl
                                    hover:bg-white/[0.08] hover:border-white/[0.15]
                                    transition-all duration-300 ease-out
                                    shadow-[0_0_1px_0_rgba(255,255,255,0.05),0_2px_8px_-2px_rgba(0,0,0,0.3)]
                                    hover:shadow-[0_0_1px_0_rgba(255,255,255,0.1),0_4px_16px_-4px_rgba(0,0,0,0.4)]
                                "
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="h-8 w-px bg-white/[0.06]" />
                        <Link href={`/creators/${featuredCreator.slug}`}>
                            <Button
                                variant="ghost"
                                className="group text-sm font-medium hover:bg-white/[0.05]"
                            >
                                {t("viewProfile")}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-5">
                        {latestContent.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex-[0_0_88%] sm:flex-[0_0_65%] md:flex-[0_0_42%] lg:flex-[0_0_32%] min-w-0 pl-5"
                            >
                                {/* Glass Card */}
                                <div
                                    className="
                                        group relative h-full rounded-2xl
                                        border border-white/[0.06]
                                        bg-white/[0.02] backdrop-blur-2xl
                                        shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_4px_24px_-4px_rgba(0,0,0,0.25),0_12px_48px_-8px_rgba(0,0,0,0.15)]
                                        hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_8px_32px_-4px_rgba(0,0,0,0.35),0_16px_64px_-8px_rgba(0,0,0,0.2)]
                                        hover:border-white/[0.1]
                                        hover:bg-white/[0.04]
                                        transition-all duration-500 ease-out
                                        overflow-hidden
                                    "
                                >
                                    {/* Subtle top highlight */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                                    {/* Inner glow on hover */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-brand/[0.03] via-transparent to-transparent pointer-events-none" />

                                    {/* Content wrapper */}
                                    <div className="relative p-3 pb-4">
                                        {/* Embed container */}
                                        <div className="rounded-xl overflow-hidden bg-black/20 ring-1 ring-white/[0.04] h-[550px]">
                                            <InstagramEmbed
                                                url={item.url}
                                                maxWidth={400}
                                                creator={{
                                                    name: featuredCreator.name,
                                                    avatar: featuredCreator.avatar
                                                }}
                                            />
                                        </div>

                                        {/* Bottom bar */}
                                        {/* Bottom bar */}
                                        <div className="flex items-center justify-between mt-3 px-1">
                                            <div className="flex items-center gap-2">
                                                <div className="relative h-6 w-6 rounded-full overflow-hidden ring-1 ring-white/20">
                                                    <Image
                                                        src={featuredCreator.avatar}
                                                        alt={featuredCreator.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-xs text-white/90 font-medium">
                                                    {featuredCreator.name}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground/40 font-mono tracking-wider uppercase">
                                                {String(index + 1).padStart(2, "0")}/{String(latestContent.length).padStart(2, "0")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-1.5 mt-8">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi && emblaApi.scrollTo(index)}
                            className={`
                                h-1.5 rounded-full transition-all duration-300 ease-out
                                ${index === selectedIndex
                                    ? "w-8 bg-brand/70"
                                    : "w-1.5 bg-white/[0.1] hover:bg-white/[0.2]"
                                }
                            `}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}