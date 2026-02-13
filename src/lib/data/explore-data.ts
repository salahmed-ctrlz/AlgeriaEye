export type ExploreCategory = "culture" | "history" | "food" | "clothing";

export interface ExploreItem {
    id: string;
    category: ExploreCategory;
    title: string;
    title_ar: string;
    title_fr: string;
    subtitle: string;
    subtitle_ar: string;
    subtitle_fr: string;
    image: string;
    region: string;
    region_ar: string;
    region_fr: string;
    description: string;
    description_ar: string;
    description_fr: string;
    history: string;
    history_ar: string;
    history_fr: string;
    locations: string[];
    locations_ar: string[];
    locations_fr: string[];
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
        title_fr: "La Fantasia (Tbourida)",
        subtitle: "The Gunpowder Ceremony",
        subtitle_ar: "مراسم البارود",
        subtitle_fr: "La Cérémonie de la Poudre",
        image: "/images/explore/fantasia.jpg",
        region: "High Plateaus",
        region_ar: "الهضاب العليا",
        region_fr: "Hauts Plateaux",
        description: "A spectacular equestrian performance simulating military assaults, deeply rooted in Maghrebi tradition.",
        description_ar: "عرض فروسية مذهل يحاكي الهجمات العسكرية، متجذر بعمق في التقاليد المغاربية.",
        description_fr: "Une performance équestre spectaculaire simulant des assauts militaires, profondément enracinée dans la tradition maghrébine.",
        history: "Dating back to the 16th century, the Fantasia creates a bridge between the glorious military past and the present day. It represents the strong bond between the rider and his horse, symbolizing courage, skill, and spiritual connection. Riders, clad in traditional ceremonial dress, charge in a straight line at a gallop and fire their muskets simultaneously at the end of the race, a feat known as 'Baroud'.",
        history_ar: "يعود تاريخ الفانتازيا إلى القرن السادس عشر، وهي تشكل جسراً بين الماضي العسكري المجيد والحاضر. إنها تمثل الرابطة القوية بين الفارس وحصانه، وترمز إلى الشجاعة والمهارة والاتصال الروحي. يهاجم الفرسان، وهم يرتدون الزي الاحتفالي التقليدي، في خط مستقيم بسرعة ويطلقون نيران بنادقهم في وقت واحد في نهاية السباق، وهو عمل يُعرف باسم 'البارود'.",
        history_fr: "Datant du XVIe siècle, la Fantasia crée un pont entre le passé militaire glorieux et le présent. Elle représente le lien fort entre le cavalier et son cheval, symbolisant le courage, l'habileté et la connexion spirituelle. Les cavaliers, vêtus d'une tenue de cérémonie traditionnelle, chargent en ligne droite au galop et tirent simultanément avec leurs mousquets à la fin de la course, un exploit connu sous le nom de 'Baroud'.",
        locations: ["Djelfa", "Tiaret", "Saida", "Mila"],
        locations_ar: ["الجلفة", "تيارت", "سعيدة", "ميلة"],
        locations_fr: ["Djelfa", "Tiaret", "Saida", "Mila"],
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
        title_fr: "Musique Imzad",
        subtitle: "Soul of the Tuareg",
        subtitle_ar: "روح الطوارق",
        subtitle_fr: "L'Âme des Touaregs",
        image: "/images/explore/imzad.webp",
        region: "Ahaggar / Tamanrasset",
        region_ar: "الأهقار / تمنراست",
        region_fr: "Ahaggar / Tamanrasset",
        description: "A traditional single-string bowed instrument played exclusively by Tuareg women.",
        description_ar: "آلة وترية تقليدية ذات وتر واحد تعزفها نساء الطوارق حصرياً.",
        description_fr: "Un instrument traditionnel monocorde à archet joué exclusivement par les femmes touarègues.",
        history: "Inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity, the Imzad is more than an instrument; it is a pillar of Tuareg culture. While men recite poetry, women play the Imzad to accompany them, creating a melodic synergy that often resolves tribal disputes and celebrates bravery.",
        history_ar: "تم إدراج الإمزاد في القائمة التمثيلية لليونسكو للتراث الثقافي غير المادي للبشرية، وهو أكثر من مجرد آلة موسيقية؛ إنه ركيزة من ركائز ثقافة الطوارق. بينما يلقي الرجال الشعر، تعزف النساء على الإمزاد لمرافقتهم، مما يخلق تآزراً لحنياً غالباً ما يحل النزاعات القبلية ويحتفل بالشجاعة.",
        history_fr: "Inscrit sur la Liste représentative du patrimoine culturel immatériel de l'humanité de l'UNESCO, l'Imzad est plus qu'un instrument ; c'est un pilier de la culture touarègue. Pendant que les hommes récitent de la poésie, les femmes jouent de l'Imzad pour les accompagner, créant une synergie mélodique qui résout souvent les conflits tribaux et célèbre la bravoure.",
        locations: ["Tamanrasset", "Illizi", "Djanet"],
        locations_ar: ["تمنراست", "إليزي", "جانت"],
        locations_fr: ["Tamanrasset", "Illizi", "Djanet"],
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
        title_fr: "Cérémonie du Thé Touareg",
        subtitle: "The Three Glasses",
        subtitle_ar: "الكؤوس الثلاث",
        subtitle_fr: "Les Trois Verres",
        image: "/images/explore/tea.jpg",
        region: "Sahara",
        region_ar: "الصحراء",
        region_fr: "Sahara",
        description: "A slow, ritualistic preparation of green tea with mint, served in three rounds symbolizing life, love, and death.",
        description_ar: "تحضير بطيء وطقوسي للشاي الأخضر بالنعناع، يقدم في ثلاث جولات ترمز إلى الحياة والحب والموت.",
        description_fr: "Une préparation lente et rituelle de thé vert à la menthe, servi en trois tournées symbolisant la vie, l'amour et la mort.",
        history: "In the Sahara, tea is not just a drink; it is an excuse for social interaction and a sign of hospitality. The ceremony involves brewing tea over coals and pouring it from a height to create froth 'alkeshkousha'. The first glass is 'bitter like life', the second 'strong like love', and the third 'soft like death'. It is a meditative process that can last for hours.",
        history_ar: "في الصحراء، الشاي ليس مجرد مشروب؛ إنه ذريعة للتفاعل الاجتماعي وعلامة على الضيافة. يتضمن الحفل تخمير الشاي على الفحم وصبه من ارتفاع لتكوين رغوة 'الكشكوشة'. الكأس الأولى 'مرة مثل الحياة'، والثانية 'قوية مثل الحب'، والثالثة 'ناعمة مثل الموت'. إنها عملية تأملية يمكن أن تستمر لساعات.",
        history_fr: "Au Sahara, le thé n'est pas seulement une boisson ; c'est un prétexte à l'interaction sociale et un signe d'hospitalité. La cérémonie implique de faire infuser le thé sur des charbons et de le verser de haut pour créer une mousse 'alkeshkousha'. Le premier verre est 'amer comme la vie', le deuxième 'fort comme l'amour' et le troisième 'doux comme la mort'. C'est un processus méditatif qui peut durer des heures.",
        locations: ["Tamanrasset", "Djanet", "Ghardaia"],
        locations_ar: ["تمنراست", "جانت", "غرداية"],
        locations_fr: ["Tamanrasset", "Djanet", "Ghardaia"],
        media: {
            videoUrl: "https://www.youtube.com/embed/vACZA9dGvV4",
            gallery: ["/images/explore/tea-1.jpg", "/images/explore/tea-2.jpg", "/images/explore/tea-3.jpg"],
        },
    },
    {
        id: "algernian-music",
        category: "culture",
        title: "Algerian Music",
        title_ar: "الموسيقى الجزائرية",
        title_fr: "Musique Algérienne",
        subtitle: "The Soul of Algeria",
        subtitle_ar: "روح الجزائر",
        subtitle_fr: "L'Âme de l'Algérie",
        image: "/images/explore/chaabi.jpg",
        region: "Nationwide",
        region_ar: "وطني",
        region_fr: "National",
        description: "A blend of Berber, Arab, French, and Mediterranean influences, Algerian culture is rich in music, literature, and hospitality.",
        description_ar: "مزيج من التأثيرات الأمازيغية، العربية، الفرنسية، والمتوسطية. الثقافة الجزائرية غنية بالموسيقى، الأدب، وكرم الضيافة.",
        description_fr: "Un mélange d'influences berbères, arabes, françaises et méditerranéennes. La culture algérienne est riche en musique, littérature et hospitalité.",
        history: "Algeria's diverse musical landscape features genres like Raï and Chaabi, each with unique origins and cultural significance.",
        history_ar: "يتميز المشهد الموسيقي الجزائري المتنوع بأنواع مثل الراي والشعبي، لكل منها أصول وأهمية ثقافية فريدة.",
        history_fr: "Le paysage musical diversifié de l'Algérie présente des genres comme le Raï et le Chaâbi, chacun avec des origines et une signification culturelle uniques.",
        locations: ["Algiers", "Oran", "Tlemcen", "Constantine"],
        locations_ar: ["الجزائر العاصمة", "وهران", "تلمسان", "قسنطينة"],
        locations_fr: ["Alger", "Oran", "Tlemcen", "Constantine"],
        media: {
            videoUrl: "https://www.youtube.com/embed/X04nBjVRCPE",
            gallery: ["/images/explore/chaabi-1.jpg", "/images/explore/rai-1.jpg", "/images/explore/chaabi.jpg"],
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
        title_fr: "Ruines de Timgad",
        subtitle: "The Pompeii of Africa",
        subtitle_ar: "بومبي أفريقيا",
        subtitle_fr: "La Pompéi de l'Afrique",
        image: "/images/explore/timgad.jpg",
        region: "Batna",
        region_ar: "باتنة",
        region_fr: "Batna",
        description: "One of the best-preserved Roman cities in existence, showcasing the perfect grid plan.",
        description_ar: "واحدة من أفضل المدن الرومانية المحفوظة في الوجود، وتعرض المخطط الشبكي المثالي.",
        description_fr: "L'une des villes romaines les mieux préservées, montrant le plan en damier parfait.",
        history: "Founded by Emperor Trajan around 100 AD as a military colony, Timgad (Thamugadi) is a testament to Roman urban planning. Unlike Rome itself, which grew organically, Timgad was built on a strict grid system. It features a magnificent library, thermal baths, and a 3,500-seat theater that still hosts the International Festival of Timgad today.",
        history_ar: "أسسها الإمبراطور تراجان حوالي عام 100 م كمستعمرة عسكرية، تيمقاد (تاموقادي) هي شهادة على التخطيط الحضري الروماني. على عكس روما نفسها، التي نمت بشكل عضوي، تم بناء تيمقاد على نظام شبكي صارم. وتتميز بمكتبة رائعة وحمامات حرارية ومسرح يتسع لـ 3500 مقعد لا يزال يستضيف مهرجان تيمقاد الدولي اليوم.",
        history_fr: "Fondée par l'empereur Trajan vers 100 après J.-C. comme colonie militaire, Timgad (Thamugadi) est un témoignage de l'urbanisme romain. Contrairement à Rome elle-même, qui a grandi de manière organique, Timgad a été construite sur un système de grille strict. Elle dispose d'une magnifique bibliothèque, de thermes et d'un théâtre de 3 500 places qui accueille encore aujourd'hui le Festival international de Timgad.",
        locations: ["Batna", "Timgad"],
        locations_ar: ["باتنة", "تيمقاد"],
        locations_fr: ["Batna", "Timgad"],
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
        title_fr: "Casbah d'Alger",
        subtitle: "The Old Citadel",
        subtitle_ar: "القلعة القديمة",
        subtitle_fr: "La Vieille Citadelle",
        image: "/images/explore/Casbah.jpeg",
        region: "Algiers",
        region_ar: "الجزائر العاصمة",
        region_fr: "Alger",
        description: "A UNESCO World Heritage site, the Casbah is a unique medina with steep, winding streets and Ottoman palaces.",
        description_ar: "موقع للتراث العالمي لليونسكو، القصبة هي مدينة فريدة من نوعها ذات شوارع شديدة الانحدار ومتعرجة وقصور عثمانية.",
        description_fr: "Site classé au patrimoine mondial de l'UNESCO, la Casbah est une médina unique avec des rues escarpées et sinueuses et des palais ottomans.",
        history: "The Casbah is a medina type of city, with high density and community living. It was the heart of the Regency of Algiers and a stronghold during the Battle of Algiers. Its architecture is designed to confuse invaders with dead ends and narrow paths, while preserving the privacy of its inhabitants with inward-facing courtyards.",
        history_ar: "القصبة هي مدينة من نوع المدينة المنورة، ذات كثافة عالية ومعيشة مجتمعية. كانت قلب وصاية الجزائر ومعقلًا أثناء معركة الجزائر. تم تصميم هندستها المعمارية لإرباك الغزاة بطرق مسدودة ومسارات ضيقة، مع الحفاظ على خصوصية سكانها بساحات فناء تواجه الداخل.",
        history_fr: "La Casbah est une ville de type médina, avec une forte densité et une vie communautaire. Elle était le cœur de la Régence d'Alger et un bastion pendant la bataille d'Alger. Son architecture est conçue pour dérouter les envahisseurs avec des impasses et des chemins étroits, tout en préservant l'intimité de ses habitants avec des cours tournées vers l'intérieur.",
        locations: ["Algiers", "Bab El Oued"],
        locations_ar: ["الجزائر العاصمة", "باب الواد"],
        locations_fr: ["Alger", "Bab El Oued"],
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
        title_fr: "La Kalâa des Béni Hammad",
        subtitle: "The First Hammadid Capital",
        subtitle_ar: "العاصمة الحمادية الأولى",
        subtitle_fr: "La Première Capitale Hammadide",
        image: "/images/explore/kalaa.webp",
        region: "M'Sila",
        region_ar: "المسيلة",
        region_fr: "M'Sila",
        description: "The ruins of the first capital of the Hammadid emirs, founded in 1007 and destroyed in 1152.",
        description_ar: "أطلال العاصمة الأولى للأمراء الحماديين، تأسست عام 1007 ودمرت عام 1152.",
        description_fr: "Les ruines de la première capitale des émirs hammadides, fondée en 1007 et détruite en 1152.",
        history: "Located in the Maadid mountains, this site provides an authentic picture of a fortified Muslim city. The mosque is one of the largest in Algeria, with a prayer hall of 13 aisles and 8 bays. The influence of Beni Hammad's architecture can be seen in later developments like the Giralda in Seville.",
        history_ar: "يقع هذا الموقع في جبال المعاضيد، ويقدم صورة أصيلة لمدينة إسلامية محصنة. يعد المسجد من أكبر المساجد في الجزائر، حيث تبلغ قاعة الصلاة فيه 13 ممرًا و 8 خلجان. يمكن رؤية تأثير هندسة بني حماد في التطورات اللاحقة مثل الخيرالدا في إشبيلية.",
        history_fr: "Situé dans les montagnes Maadid, ce site offre une image authentique d'une ville musulmane fortifiée. La mosquée est l'une des plus grandes d'Algérie, avec une salle de prière de 13 nefs et 8 travées. L'influence de l'architecture de Beni Hammad peut être vue dans des développements ultérieurs comme la Giralda à Séville.",
        locations: ["M'Sila", "Maadid"],
        locations_ar: ["المسيلة", "المعاضيد"],
        locations_fr: ["M'Sila", "Maadid"],
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
        title_fr: "Tombeau Royal de Maurétanie",
        subtitle: "Tombeau de la Chrétienne",
        subtitle_ar: "قبر الرومية",
        subtitle_fr: "Tombeau de la Chrétienne",
        image: "/images/explore/temple.webp",
        region: "Tipaza",
        region_ar: "تيبازة",
        region_fr: "Tipaza",
        description: "A monumental circular tomb located 60 km west of Algiers, dating back to 3 BC.",
        description_ar: "ضريح دائري ضخم يقع على بعد 60 كم غرب الجزائر العاصمة، يعود تاريخه إلى عام 3 قبل الميلاد.",
        description_fr: "A monumental circular tomb located 60 km west of Algiers, dating back to 3 BC. (FIXME: Add unique French content if different)",
        history: "Built by King Juba II and Queen Cleopatra Selene II, this massive stone structure is a masterpiece of Numidian architecture with Hellenistic and Egyptian influences. It overlooks the Mediterranean and remains an enigma, with its hidden chambers and legendary treasures that have never been found.",
        history_ar: "بناه الملك يوبا الثاني والملكة كليوباترا سيليني الثانية، هذا الهيكل الحجري الضخم هو تحفة من العمارة النوميدية مع تأثيرات هلنستية ومصرية. يطل على البحر الأبيض المتوسط ولا يزال لغزًا، بغرفه المخفية وكنوزه الأسطورية التي لم يتم العثور عليها أبدًا.",
        history_fr: "Construit par le roi Juba II et la reine Cléopâtre Séléné II, cette structure massive en pierre est un chef-d'œuvre de l'architecture numide avec des influences hellénistiques et égyptiennes. Il surplombe la Méditerranée et reste une énigme, avec ses chambres cachées et ses trésors légendaires qui n'ont jamais été retrouvés.",
        locations: ["Tipaza", "Sidi Rached"],
        locations_ar: ["تيبازة", "سيدي راشد"],
        locations_fr: ["Tipaza", "Sidi Rached"],
        media: {
            videoUrl: "https://www.youtube.com/embed/AyfupgiOoqQ",
            gallery: [
                "/images/explore/temple.webp",
                "/images/explore/temple-1.jpg",
                "/images/explore/temple-2.jpg",
            ],
        },
    },
    {
        id: "djamila",
        category: "history",
        title: "Cuicul (Djemila)",
        title_ar: "كويكول (جميلة)",
        title_fr: "Cuicul (Djemila)",
        subtitle: "The Beautiful City",
        subtitle_ar: "المدينة الجميلة",
        subtitle_fr: "La Belle Ville",
        image: "/images/explore/timgad-3.jpg",
        region: "Sétif",
        region_ar: "سطيف",
        region_fr: "Sétif",
        description: "A uniquely preserved Roman city situated in mountainous terrain, known for its adaptation to the landscape.",
        description_ar: "مدينة رومانية محفوظة بشكل فريد تقع في تضاريس جبلية، وتشتهر بتكيفها مع المناظر الطبيعية.",
        description_fr: "Une ville romaine unique et préservée située en terrain montagneux, connue pour son adaptation au paysage.",
        history: "Djemila, or Cuicul, was founded in the 1st century AD as a Roman military garrison. Its impressive ruins, including the forum, temples, basilicas, arches, and houses, are a testament to Roman town planning adapted to mountain locations. It is a UNESCO World Heritage site.",
        history_ar: "تأسست جميلة، أو كويكول، في القرن الأول الميلادي كحامية عسكرية رومانية. آثارها المثيرة للإعجاب، بما في ذلك المنتدى والمعابد والبازيليكا والأقواس والمنازل، هي شهادة على تخطيط المدن الرومانية المتكيف مع المواقع الجبلية. وهي موقع تراث عالمي لليونسكو.",
        history_fr: "Djemila, ou Cuicul, a été fondée au 1er siècle après J.-C. comme garnison militaire romaine. Ses ruines impressionnantes, notamment le forum, les temples, les basiliques, les arcs et les maisons, témoignent de l'urbanisme romain adapté aux sites montagneux. C'est un site classé au patrimoine mondial de l'UNESCO.",
        locations: ["Sétif", "Djemila"],
        locations_ar: ["سطيف", "جميلة"],
        locations_fr: ["Sétif", "Djemila"],
        media: {
            gallery: ["/images/explore/timgad-1.webp", "/images/explore/timgad-3.jpg"],
        },
    },
    {
        id: "mzab",
        category: "history",
        title: "M'zab Valley",
        title_ar: "وادي ميزاب",
        title_fr: "Vallée du M'zab",
        subtitle: "The Pentapolis",
        subtitle_ar: "المدن الخمس",
        subtitle_fr: "La Pentapole",
        image: "/images/explore/ghardaia.jpg",
        region: "Ghardaïa",
        region_ar: "غرداية",
        region_fr: "Ghardaïa",
        description: "A UNESCO World Heritage site consisting of five fortified cities (ksour) in the Sahara.",
        description_ar: "موقع للتراث العالمي لليونسكو يتكون من خمس مدن محصنة (قصور) في الصحراء.",
        description_fr: "Site classé au patrimoine mondial de l'UNESCO composé de cinq villes fortifiées (ksour) dans le Sahara.",
        history: "The M'zab Valley was settled by the Ibadis in the 10th century. Its five ksour—Ghardaïa, Beni Isguen, Melika, Bounoura, and El Atteuf—are known for their unique architecture designed for community living and adaptation to the desert environment. The simple, functional style has inspired modern architects like Le Corbusier.",
        history_ar: "استقر الإباضيون في وادي ميزاب في القرن العاشر. تشتهر قصوره الخمسة — غرداية، بني يزقن، مليكة، بونورة، والعطف — بهندستها المعمارية الفريدة المصممة للمعيشة المجتمعية والتكيف مع البيئة الصحراوية. ألهم الأسلوب البسيط والوظيفي المهندسين المعماريين الحديثين مثل لو كوربوزييه.",
        history_fr: "La vallée du M'zab a été colonisée par les Ibadites au Xe siècle. Ses cinq ksour — Ghardaïa, Beni Isguen, Melika, Bounoura et El Atteuf — sont connus pour leur architecture unique conçue pour la vie communautaire et l'adaptation à l'environnement désertique. Le style simple et fonctionnel a inspiré des architectes modernes comme Le Corbusier.",
        locations: ["Ghardaïa", "Beni Isguen"],
        locations_ar: ["غرداية", "بني يزقن"],
        locations_fr: ["Ghardaïa", "Beni Isguen"],
        media: {
            gallery: ["/images/explore/ghardaia.jpg"],
        },
    },
    {
        id: "tipaza",
        category: "history",
        title: "Tipaza Ruins",
        title_ar: "آثار تيبازة",
        title_fr: "Ruines de Tipaza",
        subtitle: "Where Sea Meets History",
        subtitle_ar: "أين يلتقي البحر بالتاريخ",
        subtitle_fr: "Où la Mer Rencontre l'Histoire",
        image: "/images/Tourist Spots in map images/tipaza_ruins.webp",
        region: "Tipaza",
        region_ar: "تيبازة",
        region_fr: "Tipaza",
        description: "A unique group of Phoenician, Roman, palaeo-Christian and Byzantine ruins overlooking the sea.",
        description_ar: "مجموعة فريدة من الآثار الفينيقية والرومانية والمسيحية القديمة والبيزنطية المطلة على البحر.",
        description_fr: "Un groupe unique de ruines phéniciennes, romaines, paléochrétiennes et byzantines surplombant la mer.",
        history: "Tipaza seems to have been founded by the Phoenicians. It became a Roman military colony and later a major center of Christianity in North Africa. The site comprises a unique group of ruins alongside indigenous monuments, all situated in a stunning coastal landscape.",
        history_ar: "يبدو أن تيبازة أسسها الفينيقيون. أصبحت مستعمرة عسكرية رومانية ولاحقًا مركزًا رئيسيًا للمسيحية في شمال إفريقيا. يضم الموقع مجموعة فريدة من الآثار إلى جانب الآثار الأصلية، وكلها تقع في مناظر طبيعية ساحلية خلابة.",
        history_fr: "Tipaza semble avoir été fondée par les Phéniciens. Elle est devenue une colonie militaire romaine et plus tard un centre majeur du christianisme en Afrique du Nord. Le site comprend un groupe unique de ruines ainsi que des monuments indigènes, tous situés dans un paysage côtier magnifique.",
        locations: ["Tipaza"],
        locations_ar: ["تيبازة"],
        locations_fr: ["Tipaza"],
        media: {
            gallery: ["/images/Tourist Spots in map images/tipaza_ruins.webp"],
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
        title_fr: "Plats Salés",
        subtitle: "The Heart of Algerian Cuisine",
        subtitle_ar: "قلب المطبخ الجزائري",
        subtitle_fr: "Le Cœur de la Cuisine Algérienne",
        image: "/images/explore/salty-couscous.jpg",
        region: "Nationwide",
        region_ar: "وطني",
        region_fr: "National",
        description: `
             <ul class="list-disc pl-5 space-y-1 text-white">
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://en.wikipedia.org/wiki/Couscous" target="_blank">Couscous</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://en.wikipedia.org/wiki/Chakhchoukha" target="_blank">Chakhchoukha</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D8%B1%D8%B4%D8%AA%D8%A9" target="_blank">Rechta</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D8%A8%D9%88%D8%B1%D8%A7%D9%83_(%D8%B7%D8%A8%D8%AE_%D8%AC%D8%B2%D8%A7%D8%A6%D8%B1%D9%8A)" target="_blank">Bourak</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D9%85%D8%AD%D8%A7%D8%AC%D8%A8" target="_blank">Mhajeb</a></strong></li>
            </ul>
        `,
        description_ar: `
             <ul class="list-disc pl-5 space-y-1 text-white">
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D9%83%D8%B3%D9%83%D8%B3" target="_blank">كسكس</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D8%B4%D8%AE%D8%B4%D9%88%D8%AE%D8%A9" target="_blank">شخشوخة</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D8%B1%D8%B4%D8%AA%D8%A9" target="_blank">رشتة</a></strong></li>
            </ul>
        `,
        description_fr: "Couscous, Chakhchoukha, Rechta, Bourak, Doubara, Hmis, Mhajeb, Samsa & Zfiti — les plats salés riches et diversifiés qui définissent l'identité algérienne.",
        history: "Algerian savory cuisine is a tapestry of Berber, Ottoman, Andalusian, and French influences.",
        history_ar: "المطبخ الجزائري المالح نسيج من التأثيرات الأمازيغية والعثمانية والأندلسية والفرنسية. الكسكس، المعترف به من قبل اليونسكو كتراث عالمي غير مادي، هو النبض — سميد مطهو بالبخار يقدم مع مرق غني يختلف حسب المنطقة. الشخشوخة، طبق الرعاة من الأوراس، تتكون من قطع خبز مسطح ممزقة منقوعة في صلصة طماطم حارة. الرشتة — نودلز رقيقة ملفوفة باليد — تزين كل احتفال بالمولد النبوي. البوراك، معجنات مقرمشة محشوة، تفتح كل إفطار رمضاني. الدوبارة، حساء الحمص في بسكرة، والحميس، سلطة الفلفل المشوي، هي أطباق أساسية محبوبة في جميع أنحاء البلاد.",
        history_fr: "La cuisine salée algérienne est une tapisserie d'influences berbères, ottomanes, andalouses et françaises. Le couscous, reconnu par l'UNESCO comme patrimoine mondial immatériel, en est le cœur — semoule cuite à la vapeur servie avec des ragoûts riches qui varient selon les régions. La Chakhchoukha, le plat du berger des Aurès, comprend du pain plat déchiré trempé dans une sauce tomate épicée. La Rechta — nouilles fines roulées à la main — orne chaque célébration du Mawlid. Le Bourak, pâtisseries farcies croustillantes, ouvre chaque iftar du Ramadan. La Doubara, la soupe de pois chiches de Biskra, et le Hmis, la salade de poivrons grillés, sont des incontournables aimés dans tout le pays.",
        locations: ["Algiers", "Constantine", "Biskra", "Tizi Ouzou"],
        locations_ar: ["الجزائر العاصمة", "قسنطينة", "بسكرة", "تيزي وزو"],
        locations_fr: ["Alger", "Constantine", "Biskra", "Tizi Ouzou"],
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
        title_fr: "Douceurs Sucrées",
        subtitle: "Algerian Pastry & Desserts",
        subtitle_ar: "المعجنات والحلويات الجزائرية",
        subtitle_fr: "Pâtisserie & Desserts Algériens",
        image: "/images/explore/kalb_el_louz.jpg",
        region: "Nationwide",
        region_ar: "وطني",
        region_fr: "National",
        description: `
             <ul class="list-disc pl-5 space-y-1 text-white">
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://en.wikipedia.org/wiki/Kalb_el_louz" target="_blank">Kalb El Louz</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://en.wikipedia.org/wiki/Algerian_baklava" target="_blank">Baklawa</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D8%B7%D9%85%D9%8A%D9%86%D8%A9_(%D8%A3%D9%83%D9%84%D8%A9)" target="_blank">Tamina</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://en.wikipedia.org/wiki/Baghrir" target="_blank">Baghrir</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D9%85%D8%A8%D8%B1%D8%AC%D8%A9" target="_blank">Braj</a></strong></li>
            </ul>
        `,
        description_ar: `
             <ul class="list-disc pl-5 space-y-1 text-white">
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D9%82%D9%84%D8%A8_%D8%A7%D9%84%D9%84%D9%88%D8%B2" target="_blank">قلب اللوز</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D8%A8%D9%82%D9%84%D8%A7%D9%88%D8%A9" target="_blank">بقلاوة</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D8%B7%D9%85%D9%8a%D9%86%D8%A9" target="_blank">طمينة</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D8%A8%D8%BA%D8%B1%D9%8A%D8%B1" target="_blank">بغرير</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D8%A8%D8%B1%D8%A7%D8%AC" target="_blank">براج</a></strong></li>
            </ul>
        `,
        description_fr: "Kalb El Louz, Baklawa, Tamina, Baghrir & Braj — gâteaux de semoule imbibés de sirop, pâtisseries étagées et crêpes arrosées de miel qui adoucissent chaque célébration.",
        history: "Algerian sweets are legendary across the Mediterranean. Kalb El Louz — 'Heart of Almonds' — is a dense semolina cake soaked in syrup, essential during Ramadan. Baklawa, layers of thin phyllo dough filled with almonds and bathed in honey, reflects Ottoman heritage. Tamina, a roasted semolina and honey paste, is prepared to celebrate newborns. Baghrir, the 'thousand-hole crepe', is drizzled with butter and honey for breakfast. Braj, date-filled cookies, are a Saharan specialty shared with coffee.",
        history_ar: "الحلويات الجزائرية أسطورية في جميع أنحاء البحر الأبيض المتوسط. قلب اللوز — كعكة سميد كثيفة غارقة في الشراب، ضرورية خلال رمضان. البقلاوة، طبقات من عجينة فيلو الرقيقة محشوة باللوز ومغمورة بالعسل، تعكس التراث العثماني. الطمينة، عجينة السميد المحمص والعسل، تحضر للاحتفال بالمواليد الجدد. البغرير، 'كريب الألف ثقب'، يُرش بالزبدة والعسل لوجبة الإفطار. البراج، كعك محشو بالتمر، تخصص صحراوي يُشارك مع القهوة.",
        history_fr: "Les douceurs algériennes sont légendaires à travers la Méditerranée. Le Kalb El Louz — 'Cœur d'Amandes' — est un gâteau de semoule dense imbibé de sirop, essentiel pendant le Ramadan. La Baklawa, couches de pâte phyllo fine remplies d'amandes et baignées de miel, reflète l'héritage ottoman. La Tamina, une pâte de semoule grillée et de miel, est préparée pour célébrer les nouveau-nés. Le Baghrir, la 'crêpe aux mille trous', est arrosé de beurre et de miel pour le petit-déjeuner. Le Braj, biscuits fourrés aux dattes, sont une spécialité saharienne partagée avec le café.",
        locations: ["Algiers", "Constantine", "Tlemcen", "Ghardaia"],
        locations_ar: ["الجزائر العاصمة", "قسنطينة", "تلمسان", "غرداية"],
        locations_fr: ["Alger", "Constantine", "Tlemcen", "Ghardaia"],
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
        title_fr: "Street Food",
        subtitle: "Quick, Hot & Unforgettable",
        subtitle_ar: "سريع، ساخن ولا يُنسى",
        subtitle_fr: "Rapide, Chaud & Inoubliable",
        image: "/images/explore/street-karantika.jpg",
        region: "Nationwide",
        region_ar: "وطني",
        region_fr: "National",
        description: `
             <ul class="list-disc pl-5 space-y-1 text-white">
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://en.wikipedia.org/wiki/Karantika" target="_blank">Karantika</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://en.wikipedia.org/wiki/Mhajeb" target="_blank">Mhajeb</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://en.wikipedia.org/wiki/Pizza_carr%C3%A9e" target="_blank">Pizza Carrée</a></strong></li>
            </ul>
        `,
        description_ar: `
             <ul class="list-disc pl-5 space-y-1 text-white">
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D9%83%D8%B1%D9%86%D8%AA%D9%8A%D9%83%D8%A7" target="_blank">كرانتيكا</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors"><a href="https://ar.wikipedia.org/wiki/%D9%85%D8%AD%D8%A7%D8%AC%D8%A8" target="_blank">محاجب</a></strong></li>
                <li><strong class="text-white underline decoration-brand decoration-2 underline-offset-4 hover:text-brand transition-colors">بيتزا كاري</strong></li>
            </ul>
        `,
        description_fr: "Karantika, Mhajeb, Pizza Carrée — les bouchées grésillantes, rapides et savoureuses qui alimentent les rues et les marchés animés d'Algérie.",
        history: "Algerian street food is an institution. Karantika (Garantita), a baked chickpea flour custard seasoned with cumin and served with harissa, is the undisputed king — originally from Oran, it has conquered the entire country. Mhajeb, flaky hand-stretched flatbreads stuffed with spicy tomato-onion filling (Chekchouka), require incredible skill to make paper-thin dough. Pizza Carrée, Algeria's unique square pizza sold by the slice, is a Franco-Algerian fusion found on every corner. These are the flavors of daily Algerian life.",
        history_ar: "أكل الشوارع الجزائري مؤسسة قائمة بذاتها. الكرانتيكا (قرنتيطة)، كاسترد دقيق الحمص المخبوز بالكمون ويقدم مع الهريسة، هي الملك بلا منازع — نشأت في وهران وغزت البلاد بأكملها. المحاجب، خبز مسطح مقرمش معجون يدويًا ومحشو بحشوة طماطم وبصل حارة (شكشوكة)، تتطلب مهارة مذهلة لصنع عجين رقيق كالورق. بيتزا كاري، بيتزا الجزائر المربعة الفريدة التي تباع بالشريحة، هي اندماج فرنسي-جزائري موجود في كل زاوية. هذه هي نكهات الحياة الجزائرية اليومية.",
        history_fr: "La street food algérienne est une institution. La Karantika (Garantita), un flan de farine de pois chiche cuit au four assaisonné de cumin et servi avec de l'harissa, est le roi incontesté — originaire d'Oran, elle a conquis tout le pays. Les Mhajeb, pains plats feuilletés étirés à la main farcis d'une garniture épicée tomate-oignon (Chekchouka), nécessitent une habileté incroyable pour faire une pâte fine comme du papier. La Pizza Carrée, la pizza carrée unique de l'Algérie vendue à la part, est une fusion franco-algérienne trouvée à chaque coin de rue. Ce sont les saveurs de la vie quotidienne algérienne.",
        locations: ["Oran", "Algiers", "Annaba", "Everywhere"],
        locations_ar: ["وهران", "الجزائر العاصمة", "عنابة", "في كل مكان"],
        locations_fr: ["Oran", "Alger", "Annaba", "Partout"],
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
        title_fr: "Le Karakou",
        subtitle: "The Queen of Algiers",
        subtitle_ar: "ملكة الجزائر",
        subtitle_fr: "La Reine d'Alger",
        image: "/images/explore/karakou.jpg",
        region: "Algiers",
        region_ar: "الجزائر العاصمة",
        region_fr: "Alger",
        description: "A luxurious velvet jacket embroidered with gold thread (Fetla or Majboud), worn with a 'Seroual Chelqa' or 'Mdawer'. It is the centerpiece of the Algiers bride's trousseau.",
        description_ar: "سترة مخملية فاخرة مطرزة بخيوط ذهبية (فتلة أو مجبود)، تلبس مع 'سروال شلقة' أو 'مدور'. وهي القطعة المركزية في جهاز العروس العاصمية.",
        description_fr: "Une veste en velours luxueuse brodée de fil d'or (Fetla ou Majboud), portée avec un 'Seroual Chelqa' ou 'Mdawer'. C'est la pièce maîtresse du trousseau de la mariée algéroise.",
        history: "Originating in the 15th century in Algiers, the Karakou is the quintessential wedding attire. The velvet symbolizes nobility, while the intricate gold embroidery tells stories of Andalusian and Ottoman influences merged into a unique Algerian identity. It has evolved from everyday aristocratic dress to a ceremonial masterpiece, often passed down from mother to daughter.",
        history_ar: "نشأ الكاراكو في القرن الخامس عشر في الجزائر العاصمة، وهو زي الزفاف بامتياز. يرمز المخمل إلى النبالة، بينما يحكي التطريز الذهبي المعقد قصصًا عن التأثيرات الأندلسية والعثمانية المدمجة في هوية جزائرية فريدة. لقد تطور من لباس أرستقراطي يومي إلى تحفة احتفالية، غالباً ما تنتقل من الأم إلى الابنة.",
        history_fr: "Originaire du XVe siècle à Alger, le Karakou est la tenue de mariage par excellence. Le velours symbolise la noblesse, tandis que la broderie d'or complexe raconte des histoires d'influences andalouses et ottomanes fusionnées en une identité algérienne unique. Il a évolué d'une robe aristocratique quotidienne à un chef-d'œuvre cérémoniel, souvent transmis de mère en fille.",
        locations: ["Algiers", "Blida", "Tipaza"],
        locations_ar: ["الجزائر العاصمة", "البليدة", "تيبازة"],
        locations_fr: ["Alger", "Blida", "Tipaza"],
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
        title_fr: "Tenue Amazighe",
        subtitle: "North African Colors",
        subtitle_ar: "ألوان شمال أفريقيا",
        subtitle_fr: "Couleurs d'Afrique du Nord",
        image: "/images/explore/amazigh-jubakabyle.jpg",
        region: "Kabylia / Aurès / Mzab",
        region_ar: "القبائل / الأوراس / ميزاب",
        region_fr: "Kabylie / Aurès / Mzab",
        description: "From the colorful Zigzag patterns of the Kabyle Dress to the flowing Melhfa of the Chaouia and the woven Houli of the Mzab.",
        description_ar: "من أنماط الزمتع المتعرجة الملونة للفستان القبائلي إلى الملحفة الانسيابية للشاوية والحولي المنسوج للمزاب.",
        description_fr: "Des motifs Zigzag colorés de la Robe Kabyle à la Melhfa fluide des Chaouia et au Houli tissé du Mzab.",
        history: "Amazigh clothing is distinct for its geometric patterns and vibrant colors, representing the connection to the land and the tribe. The 'Robe Kabyle' is famous for its yellow and red hues and silver jewelry. The 'Chaoui Melhfa' is a draped garment held by silver fibulae. These dresses are not just fashion; they are markers of identity, with specific patterns often indicating a woman's region or status.",
        history_ar: "تتميز الملابس الأمازيغية بأنماطها الهندسية وألوانها الزاهية، التي تمثل الارتباط بالأرض والقبيلة. تشتهر 'الجبة القبائلية' بألوانها الصفراء والحمراء ومجوهراتها الفضية. 'الملحفة الشاوية' هي ثوب ملفوف مثبت بدبابيس فضية. هذه الفساتين ليست مجرد موضة؛ إنها علامات للهوية، حيث تشير أنماط معينة غالبًا إلى منطقة المرأة أو وضعها الاجتماعي.",
        history_fr: "Les vêtements amazighs se distinguent par leurs motifs géométriques et leurs couleurs vives, représentant le lien avec la terre et la tribu. La 'Robe Kabyle' est célèbre pour ses teintes jaunes et rouges et ses bijoux en argent. La 'Melhfa Chaouia' est un vêtement drapé maintenu par des fibules en argent. Ces robes ne sont pas seulement de la mode ; ce sont des marqueurs d'identité, des motifs spécifiques indiquant souvent la région ou le statut d'une femme.",
        locations: ["Tizi Ouzou", "Batna", "Ghardaia"],
        locations_ar: ["تيزي وزو", "باتنة", "غرداية"],
        locations_fr: ["Tizi Ouzou", "Batna", "Ghardaia"],
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
        title_ar: "الشدة التلمسانية",
        title_fr: "Chedda de Tlemcen",
        subtitle: "Royal Bridal Regalia",
        subtitle_ar: "زي الزفاف الملكي",
        subtitle_fr: "Parure Nuptiale Royale",
        image: "/images/explore/chedda.jpg",
        region: "Tlemcen",
        region_ar: "تلمسان",
        region_fr: "Tlemcen",
        description: "A UNESCO-recognized bridal costume involving multiple layers of caftans, heavy pearl jewelry, and a conical velvet headdress.",
        description_ar: "زي زفاف معترف به من قبل اليونسكو يتضمن طبقات متعددة من القفطان، ومجوهرات لؤلؤية ثقيلة، وغطاء رأس مخملي مخروطي الشكل.",
        description_fr: "Un costume de mariée reconnu par l'UNESCO impliquant plusieurs couches de caftans, de lourds bijoux en perles et une coiffe conique en velours.",
        history: "The Chedda is a historical dress worn by the princesses of Zianid Tlemcen. It represents the bride's transition into royalty on her wedding day. The costume consists of a caftan, a 'blousa', and mountains of jewelry. It is considered a masterpiece of intangible heritage, preserving the craftsmanship of Tlemcen's artisans for centuries.",
        history_ar: "الشدة هي فستان تاريخي كانت ترتديه أميرات تلمسان الزيانية. إنها تمثل انتقال العروس إلى الملوكية في يوم زفافها. يتكون الزي من قفطان و'بلوزة' وجبال من المجوهرات. يعتبر تحفة من التراث غير المادي، حيث يحافظ على براعة حرفيي تلمسان لقرون.",
        history_fr: "La Chedda est une robe historique portée par les princesses de Tlemcen Zianide. Elle représente la transition de la mariée vers la royauté le jour de son mariage. Le costume se compose d'un caftan, d'une 'blousa' et de montagnes de bijoux. Il est considéré comme un chef-d'œuvre du patrimoine immatériel, préservant le savoir-faire des artisans de Tlemcen depuis des siècles.",
        locations: ["Tlemcen", "Oran"],
        locations_ar: ["تلمسان", "وهران"],
        locations_fr: ["Tlemcen", "Oran"],
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
        title_fr: "Le Haïk",
        subtitle: "The White Veil",
        subtitle_ar: "الحجاب الأبيض",
        subtitle_fr: "Le Voile Blanc",
        image: "/images/explore/hayk-1.jpg",
        region: "Algiers / North",
        region_ar: "الجزائر العاصمة / الشمال",
        region_fr: "Alger / Nord",
        description: "A traditional large white wool or silk veil wrapping the body, symbolizing purity, modesty, and resistance.",
        description_ar: "حجاب أبيض كبير تقليدي من الصوف أو الحرير يلف الجسم، ويرمز إلى النقاء والتواضع والمقاومة.",
        description_fr: "Un grand voile blanc traditionnel en laine ou en soie enveloppant le corps, symbolisant la pureté, la modestie et la résistance.",
        history: "The Hayek is more than a garment; it is a symbol of Algerian resistance. During the war of independence, women used it to hide messages or weapons, and even men wore it to escape French soldiers. In Algiers, the white 'Hayek Mrama' was the standard of elegance. Though less common today, it remains a cherished symbol of Algerian heritage and is worn on special occasions.",
        history_ar: "الحايك أكثر من مجرد ثوب؛ إنه رمز للمقاومة الجزائرية. خلال حرب الاستقلال، استخدمته النساء لإخفاء الرسائل أو الأسلحة، وحتى الرجال ارتدوه للهروب من الجنود الفرنسيين. في الجزائر العاصمة، كان 'حايك مرمة' الأبيض معيار الأناقة. على الرغم من أنه أقل شيوعًا اليوم، إلا أنه لا يزال رمزًا عزيزًا للتراث الجزائري ويتم ارتداؤه في المناسبات الخاصة.",
        history_fr: "Le Haïk est plus qu'un vêtement ; c'est un symbole de la résistance algérienne. Pendant la guerre d'indépendance, les femmes l'utilisaient pour cacher des messages ou des armes, et même les hommes le portaient pour échapper aux soldats français. À Alger, le 'Haïk Mrama' blanc était l'étalon de l'élégance. Bien que moins courant aujourd'hui, il reste un symbole chéri du patrimoine algérien et est porté lors d'occasions spéciales.",
        locations: ["Algiers", "Blida", "Constantine"],
        locations_ar: ["الجزائر العاصمة", "البليدة", "قسنطينة"],
        locations_fr: ["Alger", "Blida", "Constantine"],
        media: {
            gallery: [
                "/images/explore/hayk-1.jpg",
                "/images/explore/hayk-2.jpg",
                "/images/explore/hayk-3.jpg",
                "/images/explore/hayk-4.jpg",
                "/images/explore/hayk-5.jpg",
            ],
        },
    },
    {
        id: "kaftan",
        category: "clothing",
        title: "The Kaftan",
        title_ar: "القفطان",
        title_fr: "Le Kaftan",
        subtitle: "Elegance Reimagined",
        subtitle_ar: "الأناقة المعاد تصورها",
        subtitle_fr: "L'Élégance Réinventée",
        image: "/images/explore/kaftan.webp",
        region: "Nationwide",
        region_ar: "وطني",
        region_fr: "National",
        description: "A long, flowing robe often made of silk or velvet, intricately embroidered and worn on special occasions.",
        description_ar: "رداء طويل انسيابي مصنوع غالباً من الحرير أو المخمل، ومطرز بشكل معقد ويتم ارتداؤه في المناسبات الخاصة.",
        description_fr: "Une longue robe fluide souvent faite de soie ou de velours, finement brodée et portée lors d'occasions spéciales.",
        history: "The Algerian Kaftan has deep historical roots, influenced by Ottoman and Andalusian styles. Distinct from its Moroccan counterpart, the Algerian Kaftan (often called 'Mansouria' or castan) is known for its specific cut and embroidery techniques like 'Mejboud'. It remains a symbol of status and beauty.",
        history_ar: "القفطان الجزائري له جذور تاريخية عميقة، وتأثر بالأنماط العثمانية والأندلسية. يختلف القفطان الجزائري (الذي يسمى غالباً 'المنصورية' أو القفطان) عن نظيره المغربي، ويتميز بقصته الخاصة وتقنيات التطريز مثل 'المجبود'. لا يزال رمزاً للمكانة والجمال.",
        history_fr: "Le Kaftan algérien a des racines historiques profondes, influencé par les styles ottomans et andalous. Distinct de son homologue marocain, le Kaftan algérien (souvent appelé 'Mansouria' ou caftan) est connu pour sa coupe spécifique et ses techniques de broderie comme le 'Aâkad'. Il reste un symbole de statut et de beauté.",
        locations: ["Algiers", "Tlemcen", "Constantine"],
        locations_ar: ["الجزائر العاصمة", "تلمسان", "قسنطينة"],
        locations_fr: ["Alger", "Tlemcen", "Constantine"],
        media: {
            gallery: [
                "/images/explore/kaftan.webp",
                "/images/explore/kaftan-1.webp",
                "/images/explore/kaftan-2.webp",
                "/images/explore/kaftan-3.jpg",
                "/images/explore/kaftan-4.jpg",
                "/images/explore/kaftan-6.jpg",
                "/images/explore/kaftan-7.jpg",
            ],
        },
    },
    {
        id: "naili",
        category: "clothing",
        title: "Naili Dress",
        title_ar: "الزي النايلي",
        title_fr: "Robe Naili",
        subtitle: "Pride of the Ouled Naïl",
        subtitle_ar: "فخر أولاد نايل",
        subtitle_fr: "Fierté des Ouled Naïl",
        image: "/images/explore/naili.jpg",
        region: "Djelfa / Bou Saada",
        region_ar: "الجلفة / بوسعادة",
        region_fr: "Djelfa / Bou Saada",
        description: "A winged white or flowery dress worn with a feather-adorned headdress and heavy silver jewelry.",
        description_ar: "فستان أبيض أو مزهر مجنح يرتدى مع غطاء رأس مزين بالريش ومجوهرات فضية ثقيلة.",
        description_fr: "Une robe blanche ou fleurie ailée portée avec une coiffe ornée de plumes et de lourds bijoux en argent.",
        history: "The Naili dress is the attire of the Ouled Naïl tribe of the steppe. Famous for their dancers and freedom, the women wear this distinctive dress which accentuates movement. The jewelry, particularly the spiked bracelets and headchains, served both as ornamentation and defense.",
        history_ar: "الزي النايلي هو زي قبيلة أولاد نايل في السهوب. تشتهر النساء براقصاتهن وحريتهن، ويرتدين هذا الفستان المميز الذي يبرز الحركة. المجوهرات، وخاصة الأساور المسننة وسلاسل الرأس، كانت بمثابة زينة ودفاع في نفس الوقت.",
        history_fr: "La robe Naili est la tenue de la tribu Ouled Naïl de la steppe. Célèbres pour leurs danseuses et leur liberté, les femmes portent cette robe distinctive qui accentue le mouvement. Les bijoux, en particulier les bracelets à pointes et les chaînes de tête, servaient à la fois d'ornement et de défense.",
        locations: ["Djelfa", "Bou Saada", "M'Sila"],
        locations_ar: ["الجلفة", "بوسعادة", "المسيلة"],
        locations_fr: ["Djelfa", "Bou Saada", "M'Sila"],
        media: {
            gallery: [
                "/images/explore/naili.jpg",
                "/images/explore/naili-1.jpeg",
                "/images/explore/naili-2.jpg",
                "/images/explore/naili-3.jpg",
                "/images/explore/naili-4.jpg",
                "/images/explore/naili-5.jpg",
                "/images/explore/naili-6.jpg",
            ],
        },
    }
];
