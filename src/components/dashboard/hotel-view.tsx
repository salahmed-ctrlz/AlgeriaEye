"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BedDouble, CalendarCheck, DollarSign, Star, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export function HotelDashboard() {
    const t = useTranslations("dashboard.hotel");
    const tCommon = useTranslations("dashboard.common");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
                    <p className="text-muted-foreground">{t("subtitle")}</p>
                </div>
                <Button className="bg-brand text-white hover:bg-brand/90">
                    <Plus className="mr-2 h-4 w-4" /> {t("addOffer")}
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("occupancy")}</CardTitle>
                        <BedDouble className="h-4 w-4 text-brand" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">{t("roomsAvailable", { count: 12 })}</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("checkinsToday")}</CardTitle>
                        <CalendarCheck className="h-4 w-4 text-brand" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground">{t("pendingArrival", { count: 5 })}</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("monthlyRevenue")}</CardTitle>
                        <DollarSign className="h-4 w-4 text-brand" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3.5M</div>
                        <p className="text-xs text-muted-foreground">{tCommon("dzd")}</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("guestRating")}</CardTitle>
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.7 / 5</div>
                        <p className="text-xs text-muted-foreground">Based on 128 reviews</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t("roomStatus")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 hover:bg-muted/50 p-2 rounded transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-muted rounded flex items-center justify-center font-bold">
                                        10{i}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Deluxe Suite</p>
                                        <p className="text-xs text-muted-foreground">Mr. Boualem</p>
                                    </div>
                                </div>
                                <Badge variant={i % 2 === 0 ? "default" : "secondary"} className="uppercase text-[10px]">
                                    {i % 2 === 0 ? t("occupied") : t("cleaning")}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
