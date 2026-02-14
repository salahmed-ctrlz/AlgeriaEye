"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { creators } from "@/data/creators";
import { InstagramEmbed } from "./instagram-embed";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
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

    // Pick exactly one reel from each creator
    const mixedContent = creators.map(creator => ({
        item: creator.content.find(c => c.type === 'instagram') || creator.content[0],
        creator
    })).slice(0, 3);

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

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Link href="/creators">
                            <Button
                                className="
                                    group h-16 px-8 rounded-2xl
                                    bg-gradient-to-r from-red-600 via-red-500 to-red-600
                                    bg-[length:200%_auto] hover:bg-[100%_0]
                                    text-white font-bold text-lg
                                    shadow-xl shadow-red-900/20 hover:shadow-red-600/40
                                    transition-all duration-500 scale-100 hover:scale-105 active:scale-95
                                    flex items-center gap-3 border-0
                                "
                            >
                                <span className="relative z-10">{t("creatorsLounge")}</span>
                                <div className="relative z-10 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                    <Sparkles className="h-4 w-4 text-white animate-pulse" />
                                </div>
                            </Button>
                        </Link>

                        <div className="flex items-center gap-3 mt-4 sm:mt-0">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={scrollPrev}
                                className="
                                    relative rounded-full h-12 w-12
                                    border-2 border-brand/10 bg-white/5
                                    hover:bg-brand hover:text-white hover:border-brand
                                    transition-all duration-300
                                "
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={scrollNext}
                                className="
                                    relative rounded-full h-12 w-12
                                    border-2 border-brand/10 bg-white/5
                                    hover:bg-brand hover:text-white hover:border-brand
                                    transition-all duration-300
                                "
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-5">
                        {mixedContent.map(({ item, creator }, index) => (
                            <div
                                key={item.id}
                                className="flex-[0_0_88%] sm:flex-[0_0_65%] md:flex-[0_0_42%] lg:flex-[0_0_32%] min-w-0 pl-5"
                            >
                                <div
                                    className="
                                        group relative h-full rounded-[2.5rem]
                                        border border-white/[0.1]
                                        bg-white/[0.05] backdrop-blur-2xl
                                        shadow-2xl shadow-black/20
                                        hover:shadow-red-600/20 hover:border-red-500/30
                                        transition-all duration-700 ease-out
                                        overflow-hidden
                                    "
                                >
                                    <div className="relative p-4 pb-6">
                                        <div className="rounded-[2rem] overflow-hidden bg-black/40 ring-1 ring-white/10 h-[580px] relative">
                                            <InstagramEmbed
                                                url={item.url}
                                                maxWidth={400}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between mt-5 px-3">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-red-500/30">
                                                    <Image
                                                        src={creator.avatar}
                                                        alt={creator.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-white font-bold leading-none">
                                                        {creator.name}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground mt-0.5">
                                                        @{creator.slug}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                                                <Instagram className="h-4 w-4 text-red-500" />
                                            </div>
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