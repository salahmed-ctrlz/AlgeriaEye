"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

// Fix for default marker icon missing in React Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Location {
    id: string;
    title: string;
    lat: number;
    lng: number;
    type: string;
    image?: string;
    address?: string;
    mapsUrl?: string; // External google maps link
}

interface MapProps {
    locations: Location[];
    center?: [number, number];
    zoom?: number;
}

function LocationMarker({ location }: { location: Location }) {
    const locale = useLocale();
    const isTouristSpot = location.id.startsWith("spot-");

    return (
        <Marker position={[location.lat, location.lng]}>
            <Popup>
                <div className="w-64 p-1">
                    {location.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={location.image}
                            alt={location.title}
                            className="w-full h-32 object-cover rounded-md mb-2"
                        />
                    )}
                    <h3 className="font-semibold text-base mb-1">{location.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{location.address}</p>
                    <div className="flex gap-2">
                        {isTouristSpot || location.mapsUrl ? (
                            <Button size="sm" className="w-full flex items-center gap-2" onClick={() => window.open(location.mapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`)}>
                                <Navigation className="h-3 w-3" />
                                {location.mapsUrl ? "View in Maps" : "Get Directions"}
                            </Button>
                        ) : (
                            <>
                                <Link href={`/${locale}/listing/${location.id}`} className="flex-1">
                                    <Button size="sm" className="w-full">View Details</Button>
                                </Link>
                                <Button size="sm" variant="outline" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`)}>
                                    <Navigation className="h-3 w-3" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

// Component to update map center when props change
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

export default function MapClient({ locations, center = [36.75, 3.05], zoom = 10 }: MapProps) {
    // Algiers default center [36.75, 3.05]

    return (
        <div className="h-full w-full rounded-lg overflow-hidden border shadow-sm relative z-0">
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.map((location) => (
                    <LocationMarker key={location.id} location={location} />
                ))}
            </MapContainer>
        </div>
    );
}
