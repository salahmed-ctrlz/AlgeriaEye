import { createClient, createAdminClient } from "@/lib/supabase/server";
import { AdminListingActions } from "@/components/admin/admin-listing-actions";
import { MapPin, Tag, User } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AdminListingsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "admin" });
    const supabase = await createClient(); // Standard client for auth
    const adminSupabase = await createAdminClient(); // Admin client for data

    // 1. Get Current User & Verify Admin Role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await adminSupabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
        return <div className="p-8 text-red-500 font-bold">{t("unauthorized") || "Unauthorized Access"}</div>;
    }

    // 2. Fetch all listings with owner info using admin client (bypasses RLS)
    const { data: listings } = await adminSupabase
        .from("listings")
        .select(`
            *,
            owner:profiles(full_name)
        `)
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("listings")}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{t("manage")} {t("listings")}</p>
            </header>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-all">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t("listing")}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t("category")}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t("owner")}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase text-right">{t("actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {listings?.map((listing: any) => (
                                <tr key={listing.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {listing.images?.[0] ? (
                                                <img
                                                    src={listing.images[0]}
                                                    alt={listing.title}
                                                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-700"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-600">
                                                    <Tag className="w-6 h-6" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{listing.title}</p>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <MapPin className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{listing.wilaya}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:text-primary-foreground capitalize">
                                            {listing.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-500 dark:text-gray-400">
                                                <User className="w-3 h-3" />
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                                {listing.owner?.full_name || t("owner")}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <AdminListingActions
                                            listingId={listing.id}
                                            adminUserId={user.id}
                                            isFeatured={listing.is_featured}
                                        />
                                    </td>
                                </tr>
                            ))}
                            {!listings?.length && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        {t("noListings")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
