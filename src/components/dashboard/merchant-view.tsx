"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, TrendingUp, Package, Plus, AlertTriangle, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export function MerchantDashboard() {
    const t = useTranslations("dashboard.merchant");
    const tCommon = useTranslations("dashboard.common");

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
                    <p className="text-muted-foreground">{t("subtitle")}</p>
                </div>
                <Button className="bg-brand text-white hover:bg-brand/90">
                    <Plus className="mr-2 h-4 w-4" /> {t("addProduct")}
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("dailyOrders")}</CardTitle>
                        <Package className="h-4 w-4 text-brand" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-xs text-muted-foreground">{t("pendingShipment", { count: 5 })}</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("totalSales")}</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-brand" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">125.000</div>
                        <p className="text-xs text-muted-foreground">{t("dzdToday")}</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("lowStock")}</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">3</div>
                        <p className="text-xs text-muted-foreground">{t("needsRestocking", { count: 3 })}</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customer Ratings</CardTitle>
                        <TrendingUp className="h-4 w-4 text-brand" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.8</div>
                        <p className="text-xs text-muted-foreground">+0.2 from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>{t("recentOrders")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                                            <Package className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Order #AE-102{i}</p>
                                            <p className="text-xs text-muted-foreground">2 items • 12,500 {tCommon("dzd")}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="outline" className="text-[10px] uppercase">{t("processing")}</Badge>
                                        <p className="text-[10px] text-muted-foreground mt-1">2h ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-amber-500" />
                            {t("tips")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                {t("rugsTip")}
                            </p>
                            <Button variant="outline" size="sm" className="w-full">
                                {t("reviewProduct")}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
