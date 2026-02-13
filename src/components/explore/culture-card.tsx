"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, EyeOff, MapPin } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ExploreItem } from "@/lib/data/explore-data";
import { useLocale } from "next-intl";

interface CultureCardProps {
    item: ExploreItem;
    isSelected?: boolean;
    isDimmed?: boolean;
    onSelect: (id: string | null) => void;
}

/* ─── Gallery Carousel ─── */
function GalleryCarousel({ images, title, gridMode = false }: { images: string[]; title: string; gridMode?: boolean }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const touchStartX = useRef(0);
    const touchDeltaX = useRef(0);

    const perPage = gridMode ? 4 : 2;
    const totalPages = Math.ceil(images.length / perPage);
    const maxIndex = Math.max(0, totalPages - 1);

    const goTo = useCallback((idx: number) => {
        setCurrentIndex(Math.max(0, Math.min(idx, maxIndex)));
    }, [maxIndex]);

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    // Auto-scroll every 3s
    useEffect(() => {
        timerRef.current = setInterval(next, 3000);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [next]);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(next, 3000);
    }, [next]);

    // Touch handlers for mobile drag
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };
    const handleTouchEnd = () => {
        if (touchDeltaX.current > 50) { prev(); resetTimer(); }
        else if (touchDeltaX.current < -50) { next(); resetTimer(); }
    };

    if (images.length === 0) return null;

    // Grid mode: paginate in groups of 4, render each page as a 2×2 grid
    if (gridMode) {
        const pages: string[][] = [];
        for (let i = 0; i < images.length; i += perPage) {
            pages.push(images.slice(i, i + perPage));
        }

        return (
            <div className="relative group">
                <div
                    className="overflow-hidden rounded-xl"
                    dir="ltr"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {pages.map((page, pageIdx) => (
                            <div key={pageIdx} className="shrink-0" style={{ minWidth: '100%' }}>
                                <div className="grid grid-cols-2 gap-2">
                                    {page.map((img, i) => (
                                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                                            <Image
                                                src={img}
                                                alt={`${title} gallery ${pageIdx * perPage + i + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nav Buttons (desktop only) */}
                {totalPages > 1 && (
                    <>
                        <button
                            onClick={() => { prev(); resetTimer(); }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => { next(); resetTimer(); }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </>
                )}

                {/* Dots indicator */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-1.5 mt-3">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { goTo(i); resetTimer(); }}
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                    i === currentIndex ? "bg-emerald-400 w-4" : "bg-white/30 hover:bg-white/50"
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Default mode: 2 visible, sliding by 1
    const maxSlideIndex = Math.max(0, images.length - perPage);

    return (
        <div className="relative group">
            {/* Track */}
            <div
                className="overflow-hidden rounded-xl"
                dir="ltr"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / perPage)}%)` }}
                >
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className="shrink-0 px-1.5"
                            style={{ width: `${100 / perPage}%` }}
                        >
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                                <Image
                                    src={img}
                                    alt={`${title} gallery ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nav Buttons (desktop only) */}
            {images.length > perPage && (
                <>
                    <button
                        onClick={() => { prev(); resetTimer(); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => { next(); resetTimer(); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </>
            )}

            {/* Dots indicator */}
            {images.length > perPage && (
                <div className="flex justify-center gap-1.5 mt-3">
                    {Array.from({ length: maxSlideIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { goTo(i); resetTimer(); }}
                            className={cn(
                                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                i === currentIndex ? "bg-emerald-400 w-4" : "bg-white/30 hover:bg-white/50"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ─── Main Card ─── */
export function CultureCard({
    item,
    isSelected,
    isDimmed,
    onSelect,
}: CultureCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const isAr = locale === "ar";
    const isFr = locale === "fr";
    const [notchHovered, setNotchHovered] = useState(false);
    const [showClip, setShowClip] = useState(false);

    // Helper for localized fields
    const getLocalized = (field: keyof ExploreItem) => {
        if (isAr && item[`${field}_ar` as keyof ExploreItem]) return item[`${field}_ar` as keyof ExploreItem];
        if (isFr && item[`${field}_fr` as keyof ExploreItem]) return item[`${field}_fr` as keyof ExploreItem];
        return item[field];
    };

    const title = getLocalized("title") as string;
    const subtitle = getLocalized("subtitle") as string;
    const region = getLocalized("region") as string;
    const description = getLocalized("description") as string;
    const history = getLocalized("history") as string;
    const locations = getLocalized("locations") as string[];

    // Delay clip-path until layout animation settles to prevent stutter
    useEffect(() => {
        if (isSelected) {
            const timer = setTimeout(() => setShowClip(true), 450);
            return () => clearTimeout(timer);
        } else {
            setShowClip(false);
        }
    }, [isSelected]);

    // Scroll selected card into view
    useEffect(() => {
        if (isSelected && ref.current) {
            // Small delay to let grid reflow before scrolling
            const timer = setTimeout(() => {
                ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isSelected]);

    // Unique clip-path ID per card to avoid collisions
    const clipId = `notch-clip-${item.id}`;

    return (
        <div
            ref={ref}
            className={cn(
                "relative ease-in-out",
                isSelected ? "z-50 col-span-1 md:col-span-2 row-span-2 h-[80vh] transition-none" : "h-96 cursor-pointer transition-[opacity,transform,filter] duration-500",
                isDimmed && !isSelected ? "opacity-30 scale-95 blur-[2px] pointer-events-none" : "opacity-100 scale-100"
            )}
            onClick={() => !isSelected && onSelect(item.id)}
            dir={isAr ? "rtl" : "ltr"}
        >
            {/* SVG clip-path definition (always rendered to avoid mount stutter) */}
            <svg width="0" height="0" className="absolute" aria-hidden="true">
                <defs>
                    <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        <path d={`
                            M 0.03,0
                            L 0.465,0
                            C 0.47,0 0.475,0.008 0.48,0.02
                            L 0.49,0.04
                            C 0.495,0.05 0.505,0.05 0.51,0.04
                            L 0.52,0.02
                            C 0.525,0.008 0.53,0 0.535,0
                            L 0.97,0
                            C 1,0 1,0.04 1,0.04
                            L 1,0.96
                            C 1,1 0.97,1 0.97,1
                            L 0.03,1
                            C 0,1 0,0.96 0,0.96
                            L 0,0.04
                            C 0,0 0.03,0 0.03,0
                            Z
                        `} />
                    </clipPath>
                </defs>
            </svg>

            {/* Close Button — sits OUTSIDE the clipped card, in the notch area */}
            {isSelected && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(null);
                    }}
                    onMouseEnter={() => setNotchHovered(true)}
                    onMouseLeave={() => setNotchHovered(false)}
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center text-black dark:text-white hover:scale-110 transition-all duration-200 drop-shadow-lg"
                    aria-label="Close"
                >
                    <span className="relative w-5 h-5">
                        <Eye className={cn("w-5 h-5 absolute inset-0 transition-all duration-300", notchHovered ? "opacity-0 scale-75" : "opacity-100 scale-100")} strokeWidth={1.5} />
                        <EyeOff className={cn("w-5 h-5 absolute inset-0 transition-all duration-300", notchHovered ? "opacity-100 scale-100" : "opacity-0 scale-75")} strokeWidth={1.5} />
                    </span>
                </button>
            )}

            {/* Card container — clip-path applied after layout animation settles */}
            <motion.div
                className="relative w-full h-full overflow-hidden shadow-2xl bg-black rounded-3xl"
                style={showClip ? { clipPath: `url(#${clipId})` } : undefined}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
                {/* Background Image */}
                <Image
                    src={item.image}
                    alt={title}
                    fill
                    className={cn(
                        "object-cover transition-transform duration-700",
                        isSelected ? "scale-105 blur-sm brightness-50" : "group-hover:scale-110 brightness-75"
                    )}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* --- EXPANDED VIEW CONTENT --- */}
                <AnimatePresence>
                    {isSelected && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className={cn(
                                "absolute inset-0 flex flex-col md:flex-row p-6 md:p-0 text-white overflow-hidden",
                                isAr ? "text-right" : "text-left"
                            )}
                        >

                            {/* Left Column: Title & Text Content */}
                            <div className="w-full md:w-5/12 h-full p-6 md:p-10 overflow-y-auto scrollbar-hide flex flex-col gap-8 relative z-10">
                                {/* Title Section */}
                                <div>
                                    <h5 className="text-sm font-medium tracking-widest text-emerald-400 uppercase mb-2">
                                        {subtitle}
                                    </h5>
                                    <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-2 leading-tight">
                                        {title}
                                    </h2>
                                    <div className={cn("flex items-center gap-2 text-white/60", isAr && "flex-row-reverse justify-end")}>
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm">{region}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className={cn("text-xl font-medium border-emerald-500 pl-4", isAr ? "border-r-2 pr-4 pl-0" : "border-l-2 pl-4")}>
                                        {isAr ? "التاريخ والسياق" : (isFr ? "Histoire & Contexte" : "History & Context")}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed font-light text-lg">
                                        {history}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className={cn("text-xl font-medium border-emerald-500 pl-4", isAr ? "border-r-2 pr-4 pl-0" : "border-l-2 pl-4")}>
                                        {isAr ? "أماكن الزيارة" : (isFr ? "Où le trouver" : "Where to Find It")}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {locations.map((loc, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-200 border border-white/5">
                                                {loc}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Media (Scrollable) */}
                            <div className="w-full md:w-7/12 h-full overflow-y-auto scrollbar-hide p-6 md:p-10 pt-0 md:pt-14 space-y-6">
                                {item.media.videoUrl && (
                                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl shrink-0">
                                        <iframe
                                            src={item.media.videoUrl}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                )}

                                {/* Gallery Carousel */}
                                {item.media.gallery.length > 0 && (
                                    <GalleryCarousel
                                        images={item.media.gallery}
                                        title={title}
                                        gridMode={item.category === "food" || item.category === "clothing"}
                                    />
                                )}

                                {/* Spacer */}
                                <div className="h-10" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- SUMMARY VIEW CONTENT (Default) --- */}
                {!isSelected && (
                    <div className={cn("absolute bottom-0 p-6 w-full", isAr ? "text-right" : "text-left")}>
                        <div className="backdrop-blur-md bg-white/10 p-5 rounded-xl border border-white/10 text-white transition-all duration-300 hover:bg-white/20">
                            <div>
                                <h4 className="text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-1">
                                    {subtitle}
                                </h4>
                                <h3 className="mb-2 text-2xl font-bold">{title}</h3>
                            </div>
                            <p className="text-gray-200 leading-relaxed text-sm line-clamp-2">
                                {description}
                            </p>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
