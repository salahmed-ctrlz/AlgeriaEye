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

const tiles = [
    { icon: Map, label: "Tourist Spots", href: "/search?category=spots", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Hotel, label: "Hotels", href: "/search?category=hotels", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { icon: Utensils, label: "Restaurants", href: "/search/restaurants", color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: User, label: "Guides", href: "/search?category=guides", color: "text-green-500", bg: "bg-green-500/10" },
    { icon: Bus, label: "Trips", href: "/search?category=trips", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { icon: Home, label: "Realty", href: "/search?category=realty", color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: ShoppingBag, label: "Shop", href: "/shop", color: "text-pink-500", bg: "bg-pink-500/10" },
    { icon: Car, label: "Transport", href: "/search?category=transport", color: "text-red-500", bg: "bg-red-500/10" },
    { icon: Compass, label: "Map", href: "/map", color: "text-teal-500", bg: "bg-teal-500/10" },
    { icon: BookOpen, label: "Culture", href: "/explore", color: "text-amber-500", bg: "bg-amber-500/10" },
];

export function QuickAccessGrid() {
    return (
        <section className="px-4 md:px-8">
            <div className="mx-auto max-w-5xl">
                <Card className="p-8 shadow-sm border-border/40 bg-card/60 backdrop-blur-sm">
                    <h2 className="mb-8 text-xl font-medium text-center text-muted-foreground/80">Quick Access</h2>
                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-8">
                        {tiles.map((tile) => (
                            <Link key={tile.label} href={tile.href} className="group flex flex-col items-center gap-3">
                                <div className={cn(
                                    "flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/50 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:-translate-y-1",
                                    "border border-border/40 shadow-sm"
                                )}>
                                    <tile.icon className="h-6 w-6 text-muted-foreground/70 group-hover:text-primary transition-colors duration-300" />
                                </div>
                                <span className="text-xs font-medium text-muted-foreground/80 group-hover:text-foreground text-center transition-colors duration-300">
                                    {tile.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </Card>
            </div>
        </section>
    );
}
