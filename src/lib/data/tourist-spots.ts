export interface TouristSpot {
    id: string;
    name: {
        en: string;
        ar: string;
        fr: string;
    };
    wilaya: string;
    city: string;
    location: {
        lat: number;
        lng: number;
    };
    mapsUrl: string;
    image: string;
    type: "nature" | "cultural";
}

export const touristSpots: TouristSpot[] = [
    // Algiers
    {
        id: "reghaia-lake",
        name: { en: "Reghaia Lake", ar: "بحيرة الرغاية", fr: "Lac de Réghaïa" },
        wilaya: "algiers",
        city: "Algiers",
        location: { lat: 36.77139, lng: 3.34389 },
        mapsUrl: "https://maps.google.com/?q=36.77139,3.34389",
        image: "/images/Tourist Spots in map images/Reghaia_Lake.webp",
        type: "nature"
    },
    {
        id: "reghaia-forest",
        name: { en: "Reghaia Forest", ar: "غابة الرغاية", fr: "Forêt de Réghaïa" },
        wilaya: "algiers",
        city: "Algiers",
        location: { lat: 36.77167, lng: 3.33944 },
        mapsUrl: "https://maps.google.com/?q=36.77167,3.33944",
        image: "/images/Tourist Spots in map images/Reghaia_Forest.jpg",
        type: "nature"
    },
    {
        id: "sidi-fredj-beach",
        name: { en: "Sidi Fredj Beach", ar: "شاطئ سيدي فرج", fr: "Plage de Sidi Fredj" },
        wilaya: "algiers",
        city: "Algiers",
        location: { lat: 36.764961, lng: 2.848203 },
        mapsUrl: "https://maps.google.com/?q=36.764961,2.848203",
        image: "/images/Tourist Spots in map images/Sidi_Fredj_Beach.webp",
        type: "nature"
    },
    {
        id: "botanical-garden-hamma",
        name: { en: "Botanical Garden Hamma", ar: "حديقة التجارب الحامة", fr: "Jardin d’Essai du Hamma" },
        wilaya: "algiers",
        city: "Algiers",
        location: { lat: 36.748, lng: 3.076 },
        mapsUrl: "https://maps.google.com/?q=36.748,3.076",
        image: "/images/Tourist Spots in map images/Botanical_Garden_Hamma.webp",
        type: "nature"
    },
    {
        id: "sables-dor-beach",
        name: { en: "Sables D’or Beach", ar: "شاطئ سابل دور", fr: "Plage des Sables d’Or" },
        wilaya: "algiers",
        city: "Algiers",
        location: { lat: 36.72755, lng: 2.83658 },
        mapsUrl: "https://maps.google.com/?q=36.72755,2.83658",
        image: "/images/Tourist Spots in map images/Sables_dOr_Beach.jpg",
        type: "nature"
    },
    // Constantine
    {
        id: "sidi-mcid-bridge",
        name: { en: "Sidi M’Cid Bridge", ar: "جسر سيدي مسيد", fr: "Pont Sidi M’Cid" },
        wilaya: "constantine",
        city: "Constantine",
        location: { lat: 36.372444, lng: 6.614222 },
        mapsUrl: "https://maps.google.com/?q=36.372444,6.614222",
        image: "/images/Tourist Spots in map images/Sidi_MCid_Bridge.jpg",
        type: "cultural"
    },
    {
        id: "tiddis-ruins",
        name: { en: "Tiddis (ancient Roman ruins)", ar: "تيديس", fr: "Tiddis" },
        wilaya: "constantine",
        city: "Constantine",
        location: { lat: 36.463333, lng: 6.483889 },
        mapsUrl: "https://maps.google.com/?q=36.463333,6.483889",
        image: "/images/Tourist Spots in map images/Tiddis_Ruins.jpg",
        type: "cultural"
    },
    // Oran
    {
        id: "fort-santa-cruz",
        name: { en: "Fort of Santa Cruz", ar: "قلعة سانتا كروز", fr: "Fort de Santa Cruz" },
        wilaya: "oran",
        city: "Oran",
        location: { lat: 35.707026, lng: -0.665374 },
        mapsUrl: "https://maps.google.com/?q=35.707026,-0.665374",
        image: "/images/Tourist Spots in map images/Santa_Cruz_Fort.jpg",
        type: "cultural"
    },
    {
        id: "madagh-beach",
        name: { en: "Madagh Beach", ar: "شاطئ مديات", fr: "Plage de Madagh" },
        wilaya: "oran",
        city: "Oran",
        location: { lat: 35.64028, lng: -1.06028 },
        mapsUrl: "https://maps.google.com/?q=35.64028,-1.06028",
        image: "/images/Tourist Spots in map images/Madagh_Beach.jpg",
        type: "nature"
    },
    {
        id: "cap-falcon-beach",
        name: { en: "Cap Falcon Beach", ar: "شاطئ كاب فالكون", fr: "Plage de Cap Falcon" },
        wilaya: "oran",
        city: "Oran",
        location: { lat: 35.77258, lng: -0.79651 },
        mapsUrl: "https://maps.google.com/?q=35.77258,-0.79651",
        image: "/images/Tourist Spots in map images/Cap_Falcon_Beach.jpg",
        type: "nature"
    },
    // M'Sila
    {
        id: "beni-hammad-fort",
        name: { en: "Qal’at Beni Hammad", ar: "قلعة بني حمّاد", fr: "Kalâa des Beni Hammad" },
        wilaya: "msila",
        city: "M'Sila",
        location: { lat: 35.83333, lng: 4.78667 },
        mapsUrl: "https://maps.google.com/?q=35.83333,4.78667",
        image: "/images/Tourist Spots in map images/Beni_Hammad_Fort.jpg",
        type: "cultural"
    },
    {
        id: "zaouia-el-hamel",
        name: { en: "Zaouïa Rahmaniya of El Hamel", ar: "الزاوية الرحمانية بالحمّال", fr: "Zaouia Rahmania d’El Hamel" },
        wilaya: "msila",
        city: "M'Sila",
        location: { lat: 35.133, lng: 4.083 },
        mapsUrl: "https://maps.google.com/?q=35.133,4.083",
        image: "/images/Tourist Spots in map images/Zaouia_El_Hamel.jpg",
        type: "cultural"
    },
    {
        id: "bou-saada-oasis",
        name: { en: "Bou Saada Oasis", ar: "واحة بو سعادة", fr: "Oasis de Bou Saada" },
        wilaya: "msila",
        city: "M'Sila",
        location: { lat: 36.766667, lng: 4.583333 },
        mapsUrl: "https://maps.google.com/?q=36.766667,4.583333",
        image: "/images/Tourist Spots in map images/Bou_Saada_Oasis.jpg",
        type: "nature"
    },
    // Tamanrasset
    {
        id: "tin-hinan-tomb",
        name: { en: "Tin Hinan Tomb", ar: "ضريح الملكة تينحنان", fr: "Tombeau de Tin Hinan" },
        wilaya: "tamanrasset",
        city: "Tamanrasset",
        location: { lat: 22.885533, lng: 4.868080 },
        mapsUrl: "https://maps.google.com/?q=22.885533,4.868080",
        image: "/images/Tourist Spots in map images/Tin_Hinan_Tomb.jpg",
        type: "cultural"
    },
    {
        id: "assekrem-plateau",
        name: { en: "Assekrem Plateau", ar: "أسكرام", fr: "Plateau d’Assekrem" },
        wilaya: "tamanrasset",
        city: "Tamanrasset",
        location: { lat: 23.303531, lng: 6.915956 },
        mapsUrl: "https://maps.google.com/?q=23.303531,6.915956",
        image: "/images/Tourist Spots in map images/Assekrem.webp",
        type: "nature"
    },
    // Annaba
    {
        id: "edough-national-park",
        name: { en: "Edough National Park", ar: "الحديقة الوطنية لأدوغ", fr: "Parc national d’Edough" },
        wilaya: "annaba",
        city: "Annaba",
        location: { lat: 36.916667, lng: 7.666667 },
        mapsUrl: "https://maps.google.com/?q=36.916667,7.666667",
        image: "/images/Tourist Spots in map images/Edough_NP.jpg",
        type: "nature"
    },
    {
        id: "saint-augustine-basilica",
        name: { en: "Saint Augustine Basilica", ar: "بازيليك القديس أوغسطين", fr: "Basilique Saint-Augustin" },
        wilaya: "annaba",
        city: "Annaba",
        location: { lat: 36.8819, lng: 7.7447 },
        mapsUrl: "https://maps.google.com/?q=36.8819,7.7447",
        image: "/images/Tourist Spots in map images/St_Augustine_Basilica.jpg",
        type: "cultural"
    },
    // Jijel
    {
        id: "taza-national-park",
        name: { en: "Taza National Park", ar: "حديقة تازة الوطنية", fr: "Parc national de Taza" },
        wilaya: "jijel",
        city: "Jijel",
        location: { lat: 36.682184, lng: 5.614256 },
        mapsUrl: "https://maps.google.com/?q=36.682184,5.614256",
        image: "/images/Tourist Spots in map images/Taza_NP.webp",
        type: "nature"
    },
    {
        id: "island-el-aouana",
        name: { en: "Island of El Aouana", ar: "جزيرة العوانة", fr: "Île d’El Aouana" },
        wilaya: "jijel",
        city: "Jijel",
        location: { lat: 36.78528, lng: 5.60833 },
        mapsUrl: "https://maps.google.com/?q=36.78528,5.60833",
        image: "/images/Tourist Spots in map images/El_Aouana_Island.jpg",
        type: "nature"
    }
];
