export interface Wilaya {
    code: number;
    slug: string;
    name: { en: string; ar: string };
    image?: string;
}

export const wilayas: Wilaya[] = [
    { code: 1, slug: "adrar", name: { en: "Adrar", ar: "أدرار" } },
    { code: 2, slug: "chlef", name: { en: "Chlef", ar: "الشلف" } },
    { code: 3, slug: "laghouat", name: { en: "Laghouat", ar: "الأغواط" } },
    { code: 4, slug: "oum-el-bouaghi", name: { en: "Oum El Bouaghi", ar: "أم البواقي" } },
    { code: 5, slug: "batna", name: { en: "Batna", ar: "باتنة" } },
    { code: 6, slug: "bejaia", name: { en: "Béjaïa", ar: "بجاية" } },
    { code: 7, slug: "biskra", name: { en: "Biskra", ar: "بسكرة" } },
    { code: 8, slug: "bechar", name: { en: "Béchar", ar: "بشار" } },
    { code: 9, slug: "blida", name: { en: "Blida", ar: "البليدة" } },
    { code: 10, slug: "bouira", name: { en: "Bouira", ar: "البويرة" } },
    { code: 11, slug: "tamanrasset", name: { en: "Tamanrasset", ar: "تمنراست" } },
    { code: 12, slug: "tebessa", name: { en: "Tébessa", ar: "تبسة" } },
    { code: 13, slug: "tlemcen", name: { en: "Tlemcen", ar: "تلمسان" } },
    { code: 14, slug: "tiaret", name: { en: "Tiaret", ar: "تيارت" } },
    { code: 15, slug: "tizi-ouzou", name: { en: "Tizi Ouzou", ar: "تيزي وزو" } },
    { code: 16, slug: "algiers", name: { en: "Algiers", ar: "الجزائر" } },
    { code: 17, slug: "djelfa", name: { en: "Djelfa", ar: "الجلفة" } },
    { code: 18, slug: "jijel", name: { en: "Jijel", ar: "جيجل" } },
    { code: 19, slug: "setif", name: { en: "Sétif", ar: "سطيف" } },
    { code: 20, slug: "saida", name: { en: "Saïda", ar: "سعيدة" } },
    { code: 21, slug: "skikda", name: { en: "Skikda", ar: "سكيكدة" } },
    { code: 22, slug: "sidi-bel-abbes", name: { en: "Sidi Bel Abbès", ar: "سيدي بلعباس" } },
    { code: 23, slug: "annaba", name: { en: "Annaba", ar: "عنابة" } },
    { code: 24, slug: "guelma", name: { en: "Guelma", ar: "قالمة" } },
    { code: 25, slug: "constantine", name: { en: "Constantine", ar: "قسنطينة" } },
    { code: 26, slug: "medea", name: { en: "Médéa", ar: "المدية" } },
    { code: 27, slug: "mostaganem", name: { en: "Mostaganem", ar: "مستغانم" } },
    { code: 28, slug: "msila", name: { en: "M'Sila", ar: "المسيلة" } },
    { code: 29, slug: "mascara", name: { en: "Mascara", ar: "معسكر" } },
    { code: 30, slug: "ouargla", name: { en: "Ouargla", ar: "ورقلة" } },
    { code: 31, slug: "oran", name: { en: "Oran", ar: "وهران" } },
    { code: 32, slug: "el-bayadh", name: { en: "El Bayadh", ar: "البيض" } },
    { code: 33, slug: "illizi", name: { en: "Illizi", ar: "إليزي" } },
    { code: 34, slug: "bordj-bou-arreridj", name: { en: "Bordj Bou Arréridj", ar: "برج بوعريريج" } },
    { code: 35, slug: "boumerdes", name: { en: "Boumerdès", ar: "بومرداس" } },
    { code: 36, slug: "el-tarf", name: { en: "El Tarf", ar: "الطارف" } },
    { code: 37, slug: "tindouf", name: { en: "Tindouf", ar: "تندوف" } },
    { code: 38, slug: "tissemsilt", name: { en: "Tissemsilt", ar: "تيسمسيلت" } },
    { code: 39, slug: "el-oued", name: { en: "El Oued", ar: "الوادي" } },
    { code: 40, slug: "khenchela", name: { en: "Khenchela", ar: "خنشلة" } },
    { code: 41, slug: "souk-ahras", name: { en: "Souk Ahras", ar: "سوق أهراس" } },
    { code: 42, slug: "tipaza", name: { en: "Tipaza", ar: "تيبازة" } },
    { code: 43, slug: "mila", name: { en: "Mila", ar: "ميلة" } },
    { code: 44, slug: "ain-defla", name: { en: "Aïn Defla", ar: "عين الدفلى" } },
    { code: 45, slug: "naama", name: { en: "Naâma", ar: "النعامة" } },
    { code: 46, slug: "ain-temouchent", name: { en: "Aïn Témouchent", ar: "عين تموشنت" } },
    { code: 47, slug: "ghardaia", name: { en: "Ghardaïa", ar: "غرداية" } },
    { code: 48, slug: "relizane", name: { en: "Relizane", ar: "غليزان" } },
];

export function getWilayaBySlug(slug: string): Wilaya | undefined {
    return wilayas.find((w) => w.slug === slug);
}

export function getWilayaName(wilaya: Wilaya, locale: string): string {
    return locale === "ar" ? wilaya.name.ar : wilaya.name.en;
}
