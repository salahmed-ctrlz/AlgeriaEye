import { createClient } from "@/lib/supabase/client"; // Changed to client for simplicity in this server component mixed usage or keeps server? keeping server logic but direct db call
import { createClient as createServerClient } from "@/lib/supabase/server";
import { getWilayaBySlug, getWilayaName, wilayas } from "@/data/wilayas";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { ListingCard } from "@/components/listing-card";
import { ListingCarousel } from "@/components/ui/listing-carousel";
import { MapPin, History, Camera, Info } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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
    const locale = (await getLocale()) as "en" | "ar";
    const wilaya = getWilayaBySlug(slug);

    if (!wilaya) {
        notFound();
    }

    const supabase = await createServerClient();
    const { data: listings } = await supabase
        .from("listings")
        .select("*")
        .eq("wilaya", slug)
        .order("created_at", { ascending: false });

    const name = getWilayaName(wilaya, locale);
    const description = wilaya.description?.[locale];
    const history = wilaya.history?.[locale];
    const bestPlaces = wilaya.bestPlaces;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] w-full overflow-hidden">
                <Image
                    src={wilaya.image || "/images/hero-new.jpg"}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center gap-3 mb-2 animate-fade-in">
                            <Badge variant="outline" className="border-white/30 text-white backdrop-blur-sm">
                                {String(wilaya.code).padStart(2, "0")}
                            </Badge>
                            <span className="flex items-center gap-1 text-sm text-white/80">
                                <MapPin className="h-4 w-4" />
                                {locale === "ar" ? "الجزائر" : "Algeria"}
                            </span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl animate-fade-in-up">
                            {name}
                        </h1>
                        {description && (
                            <p className="mt-4 max-w-2xl text-lg text-white/90 animate-fade-in-up-delayed leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-20">
                {/* History Section (if available) */}
                {wilaya.history?.[locale] && (
                    <section className="animate-fade-in-up">
                        <div className="flex items-center gap-2 mb-6">
                            <History className="h-6 w-6 text-brand" />
                            <h2 className="text-2xl font-bold tracking-tight">{locale === "ar" ? "نبذة تاريخية" : "History"}</h2>
                        </div>
                        <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                            <p>{history}</p>
                        </div>
                    </section>
                )}

                {/* Best Places (if available) */}
                {bestPlaces && bestPlaces.length > 0 && (
                    <section className="animate-fade-in-up">
                        <div className="flex items-center gap-2 mb-8">
                            <Camera className="h-6 w-6 text-brand" />
                            <h2 className="text-2xl font-bold tracking-tight">{locale === "ar" ? "أماكن تستحق الزيارة" : "Best Places to Visit"}</h2>
                        </div>
                        {/* Best Places Gallery */}
                        <div className="mb-16">
                            <ListingCarousel
                                items={bestPlaces.map(place => ({
                                    name: place.name[locale as "ar" | "en"],
                                    image: place.image
                                }))}
                            />
                        </div>
                    </section>
                )}

                {/* Listings Section */}
                <section id="listings" className="animate-fade-in-up">
                    <div className="flex items-center justify-between gap-2 mb-8">
                        <h2 className="text-2xl font-bold tracking-tight">
                            {locale === "ar" ? `قوائم في ${name}` : `Listings in ${name}`}
                        </h2>
                        <span className="text-sm text-muted-foreground">
                            {listings?.length || 0} {locale === "ar" ? "إعلان" : "listings"}
                        </span>
                    </div>

                    {!listings || listings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border border-dashed bg-muted/30">
                            <MapPin className="mb-4 h-12 w-12 text-muted-foreground/30" />
                            <p className="text-lg text-muted-foreground">
                                {locale === "ar"
                                    ? "لم يتم العثور على نتائج في هذه الولاية بعد."
                                    : "No listings found in this wilaya yet."}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {(listings as Listing[]).map((listing, index) => (
                                <div key={listing.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up">
                                    <ListingCard
                                        id={listing.id}
                                        title={listing.title}
                                        type={listing.type}
                                        wilaya={listing.wilaya}
                                        image={listing.images?.[0]}
                                        price={listing.price_details?.per_night}
                                        ratingAvg={listing.rating_avg}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return wilayas.map((w) => ({ slug: w.slug }));
}
