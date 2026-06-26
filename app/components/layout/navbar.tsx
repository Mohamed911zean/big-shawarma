"use client"

import Link from "next/link";
import { useStorefront } from "@/context/storefront-context";
import Image from "next/image";
import {
    Home,
    Menu,
    MapPin,
    ShoppingCart,
    Sparkles,
} from "lucide-react"

export default function Navbar() {
const { cartCount, openCartDrawer } = useStorefront();
  const links = [
    { href: "/", label: "الرئيسية", Icon: Home },
    { href: "/menu", label: "المنيو", Icon: Menu },
    { href: "/branches", label: "الفروع", Icon: MapPin },
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
        <button
              type="button"
              onClick={openCartDrawer}
              className="relative flex shrink-0 items-center gap-2 rounded-bl-[24px] rounded-tr-[24px] bg-[#25D366] px-5 py-4 font-black text-black shadow-[5px_5px_0_#FFB800]"
            >
              <ShoppingCart />
              <span className="hidden sm:inline">السلة</span>
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-black px-1 text-xs text-white">
                {cartCount}
              </span>
            </button>
      </div>
    </nav>
  );
}
