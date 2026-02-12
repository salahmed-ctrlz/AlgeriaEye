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
        image: "/images/explore/Casbah.jpeg",
        region: "Algiers",
        region_ar: "الجزائر العاصمة",
        description: "A UNESCO World Heritage site, the Casbah is a unique medina with steep, winding streets and Ottoman palaces.",
        description_ar: "موقع للتراث العالمي لليونسكو، القصبة هي مدينة فريدة من نوعها ذات شوارع شديدة الانحدار ومتعرجة وقصور عثمانية.",
        history: "The Casbah is a medina type of city, with high density and community living. It was the heart of the Regency of Algiers and a stronghold during the Battle of Algiers. Its architecture is designed to confuse invaders with dead ends and narrow paths, while preserving the privacy of its inhabitants with inward-facing courtyards.",
        history_ar: "القصبة هي مدينة من نوع المدينة المنورة، ذات كثافة عالية ومعيشة مجتمعية. كانت قلب وصاية الجزائر ومعقلًا أثناء معركة الجزائر. تم تصميم هندستها المعمارية لإرباك الغزاة بطرق مسدودة ومسارات ضيقة، مع الحفاظ على خصوصية سكانها بساحات فناء تواجه الداخل.",
        locations: ["Algiers", "Bab El Oued"],
        locations_ar: ["الجزائر العاصمة", "باب الواد"],
        media: {
            videoUrl: "https://www.youtube.com/embed/8iKUZCssFPY",
            gallery: [
                "/images/explore/Casbah.jpeg",
                "/images/explore/casbah-1.webp",
                "/images/explore/Casbah-2.jpg",
            ],
        },
    },
    {
        id: "beni-hammad",
        category: "history",
        title: "Al Qal'a of Beni Hammad",
        title_ar: "قلعة بني حماد",
        subtitle: "The First Hammadid Capital",
        subtitle_ar: "العاصمة الحمادية الأولى",
        image: "/images/explore/kalaa.webp",
        region: "M'Sila",
        region_ar: "المسيلة",
        description: "The ruins of the first capital of the Hammadid emirs, founded in 1007 and destroyed in 1152.",
        description_ar: "أطلال العاصمة الأولى للأمراء الحماديين، تأسست عام 1007 ودمرت عام 1152.",
        history: "Located in the Maadid mountains, this site provides an authentic picture of a fortified Muslim city. The mosque is one of the largest in Algeria, with a prayer hall of 13 aisles and 8 bays. The influence of Beni Hammad's architecture can be seen in later developments like the Giralda in Seville.",
        history_ar: "يقع هذا الموقع في جبال المعاضيد، ويقدم صورة أصيلة لمدينة إسلامية محصنة. يعد المسجد من أكبر المساجد في الجزائر، حيث تبلغ قاعة الصلاة فيه 13 ممرًا و 8 خلجان. يمكن رؤية تأثير هندسة بني حماد في التطورات اللاحقة مثل الخيرالدا في إشبيلية.",
        locations: ["M'Sila", "Maadid"],
        locations_ar: ["المسيلة", "المعاضيد"],
        media: {
            videoUrl: "https://www.youtube.com/embed/uCZblUCduFo",
            gallery: [
                "/images/explore/kalaa.webp",
                "/images/explore/kalaa-1.webp",
            ],
        },
    },
    {
        id: "mausoleum",
        category: "history",
        title: "Royal Mausoleum of Mauretania",
        title_ar: "الضريح الملكي الموريتاني",
        subtitle: "Tombeau de la Chrétienne",
        subtitle_ar: "قبر الرومية",
        image: "/images/explore/temple.webp",
        region: "Tipaza",
        region_ar: "تيبازة",
        description: "A monumental circular tomb located 60 km west of Algiers, dating back to 3 BC.",
        description_ar: "ضريح دائري ضخم يقع على بعد 60 كم غرب الجزائر العاصمة، يعود تاريخه إلى عام 3 قبل الميلاد.",
        history: "Built by King Juba II and Queen Cleopatra Selene II, this massive stone structure is a masterpiece of Numidian architecture with Hellenistic and Egyptian influences. It overlooks the Mediterranean and remains an enigma, with its hidden chambers and legendary treasures that have never been found.",
        history_ar: "بناه الملك يوبا الثاني والملكة كليوباترا سيليني الثانية، هذا الهيكل الحجري الضخم هو تحفة من العمارة النوميدية مع تأثيرات هلنستية ومصرية. يطل على البحر الأبيض المتوسط ولا يزال لغزًا، بغرفه المخفية وكنوزه الأسطورية التي لم يتم العثور عليها أبدًا.",
        locations: ["Tipaza", "Sidi Rached"],
        locations_ar: ["تيبازة", "سيدي راشد"],
        media: {
            videoUrl: "https://www.youtube.com/embed/AyfupgiOoqQ",
            gallery: [
                "/images/explore/temple.webp",
                "/images/explore/temple-1.jpg",
                "/images/explore/temple-2.jpg",
            ],
        },
    }

];

// --- FOOD ITEMS ---
export const FOOD_ITEMS: ExploreItem[] = [
    {
        id: "salty-dishes",
        category: "food",
        title: "Salty Dishes",
        title_ar: "الأطباق المالحة",
        subtitle: "The Heart of Algerian Cuisine",
        subtitle_ar: "قلب المطبخ الجزائري",
        image: "/images/explore/salty-couscous.jpg",
        region: "Nationwide",
        region_ar: "وطني",
        description: "Couscous, Chakhchoukha, Rechta, Bourak, Doubara, Hmis, Mhajeb, Samsa & Zfiti — the rich and diverse savory dishes that define Algerian identity.",
        description_ar: "كسكس، شخشوخة، رشتة، بوراك، دوبارة، حميس، محاجب، سامسا و زفيتي — الأطباق المالحة الغنية والمتنوعة التي تحدد الهوية الجزائرية.",
        history: "Algerian savory cuisine is a tapestry of Berber, Ottoman, Andalusian, and French influences. Couscous, recognized by UNESCO as intangible world heritage, is the heartbeat — steamed semolina served with rich stews that vary by region. Chakhchoukha, the shepherd's dish from the Aurès, features torn flatbread soaked in spicy tomato sauce. Rechta — thin hand-rolled noodles — graces every Mawlid celebration. Bourak, crispy stuffed pastries, open every Ramadan iftar. Doubara, the chickpea soup of Biskra, and Hmis, the roasted pepper salad, are beloved staples across the country.",
        history_ar: "المطبخ الجزائري المالح نسيج من التأثيرات الأمازيغية والعثمانية والأندلسية والفرنسية. الكسكس، المعترف به من قبل اليونسكو كتراث عالمي غير مادي، هو النبض — سميد مطهو بالبخار يقدم مع مرق غني يختلف حسب المنطقة. الشخشوخة، طبق الرعاة من الأوراس، تتكون من قطع خبز مسطح ممزقة منقوعة في صلصة طماطم حارة. الرشتة — نودلز رقيقة ملفوفة باليد — تزين كل احتفال بالمولد النبوي. البوراك، معجنات مقرمشة محشوة، تفتح كل إفطار رمضاني. الدوبارة، حساء الحمص في بسكرة، والحميس، سلطة الفلفل المشوي، هي أطباق أساسية محبوبة في جميع أنحاء البلاد.",
        locations: ["Algiers", "Constantine", "Biskra", "Tizi Ouzou"],
        locations_ar: ["الجزائر العاصمة", "قسنطينة", "بسكرة", "تيزي وزو"],
        media: {
            gallery: [
                "/images/explore/couscous.jpg",
                "/images/explore/chakhchoukha.jpg",
                "/images/explore/salty-rechta.jpg",
                "/images/explore/salty-bourak.jpg",
                "/images/explore/salty-doubara.jpg",
                "/images/explore/salty-hmis.jpg",
                "/images/explore/salty-mhajeb-1.jpg",
                "/images/explore/salty-mhajeb-2.jpg",
                "/images/explore/salty-samsa.jpg",
                "/images/explore/salty-zfiti.jpg",
            ],
        },
    },
    {
        id: "sweet-treats",
        category: "food",
        title: "Sweet Treats",
        title_ar: "الحلويات",
        subtitle: "Algerian Pastry & Desserts",
        subtitle_ar: "المعجنات والحلويات الجزائرية",
        image: "/images/explore/kalb_el_louz.jpg",
        region: "Nationwide",
        region_ar: "وطني",
        description: "Kalb El Louz, Baklawa, Tamina, Baghrir & Braj — syrup-soaked semolina cakes, layered pastries, and honey-drenched crepes that sweeten every celebration.",
        description_ar: "قلب اللوز، بقلاوة، طمينة، بغرير و براج — كعك السميد المنقوع بالشراب، معجنات متعددة الطبقات، و كريب بالعسل تحلي كل احتفال.",
        history: "Algerian sweets are legendary across the Mediterranean. Kalb El Louz — 'Heart of Almonds' — is a dense semolina cake soaked in syrup, essential during Ramadan. Baklawa, layers of thin phyllo dough filled with almonds and bathed in honey, reflects Ottoman heritage. Tamina, a roasted semolina and honey paste, is prepared to celebrate newborns. Baghrir, the 'thousand-hole crepe', is drizzled with butter and honey for breakfast. Braj, date-filled cookies, are a Saharan specialty shared with coffee.",
        history_ar: "الحلويات الجزائرية أسطورية في جميع أنحاء البحر الأبيض المتوسط. قلب اللوز — كعكة سميد كثيفة غارقة في الشراب، ضرورية خلال رمضان. البقلاوة، طبقات من عجينة فيلو الرقيقة محشوة باللوز ومغمورة بالعسل، تعكس التراث العثماني. الطمينة، عجينة السميد المحمص والعسل، تحضر للاحتفال بالمواليد الجدد. البغرير، 'كريب الألف ثقب'، يُرش بالزبدة والعسل لوجبة الإفطار. البراج، كعك محشو بالتمر، تخصص صحراوي يُشارك مع القهوة.",
        locations: ["Algiers", "Constantine", "Tlemcen", "Ghardaia"],
        locations_ar: ["الجزائر العاصمة", "قسنطينة", "تلمسان", "غرداية"],
        media: {
            gallery: [
                "/images/explore/sweets-baklawa.jpg",
                "/images/explore/sweets-tamina.jpg",
                "/images/explore/sweets-baghrir.jpg",
                "/images/explore/sweets-braj.jpg",
                "/images/explore/sweets-1.jpg",
            ],
        },
    },
    {
        id: "street-food",
        category: "food",
        title: "Street Food",
        title_ar: "أكل الشوارع",
        subtitle: "Quick, Hot & Unforgettable",
        subtitle_ar: "سريع، ساخن ولا يُنسى",
        image: "/images/explore/street-karantika.jpg",
        region: "Nationwide",
        region_ar: "وطني",
        description: "Karantika, Mhajeb, Pizza Carrée — the sizzling, fast, and flavorful bites that fuel Algeria's bustling streets and markets.",
        description_ar: "كرانتيكا، محاجب، بيتزا كاري — اللقمات الساخنة والسريعة واللذيذة التي تغذي شوارع وأسواق الجزائر المزدحمة.",
        history: "Algerian street food is an institution. Karantika (Garantita), a baked chickpea flour custard seasoned with cumin and served with harissa, is the undisputed king — originally from Oran, it has conquered the entire country. Mhajeb, flaky hand-stretched flatbreads stuffed with spicy tomato-onion filling (Chekchouka), require incredible skill to make paper-thin dough. Pizza Carrée, Algeria's unique square pizza sold by the slice, is a Franco-Algerian fusion found on every corner. These are the flavors of daily Algerian life.",
        history_ar: "أكل الشوارع الجزائري مؤسسة قائمة بذاتها. الكرانتيكا (قرنتيطة)، كاسترد دقيق الحمص المخبوز بالكمون ويقدم مع الهريسة، هي الملك بلا منازع — نشأت في وهران وغزت البلاد بأكملها. المحاجب، خبز مسطح مقرمش معجون يدويًا ومحشو بحشوة طماطم وبصل حارة (شكشوكة)، تتطلب مهارة مذهلة لصنع عجين رقيق كالورق. بيتزا كاري، بيتزا الجزائر المربعة الفريدة التي تباع بالشريحة، هي اندماج فرنسي-جزائري موجود في كل زاوية. هذه هي نكهات الحياة الجزائرية اليومية.",
        locations: ["Oran", "Algiers", "Annaba", "Everywhere"],
        locations_ar: ["وهران", "الجزائر العاصمة", "عنابة", "في كل مكان"],
        media: {
            gallery: [
                "/images/explore/street-karantika1.jpg",
                "/images/explore/street-pizzacarre.jpg",
                "/images/explore/mhajeb.webp",
                "/images/explore/salty-mhajeb-1.jpg",
            ],
        },
    },
];

// --- CLOTHING ITEMS ---
// --- CLOTHING ITEMS ---
export const CLOTHING_ITEMS: ExploreItem[] = [
    {
        id: "karakou",
        category: "clothing",
        title: "The Karakou",
        title_ar: "الكاراكو",
        subtitle: "The Queen of Algiers",
        subtitle_ar: "ملكة الجزائر",
        image: "/images/explore/karakou-1.jpg",
        region: "Algiers",
        region_ar: "الجزائر العاصمة",
        description: "A luxurious velvet jacket embroidered with gold thread (Fetla or Majboud), worn with a 'Seroual Chelqa' or 'Mdawer'. It is the centerpiece of the Algiers bridal trousseau.",
        description_ar: "سترة مخملية فاخرة مطرزة بخيوط ذهبية (فتلة أو مجبود)، تلبس مع 'سروال شلقة' أو 'مدور'. إنها القطعة المركزية في جهاز العروس العاصمية.",
        history: "Originating from the 15th century in Algiers, the Karakou is the quintessential wedding attire. The velvet symbolizes nobility, while the intricate gold embroidery tells stories of Andalusian and Ottoman influences merged into a unique Algerian identity. It has evolved from a daily aristocratic dress to a ceremonial masterpiece, often passed down from mother to daughter.",
        history_ar: "نشأ الكاراكو من القرن الخامس عشر في الجزائر العاصمة، وهو الزي الجوهري لحفلات الزفاف. يرمز المخمل إلى النبل، بينما يروي التطريز الذهبي المعقد قصص التأثيرات الأندلسية والعثمانية المدمجة في هوية جزائرية فريدة. تطور من لباس أرستقراطي يومي إلى تحفة احتفالية، غالباً ما تورث من الأم لابنتها.",
        locations: ["Algiers", "Blida", "Tipaza"],
        locations_ar: ["الجزائر العاصمة", "البليدة", "تيبازة"],
        media: {
            gallery: [
                "/images/explore/karakou-1.jpg",
                "/images/explore/karakou-2.jpg",
                "/images/explore/karakou-3.jpg",
                "/images/explore/karakou-4.jpg",
                "/images/explore/karakou-5.jpg",
                "/images/explore/karakou-6.jpg",
                "/images/explore/karakou-7.jpg",
                "/images/explore/karakou-8.jpg",
            ],
        },
    },
    {
        id: "amazigh-attire",
        category: "clothing",
        title: "Amazigh Attire",
        title_ar: "الزي الأمازيغي",
        subtitle: "Colors of North Africa",
        subtitle_ar: "ألوان شمال أفريقيا",
        image: "/images/explore/amazigh-houlisoufi.jpg",
        region: "Kabylia / Aurès / Mzab",
        region_ar: "القبائل / الأوراس / ميزاب",
        description: "From the colorful Zigzag patterns of the Kabyle Dress to the flowing Melhfa of the Chaouia and the woven Houli of the Mzab.",
        description_ar: "من أنماط التعرج الملونة للجبة القبائلية إلى الملحفة المتدفقة للشاوية والحولي المنسوج للميزاب.",
        history: "Amazigh clothing is distinct for its geometric patterns and vibrant colors, representing the connection to the land and the tribe. The 'Robe Kabyle' is famous for its yellow and red hues and silver jewelry. The 'Melhfa Chaouia' is a draped garment held by silver fibulas. These dresses are not just fashion; they are identity markers, with specific patterns often indicating a woman's region or status.",
        history_ar: "تتميز الملابس الأمازيغية بأنماطها الهندسية وألوانها النابضة بالحياة، مما يمثل الارتباط بالأرض والقبيلة. تشتهر 'الجبة القبائلية' بألوانها الصفراء والحمراء والمجوهرات الفضية. 'الملحفة الشاوية' عبارة عن ثوب ملفوف مثبت بمشابك فضية. هذه الفساتين ليست مجرد موضة؛ إنها علامات هوية، حيث تشير أنماط معينة غالبًا إلى منطقة المرأة أو وضعها.",
        locations: ["Tizi Ouzou", "Batna", "Ghardaia"],
        locations_ar: ["تيزي وزو", "باتنة", "غرداية"],
        media: {
            gallery: [
                "/images/explore/amazigh-jubakabyle.jpg",
                "/images/explore/amazigh-melhfachaouia.jpg",
                "/images/explore/amazigh-melhfa.jpg",
                "/images/explore/amazigh-houlisoufi.jpg",
                "/images/explore/amazigh-xyz.jpg",
            ],
        },
    },
    {
        id: "chedda",
        category: "clothing",
        title: "Chedda of Tlemcen",
        title_ar: "شدة تلمسان",
        subtitle: "Royal Bridal Regalia",
        subtitle_ar: "الزي الملكي للعروس",
        image: "/images/explore/chedda-telemcen.jpg",
        region: "Tlemcen",
        region_ar: "تلمسان",
        description: "A UNESCO-recognized bridal costume involving multiple layers of caftans, heavy pearl jewelry, and a conical velvet headdress.",
        description_ar: "زي زفاف معترف به من قبل اليونسكو يتضمن طبقات متعددة من القفاطين، مجوهرات لؤلؤية ثقيلة، وغطاء رأس مخملي مخروطي الشكل.",
        history: "The Chedda is a historical dress worn by the princesses of Zianide Tlemcen. It represents the bride's transition to royalty on her wedding day. The costume consists of a caftan, a 'blousa', and mountains of jewelry. It is considered a masterpiece of intangible heritage, preserving the craftsmanship of Tlemcen's artisans for centuries.",
        history_ar: "الشدة هي فستان تاريخي كانت ترتديه أميرات تلمسان الزيانية. إنها تمثل انتقال العروس إلى الملكية في يوم زفافها. يتكون الزي من قفطان و 'بلوزة' وجبال من المجوهرات. يعتبر تحفة من التراث غير المادي، حيث يحافظ على حرفية الحرفيين في تلمسان لقرون.",
        locations: ["Tlemcen", "Oran"],
        locations_ar: ["تلمسان", "وهران"],
        media: {
            gallery: [
                "/images/explore/chedda-1.jpg",
                "/images/explore/chedda-telemcen.jpg",
                "/images/explore/Chedda.jpg",
            ],
        },
    },
    {
        id: "hayek",
        category: "clothing",
        title: "The Hayek",
        title_ar: "الحايك",
        subtitle: "The White Veil",
        subtitle_ar: "الحجاب الأبيض",
        image: "/images/explore/hayk-3.jpg",
        region: "Algiers / North",
        region_ar: "الجزائر العاصمة / الشمال",
        description: "A traditional large white woolen or silk veil wrapping the body, symbolizing purity, modesty, and resistance.",
        description_ar: "حجاب أبيض تقليدي كبير من الصوف أو الحرير يلف الجسم، يرمز إلى النقاء والتواضع والمقاومة.",
        history: "The Hayek is more than a garment; it is a symbol of Algerian resistance. During the war of independence, women used it to hide messages or weapons, and even men wore it to escape French soldiers. In Algiers, the white 'Hayek Mrama' was the standard of elegance. Though less common today, it remains a cherished symbol of Algerian heritage and is worn on special occasions.",
        history_ar: "الحايك أكثر من مجرد ثوب؛ إنه رمز للمقاومة الجزائرية. خلال حرب الاستقلال، استخدمته النساء لإخفاء الرسائل أو الأسلحة، وحتى الرجال ارتدوه للهروب من الجنود الفرنسيين. في الجزائر العاصمة، كان 'حايك مرمة' الأبيض هو معيار الأناقة. على الرغم من أنه أقل شيوعًا اليوم، إلا أنه لا يزال رمزًا عزيزًا للتراث الجزائري ويتم ارتداؤه في المناسبات الخاصة.",
        locations: ["Algiers", "Blida", "Constantine"],
        locations_ar: ["الجزائر العاصمة", "البليدة", "قسنطينة"],
        media: {
            gallery: [
                "/images/explore/hayk-1.jpg",
                "/images/explore/hayk-2.jpg",
                "/images/explore/hayk-3.jpg",
                "/images/explore/hayk-4.jpg",
                "/images/explore/hayk-5.jpg",
            ],
        },
    }
];
