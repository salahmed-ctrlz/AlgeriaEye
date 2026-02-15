export interface Guide {
    id: string;
    name: string;
    image: string;
    location: string;
    description: string;
    rating: number;
    reviews: number;
    price: number;
    specialties: string[];
    languages: string[];
    isAgency?: boolean;
    featured?: boolean;
    businessType?: string;
}

export const guides: Guide[] = [
    {
        id: "5a111111-1111-1111-1111-111111111111",
        name: "Sami Haddad",
        image: "/images/TourGuides/sami.jpg",
        location: "Constantine",
        description: "Professional guide with 10+ years experience. Specializing in cultural and historical tours across Algiers, Constantine, and the Sahara.",
        rating: 4.9,
        reviews: 320,
        price: 4500,
        specialties: ["History", "Desert Safari", "Cultural Tours", "Translation"],
        languages: ["Arabic", "French", "English", "Spanish"],
        businessType: "guide",
        featured: true
    },
    {
        id: "5b222222-2222-2222-2222-222222222222",
        name: "Lila Mansouri",
        image: "/images/TourGuides/lila.jpg",
        location: "Algiers",
        description: "Master's degree in History and Archaeology. Expert in Andalusian heritage and Roman ruins across Tipaza and Tlemcen.",
        rating: 4.8,
        reviews: 210,
        price: 3800,
        specialties: ["Archaeology", "Educational Tours", "Museums"],
        languages: ["Arabic", "French", "English", "Italian"],
        businessType: "guide",
        featured: true
    },
    {
        id: "5c333333-3333-3333-3333-333333333333",
        name: "Karim Kabyle",
        image: "/images/TourGuides/karim.jpg",
        location: "Bejaia",
        description: "Specialized in ecotourism and mountain safety. 12 years of experience leading expeditions in Djurdjura and the Aurès mountains.",
        rating: 4.9,
        reviews: 410,
        price: 4000,
        specialties: ["Hiking", "Camping", "Nature Photography", "Mountain Safety"],
        languages: ["Arabic", "Tamazight", "French", "English"],
        businessType: "guide"
    },
    {
        id: "5d444444-4444-4444-4444-444444444444",
        name: "Amel Touareg",
        image: "/images/TourGuides/amel.jpg",
        location: "Tamanrasset",
        description: "Expert desert guide with 20 years experience in the Hoggar and Tassili regions. Providing luxury safaris and stargazing experiences.",
        rating: 5.0,
        reviews: 500,
        price: 6500,
        specialties: ["4x4 Safari", "Luxury Camping", "Astrophotography", "VIP Tours"],
        languages: ["Arabic", "Tamashoq", "French", "English", "German"],
        businessType: "guide",
        featured: true
    }
];
