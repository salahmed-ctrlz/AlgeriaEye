import { Link } from "@/i18n/navigation";
import { LayoutDashboard, ListTree, MessageSquare, Users, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "admin" });

    const navItems = [
        { label: t("overview"), href: `/control-center`, icon: LayoutDashboard },
        { label: t("listings"), href: `/control-center/listings`, icon: ListTree },
        { label: t("users"), href: `/control-center/users`, icon: Users },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 lg:sticky lg:top-28 shadow-sm">
                        <div className="flex items-center gap-3 mb-8 px-2">
                            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
                                <ShieldCheck className="w-6 h-6 text-primary dark:text-primary-foreground" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 dark:text-white leading-none">{t("title")}</h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Admin Moderation</p>
                            </div>
                        </div>

                        <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all group whitespace-nowrap"
                                >
                                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
