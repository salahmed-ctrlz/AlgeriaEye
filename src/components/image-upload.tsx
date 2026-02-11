"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value?: string[];
    onChange: (value: string[]) => void;
    maxFiles?: number;
    bucketName?: string;
    className?: string;
}

export function ImageUpload({
    value = [],
    onChange,
    maxFiles = 1,
    bucketName = "listing-images",
    className
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        // Check max files
        if (value.length + files.length > maxFiles) {
            toast.error(`You can only upload up to ${maxFiles} images.`);
            return;
        }

        setUploading(true);
        const supabase = createClient();
        const newUrls: string[] = [];
        let errorOccurred = false;

        try {
            for (const file of Array.from(files)) {
                // Validate file type
                if (!file.type.startsWith("image/")) {
                    toast.error(`File ${file.name} is not an image.`);
                    continue;
                }

                // Validate file size (e.g. 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    toast.error(`File ${file.name} is too large (max 5MB).`);
                    continue;
                }

                const fileExt = file.name.split(".").pop();
                const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from(bucketName)
                    .upload(filePath, file);

                if (uploadError) {
                    console.error("Upload error:", uploadError);
                    errorOccurred = true;
                    continue;
                }

                const { data } = supabase.storage
                    .from(bucketName)
                    .getPublicUrl(filePath);

                newUrls.push(data.publicUrl);
            }

            if (newUrls.length > 0) {
                onChange([...value, ...newUrls]);
                toast.success(`Uploaded ${newUrls.length} images!`);
            } else if (errorOccurred) {
                toast.error("Failed to upload images. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unexpected error during upload.");
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleUpload(e.target.files);
        // Reset input so same file can be selected again
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files);
        }
    };

    const onRemove = (url: string) => {
        onChange(value.filter((current) => current !== url));
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {value.map((url) => (
                    <div
                        key={url}
                        className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                    >
                        <div className="absolute right-1 top-1 z-10 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={url}
                            alt="Uploaded image"
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            {(value.length < maxFiles) && (
                <div
                    className={cn(
                        "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors",
                        dragActive ? "border-brand bg-brand/5" : "border-muted-foreground/25 hover:border-brand/50",
                        uploading && "pointer-events-none opacity-50"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={handleChange}
                        multiple={maxFiles > 1}
                        disabled={uploading}
                    />
                    <div className="flex flex-col items-center gap-2 text-center">
                        {uploading ? (
                            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                        ) : (
                            <div className="rounded-full bg-muted p-4">
                                <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                        )}
                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                {uploading ? "Uploading..." : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                SVG, PNG, JPG or GIF (max.{maxFiles > 1 ? ` ${maxFiles} files,` : ""} 5MB)
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
