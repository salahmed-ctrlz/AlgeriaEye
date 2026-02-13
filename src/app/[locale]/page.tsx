import { useTranslations } from "next-intl";
import { HeroSearch } from "@/components/hero-search";
import { FeaturedWilayas } from "@/components/featured-wilayas";
import { CategoryGrid } from "../../components/category-grid";
import { BestDeals } from "@/components/best-deals";
import { StatsSection } from "@/components/stats-section";
import { FeaturesSection } from "@/components/features-section";
import { CtaBanner } from "@/components/cta-banner";
import { WelcomeHeader } from "@/components/home/welcome-header";
import { QuickAccessGrid } from "@/components/home/quick-access";
import { CreatorsCarousel } from "@/components/creators/creators-carousel";
import { StoriesSection } from "@/components/home/stories-section";
import { SmartFeed } from "@/components/home/smart-feed";
import { OffersSection } from "@/components/home/offers-section";
import { HighRatedSection } from "@/components/home/high-rated-section";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
    return (
        <div className="flex flex-col gap-6 pb-20">
            {/* Hero Search (Restored) */}
            <HeroSearch />

            {/* Welcome Message */}
            <div className="px-4 md:px-8 mt-4">
                <WelcomeHeader />
            </div>

            {/* Featured Destinations */}
            <div className="relative py-8">
                {/* Top Pattern */}
                <div className="absolute top-0 left-0 w-full overflow-hidden opacity-69">
                    <div className="flex justify-center gap-1 min-w-full">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <img
                                key={`zelij-top-${i}`}
                                src="/images/Logos/zelij-green.svg"
                                className="h-8 md:h-10 w-auto object-contain"
                                alt=""
                            />
                        ))}
                    </div>
                </div>

                <FeaturedWilayas />

                {/* Bottom Pattern */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-69">
                    <div className="flex justify-center gap-1 min-w-full">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <img
                                key={`zelij-bottom-${i}`}
                                src="/images/Logos/zelij-green.svg"
                                className="h-8 md:h-10 w-auto object-contain"
                                alt=""
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Separator className="my-2 opacity-20 max-w-7xl mx-auto" />

            {/* Quick Access Tiles (Centered) */}
            <div className="flex justify-center -mt-2 mb-2">
                <QuickAccessGrid />
            </div>

            {/* Creators Carousel */}
            <CreatorsCarousel />

            <Separator className="my-2 opacity-20 max-w-7xl mx-auto" />

            {/* Personalized Feed */}
            <SmartFeed />

            <Separator className="my-2 opacity-20 max-w-7xl mx-auto" />

            {/* Offers & Deals */}
            <OffersSection />

            <Separator className="my-2 opacity-20 max-w-7xl mx-auto" />

            {/* Top Rated (Simpler Design) */}
            <HighRatedSection />

            <Separator className="my-2 opacity-20 max-w-7xl mx-auto" />

            {/* Secondary Content */}
            <StatsSection />
            <FeaturesSection />
            <CtaBanner />
        </div>
    );
}
