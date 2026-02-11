"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
    Sun,
    Moon,
    Menu,
    LogOut,
    UserCircle,
    Home,
    Compass,
    LayoutDashboard,
    MessageSquare,
    Mail,
    Linkedin,
    Facebook,
    Instagram,
    Twitter,
    Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

export function Navbar() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [user, setUser] = useState<User | null>(null);
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Logo Logic
    const logoSrc = mounted && theme === 'dark'
        ? "/images/Logos/Algeria Eye Horizontal White.svg"
        : "/images/Logos/Algeria Eye Horizontal.svg";

    const otherLocale = locale === "en" ? "ar" : "en";
    const localePath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    const dir = locale === "ar" ? "rtl" : "ltr";

    useEffect(() => {
        setMounted(true);
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        setUser(null);
        router.refresh();
    };

    const navLinks = [
        { href: `/${locale}`, label: t("home"), icon: Home, active: pathname === `/${locale}` },
        { href: `/${locale}/explore`, label: t("explore"), icon: Compass, active: pathname.includes("/explore") },
        ...(user ? [
            { href: `/${locale}/dashboard`, label: t("dashboard"), icon: LayoutDashboard, active: pathname.includes("/dashboard") },
            { href: `/${locale}/messages`, label: t("messages"), icon: MessageSquare, active: pathname.includes("/messages") },
        ] : []),
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-24 items-center justify-between px-4 sm:px-8 relative">
                {/* Logo - Left */}
                <Link href={`/${locale}`} className="flex items-center gap-2">
                    <div className="relative h-16 w-[20rem] max-w-[40vw]">
                        {mounted ? (
                            <Image
                                src={logoSrc}
                                alt="Algeria Eye"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        ) : (
                            <span className="text-2xl font-bold tracking-tight">Algeria <span className="text-brand">Eye</span></span>
                        )}
                    </div>
                </Link>

                {/* Desktop Nav - Center */}
                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-brand",
                                link.active ? "text-brand" : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href={`/${locale}/about`} className="text-sm font-medium text-muted-foreground hover:text-brand transition-colors">{t("about")}</Link>
                </nav>

                {/* Desktop Actions - Right */}
                <div className="hidden items-center gap-4 md:flex">
                    <Link href={localePath} className="text-muted-foreground hover:text-foreground transition-colors mr-2">
                        <span className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-muted transition-colors">
                            {locale === "en" ? <span className="text-lg font-bold">EN</span> : <span className="text-lg font-bold">ع</span>}
                        </span>
                    </Link>

                    {/* Day/Night Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="rounded-full hover:bg-muted transition-colors cursor-pointer"
                    >
                        <Sun className="h-5 w-5 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    <Link href={`/${locale}/contact`} className="flex items-center justify-center h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                        <Phone className="h-5 w-5" />
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <Link href={`/${locale}/dashboard?tab=profile`}>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <UserCircle className="h-6 w-6" />
                                </Button>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs">
                                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                                {t("logout")}
                            </Button>
                        </div>
                    ) : (
                        <Link href={`/${locale}/login`}>
                            <Button size="sm" className="bg-brand text-white hover:bg-brand-light">
                                {t("login")}
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={dir === "rtl" ? "right" : "left"} className="w-full sm:max-w-sm border-r-0 p-0 flex flex-col">
                        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                        <SheetDescription className="sr-only">Navigation</SheetDescription>

                        <div className="p-6 border-b flex items-center justify-between">
                            <div className="relative h-16 w-64">
                                {mounted ? (
                                    <Image
                                        src={logoSrc}
                                        alt="Algeria Eye"
                                        fill
                                        className="object-contain object-left"
                                        priority
                                    />
                                ) : (
                                    <span className="text-2xl font-bold">Algeria Eye</span>
                                )}
                            </div>
                            {/* Close button is handled by SheetPrimitive.Close in UI component, no need to add another unless hiding default */}
                        </div>

                        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-4 rounded-xl px-4 py-4 text-xl font-medium transition-all hover:bg-muted active:scale-95",
                                        link.active ? "bg-muted text-brand" : "text-foreground"
                                    )}
                                >
                                    <link.icon className="h-6 w-6" />
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href={`/${locale}/about`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 rounded-xl px-4 py-4 text-xl font-medium transition-all hover:bg-muted active:scale-95 text-foreground"
                            >
                                <span className="h-6 w-6 flex items-center justify-center font-bold text-lg">?</span>
                                {t("about")}
                            </Link>
                            <Link
                                href={`/${locale}/contact`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 rounded-xl px-4 py-4 text-xl font-medium transition-all hover:bg-muted active:scale-95 text-foreground"
                            >
                                <Phone className="h-6 w-6" />
                                Support
                            </Link>
                        </div>

                        <div className="p-6 border-t bg-muted/20">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <Link href={localePath} onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 rounded-lg bg-background border p-3 shadow-sm active:scale-95 transition-transform">
                                    <span className="text-xl">{locale === "en" ? "🇺🇸" : "🇩🇿"}</span>
                                    <span className="font-medium">{locale === "en" ? "English" : "العربية"}</span>
                                </Link>
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-background border p-3 shadow-sm active:scale-95 transition-transform"
                                >
                                    {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                    <span className="font-medium">{theme === "dark" ? "Dark" : "Light"}</span>
                                </button>
                            </div>

                            {user ? (
                                <Button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="w-full justify-center gap-2"
                                    variant="outline"
                                    size="lg"
                                >
                                    <LogOut className="h-5 w-5" />
                                    {t("logout")}
                                </Button>
                            ) : (
                                <Link href={`/${locale}/login`} onClick={() => setIsOpen(false)}>
                                    <Button className="w-full bg-brand text-white text-lg h-12">
                                        {t("login")}
                                    </Button>
                                </Link>
                            )}

                            <div className="mt-8 flex justify-center gap-6 text-muted-foreground">
                                <Link href="#" className="hover:text-brand transition-colors"><Mail className="h-6 w-6" /></Link>
                                <Link href="#" className="hover:text-brand transition-colors"><Linkedin className="h-6 w-6" /></Link>
                                <Link href="#" className="hover:text-brand transition-colors"><Facebook className="h-6 w-6" /></Link>
                                <Link href="#" className="hover:text-brand transition-colors"><Instagram className="h-6 w-6" /></Link>
                                <Link href="#" className="hover:text-brand transition-colors"><Twitter className="h-6 w-6" /></Link>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
