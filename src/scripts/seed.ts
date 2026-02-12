
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
        type: "hotel",
        price: 28000,
        wilaya: "algiers",
        address: "172 Rue Hassiba Ben Bouali, Algiers",
        description: "Located in the heart of Algiers near the Hamma Garden. A blend of French luxury and Algerian hospitality. Features 309 rooms, 3 restaurants, and a swimming pool.",
        image_keyword: "luxury hotel bedroom"
    },
    {
        email: "info@hyatt-algiers.dz",
        title: "Hyatt Regency Algiers Airport",
        type: "hotel",
        price: 24000,
        wilaya: "algiers",
        address: "Houari Boumediene Airport, Dar El Beida",
        description: "The only hotel directly connected to the airport terminal. Modern design, perfect for business travelers, with soundproof windows and premium amenities.",
        image_keyword: "modern hotel lobby airport"
    },
    {
        email: "booking@elaurassi.dz",
        title: "El Aurassi Hotel",
        type: "hotel",
        price: 26000,
        wilaya: "algiers",
        address: "2 Bd Frantz Fanon, Les Tagarins",
        description: "Known as the 'Hotel of the Bay', offering a panoramic view of the Mediterranean. Features massive gardens, a large outdoor pool, and 4 restaurants.",
        image_keyword: "hotel balcony sea view"
    },
    {
        email: "reservations@lamaraz.dz",
        title: "Lamaraz Arts Hotel",
        type: "hotel",
        price: 18000,
        wilaya: "algiers",
        address: "Kouba, Algiers",
        description: "A luxury 4-star art hotel in Kouba combining modern elegance with artistic touches. Features a spa, lounge with bay views, and highly rated service.",
        image_keyword: "boutique hotel interior"
    },
    {
        email: "contact@holidayinn-algiers.dz",
        title: "Holiday Inn Algiers - Cheraga Tower",
        type: "hotel",
        price: 21000,
        wilaya: "algiers",
        address: "Bois des Cars, Dely Ibrahim / Cheraga",
        description: "One of the tallest hotels in Algiers offering breathtaking views. Known for its 'Le 101' restaurant on the top floor.",
        image_keyword: "skyscraper hotel luxury"
    },

    // --- RESTAURANTS (Traditional) ---
    {
        email: "hello@darlahlou.dz",
        title: "Dar Lahlou",
        type: "restaurant",
        price: 2500,
        wilaya: "algiers",
        address: "Mohammadia (Near SAFEX), Algiers",
        description: "Authentic Algerian cuisine in a decor that evokes the old era. Famous for generous portions of Couscous, Chakhchoukha, and Harira.",
        image_keyword: "couscous traditional algerian food"
    },
    {
        email: "contact@darzellige.dz",
        title: "Dar Zellige",
        type: "restaurant",
        price: 4000,
        wilaya: "algiers",
        address: "Djenane El Malik, Hydra",
        description: "An upscale dining experience in Hydra named after its beautiful Zellige tile decor. Offers roast lamb, tajines, and a serene atmosphere around a pool.",
        image_keyword: "moroccan tajine luxury dining"
    },
    {
        email: "info@elwalima.dz",
        title: "Restaurant El Walima",
        type: "restaurant",
        price: 2000,
        wilaya: "algiers",
        address: "22 Rue Ahmed Zabana, Sidi M'Hamed",
        description: "A warm, family-friendly spot serving authentic Maghrebi dishes like Tajine and Grilled Fish. Located near the Bardo Museum.",
        image_keyword: "family dinner table food"
    },
    {
        email: "salam@daryemma.dz",
        title: "Dar Yemma Casbah",
        type: "restaurant",
        price: 1500,
        wilaya: "algiers",
        address: "6 Rue Larbi Triki, Casbah",
        description: "Located deep inside the historic Casbah. A perfect stop for tourists to try Rechta and Dolma in a traditional Ottoman-style house.",
        image_keyword: "casbah algiers traditional food"
    },
    {
        email: "contact@lagrotte.dz",
        title: "La Grotte des Saveurs",
        type: "restaurant",
        price: 3000,
        wilaya: "algiers",
        address: "Alger Centre (Near Dr Ch. Saadane St)",
        description: "A unique dining experience inside a man-made cave. Famous for their grilled meats, Paella, and cozy, mysterious atmosphere.",
        image_keyword: "cave restaurant interior candle light"
    },
    {
        email: "info@sapori-casbah.dz",
        title: "Sapori",
        type: "restaurant",
        price: 2200,
        wilaya: "algiers",
        address: "20 Rpe Chasse Loup Laudat, Casbah",
        description: "A hidden gem in the Casbah serving a mix of Mediterranean and Algerian classics. Great for a quiet lunch after exploring.",
        image_keyword: "mediterranean food restaurant"
    },

    // --- RESTAURANTS (Seafood & Modern) ---
    {
        email: "contact@chebec-port.dz",
        title: "Chebec Restaurant",
        type: "restaurant",
        price: 3500,
        wilaya: "algiers",
        address: "Quai Nord, Port of Algiers",
        description: "Specializing in fresh seafood right on the port. Known for Seafood Couscous and Grilled Tuna with a view of the ships.",
        image_keyword: "grilled fish seafood platter"
    },
    {
        email: "res@lapresquile.dz",
        title: "La Presqu'ile",
        type: "restaurant",
        price: 4500,
        wilaya: "algiers",
        address: "Sidi Yahia, Bir Mourad Rais",
        description: "A high-end fish restaurant and caterer. Famous for Sea Bream with Almond Sauce and Paella. Features a beautiful terrace.",
        image_keyword: "fine dining seafood table"
    },
    {
        email: "hello@ofish.dz",
        title: "O'fish",
        type: "restaurant",
        price: 1200,
        wilaya: "algiers",
        address: "Val d'Hydra, Algiers",
        description: "The first seafood fast-food concept in Algiers. Serving Fish & Chips, Fish Burgers, and Poke Bowls in a modern, trendy setting.",
        image_keyword: "fish and chips fast food"
    }
];

function getMenuImagesForRestaurant(restaurantTitle: string) {
    const title = restaurantTitle.toLowerCase();

    // 1. SEAFOOD MENUS (Chebec, Presqu'ile, O'fish)
    if (title.includes('chebec') || title.includes('presqu') || title.includes('fish')) {
        return [
            { name: "Grilled Dorade Royale", price: 2500, img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600", category: "Mains" },
            { name: "Seafood Paella", price: 3000, img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=600", category: "Mains" },
            { name: "Fried Calamari", price: 1200, img: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600", category: "Starters" },
            { name: "Fish Burger", price: 900, img: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=600", category: "Mains" }
        ];
    }

    // 2. TRADITIONAL MENUS (Dar Lahlou, El Walima, Yemma, Zellige, Sapori)
    if (title.includes('dar') || title.includes('walima') || title.includes('sapori') || title.includes('grotte')) {
        return [
            { name: "Royal Couscous", price: 1800, img: "https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&w=600", category: "Mains" },
            { name: "Rechta Algiers", price: 1500, img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600", category: "Mains" },
            { name: "Lamb Tajine with Prunes", price: 2200, img: "https://images.unsplash.com/photo-1511690656952-34342d5c71df?auto=format&fit=crop&w=600", category: "Mains" },
            { name: "Mint Tea & Makroud", price: 400, img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600", category: "Desserts" }
        ];
    }

    // 3. HOTEL DINING / GENERIC
    return [
        { name: "Club Sandwich", price: 1200, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600", category: "Mains" },
        { name: "Grilled Steak", price: 3500, img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600", category: "Mains" },
        { name: "Caesar Salad", price: 900, img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600", category: "Starters" }
    ];
}

// 3. Main Seed Logic
async function seed() {
    console.log("🌱 Starting Seeding Process...");

    for (const data of ALGIERS_DATA) {
        console.log(`Processing: ${data.title}`);

        // A. Create/Get User (Owner)
        let ownerId = null;

        // Try to get user by email first (Admin API)
        const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
        const existingUser = usersData?.users.find(u => u.email === data.email);

        if (existingUser) {
            console.log(`- User exists: ${data.email}`);
            ownerId = existingUser.id;
        } else {
            console.log(`- Creating user: ${data.email}`);
            const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
                email: data.email,
                password: "password123",
                email_confirm: true,
                user_metadata: {
                    full_name: data.title + " Owner",
                    role: "owner"
                }
            });

            if (createError) {
                console.error(`- Error creating user ${data.email}:`, createError.message);
                continue;
            }
            ownerId = newUser.user.id;
        }

        if (!ownerId) continue;

        // B. Update Profile (Just to be safe, sometimes trigger might lag or we want to ensure data)
        const { error: profileError } = await supabase
            .from("profiles")
            .update({
                role: "owner",
                full_name: data.title + " Owner",
                wilaya: "algiers"
            })
            .eq("id", ownerId);

        if (profileError) console.error("- Profile update warning:", profileError.message);

        // C. Create Listing
        // Check if listing exists
        const { data: existingListing } = await supabase
            .from("listings")
            .select("id")
            .eq("owner_id", ownerId)
            .eq("title", data.title)
            .single();

        let listingId = existingListing?.id;

        if (!existingListing) {
            console.log(`- Creating listing: ${data.title}`);
            const { data: newListing, error: listingError } = await supabase
                .from("listings")
                .insert({
                    owner_id: ownerId,
                    title: data.title,
                    description: data.description,
                    type: data.type.toLowerCase(),
                    wilaya: data.wilaya,
                    address: data.address,
                    price_per_night: data.price,
                    images: [`https://source.unsplash.com/800x600/?${encodeURIComponent(data.image_keyword)}`], // Dynamic placeholder
                    is_featured: true
                })
                .select("id")
                .single();

            if (listingError) {
                console.error("- Error creating listing:", listingError.message);
                continue;
            }
            listingId = newListing.id;
        } else {
            console.log(`- Listing exists: ${data.title}`);
        }

        // D. Create Menus (Only for Restaurants)
        if (data.type.toLowerCase() === "restaurant" && listingId) {
            // Check if menu exists
            const { data: existingMenu } = await supabase
                .from("menus")
                .select("id")
                .eq("listing_id", listingId)
                .single();

            let menuId = existingMenu?.id;

            if (!existingMenu) {
                console.log(`- Creating Menu for: ${data.title}`);
                const { data: newMenu, error: menuError } = await supabase
                    .from("menus")
                    .insert({
                        listing_id: listingId,
                        title: "Main Menu",
                        description: "Our diverse selection of dishes",
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

                // Clear existing items to avoid duplicates if re-running? 
                // Maybe better to just insert if not exists.
                // For simplicity in this seed script, allow potential duplicates or delete all first?
                // Let's delete all items for this menu first to ensure clean state.
                await supabase.from("menu_items").delete().eq("menu_id", menuId);

                for (const item of menuItems) {
                    await supabase.from("menu_items").insert({
                        menu_id: menuId,
                        name: item.name,
                        price: item.price,
                        image_url: item.img,
                        category: item.category || "General",
                        description: `Delicious ${item.name} prepared with fresh ingredients.`,
                        is_available: true
                    });
                }
            }
        }
    }

    console.log("✅ Seeding Complete!");
}

seed();
