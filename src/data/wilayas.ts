export interface Wilaya {
    code: number;
    slug: string;
    name: { en: string; ar: string };
    image?: string;
    tagline?: { en: string; ar: string };
    description?: { en: string; ar: string };
    history?: { en: string; ar: string };
    funFacts?: { en: string[]; ar: string[] };
    bestPlaces?: { name: { en: string; ar: string }; image: string }[];
}

export const wilayas: Wilaya[] = [
    {
        code: 16,
        slug: "algiers",
        name: { en: "Algiers", ar: "الجزائر العاصمة" },
        image: "/images/wilayas/Algiers/hero.jpg",
        tagline: { en: "The White City", ar: "المحروسة" },
        description: {
            en: "Algiers is a captivating blend of history and modernity, where the ancient Casbah cascades down to the sparkling Mediterranean bay. Known as \"Algiers the White,\" it offers a journey through Ottoman palaces, French colonial architecture, and vibrant contemporary life.",
            ar: "الجزائر \"المحروسة\" أو \"البيضاء\"، مزيج ساحر يعانق فيه التاريخ عبق الحداثة. تمتد من أزقة القصبة العتيقة نزولاً إلى خليج المتوسط المتلألئ. هي رحلة عبر الزمن، من القصور العثمانية والمعمار الكولونيالي إلى نبض الحياة العصرية في قلب العاصمة."
        },
        funFacts: {
            en: [
                "The Casbah is a UNESCO World Heritage site and a masterpiece of Islamic architecture.",
                "It has one of the longest continuous promenades in Africa (Sablière)."
            ],
            ar: [
                "\"القصبة\" ليست مجرد حي قديم، بل هي تحفة معمارية إسلامية مصنفة ضمن التراث العالمي لليونسكو.",
                "تمتلك العاصمة واحدة من أجمل الواجهات البحرية في حوض المتوسط (الواجهة البحرية)."
            ]
        },
        bestPlaces: [
            { name: { en: "The Casbah of Algiers", ar: "قصبة الجزائر العتيقة" }, image: "/images/wilayas/Algiers/casbah.webp" },
            { name: { en: "Djamaa el Djazaïr (Great Mosque of Algiers)", ar: "جامع الجزائر الأعظم" }, image: "/images/wilayas/Algiers/mosque.jpg" },
            { name: { en: "The Hamma Garden of Experiments", ar: "حديقة التجارب بالحامة" }, image: "/images/wilayas/Algiers/hamma.webp" },
            { name: { en: "Notre Dame d'Afrique", ar: "السيدة الإفريقية (نوتردام دافريك)" }, image: "/images/wilayas/Algiers/notre_dame.webp" },
        ]
    },
    {
        code: 31,
        slug: "oran",
        name: { en: "Oran", ar: "وهران" },
        image: "/images/wilayas/Oran/hero.jpg",
        tagline: { en: "The Radiant", ar: "الباهية" },
        description: {
            en: "Oran is Algeria's vibrant western capital, famous for its music (Rai), Spanish-influenced architecture, and stunning coastal views. It is a city of celebration, culture, and golden sunsets over the Santa Cruz fort.",
            ar: "وهران \"الباهية\"، عاصمة الغرب الجزائري النابضة بالحياة. مهد فن الراي العالمي ومدينة تعكس تاريخاً طويلاً من التنوع الثقافي والمعماري. من حصن سانتا كروز المطل على الميناء إلى كورنيشها الساحر، وهران هي عنوان للفرح والأصالة."
        },
        funFacts: {
            en: [
                "It is the birthplace of Rai music, now recognized by UNESCO.",
                "The Fort of Santa Cruz was built by the Spanish in the 16th century."
            ],
            ar: [
                "هي مهد موسيقى \"الراي\" التي وصلت للعالمية وصنفت تراثاً إنسانياً.",
                "قلعة \"سانتا كروز\" الشهيرة بناها الإسبان في القرن السادس عشر ولا تزال تحرس المدينة."
            ]
        },
        bestPlaces: [
            { name: { en: "Fort Santa Cruz", ar: "قلعة وكنيسة سانتا كروز" }, image: "/images/wilayas/Oran/santa_cruz.jpg" },
            { name: { en: "Place du 1er Novembre", ar: "ساحة أول نوفمبر (ساحة السلاح سابقاً)" }, image: "/images/wilayas/Oran/place_1er_nov.jpg" },
            { name: { en: "Ahmed Zabana Museum", ar: "متحف أحمد زبانة" }, image: "/images/wilayas/Oran/zabana_museum.jpg" },
        ]
    },
    {
        code: 25,
        slug: "constantine",
        name: { en: "Constantine", ar: "قسنطينة" },
        image: "/images/wilayas/Constantine/hero.webp",
        tagline: { en: "The City of Bridges", ar: "مدينة الجسور المعلقة" },
        description: {
            en: "Defying gravity, Constantine is perched atop a massive limestone plateau split by a dramatic gorge. Known as the \"City of Bridges,\" it is one of the oldest cities in the world, offering breathtaking views and a deep, scholarly history.",
            ar: "قسنطينة، مدينة تتحدى الجاذبية وتطفو فوق صخرة عتيقة يشقها وادي الرمال العميق. \"مدينة الجسور المعلقة\" وعاصمة الثقافة والعلم، تعد من أقدم مدن العالم المأهولة، حيث يلتقي سحر الطبيعة القاسي بعبقرية الهندسة البشرية."
        },
        funFacts: {
            en: [
                "It has seven iconic bridges connecting the city's neighborhoods across the gorge.",
                "The city is over 2,500 years old, dating back to the Numidian kings."
            ],
            ar: [
                "تشتهر بجسورها السبعة التي تربط أطراف المدينة فوق الهاوية، مما يمنحها منظراً لا مثيل له في العالم.",
                "تاريخها يمتد لأكثر من 2500 سنة، كانت عاصمة للمملكة النوميدية وتنفست حضارات متعاقبة."
            ]
        },
        bestPlaces: [
            { name: { en: "Sidi M'Cid Bridge", ar: "جسر سيدي مسيد المعلق" }, image: "/images/wilayas/Constantine/sidi_mcid.jpg" },
            { name: { en: "Palace of Ahmed Bey", ar: "قصر أحمد باي" }, image: "/images/wilayas/Constantine/ahmed_bey.jpg" },
            { name: { en: "Emir Abdelkader Mosque", ar: "مسجد الأمير عبد القادر" }, image: "/images/wilayas/Constantine/emir_abdelkader.webp" },
            { name: { en: "Monument to the Dead", ar: "نصب الأموات" }, image: "/images/wilayas/Constantine/monument_dead.webp" },
        ]
    },
    {
        code: 23,
        slug: "annaba",
        name: { en: "Annaba", ar: "عنابة" },
        image: "/images/wilayas/Annaba/hero.webp",
        tagline: { en: "The Jujube City", ar: "جوهرة الشرق" },
        description: {
            en: "Annaba is a coastal gem where lush mountains meet the turquoise sea. Famous for the ruins of Hippo Regius and Saint Augustine, it combines pristine beaches with a rich intellectual and historical legacy.",
            ar: "عنابة \"جوهرة الشرق\" ومدينة العناب، حيث تعانق جبال الإيدوغ خضرة البحر المتوسط. هي مدينة القديس أوغسطين وآثار \"هيبون\" العريقة. تجمع عنابة بين جمال شواطئها الذهبية وعمق تاريخها الروماني والفينيقي العريق."
        },
        funFacts: {
            en: [
                "It was home to Saint Augustine, one of the most influential philosophers in history.",
                "Its \"Corniche\" is famous for its vibrant nightlife and views."
            ],
            ar: [
                "كانت موطن القديس أوغسطين، أحد أهم الفلاسفة في التاريخ، بمدينة \"هيبون\" القديمة.",
                "كورنيش عنابة يعتبر من أجمل أماكن النزهة والسهر العائلي في الجزائر."
            ]
        },
        bestPlaces: [
            { name: { en: "Hippo Regius Ruins", ar: "آثار هيبون القديمة" }, image: "/images/wilayas/Annaba/hippo_regius.webp" },
            { name: { en: "Basilica of St. Augustine", ar: "كنيسة القديس أوغسطين" }, image: "/images/wilayas/Annaba/st_augustine.jpg" },
            { name: { en: "Seraïdi Mountains & Beach", ar: "جبال وشاطئ سرايدي" }, image: "/images/wilayas/Annaba/seraidi.jpg" },
            { name: { en: "Ain Achir Beach", ar: "منارة رأس الحمراء" }, image: "/images/wilayas/Annaba/ain_achir.JPG" },
        ]
    },
    {
        code: 28,
        slug: "msila",
        name: { en: "M'sila", ar: "المسيلة" },
        image: "/images/wilayas/Msila/hero.webp",
        tagline: { en: "Capital of the Hodna", ar: "عاصمة الحضنة" },
        description: {
            en: "M'sila offers a journey into the medieval history of Algeria. Located in the Hodna basin, it is the gateway to the famous Kalaa of Beni Hammad, a UNESCO site that reflects the glory of the Hammadid dynasty.",
            ar: "المسيلة، \"عاصمة الحضنة\" وحاضنة التاريخ الإسلامي الوسيط. هي بوابة لاكتشاف قلعة بني حماد العظيمة، المصنفة عالمياً. تتميز بطبيعتها شبه الصحراوية وتراثها الشعبي الأصيل، وهي محطة أساسية لعشاق التاريخ والآثار."
        },
        funFacts: {
            en: [
                "It houses the Kalaa of Beni Hammad, the first capital of the Hammadid emirs.",
                "The region is famous for its steppe landscapes and traditional wool crafts."
            ],
            ar: [
                "تحتضن \"قلعة بني حماد\"، أول عاصمة للدولة الحمادية وشاهد على رقي العمارة الإسلامية.",
                "تشتهر المنطقة بصناعاتها التقليدية وطبيعتها السهبية التي تربط الشمال بالجنوب."
            ]
        },
        bestPlaces: [
            { name: { en: "Al Kalaa of Beni Hammad (UNESCO)", ar: "قلعة بني حماد (يونسكو)" }, image: "/images/wilayas/Msila/kalaa.webp" },
            { name: { en: "The Hodna Chott (Salt Lake)", ar: "شط الحضنة (بحيرة ملحية)" }, image: "/images/wilayas/Msila/hodna.webp" },
            { name: { en: "Bousaada Oasis (nearby)", ar: "مدينة بوسعادة السياحية (قريبة)" }, image: "/images/wilayas/Msila/bousaada.png" },
            { name: { en: "Mosque of Omar ibn Elkhetab", ar: "مسجد عمر بن الخطاب (المعاضيد)" }, image: "/images/wilayas/Msila/mosquee.webp" },
        ]
    },
    {
        code: 7,
        slug: "biskra",
        name: { en: "Biskra", ar: "بسكرة" },
        image: "/images/wilayas/Biskra/hero.jpg",
        tagline: { en: "Queen of the Zibans", ar: "عروس الزيبان" },
        description: {
            en: "Biskra is the golden gate to the Sahara. Known for its world-famous \"Deglet Nour\" dates and healing thermal baths, strictly a winter paradise where palm groves stretch as far as the eye can see under a warm sun.",
            ar: "بسكرة \"عروس الزيبان\" وبوابة الصحراء الذهبية. موطن تمر \"دقلة نور\" الشهير عالمياً وملاذ الباحثين عن الراحة في حماماتها المعدنية الشافية. واحاتها الممتدة وشمسها الدافئة شتاءً تجعل منها وجهة سياحية استثنائية."
        },
        funFacts: {
            en: [
                "It produces the highest quality dates in the world.",
                "The distinct architecture uses local clay bricks for natural cooling."
            ],
            ar: [
                "تُنتج أجود أنواع التمور في العالم (دقلة نور).",
                "ألهمت بسكرة العديد من الفنانين والكتاب الأوروبيين بجمال واحاتها وضوئها الساحر."
            ]
        },
        bestPlaces: [
            { name: { en: "The Garden of London (Jardin Landon)", ar: "حديقة لاندون الساحرة" }, image: "/images/wilayas/Biskra/jardin_london.webp" },
            { name: { en: "Hammam Salhine (Roman Baths)", ar: "حمام الصالحين (حمامات رومانية قديمة)" }, image: "/images/wilayas/Biskra/hammam_salhine.jpg" },
            { name: { en: "El Kantara Gorge", ar: "مضيق القنطرة (البوابة الطبيعية للصحراء)" }, image: "/images/wilayas/Biskra/el_kantra.jpg" },
            { name: { en: "Tolga Palm Groves", ar: "واحات طولقة" }, image: "/images/wilayas/Biskra/tolga.jpg" },
        ]
    },
    {
        code: 11,
        slug: "tamanrasset",
        name: { en: "Tamanrasset", ar: "تمنراست" },
        image: "/images/wilayas/Tamanrasset/hero.jpg",
        tagline: { en: "The Capital of the Ahaggar", ar: "عاصمة الهقار" },
        description: {
            en: "Tamanrasset is the beating heart of the Algerian Sahara and the Tuareg culture. Surrounded by the volcanic Hoggar Mountains, it offers one of the most spectacular landscapes on Earth, including the spiritual hermitage of Assekrem.",
            ar: "تمنراست، عاصمة الأهقار وقلب الصحراء النابض. أرض \"الرجال الزرق\" (الطوارق) وجبال الهقار البركانية الشاهقة التي تعانق السماء. هنا، في \"الأسكرام\"، يمكنك مشاهدة أحد أجمل شروق وغروب للشمس في العالم، في مشهد يخطف الأنفاس."
        },
        funFacts: {
            en: [
                "The Assekrem peak offers what is often called the \"best sunrise in the world.\"",
                "It is the cultural hub of the Tuareg people and their Imzad music (UNESCO)."
            ],
            ar: [
                "قمة \"الأسكرام\" توفر مشهداً لشروق الشمس يعتبره الكثيرون الأجمل في العالم.",
                "هي الحاضنة لثقافة الطوارق العريقة وموسيقى الإمزاد المصنفة تراثاً عالمياً."
            ]
        },
        bestPlaces: [
            { name: { en: "Assekrem Plateau", ar: "هضبة الأسكرام" }, image: "/images/wilayas/Tamanrasset/assekrem.webp" },
            { name: { en: "Hoggar National Park", ar: "الحظيرة الثقافية للأهقار" }, image: "/images/wilayas/Tamanrasset/hoggar.jpg" },
            { name: { en: "Hermitage of Charles de Foucauld", ar: "محبسة شارل دو فوكو" }, image: "/images/wilayas/Tamanrasset/hermitage.jpg" },
            { name: { en: "Guelta d'Afilal", ar: "قلة أفيلال (واحة مائية)" }, image: "/images/wilayas/Tamanrasset/guelta.jpg" },
        ]
    },
    // ... rest of simple wilayas
    { code: 1, slug: "adrar", name: { en: "Adrar", ar: "أدرار" } },
    { code: 2, slug: "chlef", name: { en: "Chlef", ar: "الشلف" } },
    { code: 3, slug: "laghouat", name: { en: "Laghouat", ar: "الأغواط" } },
    { code: 4, slug: "oum-el-bouaghi", name: { en: "Oum El Bouaghi", ar: "أم البواقي" } },
    { code: 5, slug: "batna", name: { en: "Batna", ar: "باتنة" } },
    { code: 6, slug: "bejaia", name: { en: "Béjaïa", ar: "بجاية" } },
    { code: 8, slug: "bechar", name: { en: "Béchar", ar: "بشار" } },
    { code: 9, slug: "blida", name: { en: "Blida", ar: "البليدة" } },
    { code: 10, slug: "bouira", name: { en: "Bouira", ar: "البويرة" } },
    { code: 12, slug: "tebessa", name: { en: "Tébessa", ar: "تبسة" } },
    { code: 13, slug: "tlemcen", name: { en: "Tlemcen", ar: "تلمسان" } },
    { code: 14, slug: "tiaret", name: { en: "Tiaret", ar: "تيارت" } },
    { code: 15, slug: "tizi-ouzou", name: { en: "Tizi Ouzou", ar: "تيزي وزو" } },
    { code: 17, slug: "djelfa", name: { en: "Djelfa", ar: "الجلفة" } },
    { code: 18, slug: "jijel", name: { en: "Jijel", ar: "جيجل" } },
    { code: 19, slug: "setif", name: { en: "Sétif", ar: "سطيف" } },
    { code: 20, slug: "saida", name: { en: "Saïda", ar: "سعيدة" } },
    { code: 21, slug: "skikda", name: { en: "Skikda", ar: "سكيكدة" } },
    { code: 22, slug: "sidi-bel-abbes", name: { en: "Sidi Bel Abbès", ar: "سيدي بلعباس" } },
    { code: 24, slug: "guelma", name: { en: "Guelma", ar: "قالمة" } },
    { code: 26, slug: "medea", name: { en: "Médéa", ar: "المدية" } },
    { code: 27, slug: "mostaganem", name: { en: "Mostaganem", ar: "مستغانم" } },
    { code: 29, slug: "mascara", name: { en: "Mascara", ar: "معسكر" } },
    { code: 30, slug: "ouargla", name: { en: "Ouargla", ar: "ورقلة" } },
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
