"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const switchLocale = (nextLocale: string) => {
        const segments = pathname.split("/");
        // Remove the current locale if it exists in the path
        if (segments.length > 1 && ["en", "ar", "fr"].includes(segments[1])) {
            segments.splice(1, 1); // remove the locale segment
        } else if (segments.length > 0 && ["en", "ar", "fr"].includes(segments[0])) {
            // Handle case where path might not start with /
            segments.splice(0, 1);
        }

        // Reconstruct path with new locale
        const nextPath = `/${nextLocale}${segments.join("/")}`;

        startTransition(() => {
            router.replace(nextPath);
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isPending}>
                    <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">{t("language")}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLocale("en")}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale("fr")}>
                    Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale("ar")}>
                    العربية
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
