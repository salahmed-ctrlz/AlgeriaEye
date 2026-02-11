"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye as EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const t = useTranslations("auth");
    const locale = useLocale();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const logoSrc = mounted && theme === 'dark'
        ? "/images/Logos/Algeria Eye White.svg"
        : "/images/Logos/Algeria Eye Black.svg";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        setError("");

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (authError) {
            if (authError.message.includes("rate limit") || authError.status === 429) {
                setError("Too many login attempts. Please wait a few minutes before trying again.");
            } else {
                setError(authError.message);
            }
            setLoading(false);
            return;
        }

        router.push(redirect || `/${locale}`);
        router.refresh();
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center justify-center mb-8"
                    >
                        <div className="relative h-24 w-64">
                            {mounted ? (
                                <Image
                                    src={logoSrc}
                                    alt="Algeria Eye"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <EyeIcon className="h-8 w-8 text-brand" />
                                    <span className="text-2xl font-bold">
                                        Algeria <span className="text-brand">Eye</span>
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {t("loginTitle")}
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {t("loginSubtitle")}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {error && (
                        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">{t("email")}</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">{t("password")}</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-xs text-destructive">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand text-white hover:bg-brand-light"
                    >
                        {loading ? "..." : t("loginButton")}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    {t("noAccount")}{" "}
                    <Link
                        href={`/${locale}/register`}
                        className="font-medium text-brand hover:underline"
                    >
                        {t("registerButton")}
                    </Link>
                </p>
            </div>
        </div>
    );
}
