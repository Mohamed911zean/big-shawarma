"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Plus, ShoppingBag } from "lucide-react";
import { AmbientEnergy } from "@/components/layout/ambient-energy";
import Navbar from "@/components/layout/navbar";
import { useStorefront } from "@/context/storefront-context";
import { useToast } from "@/components/ui/toast-provider";
import { currency } from "@/data/storefront";

export default function WishlistPage() {
  const { wishlist, addToCart, toggleWishlist } = useStorefront();
  const { showToast } = useToast();

  function handleAddToCart(item: typeof wishlist[number]) {
    addToCart(item);
    showToast(`تمت إضافة ${item.name} للسلة`, "cart", "🛒");
  }

  function handleRemove(item: typeof wishlist[number]) {
    toggleWishlist(item);
    showToast(`تم حذف ${item.name} من المفضلة`, "wishlist", "💔");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-32 pb-24 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 inline-flex items-center gap-2 rounded-br-[18px] rounded-tl-[18px] border-2 border-[#E11D48] bg-[#111] px-4 py-2 text-sm font-black text-[#E11D48] shadow-[4px_4px_0_#FFB800]">
            <Heart size={16} fill="currentColor" />
            المفضلة
          </p>
          <h1 className="text-4xl font-black sm:text-5xl">أصنافك المفضلة</h1>
          {wishlist.length > 0 && (
            <p className="mt-2 text-sm font-bold text-[#9CA3AF]">
              {wishlist.length} صنف في مفضلتك
            </p>
          )}
        </div>

        {/* Empty state */}
        {wishlist.length === 0 && (
          <div className="rounded-bl-[48px] rounded-tr-[48px] border-2 border-[#E11D48] bg-[#111] p-12 text-center shadow-[8px_8px_0_#E11D48]">
            <Heart size={52} className="mx-auto text-[#E11D48]" />
            <h2 className="mt-5 text-2xl font-black">المفضلة فارغة</h2>
            <p className="mt-3 text-lg font-bold text-[#9CA3AF]">
              ضغط على قلب أي صنف في المنيو لإضافته هنا
            </p>
            <Link
              href="/menu"
              className="mt-6 inline-flex items-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#E11D48] px-6 py-3 font-black text-white shadow-[5px_5px_0_#FFB800]"
            >
              تصفح المنيو
            </Link>
          </div>
        )}

        {/* Wishlist grid */}
        <AnimatePresence>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {wishlist.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group relative rounded-br-xl rounded-tl-xl border-2 border-white bg-[#151515] p-5 transition duration-300 hover:scale-[1.03] ${
                  index % 2
                    ? "rounded-bl-[44px] rounded-tr-[20px] shadow-[7px_7px_0_#FFB800] hover:rotate-2"
                    : "rounded-bl-[20px] rounded-tr-[44px] shadow-[7px_7px_0_#E11D48] hover:-rotate-2"
                }`}
              >
                {/* Remove from wishlist */}
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  aria-label="حذف من المفضلة"
                  className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#E11D48] text-white"
                >
                  <Heart size={19} fill="currentColor" />
                </button>

                {/* Image */}
                <div className="mb-5 grid h-28 place-items-center rounded-bl-[34px] rounded-tr-[34px] bg-[#FFB800]">
                  <Image
                    src="/hero-section-cool-img-with-no-bg.png"
                    alt=""
                    width={176}
                    height={150}
                    className="h-32 w-auto -translate-y-3 object-contain transition duration-300 group-hover:-translate-y-6"
                  />
                </div>

                <p className="mb-2 text-sm font-black text-[#FFB800]">{item.category}</p>
                <h3 className="text-2xl font-black leading-snug text-white">{item.name}</h3>
                <p className="mt-3 min-h-16 text-base font-bold leading-7 text-[#9CA3AF]">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <strong className="text-2xl text-[#FFB800]">{currency(item.price)}</strong>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-bl-[24px] rounded-tr-[24px] bg-[#E11D48] px-5 py-3 font-black text-white shadow-[5px_5px_0_#FFB800] transition hover:-translate-y-1"
                >
                  <Plus size={19} />
                  إضافة للطلب
                </button>
              </motion.article>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </main>
  );
}