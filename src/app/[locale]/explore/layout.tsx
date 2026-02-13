"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function ExploreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = useTranslations("explore");
    const pathname = usePathname();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const tabs = [
        { name: t("tabs.culture"), path: "/explore/culture" },
        { name: t("tabs.history"), path: "/explore/history" },
        { name: t("tabs.food"), path: "/explore/food" },
        { name: t("tabs.clothing"), path: "/explore/clothing" },
    ];

    return (
        <div className="min-h-screen bg-background relative" ref={ref}>
            {/* Modern Hero Section with Parallax */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
                    <Image
                        src="/images/explore/ghardaia.jpg"
                        alt={t("title")}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background" />
                </motion.div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/90 mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-tighter">
                            {t("title")}
                        </h1>
                        <p className="text-2xl md:text-3xl text-white max-w-3xl mx-auto font-bold leading-relaxed drop-shadow-lg">
                            {t("subtitle")}
                        </p>
                    </motion.div>
                </div>

                <div className="absolute top-6 left-6 z-20">
                    <Link href="/">
                        <Button variant="ghost" className="text-white hover:bg-white/10 hover:backdrop-blur-sm transition-all rounded-full px-6">
                            <ArrowLeft className="h-5 w-5 rtl:ml-2 rtl:rotate-180 ltr:mr-2" /> {t("backHome")}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Floating Navigation Tabs */}
            <div className="flex justify-center px-4 mb-12 -mt-8 relative z-30">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-full p-2 flex overflow-x-auto max-w-full no-scrollbar"
                >
                    {tabs.map((item) => {
                        const isActive = pathname.endsWith(item.path);
                        return (
                            <Link key={item.path} href={item.path}>
                                <div className={cn(
                                    "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                                    isActive
                                        ? "bg-brand-red text-white shadow-lg shadow-brand-red/25 scale-105"
                                        : "text-muted-foreground hover:text-brand-red hover:bg-brand-red/5"
                                )}>
                                    {item.name}
                                </div>
                            </Link>
                        );
                    })}
                </motion.div>
            </div>

            {/* Content with subtle entrance */}
            <main className="max-w-7xl mx-auto p-4 md:p-8 pb-20 relative z-10">
                {children}
            </main>
        </div>
    );
}
