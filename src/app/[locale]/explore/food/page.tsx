import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function FoodPage() {
    const t = useTranslations("explore.food");

    return (
        <div className="space-y-8">
            <section className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    {t("desc")}
                </p>
            </section>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        title: t("items.couscous.title"),
                        desc: t("items.couscous.desc"),
                        img: "/images/explore/couscous.jpg"
                    },
                    {
                        title: t("items.chakhchoukha.title"),
                        desc: t("items.chakhchoukha.desc"),
                        img: "/images/explore/chakhchoukha.jpg"
                    },
                    {
                        title: t("items.mhajeb.title"),
                        desc: t("items.mhajeb.desc"),
                        img: "/images/explore/mhajeb.webp"
                    },
                    {
                        title: t("items.kelb.title"),
                        desc: t("items.kelb.desc"),
                        img: "/images/explore/kalb_el_louz.jpg"
                    }
                ].map((dish, i) => (
                    <Card key={i} className="group relative overflow-hidden rounded-xl h-[400px] border-none shadow-xl">
                        <Image
                            src={dish.img}
                            alt={dish.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="backdrop-blur-md bg-black/30 p-4 rounded-lg border border-white/10 text-white">
                                <CardTitle className="text-xl font-bold mb-2">{dish.title}</CardTitle>
                                <p className="text-sm text-gray-200 line-clamp-3 group-hover:line-clamp-none transition-all">
                                    {dish.desc}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
