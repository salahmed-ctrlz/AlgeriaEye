import { ExploreGrid } from "@/components/explore/explore-grid";
import { CULTURE_ITEMS } from "@/lib/data/explore-data";


import { useTranslations } from "next-intl";

import { Music2, Mic2, Guitar, Radio } from "lucide-react";

export default function CulturePage() {
    const t = useTranslations("explore.culture");
    return (
        <div className="space-y-12 pb-12">
            <section className="text-center space-y-4 pt-4">
                <h2 className="text-4xl font-bold tracking-tight text-primary">{t("title")}</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    {t("desc")}
                </p>
            </section>

            <ExploreGrid items={CULTURE_ITEMS} />

            <section className="mt-20">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col items-center text-center space-y-4 mb-12">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                            <Music2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight">{t("music.title")}</h3>
                        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            {t("music.description")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Rai Card */}
                        <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/30 p-8 transition-all hover:border-primary/20 hover:shadow-lg">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Radio className="w-24 h-24" />
                            </div>
                            <div className="relative space-y-4">
                                <div className="inline-flex items-center justify-center p-2.5 bg-blue-500/10 text-blue-500 rounded-lg">
                                    <Mic2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">{t("music.rai.title")}</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t("music.rai.desc")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Chaabi Card */}
                        <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/30 p-8 transition-all hover:border-primary/20 hover:shadow-lg">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Guitar className="w-24 h-24" />
                            </div>
                            <div className="relative space-y-4">
                                <div className="inline-flex items-center justify-center p-2.5 bg-amber-500/10 text-amber-500 rounded-lg">
                                    <Guitar className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">{t("music.chaabi.title")}</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t("music.chaabi.desc")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
