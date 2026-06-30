// ─── Types ───────────────────────────────────────────────────────────────────

// في storefront.ts — غير الـ MenuItem type
export type MenuItem = {
  id: string;
  category: string;
  name: string;
  price: number;
  description: string;
  image?: string;           // ← زود السطر ده
  isPopular?: boolean;
  tag?: "جديد" | "الأكثر طلباً" | "عرض محدود";
  estimatedMinutes?: number;
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

export type OrderStatus =
  | "new"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type CartLine = MenuItem & {
  quantity: number;
  options: string[];
};

export type DemoOrder = {
  id: string;
  createdAt: string;
  status: OrderStatus;
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
  deliveryFee: number;
  total: number;
  estimatedMinutes?: number;
};

// ─── Order Status Config ──────────────────────────────────────────────────────

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: "طلب جديد",
  confirmed: "تم التأكيد",
  preparing: "جاري التحضير",
  ready: "الطلب جاهز",
  out_for_delivery: "في الطريق إليك",
  delivered: "تم التسليم",
  cancelled: "ملغي",
};

export const ORDER_STATUS_ICONS: Record<OrderStatus, string> = {
  new: "🧾",
  confirmed: "✅",
  preparing: "👨‍🍳",
  ready: "📦",
  out_for_delivery: "🛵",
  delivered: "🎉",
  cancelled: "❌",
};

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  "new",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
];

export const DELIVERY_FEE = 25;

// ─── Menu Data ────────────────────────────────────────────────────────────────

export const groupedMenu = [
  {
    category: "قسم الشاورما السندوتشات",
    items: [
      { id: "sh1", name: "شاورما مع بطاطس - دجاج", price: 100, description: "ساندوتش شاورما دجاج مميز يقدم مع البطاطس المقرمشة والتومية.", estimatedMinutes: 15 },
      { id: "sh2", name: "بيج شاورما عيش تنور - دجاج", price: 110, description: "قطع شاورما الدجاج المتبلة بداخل خبز التنور الساخن الفريد.", isPopular: true, tag: "الأكثر طلباً" as const, estimatedMinutes: 15 },
      { id: "sh3", name: "بيج شاورما عيش تنور - لحم", price: 140, description: "لحم بلدي فاخر بخلطة بيج الخاصة بداخل خبز التنور.", estimatedMinutes: 18 },
      { id: "sh4", name: "شاورما عيش سوري - دجاج", price: 75, description: "الكساء السوري التقليدي المحشو بالشاورما والتومية والمخلل.", estimatedMinutes: 12 },
      { id: "sh5", name: "شاورما عيش سوري - لحم", price: 110, description: "قطع لحم الشاورما مع الطحينة والمخلل في خبز سوري مقرمش.", estimatedMinutes: 15 },
      { id: "sh6", name: "شاورما عيش فينو بيج - دجاج", price: 110, description: "ساندوتش فينو عائلي محشو بالدجاج الغني والصوص الخاص.", estimatedMinutes: 15 },
      { id: "sh7", name: "شاورما عيش فينو بيج - لحم", price: 150, description: "ساندوتش فينو حجم ملكي محشو بالشاورما اللحم والخلطة الفاخرة.", estimatedMinutes: 18 },
      { id: "sh8", name: "كايزر بيج 12 إنش - دجاج", price: 90, description: "خبز كايزر دائري عملاق 12 إنش محشو بقطع الدجاج الوفيرة.", estimatedMinutes: 15 },
      { id: "sh9", name: "كايزر بيج 12 إنش - لحم", price: 120, description: "خبز كايزر عملاق 12 إنش مليء بشاورما اللحم وطعم لا ينسى.", estimatedMinutes: 18 },
    ],
  },
  {
    category: "الوجبات الكاملة والفتة",
    items: [
      { id: "m1", name: "وجبة شاورما تنور - دجاج", price: 185, description: "تقدم مع الأرز الأصفر، البطاطس، التومية، والمخلل المقرمش.", estimatedMinutes: 20 },
      { id: "m2", name: "وجبة شاورما تنور - لحم", price: 230, description: "تقدم مع الأرز، البطاطس، الطحينة، والمخلل.", estimatedMinutes: 22 },
      { id: "m3", name: "وجبة شاورما تنور - ميكس", price: 195, description: "توليفة رائعة من شاورما الدجاج واللحم مع كامل ملحقات الوجبة.", isPopular: true, tag: "الأكثر طلباً" as const, estimatedMinutes: 22 },
      { id: "m4", name: "وجبة ماريا إكسترا - دجاج", price: 180, description: "خبز الماريا المحشو بالدجاج والجبنة الذائبة والمحمص على الفحم.", estimatedMinutes: 20 },
      { id: "m5", name: "وجبة ماريا إكسترا - لحم", price: 220, description: "تشكيلة مميزة من شاورما اللحم مع الجبنة والخبز الهش.", estimatedMinutes: 22 },
      { id: "m6", name: "فتة شاورما دجاج", price: 160, description: "فتة بالطحينة الكريمية فوقها قطع شاورما الدجاج والمكسرات.", isPopular: true, estimatedMinutes: 18 },
      { id: "m7", name: "فتة شاورما لحم", price: 200, description: "الفتة الفاخرة بقطع اللحم الطرية والتوابل الأصيلة.", estimatedMinutes: 20 },
    ],
  },
  {
    category: "التتبيلات والمشاوي",
    items: [
      { id: "tr1", name: "تتبيلة دجاج كاملة", price: 320, description: "دجاجة كاملة مشوية على التتبيلة الخاصة ببيج شاورما.", estimatedMinutes: 30 },
      { id: "tr2", name: "نص تتبيلة دجاج", price: 170, description: "نصف دجاجة مشوية بالطريقة التقليدية مع الصوص الخاص.", estimatedMinutes: 25 },
      { id: "tr3", name: "ربع تتبيلة دجاج", price: 95, description: "ربع دجاجة مشوي طازج مع الطحينة والليمون.", estimatedMinutes: 20 },
      { id: "tr4", name: "كفتة مشوية", price: 140, description: "أصابع الكفتة المشوية على الفحم بتوابل بيج المميزة.", isPopular: true, tag: "جديد" as const, estimatedMinutes: 20 },
      { id: "tr5", name: "مشكل مشاوي للاثنين", price: 380, description: "طبق مشاوي مشكلة للاثنين، دجاج ولحم مع الملحقات الكاملة.", estimatedMinutes: 35 },
    ],
  },
  {
    category: "الإضافات والمقبلات",
    items: [
      { id: "s1", name: "بطاطس عادية", price: 35, description: "بطاطس مقرمشة مقلية طازجة.", estimatedMinutes: 10 },
      { id: "s2", name: "بطاطس إكسترا لارج", price: 55, description: "بطاطس بحجم إكسترا لارج للجوع الكبير.", estimatedMinutes: 10 },
      { id: "s3", name: "سلطة خضراء", price: 40, description: "سلطة خضراء طازجة مع عصير الليمون والزيت.", estimatedMinutes: 5 },
      { id: "s4", name: "تومية إضافية", price: 15, description: "تومية كريمية ناعمة مصنوعة يومياً.", estimatedMinutes: 3 },
      { id: "s5", name: "طحينة إضافية", price: 15, description: "طحينة طبيعية بالليمون والثوم.", estimatedMinutes: 3 },
      { id: "s6", name: "مخلل مشكل", price: 20, description: "مخلل مشكل محلي طازج.", estimatedMinutes: 3 },
      { id: "s7", name: "جبنة إضافية", price: 25, description: "جبنة موزاريلا ذائبة.", estimatedMinutes: 5 },
      { id: "s8", name: "أرز أصفر", price: 30, description: "أرز أصفر بالكركم والتوابل.", estimatedMinutes: 8 },
    ],
  },
  {
    category: "المشروبات",
    items: [
      { id: "d1", name: "مياه معدنية", price: 10, description: "زجاجة مياه معدنية 500 مل.", estimatedMinutes: 1 },
      { id: "d2", name: "مشروب غازي", price: 20, description: "مشروب غازي بالاختيار من المتوفر.", estimatedMinutes: 1 },
      { id: "d3", name: "عصير طازج", price: 35, description: "عصير فاكهة طازجة موسمية.", estimatedMinutes: 5 },
      { id: "d4", name: "ليمون بالنعناع", price: 30, description: "ليمون طازج مع النعناع والسكر.", estimatedMinutes: 5 },
    ],
  },
] as const;

export const menuItems: MenuItem[] = groupedMenu.flatMap((g) =>
  g.items.map((item) => ({ ...item, category: g.category }))
);

export const categories = groupedMenu.map((g) => g.category);

// ─── Branches ─────────────────────────────────────────────────────────────────

export const branches: Branch[] = [
  {
    id: "b1",
    name: "فرع شربين",
    area: "شربين",
    address: "شارع الجيش، بجوار سنترال شربين",
    phone: "01080644406",
    hours: "10 ص - 2 ص",
    delivery: "30-45 دقيقة",
    position: [31.1994, 31.5556],
  },
  {
    id: "b2",
    name: "فرع بلقاس",
    area: "بلقاس",
    address: "شارع الحرية، أبو رجيله، أمام المحكمة",
    phone: "01090706444",
    hours: "10 ص - 2 ص",
    delivery: "30-45 دقيقة",
    position: [31.1584, 31.558],
  },
];
// ─── Helpers ──────────────────────────────────────────────────────────────────

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

export const defaultDeliveryAreas: Record<string, string[]> = {
  الدقهلية: ["شربين", "بلقاس", "المنصورة", "طلخا", "ميت غمر", "أجا", "السنبلاوين", "منية النصر"],
};

export const contactNumbers = [
  "01080644406",
  "01090706444",
  "0502802862",
];

export function currency(value: number) {
  return `${value.toLocaleString("ar-EG")} جنيه`;
}