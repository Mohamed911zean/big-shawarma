"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
