import { createClient, createAdminClient } from "@/lib/supabase/server";
import { User, Shield, Mail, Calendar, Phone } from "lucide-react";
import { AdminUserActions } from "@/components/admin/admin-user-actions";
import { getTranslations } from "next-intl/server";

export default async function AdminUsersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "admin" });
    const supabase = await createClient();
    const adminSupabase = await createAdminClient();

    // 1. Verify Admin
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

    // 2. Fetch all profiles
    const { data: profiles } = await adminSupabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("users")}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{t("manage")} {t("users")}</p>
            </header>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-all">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t("user")}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t("role")}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t("contact")}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t("joined")}</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase text-right">{t("actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {profiles?.map((p: any) => (
                                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-foreground">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{p.full_name || t("newUser") || "New User"}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">{p.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.role === 'admin' ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" :
                                            p.role === 'owner' ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" :
                                                "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                            } capitalize`}>
                                            {p.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                                <Phone className="w-3 h-3" />
                                                {p.phone || t("noPhone") || "No phone"}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(p.created_at).toLocaleDateString(locale)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <AdminUserActions targetUserId={p.id} currentRole={p.role} adminUserId={user.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
