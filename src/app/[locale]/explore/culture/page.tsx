import { ExploreGrid } from "@/components/explore/explore-grid";
import { CULTURE_ITEMS } from "@/lib/data/explore-data";


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

            <ExploreGrid items={CULTURE_ITEMS} />

            <section className="bg-muted/50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">{t("music.title")}</h3>
                <p>
                    {t("music.desc")}
                </p>
            </section>
        </div>
    );
}
