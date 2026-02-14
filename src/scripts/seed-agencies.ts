import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load Environment Variables
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
    console.error("Missing Env Vars");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const agencies = [
    {
        name: "Voyages de Fidélité",
        email: "contact@voyagesfidelite.dz",
        phone: "0795 48 66 28",
        avatar: "/images/Agencies/Wafaa_voyages.jpg",
        bio: {
            en: "Specializing in local excursions and family trips.",
            fr: "Spécialisé dans les excursions locales et les voyages en famille.",
            ar: "متخصص في الرحلات المحلية والرحلات العائلية."
        },
        listing: {
            title: "Excursion à Béjaïa (Parc Gouraya & Yemma Gouraya)",
            description: "Excursion inoubliable à la découverte du parc national de Gouraya et du sanctuaire de Yemma Gouraya. \n\nItinéraire : Parc national Gouraya (Cap Carbon, Tunnel de Mahzen), Sanctuaire de Yemma Gouraya, visite du centre historique de Béjaïa.",
            price: 3000,
            wilaya: "Bejaia",
            location: "Parc National Gouraya, Bejaia",
            image: "/images/Agencies/gouraya_yemma_trip.jpg",
            startDate: "2026-02-28",
            duration: "1 Day",
            features: ["Transport", "Guide", "Family Friendly"]
        }
    },
    {
        name: "Explora Voyages",
        email: "contact@explora.dz",
        phone: "0793 12 34 56",
        avatar: "/images/Agencies/Explora.jpg",
        bio: {
            en: "Discover the magic of the Sahara and Algerian heritage.",
            fr: "Découvrez la magie du Sahara et du patrimoine algérien.",
            ar: "اكتشف سحر الصحراء والتراث الجزائري."
        },
        listing: {
            title: "Sahara : Oasis & Vallée du M’zab",
            description: "Discover the magic of the Sahara: Ghardaïa & the M’Zab Valley (UNESCO). \n\nItinéraire : Route dans le désert, coucher de soleil sur les dunes, visite de la Vallée du M’Zab (ghourfas fortifiées, ksars Ibadites).",
            price: 7000,
            wilaya: "Ghardaia",
            location: "Ghardaïa & M'Zab Valley",
            image: "/images/Agencies/sahara_ghardaia_trip.jpg",
            startDate: "2026-03-06",
            duration: "2 Days",
            features: ["Transport", "Guide", "Bivouac", "Sahara", "UNESCO"]
        }
    },
    {
        name: "ZT Découvrir",
        email: "contact@ztdecouvrir.dz",
        phone: "0794 56 78 90",
        avatar: "/images/Agencies/zt_decouvrir.jpg",
        bio: {
            en: "Historic tours and nature expeditions.",
            fr: "Circuits historiques et expéditions nature.",
            ar: "جولات تاريخية ورحلات استكشافية للطبيعة."
        },
        listing: {
            title: "Tlemcen : Histoire & Nature",
            description: "Historic Tlemcen: ruines et cascades. \n\nItinéraire : Forêts du Mont des Aurès, Mansourah, Tombeau de Sidi Boumédiène, Cascades d’El-Ourit, Grottes de Beni Add.",
            price: 2800,
            wilaya: "Tlemcen",
            location: "Tlemcen, Mansourah, Beni Add",
            image: "/images/Agencies/tlemcen_ruins_trip.jpg",
            startDate: "2026-02-21",
            duration: "1 Day",
            features: ["History", "Nature", "Transport", "Guide"]
        }
    },
    {
        name: "Visit Algeria",
        email: "contact@visitalgeria.dz",
        phone: "0792 22 33 44",
        avatar: "/images/Agencies/visit_algeria.jpg",
        bio: {
            en: "Your gateway to Algeria's coastal treasures.",
            fr: "Votre porte d'entrée vers les trésors côtiers de l'Algérie.",
            ar: "بوابتك إلى كنوز الجزائر الساحلية."
        },
        listing: {
            title: "Côte Romaine : Tipasa & Cherchell",
            description: "Découvrez Tipasa la Romaine et Césarée (Cherchell). \n\nItinéraire : Site archéologique de Tipasa, Mausolée royal de Maurétanie, Théâtre romain de Cherchell.",
            price: 3000,
            wilaya: "Tipaza",
            location: "Tipasa & Cherchell",
            image: "/images/Agencies/tipasa_cherchell_trip.jpg",
            startDate: "2026-03-05",
            duration: "1 Day",
            features: ["History", "Beach", "UNESCO", "Transport", "Guide"]
        }
    },
    {
        name: "Algerian Explorer",
        email: "contact@algerianexplorer.dz",
        phone: "0791 33 44 55",
        avatar: "/images/Agencies/algerian_explorer.jpg",
        bio: {
            en: "Exploring the hidden gems of Eastern Algeria.",
            fr: "Explorer les joyaux cachés de l'Est algérien.",
            ar: "استكشاف الجواهر الخفية في الشرق الجزائري."
        },
        listing: {
            title: "Constantine : La Ville des Ponts",
            description: "Explore the 'City of Bridges': Constantine’s rock-cut gorges and Roman ruins. \n\nItinéraire : Pont Sidi M’Cid, Ruines de Tiddis, Musée Cirta & centre-ville.",
            price: 2500,
            wilaya: "Constantine",
            location: "Constantine & Tiddis",
            image: "/images/Agencies/constantine_bridges_trip.jpg",
            startDate: "2026-02-27",
            duration: "1 Day",
            features: ["History", "Architecture", "Transport", "Guide"]
        }
    }
];

async function seedAgencies() {
    console.log("🌱 Seeding Agencies & Listings...");

    // 1. Get or Create the Central User
    console.log("Setting up central account: test@travel.agency...");
    let centralUserId: string | null = null;
    const centralEmail = "test@travel.agency";

    // Try to find by email (using listUsers if available or just try create)
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const existingUser = usersData?.users.find(u => u.email === centralEmail);

    if (existingUser) {
        centralUserId = existingUser.id;
        console.log(`Found central user: ${centralUserId}`);

        // Update metadata to ensure it's an agency/owner
        await supabase.auth.admin.updateUserById(centralUserId, {
            user_metadata: {
                full_name: "Travel Agency Test",
                role: "owner",
                business_type: "agency",
                wilaya: "algiers",
                email_verified: true
            },
            email_confirm: true
        });

        // Update Profile
        await supabase.from("profiles").upsert({
            id: centralUserId,
            full_name: "Travel Agency Test",
            role: "agency",
            business_type: "agency",
            wilaya: "algiers",
            email: centralEmail
        });

    } else {
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email: centralEmail,
            password: "password123",
            email_confirm: true,
            user_metadata: {
                full_name: "Travel Agency Test",
                role: "owner",
                business_type: "agency",
                wilaya: "algiers",
                email_verified: true
            }
        });

        if (createError) {
            console.error("Failed to create central user:", createError);
            return;
        }
        centralUserId = newUser.user.id;
        console.log(`Created central user: ${centralUserId}`);

        // Wait for trigger
        await new Promise(r => setTimeout(r, 2000));

        await supabase.from("profiles").upsert({
            id: centralUserId,
            full_name: "Travel Agency Test",
            role: "agency",
            business_type: "agency",
            wilaya: "algiers",
            email: centralEmail // Ensure email is in profile for easy check
        });
    }

    if (!centralUserId) return;

    // 2. Loop through agencies and create LISTINGS for them
    for (const agency of agencies) {
        console.log(`Processing ${agency.name}...`);

        // A. Create Agency Listing (The Agency itself as a listing)
        const { data: existingAgency } = await supabase
            .from("listings")
            .select("id")
            .eq("title", agency.name)
            .eq("owner_id", centralUserId)
            .maybeSingle();

        if (!existingAgency) {
            const { error: agencyError } = await supabase.from("listings").insert({
                owner_id: centralUserId,
                title: agency.name,
                description: `Travel Agency: ${agency.bio.en}`, // Distinct description
                type: "tour", // Fallback: 'agency' type not in DB enum
                wilaya: agency.listing.wilaya, // Use listing wilaya as proxy
                address: agency.listing.location,
                images: [agency.avatar], // Use avatar as listing image
                price_per_night: 0,
                features: ["Verified Agency", "Tours", "Travel Planning"],
                created_at: new Date().toISOString()
            });
            if (agencyError) console.error(`Error creating Agency Listing ${agency.name}:`, agencyError.message);
            else console.log(`Created Agency Listing: ${agency.name}`);
        } else {
            console.log(`Agency Listing ${agency.name} already exists.`);
        }

        // B. Create Tour Listing
        const { data: existingTour } = await supabase
            .from("listings")
            .select("id")
            .eq("title", agency.listing.title)
            .eq("owner_id", centralUserId)
            .maybeSingle();

        if (!existingTour) {
            const { error: tourError } = await supabase.from("listings").insert({
                owner_id: centralUserId,
                title: agency.listing.title,
                description: agency.listing.description,
                type: "tour",
                wilaya: agency.listing.wilaya,
                address: agency.listing.location,
                price_per_night: agency.listing.price,
                images: [agency.listing.image],
                features: agency.listing.features,
                created_at: new Date().toISOString()
            });
            if (tourError) console.error(`Error creating Tour Listing ${agency.listing.title}:`, tourError.message);
            else console.log(`Created Tour Listing: ${agency.listing.title}`);
        } else {
            console.log(`Tour Listing ${agency.listing.title} already exists.`);
        }
    }

    console.log("✅ Agency Seeding Complete.");
}

seedAgencies();
