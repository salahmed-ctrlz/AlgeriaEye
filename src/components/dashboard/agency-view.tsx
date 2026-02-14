"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Briefcase, Plus, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

export function AgencyDashboard() {
    const t = useTranslations("dashboard.agency");
    const tCommon = useTranslations("dashboard.common");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
                    <p className="text-muted-foreground">{t("subtitle")}</p>
                </div>
                <Button className="bg-brand text-white hover:bg-brand/90">
                    <Plus className="mr-2 h-4 w-4" /> {t("addPackage")}
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("activeTrips")}</CardTitle>
                        <Briefcase className="h-4 w-4 text-brand" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("totalBookings")}</CardTitle>
                        <Users className="h-4 w-4 text-brand" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">245</div>
                        <p className="text-xs text-muted-foreground">+12% this month</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("revenue")}</CardTitle>
                        <BarChart3 className="h-4 w-4 text-brand" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.2M</div>
                        <p className="text-xs text-muted-foreground">{tCommon("dzd")}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t("recentBookings")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm font-medium text-muted-foreground border-b pb-2">
                            <span>Customer</span>
                            <span>Trip</span>
                            <span>Status</span>
                            <span>Amount</span>
                        </div>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-muted" />
                                    <span>Amine K.</span>
                                </div>
                                <span>Sahara Expedition</span>
                                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 uppercase text-[10px]">{t("confirmed")}</Badge>
                                <span>45,000 {tCommon("dzd")}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
