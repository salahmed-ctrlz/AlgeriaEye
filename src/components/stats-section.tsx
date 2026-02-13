"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { MapPin, Building2, Users, BadgeCheck } from "lucide-react";

function useCountUp(end: number, duration: number, trigger: boolean) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!trigger) return;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [trigger, end, duration]);

    return count;
}

const STATS = [
    { key: "statsWilayas", value: 69, icon: MapPin, suffix: "" },
    { key: "statsListings", value: 2000, icon: Building2, suffix: "+" },
    { key: "statsTravelers", value: 5000, icon: Users, suffix: "+" },
    { key: "statsHosts", value: 350, icon: BadgeCheck, suffix: "+" },
];

export function StatsSection() {
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
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-20 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand/5 via-brand/10 to-brand/5 dark:from-brand/10 dark:via-brand/20 dark:to-brand/10" />

            <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                    {STATS.map((stat) => {
                        const Icon = stat.icon;
                        const count = useCountUp(stat.value, 2000, visible);
                        return (
                            <div
                                key={stat.key}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 dark:bg-brand/20">
                                    <Icon className="h-5 w-5 text-brand" />
                                </div>
                                <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                                    {count.toLocaleString()}
                                    {stat.suffix}
                                </span>
                                <span className="mt-1 text-sm font-medium text-muted-foreground">
                                    {t(stat.key)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
