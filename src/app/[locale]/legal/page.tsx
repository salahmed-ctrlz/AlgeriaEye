"use client";

import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, FileText, PhoneCall, AlertTriangle, Info, ArrowRight } from "lucide-react";

export default function LegalPage() {
    const t = useTranslations("legal");

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
            {/* Hero Section */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold tracking-wider uppercase mb-6">
                            <Shield className="w-3.5 h-3.5" />
                            <span>{t("hero_badge")}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
                            {t("title")}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-red-600 pl-6 py-2">
                            {t("slogan")}
                        </p>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Navigation Sidebar */}
                    <aside className="lg:col-span-3 hidden lg:block sticky top-32 h-fit space-y-2">
                        <a href="#emergency" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white dark:hover:bg-zinc-900 transition-all font-bold text-sm text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 shadow-sm border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800">
                            <PhoneCall className="w-4 h-4" />
                            {t("emergency.title")}
                        </a>
                        <a href="#privacy" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white dark:hover:bg-zinc-900 transition-all font-bold text-sm text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 shadow-sm border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800">
                            <Lock className="w-4 h-4" />
                            {t("privacy.title")}
                        </a>
                        <a href="#terms" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white dark:hover:bg-zinc-900 transition-all font-bold text-sm text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 shadow-sm border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800">
                            <FileText className="w-4 h-4" />
                            {t("terms.title")}
                        </a>
                        <a href="#faq" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white dark:hover:bg-zinc-900 transition-all font-bold text-sm text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 shadow-sm border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800">
                            <Info className="w-4 h-4" />
                            {t("faq.title")}
                        </a>
                    </aside>

                    {/* Content */}
                    <div className="lg:col-span-9 space-y-20">
                        {/* Emergency Services - HIGH VISIBILITY */}
                        <section id="emergency" className="scroll-mt-32">
                            <div className="bg-red-600 rounded-[40px] p-8 md:p-12 text-white shadow-2xl shadow-red-600/20 relative overflow-hidden">
                                {/* Decorative Zilij Overlay */}
                                <div className="absolute top-0 right-0 opacity-[0.05] pointer-events-none rotate-12 translate-x-1/4 -translate-y-1/4">
                                    <img src="/images/Logos/zelij-green.svg" className="w-96 h-96 grayscale invert" alt="" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <AlertTriangle className="w-8 h-8 animate-pulse text-red-100" />
                                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">{t("emergency.title")}</h2>
                                    </div>
                                    <p className="text-red-50 text-xl mb-12 max-w-2xl italic font-medium leading-relaxed opacity-90">
                                        {t("emergency.subtitle")}
                                    </p>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {["police", "protection", "gendarmerie", "general"].map((service) => (
                                            <Card key={service} className="bg-white/10 border-white/20 backdrop-blur-md text-white border-0 shadow-lg group hover:bg-white/20 transition-all duration-300">
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-sm font-black uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                                                        {t(`emergency.${service}.title` as any)}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-4xl font-black mb-3 tracking-tighter">
                                                        {t(`emergency.${service}.number` as any)}
                                                    </div>
                                                    <p className="text-xs text-red-50/80 italic leading-tight">
                                                        {t(`emergency.${service}.desc` as any)}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Privacy Policy */}
                        <section id="privacy" className="scroll-mt-32 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
                                    <Lock className="w-6 h-6 text-zinc-900 dark:text-white" />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">{t("privacy.title")}</h2>
                            </div>
                            <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-6 leading-relaxed">
                                <p className="text-lg font-medium">{t("privacy.p1")}</p>
                                <p>{t("privacy.p2")}</p>
                                <div className="grid md:grid-cols-2 gap-4 my-8">
                                    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-red-100 dark:hover:border-red-900/30 transition-colors">
                                        <h4 className="font-bold mb-2 text-zinc-900 dark:text-white">{t("privacy.list1")}</h4>
                                        <p className="text-sm italic opacity-80">{t("privacy.list1_desc")}</p>
                                    </div>
                                    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-red-100 dark:hover:border-red-900/30 transition-colors">
                                        <h4 className="font-bold mb-2 text-zinc-900 dark:text-white">{t("privacy.list2")}</h4>
                                        <p className="text-sm italic opacity-80">{t("privacy.list2_desc")}</p>
                                    </div>
                                </div>
                                <p>{t("privacy.p3")}</p>
                            </div>
                        </section>

                        <Separator className="opacity-50" />

                        {/* Terms of Service */}
                        <section id="terms" className="scroll-mt-32 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
                                    <FileText className="w-6 h-6 text-zinc-900 dark:text-white" />
                                </div>
                                <h2 className="text-3xl font-bold">{t("terms.title")}</h2>
                            </div>
                            <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-6 leading-relaxed">
                                <p className="text-lg font-medium">{t("terms.p1")}</p>
                                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 italic">
                                    <p>{t("terms.p2")}</p>
                                    <p className="mt-4">{t("terms.p3")}</p>
                                </div>
                            </div>
                        </section>

                        <Separator className="opacity-50" />

                        {/* FAQ */}
                        <section id="faq" className="scroll-mt-32 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
                                    <Info className="w-6 h-6 text-zinc-900 dark:text-white" />
                                </div>
                                <h2 className="text-3xl font-bold">{t("faq.title")}</h2>
                            </div>
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {[1, 2, 3, 4].map((num) => (
                                    <AccordionItem key={num} value={`item-${num}`} className="border rounded-2xl px-6 bg-white dark:bg-zinc-900 shadow-sm border-zinc-100 dark:border-zinc-800 overflow-hidden">
                                        <AccordionTrigger className="hover:no-underline font-bold text-zinc-900 dark:text-white py-6">
                                            {t(`faq.q${num}` as any)}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-zinc-600 dark:text-zinc-400 pb-6 italic">
                                            {t(`faq.a${num}` as any)}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </section>

                        {/* Footer Note */}
                        <div className="pt-20 text-center">
                            <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">
                                Last updated: February 2026 • © {new Date().getFullYear()} Algeria Eye
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
