"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface Story {
    id: string;
    media_url: string;
    user: {
        full_name: string;
        avatar_url: string;
    };
}

export function StoriesSection() {
    // Mock data for now, replacing with real fetch later
    const [stories, setStories] = useState<Story[]>([
        {
            id: "1",
            media_url: "",
            user: { full_name: "Ahmed", avatar_url: "https://github.com/shadcn.png" }
        },
        {
            id: "2",
            media_url: "",
            user: { full_name: "Sarah Travel", avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" }
        },
        {
            id: "3",
            media_url: "",
            user: { full_name: "Oran Guide", avatar_url: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100" }
        },
    ]);

    return (
        <section className="py-4 px-4 md:px-8 border-b">
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-4 text-xl font-semibold">Stories</h2>
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex w-max space-x-4 p-1">
                        {/* Add Story Button */}
                        <div className="flex flex-col items-center gap-2 cursor-pointer group">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-brand/30 bg-brand/5 transition-colors group-hover:border-brand group-hover:bg-brand/10">
                                <Plus className="h-6 w-6 text-muted-foreground group-hover:text-brand" />
                                <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-brand text-white flex items-center justify-center border-2 border-background">
                                    <Plus className="h-3 w-3" />
                                </div>
                            </div>
                            <span className="text-xs font-medium">Add Story</span>
                        </div>

                        {/* Stories List */}
                        {stories.map((story) => (
                            <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer group">
                                <div className="p-[2px] rounded-full bg-gradient-to-tr from-brand via-green-400 to-red-500 animate-gradient-xy">
                                    <div className="rounded-full p-[2px] bg-background">
                                        <Avatar className="h-14 w-14 border-2 border-background transition-transform group-hover:scale-95">
                                            <AvatarImage src={story.user.avatar_url} />
                                            <AvatarFallback>{story.user.full_name[0]}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </div>
                                <span className="text-xs font-medium max-w-[70px] truncate">
                                    {story.user.full_name.split(" ")[0]}
                                </span>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </section>
    );
}
