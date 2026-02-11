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
        <section className="relative overflow-hidden py-8 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                    <span className="block text-brand">
                        {getGreeting()} {userName ? `, ${userName}` : ""} 👋
                    </span>
                    <span className="block text-muted-foreground mt-2 text-2xl sm:text-3xl">
                        {userRole === "owner" ? t("welcomeOwner") : t("welcomeTourist")}
                    </span>
                </h1>
            </div>

            {/* Decorative background elements could go here */}
            <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-brand/5 blur-3xl" />
        </section>
    );
}
