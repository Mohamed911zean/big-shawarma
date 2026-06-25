"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChefHat,
  ClipboardList,
  Heart,
  Home,
  MapPin,
  Menu,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStorefront } from "../../context/storefront-context";

const navLinks = [
  { href: "/", label: "الرئيسية", Icon: Home },
  { href: "/menu", label: "المنيو", Icon: Menu },
  { href: "/branches", label: "الفروع", Icon: MapPin },
  { href: "/about", label: "الحكاية", Icon: Sparkles },
];

const secondaryLinks = [
  { href: "/wishlist", label: "المفضلة", Icon: Heart },
  { href: "/order-history", label: "طلباتي", Icon: ClipboardList },
];

export function ShowcaseNav() {
  const pathname = usePathname();
  const { cartCount, orders, wishlist } = useStorefront();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav className="fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-7xl -translate-x-1/2 rounded-bl-[30px] rounded-tr-[30px] border border-white/15 bg-[#0D0D0D]/80 px-3 py-3 shadow-[0_8px_0_0_#FFB800] backdrop-blur-xl md:px-5">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setMobileOpen(false)}>
          <Image src="/navbar-logo-with-no-bg.webp" alt="Big Shawerma" width={88} height={40} className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden flex-1 items-center justify-center gap-2 lg:flex">
          {navLinks.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className={`relative inline-flex shrink-0 items-center gap-2 rounded-bl-[18px] rounded-tr-[18px] border border-white/10 px-4 py-2 text-sm font-black transition ${isActive(href) ? "bg-[#FFB800] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}>
              <Icon size={16} />
              {label}
            </Link>
          ))}
          {secondaryLinks.map(({ href, label, Icon }) => {
            const hasBadge = (href === "/wishlist" && wishlist.length > 0) || (href === "/order-history" && orders.length > 0);
            return (
              <Link key={href} href={href} className={`relative inline-flex shrink-0 items-center gap-2 rounded-bl-[18px] rounded-tr-[18px] border border-white/10 px-4 py-2 text-sm font-black transition ${isActive(href) ? "bg-[#FFB800] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}>
                <Icon size={16} />
                {label}
                {hasBadge && <span className="absolute -left-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-[#E11D48]" />}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/checkout" className="relative flex items-center gap-2 rounded-bl-[20px] rounded-tr-[20px] bg-[#25D366] px-5 py-2.5 font-black text-black">
            <ShoppingCart size={18} />
            اطلب الآن
            {cartCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-xs text-white">{cartCount}</span>}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button type="button" onClick={() => setMobileOpen((o) => !o)} className="mr-auto grid h-11 w-11 place-items-center rounded-bl-[16px] rounded-tr-[16px] border border-white/15 bg-white/5 text-white lg:hidden" aria-label="فتح القائمة">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              {[...navLinks, ...secondaryLinks].map(({ href, label, Icon }) => {
                const active = isActive(href);
                const hasBadge = (href === "/wishlist" && wishlist.length > 0) || (href === "/order-history" && orders.length > 0);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex min-h-[52px] items-center gap-3 rounded-bl-[18px] rounded-tr-[18px] border-r-4 px-4 py-3 text-base font-black ${active ? "border-[#FFB800] bg-[#FFB800]/10 text-[#FFB800]" : "border-transparent bg-white/5 text-white"}`}
                  >
                    <Icon size={20} />
                    {label}
                    {hasBadge && <span className="mr-auto h-2 w-2 rounded-full bg-[#E11D48]" />}
                  </Link>
                );
              })}
              <Link
                href="/checkout"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex min-h-[52px] items-center justify-center gap-2 rounded-bl-[20px] rounded-tr-[20px] bg-[#25D366] px-4 py-3 font-black text-black"
              >
                <ShoppingCart size={20} />
                اطلب الآن
                {cartCount > 0 && <span className="rounded-full bg-black px-2 py-0.5 text-sm text-white">{cartCount}</span>}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
