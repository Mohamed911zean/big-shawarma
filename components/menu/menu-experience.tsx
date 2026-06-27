"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { useStorefront } from "@/context/storefront-context";
import { useToast } from "@/components/ui/toast-provider";
import { MenuItem, currency, menuGroups, menuItems } from "@/data/storefront";
import { MenuCard } from "./menu-card";
import { ProductModal } from "./product-modal";

export default function MenuExperience({ compact = false }: { compact?: boolean }) {
  const categories = menuGroups.map((group) => group.category);
  const { wishlist, cartCount, subtotal, addToCart, openCartDrawer, toggleWishlist } =
    useStorefront();
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["تومية إكسترا"]);

  // Compact mode: 2 items from first 3 categories only
  const compactItems = useMemo(
    () => menuGroups.slice(0, 3).flatMap((g) => g.items.slice(0, 2)),
    [],
  );

  const visibleItems = useMemo(() => {
    if (compact) return compactItems;
    const q = searchTerm.trim().toLowerCase();
    if (q)
      return menuItems.filter((item) =>
        `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(q),
      );
    return menuGroups.find((group) => group.category === activeCategory)?.items ?? [];
  }, [compact, compactItems, activeCategory, searchTerm]);

  function handleAddToCart(item: MenuItem, options: string[] = []) {
    addToCart(item, options);
    showToast(`تمت إضافة ${item.name}`, "cart", "🛒");
  }

  function handleToggleWishlist(item: MenuItem) {
    const isIn = wishlist.some((e) => e.id === item.id);
    toggleWishlist(item);
    showToast(
      isIn ? `تم حذف ${item.name} من المفضلة` : `تمت إضافة ${item.name} للمفضلة`,
      "wishlist",
      isIn ? "💔" : "❤️",
    );
  }

  function openDetails(item: MenuItem) {
    setSelectedItem(item);
    setSelectedOptions(["تومية إكسترا"]);
  }

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-14 md:px-8">
      {/* Header row */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 inline-flex rounded-br-[18px] rounded-tl-[18px] border-2 border-[#FFB800] bg-[#111] px-4 py-2 text-sm font-black text-[#FFB800]">
            منيو بيج
          </p>
          <h2 className="max-w-3xl text-5xl font-black leading-tight text-white sm:text-6xl">
            {compact ? "اختار طلبك بسرعة" : "فلتر مزاجك وابدأ الطلب"}
          </h2>
        </div>
        {!compact && (
          <div className="flex gap-3">
            <div className="relative w-full min-w-0 lg:w-80">
              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFB800]"
                size={18}
              />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث في المنيو..."
                className="w-full rounded-bl-[24px] rounded-tr-[24px] border border-white/15 bg-white/10 py-4 pr-11 pl-4 font-bold text-white outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]"
              />
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
        )}
      </div>

      {/* Category filter — full menu only */}
      {!compact && (
        <div className="relative mt-8">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-bl-[24px] rounded-tr-[24px] border-2 px-5 py-3 text-sm font-black transition duration-300 hover:-translate-y-1 ${
                  activeCategory === category
                    ? "border-white bg-[#FFB800] text-black shadow-[6px_6px_0_#E11D48]"
                    : "border-white/20 bg-white/5 text-white shadow-[6px_6px_0_#FFB800]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Scroll fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0D0D0D] to-transparent" />
        </div>
      )}

      {/* Items grid */}
      <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map((item, index) => (
          <MenuCard
            key={item.id}
            item={item}
            index={index}
            isWishlisted={wishlist.some((e) => e.id === item.id)}
            onAddToCart={() => handleAddToCart(item)}
            onToggleWishlist={() => handleToggleWishlist(item)}
            onOpenDetails={() => openDetails(item)}
          />
        ))}
      </div>

      {/* Compact CTA */}
      {compact && (
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 rounded-bl-[28px] rounded-tr-[28px] bg-[#FFB800] px-8 py-4 text-lg font-black text-black shadow-[6px_6px_0_#E11D48] transition hover:-translate-y-1"
          >
            عرض المنيو كامل — {menuItems.length} صنف ←
          </Link>
        </div>
      )}

      {/* Sticky mobile checkout bar */}
      <AnimatePresence>
        {!compact && cartCount > 0 && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="fixed inset-x-0 bottom-0 z-50 p-4 backdrop-blur-md lg:hidden"
            style={{ background: "rgba(13,13,13,0.95)", borderTop: "2px solid #FFB800" }}
          >
            <Link
              href="/checkout"
              className="flex w-full items-center justify-between rounded-bl-[24px] rounded-tr-[24px] bg-[#25D366] px-5 py-4 font-black text-black shadow-[5px_5px_0_#FFB800]"
            >
              <span>إكمال الطلب</span>
              <span className="flex items-center gap-2">
                <span>{currency(subtotal)}</span>
                <span className="rounded-full bg-black px-2 py-0.5 text-sm text-white">
                  {cartCount}
                </span>
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <ProductModal
        item={selectedItem}
        options={selectedOptions}
        setOptions={setSelectedOptions}
        onClose={() => setSelectedItem(null)}
        onAdd={(item) => {
          handleAddToCart(item, selectedOptions);
          setSelectedItem(null);
          openCartDrawer();
        }}
      />
    </section>
  );
}
