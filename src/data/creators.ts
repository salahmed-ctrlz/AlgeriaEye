export interface Content {
    id: string;
    type: 'instagram' | 'youtube';
    url: string;
    thumbnail?: string; // Optional thumbnail if we want to defer loading
    wilayas?: string[]; // Slugs of related wilayas
    title?: string;
}

export interface Creator {
    id: string;
    slug: string;
    name: string;
    bio: {
        en: string;
        fr: string;
        ar: string;
    };
    avatar: string; // URL to avatar image
    socials: {
        instagram?: string;
        youtube?: string;
        tiktok?: string;
        facebook?: string;
        website?: string;
    };
    content: Content[];
    stats: {
        followers: string;
        following?: string;
        posts?: number;
    };
}

export const creators: Creator[] = [
    {
        id: 'khoubai',
        slug: 'khoubai',
        name: 'Khoubaib Kouas',
        avatar: '/images/creators/khoubai.jpg', // Placeholder, need to ensure this exists or use external
        bio: {
            en: "An Algerian content creator traveling the world and showcasing the beauty of Algeria.",
            fr: "Créateur de contenu algérien voyageant à travers le monde et montrant la beauté de l'Algérie.",
            ar: "صانع محتوى جزائري يسافر حول العالم ويبرز جمال الجزائر."
        },
        socials: {
            instagram: 'https://www.instagram.com/khoubai',
            youtube: 'https://www.youtube.com/@KhoubaibKouas'
        },
        stats: {
            followers: "1.8M"
        },
        content: [
            {
                id: 'DTqVPnvCJ1l',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DTqVPnvCJ1l/',
                title: 'Algerian Sahara Magic',
                wilayas: ['djanet', 'tamanrasset']
            },
            {
                id: 'DQkHBnUCDkt',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DQkHBnUCDkt/',
                title: 'Traditional Vibes',
                wilayas: ['ghardaia']
            },
            {
                id: 'DFvd8uUIo3W',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DFvd8uUIo3W/',
                title: 'Hidden Gems',
                wilayas: ['bejaia', 'jijel']
            },
            {
                id: 'C_Q4BVSuTgP',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/C_Q4BVSuTgP/',
                title: 'Algiers Casbah',
                wilayas: ['algiers']
            },
            {
                id: 'C0meQB9IJak',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/C0meQB9IJak/',
                title: 'Food Tour',
                wilayas: ['oran', 'algiers']
            },
            {
                id: 'CpYMLnNry-v',
                type: 'instagram',
                url: 'https://www.instagram.com/p/CpYMLnNry-v/',
                title: 'Khoubai in Sahara',
                wilayas: ['sahara']
            },
            {
                id: 'CgzttRSLwbk',
                type: 'instagram',
                url: 'https://www.instagram.com/p/CgzttRSLwbk/',
                title: 'Algerian Culture',
                wilayas: ['algiers']
            },
            {
                id: 'CpDJX5pj_fv',
                type: 'instagram',
                url: 'https://www.instagram.com/p/CpDJX5pj_fv/',
                title: 'Discovery Trip',
                wilayas: ['temouchent']
            },
            {
                id: 'C0PbDMArVp-',
                type: 'instagram',
                url: 'https://www.instagram.com/p/C0PbDMArVp-/',
                title: 'Algerian Landscapes',
                wilayas: ['bejaia']
            },
            {
                id: 'CULMQjlonfr',
                type: 'instagram',
                url: 'https://www.instagram.com/p/CULMQjlonfr/',
                title: 'Traditional Market',
                wilayas: ['ghardaia']
            },
            {
                id: 'CDrAAXpnprg',
                type: 'instagram',
                url: 'https://www.instagram.com/p/CDrAAXpnprg/',
                title: 'Algerian Heritage',
                wilayas: ['tlemcen']
            }
        ]
    }
];
