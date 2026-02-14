"use client";

import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";

interface InstagramEmbedProps {
    url: string;
    thumbnail?: string;
    captioned?: boolean;
    maxWidth?: number;
}

export function InstagramEmbed({
    url,
    captioned = false,
    maxWidth = 400,
}: InstagramEmbedProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Extract post/reel code from any Instagram URL format
    const getEmbedUrl = (originalUrl: string): string | null => {
        const match = originalUrl.match(
            /instagram\.com\/(?:p|reel|reels|tv)\/([a-zA-Z0-9_-]+)/
        );
        if (!match) return null;

        const code = match[1];
        const embedPath = captioned ? "embed/captioned/" : "embed/";

        // Using /p/ for all content (including reels) often bypasses the 
        // "Watch on Instagram" overlay better than the /reel/ path.
        return `https://www.instagram.com/p/${code}/${embedPath}`;
    };

    const embedUrl = getEmbedUrl(url);

    // Reset state when URL changes
    useEffect(() => {
        setIsLoaded(false);
        setHasError(false);
    }, [url]);

    if (!embedUrl) {
        return (
            <div className="flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8">
                <p className="text-sm text-muted-foreground/50">Invalid Instagram URL</p>
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden rounded-2xl">
            {/* Loading skeleton */}
            <div
                className={[
                    "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3",
                    "bg-white/[0.02] backdrop-blur-sm",
                    "transition-all duration-700 ease-out",
                    isLoaded ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100",
                ].join(" ")}
            >
                {/* Shimmer */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
                    style={{
                        backgroundSize: "200% 100%",
                        animation: "ig-embed-shimmer 2s ease-in-out infinite",
                    }}
                />

                {/* Spinner */}
                <div className="relative h-10 w-10">
                    <div className="absolute inset-0 rounded-full border-2 border-white/[0.06] border-t-brand/40 animate-spin" />
                    <div
                        className="absolute inset-1.5 rounded-full border-[1.5px] border-transparent border-b-brand/20 animate-spin"
                        style={{ animationDirection: "reverse", animationDuration: "1.8s" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Instagram className="h-3.5 w-3.5 text-white/20" />
                    </div>
                </div>

                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/30">
                    Loading
                </span>
            </div>

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/[0.02]">
                    <Instagram className="h-8 w-8 text-white/15" />
                    <p className="text-xs text-muted-foreground/40">Failed to load</p>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand/60 hover:text-brand/80 underline underline-offset-2 transition-colors"
                    >
                        View on Instagram
                    </a>
                </div>
            )}

            {/* Actual Instagram embed iframe */}
            <iframe
                ref={iframeRef}
                src={embedUrl}
                className={[
                    "w-full border-0 rounded-2xl",
                    "transition-all duration-700 ease-out",
                    isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-[0.98]",
                ].join(" ")}
                style={{
                    maxWidth: `${maxWidth}px`,
                    minHeight: captioned ? "720px" : "500px",
                    height: captioned ? "780px" : "580px",
                    colorScheme: "dark",
                }}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
                onLoad={() => {
                    setIsLoaded(true);
                    setHasError(false);
                }}
                onError={() => {
                    setHasError(true);
                    setIsLoaded(true);
                }}
                title="Instagram embed"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
            />

            {/* Inject shimmer keyframe once */}
            <InjectKeyframes />
        </div>
    );
}

// Tiny component that injects the keyframe exactly once via DOM
function InjectKeyframes() {
    useEffect(() => {
        const id = "ig-embed-keyframes";
        if (document.getElementById(id)) return;

        const style = document.createElement("style");
        style.id = id;
        style.textContent = `
      @keyframes ig-embed-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `;
        document.head.appendChild(style);
    }, []);

    return null;
}