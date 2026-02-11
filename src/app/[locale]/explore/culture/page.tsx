import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

import { useTranslations } from "next-intl";

export default function CulturePage() {
    const t = useTranslations("explore.culture");
    return (
        <div className="space-y-8">
            <section className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    {t("desc")}
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="group relative overflow-hidden rounded-xl h-96 border-none shadow-xl">
                    <Image
                        src="/images/explore/fantasia.jpg"
                        alt={t("fantasia.title")}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-6 w-full">
                        <div className="backdrop-blur-md bg-white/10 p-4 rounded-lg border border-white/10 text-white">
                            <CardTitle className="mb-2 text-2xl font-bold">{t("fantasia.title")}</CardTitle>
                            <p className="text-gray-200 leading-relaxed font-medium">
                                {t("fantasia.desc")}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="group relative overflow-hidden rounded-xl h-96 border-none shadow-xl">
                    <Image
                        src="/images/explore/tea.jpg"
                        alt={t("tea.title")}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-6 w-full">
                        <div className="backdrop-blur-md bg-white/10 p-4 rounded-lg border border-white/10 text-white">
                            <CardTitle className="mb-2 text-2xl font-bold">{t("tea.title")}</CardTitle>
                            <p className="text-gray-200 leading-relaxed font-medium">
                                {t("tea.desc")}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <section className="bg-muted/50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">{t("music.title")}</h3>
                <p>
                    {t("music.desc")}
                </p>
            </section>
        </div>
    );
}
