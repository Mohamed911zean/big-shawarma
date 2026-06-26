"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, MapPin, Menu, ShoppingCart, Star } from "lucide-react";
import { AmbientEnergy } from "./components/layout/ambient-energy";
import { SectionTitle } from "./components/layout/section-title";
import MenuExperience from "./components/menu-experience";
import { useStorefront } from "@/context/storefront-context";
import { currency, menuItems, branches } from "@/data/storefront";
import Navbar from "./components/layout/navbar";

const bestsellerIds = ["sh2", "m6", "tr4"];

const stats = [
  { label: "سنوات خبرة", value: "٦" },
  { label: "فروع", value: "٤" },
  { label: "صنف في المنيو", value: "٣٦" },
];

export default function Home() {
  const { addToCart, cartCount } = useStorefront();
  const bestsellers = bestsellerIds
    .map((id) => menuItems.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />
      <Navbar />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-20 pt-32 md:grid-cols-[1.08fr_0.92fr] md:px-8"
      >
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-bl-[28px] rounded-tr-[28px] border-2 border-[#FFB800] bg-[#111] px-5 py-3 text-sm font-black text-[#FFB800] shadow-[5px_5px_0px_0px_#E11D48]">
            <Flame size={18} />
            شاورما شارع بطابع بوستر
          </div>
          <h1 className="max-w-3xl text-balance text-6xl font-black leading-[0.95] text-white sm:text-7xl lg:text-8xl">
            أكبر من مجرد{" "}
            <span className="text-[#FFB800] [text-shadow:5px_5px_0_#E11D48]">شاورما</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-bold leading-9 text-[#D1D5DB]">
            لفائف ضخمة، صوصات جريئة، فروع في كل مكان، وطلب إلكتروني سهل في ثلاث خطوات.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-3 rounded-br-[34px] rounded-tl-[34px] border-2 border-white bg-[#FFB800] px-8 py-4 text-lg font-black text-black shadow-[7px_7px_0px_0px_#E11D48] transition hover:-translate-y-1 hover:shadow-[11px_11px_0px_0px_#E11D48]"
            >
              <Menu size={22} />
              تصفح المنيو الكامل
            </Link>
            <a
              href="#branches"
              className="inline-flex items-center justify-center gap-3 rounded-bl-[34px] rounded-tr-[34px] border-2 border-[#FFB800] bg-[#111] px-8 py-4 text-lg font-black text-white shadow-[7px_7px_0px_0px_#FFB800] transition hover:-translate-y-1"
            >
              <MapPin size={22} />
              أقرب فرع
            </a>
          </div>

          {/* Stats strip */}
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-bl-[26px] rounded-tr-[26px] border border-white/15 bg-white/5 p-4 text-center"
              >
                <p className="text-3xl font-black text-[#FFB800]">{s.value}</p>
                <p className="mt-1 text-sm font-bold text-[#9CA3AF]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 mx-auto w-full max-w-lg"
        >
          <div className="relative rounded-bl-[70px] rounded-br-2xl rounded-tl-2xl rounded-tr-[70px] border-[5px] border-white bg-[#FFB800] p-6 shadow-[14px_14px_0px_0px_#E11D48]">
            <div className="absolute -left-7 top-10 rotate-[-12deg] rounded-br-[28px] rounded-tl-[28px] border-2 border-black bg-white px-5 py-2 text-lg font-black text-black shadow-[5px_5px_0_#111]">
              بيج سايز
            </div>
            <Image
              src="/hero-section-cool-img-with-no-bg.png"
              alt="يد بقفاز أسود تحمل لفائف شاورما كبيرة"
              width={704}
              height={598}
              priority
              className="relative z-10 mx-auto w-full drop-shadow-[18px_22px_0_rgba(0,0,0,0.38)]"
            />
          </div>
        </motion.div>
      </section>

      {/* ─── Bestsellers ──────────────────────────────────────────────── */}
      <section className="relative bg-[#FFB800] px-5 py-20 text-black md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 inline-flex rounded-br-[18px] rounded-tl-[18px] border-2 border-black bg-white px-4 py-2 text-sm font-black">
            الأكثر طلباً
          </p>
          <h2 className="max-w-3xl text-5xl font-black leading-tight sm:text-6xl">
            ثلاث ضربات لا تقاوم
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {bestsellers.map((item, index) => (
              <article
                key={item!.id}
                className="group relative min-h-[360px] overflow-visible rounded-bl-[46px] rounded-br-xl rounded-tl-xl rounded-tr-[46px] border-[4px] border-black bg-[#111] p-6 text-white shadow-[9px_9px_0px_0px_#E11D48] transition duration-300 hover:-translate-y-2 hover:rotate-1"
              >
                <span className="inline-flex items-center gap-2 rounded-bl-[18px] rounded-tr-[18px] bg-[#FFB800] px-4 py-2 text-sm font-black text-black">
                  <Star size={16} /> ترشيح بيج
                </span>
                <Image
                  src="/hero-section-cool-img-with-no-bg.png"
                  alt=""
                  width={352}
                  height={299}
                  className="absolute -left-7 top-2 w-48 rotate-[-11deg] transition duration-300 group-hover:-translate-y-4"
                />
                <div className="mt-36">
                  <h3 className="text-3xl font-black leading-tight">{item!.name}</h3>
                  <p className="mt-4 min-h-20 text-lg font-bold leading-8 text-[#D1D5DB]">
                    {item!.description}
                  </p>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <strong className="text-3xl text-[#FFB800]">{currency(item!.price)}</strong>
                    <button
                      type="button"
                      onClick={() => addToCart(item!)}
                      className="rounded-tl-[24px] rounded-br-[24px] bg-[#E11D48] px-5 py-3 font-black text-white shadow-[5px_5px_0_#FFB800]"
                    >
                      أضف للسلة
                    </button>
                  </div>
                </div>
                <span className="absolute right-5 top-20 text-6xl font-black text-white/10">
                  0{index + 1}
                </span>
              </article>
            ))}
          </div>

          {/* Pull toward full menu */}
          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 rounded-bl-[28px] rounded-tr-[28px] border-2 border-black bg-black px-8 py-4 font-black text-[#FFB800] shadow-[6px_6px_0_#E11D48] transition hover:-translate-y-1"
            >
              شوف باقي المنيو كامل — {menuItems.length} صنف ←
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Compact Menu ─────────────────────────────────────────────── */}
      <div id="menu" className="scroll-mt-20">
        <MenuExperience compact />
      </div>

      {/* ─── Checkout CTA ─────────────────────────────────────────────── */}
      <section className="bg-[#E11D48] px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-4 inline-flex rounded-br-[18px] rounded-tl-[18px] bg-black px-4 py-2 text-sm font-black text-[#FFB800]">
              طلب بدون واتساب
            </p>
            <h2 className="text-5xl font-black leading-tight">
              طلبك في ثلاث خطوات وبياناتك محفوظة
            </h2>
            <p className="mt-5 text-xl font-bold leading-9 text-white/80">
              اختار التوصيل أو الاستلام، حدد موقعك، وأكد طلبك في ثواني.
            </p>
          </div>
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center gap-3 rounded-bl-[34px] rounded-tr-[34px] bg-[#25D366] px-8 py-5 text-xl font-black text-black shadow-[8px_8px_0_#FFB800]"
          >
            <ShoppingCart />
            ابدأ الطلب الآن
          </Link>
        </div>
      </section>

      {/* ─── Branches strip ───────────────────────────────────────────── */}
      <section id="branches" className="scroll-mt-20 bg-[#111] px-5 py-20 md:px-8">
        <SectionTitle kicker="فروعنا" title="٤ فروع، كل القاهرة والجيزة" />
        <div className="mx-auto mt-10 max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="rounded-bl-[28px] rounded-tr-[28px] border border-white/15 bg-white/5 p-5"
              >
                <p className="text-xs font-black text-[#FFB800]">{branch.area}</p>
                <h3 className="mt-2 text-xl font-black">{branch.name}</h3>
                <p className="mt-2 text-sm font-bold text-[#9CA3AF]">{branch.hours}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 rounded-bl-[22px] rounded-tr-[22px] border-2 border-[#FFB800] bg-transparent px-6 py-3 font-black text-[#FFB800] transition hover:bg-[#FFB800] hover:text-black"
            >
              <MapPin size={18} />
              عرض الخريطة الكاملة ←
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}