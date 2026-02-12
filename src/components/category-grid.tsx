import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Building2, Map, Car, Briefcase, Tent, Palmtree, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
    {
        icon: Building2,
        key: "hotels",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search?type=hotel"
    },
    {
        icon: Utensils,
        key: "restaurants",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search?type=restaurant"
    },
    {
        icon: Briefcase,
        key: "agencies",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search?type=agency"
    },
    {
        icon: Car,
        key: "transport",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search?type=taxi"
    },
    {
        icon: Map,
        key: "guides",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search?type=guide"
    },
    {
        icon: Tent,
        key: "tours",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search?type=tour"
    },
    {
        icon: Palmtree,
        key: "activities",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search?type=activity"
    },
];

export function CategoryGrid() {
    const t = useTranslations("categories");

    return (
        <section className="py-12 container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">{t("exploreByType")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat) => (
                    <Link
                        key={cat.key}
                        href={cat.href}
                        className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-card border hover:border-brand/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className={cn("p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300", cat.bg)}>
                            <cat.icon className={cn("h-8 w-8", cat.color)} />
                        </div>
                        <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {t(cat.key as any)}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
