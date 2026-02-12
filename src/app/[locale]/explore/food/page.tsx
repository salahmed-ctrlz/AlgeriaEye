import { useTranslations } from "next-intl";
import { ExploreGrid } from "@/components/explore/explore-grid";
import { FOOD_ITEMS } from "@/lib/data/explore-data";

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

            <ExploreGrid items={FOOD_ITEMS} />
        </div>
    );
}
