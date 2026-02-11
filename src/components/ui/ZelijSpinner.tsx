"use client";

import Image from "next/image";

export default function ZelijSpinner({ className = "h-16 w-16" }: { className?: string }) {
    return (
        <div className={`relative animate-spin-slow ${className}`}>
            {/* Using CSS mask to color the SVG 'brand' (green) or whatever color is needed. 
                 Since user asked for "make that svg ... a loading animation", I will use the SVG directly.
                 Use brand color for identity.
             */}
            <div
                className="w-full h-full bg-brand"
                style={{
                    maskImage: 'url("/images/Logos/zelij.svg")',
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskImage: 'url("/images/Logos/zelij.svg")',
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                }}
            />
        </div>
    );
}
