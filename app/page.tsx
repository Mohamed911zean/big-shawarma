"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChefHat, Flame, MapPin, Menu, ShoppingCart, Sparkles, Star } from "lucide-react";
import { AmbientEnergy, BranchMap, FavoriteStrip, SectionTitle, ShowcaseNav } from "./components/showcase-parts";
import MenuExperience from "./components/menu-experience";
import { useStorefront } from "./context/storefront-context";
import { currency, menuItems } from "./data/storefront";

const bestsellerIds = ["sh2", "m6", "tr4"];

export default function Home() {
  const { addToCart, cartCount } = useStorefront();
  const bestsellers = bestsellerIds.map((id) => menuItems.find((item) => item.id === id)).filter(Boolean);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />
      <ShowcaseNav />

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
            لفائف ضخمة، صوصات جريئة، سلة حقيقية، GPS، وطلب ديمو كامل جاهز للعرض على صاحب البيزنس.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#menu" className="inline-flex items-center justify-center gap-3 rounded-br-[34px] rounded-tl-[34px] border-2 border-white bg-[#FFB800] px-8 py-4 text-lg font-black text-black shadow-[7px_7px_0px_0px_#E11D48] transition duration-300 hover:-translate-y-1 hover:shadow-[11px_11px_0px_0px_#E11D48]">
              <Menu size={22} />
              تصفح المنيو
            </a>
            <Link href="/checkout" className="inline-flex items-center justify-center gap-3 rounded-bl-[34px] rounded-tr-[34px] border-2 border-[#FFB800] bg-[#25D366] px-8 py-4 text-lg font-black text-black shadow-[7px_7px_0px_0px_#FFB800] transition duration-300 hover:-translate-y-1">
              <ShoppingCart size={22} />
              أكمل الطلب ({cartCount})
            </Link>
            <a href="#branches" className="inline-flex items-center justify-center gap-3 rounded-bl-[34px] rounded-tr-[34px] border-2 border-[#FFB800] bg-[#111] px-8 py-4 text-lg font-black text-white shadow-[7px_7px_0px_0px_#FFB800] transition duration-300 hover:-translate-y-1">
              <MapPin size={22} />
              أقرب فرع
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {["سلة محفوظة", "GPS مباشر", "طلبات ديمو"].map((stat) => (
              <div key={stat} className="rounded-bl-[26px] rounded-tr-[26px] border border-white/15 bg-white/5 p-4 text-center font-black text-[#FFB800]">
                {stat}
              </div>
            ))}
          </div>
        </div>
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 mx-auto w-full max-w-lg">
          <div className="relative rounded-bl-[70px] rounded-br-2xl rounded-tl-2xl rounded-tr-[70px] border-[5px] border-white bg-[#FFB800] p-6 shadow-[14px_14px_0px_0px_#E11D48]">
            <div className="absolute -left-7 top-10 rotate-[-12deg] rounded-br-[28px] rounded-tl-[28px] border-2 border-black bg-white px-5 py-2 text-lg font-black text-black shadow-[5px_5px_0_#111]">
              بيج سايز
            </div>
            <Image src="/hero-section-cool-img-with-no-bg.png" alt="يد بقفاز أسود تحمل لفائف شاورما كبيرة" width={704} height={598} priority className="relative z-10 mx-auto w-full drop-shadow-[18px_22px_0_rgba(0,0,0,0.38)]" />
          </div>
        </motion.div>
      </section>

      <section className="relative bg-[#FFB800] px-5 py-20 text-black md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 inline-flex rounded-br-[18px] rounded-tl-[18px] border-2 border-black bg-white px-4 py-2 text-sm font-black">الأكثر طلباً</p>
          <h2 className="max-w-3xl text-5xl font-black leading-tight sm:text-6xl">ثلاث ضربات لا تقاوم</h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {bestsellers.map((item, index) => (
              <article key={item!.id} className="group relative min-h-[360px] overflow-visible rounded-bl-[46px] rounded-br-xl rounded-tl-xl rounded-tr-[46px] border-[4px] border-black bg-[#111] p-6 text-white shadow-[9px_9px_0px_0px_#E11D48] transition duration-300 hover:-translate-y-2 hover:rotate-1">
                <span className="inline-flex items-center gap-2 rounded-bl-[18px] rounded-tr-[18px] bg-[#FFB800] px-4 py-2 text-sm font-black text-black"><Star size={16} /> ترشيح بيج</span>
                <Image src="/hero-section-cool-img-with-no-bg.png" alt="" width={352} height={299} className="absolute -left-7 top-2 w-48 rotate-[-11deg] transition duration-300 group-hover:-translate-y-4" />
                <div className="mt-36">
                  <h3 className="text-3xl font-black leading-tight">{item!.name}</h3>
                  <p className="mt-4 min-h-20 text-lg font-bold leading-8 text-[#D1D5DB]">{item!.description}</p>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <strong className="text-3xl text-[#FFB800]">{currency(item!.price)}</strong>
                    <button onClick={() => addToCart(item!)} className="rounded-tl-[24px] rounded-br-[24px] bg-[#E11D48] px-5 py-3 font-black text-white shadow-[5px_5px_0_#FFB800]">أضف للسلة</button>
                  </div>
                </div>
                <span className="absolute right-5 top-20 text-6xl font-black text-white/10">0{index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="menu">
        <MenuExperience compact />
      </div>

      <section className="bg-[#E11D48] px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-4 inline-flex rounded-br-[18px] rounded-tl-[18px] bg-black px-4 py-2 text-sm font-black text-[#FFB800]">Checkout جاهز</p>
            <h2 className="text-5xl font-black leading-tight">ممنوع تأكيد الطلب قبل اختيار المنتجات والموقع</h2>
            <p className="mt-5 text-xl font-bold leading-9 text-white/80">نموذج الطلب يتحقق من السلة، رقم الموبايل، العنوان، GPS أو Pin، أو فرع الاستلام.</p>
          </div>
          <Link href="/checkout" className="inline-flex items-center justify-center gap-3 rounded-bl-[34px] rounded-tr-[34px] bg-[#25D366] px-8 py-5 text-xl font-black text-black shadow-[8px_8px_0_#FFB800]">
            <ShoppingCart />
            افتح صفحة الطلب
          </Link>
        </div>
      </section>

      <section id="branches" className="bg-[#111] px-5 py-20 md:px-8">
        <SectionTitle kicker="فروع وخريطة" title="خريطة Leaflet حقيقية بتصميم بيج" />
        <div className="mx-auto mt-12 max-w-7xl">
          <BranchMap />
          <FavoriteStrip />
        </div>
      </section>

      <section className="relative px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="حكايتنا" title="من سيخ مشتعل إلى تجربة طلب كاملة" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["2018", "عربة صغيرة وصف طويل وخلطة تومية بدأت الكلام."],
              ["2021", "مطبخ إنتاج سريع يخدم آلاف الطلبات بدون فقدان سخونة."],
              ["اليوم", "موقع أمامي كامل يحفظ السلة والطلبات محلياً تمهيداً للوحة الإدارة."],
            ].map(([year, text], index) => (
              <div key={year} className={`rounded-br-xl rounded-tl-xl border-2 border-white bg-[#151515] p-7 shadow-[8px_8px_0_#FFB800] ${index === 1 ? "md:translate-y-10" : ""}`}>
                <strong className="text-5xl font-black text-[#FFB800]">{year}</strong>
                <p className="mt-5 text-xl font-bold leading-9 text-[#D1D5DB]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
