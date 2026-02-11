import { createClient } from "@/lib/supabase/server";
import { getWilayaBySlug, getWilayaName, wilayas } from "@/data/wilayas";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { ListingCard } from "@/components/listing-card";
import { MapPin } from "lucide-react";

interface Listing {
    id: string;
    title: string;
    type: string;
    wilaya: string;
    images: string[];
    price_details: Record<string, number>;
    rating_avg: number;
}

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function WilayaPage({ params }: Props) {
    const { slug } = await params;
    const locale = await getLocale();
    const wilaya = getWilayaBySlug(slug);

    if (!wilaya) {
        notFound();
    }

    const supabase = await createClient();
    const { data: listings } = await supabase
        .from("listings")
        .select("*")
        .eq("wilaya", slug)
        .order("created_at", { ascending: false });

    const name = getWilayaName(wilaya, locale);

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <span className="text-lg font-bold">
                            {String(wilaya.code).padStart(2, "0")}
                        </span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            {name}
                        </h1>
                        <div className="mt-1 flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">
                                {locale === "ar" ? "الجزائر" : "Algeria"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Listings */}
            {!listings || listings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <MapPin className="mb-4 h-12 w-12 text-muted-foreground/30" />
                    <p className="text-lg text-muted-foreground">
                        {locale === "ar"
                            ? "لم يتم العثور على نتائج في هذه الولاية بعد."
                            : "No listings found in this wilaya yet."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {(listings as Listing[]).map((listing) => (
                        <ListingCard
                            key={listing.id}
                            id={listing.id}
                            title={listing.title}
                            type={listing.type}
                            wilaya={listing.wilaya}
                            image={listing.images?.[0]}
                            price={listing.price_details?.per_night}
                            ratingAvg={listing.rating_avg}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export async function generateStaticParams() {
    return wilayas.map((w) => ({ slug: w.slug }));
}
