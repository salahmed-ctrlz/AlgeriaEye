"use client";

import { useState } from "react";
import { use } from "react";
import { useTranslations } from "next-intl";
import { Check, Rocket, ShieldCheck, Zap, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PaymentMethods } from "@/components/booking/payment-methods";
import { CardScanner } from "@/components/booking/card-scanner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SubscriptionPlansPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params);
    const t = useTranslations("subscriptions");
    const ct = useTranslations("common");
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [duration, setDuration] = useState<"1" | "3" | "12">("1");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("visa");

    const getPriceDetails = (basePriceValue: string | number) => {
        const basePrice = typeof basePriceValue === 'string' ? parseInt(basePriceValue.replace(/,/g, '')) : (basePriceValue || 0);
        if (isNaN(basePrice as number)) return { price: 0, total: 0, discount: 0 };
        if (duration === "1") return { price: basePrice as number, total: basePrice as number, discount: 0 };
        if (duration === "3") {
            const total = Math.round(((basePrice as number) * 3) * 0.9);
            return { price: Math.round(total / 3), total, discount: 10 };
        }
        if (duration === "12") {
            const total = Math.round(((basePrice as number) * 12) * 0.75);
            return { price: Math.round(total / 12), total, discount: 25 };
        }
        return { price: basePrice as number, total: basePrice as number, discount: 0 };
    };

    const getDurationLabel = () => {
        if (duration === "1") return t("durations.1Month");
        if (duration === "3") return t("durations.3Months");
        return t("durations.12Months");
    };

    const plans = [
        {
            id: "starter",
            name: t("starter.name"),
            basePrice: "2900",
            commission: "8",
            desc: t("starter.desc"),
            features: [
                t("starter.features.0"),
                t("starter.features.1"),
                t("starter.features.2"),
                t("starter.features.3"),
                t("starter.features.4"),
                t("starter.features.5"),
                t("starter.features.6")
            ],
            color: "zinc",
            icon: Rocket
        },
        {
            id: "growth",
            name: t("growth.name"),
            basePrice: "6900",
            commission: "5",
            desc: t("growth.desc"),
            features: [
                t("growth.features.0"),
                t("growth.features.1"),
                t("growth.features.2"),
                t("growth.features.3"),
                t("growth.features.4"),
                t("growth.features.5"),
                t("growth.features.6"),
                t("growth.features.7")
            ],
            color: "red",
            popular: true,
            icon: Zap
        },
        {
            id: "premium",
            name: t("premium.name"),
            basePrice: "12900",
            commission: "2",
            desc: t("premium.desc"),
            features: [
                t("premium.features.0"),
                t("premium.features.1"),
                t("premium.features.2"),
                t("premium.features.3"),
                t("premium.features.4"),
                t("premium.features.5"),
                t("premium.features.6"),
                t("premium.features.7")
            ],
            color: "zinc",
            icon: ShieldCheck
        }
    ];

    const handleSubscribe = async () => {
        setIsProcessing(true);
        // Simulate payment
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsProcessing(false);
        setIsSuccess(true);
        toast.success("Subscription activated successfully!");
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-background">
                <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border bg-card shadow-2xl">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 scale-110 animate-in zoom-in duration-500">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome Aboard!</h1>
                    <p className="text-muted-foreground">
                        Your <strong>{selectedPlan?.name}</strong> is now active. You can start managing your business profile from the owner dashboard.
                    </p>
                    <Link href="/dashboard">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-xl text-base font-bold">
                            Go to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-50 via-background to-background dark:from-red-950/20 dark:via-background dark:to-background pb-20">
            {/* Header */}
            <header className="px-4 py-8 max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:text-red-600 transition-colors">
                    <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                    Back to Home
                </Link>
            </header>

            <main className="max-w-7xl mx-auto px-4 pt-10">
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold tracking-wider uppercase">
                        {t("cta.forOwners")}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        {t("title")}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        {t("subtitle")}
                    </p>

                    {/* Duration Toggle */}
                    <div className="flex items-center justify-center pt-8">
                        <div className="inline-flex p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border">
                            <button
                                onClick={() => setDuration("1")}
                                className={cn(
                                    "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                                    duration === "1" ? "bg-white dark:bg-zinc-800 shadow-sm text-red-600" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                                )}
                            >
                                {t("durations.1Month")}
                            </button>
                            <button
                                onClick={() => setDuration("3")}
                                className={cn(
                                    "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                                    duration === "3" ? "bg-white dark:bg-zinc-800 shadow-sm text-red-600" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                                )}
                            >
                                {t("durations.3Months")}
                            </button>
                            <button
                                onClick={() => setDuration("12")}
                                className={cn(
                                    "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                                    duration === "12" ? "bg-white dark:bg-zinc-800 shadow-sm text-red-600" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                                )}
                            >
                                {t("durations.12Months")}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan) => (
                        <Card
                            key={plan.id}
                            className={`relative border-none transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-3xl overflow-hidden ${plan.popular
                                ? "bg-white dark:bg-zinc-900 shadow-2xl shadow-red-500/20 scale-105 z-10"
                                : "bg-zinc-50 dark:bg-zinc-900/50"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-bl-2xl">
                                    Popular
                                </div>
                            )}

                            <CardHeader className={`p-8 ${plan.popular ? "bg-red-600 text-white rounded-b-[40px] mb-4 shadow-lg shadow-red-600/20" : ""}`}>
                                <div className={`p-3 w-12 h-12 rounded-2xl mb-4 flex items-center justify-center ${plan.popular ? "bg-white text-red-600" : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-white shadow-sm"
                                    }`}>
                                    <plan.icon className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                <CardDescription className={`text-base min-h-[48px] mt-2 italic ${plan.popular ? "text-red-50" : ""}`}>
                                    {plan.desc}
                                </CardDescription>
                                <div className="mt-6 space-y-2">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black">
                                            {getPriceDetails(plan.basePrice).price.toLocaleString()}
                                        </span>
                                        <span className={`font-medium ${plan.popular ? "text-red-100" : "text-muted-foreground"}`}>{ct("dzd")} / {ct("month")}</span>
                                    </div>
                                    {duration !== "1" && (
                                        <div className={cn(
                                            "text-xs font-bold",
                                            plan.popular ? "text-red-100" : "text-green-600"
                                        )}>
                                            {t("totalAmount", { amount: getPriceDetails(plan.basePrice).total.toLocaleString() })}
                                        </div>
                                    )}
                                    <div className={`text-sm font-bold bg-white/10 w-fit px-3 py-1 rounded-full ${plan.popular ? "text-white" : "text-red-600 bg-red-50 dark:bg-red-950/30"}`}>
                                        {t("commission", { percent: plan.commission })}
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-8 pt-0 flex-1">
                                <ul className="space-y-4">
                                    {plan.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 group">
                                            <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-red-50 text-red-600" : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm"
                                                }`}>
                                                <Check className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-sm font-bold group-hover:text-red-600 transition-colors">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className={`p-8 border-t border-transparent ${plan.popular ? "" : "bg-white/50 dark:bg-zinc-900/50"}`}>
                                <Button
                                    onClick={() => setSelectedPlan(plan)}
                                    className={`w-full h-14 rounded-2xl text-base font-bold shadow-xl transition-all ${plan.popular
                                        ? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/30"
                                        : "bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-white shadow-zinc-900/10"
                                        }`}
                                >
                                    Get Started
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-20 text-center text-sm text-muted-foreground bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 max-w-2xl mx-auto leading-relaxed italic">
                    {t("cta.freeForTourists")}
                </div>
            </main>

            {/* Simulated Payment Dialog */}
            <Dialog open={!!selectedPlan} onOpenChange={(open) => !isProcessing && !open && setSelectedPlan(null)}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
                    {selectedPlan && (
                        <>
                            <DialogHeader className="p-8 pb-0">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-4 top-4 rounded-full h-10 w-10 bg-white/10 hover:bg-white/20 text-zinc-500"
                                    onClick={() => setSelectedPlan(null)}
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                                <div className="space-y-1 mt-4">
                                    <DialogTitle className="text-3xl font-black tracking-tighter">Confirmation</DialogTitle>
                                    <DialogDescription className="text-zinc-500 font-medium">Review your subscription details</DialogDescription>
                                </div>
                            </DialogHeader>

                            {isProcessing ? (
                                <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
                                    <h2 className="text-2xl font-black">Secure Payment</h2>
                                    <div className="scale-125">
                                        <CardScanner price={getPriceDetails(selectedPlan.basePrice).total} />
                                    </div>
                                    <p className="animate-pulse text-muted-foreground font-medium px-8">
                                        Securely processing your subscription for <span className="text-red-600 font-bold">{selectedPlan.name}</span>...
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold">{selectedPlan.name}</h3>
                                                <p className="text-sm text-muted-foreground italic">Business Subscription</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-red-600">
                                                    {getPriceDetails(selectedPlan.basePrice).total.toLocaleString()}
                                                </div>
                                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                    {getDurationLabel()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Payment Method</label>
                                            <PaymentMethods selected={paymentMethod} onSelect={setPaymentMethod} />
                                        </div>

                                        <div className="space-y-4 pt-2">
                                            <Button
                                                onClick={handleSubscribe}
                                                className="w-full h-14 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-600/20"
                                            >
                                                Activate Plan
                                            </Button>
                                            <p className="text-[10px] text-center text-zinc-400 font-medium px-4">
                                                By clicking Activate, you agree to Algeria Eye's Terms of Service and Privacy Policy. Securely processed by Algeria Eye Pay.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
