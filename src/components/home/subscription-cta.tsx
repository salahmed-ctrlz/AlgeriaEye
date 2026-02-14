"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Building2, Rocket, ShieldCheck, ArrowRight } from "lucide-react";

export function SubscriptionCta() {
    const t = useTranslations("subscriptions.cta");

    return (
        <section className="relative px-4 py-16 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-6xl mx-auto">
                <div className="relative group bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 md:p-12 shadow-2xl shadow-red-500/5 overflow-hidden">
                    {/* Decorative Red Zilij pattern element */}
                    <div className="absolute top-0 right-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none rotate-12 translate-x-1/4 -translate-y-1/4">
                        <img src="/images/Logos/zelij-green.svg" className="w-96 h-96 grayscale invert dark:invert-0" alt="" style={{ filter: 'sepia(1) saturate(10) hue-rotate(-50deg)' }} />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 space-y-6 text-center md:text-start">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black tracking-widest uppercase">
                                <Rocket className="w-3 h-3" />
                                <span>{t("forOwners")}</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                                {t("homeTitle")}
                            </h2>

                            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto md:ms-0 leading-relaxed font-medium">
                                {t("homeSubtitle")}
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                                <Link href="/subscription-plans">
                                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-14 text-base font-bold shadow-xl shadow-red-600/30 group">
                                        {t("button")}
                                        <ArrowRight className="ms-2 w-5 h-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                                    </Button>
                                </Link>
                                <p className="text-sm text-zinc-500 dark:text-zinc-500 italic font-medium">
                                    {t("freeForTourists")}
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                            <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center gap-3 transition-all hover:scale-105 hover:bg-red-50 dark:hover:bg-red-900/10">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{t("businessProfile")}</span>
                            </div>

                            <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center gap-3 transition-all hover:scale-105 hover:bg-red-50 dark:hover:bg-red-900/10 md:translate-y-4">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{t("verifiedBadge")}</span>
                            </div>

                            <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center gap-3 transition-all hover:scale-105 hover:bg-red-50 dark:hover:bg-red-900/10">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
                                    <Rocket className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{t("growthTools")}</span>
                            </div>

                            <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center gap-3 transition-all hover:scale-105 hover:bg-red-50 dark:hover:bg-red-900/10 md:translate-y-4">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{t("analytics")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
