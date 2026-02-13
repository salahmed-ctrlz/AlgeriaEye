export interface Wilaya {
    code: number;
    slug: string;
    name: { en: string; ar: string; fr: string };
    image?: string;
    tagline?: { en: string; ar: string; fr: string };
    description?: { en: string; ar: string; fr: string };
    history?: { en: string; ar: string; fr: string };
    funFacts?: { en: string[]; ar: string[]; fr: string[] };
    bestPlaces?: Attraction[];
    culture?: Culture[];
    featured?: boolean;
}

export interface Attraction {
    name: { en: string; ar: string; fr: string };
    image: string;
    gallery?: string[];
    category?: string;
    description?: { en: string; ar: string; fr: string };
    traditions?: { en: string; ar: string; fr: string };
    locationUrl?: string;
    lat?: number;
    lng?: number;
}

export interface Culture {
    title: { en: string; ar: string; fr: string };
    description: { en: string; ar: string; fr: string };
    image: string;
    tags?: string[];
}

export const wilayas: Wilaya[] = [
    {
        code: 16,
        slug: "algiers",
        name: { en: "Algiers", ar: "الجزائر العاصمة", fr: "Alger" },
        featured: true,
        image: "/images/wilayas/Algiers/hero.jpg",
        tagline: { en: "The White City", ar: "المحروسة", fr: "La Blanche (El Bahdja)" },
        description: {
            en: "Algiers is one of the oldest cities in the Mediterranean, witnessing Phoenician, Roman, Islamic, Zirid, and Ottoman civilizations. The Ottoman era left a clear mark on the Casbah, mosques, and palaces. During the French colonial period (1830–1962), it saw significant urban expansion. Today, the Casbah of Algiers is a UNESCO World Heritage site known for its historical and architectural value.",
            ar: "الجزائر العاصمة من أقدم مدن البحر الأبيض المتوسط، تعاقبت عليها الحضارات الفينيقية والرومانية، ثم الفتح الإسلامي، فالعهد الزيري، وبعده العثماني الذي ترك بصمة واضحة في القصبة والمساجد والقصور. في الفترة الاستعمارية الفرنسية (1830–1962) شهدت توسعًا عمرانياً كبيرًا. تُعد قصبة الجزائر اليوم موقعًا مصنفًا ضمن التراث العالمي لليونسكو لما تحمله من قيمة تاريخية ومعمارية.",
            fr: "Alger est l'une des plus anciennes villes de la Méditerranée, témoin des civilisations phénicienne, romaine, islamique, ziride et ottomane. L'époque ottomane a laissé une empreinte claire sur la Casbah, les mosquées et les palais. Durant la période coloniale française (1830–1962), elle a connu une expansion urbaine importante. Aujourd'hui, la Casbah d'Alger est un site classé au patrimoine mondial de l'UNESCO pour sa valeur historique et architecturale."
        },
        funFacts: {
            en: [
                "The Casbah is a UNESCO World Heritage site and a masterpiece of Islamic architecture.",
                "It is famous for Chaabi music, Dinanderie (copper craft), and traditional attire like Karakou and Haik.",
                "Famous dishes include Rechta, Mtewem, and Dolma."
            ],
            ar: [
                "\"القصبة\" ليست مجرد حي قديم، بل هي تحفة معمارية إسلامية مصنفة ضمن التراث العالمي لليونسكو.",
                "تشتهر بموسيقى الشعبي، وحرفة النحاس (الدينانديري)، واللباس التقليدي (الكاراكو والحايك).",
                "من أشهر مأكولاتها: الرشطة، المثوم، والدولمة."
            ],
            fr: [
                "La Casbah est un site du patrimoine mondial de l'UNESCO et un chef-d'œuvre de l'architecture islamique.",
                "Elle est célèbre pour la musique Chaabi, la dinanderie et les tenues traditionnelles comme le Karakou et le Haïk.",
                "Les plats célèbres incluent la Rechta, le Mtewem et la Dolma."
            ]
        },
        culture: [
            {
                title: { en: "The Casbah Life", ar: "الحياة في القصبة", fr: "La Vie à la Casbah" },
                description: {
                    en: "A labyrinth of narrow streets, Ottoman palaces, and ancient mosques. The Casbah is not just a place; it's a way of life that has preserved the city's soul for centuries.",
                    ar: "متاهة من الشوارع الضيقة والقصور العثمانية والمساجد القديمة. القصبة ليست مجرد مكان؛ إنها أسلوب حياة حافظ على روح المدينة لقرون.",
                    fr: "Un labyrinthe de ruelles étroites, de palais ottomans et de mosquées anciennes. La Casbah n'est pas seulement un lieu ; c'est un mode de vie qui a préservé l'âme de la ville depuis des siècles."
                },
                image: "/images/explore/Casbah.jpeg",
                tags: ["History", "Architecture"]
            },
            {
                title: { en: "Chaabi Music", ar: "موسيقى الشعبي", fr: "Musique Chaâbi" },
                description: {
                    en: "Born in the Casbah, Chaabi is the soulful sound of Algiers. Masters like El Anka and El Hasnaoui tell stories of love, exile, and daily life through mandole rhythms.",
                    ar: "وُلدت في القصبة، الشعبي هو الصوت الروحي للجزائر العاصمة. يروي أساتذة مثل العنقة والحسناوي قصص الحب والمنفى والحياة اليومية من خلال إيقاعات المندول.",
                    fr: "Né dans la Casbah, le Chaâbi est le son de l'âme d'Alger. Des maîtres comme El Anka et El Hasnaoui racontent des histoires d'amour, d'exil et de vie quotidienne à travers les rythmes du mandole."
                },
                image: "/images/culture/chaabi.jpg",
                tags: ["Music", "Art"]
            },
            {
                title: { en: "Algiers Cuisine", ar: "المطبخ العاصمي", fr: "Cuisine Algéroise" },
                description: {
                    en: "Famous for refined dishes like 'Rechta' (noodles with white sauce), 'Mtewem' (garlic meatballs), and 'Chorba Beida' (white soup). Every meal is a celebration of heritage.",
                    ar: "يشتهر بأطباق راقية مثل 'الرشطة' (نودلز بالمرق الأبيض)، 'المثوم' (كرات اللحم بالثوم)، و'شوربة بيضاء'. كل وجبة هي احتفال بالتراث.",
                    fr: "Célèbre pour ses plats raffinés comme la 'Rechta' (nouilles à la sauce blanche), le 'Mtewem' (boulettes de viande à l'ail) et la 'Chorba Beida' (soupe blanche). Chaque repas est une célébration du patrimoine."
                },
                image: "/images/culture/cuisine_algiers.jpg",
                tags: ["Food", "Gastronomy"]
            },
            {
                title: { en: "Traditional Attire", ar: "اللباس التقليدي", fr: "Tenue Traditionnelle" },
                description: {
                    en: "The 'Karakou', a velvet jacket embroidered with gold thread, is the crown jewel of Algiers fashion, worn by brides and women at weddings.",
                    ar: "'الكاراكو'، سترة مخملية مطرزة بخيوط الذهب، هي جوهرة تاج أزياء الجزائر العاصمة، ترتديها العرائس والنساء في الأعراس.",
                    fr: "Le 'Karakou', une veste en velours brodée de fil d'or, est le joyau de la mode algéroise, porté par les mariées et les femmes lors des mariages."
                },
                image: "/images/culture/karakou.jpg",
                tags: ["Fashion", "Heritage"]
            }
        ],
        bestPlaces: [
            {
                name: { en: "The Casbah of Algiers", ar: "قصبة الجزائر", fr: "La Casbah d'Alger" },
                category: "History",
                image: "/images/wilayas/Algiers/casbah.webp",
                gallery: [
                    "/images/wilayas/Algiers/casbah.webp",
                    "/images/explore/Casbah-2.jpg",
                    "/images/explore/casbah-1.webp"
                ],
                description: {
                    en: "A UNESCO World Heritage site and a masterpiece of Islamic architecture. The Casbah is a winding labyrinth of whitewashed houses, Ottoman palaces, and ancient mosques cascading down to the sea.",
                    ar: "موقع تراث عالمي لليونسكو وتحفة من العمارة الإسلامية. القصبة هي متاهة متعرجة من المنازل البيضاء والقصور العثمانية والمساجد القديمة التي تنحدر نحو البحر.",
                    fr: "Site du patrimoine mondial de l'UNESCO et chef-d'œuvre de l'architecture islamique. La Casbah est un labyrinthe sinueux de maisons blanchies à la chaux, de palais ottomans et de mosquées anciennes descendant vers la mer."
                },
                traditions: {
                    en: "Home to the Chaabi music legend El Anka. It represents the heart of Algerian resistance and traditional craftsmanship (dinanderie).",
                    ar: "موطن أسطورة الشعبي العنقة. تمثل قلب المقاومة الجزائرية والحرف التقليدية (النحاسيات).",
                    fr: "Berceau de la légende de la musique Chaâbi, El Anka. Elle représente le cœur de la résistance algérienne et de l'artisanat traditionnel (dinanderie)."
                },
                locationUrl: "https://www.google.com/maps/place/36.78694,3.06056",
                lat: 36.78694,
                lng: 3.06056
            },
            {
                name: { en: "Maqam Echahid", ar: "مقام الشهيد", fr: "Maqam Echahid" },
                category: "Landmark",
                image: "/images/wilayas/Algiers/hero.jpg",
                description: {
                    en: "The Martyrs' Memorial is an iconic concrete monument overlooking the city, commemorating the Algerian war for independence. It represents three palm leaves sheltering the eternal flame.",
                    ar: "نصب تذكاري أيقوني يطل على المدينة، يخلد ذكرى حرب الاستقلال الجزائرية. يمثل ثلاث سعفات نخيل تحمي الشعلة الأبدية.",
                    fr: "Le Mémorial du Martyr est un monument emblématique en béton surplombant la ville, commémorant la guerre d'indépendance algérienne. Il représente trois feuilles de palmier abritant la flamme éternelle."
                },
                traditions: {
                    en: "A symbol of national unity. It is visited on every national holiday (November 1st, July 5th) to pay respects.",
                    ar: "رمز للوحدة الوطنية. يتم زيارته في كل عيد وطني (1 نوفمبر، 5 يوليو) لتقديم الاحترام.",
                    fr: "Un symbole d'unité nationale. Il est visité lors de chaque fête nationale (1er novembre, 5 juillet) pour se recueillir."
                },
                locationUrl: "https://www.google.com/maps/place/36.74571,3.06973",
                lat: 36.74571,
                lng: 3.06973
            },
            {
                name: { en: "Jardin d'Essai du Hamma", ar: "حديقة التجارب بالحامة", fr: "Jardin d'Essai du Hamma" },
                category: "Nature",
                image: "/images/wilayas/Algiers/hamma.webp",
                description: {
                    en: "One of the most beautiful botanical gardens in the world, featuring grand avenues of plane trees, exotic palms, and a mix of French and English garden styles.",
                    ar: "واحدة من أجمل الحدائق النباتية في العالم، تتميز بممرات ضخمة من أشجار الدلب، ونخيل غريب، ومزيج من الأنماط الحدائقية الفرنسية والإنجليزية.",
                    fr: "L'un des plus beaux jardins botaniques au monde, avec de grandes allées de platanes, des palmiers exotiques et un mélange de styles de jardins français et anglais."
                },
                traditions: {
                    en: "Famous for being the filming location of the original Tarzan movie (1932). A favorite weekend spot for Algiers families.",
                    ar: "تشتهر بأنها موقع تصوير فيلم طرزان الأصلي (1932). مكان مفضّل لعطلة نهاية الأسبوع لعائلات الجزائر العاصمة.",
                    fr: "Célèbre pour avoir été le lieu de tournage du film original Tarzan (1932). Un lieu de week-end privilégié pour les familles algéroises."
                },
                locationUrl: "https://www.google.com/maps/place/36.74819,3.0757",
                lat: 36.74819,
                lng: 3.07570
            },
            {
                name: { en: "Notre Dame d'Afrique", ar: "كاتدرائية السيدة الإفريقية", fr: "Notre-Dame d'Afrique" },
                category: "Culture",
                image: "/images/wilayas/Algiers/notre_dame.webp",
                description: {
                    en: "Known as 'Lalla Madame l'Afrique', this basilica sits on a cliff overlooking the Bay of Algiers. Its Neo-Byzantine architecture is stunning inside and out.",
                    ar: "تُعرف باسم 'لالة مدام إفريقيا'، وتقع هذه الكنيسة على جرف يطل على خليج الجزائر. هندستها المعمارية النيو-بيزنطية مذهلة من الداخل والخارج.",
                    fr: "Connue sous le nom de 'Lalla Madame l'Afrique', cette basilique est perchée sur une falaise dominant la baie d'Alger. Son architecture néo-byzantine est magnifique à l'intérieur comme à l'extérieur."
                },
                traditions: {
                    en: "The inscription 'Pray for us and for the Muslims' highlights the unique coexistence and respect in Algerian culture.",
                    ar: "النقش 'صلوا من أجلنا ومن أجل المسلمين' يسلط الضوء على التعايش والاحترام الفريد في الثقافة الجزائرية.",
                    fr: "L'inscription 'Priez pour nous et pour les musulmans' souligne la coexistence unique et le respect dans la culture algérienne."
                },
                locationUrl: "https://www.google.com/maps/place/36.80106,3.04263",
                lat: 36.80106,
                lng: 3.04263
            },
            {
                name: { en: "La Grande Poste", ar: "البريد المركزي", fr: "La Grande Poste" },
                category: "Architecture",
                image: "/images/explore/grande_poste.jpg",
                description: {
                    en: "The heart of downtown Algiers. A magnificent example of Neo-Moorish architecture built in 1910, famous for its grand arches and intricate interior.",
                    ar: "قلب وسط مدينة الجزائر. مثال رائع على العمارة النيو-مغاربية بني في عام 1910، ويشتهر بأقواسه الضخمة وتصميمه الداخلي المعقد.",
                    fr: "Le cœur du centre-ville d'Alger. Un magnifique exemple d'architecture néo-mauresque construit en 1910, célèbre pour ses grandes arches et son intérieur complexe."
                },
                traditions: {
                    en: "The central meeting point for all Algiers residents ('Netlaqaw 9eddam La Poste').",
                    ar: "نقطة اللقاء المركزية لجميع سكان الجزائر العاصمة ('نتلاقاو قدام لا بوست').",
                    fr: "Le point de rencontre central pour tous les habitants d'Alger ('On se voit devant la Poste')."
                },
                locationUrl: "https://www.google.com/maps/place/36.7725,3.0592",
                lat: 36.77250,
                lng: 3.05920
            }
        ]
    },
    {
        code: 31,
        slug: "oran",
        name: { en: "Oran", ar: "وهران", fr: "Oran" },
        featured: true,
        image: "/images/wilayas/Oran/hero.jpg",
        tagline: { en: "The Radiant", ar: "الباهية", fr: "El Bahia (La Radieuse)" },
        description: {
            en: "Oran is Algeria's vibrant western capital, famous for its music (Rai), Spanish-influenced architecture, and stunning coastal views. It is a city of celebration, culture, and golden sunsets over the Santa Cruz fort.",
            ar: "وهران \"الباهية\"، عاصمة الغرب الجزائري النابضة بالحياة. مهد فن الراي العالمي ومدينة تعكس تاريخاً طويلاً من التنوع الثقافي والمعماري. من حصن سانتا كروز المطل على الميناء إلى كورنيشها الساحر، وهران هي عنوان للفرح والأصالة.",
            fr: "Oran est la capitale dynamique de l'ouest algérien, célèbre pour sa musique (Rai), son architecture d'influence espagnole et ses vues côtières imprenables. C'est une ville de fête, de culture et de couchers de soleil dorés sur le fort de Santa Cruz."
        },
        funFacts: {
            en: [
                "It is the birthplace of Rai music, now recognized by UNESCO.",
                "The Fort of Santa Cruz was built by the Spanish in the 16th century."
            ],
            ar: [
                "هي مهد موسيقى \"الراي\" التي وصلت للعالمية وصنفت تراثاً إنسانياً.",
                "قلعة \"سانتا كروز\" الشهيرة بناها الإسبان في القرن السادس عشر ولا تزال تحرس المدينة."
            ],
            fr: [
                "C'est le berceau de la musique Raï, aujourd'hui reconnue par l'UNESCO.",
                "Le Fort de Santa Cruz a été construit par les Espagnols au XVIe siècle."
            ]
        },
        bestPlaces: [
            {
                name: { en: "Fort Santa Cruz", ar: "قلعة وكنيسة سانتا كروز", fr: "Fort de Santa Cruz" },
                image: "/images/wilayas/Oran/santa_cruz.jpg",
                locationUrl: "https://www.google.com/maps/place/35.7183,0.6264",
                lat: 35.7183,
                lng: 0.6264
            },
            {
                name: { en: "Place du 1er Novembre", ar: "ساحة أول نوفمبر (ساحة السلاح سابقاً)", fr: "Place du 1er Novembre" },
                image: "/images/wilayas/Oran/place_1er_nov.jpg",
                locationUrl: "https://www.google.com/maps/place/35.6967,0.6417",
                lat: 35.6967,
                lng: 0.6417
            },
            {
                name: { en: "Ahmed Zabana Museum", ar: "متحف أحمد زبانة", fr: "Musée Ahmed Zabana" },
                image: "/images/wilayas/Oran/zabana_museum.jpg",
                locationUrl: "https://www.google.com/maps/place/35.6944,0.6356",
                lat: 35.6944,
                lng: 0.6356
            },
        ]
    },
    {
        code: 25,
        slug: "constantine",
        name: { en: "Constantine", ar: "قسنطينة", fr: "Constantine" },
        featured: true,
        image: "/images/wilayas/Constantine/hero.webp",
        tagline: { en: "The City of Bridges", ar: "مدينة الجسور المعلقة", fr: "La Ville des Ponts Suspendus" },
        description: {
            en: "Constantine, the City of Suspension Bridges and Capital of Eastern Algeria, is one of the oldest cities in the world, dating back over 2,500 years. Built on a hard limestone rock split by the deep Rhumel Gorge, it served as a natural and historical fortress. It has seen Numidian, Roman, and Ottoman civilizations and is famous for its seven bridges, authentic Malouf music, and ancient cuisine.",
            ar: "قسنطينة، مدينة الجسور المعلقة وعاصمة الشرق الجزائري، هي إحدى أقدم المدن في العالم حيث يعود تاريخها لأكثر من 2500 سنة. شُيدت فوق صخرة من الكلس القاسي يشقها وادي الرمال العميق، مما جعلها حصنًا طبيعيًا وتاريخيًا. تعاقبت عليها الحضارات النوميدية والرومانية والعثمانية، وتشتهر بجسورها السبعة التي تربط أطراف المدينة، وبفن المالوف الأصيل ومطبخها العريق.",
            fr: "Constantine, la ville des ponts suspendus et capitale de l'est de l'Algérie, est l'une des plus anciennes villes du monde, datant de plus de 2 500 ans. Construite sur un rocher calcaire dur fendu par les gorges profondes du Rhumel, elle a servi de forteresse naturelle et historique. Elle a vu passer les civilisations numide, romaine et ottomane et est célèbre pour ses sept ponts, sa musique Malouf authentique et sa cuisine ancestrale."
        },
        funFacts: {
            en: [
                "It has seven iconic bridges connecting the city's neighborhoods across the gorge.",
                "Famous for Malouf Music, Copperware, and Distillation of Rose Water.",
                "Traditional dishes include Chakhchoukha and Djouzia (Nougat)."
            ],
            ar: [
                "تشتهر بجسورها السبعة التي تربط أطراف المدينة فوق الهاوية، مما يمنحها منظراً لا مثيل له في العالم.",
                "معروفة بفن المالوف، صناعة النحاس، وتقطير ماء الزهر والورد.",
                "من أشهر مأكولاتها: شخشوخة قسنطينة وحلوى الجوزية."
            ],
            fr: [
                "Elle possède sept ponts emblématiques reliant les quartiers de la ville à travers les gorges.",
                "Célèbre pour la musique Malouf, la dinanderie et la distillation de l'eau de rose.",
                "Les plats traditionnels incluent la Chakhchoukha et la Djouzia (nougat)."
            ]
        },
        culture: [
            {
                title: { en: "City of Bridges", ar: "مدينة الجسور", fr: "La Ville des Ponts" },
                description: {
                    en: "Constantine's seven bridges are engineering marvels suspended over the Rhumel Gorge. They define the city's unique silhouette and daily commute.",
                    ar: "جسور قسنطينة السبعة هي روائع هندسية معلقة فوق وادي الرمال. إنها تحدد الصورة الظلية الفريدة للمدينة وتنقلاتها اليومية.",
                    fr: "Les sept ponts de Constantine sont des merveilles d'ingénierie suspendues au-dessus des gorges du Rhumel. Ils définissent la silhouette unique de la ville et les trajets quotidiens."
                },
                image: "/images/culture/bridges.jpg",
                tags: ["Architecture", "Landmark"]
            },
            {
                title: { en: "Malouf Music", ar: "موسيقى المالوف", fr: "Musique Malouf" },
                description: {
                    en: "An Andalusian classical music tradition that found its home in Constantine. It uses instruments like the oud, violin, and zither to create enchanting melodies.",
                    ar: "تقليد موسيقي أندلسي كلاسيكي وجد موطنه في قسنطينة. يستخدم آلات مثل العود والكمان والقانون لخلق ألحان ساحرة.",
                    fr: "Une tradition de musique classique andalouse qui a trouvé sa place à Constantine. Elle utilise des instruments comme l'oud, le violon et la cithare pour créer des mélodies envoûtantes."
                },
                image: "/images/culture/malouf.jpg",
                tags: ["Music", "Art"]
            },
            {
                title: { en: "Rose & Orange Water", ar: "تقطير ماء الزهر والورد", fr: "Eau de Rose et de Fleur d'Oranger" },
                description: {
                    en: "Every spring, families distill orange blossoms and roses (ras el qtar) to create fragrant waters used in desserts and traditional remedies.",
                    ar: "في كل ربيع، تقوم العائلات بتقطير أزهار البرتقال والورد (رأس القطار) لصنع مياه عطرية تستخدم في الحلويات والعلاجات التقليدية.",
                    fr: "Chaque printemps, les familles distillent des fleurs d'oranger et des roses (ras el qtar) pour créer des eaux parfumées utilisées dans les desserts et les remèdes traditionnels."
                },
                image: "/images/culture/distillation.jpg",
                tags: ["Heritage", "Craft"]
            },
            {
                title: { en: "Constantinian Cuisine", ar: "المطبخ القسنطيني", fr: "Cuisine Constantinoise" },
                description: {
                    en: "Famous for 'Chakhchoukha' (torn flatbread with sauce), 'Trida', and the sweet honey-nut nougat called 'Djouzia'.",
                    ar: "تشتهر بـ 'الشخشوخة' (رقائق العجين بالمرق)، 'التريدة'، وحلوى العسل والمكسرات التي تسمى 'الجوزية'.",
                    fr: "Célèbre pour la 'Chakhchoukha' (pain plat déchiré avec sauce), la 'Trida' et le nougat sucré au miel et aux noix appelé 'Djouzia'."
                },
                image: "/images/culture/djouzia.jpg",
                tags: ["Food", "Gastronomy"]
            }
        ],
        bestPlaces: [
            {
                name: { en: "Sidi M'Cid Bridge", ar: "جسر سيدي مسيد المعلق", fr: "Pont Sidi M'Cid" },
                category: "Landmark",
                image: "/images/wilayas/Constantine/sidi_mcid.jpg",
                description: {
                    en: "A stunning suspension bridge connecting the Kasbah to Sidi M'Cid. It offers vertiginous views of the gorge below.",
                    ar: "جسر معلق مذهل يربط القصبة بسيدي مسيد. يوفر إطلالات عمودية مذهلة على الوادي بالأسفل.",
                    fr: "Un magnifique pont suspendu reliant la Casbah à Sidi M'Cid. Il offre des vues vertigineuses sur les gorges en contrebas."
                },
                locationUrl: "https://www.google.com/maps/place/36.37253,6.61434",
                lat: 36.37253,
                lng: 6.61434
            },
            {
                name: { en: "Sidi Rached Viaduct", ar: "جسر سيدي راشد", fr: "Viaduc Sidi Rached" },
                category: "Architecture",
                image: "/images/wilayas/Constantine/sidi_rached.jpg",
                locationUrl: "https://www.google.com/maps/place/36.364,6.614",
                lat: 36.364,
                lng: 6.614
            },
            {
                name: { en: "Palace of Ahmed Bey", ar: "قصر أحمد باي", fr: "Palais d'Ahmed Bey" },
                category: "History",
                image: "/images/wilayas/Constantine/ahmed_bey.jpg",
                description: {
                    en: "One of the finest examples of Ottoman architecture in the Maghreb, featuring lush gardens and intricate tile work.",
                    ar: "واحد من أروع نماذج العمارة العثمانية في المغرب العربي، يتميز بحدائق غناء ونقوش زليج معقدة.",
                    fr: "L'un des plus beaux exemples d'architecture ottomane au Maghreb, avec des jardins luxuriants et des carrelages complexes."
                },
                locationUrl: "https://www.google.com/maps/place/36.367654,6.611195",
                lat: 36.367654,
                lng: 6.611195
            },
            {
                name: { en: "Emir Abdelkader Mosque", ar: "مسجد الأمير عبد القادر", fr: "Mosquée Émir Abdelkader" },
                category: "Culture",
                image: "/images/wilayas/Constantine/emir_abdelkader.webp",
                locationUrl: "https://www.google.com/maps/place/36.34667,6.60306",
                lat: 36.34667,
                lng: 6.60306
            },
            {
                name: { en: "Monument to the Dead", ar: "نصب الأموات", fr: "Monument aux Morts" },
                category: "Landmark",
                image: "/images/wilayas/Constantine/monument_dead.webp",
                locationUrl: "https://www.google.com/maps/place/36.3751528,6.6134864",
                lat: 36.3751528,
                lng: 6.6134864
            },
            {
                name: { en: "Tiddis Roman Ruins", ar: "مدينة تيديس الأثرية", fr: "Ruines Romaines de Tiddis" },
                category: "History",
                image: "/images/wilayas/Constantine/tiddis.jpg",
                locationUrl: "https://www.google.com/maps/place/36.46,6.49",
                lat: 36.46,
                lng: 6.49
            }
        ]
    },
    {
        code: 23,
        slug: "annaba",
        name: { en: "Annaba", ar: "عنابة", fr: "Annaba" },
        featured: true,
        image: "/images/wilayas/Annaba/hero.webp",
        tagline: { en: "The Jujube City", ar: "جوهرة الشرق", fr: "La Coquette (Ville des Jujubes)" },
        description: {
            en: "Annaba is a coastal gem where lush mountains meet the turquoise sea. Famous for the ruins of Hippo Regius and Saint Augustine, it combines pristine beaches with a rich intellectual and historical legacy.",
            ar: "عنابة \"جوهرة الشرق\" ومدينة العناب، حيث تعانق جبال الإيدوغ خضرة البحر المتوسط. هي مدينة القديس أوغسطين وآثار \"هيبون\" العريقة. تجمع عنابة بين جمال شواطئها الذهبية وعمق تاريخها الروماني والفينيقي العريق.",
            fr: "Annaba est un joyau côtier où les montagnes luxuriantes rencontrent la mer turquoise. Célèbre pour les ruines d'Hippone et Saint Augustin, elle allie des plages immaculées à un riche héritage intellectuel et historique."
        },
        funFacts: {
            en: [
                "It was home to Saint Augustine, one of the most influential philosophers in history.",
                "Its \"Corniche\" is famous for its vibrant nightlife and views."
            ],
            ar: [
                "كانت موطن القديس أوغسطين، أحد أهم الفلاسفة في التاريخ، بمدينة \"هيبون\" القديمة.",
                "كورنيش عنابة يعتبر من أجمل أماكن النزهة والسهر العائلي في الجزائر."
            ],
            fr: [
                "Elle a abrité Saint Augustin, l'un des philosophes les plus influents de l'histoire.",
                "Sa 'Corniche' est célèbre pour sa vie nocturne animée et ses vues."
            ]
        },
        bestPlaces: [
            {
                name: { en: "Hippo Regius Ruins", ar: "آثار هيبون القديمة", fr: "Ruines d'Hippone" },
                image: "/images/wilayas/Annaba/hippo_regius.webp",
                locationUrl: "https://www.google.com/maps/place/36.8269,7.7711",
                lat: 36.8269,
                lng: 7.7711
            },
            {
                name: { en: "Basilica of St. Augustine", ar: "كنيسة القديس أوغسطين", fr: "Basilique Saint-Augustin" },
                image: "/images/wilayas/Annaba/st_augustine.jpg",
                locationUrl: "https://www.google.com/maps/place/36.826,7.766",
                lat: 36.826,
                lng: 7.766
            },
            {
                name: { en: "Seraïdi Mountains & Beach", ar: "جبال وشاطئ سرايدي", fr: "Montagnes et Plage de Seraïdi" },
                image: "/images/wilayas/Annaba/seraidi.jpg",
                locationUrl: "https://www.google.com/maps/place/36.85,7.75",
                lat: 36.85,
                lng: 7.75
            },
            {
                name: { en: "Ain Achir Beach", ar: "منارة رأس الحمراء", fr: "Plage d'Aïn Achir" },
                image: "/images/wilayas/Annaba/ain_achir.JPG",
                locationUrl: "https://www.google.com/maps/place/36.90,7.80",
                lat: 36.90,
                lng: 7.80
            },
        ]
    },
    {
        code: 28,
        slug: "msila",
        name: { en: "M'sila", ar: "المسيلة", fr: "M'sila" },
        featured: true,
        image: "/images/wilayas/Msila/hero.webp",
        tagline: { en: "Capital of the Hodna", ar: "عاصمة الحضنة", fr: "Capitale du Hodna" },
        description: {
            en: "M'sila offers a journey into the medieval history of Algeria. Located in the Hodna basin, it is the gateway to the famous Kalaa of Beni Hammad, a UNESCO site that reflects the glory of the Hammadid dynasty.",
            ar: "المسيلة، \"عاصمة الحضنة\" وحاضنة التاريخ الإسلامي الوسيط. هي بوابة لاكتشاف قلعة بني حماد العظيمة، المصنفة عالمياً. تتميز بطبيعتها شبه الصحراوية وتراثها الشعبي الأصيل، وهي محطة أساسية لعشاق التاريخ والآثار.",
            fr: "M'sila offre un voyage dans l'histoire médiévale de l'Algérie. Située dans le bassin du Hodna, elle est la porte d'entrée de la célèbre Kalâa des Béni Hammad, un site UNESCO qui reflète la gloire de la dynastie hammadide."
        },
        funFacts: {
            en: [
                "It houses the Kalaa of Beni Hammad, the first capital of the Hammadid emirs.",
                "The region is famous for its steppe landscapes and traditional wool crafts."
            ],
            ar: [
                "تحتضن \"قلعة بني حماد\"، أول عاصمة للدولة الحمادية وشاهد على رقي العمارة الإسلامية.",
                "تشتهر المنطقة بصناعاتها التقليدية وطبيعتها السهبية التي تربط الشمال بالجنوب."
            ],
            fr: [
                "Elle abrite la Kalâa des Béni Hammad, première capitale des émirs hammadides.",
                "La région est célèbre pour ses paysages steppiques et son artisanat traditionnel de la laine."
            ]
        },
        bestPlaces: [
            {
                name: { en: "Al Kalaa of Beni Hammad (UNESCO)", ar: "قلعة بني حماد (يونسكو)", fr: "La Kalâa des Béni Hammad (UNESCO)" },
                image: "/images/wilayas/Msila/kalaa.webp",
                locationUrl: "https://www.google.com/maps/place/35.8000,4.7833",
                lat: 35.8000,
                lng: 4.7833
            },
            {
                name: { en: "The Hodna Chott (Salt Lake)", ar: "شط الحضنة (بحيرة ملحية)", fr: "Chott el Hodna" },
                image: "/images/wilayas/Msila/hodna.webp",
                locationUrl: "https://www.google.com/maps/place/35.50,4.50",
                lat: 35.50,
                lng: 4.50
            },
            {
                name: { en: "Bousaada Oasis (nearby)", ar: "مدينة بوسعادة السياحية (قريبة)", fr: "Oasis de Bou Saâda" },
                image: "/images/wilayas/Msila/bousaada.png",
                locationUrl: "https://www.google.com/maps/place/35.3333,4.2000",
                lat: 35.3333,
                lng: 4.2000
            },
            {
                name: { en: "Mosque of Omar ibn Elkhetab", ar: "مسجد عمر بن الخطاب (المعاضيد)", fr: "Mosquée Omar ibn Elkhetab" },
                image: "/images/wilayas/Msila/mosquee.webp",
                locationUrl: "https://www.google.com/maps/search/?api=1&query=Mosque+Omar+ibn+Elkhetab+M%27sila+Algeria"
            },
        ]
    },
    {
        code: 7,
        slug: "biskra",
        name: { en: "Biskra", ar: "بسكرة", fr: "Biskra" },
        featured: true,
        image: "/images/wilayas/Biskra/hero.jpg",
        tagline: { en: "Queen of the Zibans", ar: "عروس الزيبان", fr: "Reine des Zibans" },
        description: {
            en: "Biskra is the golden gate to the Sahara. Known for its world-famous \"Deglet Nour\" dates and healing thermal baths, strictly a winter paradise where palm groves stretch as far as the eye can see under a warm sun.",
            ar: "بسكرة \"عروس الزيبان\" وبوابة الصحراء الذهبية. موطن تمر \"دقلة نور\" الشهير عالمياً وملاذ الباحثين عن الراحة في حماماتها المعدنية الشافية. واحاتها الممتدة وشمسها الدافئة شتاءً تجعل منها وجهة سياحية استثنائية.",
            fr: "Biskra est la porte dorée du Sahara. Connue pour ses dattes \"Deglet Nour\" mondialement célèbres et ses bains thermaux curatifs, c'est un paradis hivernal où les palmeraies s'étendent à perte de vue sous un soleil chaud."
        },
        funFacts: {
            en: [
                "It produces the highest quality dates in the world.",
                "The distinct architecture uses local clay bricks for natural cooling."
            ],
            ar: [
                "تُنتج أجود أنواع التمور في العالم (دقلة نور).",
                "ألهمت بسكرة العديد من الفنانين والكتاب الأوروبيين بجمال واحاتها وضوئها الساحر."
            ],
            fr: [
                "Elle produit les dattes de la plus haute qualité au monde.",
                "L'architecture distincte utilise des briques d'argile locales pour un refroidissement naturel."
            ]
        },
        bestPlaces: [
            {
                name: { en: "The Garden of London (Jardin Landon)", ar: "حديقة لاندون الساحرة", fr: "Jardin Landon" },
                image: "/images/wilayas/Biskra/jardin_london.webp",
                locationUrl: "https://www.google.com/maps/place/34.852,5.727",
                lat: 34.852,
                lng: 5.727
            },
            {
                name: { en: "Hammam Salhine (Roman Baths)", ar: "حمام الصالحين (حمامات رومانية قديمة)", fr: "Hammam Salhine" },
                image: "/images/wilayas/Biskra/hammam_salhine.jpg",
                locationUrl: "https://www.google.com/maps/place/34.85,5.73",
                lat: 34.85,
                lng: 5.73
            },
            {
                name: { en: "El Kantara Gorge", ar: "مضيق القنطرة (البوابة الطبيعية للصحراء)", fr: "Gorges d'El Kantara" },
                image: "/images/wilayas/Biskra/el_kantra.jpg",
                locationUrl: "https://www.google.com/maps/place/35.20,5.70",
                lat: 35.20,
                lng: 5.70
            },
            {
                name: { en: "Tolga Palm Groves", ar: "واحات طولقة", fr: "Palmeraies de Tolga" },
                image: "/images/wilayas/Biskra/tolga.jpg",
                locationUrl: "https://www.google.com/maps/place/34.883,5.383",
                lat: 34.883,
                lng: 5.383
            },
        ]
    },
    {
        code: 11,
        slug: "tamanrasset",
        name: { en: "Tamanrasset", ar: "تمنراست", fr: "Tamanrasset" },
        featured: true,
        image: "/images/wilayas/Tamanrasset/hero.jpg",
        tagline: { en: "The Capital of the Ahaggar", ar: "عاصمة الهقار", fr: "Capitale du Hoggar" },
        description: {
            en: "Tamanrasset is the beating heart of the Algerian Sahara and the Tuareg culture. Surrounded by the volcanic Hoggar Mountains, it offers one of the most spectacular landscapes on Earth, including the spiritual hermitage of Assekrem.",
            ar: "تمنراست، عاصمة الأهقار وقلب الصحراء النابض. أرض \"الرجال الزرق\" (الطوارق) وجبال الهقار البركانية الشاهقة التي تعانق السماء. هنا، في \"الأسكرام\"، يمكنك مشاهدة أحد أجمل شروق وغروب للشمس في العالم، في مشهد يخطف الأنفاس.",
            fr: "Tamanrasset est le cœur battant du Sahara algérien et de la culture touarègue. Entourée par les montagnes volcaniques du Hoggar, elle offre l'un des paysages les plus spectaculaires sur Terre, y compris l'ermitage spirituel de l'Assekrem."
        },
        funFacts: {
            en: [
                "The Assekrem peak offers what is often called the \"best sunrise in the world.\"",
                "It is the cultural hub of the Tuareg people and their Imzad music (UNESCO)."
            ],
            ar: [
                "قمة \"الأسكرام\" توفر مشهداً لشروق الشمس يعتبره الكثيرون الأجمل في العالم.",
                "هي الحاضنة لثقافة الطوارق العريقة وموسيقى الإمزاد المصنفة تراثاً عالمياً."
            ],
            fr: [
                "Le pic de l'Assekrem offre ce que l'on appelle souvent le 'meilleur lever de soleil au monde'.",
                "C'est le centre culturel du peuple Touareg et de leur musique Imzad (UNESCO)."
            ]
        },
        bestPlaces: [
            {
                name: { en: "Assekrem Plateau", ar: "هضبة الأسكرام", fr: "Plateau de l'Assekrem" },
                image: "/images/wilayas/Tamanrasset/assekrem.webp",
                locationUrl: "https://www.google.com/maps/place/23.2667,5.6333",
                lat: 23.2667,
                lng: 5.6333
            },
            {
                name: { en: "Hoggar National Park", ar: "الحظيرة الثقافية للأهقار", fr: "Parc National du Hoggar" },
                image: "/images/wilayas/Tamanrasset/hoggar.jpg",
                locationUrl: "https://www.google.com/maps/place/22.9667,5.5333",
                lat: 22.9667,
                lng: 5.5333
            },
            {
                name: { en: "Hermitage of Charles de Foucauld", ar: "محبسة شارل دو فوكو", fr: "Ermitage de Charles de Foucauld" },
                image: "/images/wilayas/Tamanrasset/hermitage.jpg",
                locationUrl: "https://www.google.com/maps/place/23.27,5.63",
                lat: 23.27,
                lng: 5.63
            },
            {
                name: { en: "Guelta d'Afilal", ar: "قلة أفيلال (واحة مائية)", fr: "Guelta d'Afilal" },
                image: "/images/wilayas/Tamanrasset/guelta.jpg",
                locationUrl: "https://www.google.com/maps/place/22.9167,5.55",
                lat: 22.9167,
                lng: 5.55
            },
        ]
    },
    // ... rest of simple wilayas
    { code: 1, slug: "adrar", name: { en: "Adrar", ar: "أدرار", fr: "Adrar" } },
    { code: 2, slug: "chlef", name: { en: "Chlef", ar: "الشلف", fr: "Chlef" } },
    { code: 3, slug: "laghouat", name: { en: "Laghouat", ar: "الأغواط", fr: "Laghouat" } },
    { code: 4, slug: "oum-el-bouaghi", name: { en: "Oum El Bouaghi", ar: "أم البواقي", fr: "Oum El Bouaghi" } },
    { code: 5, slug: "batna", name: { en: "Batna", ar: "باتنة", fr: "Batna" } },
    { code: 6, slug: "bejaia", name: { en: "Béjaïa", ar: "بجاية", fr: "Béjaïa" } },
    { code: 8, slug: "bechar", name: { en: "Béchar", ar: "بشار", fr: "Béchar" } },
    { code: 9, slug: "blida", name: { en: "Blida", ar: "البليدة", fr: "Blida" } },
    { code: 10, slug: "bouira", name: { en: "Bouira", ar: "البويرة", fr: "Bouira" } },
    { code: 12, slug: "tebessa", name: { en: "Tébessa", ar: "تبسة", fr: "Tébessa" } },
    { code: 13, slug: "tlemcen", name: { en: "Tlemcen", ar: "تلمسان", fr: "Tlemcen" } },
    { code: 14, slug: "tiaret", name: { en: "Tiaret", ar: "تيارت", fr: "Tiaret" } },
    { code: 15, slug: "tizi-ouzou", name: { en: "Tizi Ouzou", ar: "تيزي وزو", fr: "Tizi Ouzou" } },
    { code: 17, slug: "djelfa", name: { en: "Djelfa", ar: "الجلفة", fr: "Djelfa" } },
    { code: 18, slug: "jijel", name: { en: "Jijel", ar: "جيجل", fr: "Jijel" } },
    { code: 19, slug: "setif", name: { en: "Sétif", ar: "سطيف", fr: "Sétif" } },
    { code: 20, slug: "saida", name: { en: "Saïda", ar: "سعيدة", fr: "Saïda" } },
    { code: 21, slug: "skikda", name: { en: "Skikda", ar: "سكيكدة", fr: "Skikda" } },
    { code: 22, slug: "sidi-bel-abbes", name: { en: "Sidi Bel Abbès", ar: "سيدي بلعباس", fr: "Sidi Bel Abbès" } },
    { code: 24, slug: "guelma", name: { en: "Guelma", ar: "قالمة", fr: "Guelma" } },
    { code: 26, slug: "medea", name: { en: "Médéa", ar: "المدية", fr: "Médéa" } },
    { code: 27, slug: "mostaganem", name: { en: "Mostaganem", ar: "مستغانم", fr: "Mostaganem" } },
    { code: 29, slug: "mascara", name: { en: "Mascara", ar: "معسكر", fr: "Mascara" } },
    { code: 30, slug: "ouargla", name: { en: "Ouargla", ar: "ورقلة", fr: "Ouargla" } },
    { code: 32, slug: "el-bayadh", name: { en: "El Bayadh", ar: "البيض", fr: "El Bayadh" } },
    { code: 33, slug: "illizi", name: { en: "Illizi", ar: "إليزي", fr: "Illizi" } },
    { code: 34, slug: "bordj-bou-arreridj", name: { en: "Bordj Bou Arréridj", ar: "برج بوعريريج", fr: "Bordj Bou Arréridj" } },
    { code: 35, slug: "boumerdes", name: { en: "Boumerdès", ar: "بومرداس", fr: "Boumerdès" } },
    { code: 36, slug: "el-tarf", name: { en: "El Tarf", ar: "الطارف", fr: "El Tarf" } },
    { code: 37, slug: "tindouf", name: { en: "Tindouf", ar: "تندوف", fr: "Tindouf" } },
    { code: 38, slug: "tissemsilt", name: { en: "Tissemsilt", ar: "تيسمسيلت", fr: "Tissemsilt" } },
    { code: 39, slug: "el-oued", name: { en: "El Oued", ar: "الوادي", fr: "El Oued" } },
    { code: 40, slug: "khenchela", name: { en: "Khenchela", ar: "خنشلة", fr: "Khenchela" } },
    { code: 41, slug: "souk-ahras", name: { en: "Souk Ahras", ar: "سوق أهراس", fr: "Souk Ahras" } },
    { code: 42, slug: "tipaza", name: { en: "Tipaza", ar: "تيبازة", fr: "Tipaza" } },
    { code: 43, slug: "mila", name: { en: "Mila", ar: "ميلة", fr: "Mila" } },
    { code: 44, slug: "ain-defla", name: { en: "Aïn Defla", ar: "عين الدفلى", fr: "Aïn Defla" } },
    { code: 45, slug: "naama", name: { en: "Naâma", ar: "النعامة", fr: "Naâma" } },
    { code: 46, slug: "ain-temouchent", name: { en: "Aïn Témouchent", ar: "عين تموشنت", fr: "Aïn Témouchent" } },
    { code: 47, slug: "ghardaia", name: { en: "Ghardaïa", ar: "غرداية", fr: "Ghardaïa" } },
    { code: 48, slug: "relizane", name: { en: "Relizane", ar: "غليزان", fr: "Relizane" } },
];

export function getWilayaBySlug(slug: string): Wilaya | undefined {
    return wilayas.find((w) => w.slug === slug);
}

export function getWilayaName(wilaya: Wilaya, locale: string): string {
    if (locale === "ar") return wilaya.name.ar;
    if (locale === "fr") return wilaya.name.fr;
    return wilaya.name.en;
}
