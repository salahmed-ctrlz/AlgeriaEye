import { createClient } from "@supabase/supabase-js";
import { ListTree, MessageSquare, Users, TrendingUp, Calendar } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ControlCenterPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "admin" });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch Stats
    const [
        { count: listingsCount },
        { count: reviewsCount },
        { count: ownersCount },
        { data: latestListings }
    ] = await Promise.all([
        supabase.from("listings").select("*", { count: "exact", head: true }),
        supabase.from("reviews").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "owner"),
        supabase.from("listings").select("title, type, created_at").order("created_at", { ascending: false }).limit(5)
    ]);

    const stats = [
        { label: t("totalListings"), value: listingsCount || 0, icon: ListTree, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
        { label: t("totalReviews"), value: reviewsCount || 0, icon: MessageSquare, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/30" },
        { label: t("totalUsers"), value: ownersCount || 0, icon: Users, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/30" },
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{t("overview")}</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} p-3 rounded-xl`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {t("activeListings").split(" ")[0]}
                            </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="font-bold text-gray-900 dark:text-white">{t("listings")}</h2>
                    <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {latestListings?.map((listing: any, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                                    {listing.type.substring(0, 2)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{listing.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{listing.type}</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                {new Date(listing.created_at).toLocaleDateString(locale)}
                            </span>
                        </div>
                    ))}
                    {!latestListings?.length && (
                        <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                            {t("noListings")}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
