"use client";

import Image from "next/image";
import { Creator } from "@/data/creators";
import { InstagramEmbed } from "./instagram-embed";
import {
    Youtube,
    BadgeCheck,
    Grid3X3,
    UserPlus,
    Check,
    Film,
    Play,
    LayoutGrid,
    ImageIcon,
    ArrowLeft,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState, useEffect, useMemo } from "react";

interface CreatorProfileProps {
    creator: Creator;
}

type FilterType = "all" | "reels" | "posts" | "youtube";

// Determine if an Instagram URL is a reel or a post
function getInstagramType(url: string): "reels" | "posts" {
    if (/\/(reel|reels)\//i.test(url)) return "reels";
    return "posts";
}

export function CreatorProfile({ creator }: CreatorProfileProps) {
    const locale = useLocale() as "en" | "fr" | "ar";
    const t = useTranslations("common");
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    // Categorize content
    const categorized = useMemo(() => {
        return creator.content.map((item) => ({
            ...item,
            category:
                item.type === "youtube"
                    ? ("youtube" as const)
                    : getInstagramType(item.url),
        }));
    }, [creator.content]);

    const reelsCount = categorized.filter((c) => c.category === "reels").length;
    const postsCount = categorized.filter((c) => c.category === "posts").length;
    const youtubeCount = categorized.filter(
        (c) => c.category === "youtube"
    ).length;

    const filteredContent = categorized.filter((item) => {
        if (activeFilter === "all") return true;
        return item.category === activeFilter;
    });

    // Available filters (only show tabs that have content)
    const filters = useMemo(() => {
        const list: {
            key: FilterType;
            label: string;
            icon: React.ReactNode;
            count: number;
        }[] = [
                {
                    key: "all",
                    label: "All",
                    icon: <LayoutGrid className="h-4 w-4" />,
                    count: creator.content?.length || 0,
                },
            ];

        if (reelsCount > 0) {
            list.push({
                key: "reels",
                label: "Reels",
                icon: <Film className="h-4 w-4" />,
                count: reelsCount,
            });
        }

        if (postsCount > 0) {
            list.push({
                key: "posts",
                label: "Posts",
                icon: <ImageIcon className="h-4 w-4" />,
                count: postsCount,
            });
        }

        if (youtubeCount > 0) {
            list.push({
                key: "youtube",
                label: "Videos",
                icon: <Play className="h-4 w-4" />,
                count: youtubeCount,
            });
        }

        return list;
    }, [creator.content?.length, reelsCount, postsCount, youtubeCount]);

    useEffect(() => {
        let hash = 0;
        for (let i = 0; i < creator.slug.length; i++) {
            hash = (hash << 5) - hash + creator.slug.charCodeAt(i);
            hash |= 0;
        }
        setFollowerCount(Math.abs(hash % 50000) + 10000);
    }, [creator.slug]);

    useEffect(() => {
        const stored = localStorage.getItem(`follow-${creator.slug}`);
        if (stored === "true") setIsFollowing(true);
    }, [creator.slug]);

    useEffect(() => {
        localStorage.setItem(`follow-${creator.slug}`, String(isFollowing));
    }, [isFollowing, creator.slug]);

    const handleFollow = () => {
        if (isFollowing) {
            setIsFollowing(false);
            setFollowerCount((c) => c - 1);
        } else {
            setIsFollowing(true);
            setFollowerCount((c) => c + 1);
        }
    };

    const formatCount = (n: number) => {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
        if (n >= 1000) return (n / 1000).toFixed(1) + "K";
        return n.toString();
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* ── HERO ── */}
            <section className="relative w-full overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-background" />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-purple-500/10" />
                    <div className="absolute inset-0 opacity-10 dark:opacity-20">
                        <Image
                            src={creator.avatar}
                            alt=""
                            fill
                            className="object-cover blur-3xl scale-150"
                            sizes="100vw"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
                </div>

                <div className="absolute top-4 left-4 z-20">
                    <Link href="/creators">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 backdrop-blur-md border border-white/10 hover:bg-background/40 transition-colors text-foreground">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">{t("back")}</span>
                        </button>
                    </Link>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center px-4 pt-28 pb-10 md:pt-36 md:pb-14 gap-5 max-w-2xl mx-auto">
                    {/* Avatar */}
                    <div className="relative group shrink-0">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-brand/50 via-purple-500/30 to-brand/50 opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-500" />
                        <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full border-[3px] border-background overflow-hidden shadow-2xl">
                            <Image
                                src={creator.avatar}
                                alt={creator.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 112px, 144px"
                                priority
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 h-5 w-5 rounded-full bg-emerald-500 border-[3px] border-background shadow-lg" />
                    </div>

                    {/* Name + Verified */}
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                            {creator.name}
                        </h1>
                        <BadgeCheck className="h-7 w-7 md:h-8 md:w-8 text-brand fill-brand/20 shrink-0" />
                    </div>

                    <p className="text-sm text-muted-foreground font-medium -mt-2">
                        Content Creator · Algeria
                    </p>

                    {creator.bio && (
                        <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
                            {typeof creator.bio === "string"
                                ? creator.bio
                                : creator.bio?.[locale] || creator.bio?.en || ""}
                        </p>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-8 md:gap-10 py-2">
                        <Stat value={creator.content?.length || 0} label="Posts" />
                        <div className="h-8 w-px bg-border/40" />
                        <Stat value={formatCount(followerCount)} label="Followers" />
                        <div className="h-8 w-px bg-border/40" />
                        <Stat
                            value={formatCount(Math.floor(followerCount * 0.3))}
                            label="Following"
                        />
                    </div>

                    {/* Follow button */}
                    <FollowButton isFollowing={isFollowing} onToggle={handleFollow} />
                </div>
            </section>

            {/* ── TAB BAR ── */}
            <nav className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border/40">
                <div className="flex items-center justify-center overflow-x-auto scrollbar-none">
                    <div className="flex items-center">
                        {filters.map((filter) => (
                            <FilterTab
                                key={filter.key}
                                active={activeFilter === filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                icon={filter.icon}
                                label={filter.label}
                                count={filter.count}
                            />
                        ))}
                    </div>
                </div>
            </nav>

            {/* ── CONTENT GRID ── */}
            <main className="container mx-auto px-4 md:px-8 py-10 md:py-14">
                {/* Active filter indicator */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-muted-foreground">
                        Showing{" "}
                        <span className="font-semibold text-foreground">
                            {filteredContent.length}
                        </span>{" "}
                        {activeFilter === "all"
                            ? "items"
                            : activeFilter === "reels"
                                ? "reels"
                                : activeFilter === "posts"
                                    ? "posts"
                                    : "videos"}
                    </p>

                    {activeFilter !== "all" && (
                        <button
                            onClick={() => setActiveFilter("all")}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                        >
                            Clear filter
                        </button>
                    )}
                </div>

                {filteredContent.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                            <Grid3X3 className="h-7 w-7 text-muted-foreground/40" />
                        </div>
                        <p className="text-muted-foreground/60 text-sm">
                            No content in this category yet
                        </p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance] space-y-5">
                        {filteredContent.map((item, index) => (
                            <div key={item.id} className="break-inside-avoid">
                                <ContentCard
                                    item={item}
                                    category={item.category}
                                    index={index}
                                    total={filteredContent.length}
                                    creator={creator}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

/* ── Stat ── */
function Stat({ value, label }: { value: string | number; label: string }) {
    return (
        <div className="flex flex-col items-center gap-0.5 min-w-[3.5rem]">
            <span className="text-xl md:text-2xl font-bold leading-none tabular-nums">
                {value}
            </span>
            <span className="text-[11px] text-muted-foreground/60 font-medium">
                {label}
            </span>
        </div>
    );
}

/* ── Follow Button ── */
function FollowButton({
    isFollowing,
    onToggle,
}: {
    isFollowing: boolean;
    onToggle: () => void;
}) {
    return (
        <button
            onClick={onToggle}
            className={[
                "relative rounded-full px-8 py-2.5 min-w-[140px]",
                "font-semibold text-sm",
                "transition-all duration-300 ease-out",
                "active:scale-95",
                isFollowing
                    ? [
                        "border-2",
                        "border-emerald-600 text-emerald-600",
                        "dark:border-emerald-500 dark:text-emerald-500",
                        "hover:border-red-500 hover:text-red-500",
                        "dark:hover:border-red-400 dark:hover:text-red-400",
                        "bg-transparent",
                    ].join(" ")
                    : [
                        "border-2 border-transparent",
                        "bg-foreground text-emerald-500",
                        "dark:bg-white dark:text-emerald-600",
                        "hover:opacity-90",
                        "shadow-sm hover:shadow-md",
                    ].join(" "),
            ].join(" ")}
        >
            <span className="flex items-center justify-center gap-2">
                {isFollowing ? (
                    <>
                        <Check className="h-4 w-4" />
                        <span>Following</span>
                    </>
                ) : (
                    <>
                        <UserPlus className="h-4 w-4" />
                        <span>Follow</span>
                    </>
                )}
            </span>
        </button>
    );
}

/* ── Filter Tab ── */
function FilterTab({
    active,
    onClick,
    icon,
    label,
    count,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    count: number;
}) {
    return (
        <button
            onClick={onClick}
            className={[
                "flex items-center justify-center gap-1.5",
                "px-5 py-3",
                "text-sm font-medium whitespace-nowrap",
                "border-b-2",
                "transition-all duration-200",
                active
                    ? "text-foreground border-foreground"
                    : "text-muted-foreground border-transparent hover:text-foreground",
            ].join(" ")}
        >
            {icon}
            <span>{label}</span>
            <span
                className={[
                    "text-[10px] font-mono ml-0.5 tabular-nums",
                    active ? "opacity-100" : "opacity-50",
                ].join(" ")}
            >
                {count}
            </span>
        </button>
    );
}

/* ── Content Card ── */
function ContentCard({
    item,
    category,
    index,
    total,
    creator,
}: {
    item: Creator["content"][number];
    category: "reels" | "posts" | "youtube";
    index: number;
    total: number;
    creator: Creator;
}) {
    const categoryLabel =
        category === "reels" ? "Reel" : category === "posts" ? "Post" : "Video";

    const CategoryIcon =
        category === "reels" ? Film : category === "posts" ? ImageIcon : Play;

    return (
        <div
            className={[
                "group relative rounded-2xl overflow-hidden",
                "border border-border/40 dark:border-white/[0.06]",
                "bg-card dark:bg-white/[0.02] backdrop-blur-xl",
                "shadow-sm hover:shadow-md",
                "hover:border-primary/20 dark:hover:border-white/[0.1]",
                "transition-all duration-500 ease-out",
            ].join(" ")}
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/5 dark:via-white/[0.08] to-transparent z-10" />

            <div className="relative p-2.5 pb-3">
                {item.type === "instagram" ? (
                    <div className="rounded-xl overflow-hidden ring-1 ring-border/50 dark:ring-white/[0.04]">
                        <InstagramEmbed url={item.url} captioned={true} />
                    </div>
                ) : (
                    <div className="aspect-video bg-muted rounded-xl flex items-center justify-center ring-1 ring-border/50 dark:ring-white/[0.04]">
                        <Youtube className="h-8 w-8 text-red-500/40" />
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-2.5 px-1">
                    {/* Left: avatar + name + badge */}
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="relative h-6 w-6 shrink-0 rounded-full overflow-hidden ring-1 ring-border dark:ring-white/[0.08]">
                            <Image
                                src={creator.avatar}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="24px"
                            />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground truncate">
                            {creator.name}
                        </span>
                        <BadgeCheck className="h-3 w-3 shrink-0 text-brand/60 fill-brand/10" />
                    </div>

                    {/* Right: category tag + counter */}
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground/60 bg-muted/50 dark:bg-white/[0.04] px-2 py-0.5 rounded-full">
                            <CategoryIcon className="h-2.5 w-2.5" />
                            {categoryLabel}
                        </span>
                        <span className="text-[10px] text-muted-foreground/50 font-mono tabular-nums tracking-wider">
                            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}