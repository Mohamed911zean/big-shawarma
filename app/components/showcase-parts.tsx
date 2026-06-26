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
import { branches } from "@/data/storefront";
import { useStorefront } from "@/context/storefront-context";
import LeafletLocationMap from "./map/dynamic-location-map";

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


export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <header className="relative mx-auto grid min-h-[62vh] w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 pb-14 pt-32 md:grid-cols-[1fr_0.75fr] md:px-8">
      <div className="relative z-10">
        <p className="mb-5 inline-flex rounded-br-[22px] rounded-tl-[22px] border-2 border-[#FFB800] bg-[#111] px-5 py-3 text-sm font-black text-[#FFB800] shadow-[5px_5px_0_#E11D48]">{eyebrow}</p>
        <h1 className="max-w-4xl text-balance text-5xl font-black leading-[1.02] text-white sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-xl font-bold leading-9 text-[#D1D5DB]">{copy}</p>
      </div>
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 mx-auto w-full max-w-sm rounded-bl-[56px] rounded-tr-[56px] border-[4px] border-white bg-[#FFB800] p-5 shadow-[12px_12px_0_#E11D48]">
        <Image src="/hero-section-cool-img-with-no-bg.png" alt="لفائف شاورما بيج" width={352} height={299} className="w-full drop-shadow-[12px_14px_0_rgba(0,0,0,0.35)]" />
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
  const [activeBranchId, setActiveBranchId] = useState(branches[0].id);
  const activeBranch = branches.find((branch) => branch.id === activeBranchId) ?? branches[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
      <LeafletLocationMap
        mode="branches"
        selectedLocation={null}
        onLocationChange={() => undefined}
        selectedBranchId={activeBranchId}
        onBranchSelect={setActiveBranchId}
      />
      <div className="rounded-bl-[48px] rounded-tr-[48px] border-[4px] border-white bg-[#FFB800] p-6 text-black shadow-[10px_10px_0_#E11D48]">
        <p className="mb-3 inline-flex rounded-br-[16px] rounded-tl-[16px] bg-black px-4 py-2 text-sm font-black text-[#FFB800]">{activeBranch.area}</p>
        <h3 className="text-4xl font-black">{activeBranch.name}</h3>
        <p className="mt-5 flex items-center gap-3 text-lg font-black"><Clock3 /> {activeBranch.hours}</p>
        <p className="mt-4 flex items-center gap-3 text-lg font-bold"><Navigation /> {activeBranch.address}</p>
        <p className="mt-4 flex items-center gap-3 text-lg font-bold"><ChefHat /> {activeBranch.delivery}</p>
        <div className="mt-8 grid gap-3">
          <a href={`tel:${activeBranch.phone}`} className="flex items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#111] px-5 py-4 font-black text-white shadow-[5px_5px_0_#E11D48]"><Phone /> اتصال فوري</a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${activeBranch.position[0]},${activeBranch.position[1]}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#25D366] px-5 py-4 font-black text-black shadow-[5px_5px_0_#111]"><Bike /> افتح الاتجاهات</a>
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
