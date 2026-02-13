"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Search, MapPin, Shield, Headphones } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HeroSearch() {
    const t = useTranslations("hero");
    const locale = useLocale();
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const getTargetWords = () => {
        switch (locale) {
            case "fr":
                return ["l'Algérie", "ⴷⵣⴰⵢⴻⵔ"];
            case "ar":
                return ["الجزائر", "ⴷⵣⴰⵢⴻⵔ"];
            default:
                return ["Algeria", "ⴷⵣⴰⵢⴻⵔ"];
        }
    };

    const WORDS = getTargetWords();

    // Cycle words every 3.5s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [locale]); // Reset on locale change

    // Smart Redirect Map (Scalable)
    const WILAYA_REDIRECTS: Record<string, string> = {
        "algiers": "algiers", "الجزائر": "algiers",
        "العاصمة": "algiers",
        "الجزائر العاصمة": "algiers",
        "alger": "algiers",
        "el djazair": "algiers",
        "wilaya 16": "algiers",
        "16": "algiers",
        "oran": "oran",
        "وهران": "oran",
        "وهرن": "oran",
        "wahran": "oran",
        "wilaya 31": "oran",
        "31": "oran",
        "constantine": "constantine",
        "قسنطينة": "constantine",
        "qacentina": "constantine",
        "wilaya 25": "constantine",
        "25": "constantine",
        "annaba": "annaba",
        "عنابة": "annaba",
        "wilaya 23": "annaba",
        "23": "annaba",
        "tlemcen": "tlemcen",
        "تلمسان": "tlemcen",
        "13": "tlemcen",
        "ghardaia": "ghardaia",
        "غرداية": "ghardaia",
        "47": "ghardaia",
        "biskra": "biskra",
        "بسكرة": "biskra",
        "07": "biskra",
        "7": "biskra",
        "setif": "setif",
        "سطيف": "setif",
        "19": "setif",
        "msila": "msila",
        "المسيلة": "msila",
        "28": "msila",
        "tamanrasset": "tamanrasset",
        "تمنراست": "tamanrasset",
        "62": "tamanrasset",
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();

        if (trimmedQuery) {
            const normalizedQuery = trimmedQuery.toLowerCase();
            const redirectSlug = WILAYA_REDIRECTS[normalizedQuery];

            if (redirectSlug) {
                router.push(`/${locale}/wilaya/${redirectSlug}`);
            } else {
                router.push(
                    `/${locale}/search?q=${encodeURIComponent(trimmedQuery)}`
                );
            }
        }
    };

    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/hero-image.webp"
                    alt="Algeria Landscape"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                {/* Badge */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md animate-fade-in shadow-lg hover:bg-white/20 transition-colors cursor-default">
                    {t("badge")}
                </div>

                {/* Title */}
                <h1
                    className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl animate-fade-in-up text-white drop-shadow-lg font-sans ${locale === 'ar' ? 'font-cairo' : ''}`}
                    dir={locale === 'ar' ? "rtl" : "ltr"}
                >
                    {locale === 'ar' ? (
                        /* Arabic Specific Layout: Static "Discover Beauty" + Fixed Width Dynamic "Algeria" */
                        <div className="flex items-center justify-center gap-4">
                            <span>اكتشف جمال</span>
                            <span className="inline-flex justify-center items-center w-[280px] text-brand-light transition-all duration-500">
                                <span key={currentWordIndex} className="animate-fade-in">
                                    {WORDS[currentWordIndex]}
                                </span>
                            </span>
                        </div>
                    ) : (
                        /* Default Layout for EN/FR */
                        t("title").split(" ").map((word, i) => {
                            const isTargetWord = ["Algeria", "Algérie", "l'Algérie"].some(w => word.includes(w));
                            if (isTargetWord) {
                                return (
                                    <span
                                        key={i}
                                        className="inline-block min-w-[220px] text-brand-light transition-all duration-500 text-center mx-2"
                                    >
                                        <span key={currentWordIndex} className="animate-fade-in">
                                            {WORDS[currentWordIndex]}{" "}
                                        </span>
                                    </span>
                                );
                            }
                            return <span key={i}>{word} </span>;
                        })
                    )}
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-100 sm:text-xl leading-relaxed animate-fade-in-up-delayed drop-shadow-md font-medium">
                    {t("subtitle")}
                </p>

                {/* Search Bar — Refined Glassmorphism (Dark Mode) */}
                <form
                    onSubmit={handleSearch}
                    className="mx-auto mt-10 flex w-full max-w-2xl items-center gap-2 animate-fade-in-up-delayed-2 px-2"
                >
                    <div className="group relative flex flex-1 items-center gap-3 rounded-full border border-white/10 bg-black/30 px-6 py-4 shadow-2xl backdrop-blur-3xl transition-all duration-300 hover:bg-black/40 hover:border-white/30 focus-within:bg-black/50 focus-within:border-brand/50 focus-within:ring-4 focus-within:ring-brand/20 focus-within:scale-[1.02]">
                        <Search className="h-6 w-6 text-white/50 group-focus-within:text-brand transition-colors" />
                        <Input
                            type="text"
                            placeholder={t("searchPlaceholder")}
                            className="border-none bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 text-lg h-full p-0 font-medium tracking-wide"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                        />
                        <Button
                            size="icon"
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-brand/90 p-2 text-white shadow-lg transition-transform hover:bg-brand hover:scale-110 active:scale-95 h-11 w-11 border border-white/10"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </form>

                {/* Trust badges — Enhanced Visibility */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-base font-bold text-white animate-fade-in-up-delayed-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-3 group">
                        <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all duration-300">
                            <MapPin className="h-5 w-5 text-brand-light group-hover:text-white transition-colors" />
                        </div>
                        <span className="group-hover:text-brand-light transition-colors duration-300">{t("trust1")}</span>
                    </div>
                    {/* <div className="hidden sm:block h-6 w-px bg-white/30" /> */}
                    <div className="flex items-center gap-3 group">
                        <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all duration-300">
                            <Shield className="h-5 w-5 text-brand-light group-hover:text-white transition-colors" />
                        </div>
                        <span className="group-hover:text-brand-light transition-colors duration-300">{t("trust2")}</span>
                    </div>
                    {/* <div className="hidden sm:block h-6 w-px bg-white/30" /> */}
                    <div className="flex items-center gap-3 group">
                        <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all duration-300">
                            <Headphones className="h-5 w-5 text-brand-light group-hover:text-white transition-colors" />
                        </div>
                        <span className="group-hover:text-brand-light transition-colors duration-300">{t("trust3")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
