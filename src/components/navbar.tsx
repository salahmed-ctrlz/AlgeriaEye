"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
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
import { LanguageSwitcher } from "@/components/language-switcher";
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

    const [scrolled, setScrolled] = useState(false);

    const [expanded, setExpanded] = useState(false);

    // Close expanded menu when scrolling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (window.scrollY > 50) {
                // Keep expanded state if desired, or close it. 
                // Let's keep it open if user opened it, but maybe close if they scroll back up? 
                // Actually, let's close it if they scroll back to top (scrolled=false)
            } else {
                setExpanded(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        { href: "/", label: t("home"), icon: Home, active: pathname === "/" },
        { href: "/explore", label: t("explore"), icon: Compass, active: pathname.includes("/explore") },
        ...(user ? [
            { href: "/dashboard", label: t("dashboard"), icon: LayoutDashboard, active: pathname.includes("/dashboard") },
            { href: "/messages", label: t("messages"), icon: MessageSquare, active: pathname.includes("/messages") },
        ] : []),
    ];

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
                scrolled
                    ? "top-6 left-1/2 -translate-x-1/2 w-auto rounded-full border border-border/40 shadow-xl bg-background/80 backdrop-blur-md px-2 py-2"
                    : "border-b border-border/40 bg-background/80 backdrop-blur-xl"
            )}
        >
            <div className={cn(
                "flex items-center justify-between transition-all duration-300",
                scrolled ? "gap-2" : "container mx-auto h-24 px-4 sm:px-8"
            )}>
                {/* Logo - Hide on Scroll */}
                <Link
                    href="/"
                    className={cn(
                        "flex items-center gap-2 transition-all duration-300",
                        scrolled ? "w-0 overflow-hidden opacity-0" : "opacity-100"
                    )}
                    onClick={(e) => {
                        if (pathname === "/") {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}
                >
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

                {/* Desktop Nav - Transform on Scroll */}
                <nav className={cn(
                    "hidden md:flex flex-1 items-center justify-center transition-all duration-300",
                    scrolled ? "gap-1" : "gap-8"
                )}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-brand rounded-full hover:bg-muted/50",
                                scrolled ? "p-3" : "px-3 py-2 rounded-md",
                                link.active ? "text-brand bg-muted/50" : "text-muted-foreground"
                            )}
                            title={link.label}
                            onClick={(e) => {
                                if (link.active) {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                            }}
                        >
                            <link.icon className={cn("transition-all", scrolled ? "h-5 w-5" : "h-5 w-5")} />
                            <span className={cn(
                                "transition-all duration-300 ease-in-out font-medium",
                                scrolled ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100 hidden xl:inline"
                            )}>
                                {link.label}
                            </span>
                        </Link>
                    ))}
                    <Link
                        href="/about"
                        className={cn(
                            "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand transition-colors rounded-full hover:bg-muted/50",
                            scrolled ? "p-3" : ""
                        )}
                        title={t("about")}
                    >
                        {scrolled ? <span className="font-bold text-lg h-5 w-5 flex items-center justify-center">?</span> : t("about")}
                    </Link>

                    {/* EXPANDED SETTINGS (Visible only when scrolled + expanded) */}
                    <div className={cn(
                        "flex items-center gap-1 overflow-hidden transition-all duration-500 ease-in-out",
                        scrolled && expanded ? "w-auto opacity-100 ml-2 pl-2 border-l border-border/50" : "w-0 opacity-0"
                    )}>
                        <div className="flex items-center gap-1 min-w-max">
                            <LanguageSwitcher />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="rounded-full hover:bg-muted transition-colors cursor-pointer h-10 w-10"
                            >
                                <Sun className="h-5 w-5 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                            {user && (
                                <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full h-10 w-10 text-destructive hover:bg-destructive/10">
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* EXPAND TOGGLE BUTTON (Visible only when scrolled) */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpanded(!expanded)}
                        className={cn(
                            "rounded-full transition-all duration-300 hover:bg-muted",
                            scrolled ? "w-10 h-10 opacity-100 ml-1" : "w-0 h-0 opacity-0 overflow-hidden"
                        )}
                    >
                        {expanded ? (
                            <div className="flex items-center justify-center">
                                <span className="sr-only">Collapse</span>
                                {/* Chevron Left/Right based on direction could be better, or just X */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right rotate-180"><path d="m9 18 6-6-6-6" /></svg>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <span className="sr-only">Expand</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                            </div>
                        )}
                    </Button>
                </nav>

                {/* Default Right Actions - Hide on Scroll */}
                <div className={cn(
                    "hidden md:flex items-center gap-4 transition-all duration-300",
                    scrolled ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"
                )}>
                    <LanguageSwitcher />

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

                    <Link href="/contact" className="flex items-center justify-center h-9 w-9 rounded-full bg-brand/10 text-brand hover:bg-brand/20 transition-colors">
                        <Phone className="h-5 w-5" />
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <Link href="/dashboard?tab=profile">
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
                        <Link href="/login">
                            <Button size="sm" className="bg-brand text-white hover:bg-brand-light">
                                {t("login")}
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Trigger & Sheet (Unchanged for Mobile) */}
                <div className={cn("md:hidden flex items-center gap-2", scrolled ? "pl-2" : "")}>
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className={cn("md:hidden")}>
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={dir === "rtl" ? "right" : "left"} className="w-full sm:max-w-sm border-r-0 p-0 flex flex-col">
                            {/* Mobile Menu (Same Content) */}
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
                            </div>
                            {/* ... Mobile Links ... */}
                            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => {
                                            if (link.active) {
                                                e.preventDefault();
                                                window.scrollTo({ top: 0, behavior: "smooth" });
                                            }
                                            setIsOpen(false);
                                        }}
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
                                    href="/about"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 rounded-xl px-4 py-4 text-xl font-medium transition-all hover:bg-muted active:scale-95 text-foreground"
                                >
                                    <span className="h-6 w-6 flex items-center justify-center font-bold text-lg">?</span>
                                    {t("about")}
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 rounded-xl px-4 py-4 text-xl font-medium transition-all hover:bg-muted active:scale-95 text-foreground"
                                >
                                    <Phone className="h-6 w-6" />
                                    Support
                                </Link>
                            </div>

                            <div className="p-6 border-t bg-muted/20">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center justify-center gap-2 rounded-lg bg-background border p-3 shadow-sm active:scale-95 transition-transform">
                                        <LanguageSwitcher />
                                    </div>
                                    <button
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                        className="flex items-center justify-center gap-2 rounded-lg bg-background border p-3 shadow-sm active:scale-95 transition-transform"
                                    >
                                        {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                        <span className="font-medium">{theme === "dark" ? "Dark" : "Light"}</span>
                                    </button>
                                </div>
                                {user ? (
                                    <Button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full justify-center gap-2" variant="outline" size="lg">
                                        <LogOut className="h-5 w-5" />
                                        {t("logout")}
                                    </Button>
                                ) : (
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full bg-brand text-white text-lg h-12">{t("login")}</Button>
                                    </Link>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
