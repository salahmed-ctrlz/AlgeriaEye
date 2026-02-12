import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const t = await getTranslations({ locale, namespace: "explore" });

    return {
        title: `${t("title")} | Algeria Eye`,
        description: t("subtitle"),
    };
}

export default async function ExplorePage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    redirect(`/${params.locale}/explore/culture`);
}
