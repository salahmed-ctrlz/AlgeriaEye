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
        <section ref={ref} className="py-24 relative">
            {/* Abstract Background Blur */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/5 blur-[150px] -z-10 rounded-full" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-outfit">
                        {t("featuresTitle")}
                    </h2>
                    <p className="mt-6 text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
                        {t("featuresSubtitle")}
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-3">
                    {FEATURES.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.titleKey}
                                className={`group relative rounded-[2rem] border border-border/40 bg-background/50 backdrop-blur-sm p-8 transition-all duration-500 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-2 ${visible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                    }`}
                                style={{
                                    transitionDelay: `${i * 150}ms`,
                                }}
                            >
                                <div
                                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg shadow-brand/10 group-hover:scale-110 transition-transform duration-500`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold">{t(feature.titleKey)}</h3>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    {t(feature.descKey)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
