"use client";

import Image from "next/image";
import { Creator } from "@/data/creators";
import { InstagramEmbed } from "./instagram-embed";
import { Badge } from "@/components/ui/badge";
import {
    Instagram,
    Youtube,
    BadgeCheck,
    Grid3X3,
    ExternalLink,
    Sparkles,
    Users,
    Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface CreatorProfileProps {
    creator: Creator;
}

export function CreatorProfile({ creator }: CreatorProfileProps) {
    const locale = useLocale() as "en" | "fr" | "ar";

    const instagramCount = creator.content.filter(
        (c) => c.type === "instagram"
    ).length;
    const youtubeCount = creator.content.filter(
        (c) => c.type === "youtube"
    ).length;

    return (
        <div className="min-h-screen bg-background">
            {/* ── Hero ── */}
            <div className="relative w-full overflow-hidden">
                {/* Layered background */}
                <div className="absolute inset-0">
                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/15 via-brand/5 to-purple-500/10" />

                    {/* Blurred avatar as backdrop */}
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src={creator.avatar}
                            alt=""
                            fill
                            className="object-cover blur-3xl scale-150"
                            sizes="100vw"
                            priority
                        />
                    </div>

                    {/* Noise texture overlay */}
                    <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />

                    {/* Gradient fade to background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
                </div>

                {/* Decorative orbs */}
                <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-brand/10 blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-20 h-60 w-60 rounded-full bg-purple-500/10 blur-[80px] pointer-events-none" />

                {/* Content */}
                <div className="container mx-auto px-4 md:px-8 relative z-10 pt-24 pb-16 md:pt-32 md:pb-20">
                    <div className="flex flex-col items-center text-center gap-6">
                        {/* Avatar */}
                        <div className="relative group">
                            {/* Glow ring */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-brand/50 via-purple-500/30 to-brand/50 opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-500" />

                            <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full border-[3px] border-background/80 overflow-hidden shadow-2xl">
                                <Image
                                    src={creator.avatar}
                                    alt={creator.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 112px, 144px"
                                    priority
                                />
                            </div>

                            {/* Online indicator */}
                            <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 h-5 w-5 rounded-full bg-emerald-500 border-[3px] border-background shadow-lg" />
                        </div>

                        {/* Name + Verified + Handle */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2.5">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                                    {creator.name}
                                </h1>
                                <BadgeCheck className="h-7 w-7 md:h-8 md:w-8 text-brand fill-brand/20 shrink-0" />
                            </div>

                            {/* Handle row */}
                            <div className="flex items-center justify-center gap-3">
                                <a
                                    href={`https://instagram.com/${creator.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-muted-foreground hover:text-brand transition-colors duration-200 group/handle"
                                >
                                    <Instagram className="h-4 w-4 group-hover/handle:text-brand transition-colors" />
                                    <span className="text-sm font-medium">@{creator.slug}</span>
                                    <ExternalLink className="h-3 w-3 opacity-0 -translate-x-1 group-hover/handle:opacity-100 group-hover/handle:translate-x-0 transition-all duration-200" />
                                </a>
                            </div>
                        </div>

                        {/* Bio (if available) */}
                        {creator.bio && (
                            <p className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed">
                                {typeof creator.bio === "string"
                                    ? creator.bio
                                    : creator.bio[locale] || creator.bio.en}
                            </p>
                        )}

                        {/* Stats row */}
                        <div className="flex items-center gap-1">
                            {/* Glass stat cards */}
                            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-brand/10">
                                        <Grid3X3 className="h-4 w-4 text-brand" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-lg font-bold text-white leading-none">
                                            {creator.content.length}
                                        </p>
                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-medium">
                                            Posts
                                        </p>
                                    </div>
                                </div>

                                <div className="h-8 w-px bg-white/[0.06]" />

                                {instagramCount > 0 && (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-pink-500/10">
                                                <Instagram className="h-4 w-4 text-pink-400" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-lg font-bold text-white leading-none">
                                                    {instagramCount}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-medium">
                                                    Reels
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {youtubeCount > 0 && (
                                    <>
                                        <div className="h-8 w-px bg-white/[0.06]" />
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-red-500/10">
                                                <Youtube className="h-4 w-4 text-red-400" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-lg font-bold text-white leading-none">
                                                    {youtubeCount}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-medium">
                                                    Videos
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* CTA buttons */}
                        <div className="flex items-center gap-3 pt-2">
                            <a
                                href={`https://instagram.com/${creator.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="rounded-full px-6 gap-2 bg-gradient-to-r from-brand to-purple-500 hover:from-brand/90 hover:to-purple-500/90 border-0 shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand/30 hover:scale-[1.02]">
                                    <Instagram className="h-4 w-4" />
                                    Follow on Instagram
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Content Section ── */}
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
                {/* Section header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-brand/10 border border-brand/20">
                            <Sparkles className="h-5 w-5 text-brand" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                                Latest Content
                            </h2>
                            <p className="text-sm text-muted-foreground/60">
                                Explore {creator.name}&apos;s posts about Algeria
                            </p>
                        </div>
                    </div>

                    {/* Filter pills */}
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 cursor-pointer hover:bg-white/[0.06] transition-colors"
                        >
                            All ({creator.content.length})
                        </Badge>
                        {instagramCount > 0 && (
                            <Badge
                                variant="outline"
                                className="border-pink-500/20 bg-pink-500/5 text-pink-400 px-3 py-1.5 cursor-pointer hover:bg-pink-500/10 transition-colors"
                            >
                                <Instagram className="h-3 w-3 mr-1" />
                                Reels ({instagramCount})
                            </Badge>
                        )}
                        {youtubeCount > 0 && (
                            <Badge
                                variant="outline"
                                className="border-red-500/20 bg-red-500/5 text-red-400 px-3 py-1.5 cursor-pointer hover:bg-red-500/10 transition-colors"
                            >
                                <Youtube className="h-3 w-3 mr-1" />
                                Videos ({youtubeCount})
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Masonry grid with glass cards */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
                    {creator.content.map((item, index) => (
                        <div key={item.id} className="break-inside-avoid">
                            {/* Glass card wrapper */}
                            <div
                                className={[
                                    "group relative rounded-2xl overflow-hidden",
                                    "border border-white/[0.06]",
                                    "bg-white/[0.02] backdrop-blur-xl",
                                    "shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_4px_24px_-4px_rgba(0,0,0,0.25)]",
                                    "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_8px_32px_-4px_rgba(0,0,0,0.35)]",
                                    "hover:border-white/[0.1]",
                                    "hover:bg-white/[0.04]",
                                    "transition-all duration-500 ease-out",
                                ].join(" ")}
                            >
                                {/* Top highlight */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-10" />

                                {/* Hover glow */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-brand/[0.03] via-transparent to-transparent pointer-events-none z-10" />

                                {/* Content */}
                                <div className="relative p-2.5 pb-3">
                                    {item.type === "instagram" ? (
                                        <div className="rounded-xl overflow-hidden ring-1 ring-white/[0.04]">
                                            <InstagramEmbed
                                                url={item.url}
                                                thumbnail={item.thumbnail}
                                                captioned={false}
                                            />
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-black/20 rounded-xl flex items-center justify-center ring-1 ring-white/[0.04]">
                                            <Youtube className="h-8 w-8 text-red-400/40" />
                                        </div>
                                    )}

                                    {/* Card footer */}
                                    <div className="flex items-center justify-between mt-2.5 px-1.5">
                                        <div className="flex items-center gap-2">
                                            <div className="relative h-6 w-6 rounded-full overflow-hidden ring-1 ring-white/[0.08]">
                                                <Image
                                                    src={creator.avatar}
                                                    alt=""
                                                    fill
                                                    className="object-cover"
                                                    sizes="24px"
                                                />
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs font-medium text-muted-foreground/70">
                                                    @{creator.slug}
                                                </span>
                                                <BadgeCheck className="h-3 w-3 text-brand/60 fill-brand/10" />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {item.type === "instagram" ? (
                                                <Instagram className="h-3 w-3 text-pink-400/40" />
                                            ) : (
                                                <Youtube className="h-3 w-3 text-red-400/40" />
                                            )}
                                            <span className="text-[10px] text-muted-foreground/30 font-mono tracking-wider">
                                                {String(index + 1).padStart(2, "0")}/
                                                {String(creator.content.length).padStart(2, "0")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="flex justify-center mt-16">
                    <div className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl max-w-md w-full text-center">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand/10">
                            <Heart className="h-5 w-5 text-brand" />
                        </div>
                        <div>
                            <p className="font-semibold text-white mb-1">
                                Enjoy {creator.name}&apos;s content?
                            </p>
                            <p className="text-sm text-muted-foreground/60">
                                Follow them on Instagram for more amazing content about Algeria
                            </p>
                        </div>
                        <a
                            href={`https://instagram.com/${creator.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                className="rounded-full px-6 gap-2 border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-sm"
                            >
                                <Instagram className="h-4 w-4" />
                                Follow @{creator.slug}
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}