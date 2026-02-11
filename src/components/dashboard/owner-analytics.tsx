"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, TrendingUp, Calendar } from "lucide-react";

export function OwnerAnalytics() {
    // Simulated data
    const stats = [
        {
            title: "Total Revenue",
            value: "1,250,500 DZD",
            description: "+12.5% from last month",
            icon: CreditCard,
        },
        {
            title: "Active Bookings",
            value: "12",
            description: "+4 new bookings today",
            icon: Calendar,
        },
        {
            title: "Total Guests",
            value: "148",
            description: "85% satisfaction rate",
            icon: Users,
        },
        {
            title: "Occupancy Rate",
            value: "72%",
            description: "+5% from last month",
            icon: TrendingUp,
        },
    ];

    const recentSales = [
        {
            name: "Amine Benali",
            email: "amine.b@example.com",
            amount: "45,000 DZD",
            date: "Today, 2:34 PM",
            status: "Paid",
        },
        {
            name: "Sarah Kaddour",
            email: "sarah.k@example.com",
            amount: "120,000 DZD",
            date: "Yesterday, 10:15 AM",
            status: "Pending",
        },
        {
            name: "Mohamed Saidi",
            email: "mohamed.s@example.com",
            amount: "32,500 DZD",
            date: "Feb 9, 2026",
            status: "Paid",
        },
        {
            name: "Yasmine Ouali",
            email: "yasmine.o@example.com",
            amount: "85,000 DZD",
            date: "Feb 8, 2026",
            status: "Paid",
        },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard Analytics</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] w-full flex items-end gap-2 px-4 pb-2">
                            {/* Simple CSS Bar Chart Simulation */}
                            {[40, 65, 30, 80, 55, 90, 45, 70, 60, 85, 50, 75].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col justify-end gap-1 group">
                                    <div
                                        className="w-full bg-brand/80 rounded-t-sm hover:bg-brand transition-all relative"
                                        style={{ height: `${height}%` }}
                                    >
                                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-slate-800 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            {height * 1000} DZD
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between px-4 text-xs text-muted-foreground mt-2">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                            <span>Aug</span>
                            <span>Sep</span>
                            <span>Oct</span>
                            <span>Nov</span>
                            <span>Dec</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recentSales.map((item, index) => (
                                <div key={index} className="flex items-center justify-between space-x-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                            <span className="font-semibold text-xs text-slate-600 dark:text-slate-300">
                                                {item.name.split(" ").map(n => n[0]).join("")}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium leading-none">{item.name}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">{item.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-medium text-sm">{item.amount}</span>
                                        <span className="text-[10px] text-muted-foreground">{item.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
