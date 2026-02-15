"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Star, Languages, Briefcase, ExternalLink, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { guides } from "@/data/guides";
import { useState } from "react";

export default function GuidesPage() {
    const t = useTranslations("explore.guidesPage");
    const ct = useTranslations("common");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredGuides = guides.filter(guide =>
        guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <section className="relative py-20 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-brand/5 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                    <Badge variant="outline" className="mb-6 border-brand/20 bg-brand/5 px-4 py-1.5 text-sm uppercase tracking-widest text-brand font-bold">
                        {ct("exploreAll")}
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed italic">
                        {t("subtitle")}
                    </p>

                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder={t("searchPlaceholder")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-14 rounded-2xl border-border/50 bg-background/50 backdrop-blur-sm shadow-sm focus:ring-brand/20"
                        />
                    </div>
                </div>
            </section>

            {/* Guides Grid */}
            <div className="container mx-auto px-4 md:px-8 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredGuides.map((guide) => (
                        <div
                            key={guide.id}
                            className="group relative bg-card rounded-[2.5rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl hover:border-brand/20 transition-all duration-500 transform hover:-translate-y-2"
                        >
                            {/* Header Image/Background */}
                            <div className="h-32 bg-gradient-to-br from-brand/20 via-brand-light/10 to-transparent relative overflow-hidden">
                                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                                {guide.featured && (
                                    <Badge className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-white border-none gap-1 py-1 px-3">
                                        <Star className="h-3 w-3 fill-white" /> Featured
                                    </Badge>
                                )}
                            </div>

                            <div className="px-8 pb-8 relative">
                                {/* Avatar */}
                                <div className="relative -mt-16 mb-4 inline-block">
                                    <div className="h-32 w-32 rounded-[2rem] border-4 border-background shadow-xl overflow-hidden relative bg-muted grayscale group-hover:grayscale-0 transition-all duration-500">
                                        <Image
                                            src={guide.image}
                                            alt={guide.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 mb-4">
                                    <h3 className="text-2xl font-black group-hover:text-brand transition-colors">
                                        {guide.name}
                                    </h3>
                                    <p className="text-muted-foreground font-bold text-sm flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5 text-brand" /> {guide.location}, Algeria
                                    </p>
                                </div>

                                <p className="text-muted-foreground line-clamp-2 mb-6 text-sm leading-relaxed italic">
                                    {guide.description}
                                </p>

                                <div className="space-y-4 pt-4 border-t border-border/40">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-black">{guide.rating}</span>
                                            <span className="text-xs text-muted-foreground">({guide.reviews} {t("reviews")})</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-lg font-black text-brand">{guide.price.toLocaleString()}</span>
                                            <span className="text-[10px] text-muted-foreground font-bold uppercase ml-1">
                                                {ct("dzd")} {t("perDay")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {guide.specialties.slice(0, 3).map((spec) => (
                                            <Badge key={spec} variant="outline" className="text-[11px] border-brand/10 bg-brand/5 text-brand-dark font-bold rounded-lg capitalize">
                                                {spec}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 pt-2">
                                        <Button asChild className="flex-1 bg-brand hover:bg-brand-light text-white font-bold rounded-xl h-11">
                                            <Link href={`/messages?userId=${guide.id}`}>
                                                {t("contact")}
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl group-hover:border-brand/40 transition-colors">
                                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-brand transition-colors" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
