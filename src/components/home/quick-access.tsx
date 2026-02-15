"use client";

import { Link } from "@/i18n/navigation";
import {
    Map,
    Hotel,
    Utensils,
    User,
    Bus,
    Home,
    ShoppingBag,
    Car,
    Compass,
    BookOpen
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";


export function QuickAccessGrid() {
    const t = useTranslations("home");
    const tQuick = useTranslations("quickAccess");

    const tiles = [
        { icon: Map, label: tQuick("touristSpots"), href: "/map?filter=nature" },
        { icon: Hotel, label: tQuick("hotels"), href: "/search/hotels" },
        { icon: Utensils, label: tQuick("restaurants"), href: "/search/restaurants" },
        { icon: User, label: tQuick("guides"), href: "/guides" },
        { icon: Bus, label: tQuick("tours"), href: "/search/tours" },
        { icon: Home, label: tQuick("realty"), href: "/search/guesthouses" },
        { icon: ShoppingBag, label: tQuick("shop"), href: "/shop" },
        { icon: Car, label: tQuick("transport"), href: "/transport" },
        { icon: Compass, label: tQuick("map"), href: "/map" },
        { icon: BookOpen, label: tQuick("culture"), href: "/explore" },
    ];
    return (
        <section className="px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <Card className="relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] border-0 bg-gradient-to-br from-brand via-brand-light to-brand shadow-2xl shadow-brand/20">
                    {/* Decorative elements to match CtaBanner */}
                    <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

                    <div className="relative z-10">
                        <h2 className="mb-10 text-2xl font-bold text-center text-white tracking-tight">
                            {t("quickAccess")}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-8">
                            {tiles.map((tile) => (
                                <Link key={tile.label} href={tile.href} className="group flex flex-col items-center gap-3.5 transition-transform duration-300 hover:scale-105">
                                    <div className={cn(
                                        "flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-md transition-all duration-500",
                                        "border border-white/20 shadow-lg group-hover:bg-white/25 group-hover:shadow-white/10 group-hover:-translate-y-1"
                                    )}>
                                        <tile.icon className="h-7 w-7 text-white transition-all duration-300 group-hover:scale-110" />
                                    </div>
                                    <span className="text-[13px] font-semibold text-white/90 group-hover:text-white text-center transition-colors duration-300">
                                        {tile.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}
