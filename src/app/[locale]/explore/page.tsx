import SearchPage from "../search/page";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "explore" });

    return {
        title: `${t("title")} | Algeria Eye`,
        description: t("subtitle"),
    };
}

export default function ExplorePage() {
    return <SearchPage />;
}
