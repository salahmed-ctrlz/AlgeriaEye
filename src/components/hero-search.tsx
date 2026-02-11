"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Search, MapPin, Shield, Headphones } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HeroSearch() {
    const t = useTranslations("hero");
    const locale = useLocale();
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(
                `/${locale}/search?q=${encodeURIComponent(query.trim())}`
            );
        }
    };

    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/hero-new.jpg"
                    alt="Algeria Landscape"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                {/* Badge */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md animate-fade-in shadow-lg">
                    {t("badge")}
                </div>

                {/* Title */}
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl animate-fade-in-up text-white drop-shadow-md">
                    {t("title").split(" ").map((word, i) => (
                        <span
                            key={i}
                            className={
                                word === "Algeria" || word === "الجزائر"
                                    ? "text-brand-light"
                                    : ""
                            }
                        >
                            {word}{" "}
                        </span>
                    ))}
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-100 sm:text-xl leading-relaxed animate-fade-in-up-delayed drop-shadow-sm">
                    {t("subtitle")}
                </p>

                {/* Search Bar — Refined Glassmorphism */}
                <form
                    onSubmit={handleSearch}
                    className="mx-auto mt-10 flex w-full max-w-2xl items-center gap-2 animate-fade-in-up-delayed-2"
                >
                    <div className="relative flex flex-1 items-center gap-3 rounded-full border border-white/20 bg-background/95 px-6 py-4 shadow-xl backdrop-blur-md transition-all focus-within:ring-1 focus-within:ring-white/30">
                        <Search className="h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder={t("searchPlaceholder")}
                            className="border-none bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 text-lg h-full p-0"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                        />
                        <Button
                            size="icon"
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-brand p-2 text-white shadow-lg transition-transform hover:bg-brand-light hover:scale-105 active:scale-95 h-10 w-10"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </form>

                {/* Trust badges */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-white animate-fade-in-up-delayed-3 drop-shadow-md">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-brand/60" />
                        <span>{t("trust1")}</span>
                    </div>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-brand/60" />
                        <span>{t("trust2")}</span>
                    </div>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-2">
                        <Headphones className="h-4 w-4 text-brand/60" />
                        <span>{t("trust3")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
