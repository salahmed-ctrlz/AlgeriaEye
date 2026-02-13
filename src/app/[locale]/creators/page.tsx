import { creators } from "@/data/creators";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Instagram, Youtube, Globe, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreatorsPage() {
    const t = useTranslations("home"); // Reusing home translations or create new if needed

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none opacity-50" />

                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                    <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 px-4 py-1.5 text-sm uppercase tracking-widest text-primary">
                        {t("community")}
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        {t("meetCreators")}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        Discover Algeria through the lens of our talented content creators.
                    </p>

                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search creators..."
                            className="pl-12 h-12 rounded-full border-border/50 bg-background/50 backdrop-blur-sm shadow-sm focus:ring-primary/20"
                        />
                    </div>
                </div>
            </section>

            {/* Creators Grid */}
            <div className="container mx-auto px-4 md:px-8 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {creators.map((creator) => (
                        <Link
                            key={creator.id}
                            href={`/creators/${creator.slug}`}
                            className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {/* Cover Image Effect */}
                            <div className="h-32 bg-gradient-to-r from-primary/10 to-brand/10 relative overflow-hidden">
                                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                            </div>

                            <div className="px-6 pb-6 relative">
                                {/* Avatar */}
                                <div className="relative -mt-16 mb-4 inline-block">
                                    <div className="h-32 w-32 rounded-full border-4 border-background shadow-lg overflow-hidden relative bg-muted">
                                        <Image
                                            src={creator.avatar}
                                            alt={creator.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-background rounded-full p-1 shadow-md border border-border/20">
                                        {/* Platform Icon based on social links - defaulting to Instagram for now */}
                                        <Instagram className="h-4 w-4 text-pink-500" />
                                    </div>
                                </div>

                                <div className="space-y-1 mb-4">
                                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                        {creator.name}
                                    </h3>
                                    <p className="text-muted-foreground font-medium text-sm flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> Algeria
                                    </p>
                                </div>

                                <p className="text-muted-foreground line-clamp-2 mb-6 text-sm leading-relaxed">
                                    {creator.bio.en}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                                    <div className="flex gap-2">
                                        {creator.socials.instagram && <Instagram className="h-4 w-4 text-muted-foreground hover:text-pink-500 transition-colors" />}
                                        {creator.socials.youtube && <Youtube className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />}
                                        {creator.socials.website && <Globe className="h-4 w-4 text-muted-foreground hover:text-blue-500 transition-colors" />}
                                    </div>
                                    <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-md text-secondary-foreground">
                                        {creator.stats.followers} Followers
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
