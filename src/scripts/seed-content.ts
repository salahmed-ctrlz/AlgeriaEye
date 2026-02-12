
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

// 2. Data Definitions
const ALGIERS_DATA = [
    // --- HOTELS ---
    {
        email: "contact@sofitel-algiers.dz",
        title: "Sofitel Algiers Hamma Garden",
        type: "Hotel",
        price: 28000,
        wilaya: "Algiers",
        address: "172 Rue Hassiba Ben Bouali, Algiers",
        description: "Located in the heart of Algiers near the Hamma Garden. A blend of French luxury and Algerian hospitality. Features 309 rooms, 3 restaurants, and a swimming pool.",
        image_keyword: "luxury hotel bedroom",
        lat: 36.7533,
        lng: 3.0645
    },
    {
        email: "info@hyatt-algiers.dz",
        title: "Hyatt Regency Algiers Airport",
        type: "Hotel",
        price: 24000,
        wilaya: "Algiers",
        address: "Houari Boumediene Airport, Dar El Beida",
        description: "The only hotel directly connected to the airport terminal. Modern design, perfect for business travelers, with soundproof windows and premium amenities.",
        image_keyword: "modern hotel lobby airport",
        lat: 36.6994,
        lng: 3.2201
    },
    {
        email: "booking@elaurassi.dz",
        title: "El Aurassi Hotel",
        type: "Hotel",
        price: 26000,
        wilaya: "Algiers",
        address: "2 Bd Frantz Fanon, Les Tagarins",
        description: "Known as the 'Hotel of the Bay', offering a panoramic view of the Mediterranean. Features massive gardens, a large outdoor pool, and 4 restaurants.",
        image_keyword: "hotel balcony sea view",
        lat: 36.7735,
        lng: 3.0520
    },
    {
        email: "reservations@lamaraz.dz",
        title: "Lamaraz Arts Hotel",
        type: "Hotel",
        price: 18000,
        wilaya: "Algiers",
        address: "Kouba, Algiers",
        description: "A luxury 4-star art hotel in Kouba combining modern elegance with artistic touches. Features a spa, lounge with bay views, and highly rated service.",
        image_keyword: "boutique hotel interior",
        lat: 36.7268,
        lng: 3.0872
    },
    {
        email: "contact@holidayinn-algiers.dz",
        title: "Holiday Inn Algiers - Cheraga Tower",
        type: "Hotel",
        price: 21000,
        wilaya: "Algiers",
        address: "Bois des Cars, Dely Ibrahim / Cheraga",
        description: "One of the tallest hotels in Algiers offering breathtaking views. Known for its 'Le 101' restaurant on the top floor.",
        image_keyword: "skyscraper hotel luxury",
        lat: 36.7583,
        lng: 2.9529
    },

    // --- RESTAURANTS (Traditional) ---
    {
        email: "hello@darlahlou.dz",
        title: "Dar Lahlou",
        type: "Restaurant",
        price: 2500,
        wilaya: "Algiers",
        address: "Mohammadia (Near SAFEX), Algiers",
        description: "Authentic Algerian cuisine in a decor that evokes the old era. Famous for generous portions of Couscous, Chakhchoukha, and Harira.",
        image_keyword: "couscous traditional algerian food",
        lat: 36.7360,
        lng: 3.1650
    },
    {
        email: "contact@darzellige.dz",
        title: "Dar Zellige",
        type: "Restaurant",
        price: 4000,
        wilaya: "Algiers",
        address: "Djenane El Malik, Hydra",
        description: "An upscale dining experience in Hydra named after its beautiful Zellige tile decor. Offers roast lamb, tajines, and a serene atmosphere around a pool.",
        image_keyword: "moroccan tajine luxury dining",
        lat: 36.7500,
        lng: 3.0400
    },
    {
        email: "info@elwalima.dz",
        title: "Restaurant El Walima",
        type: "Restaurant",
        price: 2000,
        wilaya: "Algiers",
        address: "22 Rue Ahmed Zabana, Sidi M'Hamed",
        description: "A warm, family-friendly spot serving authentic Maghrebi dishes like Tajine and Grilled Fish. Located near the Bardo Museum.",
        image_keyword: "family dinner table food",
        lat: 36.7640,
        lng: 3.0500
    },
    {
        email: "salam@daryemma.dz",
        title: "Dar Yemma Casbah",
        type: "Restaurant",
        price: 1500,
        wilaya: "Algiers",
        address: "6 Rue Larbi Triki, Casbah",
        description: "Located deep inside the historic Casbah. A perfect stop for tourists to try Rechta and Dolma in a traditional Ottoman-style house.",
        image_keyword: "casbah algiers traditional food",
        lat: 36.7845,
        lng: 3.0585
    },
    {
        email: "contact@lagrotte.dz",
        title: "La Grotte des Saveurs",
        type: "Restaurant",
        price: 3000,
        wilaya: "Algiers",
        address: "Alger Centre (Near Dr Ch. Saadane St)",
        description: "A unique dining experience inside a man-made cave. Famous for their grilled meats, Paella, and cozy, mysterious atmosphere.",
        image_keyword: "cave restaurant interior candle light",
        lat: 36.7720,
        lng: 3.0580
    },
    {
        email: "info@sapori-casbah.dz",
        title: "Sapori",
        type: "Restaurant",
        price: 2200,
        wilaya: "Algiers",
        address: "20 Rpe Chasse Loup Laudat, Casbah",
        description: "A hidden gem in the Casbah serving a mix of Mediterranean and Algerian classics. Great for a quiet lunch after exploring.",
        image_keyword: "mediterranean food restaurant",
        lat: 36.7850,
        lng: 3.0590
    },

    // --- RESTAURANTS (Seafood & Modern) ---
    {
        email: "contact@chebec-port.dz",
        title: "Chebec Restaurant",
        type: "Restaurant",
        price: 3500,
        wilaya: "Algiers",
        address: "Quai Nord, Port of Algiers",
        description: "Specializing in fresh seafood right on the port. Known for Seafood Couscous and Grilled Tuna with a view of the ships.",
        image_keyword: "grilled fish seafood platter"
    },
    {
        email: "res@lapresquile.dz",
        title: "La Presqu'ile",
        type: "Restaurant",
        price: 4500,
        wilaya: "Algiers",
        address: "Sidi Yahia, Bir Mourad Rais",
        description: "A high-end fish restaurant and caterer. Famous for Sea Bream with Almond Sauce and Paella. Features a beautiful terrace.",
        image_keyword: "fine dining seafood table"
    },
    {
        email: "hello@ofish.dz",
        title: "O'fish",
        type: "Restaurant",
        price: 1200,
        wilaya: "Algiers",
        address: "Val d'Hydra, Algiers",
        description: "The first seafood fast-food concept in Algiers. Serving Fish & Chips, Fish Burgers, and Poke Bowls in a modern, trendy setting.",
        image_keyword: "fish and chips fast food"
    }
];

function getMenuImagesForRestaurant(restaurantTitle: string) {
    const title = restaurantTitle.toLowerCase();

    // Helper to check if a local image exists in the "needed images" folder
    // Returns the relative path if found, or the fallback Unsplash URL
    const getImg = (filenamePart: string, fallbackUrl: string) => {
        try {
            const dirPath = path.join(process.cwd(), "public", "images", "Algiers", "needed images");
            if (fs.existsSync(dirPath)) {
                // Find file that starts with or contains the filenamePart
                // e.g. "Royal Couscous" -> searches for "Royal Couscous.jpg", "- Royal Couscous.jfif", etc.
                const files = fs.readdirSync(dirPath);
                const match = files.find(f =>
                    f.toLowerCase().includes(filenamePart.toLowerCase()) &&
                    /\.(jpg|jpeg|png|webp|avif|jfif)$/i.test(f)
                );

                if (match) {
                    return `/images/Algiers/needed images/${match}`.replace(/\\/g, "/");
                }
            }
        } catch (e) {
            // ignore
        }
        return fallbackUrl;
    };

    // 1. SEAFOOD MENUS (Chebec, Presqu'ile, O'fish)
    if (title.includes('chebec') || title.includes('presqu') || title.includes('fish')) {
        return [
            { name: "Grilled Dorade Royale", price: 2500, img: getImg("Grilled Dorade Royale", "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600"), category: "Mains" },
            { name: "Seafood Paella", price: 3000, img: getImg("Seafood Paella", "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=600"), category: "Mains" },
            { name: "Fried Calamari", price: 1200, img: getImg("Fried Calamari", "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600"), category: "Starters" },
            { name: "Fish Burger", price: 900, img: getImg("Fish Burger", "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=600"), category: "Mains" }
        ];
    }

    // 2. TRADITIONAL MENUS (Dar Lahlou, El Walima, Yemma, Zellige, Sapori)
    if (title.includes('dar') || title.includes('walima') || title.includes('sapori') || title.includes('grotte')) {
        return [
            { name: "Royal Couscous", price: 1800, img: getImg("Royal Couscous", "https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&w=600"), category: "Mains" },
            { name: "Rechta Algiers", price: 1500, img: getImg("Rechta Algiers", "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600"), category: "Mains" },
            { name: "Lamb Tajine with Prunes", price: 2200, img: getImg("Lamb Tajine", "https://images.unsplash.com/photo-1511690656952-34342d5c71df?auto=format&fit=crop&w=600"), category: "Mains" },
            { name: "Mint Tea & Makroud", price: 400, img: getImg("Mint Tea", "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600"), category: "Desserts" }
        ];
    }

    // 3. HOTEL DINING / GENERIC
    return [
        { name: "Club Sandwich", price: 1200, img: getImg("Club Sandwich", "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600"), category: "Mains" },
        { name: "Grilled Steak", price: 3500, img: getImg("Grilled Steak", "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600"), category: "Mains" },
        { name: "Caesar Salad", price: 900, img: getImg("Caesar Salad", "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600"), category: "Starters" }
    ];
}

const HOTEL_AMENITIES = ["WiFi", "Pool", "Spa", "Gym", "Parking", "Restaurant", "Bar", "Room Service", "AC", "Concierge", "Ocean View"];
const RESTAURANT_AMENITIES = ["WiFi", "Terrace", "AC", "Reservations", "Credit Cards", "Halal", "Family Friendly", "Parking", "Live Music"];

function getRandomAmenities(type: string) {
    const source = type.toLowerCase() === "hotel" ? HOTEL_AMENITIES : RESTAURANT_AMENITIES;
    // Shuffle and pick 3-6 items
    const shuffled = source.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 4) + 3);
}

// Map listing titles to folder names in public/images/Algiers
const LOCAL_IMAGE_MAP: Record<string, string> = {
    // Hotels (Keep existing mapping if folders exist, or update to flat if moved)
    "Sofitel Algiers Hamma Garden": "Soufital Hotel",
    "Hyatt Regency Algiers Airport": "Hyatt Regency Algiers Airport",
    "El Aurassi Hotel": "El Aurassi Hotel",
    "Lamaraz Arts Hotel": "Lamaraz Hotels",
    "Holiday Inn Algiers - Cheraga Tower": "Holiday Inn Algiers - Cheraga Tower by IHG",
    "Dar Lahlou": "Restaurants/Dar lahlou"
};

function getLocalImages(title: string): string[] | null {
    const items: string[] = [];
    const lowerTitle = title.toLowerCase();

    // 1. Check specific folders first (Legacy/Structured)
    const folderName = LOCAL_IMAGE_MAP[title];
    if (folderName) {
        try {
            const dirPath = path.join(process.cwd(), "public", "images", "Algiers", folderName);
            if (fs.existsSync(dirPath)) {
                const files = fs.readdirSync(dirPath).filter(f => !f.startsWith(".") && /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
                files.forEach(f => {
                    const relativePath = `/images/Algiers/${folderName}/${f}`.replace(/\\/g, "/");
                    items.push(relativePath);
                });
            }
        } catch (e) {
            console.warn(`Could not read images for ${title} from folder:`, e);
        }
    }

    // 2. Check "needed images" flat directory (New)
    try {
        const flatDirPath = path.join(process.cwd(), "public", "images", "Algiers", "needed images");
        if (fs.existsSync(flatDirPath) && items.length === 0) { // Only check if no images found yet
            const files = fs.readdirSync(flatDirPath).filter(f => !f.startsWith(".") && /\.(jpg|jpeg|png|webp|avif|jfif)$/i.test(f));

            // Fuzzy match: File name contains significant part of title
            // e.g. "Chebec Restaurant.jpg" matches "Chebec Restaurant"
            // "Dar Lahlou cover.webp" matches "Dar Lahlou"

            // Normalize title for matching: remove "Restaurant", "Hotel" to get core name
            const coreName = title.replace(/Restaurant|Hotel/gi, "").trim().toLowerCase();
            const fullTitle = title.toLowerCase();

            files.forEach(f => {
                const lowerF = f.toLowerCase();
                if (lowerF.includes(coreName) || lowerF.includes(fullTitle)) {
                    const relativePath = `/images/Algiers/needed images/${f}`.replace(/\\/g, "/");
                    items.push(relativePath);
                }
            });
        }
    } catch (e) {
        console.warn(`Could not read needed images for ${title}:`, e);
    }

    return items.length > 0 ? items : null;
}

const CUISINES: Record<string, string> = {
    "Dar Lahlou": "Traditional",
    "Dar Zellige": "Traditional",
    "Restaurant El Walima": "Traditional",
    "Dar Yemma Casbah": "Traditional",
    "La Grotte des Saveurs": "Traditional", // Or Spanish/Mediterranean
    "Sapori": "Italian",
    "Chebec Restaurant": "Seafood",
    "La Presqu'ile": "Seafood",
    "O'fish": "Seafood", // or Fast Food
};

const VIBES = ["Casual", "Fancy", "Family Friendly", "Romantic", "Business"];

function getRestaurantTags(title: string) {
    const tags: string[] = [];

    // 1. Cuisine
    const cuisine = CUISINES[title] || "Modern"; // Default
    tags.push(cuisine);

    // 2. Vibe (Random)
    const vibe = VIBES[Math.floor(Math.random() * VIBES.length)];
    tags.push(vibe);

    return tags;
}

async function seedContent() {
    console.log("🌱 Starting Content Seeding (Listings & Menus) with Enhanced Metadata...");
    // ... existing setup ...

    // Fetch all users once (optimization for small user base)
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();

    if (usersError) {
        console.error("Error fetching users:", usersError.message);
        return;
    }

    console.log(`- Found ${users.length} total users.`);

    for (const data of ALGIERS_DATA) {
        console.log(`Processing: ${data.title}`);

        // 1. Find User by Email
        const user = users.find(u => u.email === data.email);
        if (!user) {
            console.error(`❌ User not found for email: ${data.email}. Skipping.`);
            continue;
        }

        const ownerId = user.id;

        // 1b. FIX: Update User Metadata (Auth) & Profile
        console.log(`- Updating Metadata for ${data.email}...`);
        const { error: updateAuthError } = await supabase.auth.admin.updateUserById(ownerId, {
            user_metadata: {
                full_name: data.title + " Owner",
                role: "owner",
                wilaya: "algiers",
                business_type: data.type.toLowerCase(),
                email_verified: true,
                phone_verified: false
            }
        });

        if (updateAuthError) {
            console.error(`- Error updating auth user: ${updateAuthError.message}`);
        }

        // Update Public Profile (Upsert to ensure it exists)
        const { error: updateProfileError } = await supabase
            .from("profiles")
            .upsert({
                id: ownerId,
                role: "owner",
                full_name: data.title + " Owner",
                wilaya: "algiers"
            });

        if (updateProfileError) {
            console.error(`- Error updating profile: ${updateProfileError.message}`);
        }

        // 2. Create Listing
        // Check if listing exists for this owner and title
        const { data: existingListing } = await supabase
            .from("listings")
            .select("id")
            .eq("owner_id", ownerId)
            .eq("title", data.title)
            .maybeSingle(); // Use maybeSingle to avoid errors if multiple found (though rare) or none

        let listingId = existingListing?.id;

        const localImages = getLocalImages(data.title);
        const imagesToUse = localImages && localImages.length > 0
            ? localImages
            : [`https://source.unsplash.com/800x600/?${encodeURIComponent(data.image_keyword)}`];

        // Combine random amenities with fixed tags (Cuisine/Vibe) for restaurants
        let finalAmenities = getRandomAmenities(data.type);
        if (data.type.toLowerCase() === "restaurant") {
            const tags = getRestaurantTags(data.title);
            finalAmenities = [...finalAmenities, ...tags];
        }

        if (!existingListing) {
            console.log(`- Creating listing: ${data.title}`);
            const { data: newListing, error: listingError } = await supabase
                .from("listings")
                .insert({
                    owner_id: ownerId,
                    title: data.title,
                    description: data.description,
                    type: data.type.toLowerCase(), // Ensure lowercase for enum
                    wilaya: data.wilaya.toLowerCase(), // Ensure lowercase slug
                    address: data.address,
                    price_per_night: data.price,
                    images: imagesToUse,
                    amenities: finalAmenities,
                    is_featured: true,
                    location_lat: (data as any).lat,
                    location_lng: (data as any).lng
                })
                .select("id")
                .single();

            if (listingError) {
                console.error("- Error creating listing:", listingError.message);
                continue;
            }
            listingId = newListing.id;
        } else {
            // For existing listings, update amenities AND images if available
            await supabase.from("listings")
                .update({
                    amenities: finalAmenities,
                    images: imagesToUse,
                    location_lat: (data as any).lat,
                    location_lng: (data as any).lng
                })
                .eq("id", existingListing.id);
            console.log(`- Listing exists (Updated Amenities & Images & Location): ${data.title}`);
            listingId = existingListing.id;
        }

        // 3. Generate Menus (Only for Restaurants)
        if (data.type.toLowerCase() === "restaurant" && listingId) {
            const { data: existingMenu } = await supabase
                .from("menus")
                .select("id")
                .eq("listing_id", listingId)
                .maybeSingle();

            let menuId = existingMenu?.id;

            if (!existingMenu) {
                console.log(`- Creating Menu for: ${data.title}`);
                const { data: newMenu, error: menuError } = await supabase
                    .from("menus")
                    .insert({
                        listing_id: listingId,
                        title: "Main Menu",
                        description: "Our signature dishes",
                        is_active: true
                    })
                    .select("id")
                    .single();

                if (menuError) {
                    console.error("- Error creating menu:", menuError.message);
                    continue;
                }
                menuId = newMenu.id;
            }

            if (menuId) {
                const menuItems = getMenuImagesForRestaurant(data.title);
                console.log(`- Seeding ${menuItems.length} menu items...`);

                // Clear existing items for this menu to ensure clean state or skip?
                // Let's just try to insert. If uniqueness constraint exists, it will fail.
                // Assuming no uniqueness constraint on (menu_id, name) for now, but to be safe lets delete old ones.
                await supabase.from("menu_items").delete().eq("menu_id", menuId);

                for (const item of menuItems) {
                    // Extract clean URL if it was in markdown format
                    let imageUrl = item.img;
                    if (imageUrl.includes("](")) {
                        const match = imageUrl.match(/\((.*?)\)/);
                        if (match) imageUrl = match[1];
                    }

                    await supabase.from("menu_items").insert({
                        menu_id: menuId,
                        name: item.name,
                        price: item.price,
                        image_url: imageUrl,
                        category: item.category || "General",
                        description: `Prepared fresh daily.`,
                        is_available: true
                    });
                }
            }
        }
    }
    console.log("✅ Content Seeding Complete!");
}

seedContent();
