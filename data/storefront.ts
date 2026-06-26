export type MenuItem = {
  id: string;
  category: string;
  name: string;
  price: number;
  description: string;
};

export type Branch = {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  delivery: string;
  position: [number, number];
};

export type AddressDraft = {
  city: string;
  area: string;
  neighborhood: string;
  street: string;
  buildingNumber: string;
  floor: string;
  apartment: string;
  apartmentNumber: string;
};

export type LocationPoint = {
  lat: number;
  lng: number;
  source: "gps" | "map";
};

export type OrderType = "delivery" | "pickup";

export type CartLine = MenuItem & {
  quantity: number;
  options: string[];
};

export type DemoOrder = {
  id: string;
  createdAt: string;
  status: "new";
  customer: {
    name: string;
    phone: string;
  };
  orderType: OrderType;
  paymentMethod: "cash";
  address?: AddressDraft;
  location?: LocationPoint;
  branch?: Branch;
  notes: string;
  items: CartLine[];
  subtotal: number;
};

const groupedMenu = [
  {
    category: "قسم الشاورما السندوتشات",
    items: [
      { id: "sh1", name: "شاورما مع بطاطس - دجاج", price: 100, description: "ساندوتش شاورما دجاج مميز يقدم مع البطاطس المقرمشة والتومية." },
      { id: "sh2", name: "بيج شاورما عيش تنور - دجاج", price: 110, description: "قطع شاورما الدجاج المتبلة بداخل خبز التنور الساخن الفريد." },
      { id: "sh3", name: "بيج شاورما عيش تنور - لحم", price: 140, description: "لحم بلدي فاخر بخلطة بيج الخاصة بداخل خبز التنور." },
      { id: "sh4", name: "شاورما عيش سوري - دجاج", price: 75, description: "الكساء السوري التقليدي المحشو بالشاورما والتومية والمخلل." },
      { id: "sh5", name: "شاورما عيش سوري - لحم", price: 110, description: "قطع لحم الشاورما مع الطحينة والمخلل في خبز سوري مقرمش." },
      { id: "sh6", name: "شاورما عيش فينو بيج - دجاج", price: 110, description: "ساندوتش فينو عائلي محشو بالدجاج الغني والصوص الخاص." },
      { id: "sh7", name: "شاورما عيش فينو بيج - لحم", price: 150, description: "ساندوتش فينو حجم ملكي محشو بالشاورما اللحم والخلطة الفاخرة." },
      { id: "sh8", name: "كايزر بيج 12 إنش - دجاج", price: 90, description: "خبز كايزر دائري عملاق 12 إنش محشو بقطع الدجاج الوفيرة." },
      { id: "sh9", name: "كايزر بيج 12 إنش - لحم", price: 120, description: "خبز كايزر عملاق 12 إنش مليء بشاورما اللحم وطعم لا ينسى." },
    ],
  },
  {
    category: "الوجبات الكاملة والفتة",
    items: [
      { id: "m1", name: "وجبة شاورما تنور - دجاج", price: 185, description: "تقدم مع الأرز الأصفر، البطاطس، التومية، والمخلل المقرمش." },
      { id: "m2", name: "وجبة شاورما تنور - لحم", price: 230, description: "تقدم مع الأرز، البطاطس، الطحينة، والمخلل." },
      { id: "m3", name: "وجبة شاورما تنور - ميكس", price: 195, description: "توليفة رائعة من شاورما الدجاج واللحم مع كامل ملحقات الوجبة." },
      { id: "m4", name: "وجبة ماريا إكسترا - دجاج", price: 180, description: "خبز الماريا المحشو بالدجاج والجبنة الذائبة والمحمص على الفحم." },
      { id: "m5", name: "وجبة ماريا إكسترا - لحم", price: 240, description: "خبز الماريا المحشو باللحم والجبن الغني المشوي بعناية." },
      { id: "m6", name: "فتة شاورما - دجاج", price: 125, description: "طبق الفتة الشهير بقطع الدجاج المقرمش والأرز وصوص التومية الغني." },
      { id: "m7", name: "فتة شاورما - لحم", price: 155, description: "طبق فتة اللحم مع الأرز والعيش المحمص وصوص الطحينة المميز." },
      { id: "m8", name: "كيلو شاورما دجاج كامل", price: 700, description: "كمية صافية من شاورما الدجاج مع علب الثومية والمخلل والخبز." },
      { id: "m9", name: "كيلو شاورما لحم كامل", price: 1015, description: "كيلو كامل من اللحم الصافي المجهز للتقديم المباشر مع الملحقات الحارة." },
    ],
  },
  {
    category: "قسم البيتزا الفاخرة",
    items: [
      { id: "pz1", name: "بيتزا مارجريتّا عائلية", price: 225, description: "صوص الطماطم الإيطالي الغني مع طبقات مكثفة من جبن الموتزاريلا النقي." },
      { id: "pz2", name: "بيتزا شاورما فراخ - كبير", price: 255, description: "موتزاريلا، صوص خاص، محشوة بقطع شاورما الدجاج العريقة." },
      { id: "pz3", name: "بيتزا شاورما لحمة - كبير", price: 310, description: "عجينة إيطالية هشة مغطاة بشاورما اللحم والجبن الشيدر والموتزاريلا." },
      { id: "pz4", name: "بيتزا سجق بلدي - كبير", price: 250, description: "قطع السجق البلدي المتبل مع الخضروات الطازجة والموتزاريلا." },
      { id: "pz5", name: "بيتزا رانش دجاج - كبير", price: 250, description: "قطع الدجاج مع صوص الرانش الأبيض الغني والزيتون الأسود." },
    ],
  },
  {
    category: "قسم الصواني والولائم",
    items: [
      { id: "tr1", name: "صينية الشامي (تكفي 4 أفراد)", price: 1350, description: "ربع كيلو كفتة، نصف كيلو كباب، ربع شيش طاووق، فرخة كاملة، 2 كيلو أرز، سلطات ومخللات." },
      { id: "tr2", name: "صينية الأكيلة (تكفي 8 أفراد)", price: 2550, description: "نصف كيلو كباب، كيلو كفتة كامل، كيلو شيش طاووق، فرختين على الفحم، أرز عائلي ضخم، سلطات مشكلة." },
      { id: "tr3", name: "صينية بيج العملاقة (تكفي 12 فرد)", price: 3800, description: "نصف كيلو ريش، كيلو كفتة، كيلو شيش، فرختين، نصف كيلو كباب، أرز بسمتي مكثف، و12 طبق سلطة فرعي." },
      { id: "tr4", name: "صينية أنا وأنت (مشاركة لفردين)", price: 800, description: "نصف فرخة، سيخ كفتة، سيخ شقف، سيخ شيش طاووق، سيخ كفتة فراخ، تقدم مع الأرز والسلطة." },
    ],
  },
  {
    category: "قسم المشويات والمدخن",
    items: [
      { id: "gr1", name: "فرخة كاملة على الفحم مع الأرز", price: 380, description: "دجاجة متبلة وممشوقة على الفحم تقدم ساخنة مع الأرز الأصفر العريض." },
      { id: "gr2", name: "طاجن سجق بلدي بدبس الرمان", price: 240, description: "طاجن فخاري أصيل مطهو بداخل الفرن مع صوص دبس الرمان الحامض والحلو." },
      { id: "gr3", name: "كتف ضاني مدخن أسطوري", price: 1245, description: "كتف ضاني مدخن ببطء شديد يذوب بالفم، يقدم مع الأرز الفاخر والمكسرات وصوص الدقوس." },
      { id: "gr4", name: "وجبة كفتة مشوية على الفحم", price: 215, description: "أصابع الكفتة المتبلة بالبقدونس والبهارات الشرقية مع الأرز والسلطات." },
    ],
  },
  {
    category: "المعجنات والمناقيش",
    items: [
      { id: "mn1", name: "لحمة على عجين تقليدية", price: 50, description: "العجين الرقيق المغطى باللحم المفروم المتبل بدقة بالطريقة الشامية." },
      { id: "mn2", name: "منقوشة جبنة موتزاريلا سايحة", price: 120, description: "طبقة غنية جداً من الجبن الموتزاريلا الفاخر المحمص داخل الفرن." },
      { id: "mn3", name: "حواوشي بيج إكسترا بلدي", price: 130, description: "رغيف بلدي محشو باللحم المفروم الحار والبهارات القوية ومحمص بالزبدة." },
    ],
  },
];

export const menuGroups = groupedMenu.map((group) => ({
  category: group.category,
  items: group.items.map((item) => ({ ...item, category: group.category })),
}));

export const menuItems: MenuItem[] = menuGroups.flatMap((group) => group.items);

export const branches: Branch[] = [
  {
    id: "nasr-city",
    name: "فرع مدينة نصر",
    area: "شرق القاهرة",
    address: "شارع الطيران، أمام منطقة المطاعم",
    phone: "0100 555 9211",
    hours: "12 ظهراً - 3 فجراً",
    delivery: "يغطي مدينة نصر ومصر الجديدة",
    position: [30.0588, 31.3302],
  },
  {
    id: "tagamoa",
    name: "فرع التجمع",
    area: "القاهرة الجديدة",
    address: "محور التسعين، بوابة الفود كورت",
    phone: "0109 442 7788",
    hours: "1 ظهراً - 4 فجراً",
    delivery: "يغطي التجمع والرحاب ومدينتي",
    position: [30.0217, 31.4997],
  },
  {
    id: "october",
    name: "فرع أكتوبر",
    area: "غرب القاهرة",
    address: "الحصري، بجوار المول الرئيسي",
    phone: "0112 804 3321",
    hours: "11 صباحاً - 2 فجراً",
    delivery: "يغطي أكتوبر والشيخ زايد",
    position: [29.9668, 30.9469],
  },
  {
    id: "maadi",
    name: "فرع المعادي",
    area: "جنوب القاهرة",
    address: "شارع النصر، بجوار محطة البنزين",
    phone: "0106 771 8822",
    hours: "12 ظهراً - 2 فجراً",
    delivery: "يغطي المعادي وزهراء المعادي",
    position: [29.9602, 31.2569],
  },
];

export const addressBook = {
  القاهرة: {
    "مدينة نصر": ["الحي السابع", "عباس العقاد", "مصطفى النحاس", "شارع الطيران"],
    "مصر الجديدة": ["الكوربة", "روكسي", "النزهة", "أرض الجولف"],
    المعادي: ["دجلة", "زهراء المعادي", "شارع النصر", "حدائق المعادي"],
  },
  الجيزة: {
    "أكتوبر": ["الحصري", "الحي الأول", "الحي السابع", "مول العرب"],
    "الشيخ زايد": ["الحي الثالث", "هايبر وان", "الحي السادس عشر", "زايد 2000"],
  },
  "القاهرة الجديدة": {
    التجمع: ["التسعين الشمالي", "التسعين الجنوبي", "البنفسج", "الياسمين"],
    الرحاب: ["السوق الشرقي", "بوابة 6", "بوابة 13", "المول"],
  },
} as const;

export const defaultAddress: AddressDraft = {
  city: "",
  area: "",
  neighborhood: "",
  street: "",
  buildingNumber: "",
  floor: "",
  apartment: "",
  apartmentNumber: "",
};

export function currency(value: number) {
  return `${value.toLocaleString("ar-EG")} جنيه`;
}