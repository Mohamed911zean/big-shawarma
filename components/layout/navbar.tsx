"use client";

import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useStorefront } from "@/context/storefront-context";
import Image from "next/image";

const navLinks = [
  { href: "/menu", label: "المنيو" },
  { href: "/branches", label: "الفروع" },
];

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen } = useStorefront();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0D0D0D]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/navbar-logo-with-no-bg.webp"
            alt="Big Shawerma"
            width={88}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Links — مخفية على موبايل */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-[#D1D5DB] transition hover:text-[#FFB800]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">

          {/* Wishlist — يظهر دايماً */}
          <Link
            href="/wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#111] transition hover:border-[#FFB800]"
            aria-label="قائمة الأمنيات"
          >
            <Heart size={18} className="text-[#D1D5DB]" />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E11D48] text-[9px] font-black text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart — يظهر دايماً */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 items-center gap-2 rounded-bl-[16px] rounded-tr-[16px] border-2 border-[#FFB800] bg-[#FFB800] px-4 font-black text-black shadow-[3px_3px_0px_0px_#E11D48] transition hover:-translate-y-0.5"
            aria-label="السلة"
          >
            <ShoppingCart size={16} />
            <span className="text-sm">السلة</span>
            {cartCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-black text-[#FFB800]">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </nav>
    </header>
  );
}