export interface Content {
    id: string;
    type: 'instagram' | 'youtube';
    url: string;
    thumbnail?: string;
    wilayas?: string[];
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
    avatar: string;
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
        avatar: '/images/creators/khoubai.jpg',
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
            followers: "1.8M",
            posts: 11
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
    },
    {
        id: 'oussama',
        slug: 'oussama-kaddour',
        name: 'Oussama Kaddour',
        avatar: '/images/creators/oussama-kaddour.jpg',
        bio: {
            en: "Algerian content creator known for his engaging reels showcasing the beauty and diversity of Algeria.",
            fr: "Créateur de contenu algérien connu pour ses reels engageants mettant en valeur la beauté et la diversité de l'Algérie.",
            ar: "صانع محتوى جزائري معروف بمقاطع الريلز التي تبرز جمال وتنوع الجزائر."
        },
        socials: {
            instagram: 'https://www.instagram.com/loussamakaddour/'
        },
        stats: {
            followers: "100K", // Estimating based on typical micro-influencer profiles, user didn't specify
            posts: 10
        },
        content: [
            {
                id: 'DTs5-WXjHcs',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DTs5-WXjHcs/',
                title: 'Algerian Vibes',
                wilayas: []
            },
            {
                id: 'DTqXhQAjCUV',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DTqXhQAjCUV/',
                title: 'Hidden Gems',
                wilayas: []
            },
            {
                id: 'DTS_G6ZDIl7',
                type: 'instagram',
                url: 'https://www.instagram.com/p/DTS_G6ZDIl7/',
                title: 'Travel Diaries',
                wilayas: []
            },
            {
                id: 'DTSt8fWDJpp',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DTSt8fWDJpp/',
                title: 'Sahara Magic',
                wilayas: []
            },
            {
                id: 'DTN7Ys8DKZs',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DTN7Ys8DKZs/',
                title: 'Traditional Life',
                wilayas: []
            },
            {
                id: 'DTBGEpWDA1K',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DTBGEpWDA1K/',
                title: 'City Walk',
                wilayas: []
            },
            {
                id: 'DS0HGSDjHqS',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DS0HGSDjHqS/',
                title: 'Nature Escape',
                wilayas: []
            }
        ]
    },
    {
        id: 'hamlawi',
        slug: 'argelin0',
        name: 'Hamlawi',
        avatar: '/images/creators/argelino0.jpg',
        bio: {
            en: "Algerian creator sharing raw and authentic content about life, culture, and places across Algeria.",
            fr: "Créateur algérien partageant du contenu brut et authentique sur la vie, la culture et les lieux à travers l'Algérie.",
            ar: "صانع محتوى جزائري يشارك محتوى حقيقي وأصلي عن الحياة والثقافة والأماكن عبر الجزائر."
        },
        socials: {
            instagram: 'https://www.instagram.com/argelin0'
        },
        stats: {
            followers: "185K",
            posts: 5
        },
        content: [
            {
                id: 'DUQ9fadDEjj',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DUQ9fadDEjj/',
                title: 'Algeria Raw',
                wilayas: []
            },
            {
                id: 'DTh0JXEjI8r',
                type: 'instagram',
                url: 'https://www.instagram.com/p/DTh0JXEjI8r/',
                title: 'Algerian Life',
                wilayas: []
            },
            {
                id: 'DTBNeDIDNtp',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DTBNeDIDNtp/',
                title: 'Street Culture',
                wilayas: []
            },
            {
                id: 'DSr0rsIDOZO',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DSr0rsIDOZO/',
                title: 'Algerian Moments',
                wilayas: []
            },
            {
                id: 'DPo406qDFoC',
                type: 'instagram',
                url: 'https://www.instagram.com/reel/DPo406qDFoC/',
                title: 'Algeria Unseen',
                wilayas: []
            }
        ]
    }
];