"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck, TrendingDown, Globe } from "lucide-react";

const FEATURES = [
    {
        titleKey: "feature1Title",
        descKey: "feature1Desc",
        icon: BadgeCheck,
        color: "from-emerald-500 to-teal-600",
    },
    {
        titleKey: "feature2Title",
        descKey: "feature2Desc",
        icon: TrendingDown,
        color: "from-blue-500 to-indigo-600",
    },
    {
        titleKey: "feature3Title",
        descKey: "feature3Desc",
        icon: Globe,
        color: "from-violet-500 to-purple-600",
    },
];

export function FeaturesSection() {
    const t = useTranslations("home");
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-14 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        {t("featuresTitle")}
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        {t("featuresSubtitle")}
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-3">
                    {FEATURES.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.titleKey}
                                className={`group relative rounded-2xl border border-border/50 bg-background p-8 transition-all duration-500 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 ${visible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                    }`}
                                style={{
                                    transitionDelay: `${i * 150}ms`,
                                }}
                            >
                                <div
                                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold">{t(feature.titleKey)}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t(feature.descKey)}
                                </p>

                                {/* Hover glow */}
                                <div
                                    className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5 -z-10`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
