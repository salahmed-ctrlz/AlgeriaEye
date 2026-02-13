
export interface TravelPlan {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    image: string;
    locations: string[];
    itinerary: {
        day: number;
        title: string;
        activities: string[];
    }[];
}

export const travelPlans: TravelPlan[] = [
    {
        id: "plan-algiers",
        slug: "trip-to-algiers",
        title: "Algiers: The White City",
        description: "Experience the magic of Algiers in a 3-day immersive tour. From the ancient Casbah to the modern bay, discover the city's rich history and vibrant culture.",
        price: 45000,
        duration: "3 Days / 2 Nights",
        image: "/images/wilayas/Algiers/hero.jpg",
        locations: ["Algiers", "Casbah", "Notre Dame d'Afrique"],
        itinerary: [
            {
                day: 1,
                title: "Arrival & Casbah Tour",
                activities: ["Airport pickup", "Check-in at Hotel El Aurassi", "Guided walking tour of the Casbah", "Traditional dinner"]
            },
            {
                day: 2,
                title: "Colonial & Modern Algiers",
                activities: ["Visit the Grande Poste", "Jardin d'Essai du Hamma", "Martyrs' Memorial (Maqam Echahid)", "Seafood lunch at Pêcherie"]
            },
            {
                day: 3,
                title: "Coastal Views & Departure",
                activities: ["Morning at Notre Dame d'Afrique", "Shopping at Didouche Mourad", "Airport transfer"]
            }
        ]
    },
    {
        id: "plan-constantine",
        slug: "trip-to-constantine",
        title: "Constantine: City of Bridges",
        description: "Walk across the suspended bridges of Constantine and gaze into the dramatic gorges. A breathtaking journey through history and geology.",
        price: 38000,
        duration: "2 Days / 1 Night",
        image: "/images/wilayas/Constantine/hero.webp",
        locations: ["Constantine", "Sidi M'Cid", "Palace of Ahmed Bey"],
        itinerary: [
            {
                day: 1,
                title: "Bridges & Palaces",
                activities: ["Arrival and check-in at Marriott Constantine", "Tour of the 7 Bridges", "Visit Ahmed Bey Palace"]
            },
            {
                day: 2,
                title: "Gorges & Ruins",
                activities: ["Tiddis Roman Ruins excursion", "Lunch overlooking the Rhumel Gorge", "Departure"]
            }
        ]
    },
    {
        id: "plan-sahara",
        slug: "sahara-adventure",
        title: "Sahara: Golden Adventure",
        description: "A once-in-a-lifetime expedition into the heart of the Algerian Sahara. Sleep under the stars and explore the Tassili n'Ajjer.",
        price: 85000,
        duration: "5 Days / 4 Nights",
        image: "/images/wilayas/Tamanrasset/hero.jpg",
        locations: ["Djanet", "Tadrart Rouge", "Essendilene"],
        itinerary: [
            {
                day: 1,
                title: "Gate to the Desert",
                activities: ["Arrival in Djanet", "4x4 Transfer to campsite", "Sunset tea ceremony"]
            },
            {
                day: 2,
                title: "Canyons & Rock Art",
                activities: ["Explore Essendilene Canyon", "View ancient rock paintings", "Tuareg music night"]
            },
            {
                day: 3,
                title: "The Red Dunes",
                activities: ["Tadrart Rouge expedition", "Sandboarding", "Traditional campfire dinner"]
            },
            {
                day: 4,
                title: "Oases",
                activities: ["Visit local oases", "Camel ride", "Star gazing"]
            },
            {
                day: 5,
                title: "Farewell",
                activities: ["Sunrise breakfast", "Transfer to airport"]
            }
        ]
    },
    {
        id: "plan-oran",
        slug: "oran-vibes",
        title: "Oran: The Radiant City",
        description: "Enjoy the laid-back coastal vibes of Oran. Famous for Rai music, Santa Cruz, and delicious street food.",
        price: 42000,
        duration: "3 Days / 2 Nights",
        image: "/images/wilayas/Oran/hero.jpg",
        locations: ["Oran", "Santa Cruz", "Front de Mer"],
        itinerary: [
            {
                day: 1,
                title: "Santa Cruz & City",
                activities: ["Check-in at Royal Hotel", "Visit Fort Santa Cruz", "Walk along Front de Mer"]
            },
            {
                day: 2,
                title: "History & Music",
                activities: ["Visit the Bey's Palace", "Disco Maghreb tour", "Calentita tasting"]
            },
            {
                day: 3,
                title: "Beach & Relax",
                activities: ["Morning at Les Andalouses beach", "Departure"]
            }
        ]
    }
];
