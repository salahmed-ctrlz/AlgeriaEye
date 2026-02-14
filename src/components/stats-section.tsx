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
        <section ref={ref} className="py-20 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="rounded-[2.5rem] bg-brand/5 dark:bg-brand/10 border border-brand/10 p-12 relative overflow-hidden">
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 relative z-10">
                        {STATS.map((stat) => {
                            const Icon = stat.icon;
                            const count = useCountUp(stat.value, 2000, visible);
                            return (
                                <div
                                    key={stat.key}
                                    className="flex flex-col items-center text-center"
                                >
                                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-white dark:bg-zinc-900 border border-brand/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_0_20px_rgba(34,197,94,0.15)] text-brand transition-all hover:scale-110 hover:-rotate-3 duration-500">
                                        <Icon className="h-10 w-10" />
                                    </div>
                                    <span className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground drop-shadow-sm font-outfit">
                                        {count.toLocaleString()}
                                        {stat.suffix}
                                    </span>
                                    <span className="mt-2 text-xs font-black text-muted-foreground uppercase tracking-[0.2em] opacity-80">
                                        {t(stat.key)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
