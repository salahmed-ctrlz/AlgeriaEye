"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function WelcomeHeader() {
    const t = useTranslations("home");
    const [userRole, setUserRole] = useState<string>("tourist");
    const [userName, setUserName] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("full_name, role")
                    .eq("id", user.id)
                    .single();

                if (profile) {
                    if (profile.full_name) setUserName(profile.full_name.split(" ")[0]);
                    if (profile.role) setUserRole(profile.role);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    // Dynamic greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <section className="py-12 px-4 md:px-8">
            <div className="mx-auto max-w-7xl text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-brand/5 mb-6 animate-fade-in">
                    <span className="text-3xl sm:text-4xl">👋</span>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground sm:text-4xl font-outfit">
                        {getGreeting()}{userName ? `, ${userName}` : ""}
                    </h1>
                    <p className="text-muted-foreground text-lg sm:text-2xl font-medium max-w-2xl mx-auto mt-2">
                        {userRole === "owner" ? t("welcomeOwner") : t("welcomeTourist")}
                    </p>
                </div>
                {/* Visual Separator */}
                <div className="w-24 h-1.5 bg-gradient-to-r from-brand to-emerald-500 mx-auto mt-10 rounded-full opacity-30 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
            </div>
        </section>
    );
}
