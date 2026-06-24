"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bike,
  Check,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  Heart,
  MapPin,
  Menu,
  Minus,
  Navigation,
  Phone,
  Plus,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Truck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type CartLine = MenuItem & {
  quantity: number;
  options: string[];
};

const menuData = [
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

const bestsellers = [
  { title: "كومبو التنور الناري", price: 245, tag: "الأكثر طلباً", copy: "رغيف تنور ضخم، بطاطس مدوية، صوصين، ومشروب بارد." },
  { title: "فتة بيج المتفجرة", price: 185, tag: "تقييم 4.9", copy: "أرز ساخن، طبقات شاورما دسمة، قرمشة خبز، وتومية كثيفة." },
  { title: "وليمة الصحاب", price: 520, tag: "مشاركة", copy: "ثلاث ساندوتشات، بيتزا شاورما صغيرة، بطاطس عائلية، وصوصات." },
];

const branches = [
  { name: "فرع مدينة نصر", left: "68%", top: "34%", hours: "12 ظهراً - 3 فجراً", address: "شارع الطيران، أمام منطقة المطاعم", phone: "0100 555 9211" },
  { name: "فرع التجمع", left: "37%", top: "48%", hours: "1 ظهراً - 4 فجراً", address: "محور التسعين، بوابة الفود كورت", phone: "0109 442 7788" },
  { name: "فرع أكتوبر", left: "22%", top: "67%", hours: "11 صباحاً - 2 فجراً", address: "الحصري، بجوار المول الرئيسي", phone: "0112 804 3321" },
];

const modifications = ["تومية إكسترا", "جبنة سايحة", "نسخة حارة"];

function currency(value: number) {
  return `${value.toLocaleString("ar-EG")} جنيه`;
}

export default function Home() {
  const categories = menuData.map((group) => group.category);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(modifications.slice(0, 1));
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<MenuItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState(branches[0]);
  const [comboIndex, setComboIndex] = useState(0);

  const flatItems = useMemo(() => menuData.flatMap((group) => group.items), []);
  const activeItems = useMemo(() => {
    const base = menuData.find((group) => group.category === activeCategory)?.items ?? [];
    if (!searchTerm.trim()) return base;
    const q = searchTerm.trim().toLowerCase();
    return flatItems.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(q));
  }, [activeCategory, flatItems, searchTerm]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(item: MenuItem, options = selectedOptions) {
    setCart((current) => {
      const key = `${item.id}:${options.join("|")}`;
      const found = current.find((line) => `${line.id}:${line.options.join("|")}` === key);
      if (found) {
        return current.map((line) => (line === found ? { ...line, quantity: line.quantity + 1 } : line));
      }
      return [...current, { ...item, quantity: 1, options }];
    });
  }

  function updateQuantity(id: string, delta: number) {
    setCart((current) =>
      current
        .map((line) => (line.id === id ? { ...line, quantity: Math.max(0, line.quantity + delta) } : line))
        .filter((line) => line.quantity > 0),
    );
  }

  function toggleWishlist(item: MenuItem) {
    setWishlist((current) => (current.some((entry) => entry.id === item.id) ? current.filter((entry) => entry.id !== item.id) : [...current, item]));
  }

  function openDetails(item: MenuItem) {
    setSelectedItem(item);
    setSelectedOptions(modifications.slice(0, 1));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onCart={() => setCartOpen(true)}
        onWishlist={() => setWishlistOpen(true)}
      />

      <section id="hero" className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-20 pt-32 md:grid-cols-[1.08fr_0.92fr] md:px-8">
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-bl-[28px] rounded-tr-[28px] border-2 border-[#FFB800] bg-[#111] px-5 py-3 text-sm font-black text-[#FFB800] shadow-[5px_5px_0px_0px_#E11D48]">
            <Flame size={18} />
            شاورما شارع بطابع بوستر
          </div>
          <h1 className="max-w-3xl text-balance text-6xl font-black leading-[0.95] tracking-normal text-white sm:text-7xl lg:text-8xl">
            أكبر من مجرد <span className="text-[#FFB800] [text-shadow:5px_5px_0_#E11D48]">شاورما</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-bold leading-9 text-[#D1D5DB]">
            لفائف ضخمة، صوصات جريئة، وفروع شغالة بإيقاع سريع يناسب جوع آخر الليل.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#menu" className="inline-flex items-center justify-center gap-3 rounded-br-[34px] rounded-tl-[34px] border-2 border-white bg-[#FFB800] px-8 py-4 text-lg font-black text-black shadow-[7px_7px_0px_0px_#E11D48] transition duration-300 hover:-translate-y-1 hover:shadow-[11px_11px_0px_0px_#E11D48]">
              <Menu size={22} />
              تصفح المنيو
            </a>
            <a href="#branches" className="inline-flex items-center justify-center gap-3 rounded-bl-[34px] rounded-tr-[34px] border-2 border-[#FFB800] bg-[#111] px-8 py-4 text-lg font-black text-white shadow-[7px_7px_0px_0px_#FFB800] transition duration-300 hover:-translate-y-1 hover:shadow-[11px_11px_0px_0px_#FFB800]">
              <MapPin size={22} />
              أقرب فرع
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {["+18 ألف طلب", "3 دقائق تجهيز", "صوصات يومية"].map((stat) => (
              <div key={stat} className="rounded-bl-[26px] rounded-tr-[26px] border border-white/15 bg-white/5 p-4 text-center font-black text-[#FFB800]">
                {stat}
              </div>
            ))}
          </div>
        </div>
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 mx-auto w-full max-w-lg">
          <div className="absolute -right-6 top-12 h-40 w-40 rounded-full bg-[#E11D48] blur-[80px]" />
          <div className="relative rounded-bl-[70px] rounded-br-2xl rounded-tl-2xl rounded-tr-[70px] border-[5px] border-white bg-[#FFB800] p-6 shadow-[14px_14px_0px_0px_#E11D48]">
            <div className="absolute -left-7 top-10 rotate-[-12deg] rounded-br-[28px] rounded-tl-[28px] border-2 border-black bg-white px-5 py-2 text-lg font-black text-black shadow-[5px_5px_0_#111]">
              بيج سايز
            </div>
            <Image src="/hero-section-cool-img-with-no-bg.png" alt="يد بقفاز أسود تحمل لفائف شاورما كبيرة" width={704} height={598} priority className="relative z-10 mx-auto w-full drop-shadow-[18px_22px_0_rgba(0,0,0,0.38)]" />
          </div>
        </motion.div>
      </section>

      <Wave fill="#FFB800" />
      <section id="wanted" className="relative bg-[#FFB800] px-5 py-20 text-black md:px-8">
        <SectionTitle kicker="الأكثر مطاردة" title="ثلاث ضربات لا تقاوم" dark />
        <div className="mx-auto mt-12 flex max-w-7xl items-center gap-4">
          <button aria-label="السابق" onClick={() => setComboIndex((comboIndex + bestsellers.length - 1) % bestsellers.length)} className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-black bg-white shadow-[5px_5px_0_#111] md:flex">
            <ChevronRight />
          </button>
          <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-3">
            {bestsellers.map((combo, index) => (
              <motion.article key={combo.title} animate={{ scale: comboIndex === index ? 1.03 : 1 }} className="group relative min-h-[360px] overflow-visible rounded-bl-[46px] rounded-br-xl rounded-tl-xl rounded-tr-[46px] border-[4px] border-black bg-[#111] p-6 text-white shadow-[9px_9px_0px_0px_#E11D48] transition duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-[14px_14px_0px_0px_#E11D48]">
                <span className="inline-flex rounded-bl-[18px] rounded-tr-[18px] bg-[#FFB800] px-4 py-2 text-sm font-black text-black">{combo.tag}</span>
                <Image src="/hero-section-cool-img-with-no-bg.png" alt="" width={352} height={299} className="absolute -left-7 top-2 w-48 rotate-[-11deg] transition duration-300 group-hover:-translate-y-4 group-hover:rotate-[-16deg]" />
                <div className="mt-36">
                  <h3 className="text-3xl font-black leading-tight">{combo.title}</h3>
                  <p className="mt-4 min-h-20 text-lg font-bold leading-8 text-[#D1D5DB]">{combo.copy}</p>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <strong className="text-3xl text-[#FFB800]">{currency(combo.price)}</strong>
                    <button onClick={() => setCartOpen(true)} className="rounded-tl-[24px] rounded-br-[24px] bg-[#E11D48] px-5 py-3 font-black text-white shadow-[5px_5px_0_#FFB800]">اطلبها</button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <button aria-label="التالي" onClick={() => setComboIndex((comboIndex + 1) % bestsellers.length)} className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-black bg-white shadow-[5px_5px_0_#111] md:flex">
            <ChevronLeft />
          </button>
        </div>
      </section>
      <Jagged fill="#0D0D0D" />

      <section id="menu" className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionTitle kicker="منيو بيج" title="فلتر مزاجك وابدأ الطلب" />
        <div className="mt-10 flex gap-4 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-bl-[24px] rounded-tr-[24px] border-2 px-5 py-3 text-sm font-black transition duration-300 hover:-translate-y-1 ${activeCategory === category ? "border-white bg-[#FFB800] text-black shadow-[6px_6px_0_#E11D48]" : "border-white/20 bg-white/5 text-white shadow-[6px_6px_0_#FFB800]"}`}>
              {category}
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {activeItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} wished={wishlist.some((entry) => entry.id === item.id)} onDetails={openDetails} onAdd={addToCart} onWish={toggleWishlist} />
          ))}
        </div>
      </section>

      <Wave fill="#E11D48" flip />
      <CheckoutSection />
      <Jagged fill="#111111" />
      <BranchesSection activeBranch={activeBranch} setActiveBranch={setActiveBranch} />
      <StorySection />

      <ProductModal item={selectedItem} options={selectedOptions} setOptions={setSelectedOptions} onClose={() => setSelectedItem(null)} onAdd={(item) => { addToCart(item); setSelectedItem(null); setCartOpen(true); }} />
      <CartDrawer open={cartOpen} cart={cart} subtotal={subtotal} onClose={() => setCartOpen(false)} onQuantity={updateQuantity} />
      <WishlistOverlay open={wishlistOpen} items={wishlist} onClose={() => setWishlistOpen(false)} onAdd={(item) => { addToCart(item, []); setWishlistOpen(false); setCartOpen(true); }} onRemove={toggleWishlist} />
    </main>
  );
}

function AmbientEnergy() {
  const blobs = [
    { color: "#E11D48", className: "right-[-12rem] top-24 h-80 w-80" },
    { color: "#FFB800", className: "left-[-10rem] top-[34rem] h-96 w-96" },
    { color: "#FFB800", className: "bottom-40 right-1/4 h-72 w-72" },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {blobs.map((blob, index) => (
        <motion.div key={index} animate={{ x: [0, index % 2 ? 60 : -50, 0], y: [0, index % 2 ? -40 : 45, 0] }} transition={{ duration: 10 + index * 3, repeat: Infinity, ease: "easeInOut" }} className={`absolute rounded-full opacity-25 blur-[140px] ${blob.className}`} style={{ backgroundColor: blob.color }} />
      ))}
    </div>
  );
}

function Navbar({ searchTerm, setSearchTerm, cartCount, wishlistCount, onCart, onWishlist }: { searchTerm: string; setSearchTerm: (value: string) => void; cartCount: number; wishlistCount: number; onCart: () => void; onWishlist: () => void }) {
  return (
    <nav className="fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-7xl -translate-x-1/2 rounded-bl-[30px] rounded-tr-[30px] border border-white/15 bg-[#0D0D0D]/78 px-3 py-3 shadow-[0_8px_0_0_#FFB800] backdrop-blur-xl md:px-5">
      <div className="flex items-center gap-3">
        <a href="#hero" className="flex shrink-0 items-center gap-2">
          <Image src="/navbar-logo-with-no-bg.webp" alt="Big Shawerma" width={88} height={40} className="h-10 w-auto" />
        </a>
        <div className="hidden flex-1 items-center justify-center gap-2 lg:flex">
          {[
            ["#wanted", "الأكثر طلباً", Star],
            ["menu", "المنيو", ChefHat],
            ["branches", "الفروع", MapPin],
            ["about", "الحكاية", Sparkles],
          ].map(([href, label, Icon]) => (
            <a key={href as string} href={href as string} className="inline-flex items-center gap-2 rounded-bl-[18px] rounded-tr-[18px] border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white transition hover:bg-[#FFB800] hover:text-black">
              <Icon size={16} />
              {label as string}
            </a>
          ))}
        </div>
        <label className="relative hidden min-w-48 flex-1 md:block lg:max-w-xs">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFB800]" size={18} />
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="ابحث عن فتة، تنور، بيتزا..." className="w-full rounded-bl-[22px] rounded-tr-[22px] border border-white/10 bg-white/10 py-3 pr-11 pl-4 text-sm font-bold text-white outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]" />
        </label>
        <button onClick={onWishlist} className="relative flex h-12 w-12 items-center justify-center rounded-bl-[18px] rounded-tr-[18px] border border-white/15 bg-white/5 text-white shadow-[4px_4px_0_#E11D48]">
          <Heart size={21} />
          {wishlistCount > 0 && <span className="absolute -top-2 -left-2 grid h-6 min-w-6 place-items-center rounded-full bg-[#FFB800] px-1 text-xs font-black text-black">{wishlistCount}</span>}
        </button>
        <motion.button onClick={onCart} animate={{ boxShadow: ["0 0 0px #25D366", "0 0 18px #25D366", "0 0 0px #25D366"] }} transition={{ duration: 1.8, repeat: Infinity }} className="relative flex h-12 items-center gap-2 rounded-bl-[20px] rounded-tr-[20px] bg-[#25D366] px-4 font-black text-black">
          <ShoppingCart size={21} />
          <span className="hidden sm:inline">السلة</span>
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-black px-1 text-xs text-white">{cartCount}</span>
        </motion.button>
      </div>
    </nav>
  );
}

function SectionTitle({ kicker, title, dark = false }: { kicker: string; title: string; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-7xl">
      <p className={`mb-3 inline-flex rounded-br-[18px] rounded-tl-[18px] border-2 px-4 py-2 text-sm font-black ${dark ? "border-black bg-white text-black" : "border-[#FFB800] bg-[#111] text-[#FFB800]"}`}>{kicker}</p>
      <h2 className={`max-w-3xl text-5xl font-black leading-tight sm:text-6xl ${dark ? "text-black" : "text-white"}`}>{title}</h2>
    </div>
  );
}

function MenuCard({ item, index, wished, onDetails, onAdd, onWish }: { item: MenuItem; index: number; wished: boolean; onDetails: (item: MenuItem) => void; onAdd: (item: MenuItem, options?: string[]) => void; onWish: (item: MenuItem) => void }) {
  return (
    <article className={`group relative rounded-br-xl rounded-tl-xl border-2 border-white bg-[#151515] p-5 transition duration-300 hover:scale-[1.03] ${index % 2 ? "rounded-bl-[44px] rounded-tr-[20px] shadow-[7px_7px_0_#FFB800] hover:rotate-2 hover:shadow-[11px_11px_0_#FFB800]" : "rounded-bl-[20px] rounded-tr-[44px] shadow-[7px_7px_0_#E11D48] hover:-rotate-2 hover:shadow-[11px_11px_0_#E11D48]"}`}>
      <button onClick={() => onWish(item)} aria-label="إضافة للمفضلة" className={`absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 ${wished ? "bg-[#E11D48] text-white" : "bg-black text-[#FFB800]"}`}>
        <Heart size={19} fill={wished ? "currentColor" : "none"} />
      </button>
      <div className="mb-5 grid h-28 place-items-center rounded-bl-[34px] rounded-tr-[34px] bg-[#FFB800]">
        <Image src="/hero-section-cool-img-with-no-bg.png" alt="" width={176} height={150} className="h-32 w-auto -translate-y-3 object-contain transition duration-300 group-hover:-translate-y-6" />
      </div>
      <h3 className="text-2xl font-black leading-snug text-white">{item.name}</h3>
      <p className="mt-3 min-h-20 text-base font-bold leading-7 text-[#9CA3AF]">{item.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <button onClick={() => onDetails(item)} className="rounded-br-[18px] rounded-tl-[18px] border border-white/20 px-4 py-2 text-sm font-black text-[#FFB800] transition hover:bg-white hover:text-black">تفاصيل</button>
        <strong className="text-2xl text-[#FFB800]">{currency(item.price)}</strong>
      </div>
      <button onClick={() => onAdd(item, [])} className="mt-5 flex w-full items-center justify-center gap-2 rounded-bl-[24px] rounded-tr-[24px] bg-[#E11D48] px-5 py-3 font-black text-white shadow-[5px_5px_0_#FFB800] transition hover:-translate-y-1">
        <Plus size={19} />
        إضافة للطلب
      </button>
    </article>
  );
}

function ProductModal({ item, options, setOptions, onClose, onAdd }: { item: MenuItem | null; options: string[]; setOptions: (options: string[]) => void; onClose: () => void; onAdd: (item: MenuItem) => void }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-lg">
          <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }} className="relative grid w-full max-w-5xl overflow-hidden rounded-bl-[70px] rounded-tr-[70px] border-[4px] border-white bg-[#111] shadow-[12px_12px_0_#FFB800] md:grid-cols-2">
            <button onClick={onClose} className="absolute left-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-[#E11D48] text-white">
              <X />
            </button>
            <div className="bg-[#FFB800] p-8 text-black">
              <Image src="/hero-section-cool-img-with-no-bg.png" alt="" width={352} height={299} className="mx-auto w-72 drop-shadow-[10px_12px_0_rgba(0,0,0,0.35)]" />
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                {["حجم كبير", "بروتين عالي", "صوص كثيف"].map((macro) => (
                  <div key={macro} className="rounded-bl-[20px] rounded-tr-[20px] border-2 border-black bg-white p-3 text-sm font-black shadow-[4px_4px_0_#111]">{macro}</div>
                ))}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-4xl font-black leading-tight">{item.name}</h3>
              <p className="mt-4 text-lg font-bold leading-8 text-[#9CA3AF]">{item.description}</p>
              <strong className="mt-6 block text-4xl text-[#FFB800]">{currency(item.price)}</strong>
              <div className="mt-8 space-y-3">
                {modifications.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center justify-between rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-white/5 p-4 font-black">
                    <span>{option}</span>
                    <input type="checkbox" checked={options.includes(option)} onChange={() => setOptions(options.includes(option) ? options.filter((entry) => entry !== option) : [...options, option])} className="h-5 w-5 accent-[#FFB800]" />
                  </label>
                ))}
              </div>
              <button onClick={() => onAdd(item)} className="mt-8 flex w-full items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#E11D48] px-6 py-4 text-lg font-black shadow-[6px_6px_0_#FFB800]">
                <ShoppingCart />
                إضافة بالتعديلات
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CartDrawer({ open, cart, subtotal, onClose, onQuantity }: { open: boolean; cart: CartLine[]; subtotal: number; onClose: () => void; onQuantity: (id: string, delta: number) => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-md">
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 24 }} className="mr-auto flex h-full w-full max-w-md flex-col border-r-4 border-[#FFB800] bg-[#111] p-5 shadow-[-10px_0_0_#E11D48]">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">سلة الطلب</h2>
              <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-white text-black"><X /></button>
            </div>
            <div className="mt-6 flex-1 space-y-4 overflow-auto pr-1">
              {cart.length === 0 ? (
                <p className="rounded-bl-[28px] rounded-tr-[28px] border border-white/15 bg-white/5 p-5 text-center font-bold text-[#9CA3AF]">السلة فارغة حالياً.</p>
              ) : (
                cart.map((line) => (
                  <div key={`${line.id}-${line.options.join("-")}`} className="rounded-bl-[26px] rounded-tr-[26px] border border-white/15 bg-white/5 p-4">
                    <div className="flex justify-between gap-3">
                      <div>
                        <h3 className="font-black">{line.name}</h3>
                        <p className="mt-1 text-sm text-[#9CA3AF]">{line.options.join("، ") || "بدون تعديلات"}</p>
                      </div>
                      <strong className="text-[#FFB800]">{currency(line.price * line.quantity)}</strong>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <button onClick={() => onQuantity(line.id, -1)} className="grid h-9 w-9 place-items-center rounded-full bg-[#E11D48]"><Minus size={18} /></button>
                      <span className="text-xl font-black">{line.quantity}</span>
                      <button onClick={() => onQuantity(line.id, 1)} className="grid h-9 w-9 place-items-center rounded-full bg-[#FFB800] text-black"><Plus size={18} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-white/15 pt-5">
              <div className="flex items-center justify-between text-2xl font-black">
                <span>الإجمالي</span>
                <span className="text-[#FFB800]">{currency(subtotal)}</span>
              </div>
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#25D366] px-5 py-4 text-lg font-black text-black shadow-[6px_6px_0_#FFB800]">
                <Check />
                تأكيد الطلب وإرسال عبر واتساب
              </button>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function WishlistOverlay({ open, items, onClose, onAdd, onRemove }: { open: boolean; items: MenuItem[]; onClose: () => void; onAdd: (item: MenuItem) => void; onRemove: (item: MenuItem) => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[85] grid place-items-center bg-black/70 p-4 backdrop-blur-md">
          <motion.div initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, scale: 0.95 }} className="w-full max-w-3xl rounded-bl-[60px] rounded-tr-[60px] border-[4px] border-white bg-[#111] p-6 shadow-[10px_10px_0_#E11D48]">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">المفضلة الساخنة</h2>
              <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-white text-black"><X /></button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {items.length === 0 ? <p className="text-[#9CA3AF]">لم تضف أصنافاً للمفضلة بعد.</p> : items.map((item) => (
                <div key={item.id} className="rounded-bl-[26px] rounded-tr-[26px] border border-white/15 bg-white/5 p-4">
                  <h3 className="font-black">{item.name}</h3>
                  <p className="mt-2 text-[#FFB800] font-black">{currency(item.price)}</p>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => onAdd(item)} className="flex-1 rounded-bl-[18px] rounded-tr-[18px] bg-[#E11D48] py-2 font-black">أضف</button>
                    <button onClick={() => onRemove(item)} className="rounded-bl-[18px] rounded-tr-[18px] border border-white/20 px-4 font-black">حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CheckoutSection() {
  return (
    <section id="checkout" className="bg-[#E11D48] px-5 py-20 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-4 inline-flex rounded-br-[18px] rounded-tl-[18px] bg-black px-4 py-2 text-sm font-black text-[#FFB800]">إنهاء سريع</p>
          <h2 className="text-5xl font-black leading-tight">بيانات قليلة وطلبك ينطلق</h2>
          <p className="mt-5 text-xl font-bold leading-9 text-white/80">اختار توصيل أو استلام، واترك باقي السرعة علينا.</p>
        </div>
        <form className="grid gap-4 rounded-bl-[48px] rounded-tr-[48px] border-[4px] border-black bg-[#111] p-6 shadow-[10px_10px_0_#FFB800]">
          <div className="grid grid-cols-2 gap-3">
            {["توصيل", "استلام من الفرع"].map((type) => (
              <label key={type} className="flex items-center justify-center gap-2 rounded-bl-[20px] rounded-tr-[20px] border border-white/15 bg-white/5 p-4 font-black">
                <input name="orderType" type="radio" className="accent-[#FFB800]" defaultChecked={type === "توصيل"} />
                {type === "توصيل" ? <Truck size={18} /> : <Store size={18} />}
                {type}
              </label>
            ))}
          </div>
          {["الاسم", "رقم الموبايل", "العنوان بالتفصيل"].map((field) => (
            <input key={field} placeholder={field} className="rounded-bl-[20px] rounded-tr-[20px] border border-white/15 bg-white/5 px-5 py-4 font-bold outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]" />
          ))}
          <textarea placeholder="ملاحظات الطلب" rows={3} className="resize-none rounded-bl-[20px] rounded-tr-[20px] border border-white/15 bg-white/5 px-5 py-4 font-bold outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]" />
        </form>
      </div>
    </section>
  );
}

function BranchesSection({ activeBranch, setActiveBranch }: { activeBranch: (typeof branches)[number]; setActiveBranch: (branch: (typeof branches)[number]) => void }) {
  return (
    <section id="branches" className="bg-[#111] px-5 py-20 md:px-8">
      <SectionTitle kicker="فروع قريبة" title="خريطة ساخنة للمدينة" />
      <div className="mx-auto mt-12 grid max-w-7xl gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="relative min-h-[430px] overflow-hidden rounded-bl-[60px] rounded-tr-[60px] border-[4px] border-white bg-black shadow-[10px_10px_0_#FFB800]">
          <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 800 430" aria-hidden="true">
            <path d="M20 90 C160 20 210 220 360 150 S590 40 780 120" fill="none" stroke="#FFB800" strokeWidth="10" strokeLinecap="round" />
            <path d="M80 350 C260 250 350 390 520 260 S650 210 770 320" fill="none" stroke="#E11D48" strokeWidth="8" strokeLinecap="round" />
            <path d="M120 30 L230 410 M500 20 L430 420 M650 60 L90 300" stroke="#ffffff" strokeWidth="2" strokeDasharray="10 14" opacity=".25" />
          </svg>
          {branches.map((branch) => (
            <button key={branch.name} onClick={() => setActiveBranch(branch)} className="absolute grid h-14 w-14 place-items-center rounded-full border-4 border-black bg-[#FFB800] text-black shadow-[0_0_28px_#FFB800]" style={{ left: branch.left, top: branch.top }}>
              <MapPin />
            </button>
          ))}
        </div>
        <div className="rounded-bl-[48px] rounded-tr-[48px] border-[4px] border-white bg-[#FFB800] p-6 text-black shadow-[10px_10px_0_#E11D48]">
          <h3 className="text-4xl font-black">{activeBranch.name}</h3>
          <p className="mt-5 flex items-center gap-3 text-lg font-black"><Clock3 /> {activeBranch.hours}</p>
          <p className="mt-4 flex items-center gap-3 text-lg font-bold"><Navigation /> {activeBranch.address}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a href={`tel:${activeBranch.phone}`} className="flex items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#111] px-5 py-4 font-black text-white shadow-[5px_5px_0_#E11D48]"><Phone /> اتصال فوري</a>
            <button className="flex items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#25D366] px-5 py-4 font-black text-black shadow-[5px_5px_0_#111]"><Bike /> افتح الاتجاهات</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const beats = [
    ["2018", "عربة صغيرة، صف طويل، وخلطة تومية بدأت الكلام."],
    ["2021", "مطبخ إنتاج سريع يخدم آلاف الطلبات بدون فقدان سخونة."],
    ["اليوم", "هوية شوارع عالية الصوت، منيو ضخم، وتجربة طلب مصممة للجوع الحقيقي."],
  ];
  return (
    <section id="story" className="relative px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle kicker="حكايتنا" title="من سيخ مشتعل إلى علامة شارع لا تهدأ" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {beats.map(([year, text], index) => (
            <div key={year} className={`rounded-br-xl rounded-tl-xl border-2 border-white bg-[#151515] p-7 shadow-[8px_8px_0_${index === 1 ? "#E11D48" : "#FFB800"}] ${index === 1 ? "md:translate-y-10" : ""}`}>
              <strong className="text-5xl font-black text-[#FFB800]">{year}</strong>
              <p className="mt-5 text-xl font-bold leading-9 text-[#D1D5DB]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Wave({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <svg className={`relative z-10 -mb-px block h-16 w-full ${flip ? "rotate-180" : ""}`} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path fill={fill} d="M0 60L60 52C120 44 240 28 360 34.7C480 41 600 71 720 76.7C840 82 960 64 1080 48.7C1200 33 1320 21 1380 15L1440 9V120H0V60Z" />
    </svg>
  );
}

function Jagged({ fill }: { fill: string }) {
  return (
    <svg className="relative z-10 -mt-px block h-16 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
      <path fill={fill} d="M0 0H1440V64L1360 35L1280 76L1200 38L1120 72L1040 28L960 68L880 30L800 74L720 32L640 70L560 26L480 72L400 34L320 74L240 30L160 68L80 36L0 70V0Z" />
    </svg>
  );
}
