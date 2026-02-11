import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Globe, Shield, HeartHandshake, Users, Sparkles } from "lucide-react";

export default function AboutPage() {
    const t = useTranslations("aboutPage");

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* HERO SECTION: Clean & Direct */}
            <section className="container mx-auto px-4 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                            <Sparkles className="w-4 h-4 text-brand" />
                            <span>{t("subtitle")}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                            {t("title")}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                            {t("missionDesc")}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button size="lg" className="bg-brand text-white hover:bg-brand-light" asChild>
                                <Link href="/explore">{t("ctaButton")}</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Static Image - Clean & Professional */}
                    <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
                        <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-card">
                            <Image
                                src="/images/gold black business card.webp"
                                alt="Algeria Eye Business Card"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Subtle decorative element behind */}
                        <div className="absolute -inset-4 bg-brand/5 rounded-[2rem] -z-10 blur-xl" />
                    </div>
                </div>
            </section>

            {/* WHAT WE DO: Simple Grid */}
            <section className="py-24 bg-muted/30 border-y border-border/40">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight">{t("whatWeDoTitle")}</h2>
                        <p className="text-lg text-muted-foreground">{t("whatWeDoDesc")}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-background border rounded-2xl p-8 shadow-sm">
                            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t("features.f1")}</h3>
                            <p className="text-muted-foreground">Connecting you to the soulful heart of Algeria, beyond the guidebooks.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-background border rounded-2xl p-8 shadow-sm">
                            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t("features.f2")}</h3>
                            <p className="text-muted-foreground">Every host is personally approved. We believe trust is the foundation of travel.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-background border rounded-2xl p-8 shadow-sm">
                            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
                                <HeartHandshake className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t("features.f3")}</h3>
                            <p className="text-muted-foreground">24/7 dedicated support team ready to assist you anytime.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/40">
                        {[
                            { label: "Wilayas covered", value: "48" },
                            { label: "Active Listings", value: "500+" },
                            { label: "Happy Travelers", value: "10k+" },
                            { label: "Avg. Rating", value: "4.9" },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
