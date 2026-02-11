import { useTranslations } from "next-intl";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ClothingPage() {
    const t = useTranslations("explore.clothing");

    return (
        <div className="space-y-8">
            <section className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    {t("desc")}
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="group relative overflow-hidden rounded-xl h-[500px] border-none shadow-xl">
                    <Image
                        src="/images/explore/karakou.jpg"
                        alt={t("items.karakou.title")}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-8 w-full">
                        <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/10 text-white">
                            <CardTitle className="mb-4 text-3xl font-bold">{t("items.karakou.title")}</CardTitle>
                            <p className="text-gray-200 text-lg leading-relaxed">
                                {t("items.karakou.desc")}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="group relative overflow-hidden rounded-xl h-[500px] border-none shadow-xl">
                    <Image
                        src="/images/explore/Chedda.jpg"
                        alt={t("items.chedda.title")}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-8 w-full">
                        <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/10 text-white">
                            <CardTitle className="mb-4 text-3xl font-bold">{t("items.chedda.title")}</CardTitle>
                            <p className="text-gray-200 text-lg leading-relaxed">
                                {t("items.chedda.desc")}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
