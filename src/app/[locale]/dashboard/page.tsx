"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Plus,
    Loader2,
    Trash2,
    Edit,
    MapPin,
    Building2,
    LayoutDashboard,
    UserCircle,
    Save,
    Settings,
    LogOut,
    Menu,
    Home,
    Heart,
    CalendarDays,
    BarChart3,
    Receipt,
    ShoppingBag,
    Utensils
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/lib/supabase/client";
import { wilayas, getWilayaName } from "@/data/wilayas";
import { updateProfile } from "@/actions/profile";
import { ImageUpload } from "@/components/image-upload";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ListingForm } from "@/components/listing-form";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MenuManager } from "@/components/dashboard/menu-manager";

// Specialized Dashboards
import { GuideDashboard } from "@/components/dashboard/guide-view";
import { AgencyDashboard } from "@/components/dashboard/agency-view";
import { HotelDashboard } from "@/components/dashboard/hotel-view";
import { MerchantDashboard } from "@/components/dashboard/merchant-view";
import { OwnerAnalytics } from "@/components/dashboard/owner-analytics";

interface Listing {
    id: string;
    title: string;
    description: string;
    type: string;
    wilaya: string;
    address: string;
    price_per_night: number;
    images: string[] | null;
    features: string[] | null;
    owner_id: string;
    created_at: string;
}

interface Profile {
    id: string;
    full_name: string;
    wilaya: string;
    phone: string | null;
    bio: string | null;
    avatar_url: string | null;
    role: "owner" | "tourist" | "admin" | "guide" | "agency" | "hotel" | "merchant";
}

interface Booking {
    id: string;
    listing: Listing;
    start_date: string;
    end_date: string;
    status: string;
    total_price: number;
    payment_status: string;
    created_at: string;
}

type Tab = "listings" | "profile" | "trips" | "favorites" | "overview" | "analytics" | "purchases";

export default function DashboardPage() {
    const t = useTranslations("dashboard");
    const locale = useLocale();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initial tab from URL or default
    const [activeTab, setActiveTab] = useState<Tab>("profile"); // Default to profile until loaded

    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);

    // Data States
    const [listings, setListings] = useState<Listing[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [favorites, setFavorites] = useState<Listing[]>([]);

    // Listing Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingListing, setEditingListing] = useState<Listing | null>(null);
    const [selectedListingForMenu, setSelectedListingForMenu] = useState<Listing | null>(null);

    // Profile Form State
    const [profileSaving, setProfileSaving] = useState(false);

    const [profileForm, setProfileForm] = useState({
        full_name: "",
        wilaya: "",
        phone: "",
        bio: "",
        avatar_url: "",
    });

    const [activeSettingsTab, setActiveSettingsTab] = useState<"general" | "security" | "notifications">("general");

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push(`/${locale}/login`);
                return;
            }

            setUserId(user.id);

            // Fetch Profile
            const { data: profileData } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (profileData) {
                setProfile(profileData);
                setProfileForm({
                    full_name: profileData.full_name || "",
                    wilaya: profileData.wilaya || "",
                    phone: profileData.phone || "",
                    bio: profileData.bio || "",
                    avatar_url: profileData.avatar_url || "",
                });

                // Set default tab based on role if not set in URL
                if (!searchParams.get("tab")) {
                    if (["guide", "agency", "hotel", "merchant"].includes(profileData.role || "")) {
                        setActiveTab("overview");
                    } else if (profileData.role === "owner") {
                        setActiveTab("analytics"); // Default to analytics for owners
                    } else {
                        setActiveTab("trips");
                    }
                } else {
                    setActiveTab(searchParams.get("tab") as Tab);
                }

                // Fetch data based on role
                if (profileData.role === "owner" || profileData.role === "hotel") {
                    const { data: listingsData } = await supabase
                        .from("listings")
                        .select("*")
                        .eq("owner_id", user.id)
                        .order("created_at", { ascending: false });
                    setListings((listingsData as Listing[]) || []);
                } else if (profileData.role === "tourist") {
                    // Fetch Bookings (Trips)
                    const { data: bookingsData } = await supabase
                        .from("bookings")
                        .select("*, listing:listings(*)")
                        .eq("tourist_id", user.id)
                        .order("created_at", { ascending: false });
                    setBookings((bookingsData as any) || []);

                    // Fetch Favorites
                    const { data: favData } = await supabase
                        .from("favorites")
                        .select("listing:listings(*)")
                        .eq("user_id", user.id)
                        .order("created_at", { ascending: false });

                    if (favData) {
                        setFavorites(favData.map((f: any) => f.listing));
                    }
                }
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const openAddDialog = () => {
        setEditingListing(null);
        setIsDialogOpen(true);
    };

    const openEditDialog = (listing: Listing) => {
        setEditingListing(listing);
        setIsDialogOpen(true);
    };

    const handleListingSuccess = () => {
        setIsDialogOpen(false);
        fetchData();
    };

    const onSubmitProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileSaving(true);
        if (!userId) return;

        const result = await updateProfile(userId, {
            full_name: profileForm.full_name,
            wilaya: profileForm.wilaya,
            phone: profileForm.phone,
            bio: profileForm.bio,
            avatar_url: profileForm.avatar_url,
        });

        if (result.error) {
            toast.error(result.error);
            setProfileSaving(false);
            return;
        }

        toast.success("Profile updated!");
        setProfileSaving(false);
        fetchData();
    };

    const handleDeleteListing = async (id: string) => {
        if (!confirm("Are you sure you want to delete this listing?")) return;

        const supabase = createClient();
        const { error } = await supabase.from("listings").delete().eq("id", id);

        if (error) {
            toast.error("Failed to delete listing");
        } else {
            toast.success("Listing deleted");
            fetchData();
        }
    };

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push(`/${locale}`);
    };

    const NavItem = ({ id, label, icon: Icon }: { id: Tab; label: string; icon: any }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all cursor-pointer",
                activeTab === id
                    ? "bg-brand text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
        >
            <Icon className="h-4 w-4" />
            {label}
        </button>
    );

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-brand" />
            </div>
        );
    }

    const role = profile?.role || "tourist";
    const isSpecialProvider = ["guide", "agency", "hotel", "merchant"].includes(role);

    return (
        <div className="flex min-h-screen bg-muted/10">
            {/* Sidebar Desktop */}
            <aside className="hidden w-64 flex-col gap-2 p-4 md:flex bg-background border-r">
                <div className="flex items-center px-2 py-4">

                    <span className="text-xl font-bold tracking-tight capitalize">
                        {t(`headers.${role}`)}
                    </span>
                </div>
                <nav className="flex flex-col gap-1">
                    {/* Role Specific Nav Items */}
                    {isSpecialProvider && (
                        <NavItem id="overview" label={t("overview")} icon={LayoutDashboard} />
                    )}

                    {role === "owner" && (
                        <>
                            <NavItem id="analytics" label={t("analytics")} icon={BarChart3} />
                            <NavItem id="listings" label={t("yourProperties")} icon={Building2} />
                        </>
                    )}

                    {role === "tourist" && (
                        <>
                            <NavItem id="trips" label={t("myTrips")} icon={LayoutDashboard} />
                            <NavItem id="purchases" label={t("purchases")} icon={ShoppingBag} />
                            <NavItem id="favorites" label={t("favorites")} icon={Heart} />
                        </>
                    )}

                    <NavItem id="profile" label={t("settings")} icon={Settings} />
                </nav>
                <div className="mt-auto pt-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                    >
                        <LogOut className="h-4 w-4" />
                        {t("nav.logout")}
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="flex h-16 items-center border-b bg-background px-4 md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="mr-2">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0">
                        <div className="flex items-center px-6 py-4 border-b">
                            <span className="text-lg font-bold capitalize">
                                {t(`headers.${role}`)}
                            </span>
                        </div>
                        <div className="p-4">
                            <nav className="flex flex-col gap-2">
                                {isSpecialProvider && (
                                    <NavItem id="overview" label={t("overview")} icon={LayoutDashboard} />
                                )}
                                {role === "owner" && (
                                    <>
                                        <NavItem id="analytics" label={t("analytics")} icon={BarChart3} />
                                        <NavItem id="listings" label={t("yourProperties")} icon={Building2} />
                                    </>
                                )}
                                {role === "tourist" && (
                                    <>
                                        <NavItem id="trips" label={t("myTrips")} icon={LayoutDashboard} />
                                        <NavItem id="purchases" label={t("purchases")} icon={ShoppingBag} />
                                        <NavItem id="favorites" label={t("favorites")} icon={Heart} />
                                    </>
                                )}
                                <NavItem id="profile" label={t("settings")} icon={Settings} />
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
                <h1 className="text-lg font-semibold capitalize">
                    {activeTab === "overview" && t(`headers.${role}`)}
                </h1>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-5xl space-y-8">

                    {/* Render Specialized Dashboards */}
                    {activeTab === "overview" && (
                        <>
                            {role === "guide" && <GuideDashboard />}
                            {role === "agency" && <AgencyDashboard />}
                            {role === "hotel" && <HotelDashboard />}
                            {role === "merchant" && <MerchantDashboard />}
                        </>
                    )}

                    {/* Owner Analytics */}
                    {activeTab === "analytics" && role === "owner" && (
                        <OwnerAnalytics />
                    )}

                    {/* Reuse Owner Listings View for "owner" role (legacy) */}
                    {activeTab === "listings" && role === "owner" && (
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">{t("yourProperties")}</h2>
                                    <p className="text-muted-foreground">{t("managePropertiesDesc") || "Manage your listings and view their status."}</p>
                                </div>
                                <Button onClick={openAddDialog} className="bg-brand text-white hover:bg-brand-light shadow-sm">
                                    <Plus className="mr-2 h-4 w-4" /> {t("addNew")}
                                </Button>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {listings.length === 0 ? (
                                    <Card className="col-span-full border-dashed p-12 text-center text-muted-foreground">
                                        <div className="flex justify-center mb-4">
                                            <div className="rounded-full bg-brand/10 p-4">
                                                <Home className="h-8 w-8 text-brand" />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-medium text-foreground">{t("noListings")}</h3>
                                        <p className="mb-6">{t("createFirstListing") || "Create your first listing to start hosting."}</p>
                                        <Button onClick={openAddDialog} className="bg-brand text-white">{t("createListing")}</Button>
                                    </Card>
                                ) : (
                                    listings.map((listing) => (
                                        <Card key={listing.id} className="group overflow-hidden transition-all hover:shadow-md">
                                            <div className="aspect-video w-full bg-muted relative">
                                                {listing.images && listing.images.length > 0 ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={listing.images[0]}
                                                        alt={listing.title}
                                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-muted-foreground">
                                                        <Building2 className="h-10 w-10 opacity-20" />
                                                    </div>
                                                )}
                                                <div className="absolute top-2 right-2 flex gap-1">
                                                    <span className="rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm capitalize">
                                                        {listing.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <CardHeader className="p-4">
                                                <CardTitle className="line-clamp-1 text-lg">{listing.title}</CardTitle>
                                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                    <MapPin className="mr-1 h-3 w-3" />
                                                    {getWilayaName(wilayas.find(w => w.slug === listing.wilaya) || wilayas[0], "en")}
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                                    {listing.description}
                                                </p>
                                                <p className="mt-2 font-semibold text-brand">
                                                    {listing.price_per_night} DZD <span className="text-muted-foreground font-normal text-xs">/ night</span>
                                                </p>
                                            </CardContent>
                                            <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openEditDialog(listing)}
                                                >
                                                    <Edit className="mr-2 h-3 w-3" /> {t("common.edit")}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDeleteListing(listing.id)}
                                                >
                                                    <Trash2 className="mr-2 h-3 w-3" /> {t("common.delete")}
                                                </Button>
                                                {listing.type === "restaurant" && (
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="col-span-2 mt-2 bg-brand/10 text-brand hover:bg-brand/20"
                                                        onClick={() => setSelectedListingForMenu(listing)}
                                                    >
                                                        <Utensils className="mr-2 h-3 w-3" /> {t("manageMenu")}
                                                    </Button>
                                                )}
                                            </CardFooter>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </>
                    )}

                    {/* Menu Manager Dialog */}
                    <Dialog open={!!selectedListingForMenu} onOpenChange={(open) => !open && setSelectedListingForMenu(null)}>
                        <DialogContent className="sm:max-w-[95vw] w-[1400px] max-h-[92vh] overflow-hidden p-0">
                            <DialogHeader className="px-6 pt-5 pb-4 border-b bg-muted/30">
                                <DialogTitle className="text-xl">Manage Menu: {selectedListingForMenu?.title}</DialogTitle>
                            </DialogHeader>
                            <div className="px-6 py-5 overflow-y-auto max-h-[calc(92vh-80px)]">
                                {selectedListingForMenu && <MenuManager listingId={selectedListingForMenu.id} />}
                            </div>
                        </DialogContent>
                    </Dialog>

                    {activeTab === "trips" && role === "tourist" && (
                        <>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">{t("myTrips")}</h2>
                                <p className="text-muted-foreground">{t("tripsDesc") || "Upcoming and past bookings."}</p>
                            </div>
                            <div className="grid gap-4">
                                {bookings.length === 0 ? (
                                    <div className="text-center py-12 border border-dashed rounded-lg">
                                        <p className="text-muted-foreground">{t("noTrips") || "No trips booked yet."}</p>
                                        <Link href={`/${locale}/search`}>
                                            <Button variant="link" className="mt-2 text-brand">{t("exploreDestinations") || "Explore Destinations"}</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    bookings.map((booking) => (
                                        <Card key={booking.id} className="flex flex-col sm:flex-row overflow-hidden">
                                            <div className="w-full sm:w-48 aspect-video sm:aspect-auto bg-muted">
                                                {booking.listing.images?.[0] && (
                                                    <img src={booking.listing.images[0]} className="w-full h-full object-cover" alt="" />
                                                )}
                                            </div>
                                            <div className="flex-1 p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{booking.listing.title}</h3>
                                                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                            <MapPin className="mr-1 h-3 w-3" />
                                                            {booking.listing.wilaya}
                                                        </div>
                                                    </div>
                                                    <Badge className={cn(
                                                        booking.status === "confirmed" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-700"
                                                    )}>
                                                        {booking.status}
                                                    </Badge>
                                                </div>
                                                <div className="mt-4 flex gap-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                                        <span>{booking.start_date} - {booking.end_date}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 font-medium">
                                                    Total: {booking.total_price} DZD
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </>
                    )}

                    {/* Tourist Purchases Tab (Simulated Receipts) */}
                    {activeTab === "purchases" && role === "tourist" && (
                        <>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">{t("purchaseHistory")}</h2>
                                <p className="text-muted-foreground">{t("purchaseHistoryDesc") || "Detailed receipts of your transactions."}</p>
                            </div>
                            <div className="space-y-4">
                                {bookings.length === 0 ? (
                                    <div className="text-center py-12 border border-dashed rounded-lg">
                                        <p className="text-muted-foreground">No purchases found.</p>
                                    </div>
                                ) : (
                                    bookings.map((booking) => (
                                        <Card key={booking.id} className="p-0 overflow-hidden">
                                            <div className="border-b bg-muted/40 p-4 flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center">
                                                        <Receipt className="h-5 w-5 text-brand" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Booking Payment</p>
                                                        <p className="text-xs text-muted-foreground">{new Date(booking.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                                                    Paid
                                                </Badge>
                                            </div>
                                            <div className="p-6 grid gap-6 md:grid-cols-2">
                                                <div className="space-y-4">
                                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t("itemDetails")}</h4>
                                                    <div className="flex items-start gap-4">
                                                        <div className="h-16 w-16 rounded bg-muted overflow-hidden flex-shrink-0">
                                                            {booking.listing.images?.[0] && (
                                                                <img src={booking.listing.images[0]} className="w-full h-full object-cover" alt="" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{booking.listing.title}</p>
                                                            <p className="text-sm text-muted-foreground">{booking.listing.address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t("paymentSummary")}</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Payment Method</span>
                                                            <span className="font-medium capitalize">{booking.payment_status || "Credit Card"}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Transaction ID</span>
                                                            <span className="font-mono text-xs text-muted-foreground">TRX-{booking.id.slice(0, 8).toUpperCase()}</span>
                                                        </div>
                                                        <div className="flex justify-between border-t pt-2 mt-2 font-bold text-base">
                                                            <span>{t("totalAmount")}</span>
                                                            <span>{booking.total_price.toLocaleString()} {t("common.dzd")}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === "favorites" && role === "tourist" && (
                        <>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">{t("favorites")}</h2>
                                <p className="text-muted-foreground">{t("favoritesDesc") || "Places you saved."}</p>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {favorites.length === 0 ? (
                                    <div className="col-span-full text-center py-12 border border-dashed rounded-lg">
                                        <p className="text-muted-foreground">{t("noFavorites")}</p>
                                    </div>
                                ) : (
                                    favorites.map((listing) => (
                                        <Card key={listing.id} className="group overflow-hidden transition-all hover:shadow-md">
                                            <div className="aspect-video w-full bg-muted relative">
                                                {listing.images?.[0] && (
                                                    <img src={listing.images[0]} className="w-full h-full object-cover" alt="" />
                                                )}
                                            </div>
                                            <CardHeader className="p-4">
                                                <CardTitle className="line-clamp-1">{listing.title}</CardTitle>
                                                <p className="text-sm text-muted-foreground">{listing.price_per_night} DZD / night</p>
                                            </CardHeader>
                                            <CardFooter className="p-4 pt-0">
                                                <Link href={`/${locale}/listing/${listing.id}`} className="w-full">
                                                    <Button variant="outline" className="w-full">{t("viewDetails")}</Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === "profile" && (
                        /* Profile Tab - Redesigned */
                        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
                            <div className="grid gap-6 md:grid-cols-[250px_1fr]">
                                <nav className="flex flex-col space-y-1">
                                    <Button
                                        variant={activeSettingsTab === "general" ? "secondary" : "ghost"}
                                        className="justify-start font-semibold"
                                        onClick={() => setActiveSettingsTab("general")}
                                    >
                                        {t("general")}
                                    </Button>
                                    <Button
                                        variant={activeSettingsTab === "security" ? "secondary" : "ghost"}
                                        className="justify-start font-semibold"
                                        onClick={() => setActiveSettingsTab("security")}
                                    >
                                        {t("security")}
                                    </Button>
                                    <Button
                                        variant={activeSettingsTab === "notifications" ? "secondary" : "ghost"}
                                        className="justify-start font-semibold"
                                        onClick={() => setActiveSettingsTab("notifications")}
                                    >
                                        {t("notifications")}
                                    </Button>
                                </nav>

                                <div className="space-y-6">
                                    {activeSettingsTab === "general" && (
                                        <Card className="border-none shadow-md overflow-hidden">
                                            <div className="h-32 bg-gradient-to-r from-brand/80 to-brand/40 relative">
                                                <div className="absolute -bottom-12 left-8">
                                                    <div className="h-24 w-24 rounded-full border-4 border-background overflow-hidden bg-background shadow-sm">
                                                        {profileForm.avatar_url ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img
                                                                src={profileForm.avatar_url}
                                                                alt="Avatar"
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-muted">
                                                                <UserCircle className="h-12 w-12 text-muted-foreground/40" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <CardHeader className="pt-16 pb-8 px-8">
                                                <CardTitle className="text-2xl">{t("personalInfo")}</CardTitle>
                                                <CardDescription>{t("personalInfoDesc") || "Manage your public profile and private details."}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="px-8 pb-8">
                                                <form onSubmit={onSubmitProfile} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                    <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
                                                        <div className="space-y-4 text-center lg:text-left">
                                                            <div className="flex flex-col gap-2">
                                                                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Profile Picture</Label>
                                                                <div className="mx-auto lg:mx-0">
                                                                    <ImageUpload
                                                                        value={profileForm.avatar_url ? [profileForm.avatar_url] : []}
                                                                        onChange={(urls) =>
                                                                            setProfileForm({ ...profileForm, avatar_url: urls[0] || "" })
                                                                        }
                                                                        maxFiles={1}
                                                                        bucketName="avatars"
                                                                        className="mt-0 w-full max-w-[200px]"
                                                                    />
                                                                </div>
                                                                <p className="text-[10px] text-muted-foreground">
                                                                    Max 5MB. Formats: JPG, PNG.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-6">
                                                            <div className="grid gap-6 md:grid-cols-2">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="full_name">Full Name</Label>
                                                                    <Input
                                                                        id="full_name"
                                                                        value={profileForm.full_name}
                                                                        onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                                                                        placeholder="e.g. Amine Benali"
                                                                        className="h-10"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="full_name">{t("auth.fullName")}</Label>
                                                                    <Select
                                                                        value={profileForm.wilaya}
                                                                        onValueChange={(val) => setProfileForm({ ...profileForm, wilaya: val })}
                                                                    >
                                                                        <SelectTrigger className="h-10">
                                                                            <SelectValue placeholder="Select your wilaya..." />
                                                                        </SelectTrigger>
                                                                        <SelectContent className="max-h-[250px]">
                                                                            {wilayas.map((w) => (
                                                                                <SelectItem key={w.code} value={w.slug}>
                                                                                    {w.code} - {getWilayaName(w, "en")}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="phone">{t("auth.phone") || "Phone Number"}</Label>
                                                                <Input
                                                                    id="phone"
                                                                    value={profileForm.phone}
                                                                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                                                    placeholder="+213 555 123 456"
                                                                    className="h-10"
                                                                />
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="bio">Bio</Label>
                                                                <Textarea
                                                                    id="bio"
                                                                    value={profileForm.bio}
                                                                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                                                                    placeholder="Tell the community about yourself..."
                                                                    rows={4}
                                                                    className="resize-none min-h-[100px]"
                                                                />
                                                            </div>

                                                            <div className="flex justify-end pt-4">
                                                                <Button type="submit" disabled={profileSaving} className="bg-brand text-white hover:bg-brand-light min-w-[150px] h-10 shadow-sm transition-all hover:shadow">
                                                                    {profileSaving ? (
                                                                        <>
                                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Save className="mr-2 h-4 w-4" /> {t("saveChanges")}
                                                                        </>
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {activeSettingsTab === "security" && (
                                        <Card className="border-none shadow-md">
                                            <CardHeader>
                                                <CardTitle>{t("security")}</CardTitle>
                                                <CardDescription>{t("securityDesc")}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-medium">{t("changePassword")}</h3>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="current-password">{t("currentPassword")}</Label>
                                                        <Input id="current-password" type="password" />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="new-password">{t("newPassword")}</Label>
                                                        <Input id="new-password" type="password" />
                                                    </div>
                                                    <Button>{t("updatePassword")}</Button>
                                                </div>
                                                <div className="pt-6 border-t">
                                                    <h3 className="text-lg font-medium text-destructive">{t("deleteAccount")}</h3>
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        {t("deleteAccountDesc")}
                                                    </p>
                                                    <Button variant="destructive">{t("deleteAccount")}</Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {activeSettingsTab === "notifications" && (
                                        <Card className="border-none shadow-md">
                                            <CardHeader>
                                                <CardTitle>{t("notifications")}</CardTitle>
                                                <CardDescription>{t("notificationsDesc")}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="flex items-center justify-between space-x-2">
                                                    <Label htmlFor="email-notifs" className="flex flex-col space-y-1">
                                                        <span>{t("emailNotifs")}</span>
                                                        <span className="font-normal text-xs text-muted-foreground">{t("emailNotifsDesc")}</span>
                                                    </Label>
                                                    <Switch id="email-notifs" defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between space-x-2">
                                                    <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                                                        <span>{t("marketingEmails")}</span>
                                                        <span className="font-normal text-xs text-muted-foreground">{t("marketingEmailsDesc")}</span>
                                                    </Label>
                                                    <Switch id="marketing-emails" />
                                                </div>
                                                <div className="flex items-center justify-between space-x-2">
                                                    <Label htmlFor="push-notifs" className="flex flex-col space-y-1">
                                                        <span>{t("pushNotifs")}</span>
                                                        <span className="font-normal text-xs text-muted-foreground">{t("pushNotifsDesc")}</span>
                                                    </Label>
                                                    <Switch id="push-notifs" defaultChecked />
                                                </div>
                                                <Button className="mt-4">{t("savePreferences")}</Button>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Placeholder for future settings */}
                                    <Card className="opacity-50 pointer-events-none">
                                        <CardHeader>
                                            <CardTitle>Notifications (Coming Soon)</CardTitle>
                                            <CardDescription>Manage your email and push notifications.</CardDescription>
                                        </CardHeader>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Listing Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[1000px] md:max-w-[1200px]">
                    <DialogHeader>
                        <DialogTitle>{editingListing ? "Edit Listing" : "Create New Listing"}</DialogTitle>
                        <DialogDescription>
                            {editingListing ? "Update your property details below." : "Fill in the details to publish your property."}
                        </DialogDescription>
                    </DialogHeader>
                    {isDialogOpen && userId && (
                        <ListingForm
                            userId={userId}
                            initialData={editingListing}
                            onSuccess={handleListingSuccess}
                            onCancel={() => setIsDialogOpen(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div >
    );
}


