"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bike,
  ChefHat,
  Clock3,
  Heart,
  Home,
  MapPin,
  Menu,
  Navigation,
  Phone,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export const branches = [
  { name: "فرع مدينة نصر", left: "68%", top: "34%", hours: "12 ظهراً - 3 فجراً", address: "شارع الطيران، أمام منطقة المطاعم", phone: "0100 555 9211", area: "شرق القاهرة", delivery: "يغطي مدينة نصر ومصر الجديدة" },
  { name: "فرع التجمع", left: "37%", top: "48%", hours: "1 ظهراً - 4 فجراً", address: "محور التسعين، بوابة الفود كورت", phone: "0109 442 7788", area: "القاهرة الجديدة", delivery: "يغطي التجمع والرحاب ومدينتي" },
  { name: "فرع أكتوبر", left: "22%", top: "67%", hours: "11 صباحاً - 2 فجراً", address: "الحصري، بجوار المول الرئيسي", phone: "0112 804 3321", area: "غرب القاهرة", delivery: "يغطي أكتوبر والشيخ زايد" },
  { name: "فرع المعادي", left: "55%", top: "70%", hours: "12 ظهراً - 2 فجراً", address: "شارع النصر، بجوار محطة البنزين", phone: "0106 771 8822", area: "جنوب القاهرة", delivery: "يغطي المعادي وزهراء المعادي" },
];

export function AmbientEnergy() {
  const blobs = [
    { color: "#E11D48", className: "right-[-12rem] top-24 h-80 w-80" },
    { color: "#FFB800", className: "left-[-10rem] top-[34rem] h-96 w-96" },
    { color: "#FFB800", className: "bottom-40 right-1/4 h-72 w-72" },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {blobs.map((blob, index) => (
        <motion.div
          key={blob.className}
          animate={{ x: [0, index % 2 ? 60 : -50, 0], y: [0, index % 2 ? -40 : 45, 0] }}
          transition={{ duration: 10 + index * 3, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute rounded-full opacity-25 blur-[140px] ${blob.className}`}
          style={{ backgroundColor: blob.color }}
        />
      ))}
    </div>
  );
}

export function ShowcaseNav() {
  const links = [
    { href: "/", label: "الرئيسية", Icon: Home },
    { href: "/menu", label: "المنيو", Icon: Menu },
    { href: "/branches", label: "الفروع", Icon: MapPin },
    { href: "/checkout", label: "الطلب", Icon: ShoppingCart },
    { href: "/about", label: "الحكاية", Icon: Sparkles },
  ];

  return (
    <nav className="fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-7xl -translate-x-1/2 rounded-bl-[30px] rounded-tr-[30px] border border-white/15 bg-[#0D0D0D]/80 px-3 py-3 shadow-[0_8px_0_0_#FFB800] backdrop-blur-xl md:px-5">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/navbar-logo-with-no-bg.webp" alt="Big Shawerma" width={88} height={40} className="h-10 w-auto" />
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2 overflow-x-auto pb-1 lg:justify-center">
          {links.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className="inline-flex shrink-0 items-center gap-2 rounded-bl-[18px] rounded-tr-[18px] border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white transition hover:bg-[#FFB800] hover:text-black">
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
        <Link href="/checkout" className="hidden h-12 items-center gap-2 rounded-bl-[20px] rounded-tr-[20px] bg-[#25D366] px-4 font-black text-black md:flex">
          <ShoppingCart size={21} />
          اطلب الآن
        </Link>
      </div>
    </nav>
  );
}

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <header className="relative mx-auto grid min-h-[62vh] w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 pb-14 pt-32 md:grid-cols-[1fr_0.75fr] md:px-8">
      <div className="relative z-10">
        <p className="mb-5 inline-flex rounded-br-[22px] rounded-tl-[22px] border-2 border-[#FFB800] bg-[#111] px-5 py-3 text-sm font-black text-[#FFB800] shadow-[5px_5px_0_#E11D48]">{eyebrow}</p>
        <h1 className="max-w-4xl text-balance text-5xl font-black leading-[1.02] text-white sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-xl font-bold leading-9 text-[#D1D5DB]">{copy}</p>
      </div>
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 mx-auto w-full max-w-sm rounded-bl-[56px] rounded-tr-[56px] border-[4px] border-white bg-[#FFB800] p-5 shadow-[12px_12px_0_#E11D48]">
        <Image src="/hero-section-cool-img-with-no-bg.png" alt="" width={352} height={299} className="w-full drop-shadow-[12px_14px_0_rgba(0,0,0,0.35)]" />
      </motion.div>
    </header>
  );
}

export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mx-auto max-w-7xl">
      <p className="mb-3 inline-flex rounded-br-[18px] rounded-tl-[18px] border-2 border-[#FFB800] bg-[#111] px-4 py-2 text-sm font-black text-[#FFB800]">{kicker}</p>
      <h2 className="max-w-3xl text-5xl font-black leading-tight text-white sm:text-6xl">{title}</h2>
    </div>
  );
}

export function BranchMap() {
  const [activeBranch, setActiveBranch] = useState(branches[0]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="relative min-h-[460px] overflow-hidden rounded-bl-[60px] rounded-tr-[60px] border-[4px] border-white bg-black shadow-[10px_10px_0_#FFB800]">
        <svg className="absolute inset-0 h-full w-full opacity-90" viewBox="0 0 800 460" aria-hidden="true">
          <path d="M20 110 C160 20 210 245 360 160 S590 42 780 130" fill="none" stroke="#FFB800" strokeWidth="10" strokeLinecap="round" />
          <path d="M80 380 C260 265 350 415 520 275 S650 225 770 340" fill="none" stroke="#E11D48" strokeWidth="8" strokeLinecap="round" />
          <path d="M120 30 L230 430 M500 25 L430 440 M650 60 L90 320" stroke="#ffffff" strokeWidth="2" strokeDasharray="10 14" opacity=".25" />
          <circle cx="405" cy="235" r="120" fill="none" stroke="#25D366" strokeWidth="2" strokeDasharray="5 10" opacity=".38" />
        </svg>
        {branches.map((branch) => (
          <button
            key={branch.name}
            onClick={() => setActiveBranch(branch)}
            className={`absolute grid h-14 w-14 place-items-center rounded-full border-4 border-black text-black shadow-[0_0_28px_#FFB800] transition hover:scale-110 ${activeBranch.name === branch.name ? "bg-[#E11D48] text-white" : "bg-[#FFB800]"}`}
            style={{ left: branch.left, top: branch.top }}
            aria-label={branch.name}
          >
            <MapPin />
          </button>
        ))}
      </div>
      <div className="rounded-bl-[48px] rounded-tr-[48px] border-[4px] border-white bg-[#FFB800] p-6 text-black shadow-[10px_10px_0_#E11D48]">
        <p className="mb-3 inline-flex rounded-br-[16px] rounded-tl-[16px] bg-black px-4 py-2 text-sm font-black text-[#FFB800]">{activeBranch.area}</p>
        <h3 className="text-4xl font-black">{activeBranch.name}</h3>
        <p className="mt-5 flex items-center gap-3 text-lg font-black"><Clock3 /> {activeBranch.hours}</p>
        <p className="mt-4 flex items-center gap-3 text-lg font-bold"><Navigation /> {activeBranch.address}</p>
        <p className="mt-4 flex items-center gap-3 text-lg font-bold"><ChefHat /> {activeBranch.delivery}</p>
        <div className="mt-8 grid gap-3">
          <a href={`tel:${activeBranch.phone}`} className="flex items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#111] px-5 py-4 font-black text-white shadow-[5px_5px_0_#E11D48]"><Phone /> اتصال فوري</a>
          <button className="flex items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#25D366] px-5 py-4 font-black text-black shadow-[5px_5px_0_#111]"><Bike /> افتح الاتجاهات</button>
        </div>
      </div>
    </div>
  );
}

export function FavoriteStrip() {
  return (
    <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-3">
      {["سندوتشات ضخمة", "صوصات جريئة", "تجهيز سريع"].map((item) => (
        <div key={item} className="flex items-center gap-3 rounded-bl-[32px] rounded-tr-[32px] border-2 border-white bg-[#151515] p-5 font-black text-white shadow-[7px_7px_0_#FFB800]">
          <Heart className="text-[#E11D48]" />
          {item}
        </div>
      ))}
    </div>
  );
}
