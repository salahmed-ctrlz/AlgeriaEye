export type ExploreCategory = "culture" | "history" | "food" | "clothing";

export interface ExploreItem {
    id: string;
    category: ExploreCategory;
    title: string;
    title_ar: string;
    subtitle: string;
    subtitle_ar: string;
    image: string;
    region: string;
    region_ar: string;
    description: string;
    description_ar: string;
    history: string;
    history_ar: string;
    locations: string[];
    locations_ar: string[];
    media: {
        videoUrl?: string;
        gallery: string[];
    };
    isFeatured?: boolean;
}

// --- CULTURE ITEMS ---
export const CULTURE_ITEMS: ExploreItem[] = [
    {
        id: "fantasia",
        category: "culture",
        title: "The Fantasia (Tbourida)",
        title_ar: "فانتازيا (التبوريدة)",
        subtitle: "The Gunpowder Ceremony",
        subtitle_ar: "مراسم البارود",
        image: "/images/explore/fantasia.jpg",
        region: "High Plateaus",
        region_ar: "الهضاب العليا",
        description: "A spectacular equestrian performance simulating military assaults, deeply rooted in Maghrebi tradition.",
        description_ar: "عرض فروسية مذهل يحاكي الهجمات العسكرية، متجذر بعمق في التقاليد المغاربية.",
        history: "Dating back to the 16th century, the Fantasia creates a bridge between the glorious military past and the present day. It represents the strong bond between the rider and his horse, symbolizing courage, skill, and spiritual connection. Riders, clad in traditional ceremonial dress, charge in a straight line at a gallop and fire their muskets simultaneously at the end of the race, a feat known as 'Baroud'.",
        history_ar: "يعود تاريخ الفانتازيا إلى القرن السادس عشر، وهي تشكل جسراً بين الماضي العسكري المجيد والحاضر. إنها تمثل الرابطة القوية بين الفارس وحصانه، وترمز إلى الشجاعة والمهارة والاتصال الروحي. يهاجم الفرسان، وهم يرتدون الزي الاحتفالي التقليدي، في خط مستقيم بسرعة ويطلقون نيران بنادقهم في وقت واحد في نهاية السباق، وهو عمل يُعرف باسم 'البارود'.",
        locations: ["Djelfa", "Tiaret", "Saida", "Mila"],
        locations_ar: ["الجلفة", "تيارت", "سعيدة", "ميلة"],
        media: {
            videoUrl: "https://www.youtube.com/embed/2R7_YRkAIFw",
            gallery: ["/images/explore/fantasia1.jpg", "/images/explore/fantasia2.jpg"],
        },
    },
    {
        id: "imzad",
        category: "culture",
        title: "Imzad Music",
        title_ar: "موسيقى إمزاد",
        subtitle: "Soul of the Tuareg",
        subtitle_ar: "روح الطوارق",
        image: "/images/explore/imzad.webp",
        region: "Ahaggar / Tamanrasset",
        region_ar: "الأهقار / تمنراست",
        description: "A traditional single-string bowed instrument played exclusively by Tuareg women.",
        description_ar: "آلة وترية تقليدية ذات وتر واحد تعزفها نساء الطوارق حصرياً.",
        history: "Inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity, the Imzad is more than an instrument; it is a pillar of Tuareg culture. While men recite poetry, women play the Imzad to accompany them, creating a melodic synergy that often resolves tribal disputes and celebrates bravery.",
        history_ar: "تم إدراج الإمزاد في القائمة التمثيلية لليونسكو للتراث الثقافي غير المادي للبشرية، وهو أكثر من مجرد آلة موسيقية؛ إنه ركيزة من ركائز ثقافة الطوارق. بينما يلقي الرجال الشعر، تعزف النساء على الإمزاد لمرافقتهم، مما يخلق تآزراً لحنياً غالباً ما يحل النزاعات القبلية ويحتفل بالشجاعة.",
        locations: ["Tamanrasset", "Illizi", "Djanet"],
        locations_ar: ["تمنراست", "إليزي", "جانت"],
        media: {
            videoUrl: "https://www.youtube.com/embed/mk3Xh-ZiXgo",
            gallery: ["/images/explore/imzad-1.jpg", "/images/explore/imzad-2.jpg", "/images/explore/imzad-3.jpg"],
        },
    },
    {
        id: "tuareg-tea",
        category: "culture",
        title: "Tuareg Tea Ceremony",
        title_ar: "حفل الشاي الطوارقي",
        subtitle: "The Three Glasses",
        subtitle_ar: "الكؤوس الثلاث",
        image: "/images/explore/tea.jpg",
        region: "Sahara",
        region_ar: "الصحراء",
        description: "A slow, ritualistic preparation of green tea with mint, served in three rounds symbolizing life, love, and death.",
        description_ar: "تحضير بطيء وطقوسي للشاي الأخضر بالنعناع، يقدم في ثلاث جولات ترمز إلى الحياة والحب والموت.",
        history: "In the Sahara, tea is not just a drink; it is an excuse for social interaction and a sign of hospitality. The ceremony involves brewing tea over coals and pouring it from a height to create froth 'alkeshkousha'. The first glass is 'bitter like life', the second 'strong like love', and the third 'soft like death'. It is a meditative process that can last for hours.",
        history_ar: "في الصحراء، الشاي ليس مجرد مشروب؛ إنه ذريعة للتفاعل الاجتماعي وعلامة على الضيافة. يتضمن الحفل تخمير الشاي على الفحم وصبه من ارتفاع لتكوين رغوة 'الكشكوشة'. الكأس الأولى 'مرة مثل الحياة'، والثانية 'قوية مثل الحب'، والثالثة 'ناعمة مثل الموت'. إنها عملية تأملية يمكن أن تستمر لساعات.",
        locations: ["Tamanrasset", "Djanet", "Ghardaia"],
        locations_ar: ["تمنراست", "جانت", "غرداية"],
        media: {
            videoUrl: "https://www.youtube.com/embed/vACZA9dGvV4",
            gallery: ["/images/explore/tea-1.jpg", "/images/explore/tea-2.jpg", "/images/explore/tea-3.jpg"],
        },
    },
];

// --- HISTORY ITEMS ---
export const HISTORY_ITEMS: ExploreItem[] = [
    {
        id: "timgad",
        category: "history",
        title: "Timgad Ruins",
        title_ar: "آثار تيمقاد",
        subtitle: "The Pompeii of Africa",
        subtitle_ar: "بومبي أفريقيا",
        image: "/images/explore/timgad.jpg",
        region: "Batna",
        region_ar: "باتنة",
        description: "One of the best-preserved Roman cities in existence, showcasing the perfect grid plan.",
        description_ar: "واحدة من أفضل المدن الرومانية المحفوظة في الوجود، وتعرض المخطط الشبكي المثالي.",
        history: "Founded by Emperor Trajan around 100 AD as a military colony, Timgad (Thamugadi) is a testament to Roman urban planning. Unlike Rome itself, which grew organically, Timgad was built on a strict grid system. It features a magnificent library, thermal baths, and a 3,500-seat theater that still hosts the International Festival of Timgad today.",
        history_ar: "أسسها الإمبراطور تراجان حوالي عام 100 م كمستعمرة عسكرية، تيمقاد (تاموقادي) هي شهادة على التخطيط الحضري الروماني. على عكس روما نفسها، التي نمت بشكل عضوي، تم بناء تيمقاد على نظام شبكي صارم. وتتميز بمكتبة رائعة وحمامات حرارية ومسرح يتسع لـ 3500 مقعد لا يزال يستضيف مهرجان تيمقاد الدولي اليوم.",
        locations: ["Batna", "Timgad"],
        locations_ar: ["باتنة", "تيمقاد"],
        media: {
            videoUrl: "https://www.youtube.com/embed/_qSPXn4IJwI",
            gallery: ["/images/explore/timgad-1.webp", "/images/explore/timgad-2.jpg", "/images/explore/timgad-3.jpg"],
        },
    },
    {
        id: "casbah",
        category: "history",
        title: "Casbah of Algiers",
        title_ar: "قصبة الجزائر",
        subtitle: "The Old Citadel",
        subtitle_ar: "القلعة القديمة",
        image: "/images/explore/casbah.jpg",
        region: "Algiers",
        region_ar: "الجزائر العاصمة",
        description: "A UNESCO World Heritage site, the Casbah is a unique medina with steep, winding streets and Ottoman palaces.",
        description_ar: "موقع للتراث العالمي لليونسكو، القصبة هي مدينة فريدة من نوعها ذات شوارع شديدة الانحدار ومتعرجة وقصور عثمانية.",
        history: "The Casbah is a medina type of city, with high density and community living. It was the heart of the Regency of Algiers and a stronghold during the Battle of Algiers. Its architecture is designed to confuse invaders with dead ends and narrow paths, while preserving the privacy of its inhabitants with inward-facing courtyards.",
        history_ar: "القصبة هي مدينة من نوع المدينة المنورة، ذات كثافة عالية ومعيشة مجتمعية. كانت قلب وصاية الجزائر ومعقلًا أثناء معركة الجزائر. تم تصميم هندستها المعمارية لإرباك الغزاة بطرق مسدودة ومسارات ضيقة، مع الحفاظ على خصوصية سكانها بساحات فناء تواجه الداخل.",
        locations: ["Algiers", "Bab El Oued"],
        locations_ar: ["الجزائر العاصمة", "باب الواد"],
        media: {
            gallery: ["/images/explore/casbah-1.jpg", "/images/explore/casbah-2.jpg"],
        },
    },
    {
        id: "beni-hammad",
        category: "history",
        title: "Al Qal'a of Beni Hammad",
        title_ar: "قلعة بني حماد",
        subtitle: "The First Hammadid Capital",
        subtitle_ar: "العاصمة الحمادية الأولى",
        image: "/images/explore/beni_hammad.jpg",
        region: "M'Sila",
        region_ar: "المسيلة",
        description: "The ruins of the first capital of the Hammadid emirs, founded in 1007 and destroyed in 1152.",
        description_ar: "أطلال العاصمة الأولى للأمراء الحماديين، تأسست عام 1007 ودمرت عام 1152.",
        history: "Located in the Maadid mountains, this site provides an authentic picture of a fortified Muslim city. The mosque is one of the largest in Algeria, with a prayer hall of 13 aisles and 8 bays. The influence of Beni Hammad's architecture can be seen in later developments like the Giralda in Seville.",
        history_ar: "يقع هذا الموقع في جبال المعاضيد، ويقدم صورة أصيلة لمدينة إسلامية محصنة. يعد المسجد من أكبر المساجد في الجزائر، حيث تبلغ قاعة الصلاة فيه 13 ممرًا و 8 خلجان. يمكن رؤية تأثير هندسة بني حماد في التطورات اللاحقة مثل الخيرالدا في إشبيلية.",
        locations: ["M'Sila", "Maadid"],
        locations_ar: ["المسيلة", "المعاضيد"],
        media: {
            gallery: ["/images/explore/beni-hammad-1.jpg", "/images/explore/beni-hammad-2.jpg"],
        },
    },
    {
        id: "grande-poste",
        category: "history",
        title: "Grande Poste d'Alger",
        title_ar: "البريد المركزي بالجزائر",
        subtitle: "Neo-Moorish Masterpiece",
        subtitle_ar: "تحفة مغاربية جديدة",
        image: "/images/explore/grande_poste.jpg",
        region: "Algiers",
        region_ar: "الجزائر العاصمة",
        description: "An iconic Neo-Moorish building in downtown Algiers, built in 1910.",
        description_ar: "مبنى مغاربي جديد مبدع في وسط مدينة الجزائر، تم بناؤه عام 1910.",
        history: "Designed by architects Voinot and Tondoire, the Grande Poste is the epitome of the Neo-Moorish style promoted by the French colonial administration to blend with local aesthetics. expected to become a museum, it remains the heart of Algiers' city center.",
        history_ar: "صممه المهندسان المعماريان فوانو وتوندوار، البريد المركزي هو مثال للنمط المغاربي الجديد الذي روجت له الإدارة الاستعمارية الفرنسية ليمتزج مع الجماليات المحلية. من المتوقع أن يصبح متحفًا، ولا يزال قلب وسط مدينة الجزائر.",
        locations: ["Algiers Centre"],
        locations_ar: ["الجزائر الوسطى"],
        media: {
            gallery: ["/images/explore/poste-1.jpg", "/images/explore/poste-2.jpg"],
        },
    }
];

// --- FOOD ITEMS ---
export const FOOD_ITEMS: ExploreItem[] = [
    {
        id: "couscous",
        category: "food",
        title: "Couscous",
        title_ar: "الكسكس",
        subtitle: "The Dish of Unity",
        subtitle_ar: "طبق الوحدة",
        image: "/images/explore/couscous.jpg",
        region: "Nationwide",
        region_ar: "وطني",
        description: "The staple dish of North Africa, made from steamed semolina granules and served with stew.",
        description_ar: "الطبق الرئيسي في شمال إفريقيا، المصنوع من حبيبات السميد المطهوة بالبخار والمقدم مع المرق.",
        history: "Recognized by UNESCO as intangible world heritage, Couscous is the heartbeat of Algerian cuisine. Its preparation is a communal ritual. From the 'Mesfouf' (sweet/dry) of Kabylia to the spicy red sauce versions of the East and the barley couscous of the South, it varies by region but always symbolizes hospitality.",
        history_ar: "معترف به من قبل اليونسكو كتراث عالمي غير مادي، الكسكس هو نبض المطبخ الجزائري. تحضيره هو طقس جماعي. من 'المسفوف' (حلو / جاف) في منطقة القبائل إلى نسخ الصلصة الحمراء الحارة في الشرق وكسكس الشعير في الجنوب، يختلف حسب المنطقة ولكنه يرمز دائمًا إلى الضيافة.",
        locations: ["Tizi Ouzou", "Constantine", "Adrar", "Tlemcen"],
        locations_ar: ["تيزي وزو", "قسنطينة", "أدرار", "تلمسان"],
        media: {
            gallery: ["/images/explore/couscous-1.jpg", "/images/explore/couscous-2.jpg"],
        },
    },
    {
        id: "chakhchoukha",
        category: "food",
        title: "Chakhchoukha",
        title_ar: "الشخشوخة",
        subtitle: "The Shepherd's Dish",
        subtitle_ar: "طبق الرعيان",
        image: "/images/explore/chakhchoukha.jpg",
        region: "Biskra / M'Sila",
        region_ar: "بسكرة / المسيلة",
        description: "A hearty dish of torn flatbread pieces soaked in a rich, spicy tomato stew/sauce with chickpeas and meat.",
        description_ar: "طبق دسم من قطع الخبز المسطح الممزقة المنقوعة في مرق طماطم غني وحار مع الحمص واللحم.",
        history: "Originally a dish for shepherds who would carry dried flatbread (Rogueg) and rehydrate it with sauce, Chakhchoukha has become a festive dish served at weddings and celebrations in the Aurès and Ziban regions. It is famously spicy and rich.",
        history_ar: "في الأصل طبق للرعاة الذين كانوا يحملون الخبز المسطح المجفف (الرقاق) ويعيدون ترطيبه بالمرق، أصبحت الشخشوخة طبقًا احتفاليًا يقدم في حفلات الزفاف والاحتفالات في منطقتي الأوراس والزيبان. تشتهر بكونها حارة وغنية.",
        locations: ["Biskra", "M'Sila", "Batna"],
        locations_ar: ["بسكرة", "المسيلة", "باتنة"],
        media: {
            gallery: ["/images/explore/chakhchoukha-1.jpg"],
        },
    },
    {
        id: "mhajeb",
        category: "food",
        title: "Mhajeb",
        title_ar: "المحاجب",
        subtitle: "Street Food King",
        subtitle_ar: "ملك أكل الشوارع",
        image: "/images/explore/mhajeb.webp",
        region: "Nationwide",
        region_ar: "وطني",
        description: "Flaky, stuffed flatbread usually filled with a spicy tomato and onion mixture (Chekchouka).",
        description_ar: "خبز مسطح قشري محشو عادة بخليط الطماطم والبصل الحار (شكشوكة).",
        history: "Mhajeb is the ultimate Algerian street food. The skill lies in stretching the dough until it is paper-thin without tearing it, then folding it over the filling to create a square pocket. It is cooked on a heavy flat pan/tajine. Variations include added cheese, minced meat, or spicy harissa.",
        history_ar: "المحاجب هي أكل الشوارع الجزائري بامتياز. تكمن المهارة في تمديد العجين حتى يصبح رقيقًا كالورق دون تمزيقه، ثم طيه فوق الحشوة لإنشاء جيب مربع. يتم طبخه على مقلاة مسطحة ثقيلة / طاجين. تشمل التغيرات الجبن المضاف أو اللحم المفروم أو الهريسة الحارة.",
        locations: ["Algiers", "Setif", "Everywhere"],
        locations_ar: ["الجزائر العاصمة", "سطيف", "في كل مكان"],
        media: {
            gallery: ["/images/explore/mhajeb-1.jpg"],
        },
    },
    {
        id: "kelb-ellouz",
        category: "food",
        title: "Kalb El Louz",
        title_ar: "قلب اللوز",
        subtitle: "Heart of Almonds",
        subtitle_ar: "قلب اللوز",
        image: "/images/explore/kalb_el_louz.jpg",
        region: "Algiers / Constantine",
        region_ar: "الجزائر العاصمة / قسنطينة",
        description: "A dense, syrup-soaked semolina cake with an almond filling, essential during Ramadan.",
        description_ar: "كعكة سميد كثيفة غارقة في الشراب مع حشوة اللوز، ضرورية خلال شهر رمضان.",
        history: "A very sweet dessert (Chamia in the West) that pairs perfectly with strong coffee or tea to break the fast or welcome guests. Its name literally means 'Heart of Almonds'.",
        history_ar: "حلوى حلوة جدا (شامية في الغرب) تتناسب تمامًا مع القهوة القوية أو الشاي لكسر الصيام أو الترحيب بالضيوف. اسمها يعني حرفياً 'قلب اللوز'.",
        locations: ["Algiers", "Oran", "Constantine"],
        locations_ar: ["الجزائر العاصمة", "وهران", "قسنطينة"],
        media: {
            gallery: [],
        },
    }
];

// --- CLOTHING ITEMS ---
export const CLOTHING_ITEMS: ExploreItem[] = [
    {
        id: "karakou",
        category: "clothing",
        title: "The Karakou",
        title_ar: "الكاراكو",
        subtitle: "The Queen of Algiers",
        subtitle_ar: "ملكة الجزائر",
        image: "/images/explore/karakou.jpg",
        region: "Algiers",
        region_ar: "الجزائر العاصمة",
        description: "A luxurious velvet jacket embroidered with gold thread (Fetla or Majboud), worn with a 'Seroual Chelqa'.",
        description_ar: "سترة مخملية فاخرة مطرزة بخيوط ذهبية (فتلة أو مجبود)، تلبس مع 'سروال شلقة'.",
        history: "Originating from the 15th century in Algiers, the Karakou is the quintessential wedding attire. The velvet symbolizes nobility, while the intricate gold embroidery tells stories of Andalusian and Ottoman influences merged into a unique Algerian identity.",
        history_ar: "نشأ الكاراكو من القرن الخامس عشر في الجزائر العاصمة، وهو الزي الجوهري لحفلات الزفاف. يرمز المخمل إلى النبل، بينما يروي التطريز الذهبي المعقد قصص التأثيرات الأندلسية والعثمانية المدمجة في هوية جزائرية فريدة.",
        locations: ["Algiers", "Blida"],
        locations_ar: ["الجزائر العاصمة", "البليدة"],
        media: {
            gallery: ["/images/explore/karakou-1.jpg", "/images/explore/karakou-2.jpg"],
        },
    },
    {
        id: "chedda",
        category: "clothing",
        title: "Chedda of Tlemcen",
        title_ar: "شدة تلمسان",
        subtitle: "Royal Bridal Regalia",
        subtitle_ar: "الزي الملكي للعروس",
        image: "/images/explore/Chedda.jpg",
        region: "Tlemcen",
        region_ar: "تلمسان",
        description: "A UNESCO-recognized bridal costume involving multiple layers, heavy jewelry, and a conical velvet headdress.",
        description_ar: "زي زفاف معترف به من قبل اليونسكو يتضمن طبقات متعددة ومجوهرات ثقيلة وغطاء رأس مخملي مخروطي الشكل.",
        history: "The Chedda is a historical dress that was worn by princesses of Zianide Tlemcen. It includes a caftan, a 'blousa', and mountains of pearl and gold jewelry. It represents the bride's transition to royalty on her wedding day and is considered a masterpiece of intangible heritage.",
        history_ar: "الشدة هي فستان تاريخي كانت ترتديه أميرات تلمسان الزيانية. ويشمل قفطانًا و 'بلوزة' وجبالًا من اللؤلؤ والمجوهرات الذهبية. إنه يمثل انتقال العروس إلى الملكية في يوم زفافها ويعتبر تحفة من التراث غير المادي.",
        locations: ["Tlemcen"],
        locations_ar: ["وهران", "تلمسان"],
        media: {
            gallery: ["/images/explore/chedda-1.jpg"],
        },
    },
    {
        id: "burnous",
        category: "clothing",
        title: "The Burnous",
        title_ar: "البرنوس",
        subtitle: "The Cape of Honor",
        subtitle_ar: "عباءة الشرف",
        image: "/images/explore/ghardaia.jpg", // Placeholder - usually white wool cape
        region: "Nationwide",
        region_ar: "وطني",
        description: "A long, hooded wool cloak worn by men, symbolizing dignity, maturity, and authority.",
        description_ar: "عباءة صوفية طويلة بغطاء رأس يرتديها الرجال، ترمز إلى الكرامة والنضج والسلطة.",
        history: "Worn by Berbers for millennia to protect against the harsh mountain and desert weather, the Burnous has deep cultural significance. A coarse brown burnous might be for daily work, while a fine white wool burnous is for weddings and elders. It is also a symbol of peace; 'to throw one's burnous' over a dispute signifies putting an end to conflict.",
        history_ar: "يرتديه البربر منذ آلاف السنين للحماية من قسوة الجبل والطقس الصحراوي، وللبرنوس أهمية ثقافية عميقة. قد يكون البرنوس البني الخشن للعمل اليومي، بينما البرنوس الصوفي الأبيض الناعم لحفلات الزفاف والشيوخ. كما أنه رمز للسلام؛ 'رمي البرنوس' على خلاف يعني وضع حد للصراع.",
        locations: ["Kabylia", "Aurès", "Sahara"],
        locations_ar: ["منطقة القبائل", "الأوراس", "الصحراء"],
        media: {
            gallery: [],
        },
    },
    {
        id: "kabyle-dress",
        category: "clothing",
        title: "Kabyle Dress (Robe Kabyle)",
        title_ar: "الجبة القبائلية",
        subtitle: "Colors of the Mountains",
        subtitle_ar: "ألوان الجبال",
        image: "/images/explore/imzad.jpg", // Placeholder
        region: "Kabylia",
        region_ar: "منطقة القبائل",
        description: "A vibrant, geometric patterned dress usually in yellow, orange, and red, adorned with silver jewelry.",
        description_ar: "فستان ذو أنماط هندسية نابضة بالحياة عادة باللون الأصفر والبرتقالي والأحمر، مزين بمجوهرات فضية.",
        history: "The Kabyle dress has evolved but kept its soul. The geometric patterns (zigzags, triangles) are older than history itself, often representing protective symbols. It is worn with a 'fouta' (striped waist wrapper) and heavy silver interaction jewelry (enamelled silver of Beni Yenni).",
        history_ar: "تطورت الجبة القبائلية لكنها احتفظت بروحها. الأنماط الهندسية (التعرجات، المثلثات) أقدم من التاريخ نفسه، وغالبًا ما تمثل رموزًا وقائية. يتم ارتداؤها مع 'فوطة' (غلاف الخصر المخطط) ومجوهرات فضية ثقيلة (فضة بني يني المطلية بالمينا).",
        locations: ["Tizi Ouzou", "Bejaia", "Bouira"],
        locations_ar: ["تيزي وزو", "بجاية", "البويرة"],
        media: {
            gallery: [],
        },
    }
];
