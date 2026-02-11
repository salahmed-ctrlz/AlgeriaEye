"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye as EyeIcon, CheckCircle2, User, Building2, Briefcase, Car, Map, Plane } from "lucide-react";
// @ts-ignore
import { getData } from "country-list";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    touristSchema,
    partnerSchema,
    type TouristFormData,
    type PartnerFormData
} from "@/lib/validations/auth";
import { wilayas, getWilayaName } from "@/data/wilayas";
import { registerUser } from "@/actions/auth";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
    const t = useTranslations("auth");
    const locale = useLocale();
    const router = useRouter();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<"tourist" | "partner">("tourist");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    const logoSrc = mounted && theme === 'dark'
        ? "/images/Logos/Algeria Eye White.svg"
        : "/images/Logos/Algeria Eye Black.svg";

    // Get countries
    const countries = getData()
        .filter((c: any) => c.name !== "Israel")
        .sort((a: any, b: any) => a.name.localeCompare(b.name));

    // Forms
    const touristForm = useForm<TouristFormData>({
        resolver: zodResolver(touristSchema),
        defaultValues: { role: "tourist" },
    });

    const partnerForm = useForm<PartnerFormData>({
        resolver: zodResolver(partnerSchema),
        defaultValues: { role: "owner" },
    });

    const onTouristSubmit = async (data: TouristFormData) => {
        handleRegister(data);
    };

    const onPartnerSubmit = async (data: PartnerFormData) => {
        handleRegister(data);
    };

    const handleRegister = async (data: any) => {
        setLoading(true);
        setError("");
        try {
            const result = await registerUser(data);
            if (result.error) {
                setError(result.error);
                toast.error(result.error);
            } else {
                setSuccess(true);
                toast.success("Account created successfully!");
            }
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred.");
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">
                <div className="w-full max-w-md space-y-8 text-center bg-card p-8 rounded-xl border shadow-sm">
                    <div className="flex justify-center">
                        <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Registration Successful!
                    </h1>
                    <p className="text-muted-foreground">
                        Welcome to Algeria Eye. You can now log in to your account.
                    </p>
                    <div className="pt-4">
                        <Button asChild className="w-full bg-brand hover:bg-brand-light">
                            <Link href={`/${locale}/login`}>
                                Go to Login
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center justify-center mb-4"
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
                    <h1 className="text-3xl font-bold tracking-tight">
                        Create an Account
                    </h1>
                    <p className="text-muted-foreground">
                        Join our community to explore or host in Algeria
                    </p>
                </div>

                {/* Custom Tabs */}
                <div className="grid w-full grid-cols-2 rounded-lg bg-muted p-1">
                    <button
                        onClick={() => setActiveTab("tourist")}
                        className={cn(
                            "flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all",
                            activeTab === "tourist"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <User className="h-4 w-4" />
                        Join as Tourist
                    </button>
                    <button
                        onClick={() => setActiveTab("partner")}
                        className={cn(
                            "flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all",
                            activeTab === "partner"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Building2 className="h-4 w-4" />
                        Join as Partner
                    </button>
                </div>

                <div className="bg-card p-6 md:p-8 rounded-xl border shadow-sm">
                    {error && (
                        <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    {/* Tourist Form */}
                    {activeTab === "tourist" && (
                        <form onSubmit={touristForm.handleSubmit(onTouristSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input placeholder="Ahmed Bensalem" {...touristForm.register("fullName")} />
                                {touristForm.formState.errors.fullName && (
                                    <p className="text-xs text-destructive">{touristForm.formState.errors.fullName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" placeholder="you@example.com" {...touristForm.register("email")} />
                                {touristForm.formState.errors.email && (
                                    <p className="text-xs text-destructive">{touristForm.formState.errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Nationality</Label>
                                <Select onValueChange={(val) => touristForm.setValue("nationality", val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select nationality" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[300px]">
                                        {countries.map((country: any) => (
                                            <SelectItem key={country.code} value={country.name}>
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {touristForm.formState.errors.nationality && (
                                    <p className="text-xs text-destructive">{touristForm.formState.errors.nationality.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input type="password" placeholder="••••••••" {...touristForm.register("password")} />
                                {touristForm.formState.errors.password && (
                                    <p className="text-xs text-destructive">{touristForm.formState.errors.password.message}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={loading} className="w-full bg-brand text-white hover:bg-brand-light mt-2">
                                {loading ? "Creating Account..." : "Create Tourist Account"}
                            </Button>
                        </form>
                    )}

                    {/* Partner Form */}
                    {activeTab === "partner" && (
                        <form onSubmit={partnerForm.handleSubmit(onPartnerSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Business Name</Label>
                                <Input placeholder="Hotel El Aurassi" {...partnerForm.register("businessName")} />
                                {partnerForm.formState.errors.businessName && (
                                    <p className="text-xs text-destructive">{partnerForm.formState.errors.businessName.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <Select onValueChange={(val: any) => partnerForm.setValue("businessType", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hotel">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="h-4 w-4" />
                                                    <span>Hotel</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="agency">
                                                <div className="flex items-center gap-2">
                                                    <Briefcase className="h-4 w-4" />
                                                    <span>Travel Agency</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="taxi">
                                                <div className="flex items-center gap-2">
                                                    <Car className="h-4 w-4" />
                                                    <span>Taxi / Transport</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="guide">
                                                <div className="flex items-center gap-2">
                                                    <Map className="h-4 w-4" />
                                                    <span>Tour Guide</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {partnerForm.formState.errors.businessType && (
                                        <p className="text-xs text-destructive">{partnerForm.formState.errors.businessType.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Wilaya</Label>
                                    <Select onValueChange={(val) => partnerForm.setValue("wilaya", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[200px]">
                                            {wilayas.map((w) => (
                                                <SelectItem key={w.code} value={w.slug}>
                                                    {w.code} - {getWilayaName(w, locale)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {partnerForm.formState.errors.wilaya && (
                                        <p className="text-xs text-destructive">{partnerForm.formState.errors.wilaya.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" placeholder="business@example.com" {...partnerForm.register("email")} />
                                {partnerForm.formState.errors.email && (
                                    <p className="text-xs text-destructive">{partnerForm.formState.errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input type="password" placeholder="••••••••" {...partnerForm.register("password")} />
                                {partnerForm.formState.errors.password && (
                                    <p className="text-xs text-destructive">{partnerForm.formState.errors.password.message}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={loading} className="w-full bg-brand text-white hover:bg-brand-light mt-2">
                                {loading ? "Creating Account..." : "Create Partner Account"}
                            </Button>
                        </form>
                    )}
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href={`/${locale}/login`}
                        className="font-medium text-brand hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
