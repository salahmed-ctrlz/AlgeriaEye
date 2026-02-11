
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Brain,
    Calendar,
    Globe,
    HeartHandshake,
    Lightbulb,
    Map as MapIcon,
    MessageCircle,
    Shield,
    Sparkles,
    Users
} from "lucide-react";

export default function AboutPage() {
    const t = useTranslations("aboutPage");

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* HERO SECTION */}
            <section className="relative container mx-auto px-4 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
                            <Sparkles className="w-4 h-4" />
                            <span>{t("subtitle")}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                            {t("title")}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                            {t("story.desc1")}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" asChild>
                                <Link href="/explore">{t("join.touristBtn")}</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5" asChild>
                                <Link href="/register?role=owner">{t("join.hostBtn")}</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Hero Image / Visual */}
                    <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
                        <div className="relative w-full aspect-[4/3] max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-muted">
                            <Image
                                src="/images/gold black business card.webp"
                                alt="Algeria Eye Vision"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        </div>
                        {/* Decorative Blobs */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
                        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary/20 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </section>

            {/* VISION & MISSION */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t("story.title")}</h2>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                {t("story.desc2")}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 pt-8">
                            <div className="p-6 bg-background rounded-2xl shadow-sm border border-border/50">
                                <h3 className="text-xl font-bold mb-3 text-primary">{t("mission.title")}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{t("mission.desc")}</p>
                            </div>
                            <div className="md:col-span-2 p-6 bg-background rounded-2xl shadow-sm border border-border/50 flex items-center">
                                <p className="text-lg font-medium italic text-foreground/80">
                                    &quot;We bridge the gap between travelers and the rich cultural tapestry of Algeria. From booking luxury hotels to finding local guides for Sahara expeditions, we handle it all.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT WE OFFER (SERVICES) */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">{t("whatWeDo.title")}</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("whatWeDo.subtitle")}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Service 1: AI/Smart Guidance */}
                        <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t("whatWeDo.items.guide.title")}</h3>
                            <p className="text-sm text-muted-foreground">{t("whatWeDo.items.guide.desc")}</p>
                        </div>

                        {/* Service 2: Local Connection */}
                        <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t("whatWeDo.items.connect.title")}</h3>
                            <p className="text-sm text-muted-foreground">{t("whatWeDo.items.connect.desc")}</p>
                        </div>

                        {/* Service 3: Logistics */}
                        <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MapIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t("whatWeDo.items.logistics.title")}</h3>
                            <p className="text-sm text-muted-foreground">{t("whatWeDo.items.logistics.desc")}</p>
                        </div>

                        {/* Service 4: Events */}
                        <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t("whatWeDo.items.events.title")}</h3>
                            <p className="text-sm text-muted-foreground">{t("whatWeDo.items.events.desc")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section className="py-24 bg-foreground text-background relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">{t("values.title")}</h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t("values.subtitle")}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4">
                            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <Globe className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">{t("values.authenticity.title")}</h3>
                            <p className="text-gray-400">{t("values.authenticity.desc")}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <Lightbulb className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">{t("values.innovation.title")}</h3>
                            <p className="text-gray-400">{t("values.innovation.desc")}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <HeartHandshake className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">{t("values.hospitality.title")}</h3>
                            <p className="text-gray-400">{t("values.hospitality.desc")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/40">
                        {[
                            { label: "Wilayas Covered", value: "48+" },
                            { label: "Active Listings", value: "500+" },
                            { label: "Happy Travelers", value: "10k+" },
                            { label: "Verified Guides", value: "120+" }, // Updated stat
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <div className="text-3xl md:text-5xl font-bold text-primary">{stat.value}</div>
                                <div className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 container mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground px-6 py-16 md:px-12 md:py-24 text-center">
                    {/* Background Texture */}
                    <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                            {t("join.title")}
                        </h2>
                        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                            {t("join.desc")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button size="lg" variant="secondary" className="font-bold text-primary h-12 px-8" asChild>
                                <Link href="/explore">{t("join.touristBtn")}</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8" asChild>
                                <Link href="/register?role=owner">{t("join.hostBtn")}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
