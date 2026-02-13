"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Map as MapIcon, List, Filter, MapPin } from "lucide-react";
import { MapFilters } from "@/components/map/MapFilters";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { touristSpots } from "@/lib/data/tourist-spots";
import { useSearchParams } from "next/navigation";

import { wilayas } from "@/data/wilayas";
import { useLocale } from "next-intl";

// Dynamically import MapClient to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/map/MapClient"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center bg-muted animate-pulse">
            <p className="text-muted-foreground">Loading Map...</p>
        </div>
    ),
});

interface MapLocation {
    id: string;
    title: string;
    lat: number;
    lng: number;
    type: string;
    address?: string;
    image?: string;
    price?: number;
    slug?: string; // for navigation
    mapsUrl?: string; // External google maps link
}

export default function MapPage() {
    const t = useTranslations("common");
    const locale = useLocale();
    const isAr = locale === "ar";
    const searchParams = useSearchParams();
    const initialFilter = searchParams.get("filter") || "all";

    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState(initialFilter);
    const [viewMode, setViewMode] = useState<"map" | "list">("map");
    const [locations, setLocations] = useState<MapLocation[]>([]);

    useEffect(() => {
        if (initialFilter) {
            setActiveFilter(initialFilter);
        }
    }, [initialFilter]);

    useEffect(() => {
        const fetchLocations = async () => {
            const allLocations: MapLocation[] = [];

            // 1. Fetch Listings from DB (Hotels & Restaurants)
            const supabase = createClient();
            const { data: listings } = await supabase
                .from("listings")
                .select("*");

            if (listings) {
                listings.forEach(l => {
                    if (l.location_lat && l.location_lng) {
                        allLocations.push({
                            id: l.id,
                            title: l.title,
                            lat: l.location_lat,
                            lng: l.location_lng,
                            type: l.type.toLowerCase(), // hotel or restaurant
                            address: l.address,
                            image: l.images?.[0],
                            price: l.price_per_night,
                            slug: l.id // listings use ID for slug/link usually
                        });
                    }
                });
            }

            // 2. Fetch Attractions from Wilayas Data (Cultural & Nature) - keeping this for backward compatibility if needed, or we can rely on the new touristSpots
            wilayas.forEach(w => {
                if (w.bestPlaces) {
                    w.bestPlaces.forEach((p, idx) => {
                        if (p.lat && p.lng) {
                            // Determine type based on category or default to 'cultural'
                            let type = "cultural";
                            const cat = (p.category || "").toLowerCase();
                            if (cat.includes("nature") || cat.includes("park") || cat.includes("garden")) type = "nature";

                            allLocations.push({
                                id: `${w.slug}-attraction-${idx}`,
                                title: isAr ? p.name.ar : p.name.en,
                                lat: p.lat,
                                lng: p.lng,
                                type: type,
                                address: isAr ? w.name.ar : w.name.en,
                                image: p.image
                            });
                        }
                    });
                }
            });

            // 3. Add New Tourist Spots
            touristSpots.forEach(spot => {
                allLocations.push({
                    id: spot.id,
                    title: isAr ? spot.name.ar : (locale === 'fr' ? spot.name.fr : spot.name.en),
                    lat: spot.location.lat,
                    lng: spot.location.lng,
                    type: spot.type,
                    address: spot.city, // or wilaya
                    image: spot.image,
                    mapsUrl: spot.mapsUrl // Pass specific maps URL
                });
            });

            setLocations(allLocations);
        };

        fetchLocations();
    }, [isAr, locale]);

    const filteredLocations = useMemo(() => {
        return locations.filter((loc) => {
            const matchesSearch = loc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                loc.address?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === "all" || loc.type === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, activeFilter, locations]);

    // Calculate center based on filtered locations or default to Algiers
    // BUT allow overriding if user clicks a card
    const [viewCenter, setViewCenter] = useState<[number, number] | null>(null);

    const mapCenter: [number, number] = viewCenter
        ? viewCenter
        : (filteredLocations.length > 0
            ? [filteredLocations[0].lat, filteredLocations[0].lng]
            : [36.75, 3.05]);

    const handleLocationClick = (loc: MapLocation) => {
        setViewCenter([loc.lat, loc.lng]);
        setViewMode("map");
    };

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

                    <Map locations={filteredLocations} center={mapCenter} zoom={viewCenter ? 15 : 13} />

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
                            <Card
                                key={loc.id}
                                className="cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => handleLocationClick(loc)}
                            >
                                <CardContent className="p-0 flex flex-row">
                                    <div className="w-1/3 h-28 bg-muted relative">
                                        {loc.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={loc.image} alt={loc.title} className="w-full h-full object-cover rounded-l-lg" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                <MapPin className="h-8 w-8 opacity-20" />
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
