import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, Star, Map, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export function GuideDashboard() {
    const t = useTranslations("dashboard.guide");
    const tCommon = useTranslations("dashboard.common");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
                    <p className="text-muted-foreground">{t("subtitle")}</p>
                </div>
                <Button className="bg-brand text-white hover:bg-brand/90">
                    <Plus className="mr-2 h-4 w-4" /> {t("createTour")}
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("upcomingTours")}</CardTitle>
                        <Calendar className="h-4 w-4 text-brand" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">+1 this week</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("newRequests")}</CardTitle>
                        <MessageSquare className="h-4 w-4 text-brand" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">3 unread</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("totalIncome")}</CardTitle>
                        <div className="text-sm font-bold text-brand">{tCommon("dzd")}</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45.000</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("rating")}</CardTitle>
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.9</div>
                        <p className="text-xs text-muted-foreground">Based on 24 reviews</p>
                    </CardContent>
                </Card>
            </div>

            {/* Active Requests Content */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>{t("upcomingSchedule")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                                            <Map className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Casbah Historical Tour</p>
                                            <p className="text-xs text-muted-foreground">Dec 12, 10:00 AM • 4 Guests</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 uppercase text-[10px]">{t("confirmed")}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>{t("recentMessages")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0">
                                    <div className="h-8 w-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-xs">
                                        K
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Karim Tourist</p>
                                        <p className="text-xs text-muted-foreground truncate">Is the tour available on Friday?</p>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">2m ago</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
