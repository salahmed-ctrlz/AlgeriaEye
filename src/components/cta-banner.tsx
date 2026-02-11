"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
    const t = useTranslations("home");
    const locale = useLocale();

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand-light to-brand p-12 sm:p-16 text-center">
                    {/* Decorative elements */}
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_50%)]" />

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                            {t("ctaTitle")}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                            {t("ctaSubtitle")}
                        </p>
                        <Link href={`/${locale}/register`}>
                            <Button
                                size="lg"
                                className="mt-8 rounded-xl bg-white text-brand font-semibold shadow-xl hover:bg-white/90 hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] px-8"
                            >
                                {t("ctaButton")}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
