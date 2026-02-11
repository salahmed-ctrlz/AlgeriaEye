import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function HistoryPage() {
    const t = useTranslations("explore.history");

    return (
        <div className="space-y-8">
            <section className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    {t("desc")}
                </p>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="group relative overflow-hidden rounded-xl h-[450px] border-none shadow-xl col-span-1">
                    <Image
                        src="/images/explore/timgad.jpg"
                        alt={t("items.timgad.title")}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-6 w-full">
                        <div className="backdrop-blur-md bg-white/10 p-4 rounded-lg border border-white/10 text-white">
                            <CardTitle className="text-xl font-bold mb-2">{t("items.timgad.title")}</CardTitle>
                            <p className="text-sm text-gray-200">
                                {t("items.timgad.desc")}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="group relative overflow-hidden rounded-xl h-[450px] border-none shadow-xl col-span-1">
                    <Image
                        src="/images/explore/grande_poste.jpg"
                        alt={t("items.poste.title")}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-6 w-full">
                        <div className="backdrop-blur-md bg-white/10 p-4 rounded-lg border border-white/10 text-white">
                            <CardTitle className="text-xl font-bold mb-2">{t("items.poste.title")}</CardTitle>
                            <p className="text-sm text-gray-200">
                                {t("items.poste.desc")}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="group relative overflow-hidden rounded-xl h-[450px] border-none shadow-xl col-span-1">
                    <Image
                        src="/images/explore/beni_hammad.jpg"
                        alt={t("items.hammad.title")}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-6 w-full">
                        <div className="backdrop-blur-md bg-white/10 p-4 rounded-lg border border-white/10 text-white">
                            <CardTitle className="text-xl font-bold mb-2">{t("items.hammad.title")}</CardTitle>
                            <p className="text-sm text-gray-200">
                                {t("items.hammad.desc")}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
