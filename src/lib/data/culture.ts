export interface CultureItem {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    region: string;
    description: string;
    history: string;
    locations: string[];
    media: {
        videoUrl?: string; // YouTube embed URL or similar
        gallery: string[];
    };
}

export const CULTURE_ITEMS: CultureItem[] = [
    {
        id: "fantasia",
        title: "The Fantasia (Tbourida)",
        subtitle: "The Gunpowder Ceremony",
        image: "/images/explore/fantasia.jpg",
        region: "High Plateaus",
        description: "A spectacular equestrian performance simulating military assaults, deeply rooted in Maghrebi tradition.",
        history: "Dating back to the 16th century, the Fantasia creates a bridge between the glorious military past and the present day. It represents the strong bond between the rider and his horse, symbolizing courage, skill, and spiritual connection. Riders, clad in traditional ceremonial dress, charge in a straight line at a gallop and fire their muskets simultaneously at the end of the race, a feat known as 'Baroud'. It is a staple of weddings, religious festivals (Moussems), and national celebrations.",
        locations: ["Djelfa", "Tiaret", "Saida", "Mila"],
        media: {
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder user asked for
            gallery: [
                "/images/explore/fantasia-1.jpg",
                "/images/explore/fantasia-2.jpg",
                "/images/explore/fantasia-3.jpg",
            ],
        },
    },
    {
        id: "karakou",
        title: "The Karakou",
        subtitle: "The Queen of Algiers",
        image: "/images/explore/karakou.jpg",
        region: "Algiers",
        description: "A luxurious velvet jacket embroidered with gold thread (Fetla or Majboud), worn with a 'Seroual Chelqa'.",
        history: "Originating from the 15th century in Algiers, the Karakou is the quintessential wedding attire for Algerian brides. It is a masterpiece of craftsmanship, often taking months to complete by hand. The velvet symbolizes nobility, while the intricate gold embroidery tells stories of Andalusian and Ottoman influences merged into a unique Algerian identity. It has evolved over centuries but remains a timeless symbol of elegance and status.",
        locations: ["Algiers", "Blida", "Tipaza"],
        media: {
            gallery: [
                "/images/explore/karakou-1.jpg",
                "/images/explore/karakou-2.jpg",
                "/images/explore/karakou-3.jpg",
            ],
        },
    },
    {
        id: "imzad",
        title: "Imzad Music",
        subtitle: "Soul of the Tuareg",
        image: "/images/explore/imzad.jpg",
        region: "Ahaggar / Tamanrasset",
        description: "A traditional single-string bowed instrument played exclusively by Tuareg women.",
        history: "Inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity, the Imzad is more than an instrument; it is a pillar of Tuareg culture. While men recite poetry, women play the Imzad to accompany them, creating a melodic synergy that often resolves tribal disputes and celebrates bravery. The music is known for its haunting, melancholic beauty, echoing the vastness of the Sahara desert.",
        locations: ["Tamanrasset", "Illizi", "Djanet"],
        media: {
            videoUrl: "https://www.youtube.com/embed/example",
            gallery: [
                "/images/explore/imzad-1.jpg",
                "/images/explore/imzad-2.jpg",
            ],
        },
    },
    {
        id: "couscous",
        title: "Couscous",
        subtitle: "The Dish of Unity",
        image: "/images/explore/couscous.jpg",
        region: "Nationwide",
        description: "The staple dish of North Africa, made from steamed semolina granules and served with stew.",
        history: "Recognized by UNESCO as intangible world heritage, Couscous is the heartbeat of Algerian cuisine. Its preparation is a communal ritual, often done by groups of women rolling the semolina grains by hand. From the 'Mesfouf' (sweet/dry) of Kabylia to the spicy red sauce versions of the East and the barley couscous of the South, it varies by region but always symbolizes hospitality, generosity, and gathering. It is the mandatory dish for Friday lunch and sacred occasions.",
        locations: ["Tizi Ouzou", "Constantine", "Adrar", "Tlemcen"],
        media: {
            gallery: [
                "/images/explore/couscous-1.jpg",
                "/images/explore/couscous-2.jpg",
            ],
        },
    },
    {
        id: "ghardaia",
        title: "Ghardaia Architecture",
        subtitle: "The M'zab Valley",
        image: "/images/explore/ghardaia.jpg",
        region: "Ghardaia",
        description: "A masterpiece of ancient urban planning and passive climate adaptation in the desert.",
        history: "The M'zab Valley is a pentapolis (five cities) built in the 11th century by the Ibadites. Its architecture is a functional response to the harsh desert environment, featuring narrow winding streets to break wind and provide shade, and simple, unadorned structures that emphasize community and equality. Le Corbusier, the famous modern architect, was profoundly inspired by Ghardaia's 'architecture without architects', praising its perfect adaptation to human scale and nature.",
        locations: ["Ghardaia", "Beni Isguen", "Melika"],
        media: {
            gallery: [
                "/images/explore/ghardaia-1.jpg",
                "/images/explore/ghardaia-2.jpg",
            ],
        },
    },
    {
        id: "timgad",
        title: "Timgad Ruins",
        subtitle: "The Pompeii of Africa",
        image: "/images/explore/timgad.jpg",
        region: "Batna",
        description: "One of the best-preserved Roman cities in existence, showcasing the perfect grid plan.",
        history: "Founded by Emperor Trajan around 100 AD as a military colony, Timgad (Thamugadi) is a testament to Roman urban planning. Unlike Rome itself, which grew organically, Timgad was built on a strict grid system (Cardo and Decumanus). It features a magnificent library, thermal baths, and a 3,500-seat theater that still hosts the International Festival of Timgad today. It stands as a powerful reminder of the deep historical layers present in Algerian soil.",
        locations: ["Batna", "Timgad"],
        media: {
            gallery: [
                "/images/explore/timgad-1.jpg",
                "/images/explore/timgad-2.jpg",
            ],
        },
    },
];
