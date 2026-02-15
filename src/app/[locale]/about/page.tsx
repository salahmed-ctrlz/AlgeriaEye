import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Brain,
    Calendar,
    ChevronRight,
    Globe,
    HeartHandshake,
    Lightbulb,
    Map as MapIcon,
    MessageCircle,
    Sparkles,
} from "lucide-react";

export default function AboutPage() {
    const t = useTranslations("aboutPage");

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* HERO SECTION */}
            <section className="relative container mx-auto px-4 pt-24 pb-16 lg:pt-36 lg:pb-24">
                {/* Ambient background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium ring-1 ring-primary/20">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{t("subtitle")}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                            {t("title")}
                        </h1>

                        <div className="flex flex-col gap-1.5 text-xl md:text-2xl font-semibold text-muted-foreground/80">
                            <span>{t("slogan.line1")}</span>
                            <span>{t("slogan.line2")}</span>
                            <span>{t("slogan.line3")}</span>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 h-12 px-8 rounded-xl font-semibold"
                                asChild
                            >
                                <Link href="/explore">
                                    {t("join.touristBtn")}
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-border hover:bg-muted/60 h-12 px-8 rounded-xl font-semibold"
                                asChild
                            >
                                <Link href="/register?role=owner">{t("join.hostBtn")}</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative w-full flex items-center justify-center lg:justify-end">
                        <div className="relative w-full aspect-[4/3] max-w-lg rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/10 bg-muted">
                            <Image
                                src="/images/gold black business card.webp"
                                alt="Algeria Eye Vision"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -top-16 -right-16 w-72 h-72 bg-primary/8 rounded-full blur-[80px] -z-10" />
                        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-secondary/15 rounded-full blur-[60px] -z-10" />
                    </div>
                </div>
            </section>

            {/* VIDEO SECTION */}
            <section className="pb-28 container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] ring-1 ring-border/60 bg-black">
                        <div className="aspect-video">
                            <iframe
                                src="https://www.youtube.com/embed/h5dW315aUtw?autoplay=0&rel=0"
                                title="Algeria Eye Vision"
                                className="absolute inset-0 w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* VISION & MISSION */}
            <section className="py-28 bg-gradient-to-b from-muted/40 to-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-14">
                        <div className="space-y-5">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                                {t("story.title")}
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                                {t("story.desc2")}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 pt-4">
                            <div className="p-7 bg-background rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_6px_24px_rgba(0,0,0,0.2)] ring-1 ring-border/40 hover:ring-primary/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-foreground">{t("mission.title")}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{t("mission.desc")}</p>
                            </div>
                            <div className="md:col-span-2 p-7 bg-gradient-to-br from-primary/[0.04] to-primary/[0.02] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_6px_24px_rgba(0,0,0,0.2)] ring-1 ring-primary/10 flex items-center">
                                <p className="text-lg md:text-xl font-medium italic text-foreground/80 leading-relaxed">
                                    &ldquo;{t("visionQuote")}&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT WE OFFER */}
            <section className="py-28">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                            Services
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            {t("whatWeDo.title")}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t("whatWeDo.subtitle")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Brain,
                                color: "text-blue-600 dark:text-blue-400",
                                bg: "bg-blue-500/10",
                                ring: "hover:ring-blue-500/20",
                                titleKey: "whatWeDo.items.guide.title" as const,
                                descKey: "whatWeDo.items.guide.desc" as const,
                            },
                            {
                                icon: MessageCircle,
                                color: "text-emerald-600 dark:text-emerald-400",
                                bg: "bg-emerald-500/10",
                                ring: "hover:ring-emerald-500/20",
                                titleKey: "whatWeDo.items.connect.title" as const,
                                descKey: "whatWeDo.items.connect.desc" as const,
                            },
                            {
                                icon: MapIcon,
                                color: "text-orange-600 dark:text-orange-400",
                                bg: "bg-orange-500/10",
                                ring: "hover:ring-orange-500/20",
                                titleKey: "whatWeDo.items.logistics.title" as const,
                                descKey: "whatWeDo.items.logistics.desc" as const,
                            },
                            {
                                icon: Calendar,
                                color: "text-violet-600 dark:text-violet-400",
                                bg: "bg-violet-500/10",
                                ring: "hover:ring-violet-500/20",
                                titleKey: "whatWeDo.items.events.title" as const,
                                descKey: "whatWeDo.items.events.desc" as const,
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`group relative p-6 rounded-2xl bg-card ring-1 ring-border/50 ${item.ring} hover:ring-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold mb-2 text-foreground">
                                    {t(item.titleKey)}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t(item.descKey)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section className="py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                            Our DNA
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            {t("values.title")}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t("values.subtitle")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Globe,
                                titleKey: "values.authenticity.title" as const,
                                descKey: "values.authenticity.desc" as const,
                            },
                            {
                                icon: Lightbulb,
                                titleKey: "values.innovation.title" as const,
                                descKey: "values.innovation.desc" as const,
                            },
                            {
                                icon: HeartHandshake,
                                titleKey: "values.hospitality.title" as const,
                                descKey: "values.hospitality.desc" as const,
                            },
                        ].map((value, i) => (
                            <div
                                key={i}
                                className="group text-center p-8 rounded-2xl bg-background/80 backdrop-blur-sm ring-1 ring-border/40 hover:ring-primary/25 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_6px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                                    <value.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-3">
                                    {t(value.titleKey)}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t(value.descKey)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-primary/[0.04] via-background to-primary/[0.02] ring-1 ring-border/50 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.25)] p-10 md:p-14">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                            {[
                                { label: t("stats.wilayas"), value: "69+" },
                                { label: t("stats.listings"), value: "500+" },
                                { label: t("stats.travelers"), value: "10k+" },
                                { label: t("stats.guides"), value: "120+" },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="text-center space-y-2 relative"
                                >
                                    {i > 0 && (
                                        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border/60" />
                                    )}
                                    <div className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="text-muted-foreground text-xs md:text-sm font-semibold uppercase tracking-widest">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 container mx-auto px-4">
                <div className="relative rounded-[2rem] overflow-hidden bg-primary text-primary-foreground px-6 py-16 md:px-16 md:py-24 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
                    {/* Background decorations */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,0,0,0.15)_0%,_transparent_60%)]" />
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.07] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                            {t("join.title")}
                        </h2>
                        <p className="text-base md:text-xl text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed">
                            {t("join.desc")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="font-bold text-primary h-12 px-8 rounded-xl shadow-lg"
                                asChild
                            >
                                <Link href="/explore">
                                    {t("join.touristBtn")}
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-transparent border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8 rounded-xl font-semibold"
                                asChild
                            >
                                <Link href="/register?role=owner">{t("join.hostBtn")}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}