"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Minus, Plus, Search, ShoppingCart, X } from "lucide-react";
import { useMemo, useState } from "react";
import { getCartLineKey, useStorefront } from "../context/storefront-context";
import { MenuItem, currency, menuGroups, menuItems } from "../data/storefront";

const modifications = ["تومية إكسترا", "جبنة سايحة", "نسخة حارة"];

export default function MenuExperience({ compact = false }: { compact?: boolean }) {
  const categories = menuGroups.map((group) => group.category);
  const { cart, wishlist, cartCount, subtotal, addToCart, updateQuantity, toggleWishlist } = useStorefront();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["تومية إكسترا"]);
  const [cartOpen, setCartOpen] = useState(false);

  const visibleItems = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (q) return menuItems.filter((item) => `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(q));
    return menuGroups.find((group) => group.category === activeCategory)?.items ?? [];
  }, [activeCategory, searchTerm]);

  function openDetails(item: MenuItem) {
    setSelectedItem(item);
    setSelectedOptions(["تومية إكسترا"]);
  }

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-14 md:px-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 inline-flex rounded-br-[18px] rounded-tl-[18px] border-2 border-[#FFB800] bg-[#111] px-4 py-2 text-sm font-black text-[#FFB800]">منيو بيج</p>
          <h2 className="max-w-3xl text-5xl font-black leading-tight text-white sm:text-6xl">{compact ? "اختار طلبك بسرعة" : "فلتر مزاجك وابدأ الطلب"}</h2>
        </div>
        <div className="flex gap-3">
          <label className="relative block w-full min-w-0 lg:w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFB800]" size={18} />
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="ابحث في المنيو..." className="w-full rounded-bl-[24px] rounded-tr-[24px] border border-white/15 bg-white/10 py-4 pr-11 pl-4 font-bold text-white outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]" />
          </label>
          <button onClick={() => setCartOpen(true)} className="relative flex shrink-0 items-center gap-2 rounded-bl-[24px] rounded-tr-[24px] bg-[#25D366] px-5 py-4 font-black text-black shadow-[5px_5px_0_#FFB800]">
            <ShoppingCart />
            <span className="hidden sm:inline">السلة</span>
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-black px-1 text-xs text-white">{cartCount}</span>
          </button>
        </div>
      </div>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-bl-[24px] rounded-tr-[24px] border-2 px-5 py-3 text-sm font-black transition duration-300 hover:-translate-y-1 ${activeCategory === category ? "border-white bg-[#FFB800] text-black shadow-[6px_6px_0_#E11D48]" : "border-white/20 bg-white/5 text-white shadow-[6px_6px_0_#FFB800]"}`}>
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map((item, index) => (
          <article key={item.id} className={`group relative rounded-br-xl rounded-tl-xl border-2 border-white bg-[#151515] p-5 transition duration-300 hover:scale-[1.03] ${index % 2 ? "rounded-bl-[44px] rounded-tr-[20px] shadow-[7px_7px_0_#FFB800] hover:rotate-2" : "rounded-bl-[20px] rounded-tr-[44px] shadow-[7px_7px_0_#E11D48] hover:-rotate-2"}`}>
            <button onClick={() => toggleWishlist(item)} aria-label="إضافة للمفضلة" className={`absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 ${wishlist.some((entry) => entry.id === item.id) ? "bg-[#E11D48] text-white" : "bg-black text-[#FFB800]"}`}>
              <Heart size={19} fill={wishlist.some((entry) => entry.id === item.id) ? "currentColor" : "none"} />
            </button>
            <div className="mb-5 grid h-28 place-items-center rounded-bl-[34px] rounded-tr-[34px] bg-[#FFB800]">
              <Image src="/hero-section-cool-img-with-no-bg.png" alt="" width={176} height={150} className="h-32 w-auto -translate-y-3 object-contain transition duration-300 group-hover:-translate-y-6" />
            </div>
            <p className="mb-2 text-sm font-black text-[#FFB800]">{item.category}</p>
            <h3 className="text-2xl font-black leading-snug text-white">{item.name}</h3>
            <p className="mt-3 min-h-20 text-base font-bold leading-7 text-[#9CA3AF]">{item.description}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <button onClick={() => openDetails(item)} className="rounded-br-[18px] rounded-tl-[18px] border border-white/20 px-4 py-2 text-sm font-black text-[#FFB800] transition hover:bg-white hover:text-black">تفاصيل</button>
              <strong className="text-2xl text-[#FFB800]">{currency(item.price)}</strong>
            </div>
            <button onClick={() => addToCart(item)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-bl-[24px] rounded-tr-[24px] bg-[#E11D48] px-5 py-3 font-black text-white shadow-[5px_5px_0_#FFB800] transition hover:-translate-y-1">
              <Plus size={19} />
              إضافة للطلب
            </button>
          </article>
        ))}
      </div>

      <ProductModal item={selectedItem} options={selectedOptions} setOptions={setSelectedOptions} onClose={() => setSelectedItem(null)} onAdd={(item) => { addToCart(item, selectedOptions); setSelectedItem(null); setCartOpen(true); }} />
      <CartDrawer open={cartOpen} cart={cart} subtotal={subtotal} onClose={() => setCartOpen(false)} onQuantity={updateQuantity} />
    </section>
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

function CartDrawer({ open, cart, subtotal, onClose, onQuantity }: { open: boolean; cart: ReturnType<typeof useStorefront>["cart"]; subtotal: number; onClose: () => void; onQuantity: (lineKey: string, delta: number) => void }) {
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
                cart.map((line) => {
                  const key = getCartLineKey(line);
                  return (
                    <div key={key} className="rounded-bl-[26px] rounded-tr-[26px] border border-white/15 bg-white/5 p-4">
                      <div className="flex justify-between gap-3">
                        <div>
                          <h3 className="font-black">{line.name}</h3>
                          <p className="mt-1 text-sm text-[#9CA3AF]">{line.options.join("، ") || "بدون تعديلات"}</p>
                        </div>
                        <strong className="text-[#FFB800]">{currency(line.price * line.quantity)}</strong>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <button onClick={() => onQuantity(key, -1)} className="grid h-9 w-9 place-items-center rounded-full bg-[#E11D48]"><Minus size={18} /></button>
                        <span className="text-xl font-black">{line.quantity}</span>
                        <button onClick={() => onQuantity(key, 1)} className="grid h-9 w-9 place-items-center rounded-full bg-[#FFB800] text-black"><Plus size={18} /></button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="border-t border-white/15 pt-5">
              <div className="flex items-center justify-between text-2xl font-black">
                <span>الإجمالي</span>
                <span className="text-[#FFB800]">{currency(subtotal)}</span>
              </div>
              <Link href="/checkout" onClick={onClose} className="mt-5 flex w-full items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#25D366] px-5 py-4 text-lg font-black text-black shadow-[6px_6px_0_#FFB800]">
                إكمال الطلب
              </Link>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
