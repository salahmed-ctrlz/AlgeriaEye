import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// 1. Load Environment Variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const envVars: Record<string, string> = {};

envContent.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
        envVars[key.trim()] = value.trim();
    }
});

const SUPABASE_URL = envVars["NEXT_PUBLIC_SUPABASE_URL"];
const SERVICE_KEY = envVars["SUPABASE_SERVICE_ROLE_KEY"];

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
}

// Use Service Role Key to access auth.users
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

// 2. Data Definitions (CONSTANTINE)
const CONSTANTINE_DATA = [
    // --- HOTELS ---
    {
        email: "contact@constantine-marriott.dz", // Placeholder email based on doc
        title: "Constantine Marriott Hotel",
        type: "Hotel",
        price: 28000,
        wilaya: "Constantine",
        address: "Oued Rhumel Street, Cité des Arcades Romaines, Constantine",
        description: "A 5-star luxury hotel combining modern elegance with Algerian hospitality. Features the Saray Spa, indoor/outdoor pools, and panoramic views of the city and Rhumel valley.",
        image_keyword: "luxury hotel interior swimming pool"
    },
    {
        email: "contact@novotel-constantine.dz",
        title: "Novotel Constantine",
        type: "Hotel",
        price: 14000,
        wilaya: "Constantine",
        address: "1 Square Hadj Ali, Constantine",
        description: "Located in the heart of the city with panoramic views of the Rhumel Gorge. Features the 'Gourmet Bar', a fitness center, and modern comfortable rooms.",
        image_keyword: "modern hotel exterior night"
    },
    {
        email: "contact@ibis-constantine.dz",
        title: "ibis Constantine",
        type: "Hotel",
        price: 8000,
        wilaya: "Constantine",
        address: "2 Square Hadj Ali, Constantine",
        description: "A modern 3-star hotel located centrally near the suspension bridges. Features the 'Kitchen' restaurant serving Mediterranean cuisine and a comfortable lounge bar.",
        image_keyword: "ibis hotel bedroom standard"
    },

    // --- RESTAURANTS ---
    {
        email: "hello@laconcorde.dz",
        title: "Restaurant La Concorde",
        type: "Restaurant",
        price: 1500,
        wilaya: "Constantine",
        address: "Abane Ramdane St, Constantine",
        description: "A traditional Algerian restaurant in the heart of the city. Famous for authentic dishes like Couscous, Chakhchoukha, and Grilled Meats in a warm, popular atmosphere.",
        image_keyword: "traditional algerian food couscous"
    },
    {
        email: "info@scodella.dz",
        title: "Scodella Restaurant",
        type: "Restaurant",
        price: 2500,
        wilaya: "Constantine",
        address: "Constantine City Center",
        description: "Top-rated modern restaurant offering a mix of Mediterranean and local cuisine. Known for its warm decor, excellent service, and family-friendly vibe.",
        image_keyword: "modern restaurant dining table"
    },
    {
        email: "hello@meetandeat.dz",
        title: "Meet and Eat",
        type: "Restaurant",
        price: 1000,
        wilaya: "Constantine",
        address: "48 Rue Benmeliek Abderrahmane, Constantine",
        description: "A trendy urban spot for fast food and casual dining. Serves high-quality burgers, pizza, and quick meals in a vibrant, youthful setting.",
        image_keyword: "burger fast food restaurant interior"
    }
];

function getMenuImagesForRestaurant(restaurantTitle: string) {
    const title = restaurantTitle.toLowerCase();

    // Helper to check if a local image exists in the "needed images" folder
    // Returns the relative path if found, or the fallback Unsplash URL
    const getImg = (filenamePart: string, fallbackUrl: string) => {
        try {
            const dirPath = path.join(process.cwd(), "public", "images", "Constantine", "needed images");
            if (fs.existsSync(dirPath)) {
                // Find file that starts with or contains the filenamePart
                const files = fs.readdirSync(dirPath);
                const match = files.find(f =>
                    f.toLowerCase().includes(filenamePart.toLowerCase()) &&
                    /\.(jpg|jpeg|png|webp|avif|jfif)$/i.test(f)
                );

                if (match) {
                    return `/images/Constantine/needed images/${match}`.replace(/\\/g, "/");
                }
            }
        } catch (e) {
            // ignore
        }
        return fallbackUrl;
    };

    // 1. FAST FOOD / URBAN (Meet and Eat)
    if (title.includes('meet') || title.includes('eat')) {
        return [
            { name: "Classic Cheese Burger", price: 800, img: getImg("Classic Cheese Burger", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600"), category: "Burgers" },
            { name: "Crispy Chicken Pizza", price: 1000, img: getImg("Crispy Chicken Pizza", "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600"), category: "Pizza" },
            { name: "Loaded Fries", price: 400, img: getImg("Loaded Fries", "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?auto=format&fit=crop&w=600"), category: "Sides" },
            { name: "Mojito Lemon", price: 250, img: getImg("Mojito Lemon", "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600"), category: "Drinks" }
        ];
    }

    // 2. TRADITIONAL (La Concorde)
    if (title.includes('concorde')) {
        return [
            { name: "Constantine Chakhchoukha", price: 1200, img: getImg("Constantine Chakhchoukha", "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600"), category: "Mains" },
            { name: "Lamb Couscous", price: 1500, img: getImg("Lamb Couscous", "https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&w=600"), category: "Mains" },
            { name: "Chorba Frik", price: 500, img: getImg("Chorba Frik", "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600"), category: "Starters" },
            { name: "Grilled Mix (Merguez)", price: 1800, img: getImg("Grilled Mix", "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600"), category: "Mains" }
        ];
    }

    // 3. MODERN / MEDITERRANEAN (Scodella, Hotel Restaurants)
    if (title.includes('scodella') || title.includes('kitchen') || title.includes('gourmet')) {
        return [
            { name: "Grilled Steak au Poivre", price: 2800, img: getImg("Grilled Steak", "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600"), category: "Mains" },
            { name: "Seafood Pasta", price: 2200, img: getImg("Seafood Pasta", "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600"), category: "Mains" },
            { name: "Caesar Salad", price: 900, img: getImg("Caesar Salad", "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600"), category: "Starters" },
            { name: "Chocolate Fondant", price: 800, img: getImg("Chocolate Fondant", "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=600"), category: "Desserts" }
        ];
    }

    // Default Fallback
    return [
        { name: "Club Sandwich", price: 1200, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600", category: "Mains" },
        { name: "Algerian Coffee", price: 200, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600", category: "Drinks" }
    ];
}

const HOTEL_AMENITIES = ["WiFi", "Pool", "Spa", "Gym", "Parking", "Restaurant", "Bar", "Room Service", "AC", "Concierge", "City View"];
const RESTAURANT_AMENITIES = ["WiFi", "Terrace", "AC", "Reservations", "Credit Cards", "Halal", "Family Friendly", "Parking"];

function getRandomAmenities(type: string) {
    const source = type.toLowerCase() === "hotel" ? HOTEL_AMENITIES : RESTAURANT_AMENITIES;
    const shuffled = source.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 4) + 3);
}

// Map listing titles to folder names if you have local images
const LOCAL_IMAGE_MAP: Record<string, string> = {
    // Add specific mappings if you upload local folders later
};

function getLocalImages(title: string): string[] | null {
    const items: string[] = [];

    // Fuzzy match in "needed images" directory (Assuming user adds files there)
    try {
        const flatDirPath = path.join(process.cwd(), "public", "images", "Constantine", "needed images");
        if (fs.existsSync(flatDirPath)) {
            const files = fs.readdirSync(flatDirPath).filter(f => !f.startsWith(".") && /\.(jpg|jpeg|png|webp|avif|jfif)$/i.test(f));

            // Normalize title for matching: remove "Restaurant", "Hotel" to get core name
            const coreName = title.replace(/Restaurant|Hotel/gi, "").trim().toLowerCase();
            const fullTitle = title.toLowerCase();

            files.forEach(f => {
                const lowerF = f.toLowerCase();
                if (lowerF.includes(coreName) || lowerF.includes(fullTitle)) {
                    const relativePath = `/images/Constantine/needed images/${f}`.replace(/\\/g, "/");
                    items.push(relativePath);
                }
            });
        }
    } catch (e) {
        // console.warn(`Could not read needed images for ${title}:`, e);
    }

    return items.length > 0 ? items : null;
}

const VIBES = ["Casual", "Fancy", "Traditional", "Romantic", "Business"];

function getRestaurantTags(title: string) {
    const tags: string[] = [];
    if (title.includes("Concorde")) tags.push("Traditional");
    else if (title.includes("Meet")) tags.push("Fast Food");
    else tags.push("Modern");

    // Add correct cuisine tag if missing from name detection
    if (title.includes("Scodella")) tags.push("Italian"); // Based on menu items (Steak, Pasta)

    const vibe = VIBES[Math.floor(Math.random() * VIBES.length)];
    tags.push(vibe);
    return tags;
}

async function seedContent() {
    console.log("🌱 Starting Constantine Seeding (Listings & Menus)...");

    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();

    if (usersError) {
        console.error("Error fetching users:", usersError.message);
        return;
    }

    console.log(`- Found ${users.length} total users.`);

    for (const data of CONSTANTINE_DATA) {
        console.log(`Processing: ${data.title}`);

        // 1. Check if user exists, if not Create one
        const user = users.find(u => u.email === data.email);
        let ownerId = user?.id;

        if (!user) {
            console.log(`- Creating new Owner for ${data.title}...`);
            const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
                email: data.email,
                password: "password123",
                email_confirm: true,
                user_metadata: {
                    full_name: data.title + " Owner",
                    role: "owner",
                    wilaya: "constantine",
                    business_type: data.type.toLowerCase()
                }
            });

            if (createError) {
                console.error(`❌ Failed to create user ${data.email}:`, createError.message);
                continue;
            }
            ownerId = newUser.user?.id;
        }

        if (!ownerId) continue;

        // 2. Create/Update Profile
        await supabase.from("profiles").upsert({
            id: ownerId,
            role: "owner",
            full_name: data.title + " Owner",
            wilaya: "constantine"
        });

        // 3. Create Listing
        const localImages = getLocalImages(data.title);
        const imagesToUse = localImages && localImages.length > 0
            ? localImages
            : [`https://source.unsplash.com/800x600/?${encodeURIComponent(data.image_keyword)}`];

        let finalAmenities = getRandomAmenities(data.type);
        if (data.type.toLowerCase() === "restaurant") {
            const tags = getRestaurantTags(data.title);
            finalAmenities = [...finalAmenities, ...tags];
        }

        // Upsert Listing based on Title + Owner
        // First try to find it
        const { data: existingListing } = await supabase
            .from("listings")
            .select("id")
            .eq("owner_id", ownerId)
            .eq("title", data.title)
            .maybeSingle();

        let listingId = existingListing?.id;

        if (!existingListing) {
            const { data: newListing, error: listingError } = await supabase
                .from("listings")
                .insert({
                    owner_id: ownerId,
                    title: data.title,
                    description: data.description,
                    type: data.type.toLowerCase(),
                    wilaya: "constantine",
                    address: data.address,
                    price_per_night: data.price,
                    images: imagesToUse,
                    amenities: finalAmenities,
                    is_featured: true
                })
                .select("id")
                .single();

            if (listingError) {
                console.error(`❌ Error creating listing ${data.title}:`, listingError.message);
                continue;
            }
            listingId = newListing.id;
        } else {
            console.log(`- Listing exists (Updating Images & Amenities): ${data.title}`);
            await supabase.from("listings")
                .update({
                    amenities: finalAmenities, // Update random amenities + tags
                    images: imagesToUse // Update images if new ones found
                })
                .eq("id", existingListing.id);
            listingId = existingListing.id;
        }

        // 4. Generate Menus (Restaurants Only)
        if (data.type.toLowerCase() === "restaurant" && listingId) {
            const { data: existingMenu } = await supabase
                .from("menus")
                .select("id")
                .eq("listing_id", listingId)
                .maybeSingle();

            let menuId = existingMenu?.id;

            if (!menuId) {
                const { data: newMenu } = await supabase
                    .from("menus")
                    .insert({
                        listing_id: listingId,
                        title: "Main Menu",
                        description: "Our Specialties",
                        is_active: true
                    })
                    .select("id")
                    .single();
                menuId = newMenu?.id;
            }

            if (menuId) {
                const menuItems = getMenuImagesForRestaurant(data.title);
                // Clean old items to avoid duplicates
                await supabase.from("menu_items").delete().eq("menu_id", menuId);

                for (const item of menuItems) {
                    await supabase.from("menu_items").insert({
                        menu_id: menuId,
                        name: item.name,
                        price: item.price,
                        image_url: item.img,
                        category: item.category,
                        description: "Authentic taste.",
                        is_available: true
                    });
                }
                console.log(`- Added ${menuItems.length} menu items.`);
            }
        }
    }
    console.log("✅ Constantine Seeding Complete!");
}

seedContent();
