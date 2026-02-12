import { useTranslations } from "next-intl";
import { ExploreGrid } from "@/components/explore/explore-grid";
import { CLOTHING_ITEMS } from "@/lib/data/explore-data";

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

            <ExploreGrid items={CLOTHING_ITEMS} />
        </div>
    );
}
