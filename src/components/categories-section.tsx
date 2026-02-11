"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
    Hotel,
    UtensilsCrossed,
    Home,
    Compass,
    Sparkles,
    Car,
} from "lucide-react";

const CATEGORIES = [
    { type: "hotel", icon: Hotel, color: "from-emerald-500 to-teal-600" },
    { type: "restaurant", icon: UtensilsCrossed, color: "from-orange-500 to-red-600" },
    { type: "guesthouse", icon: Home, color: "from-blue-500 to-indigo-600" },
    { type: "tour", icon: Compass, color: "from-violet-500 to-purple-600" },
    { type: "experience", icon: Sparkles, color: "from-pink-500 to-rose-600" },
    { type: "transport", icon: Car, color: "from-amber-500 to-yellow-600" },
];

export function CategoriesSection() {
    const t = useTranslations("home");
    const ct = useTranslations("categories");
    const locale = useLocale();

    return (
        <section className="py-24 bg-secondary/30 dark:bg-secondary/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-14 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        {t("categoriesTitle")}
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        {t("categoriesSubtitle")}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {CATEGORIES.map((cat, i) => {
                        const Icon = cat.icon;
                        return (
                            <Link
                                key={cat.type}
                                href={`/${locale}/search?type=${cat.type}`}
                                className="group"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <div className="relative flex flex-col items-center gap-4 rounded-2xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1">
                                    {/* Icon container */}
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-semibold text-center">
                                        {ct(cat.type)}
                                    </span>

                                    {/* Glow effect on hover */}
                                    <div
                                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                                    />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
