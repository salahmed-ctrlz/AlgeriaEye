"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface ListingCarouselProps {
    items: { name: string; image: string }[];
}

export function ListingCarousel({ items }: ListingCarouselProps) {
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: "start", skipSnaps: false },
        [Autoplay({ delay: 3000, stopOnInteraction: false })]
    );

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="w-full py-8 overflow-hidden select-none" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="relative flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] min-w-0 pl-4"
                    >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg group">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <h3 className="text-white font-bold text-lg md:text-xl">
                                    {item.name}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
