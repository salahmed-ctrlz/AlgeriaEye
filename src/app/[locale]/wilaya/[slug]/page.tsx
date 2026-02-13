import { createClient } from "@/lib/supabase/client"; // Changed to client for simplicity in this server component mixed usage or keeps server? keeping server logic but direct db call
import { createClient as createServerClient } from "@/lib/supabase/server";
import { getWilayaBySlug, getWilayaName, wilayas } from "@/data/wilayas";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ListingCard } from "@/components/listing-card";
import { AttractionCard } from "@/components/wilaya/attraction-card";
import { WilayaListingGrid } from "@/components/wilaya/wilaya-listing-grid";
import { MapPin, History, Camera, Info, Utensils, BedDouble, Palette, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { creators } from "@/data/creators";
import { InstagramEmbed } from "@/components/creators/instagram-embed";
import { touristSpots } from "@/lib/data/tourist-spots";

// Force dynamic rendering — cookies() conflicts with generateStaticParams on Netlify
export const dynamic = "force-dynamic";

interface Listing {
    id: string;
    title: string;
    type: string;
    wilaya: string;
    images: string[];
    price_per_night: number;
    rating_avg: number;
}

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function WilayaPage({ params }: Props) {
    const { slug } = await params;
    const locale = (await getLocale()) as "en" | "ar" | "fr";
    const t = await getTranslations({ locale, namespace: "wilayaDetails" });
    const wilaya = getWilayaBySlug(slug);

    if (!wilaya) {
        notFound();
    }

    const supabase = await createServerClient();

    // Fetch all listings for this wilaya
    const { data: listings } = await supabase
        .from("listings")
        .select("*")
        .eq("wilaya", slug)
        .order("created_at", { ascending: false });

    // Filter listings by type
    const hotels = listings?.filter(l => l.type === 'hotel') || [];
    const restaurants = listings?.filter(l => l.type === 'restaurant') || [];

    const name = getWilayaName(wilaya, locale);
    const description = wilaya.description?.[locale];
    const bestPlaces = wilaya.bestPlaces;

    // Navigation Logic - Only cycle through featured wilayas
    const featuredWilayas = wilayas.filter(w => w.featured);
    const currentIndex = featuredWilayas.findIndex(w => w.slug === slug);

    // Fallback if current wilaya is not featured (shouldn't happen with correct data, but safe to handle)
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;

    const prevWilaya = safeIndex > 0 ? featuredWilayas[safeIndex - 1] : featuredWilayas[featuredWilayas.length - 1];
    const nextWilaya = safeIndex < featuredWilayas.length - 1 ? featuredWilayas[safeIndex + 1] : featuredWilayas[0];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* 1. Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src={wilaya.image || "/images/hero-new.jpg"}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center gap-3 mb-4 animate-fade-in">
                            <Badge variant="outline" className="border-white/30 text-white backdrop-blur-sm px-3 py-1 text-base">
                                Wilaya {String(wilaya.code).padStart(2, "0")}
                            </Badge>
                            <span className="flex items-center gap-1 text-sm text-white/80 uppercase tracking-widest">
                                <MapPin className="h-4 w-4" />
                                {t("country")}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
                            {name}
                        </h1>
                        {description && (
                            <p className="max-w-3xl text-lg md:text-xl text-white/90 animate-fade-in-up-delayed leading-relaxed shadow-sm">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-24">

                {/* 2. Best Places to Visit */}
                {(bestPlaces && bestPlaces.length > 0) && (
                    <section className="animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-10 border-b border-border/40 pb-4">
                            <Camera className="h-8 w-8 text-brand" />
                            <h2 className="text-3xl font-bold tracking-tight">{t("bestPlaces")}</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {bestPlaces.map((place, index) => (
                                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                    <AttractionCard
                                        attraction={place}
                                        index={index}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 2.5. Natural Touristic Spots (New Section) */}
                {(() => {
                    const spots = touristSpots.filter(s => s.wilaya === slug);
                    if (spots.length === 0) return null;

                    return (
                        <section className="animate-fade-in-up">
                            <div className="flex items-center gap-3 mb-10 border-b border-border/40 pb-4">
                                <MapPin className="h-8 w-8 text-green-600" />
                                <h2 className="text-3xl font-bold tracking-tight">
                                    {locale === 'ar' ? 'المواقع السياحية الطبيعية' : (locale === 'fr' ? 'Sites Touristiques Naturels' : 'Natural Touristic Spots')}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {spots.map((spot, index) => (
                                    <div key={spot.id} className="group relative overflow-hidden rounded-3xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all flex flex-col h-full animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                        <div className="relative h-64 w-full overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={spot.image}
                                                alt={locale === 'ar' ? spot.name.ar : (locale === 'fr' ? spot.name.fr : spot.name.en)}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                            <div className="absolute top-4 right-4 bg-background/90 text-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-sm">
                                                {spot.type}
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                <h3 className="text-xl font-bold leading-tight mb-1">
                                                    {locale === 'ar' ? spot.name.ar : (locale === 'fr' ? spot.name.fr : spot.name.en)}
                                                </h3>
                                                <p className="text-white/80 text-sm flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {spot.city}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-end bg-card">
                                            <Button
                                                variant="default"
                                                className="w-full gap-2 border-primary/20 hover:bg-primary/90"
                                                asChild
                                            >
                                                <a href={spot.mapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${spot.location.lat},${spot.location.lng}`} target="_blank" rel="noopener noreferrer">
                                                    <MapPin className="h-4 w-4" />
                                                    {locale === 'ar' ? 'عرض على الخريطة' : (locale === 'fr' ? 'Voir sur la carte' : 'View on Map')}
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })()}

                {/* 3. Restaurants */}
                <section id="restaurants" className="animate-fade-in-up">
                    <div className="flex items-center justify-between mb-10 border-b border-border/40 pb-4">
                        <div className="flex items-center gap-3">
                            <Utensils className="h-8 w-8 text-orange-500" />
                            <h2 className="text-3xl font-bold tracking-tight">
                                {t("restaurants")}
                            </h2>
                        </div>
                    </div>
                    {restaurants.length > 0 ? (
                        <WilayaListingGrid listings={restaurants} />
                    ) : (
                        <div className="text-center py-16 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/20">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                <Utensils className="h-8 w-8 text-muted-foreground/50" />
                            </div>
                            <p className="text-lg text-muted-foreground font-medium">
                                {t("noRestaurants")}
                            </p>
                        </div>
                    )}
                </section>

                {/* 4. Hotels */}
                <section id="hotels" className="animate-fade-in-up">
                    <div className="flex items-center justify-between mb-10 border-b border-border/40 pb-4">
                        <div className="flex items-center gap-3">
                            <BedDouble className="h-8 w-8 text-indigo-500" />
                            <h2 className="text-3xl font-bold tracking-tight">
                                {t("hotels")}
                            </h2>
                        </div>
                    </div>
                    {hotels.length > 0 ? (
                        <WilayaListingGrid listings={hotels} />
                    ) : (
                        <div className="text-center py-16 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/20">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                <BedDouble className="h-8 w-8 text-muted-foreground/50" />
                            </div>
                            <p className="text-lg text-muted-foreground font-medium">
                                {t("noHotels")}
                            </p>
                        </div>
                    )}
                </section>

                {/* 4.5. Seen by Creators (New Section) */}
                {(() => {
                    const relevantContent = creators.flatMap(c =>
                        c.content.filter(item => item.wilayas?.includes(slug))
                            .map(item => ({ ...item, creator: c }))
                    );

                    if (relevantContent.length === 0) return null;

                    return (
                        <section className="animate-fade-in-up">
                            <div className="flex items-center gap-3 mb-10 border-b border-border/40 pb-4">
                                <Sparkles className="h-8 w-8 text-pink-500" />
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight">{t("seenByCreators")}</h2>
                                    <p className="text-muted-foreground mt-1">{t("seenByCreatorsSubtitle")}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relevantContent.map((item) => (
                                    <div key={item.id} className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="h-8 w-8 rounded-full bg-muted overflow-hidden border border-border">
                                                {/* Placeholder for avatar until we have real ones, or use item.creator.avatar */}
                                                <div className="w-full h-full bg-brand/10 flex items-center justify-center text-xs font-bold text-brand">
                                                    {item.creator.name.charAt(0)}
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium">{item.creator.name}</span>
                                        </div>
                                        <InstagramEmbed url={item.url} maxWidth={400} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })()}

                {/* 5. Cultural Insights */}
                {(wilaya.culture && wilaya.culture.length > 0) ? (
                    <section className="animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-10 border-b border-border/40 pb-4">
                            <Palette className="h-8 w-8 text-purple-500" />
                            <h2 className="text-3xl font-bold tracking-tight">{t("culturalInsights")}</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {wilaya.culture.map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-3xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all h-full flex flex-col"
                                >
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title[locale]}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <div className="flex gap-2 mb-2 flex-wrap">
                                                {item.tags?.map(tag => (
                                                    <Badge key={tag} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-none">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <h3 className="text-2xl font-bold leading-tight">{item.title[locale]}</h3>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 bg-muted/10">
                                        <p className="text-muted-foreground leading-relaxed text-lg">
                                            {item.description[locale]}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    /* Fallback for Wilayas without rich culture data */
                    (wilaya.history?.[locale] || wilaya.funFacts?.[locale]) && (
                        <section className="animate-fade-in-up bg-muted/30 rounded-3xl p-8 md:p-12 border border-border/50">
                            <div className="flex items-center gap-3 mb-8">
                                <Palette className="h-8 w-8 text-purple-500" />
                                <h2 className="text-3xl font-bold tracking-tight">{t("culturalInsights")}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                {/* History/Context */}
                                {wilaya.history?.[locale] && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                            <History className="h-5 w-5 text-muted-foreground" />
                                            {t("historyHeritage")}
                                        </h3>
                                        <p className="text-muted-foreground leading-loose text-lg">
                                            {wilaya.history[locale]}
                                        </p>
                                    </div>
                                )}

                                {/* Traditions/Facts */}
                                {wilaya.funFacts?.[locale] && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                            <Info className="h-5 w-5 text-muted-foreground" />
                                            {t("traditionsFacts")}
                                        </h3>
                                        <ul className="space-y-4">
                                            {wilaya.funFacts[locale].map((fact, idx) => (
                                                <li key={idx} className="flex gap-3 bg-background p-4 rounded-xl border border-border/50 shadow-sm">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center text-sm font-bold mt-0.5">
                                                        {idx + 1}
                                                    </span>
                                                    <span className="text-muted-foreground">{fact}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </section>
                    )
                )}

                {/* 6. Navigation Footer */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-border/40">
                    <Link href={`/wilaya/${prevWilaya.slug}`} className="group">
                        <Button variant="outline" size="lg" className="h-16 w-full sm:w-64 justify-start px-6 rounded-2xl border-border/50 hover:bg-muted/50 hover:border-brand/30 transition-all">
                            <ArrowLeft className="h-5 w-5 mr-3 text-muted-foreground group-hover:text-brand transition-colors rtl:rotate-180" />
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("previous")}</span>
                                <span className="text-lg font-bold">{getWilayaName(prevWilaya, locale)}</span>
                            </div>
                        </Button>
                    </Link>

                    <Link href={`/wilaya/${nextWilaya.slug}`} className="group">
                        <Button variant="outline" size="lg" className="h-16 w-full sm:w-64 justify-end px-6 rounded-2xl border-border/50 hover:bg-muted/50 hover:border-brand/30 transition-all">
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("next")}</span>
                                <span className="text-lg font-bold">{getWilayaName(nextWilaya, locale)}</span>
                            </div>
                            <ArrowRight className="h-5 w-5 ml-3 text-muted-foreground group-hover:text-brand transition-colors rtl:rotate-180" />
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return wilayas.map((w) => ({ slug: w.slug }));
}
