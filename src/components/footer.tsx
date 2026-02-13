"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Eye, Send, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function Footer() {
    const t = useTranslations("footer");
    const nav = useTranslations("nav");
    const locale = useLocale();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const logoSrc = mounted && theme === 'dark'
        ? "/images/Logos/Algeria Eye Horizontal White.svg"
        : "/images/Logos/Algeria Eye Horizontal.svg";

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative border-t border-border/40 bg-secondary/20 dark:bg-secondary/5">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4 lg:col-span-1">
                        <Link
                            href={`/${locale}`}
                            className="flex items-center gap-2"
                        >
                            <div className="relative h-20 w-[28rem] max-w-full">
                                {mounted ? (
                                    <Image
                                        src={logoSrc}
                                        alt="Algeria Eye"
                                        fill
                                        className="object-contain object-left"
                                    />
                                ) : (
                                    <span className="text-3xl font-bold tracking-tight">
                                        Algeria <span className="text-brand">Eye</span>
                                    </span>
                                )}
                            </div>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            {t("description")}
                        </p>
                    </div>

                    {/* Explore */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                            {t("explore")}
                        </h3>
                        <nav className="flex flex-col gap-3">
                            <Link
                                href={`/${locale}`}
                                className="text-sm text-muted-foreground hover:text-brand transition-colors"
                            >
                                {nav("home")}
                            </Link>
                            <Link
                                href={`/${locale}/search`}
                                className="text-sm text-muted-foreground hover:text-brand transition-colors"
                            >
                                {nav("search")}
                            </Link>
                            <Link
                                href={`/${locale}/login`}
                                className="text-sm text-muted-foreground hover:text-brand transition-colors"
                            >
                                {nav("login")}
                            </Link>
                        </nav>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                            {t("support")}
                        </h3>
                        <nav className="flex flex-col gap-3">
                            <Link href="#" className="text-sm text-muted-foreground hover:text-brand transition-colors cursor-pointer">
                                {t("helpCenter")}
                            </Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-brand transition-colors cursor-pointer">
                                {t("terms")}
                            </Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-brand transition-colors cursor-pointer">
                                {t("privacy")}
                            </Link>
                            <a href="mailto:contact@algeriaeye.com" className="text-sm text-muted-foreground hover:text-brand transition-colors">
                                contact@algeriaeye.com
                            </a>
                        </nav>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                            {t("newsletter")}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {t("newsletterDesc")}
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder={t("emailPlaceholder")}
                                className="h-10 rounded-lg bg-background/60 text-sm"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="h-10 w-10 shrink-0 rounded-lg bg-brand text-white hover:bg-brand-light"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Algeria Eye. {t("rights")}
                    </p>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={scrollToTop}
                        className="text-xs text-muted-foreground hover:text-brand hover:bg-transparent"
                    >
                        {t("goToTop")} <ArrowUp className="ml-1 h-3 w-3" />
                    </Button>
                </div>
            </div>
        </footer>
    );
}
