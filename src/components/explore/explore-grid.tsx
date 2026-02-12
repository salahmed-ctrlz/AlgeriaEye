"use client";

import { useState } from "react";
import { ExploreItem } from "@/lib/data/explore-data";
import { CultureCard } from "./culture-card";

interface ExploreGridProps {
    items: ExploreItem[];
}

export function ExploreGrid({ items }: ExploreGridProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 relative p-4 pb-20">
            {/* Backdrop Overlay for closing (Click Outside) */}
            {selectedId && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setSelectedId(null)}
                />
            )}

            {items.map((item) => (
                <CultureCard
                    key={item.id}
                    item={item}
                    isSelected={selectedId === item.id}
                    isDimmed={selectedId !== null && selectedId !== item.id}
                    onSelect={setSelectedId}
                />
            ))}
        </div>
    );
}
