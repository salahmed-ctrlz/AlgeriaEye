"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { MapPin, Music, Info, Camera, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Attraction } from "@/data/wilayas";

interface AttractionCardProps {
    attraction: Attraction;
    index: number;
}

export function AttractionCard({ attraction, index }: AttractionCardProps) {
    const locale = useLocale();
    const isAr = locale === "ar";
    const name = isAr ? attraction.name.ar : attraction.name.en;
    const description = attraction.description ? (isAr ? attraction.description.ar : attraction.description.en) : "";
    const traditions = attraction.traditions ? (isAr ? attraction.traditions.ar : attraction.traditions.en) : "";

    // Placeholder gallery images (using the main image and some fallbacks/variations if we had them, 
    // but for now we'll just repeat the main image to simulate a gallery structure as requested)
    const galleryImages = [
        attraction.image,
        attraction.image, // Placeholder 2
        attraction.image  // Placeholder 3
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className="group relative h-[400px] w-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                    {/* Background Image */}
                    <Image
                        src={attraction.image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                        {attraction.category && (
                            <Badge
                                variant="secondary"
                                className="w-fit mb-3 bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-white/10"
                            >
                                {attraction.category}
                            </Badge>
                        )}

                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                            {name}
                        </h3>

                        <div className="h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:h-auto group-hover:opacity-100 group-hover:mt-2">
                            <p className="text-sm text-gray-200 line-clamp-2 mb-4">
                                {description}
                            </p>
                            <div className="flex items-center text-brand-light font-medium text-sm">
                                <span>{isAr ? "اقرأ المزيد" : "Read More"}</span>
                                <Info className="h-4 w-4 mx-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-background border-none shadow-2xl">
                <div className="grid md:grid-cols-2 h-[80vh] md:h-auto overflow-y-auto md:overflow-visible">
                    {/* Visual Side (Left/Right based on locale) */}
                    <div className="relative h-64 md:h-full min-h-[300px]">
                        <Image
                            src={attraction.image}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-4 left-4 z-10">
                            <Badge className="bg-black/50 hover:bg-black/70 backdrop-blur-md text-white border-none">
                                {attraction.category || "Must Visit"}
                            </Badge>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-6 md:p-8 md:py-12 flex flex-col">
                        <DialogTitle className="text-3xl font-bold text-foreground mb-4 leading-tight">
                            {name}
                        </DialogTitle>

                        <div className="space-y-6 flex-1">
                            {/* Description */}
                            <div className="prose prose-sm dark:prose-invert">
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            {/* Traditions / Culture */}
                            {traditions && (
                                <div className="bg-brand/5 rounded-xl p-4 border border-brand/10">
                                    <div className="flex items-center gap-2 mb-2 text-brand font-semibold">
                                        <Music className="h-4 w-4" />
                                        <span>{isAr ? "تقاليد وثقافة" : "Traditions & Culture"}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {traditions}
                                    </p>
                                </div>
                            )}

                            {/* Gallery Placeholders */}
                            <div>
                                <div className="flex items-center gap-2 mb-3 text-foreground font-medium">
                                    <Camera className="h-4 w-4 text-muted-foreground" />
                                    <span>{isAr ? "معرض الصور" : "Gallery"}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {galleryImages.map((img, i) => (
                                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                                            <Image
                                                src={img}
                                                alt={`Gallery ${i}`}
                                                fill
                                                className="object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Actions */}
                        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-3">
                            <Button className="w-full sm:flex-1 bg-brand hover:bg-brand-dark text-white rounded-xl h-12 text-base shadow-lg shadow-brand/20" asChild>
                                <a href={attraction.locationUrl || "#"} target="_blank" rel="noopener noreferrer">
                                    <MapPin className="mr-2 h-5 w-5" />
                                    {isAr ? "احصل على الاتجاهات" : "Get Directions"}
                                </a>
                            </Button>
                            <DialogClose asChild>
                                <Button variant="outline" className="w-full sm:w-auto rounded-xl h-12">
                                    {isAr ? "إغلاق" : "Close"}
                                </Button>
                            </DialogClose>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
