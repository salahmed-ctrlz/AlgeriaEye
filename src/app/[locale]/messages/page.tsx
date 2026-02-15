"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, User, Send, ChevronLeft, Languages, MapPin, Image as ImageIcon, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Profile {
    id: string;
    full_name: string;
    avatar_url: string;
}

interface Message {
    id: string;
    content: string;
    created_at: string;
    sender_id: string;
    receiver_id: string;
    sender?: Profile;
    receiver?: Profile;
}

interface Conversation {
    otherUser: Profile;
    messages: Message[];
    lastMessage: Message;
}

export default function MessagesPage() {
    const t = useTranslations("dashboard");
    const locale = useLocale();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const searchParams = useSearchParams();
    const targetUserId = searchParams.get("userId");
    const [currentUser, setCurrentUser] = useState<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Feature States
    const [showTranslation, setShowTranslation] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setLoading(false);
                return;
            }
            setCurrentUser(user);

            // Fetch all messages
            const { data } = await supabase
                .from("messages")
                .select(`
                    *,
                    sender:sender_id(id, full_name, avatar_url),
                    receiver:receiver_id(id, full_name, avatar_url)
                `)
                .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
                .order("created_at", { ascending: true });

            if (data) {
                const grouped = new Map<string, Conversation>();

                data.forEach((msg: any) => {
                    const isSender = msg.sender_id === user.id;
                    const otherUser = isSender ? msg.receiver : msg.sender;
                    if (!otherUser) return;

                    const key = otherUser.id;

                    if (!grouped.has(key)) {
                        grouped.set(key, {
                            otherUser,
                            messages: [],
                            lastMessage: msg
                        });
                    }

                    const conv = grouped.get(key)!;
                    conv.messages.push(msg);
                    conv.lastMessage = msg;
                });

                // If specialized userId requested, ensure they are in the list
                if (targetUserId && !grouped.has(targetUserId) && targetUserId !== user.id) {
                    const { data: targetProfile } = await supabase
                        .from("profiles")
                        .select("id, full_name, avatar_url")
                        .eq("id", targetUserId)
                        .single();

                    if (targetProfile) {
                        grouped.set(targetUserId, {
                            otherUser: targetProfile,
                            messages: [],
                            lastMessage: {
                                id: "new",
                                content: "Start a conversation",
                                created_at: new Date().toISOString(),
                                sender_id: user.id,
                                receiver_id: targetUserId
                            }
                        });
                    }
                }

                const sorted = Array.from(grouped.values()).sort((a, b) => {
                    if (a.lastMessage.id === "new") return -1;
                    if (b.lastMessage.id === "new") return 1;
                    return new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime();
                });

                setConversations(sorted);

                if (targetUserId) {
                    setSelectedConvId(targetUserId);
                } else if (sorted.length > 0 && window.innerWidth >= 768) {
                    setSelectedConvId(sorted[0].otherUser.id);
                }
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    // Scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [selectedConvId, conversations]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConvId || !currentUser) return;

        const supabase = createClient();
        const convIndex = conversations.findIndex(c => c.otherUser.id === selectedConvId);
        if (convIndex === -1) return;

        const optimisticMsg: Message = {
            id: `temp-${Date.now()}`,
            content: newMessage,
            created_at: new Date().toISOString(),
            sender_id: currentUser.id,
            receiver_id: selectedConvId,
        };

        // Optimistic update
        const updatedConvs = [...conversations];
        updatedConvs[convIndex].messages.push(optimisticMsg);
        updatedConvs[convIndex].lastMessage = optimisticMsg;
        // Move to top
        const activeConv = updatedConvs.splice(convIndex, 1)[0];
        updatedConvs.unshift(activeConv);
        setConversations(updatedConvs);
        setNewMessage("");

        // Persist
        const { data, error } = await supabase.from("messages").insert({
            sender_id: currentUser.id,
            receiver_id: selectedConvId,
            content: optimisticMsg.content
        }).select().single();

        if (error) {
            console.error("Failed to send", error);
            // Revert or show error (simplified for now)
        } else {
            // Replace temp ID
            const finalConvs = [...updatedConvs];
            const msgIndex = finalConvs[0].messages.findIndex(m => m.id === optimisticMsg.id);
            if (msgIndex !== -1) {
                finalConvs[0].messages[msgIndex] = data;
            }
            setConversations(finalConvs);
        }
    };

    const handleTranslateToggle = () => {
        if (!showTranslation) {
            setIsTranslating(true);
            // Simulate API delay
            setTimeout(() => {
                setShowTranslation(true);
                setIsTranslating(false);
                toast.success("Translation enabled (Simulated)");
            }, 600);
        } else {
            setShowTranslation(false);
        }
    };

    const handleShareLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const link = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
                setNewMessage((prev) => prev ? `${prev} ${link}` : link);
                toast.success("Location added to message");
            }, () => {
                toast.error("Could not get location");
            });
        } else {
            toast.error("Geolocation not supported");
        }
    };

    const handleImageUpload = () => {
        toast.info("Image upload feature coming soon!");
    };

    const selectedConv = conversations.find(c => c.otherUser.id === selectedConvId);

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-6xl px-4 py-6 h-[calc(100vh-4rem)]">
            <div className="grid h-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-hidden rounded-2xl border bg-card shadow-sm">

                {/* Sidebar (Conversation List) */}
                <div className={cn(
                    "flex flex-col border-r bg-muted/10 md:flex h-full",
                    selectedConvId ? "hidden" : "flex"
                )}>
                    <div className="p-4 border-b">
                        <h2 className="font-bold text-xl">Messages</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <div className="flex flex-col gap-1 p-2">
                            {conversations.length === 0 ? (
                                <p className="p-4 text-center text-sm text-muted-foreground">No conversations yet.</p>
                            ) : (
                                conversations.map((conv) => (
                                    <button
                                        key={conv.otherUser.id}
                                        onClick={() => setSelectedConvId(conv.otherUser.id)}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted",
                                            selectedConvId === conv.otherUser.id ? "bg-muted font-medium" : ""
                                        )}
                                    >
                                        <Avatar>
                                            <AvatarImage src={conv.otherUser.avatar_url} />
                                            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0 overflow-hidden">
                                            <div className="flex justify-between items-baseline">
                                                <span className="truncate text-sm font-semibold">{conv.otherUser.full_name}</span>
                                                <span className="text-[10px] text-muted-foreground shrink-0">
                                                    {formatDistanceToNow(new Date(conv.lastMessage.created_at), { addSuffix: false })}
                                                </span>
                                            </div>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {conv.lastMessage.sender_id === currentUser?.id && "You: "}
                                                {conv.lastMessage.content}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className={cn(
                    "flex flex-col md:col-span-2 lg:col-span-3 h-full",
                    !selectedConvId ? "hidden md:flex" : "flex"
                )}>
                    {selectedConv ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center justify-between border-b p-4 bg-card shadow-sm z-10">
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="md:hidden"
                                        onClick={() => setSelectedConvId(null)}
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>
                                    <Avatar className="h-10 w-10 border">
                                        <AvatarImage src={selectedConv.otherUser.avatar_url} />
                                        <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold">{selectedConv.otherUser.full_name}</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs text-muted-foreground">Online</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant={showTranslation ? "secondary" : "outline"}
                                    size="sm"
                                    onClick={handleTranslateToggle}
                                    className="gap-2"
                                >
                                    {isTranslating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
                                    <span className="hidden sm:inline">{showTranslation ? "Original" : "Translate"}</span>
                                </Button>
                            </div>

                            {/* Messages List */}
                            <div
                                className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5 scroll-smooth"
                                ref={scrollRef}
                            >
                                {selectedConv.messages.map((msg, i) => {
                                    const isMe = msg.sender_id === currentUser?.id;
                                    return (
                                        <div
                                            key={msg.id || i}
                                            className={cn(
                                                "flex w-full",
                                                isMe ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                                                    isMe
                                                        ? "bg-brand text-primary-foreground rounded-br-none"
                                                        : "bg-white dark:bg-muted border rounded-bl-none"
                                                )}
                                            >
                                                {showTranslation && !isMe ? (
                                                    <div className="space-y-1">
                                                        <p className="opacity-50 text-[10px] uppercase tracking-wider">Translated</p>
                                                        <p>{msg.content} (en)</p>
                                                    </div>
                                                ) : (
                                                    msg.content
                                                )}

                                                <div className={cn(
                                                    "text-[10px] mt-1 opacity-70 text-right",
                                                    isMe ? "text-primary-foreground/80" : "text-muted-foreground"
                                                )}>
                                                    {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t bg-card">
                                <div className="flex gap-2 mb-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-brand"
                                        onClick={handleImageUpload}
                                        title="Send Image"
                                    >
                                        <ImageIcon className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-brand"
                                        onClick={handleShareLocation}
                                        title="Share Location"
                                    >
                                        <MapPin className="h-5 w-5" />
                                    </Button>
                                </div>
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <Input
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="rounded-full bg-muted/50 border-transparent focus-visible:bg-background transition-all"
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={!newMessage.trim()}
                                        className="rounded-full shrink-0 bg-brand hover:bg-brand-light text-white"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                            <div className="bg-muted/20 p-6 rounded-full mb-4">
                                <MessageCircle className="h-12 w-12 opacity-20" />
                            </div>
                            <h3 className="text-lg font-medium">Your Messages</h3>
                            <p>Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
