"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Map as MapIcon, List, Filter } from "lucide-react";
import { MapFilters } from "@/components/map/MapFilters";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dynamically import MapClient to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/map/MapClient"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center bg-muted animate-pulse">
            <p className="text-muted-foreground">Loading Map...</p>
        </div>
    ),
});

// Mock Data for Locations
const MOCK_LOCATIONS = [
    {
        id: "1",
        title: "Grand Post Office",
        lat: 36.7725,
        lng: 3.0595,
        type: "cultural",
        address: "Algiers Center, Algiers",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Grande_Poste_D%27Alger_01.jpg/800px-Grande_Poste_D%27Alger_01.jpg"
    },
    {
        id: "2",
        title: "Maqam Echahid",
        lat: 36.7458,
        lng: 3.0698,
        type: "cultural",
        address: "El Madania, Algiers",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/M%C3%A9morial_du_Martyr_Maqam_Echahid_Alger_Alg%C3%A9rie_1.jpg/800px-M%C3%A9morial_du_Martyr_Maqam_Echahid_Alger_Alg%C3%A9rie_1.jpg"
    },
    {
        id: "3",
        title: "Sheraton Club des Pins",
        lat: 36.7589,
        lng: 2.9328,
        type: "hotel",
        address: "Club des Pins, Algiers",
    },
    {
        id: "4",
        title: "Jardin d'Essai du Hamma",
        lat: 36.7515,
        lng: 3.0725,
        type: "nature",
        address: "Belouizdad, Algiers",
    },
    {
        id: "5",
        title: "Restaurant Le Bardo",
        lat: 36.7645,
        lng: 3.0450,
        type: "restaurant",
        address: "Didouche Mourad, Algiers",
    }
];

export default function MapPage() {
    const t = useTranslations("common");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [viewMode, setViewMode] = useState<"map" | "list">("map");

    const filteredLocations = useMemo(() => {
        return MOCK_LOCATIONS.filter((loc) => {
            const matchesSearch = loc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                loc.address?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === "all" || loc.type === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, activeFilter]);

    // Calculate center based on filtered locations or default to Algiers
    const mapCenter: [number, number] = filteredLocations.length > 0
        ? [filteredLocations[0].lat, filteredLocations[0].lng]
        : [36.75, 3.05];

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            {/* Header / Search Bar */}
            <div className="bg-background border-b p-4 shadow-sm z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search places..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        {/* Mobile Filter Toggle could go here */}
                        <div className="flex md:hidden">
                            <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" /> Filter
                            </Button>
                        </div>

                        <div className="hidden md:flex bg-muted rounded-lg p-1">
                            <Button
                                variant={viewMode === "map" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("map")}
                                className="shadow-none"
                            >
                                <MapIcon className="h-4 w-4 mr-2" /> Map
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className="shadow-none"
                            >
                                <List className="h-4 w-4 mr-2" /> List
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative flex overflow-hidden">
                {/* Map View */}
                <div className={viewMode === "map" ? "w-full h-full relative" : "hidden md:block w-2/3 h-full relative"}>
                    <div className="absolute top-4 left-4 z-[1000] hidden md:block">
                        <MapFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                    </div>

                    <Map locations={filteredLocations} center={mapCenter} zoom={13} />

                    {/* Mobile Floating Filter for Map Mode */}
                    {viewMode === "map" && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center md:hidden z-[1000]">
                            <Button
                                className="rounded-full shadow-lg bg-foreground text-background"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4 mr-2" /> Show List ({filteredLocations.length})
                            </Button>
                        </div>
                    )}
                </div>

                {/* List View (Sidebar on Desktop) */}
                <div className={viewMode === "list" ? "w-full h-full overflow-y-auto bg-background p-4" : "hidden md:block w-1/3 h-full overflow-y-auto bg-background border-l p-4"}>
                    {/* Mobile Filters in List Mode */}
                    <div className="md:hidden mb-4 overflow-x-auto pb-2">
                        <div className="flex gap-2">
                            {["all", "hotel", "restaurant", "cultural", "nature"].map(f => (
                                <Badge
                                    key={f}
                                    variant={activeFilter === f ? "default" : "outline"}
                                    onClick={() => setActiveFilter(f)}
                                    className="cursor-pointer capitalize whitespace-nowrap"
                                >
                                    {f}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-lg">{filteredLocations.length} Results</h2>
                        </div>

                        {filteredLocations.map((loc) => (
                            <Card key={loc.id} className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardContent className="p-0 flex flex-row">
                                    <div className="w-1/3 h-28 bg-muted relative">
                                        {loc.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={loc.image} alt={loc.title} className="w-full h-full object-cover rounded-l-lg" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                <MapIcon className="h-8 w-8 opacity-20" />
                                            </div>
                                        )}
                                        <Badge className="absolute top-2 left-2 capitalize shadow-sm text-[10px] px-1.5 h-5">{loc.type}</Badge>
                                    </div>
                                    <div className="w-2/3 p-3 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold truncate">{loc.title}</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">{loc.address}</p>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button size="sm" variant="ghost" className="h-8 text-xs">View Details</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Mobile Map Toggle in List Mode */}
                    {viewMode === "list" && (
                        <div className="fixed bottom-4 left-0 right-0 flex justify-center md:hidden z-20">
                            <Button
                                className="rounded-full shadow-lg bg-foreground text-background"
                                onClick={() => setViewMode("map")}
                            >
                                <MapIcon className="h-4 w-4 mr-2" /> Show Map
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
