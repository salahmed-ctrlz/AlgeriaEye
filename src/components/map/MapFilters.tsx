"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Hotel, Utensils, Landmark, Mountain, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapFiltersProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

export function MapFilters({ activeFilter, onFilterChange }: MapFiltersProps) {
    const filters = [
        { id: "all", label: "All Places", icon: MapPin },
        { id: "hotel", label: "Hotels", icon: Hotel },
        { id: "restaurant", label: "Restaurants", icon: Utensils },
        { id: "cultural", label: "Culture", icon: Landmark },
        { id: "nature", label: "Nature", icon: Mountain },
    ];

    return (
        <Card className="p-2 absolute top-4 left-4 z-[1000] bg-background/95 backdrop-blur shadow-lg border-muted">
            <div className="flex flex-col gap-2">
                {filters.map((filter) => {
                    const Icon = filter.icon;
                    return (
                        <Button
                            key={filter.id}
                            variant={activeFilter === filter.id ? "default" : "ghost"}
                            size="sm"
                            onClick={() => onFilterChange(filter.id)}
                            className={cn(
                                "justify-start gap-2",
                                activeFilter === filter.id && "bg-brand text-white hover:bg-brand/90"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            <span className="hidden md:inline">{filter.label}</span>
                        </Button>
                    );
                })}
            </div>
        </Card>
    );
}
