"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Edit, Utensils, Coffee, IceCream, Sandwich, Search, ChevronDown, ChevronRight, Eye, EyeOff, Package, DollarSign, Grid3X3, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ImageUpload } from "@/components/image-upload";
import { useTranslations } from "next-intl";

interface Menu {
    id: string;
    listing_id: string;
    title: string;
    is_active: boolean;
    created_at: string;
}

interface MenuItem {
    id: string;
    menu_id: string;
    name: string;
    description: string | null;
    price: number;
    category: string;
    image_url: string | null;
    is_available: boolean;
}

interface MenuManagerProps {
    listingId: string;
}

export function MenuManager({ listingId }: MenuManagerProps) {
    const t = useTranslations("dashboard.menuManager");
    const tCommon = useTranslations("common");
    const [menus, setMenus] = useState<Menu[]>([]);
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const CATEGORIES = [
        { value: "appetizer", label: t("categories.appetizer"), icon: Sandwich, color: "text-amber-600 bg-amber-50" },
        { value: "main", label: t("categories.main"), icon: Utensils, color: "text-red-600 bg-red-50" },
        { value: "dessert", label: t("categories.dessert"), icon: IceCream, color: "text-pink-600 bg-pink-50" },
        { value: "drink", label: t("categories.drink"), icon: Coffee, color: "text-blue-600 bg-blue-50" },
        { value: "other", label: t("categories.other"), icon: Package, color: "text-gray-600 bg-gray-50" },
    ];

    const getCategoryInfo = (cat: string) =>
        CATEGORIES.find((c) => c.value === cat) || CATEGORIES[CATEGORIES.length - 1];

    // Dialog states
    const [menuDialogOpen, setMenuDialogOpen] = useState(false);
    const [itemDialogOpen, setItemDialogOpen] = useState(false);
    const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

    // Form states
    const [menuTitle, setMenuTitle] = useState("");
    const [itemForm, setItemForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "main",
        image_url: "",
        is_available: true,
    });

    // UI states
    const [searchQuery, setSearchQuery] = useState("");
    const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
    const [saving, setSaving] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        fetchMenus();
    }, [listingId]);

    useEffect(() => {
        if (activeMenuId) fetchItems(activeMenuId);
    }, [activeMenuId]);

    const fetchMenus = async () => {
        setLoading(true);
        const { data } = await supabase
            .from("menus")
            .select("*")
            .eq("listing_id", listingId)
            .order("created_at", { ascending: true });
        const menuList = (data as Menu[]) || [];
        setMenus(menuList);
        if (menuList.length > 0 && !activeMenuId) {
            setActiveMenuId(menuList[0].id);
        }
        setLoading(false);
    };

    const fetchItems = async (menuId: string) => {
        const { data } = await supabase
            .from("menu_items")
            .select("*")
            .eq("menu_id", menuId)
            .order("category", { ascending: true })
            .order("name", { ascending: true });
        setItems((data as MenuItem[]) || []);
    };

    // --- Menu CRUD ---
    const handleSaveMenu = async () => {
        if (!menuTitle.trim()) return;
        setSaving(true);
        if (editingMenu) {
            await supabase.from("menus").update({ title: menuTitle }).eq("id", editingMenu.id);
            toast.success(t("toasts.menuUpdated"));
        } else {
            const { data } = await supabase
                .from("menus")
                .insert({ listing_id: listingId, title: menuTitle, is_active: true })
                .select()
                .single();
            if (data) setActiveMenuId(data.id);
            toast.success(t("toasts.menuCreated"));
        }
        setSaving(false);
        setMenuDialogOpen(false);
        setMenuTitle("");
        setEditingMenu(null);
        fetchMenus();
    };

    const toggleMenuActive = async (menu: Menu) => {
        await supabase.from("menus").update({ is_active: !menu.is_active }).eq("id", menu.id);
        fetchMenus();
    };

    const deleteMenu = async (id: string) => {
        if (!confirm(t("confirms.deleteMenu"))) return;
        await supabase.from("menu_items").delete().eq("menu_id", id);
        await supabase.from("menus").delete().eq("id", id);
        if (activeMenuId === id) setActiveMenuId(null);
        toast.success(t("toasts.menuDeleted"));
        fetchMenus();
    };

    // --- Item CRUD ---
    const openAddItem = () => {
        setEditingItem(null);
        setItemForm({ name: "", description: "", price: "", category: "main", image_url: "", is_available: true });
        setItemDialogOpen(true);
    };

    const openEditItem = (item: MenuItem) => {
        setEditingItem(item);
        setItemForm({
            name: item.name,
            description: item.description || "",
            price: item.price.toString(),
            category: item.category || "main",
            image_url: item.image_url || "",
            is_available: item.is_available,
        });
        setItemDialogOpen(true);
    };

    const handleSaveItem = async () => {
        if (!itemForm.name.trim() || !itemForm.price) return;
        if (!activeMenuId) return;
        setSaving(true);

        const payload = {
            menu_id: activeMenuId,
            name: itemForm.name.trim(),
            description: itemForm.description.trim() || null,
            price: parseFloat(itemForm.price),
            category: itemForm.category,
            image_url: itemForm.image_url || null,
            is_available: itemForm.is_available,
        };

        if (editingItem) {
            await supabase.from("menu_items").update(payload).eq("id", editingItem.id);
            toast.success(t("toasts.itemUpdated"));
        } else {
            await supabase.from("menu_items").insert(payload);
            toast.success(t("toasts.itemAdded"));
        }

        setSaving(false);
        setItemDialogOpen(false);
        fetchItems(activeMenuId);
    };

    const deleteItem = async (id: string) => {
        if (!confirm(t("confirms.deleteItem"))) return;
        await supabase.from("menu_items").delete().eq("id", id);
        if (activeMenuId) fetchItems(activeMenuId);
        toast.success(t("toasts.itemRemoved"));
    };

    const toggleItemAvailability = async (item: MenuItem) => {
        await supabase.from("menu_items").update({ is_available: !item.is_available }).eq("id", item.id);
        if (activeMenuId) fetchItems(activeMenuId);
    };

    // --- Derived ---
    const activeMenu = menus.find((m) => m.id === activeMenuId);
    const filteredItems = items.filter((item) =>
        !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedItems = filteredItems.reduce((acc, item) => {
        const cat = item.category || "other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {} as Record<string, MenuItem[]>);

    const stats = {
        total: items.length,
        available: items.filter((i) => i.is_available).length,
        unavailable: items.filter((i) => !i.is_available).length,
        priceRange: items.length > 0 ? { min: Math.min(...items.map((i) => i.price)), max: Math.max(...items.map((i) => i.price)) } : null,
    };

    const toggleCategory = (cat: string) => {
        const next = new Set(collapsedCategories);
        if (next.has(cat)) next.delete(cat);
        else next.add(cat);
        setCollapsedCategories(next);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-brand" />
            </div>
        );
    }

    return (
        <div className="space-y-5 overflow-hidden">
            {/* Header + Stats */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-brand" />
                        {t("title")}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">{t("desc")}</p>
                </div>
                <Button onClick={() => { setEditingMenu(null); setMenuTitle(""); setMenuDialogOpen(true); }} className="bg-brand text-white hover:bg-brand/90">
                    <Plus className="mr-2 h-4 w-4" /> {t("newMenu")}
                </Button>
            </div>

            {/* Layout: Sidebar + Content */}
            <div className="flex gap-5 min-h-[400px]">
                {/* Menu Sidebar */}
                <div className="w-52 shrink-0 space-y-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">{t("yourMenus")} ({menus.length})</h3>
                    {menus.length === 0 ? (
                        <div className="rounded-xl border-2 border-dashed p-6 text-center">
                            <Utensils className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">{t("noMenus")}</p>
                            <Button size="sm" variant="outline" className="mt-3" onClick={() => { setEditingMenu(null); setMenuTitle(""); setMenuDialogOpen(true); }}>
                                {t("createFirstMenu")}
                            </Button>
                        </div>
                    ) : (
                        menus.map((menu) => (
                            <div
                                key={menu.id}
                                className={cn(
                                    "group rounded-xl border p-4 cursor-pointer transition-all",
                                    activeMenuId === menu.id
                                        ? "border-brand bg-brand/5 shadow-sm"
                                        : "border-border hover:border-brand/30 hover:bg-muted/30"
                                )}
                                onClick={() => setActiveMenuId(menu.id)}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm truncate">{menu.title}</h4>
                                        <span className={cn("inline-flex items-center gap-1 mt-1 text-xs font-medium rounded-full px-2 py-0.5", menu.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500")}>
                                            {menu.is_active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                                            {menu.is_active ? t("available") : t("unavailable")}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); setEditingMenu(menu); setMenuTitle(menu.title); setMenuDialogOpen(true); }}>
                                        <Edit className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); toggleMenuActive(menu); }}>
                                        {menu.is_active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={(e) => { e.stopPropagation(); deleteMenu(menu.id); }}>
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0 overflow-hidden">
                    {!activeMenu ? (
                        <div className="flex flex-col items-center justify-center h-full rounded-xl border-2 border-dashed p-12 text-center">
                            <Grid3X3 className="h-12 w-12 text-muted-foreground/20 mb-4" />
                            <h3 className="text-lg font-medium">{t("searchPlaceholder")}</h3>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {/* Stats Bar */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-4 rounded-xl border bg-card px-4 py-3">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">{stats.total}</p>
                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t("items")}</p>
                                    </div>
                                    <Separator orientation="vertical" className="h-8" />
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-green-600">{stats.available}</p>
                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t("available")}</p>
                                    </div>
                                    <Separator orientation="vertical" className="h-8" />
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-red-500">{stats.unavailable}</p>
                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t("unavailable")}</p>
                                    </div>
                                    {stats.priceRange && (
                                        <>
                                            <Separator orientation="vertical" className="h-8" />
                                            <div className="text-center">
                                                <p className="text-sm font-bold">
                                                    <DollarSign className="h-3.5 w-3.5 inline -mt-0.5" />
                                                    {stats.priceRange.min}–{stats.priceRange.max} DA
                                                </p>
                                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{t("priceRange")}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="flex-1" />
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder={t("searchPlaceholder")}
                                        className="pl-9 w-56"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Button onClick={openAddItem} className="bg-brand text-white hover:bg-brand/90">
                                    <Plus className="mr-2 h-4 w-4" /> {t("addItem")}
                                </Button>
                            </div>

                            {/* Items Grid by Category */}
                            {Object.keys(groupedItems).length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-16 text-center">
                                    <Utensils className="h-12 w-12 text-muted-foreground/20 mb-3" />
                                    <h3 className="text-lg font-medium">No items yet.</h3>
                                    <Button onClick={openAddItem} className="mt-4 bg-brand text-white">
                                        <Plus className="mr-2 h-4 w-4" /> {t("addItem")}
                                    </Button>
                                </div>
                            ) : (
                                Object.entries(groupedItems).map(([category, catItems]) => {
                                    const info = getCategoryInfo(category);
                                    const Icon = info.icon;
                                    const isCollapsed = collapsedCategories.has(category);

                                    return (
                                        <div key={category} className="space-y-3">
                                            <button
                                                className="flex items-center gap-2 w-full group"
                                                onClick={() => toggleCategory(category)}
                                            >
                                                <div className={cn("rounded-lg p-1.5", info.color)}>
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <h3 className="font-semibold text-sm">{info.label}</h3>
                                                <span className="text-xs text-muted-foreground">({catItems.length})</span>
                                                <div className="flex-1" />
                                                {isCollapsed ? <ChevronRight className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                                            </button>

                                            {!isCollapsed && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                                    {catItems.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className={cn(
                                                                "group/card rounded-xl border overflow-hidden transition-all hover:shadow-md",
                                                                !item.is_available && "opacity-60"
                                                            )}
                                                        >
                                                            {/* Food Image */}
                                                            <div className="relative aspect-[16/10] bg-muted">
                                                                {item.image_url ? (
                                                                    <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                                                                ) : (
                                                                    <div className="h-full w-full flex items-center justify-center">
                                                                        <Utensils className="h-10 w-10 text-muted-foreground/15" />
                                                                    </div>
                                                                )}
                                                                {/* Price Badge */}
                                                                <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                                                                    <span className="font-bold text-sm text-brand">{item.price.toLocaleString()} DA</span>
                                                                </div>
                                                                {/* Availability Indicator */}
                                                                {!item.is_available && (
                                                                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                                                                        <span className="bg-red-100 text-red-700 text-xs font-semibold rounded-full px-3 py-1">{t("unavailable")}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {/* Item Details */}
                                                            <div className="p-4">
                                                                <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                                                                {item.description && (
                                                                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                                                                )}
                                                                {/* Actions */}
                                                                <div className="flex items-center gap-1 mt-3 pt-3 border-t">
                                                                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => openEditItem(item)}>
                                                                        <Edit className="h-3 w-3" /> {tCommon("edit")}
                                                                    </Button>
                                                                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => toggleItemAvailability(item)}>
                                                                        {item.is_available ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                                                        {item.is_available ? "Hide" : "Show"}
                                                                    </Button>
                                                                    <div className="flex-1" />
                                                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => deleteItem(item.id)}>
                                                                        <Trash2 className="h-3.5 w-3.5" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Menu Create/Edit Dialog */}
            <Dialog open={menuDialogOpen} onOpenChange={setMenuDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingMenu ? t("dialogs.editMenu") : t("dialogs.createMenu")}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label>{t("dialogs.menuName")}</Label>
                            <Input
                                placeholder={t("dialogs.menuPlaceholder")}
                                value={menuTitle}
                                onChange={(e) => setMenuTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" onClick={() => setMenuDialogOpen(false)}>{tCommon("cancel")}</Button>
                            <Button className="bg-brand text-white" onClick={handleSaveMenu} disabled={saving || !menuTitle.trim()}>
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {editingMenu ? tCommon("save") : tCommon("save")}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Item Create/Edit Dialog */}
            <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? t("dialogs.editItem") : t("dialogs.addItem")}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-2">
                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label>{t("dialogs.itemPhoto")}</Label>
                            <ImageUpload
                                value={itemForm.image_url ? [itemForm.image_url] : []}
                                onChange={(urls) => setItemForm({ ...itemForm, image_url: urls[0] || "" })}
                                maxFiles={1}
                                bucketName="listing-images"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>{t("dialogs.itemName")} *</Label>
                                <Input
                                    placeholder={t("dialogs.itemName")}
                                    value={itemForm.name}
                                    onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{t("dialogs.itemPrice")} *</Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={itemForm.price}
                                    onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>{t("dialogs.itemCategory")}</Label>
                            <Select value={itemForm.category} onValueChange={(v) => setItemForm({ ...itemForm, category: v })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map((c) => (
                                        <SelectItem key={c.value} value={c.value}>
                                            <span className="flex items-center gap-2">
                                                <c.icon className="h-4 w-4" />
                                                {c.label}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>{t("dialogs.itemDesc")}</Label>
                            <Textarea
                                placeholder={t("dialogs.itemDescPlaceholder")}
                                value={itemForm.description}
                                onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                                rows={2}
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-3 bg-muted/30">
                            <div>
                                <Label className="text-sm font-medium">{t("dialogs.availableSwitch")}</Label>
                                <p className="text-xs text-muted-foreground">{t("dialogs.availableDesc")}</p>
                            </div>
                            <Switch
                                checked={itemForm.is_available}
                                onCheckedChange={(val: boolean) => setItemForm({ ...itemForm, is_available: val })}
                            />
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                            <Button variant="outline" onClick={() => setItemDialogOpen(false)}>{tCommon("cancel")}</Button>
                            <Button className="bg-brand text-white" onClick={handleSaveItem} disabled={saving || !itemForm.name.trim() || !itemForm.price}>
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {editingItem ? t("dialogs.editItem") : t("dialogs.addItem")}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
