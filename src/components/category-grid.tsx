import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Hotel, Utensils, Home, Map, Plane, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
    {
        icon: Hotel,
        key: "hotels",
        label: "hotels",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search/hotels",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
    },
    {
        icon: Utensils,
        key: "restaurants",
        label: "restaurants",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search/restaurants",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
    },
    {
        icon: Home,
        key: "guesthouses",
        label: "guesthouses",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search/guesthouses",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80"
    },
    {
        icon: Map,
        key: "tours",
        label: "tours",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search/tours",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80"
    },
    {
        icon: Plane,
        key: "transport",
        label: "transport",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search/transport",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80"
    },
    {
        icon: Camera,
        key: "activities",
        label: "activities",
        color: "text-brand",
        bg: "bg-brand/10",
        href: "/search/activities",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80"
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
