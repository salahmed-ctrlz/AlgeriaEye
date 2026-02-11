"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { MapPin } from "lucide-react";
import { type Wilaya, getWilayaName } from "@/data/wilayas";

interface WilayaCardProps {
    wilaya: Wilaya;
}

export function WilayaCard({ wilaya }: WilayaCardProps) {
    const locale = useLocale();
    const name = getWilayaName(wilaya, locale);

    return (
        <Link href={`/${locale}/wilaya/${wilaya.slug}`}>
            <div className="group relative flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-brand/30 hover:shadow-md hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <span className="text-sm font-bold">{String(wilaya.code).padStart(2, "0")}</span>
                </div>
                <div className="text-center">
                    <h3 className="text-sm font-semibold leading-tight">{name}</h3>
                </div>
            </div>
        </Link>
    );
}
