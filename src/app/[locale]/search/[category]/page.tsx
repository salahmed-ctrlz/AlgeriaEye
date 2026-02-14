import SearchPage from "../page";

// Map plural filtering slugs to singular DB types
const categoryMap: Record<string, string> = {
    "hotels": "hotel",
    "restaurants": "restaurant",
    "guesthouses": "guesthouse",
    "tours": "tour",
    "activities": "experience",
    "transport": "transport",
    "agencies": "agency",
    "guides": "tour", // Fallback to tour for now
};

interface PageProps {
    params: Promise<{
        category: string;
        locale: string;
    }>;
}

export default async function CategorySearchPage({ params }: PageProps) {
    const { category } = await params;
    const type = categoryMap[category.toLowerCase()] || "all";

    return <SearchPage defaultType={type} />;
}
