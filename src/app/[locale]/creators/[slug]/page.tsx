import { creators } from "@/data/creators";
import { CreatorProfile } from "@/components/creators/creator-profile";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const creator = creators.find((c) => c.slug === slug);

    if (!creator) {
        return {
            title: "Creator Not Found",
        };
    }

    return {
        title: `${creator.name} - Algeria Eye`,
        description: `Explore Algeria through the lens of ${creator.name}.`,
    };
}

export default async function CreatorPage({ params }: Props) {
    const { slug } = await params;
    const creator = creators.find((c) => c.slug === slug);

    if (!creator) {
        notFound();
    }

    return <CreatorProfile creator={creator} />;
}

export async function generateStaticParams() {
    const locales = ["en", "fr", "ar"];

    // Create cartesian product of locales and creators
    const params = [];
    for (const locale of locales) {
        for (const creator of creators) {
            params.push({
                locale,
                slug: creator.slug,
            });
        }
    }

    return params;
}
