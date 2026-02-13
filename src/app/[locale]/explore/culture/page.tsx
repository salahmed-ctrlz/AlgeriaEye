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
        </div>
    );
}
