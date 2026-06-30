"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  HeartOff,
  ShoppingBag,
  Plus,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { menuItems, categories, currency, MenuItem } from "@/data/storefront";
import { useStorefront } from "@/context/storefront-context";
import { useToast } from "@/components/ui/toast-provider";
import { AmbientEnergy } from "@/components/layout/ambient-energy";
import Navbar from "@/components/layout/navbar";
import { ProductModal } from "@/components/menu/product-modal";
import Image from "next/image"

// ─── Randomizer ───────────────────────────────────────────────────────────────

function FloatingRandomizer({ onRandomize }: { onRandomize: (item: MenuItem) => void }) {
  const [spinning, setSpinning] = useState(false);

  function handleSpin() {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      const random = menuItems[Math.floor(Math.random() * menuItems.length)];
      onRandomize(random);
      setSpinning(false);
    }, 700);
  }

  return (
    <motion.button
      onClick={handleSpin}
      whileTap={{ scale: 0.92 }}
      title="اختيار عشوائي"
      className="fixed bottom-24 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#FFB800] bg-[#111] text-2xl shadow-[4px_4px_0_#E11D48] transition-all hover:bg-[#FFB800] lg:bottom-6"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <motion.span
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={spinning ? { duration: 0.7, ease: "easeInOut" } : {}}
      >
        🎲
      </motion.span>
    </motion.button>
  );
}

// ─── Menu Card ────────────────────────────────────────────────────────────────

function MenuCard({
  item,
  isFav,
  onAdd,
  onToggleFav,
  onOpen,
}: {
  item: MenuItem;
  isFav: boolean;
  onAdd: () => void;
  onToggleFav: () => void;
  onOpen: () => void;
}) {
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    if (added) return;
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function handleFav(e: React.MouseEvent) {
    e.stopPropagation();
    onToggleFav();
  }

  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-bl-[24px] rounded-tr-[24px] border border-white/8 bg-[#111] transition-all duration-200 hover:border-[#FFB800]/30 hover:shadow-[0_8px_24px_rgba(255,184,0,0.08)]"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Image area */}
      <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-[#161616]">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at 55% 35%, #FFB800, transparent 65%)" }}
        >
        <Image src="/hero-section-cool-img-with-no-bg.png" width={200} height={200} alt={item.name} className="relative select-none text-6xl drop-shadow-lg"/>
        </div>

        {/* Popular badge */}
        {item.isPopular && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-bl-[8px] rounded-tr-[8px] bg-[#E11D48] px-2.5 py-1 text-[10px] font-black text-white">
            🔥 الأكثر طلباً
          </div>
        )}
        {item.tag && !item.isPopular && (
          <div className="absolute right-3 top-3 rounded-bl-[8px] rounded-tr-[8px] bg-[#FFB800] px-2.5 py-1 text-[10px] font-black text-black">
            {item.tag}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleFav}
          aria-label={isFav ? "إزالة من المفضلة" : "إضافة للمفضلة"}
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition hover:bg-black/80"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <Heart
            size={13}
            className={isFav ? "fill-[#E11D48] text-[#E11D48]" : "text-white/50"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="line-clamp-2 text-sm font-black leading-snug text-white sm:text-base">
            {item.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#9CA3AF]">
            {item.description}
          </p>
        </div>

        {/* Price + Add */}
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-[#FFB800]">{item.price}</span>
            <span className="text-xs text-[#9CA3AF]">جنيه</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleAdd}
            aria-label="أضف للسلة"
            className={`flex h-9 items-center gap-1.5 rounded-bl-[12px] rounded-tr-[12px] border-2 px-3 text-xs font-black transition-all duration-200 ${
              added
                ? "border-green-500 bg-green-500/15 text-green-400"
                : "border-[#FFB800] bg-[#FFB800] text-black shadow-[2px_2px_0_#E11D48]"
            }`}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  ✓
                </motion.span>
              ) : (
                <motion.span
                  key="plus"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1"
                >
                  <ShoppingBag size={12} />
                  أضف
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MenuPage() {
  const { wishlist, toggleWishlist, addToCart, cartCount, subtotal } = useStorefront();
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // ─ Filtered items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        if (
          !item.name.toLowerCase().includes(q) &&
          !item.description.toLowerCase().includes(q)
        )
          return false;
      }

      if (showFavOnly && !wishlist.some((w) => w.id === item.id)) return false;

      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, searchQuery, showFavOnly, showFavOnly ? wishlist : null]);

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setShowFavOnly(false);
    setSearchQuery("");
  }

  function handleAdd(item: MenuItem, options: string[] = []) {
    addToCart(item, options);
    showToast(`تمت إضافة ${item.name} 🛒`, "cart", "");
  }

  function handleToggleFav(item: MenuItem) {
    const isIn = wishlist.some((w) => w.id === item.id);
    toggleWishlist(item);
    showToast(
      isIn ? "تم الحذف من المفضلة" : "تمت الإضافة للمفضلة ❤️",
      "wishlist",
      ""
    );
  }

  function openModal(item: MenuItem) {
    setSelectedItem(item);
    setSelectedOptions([]);
  }

  const allCategories = [{ id: "all", label: "الكل 🔥" }, ...categories.map((c) => ({ id: c, label: c.split(" ")[0] + " " + c.split(" ")[1] }))];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0D0D0D] pb-36 text-white">
      <AmbientEnergy />
      <Navbar />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-32 md:px-8">

        {/* ── Title ── */}
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-br-[18px] rounded-tl-[18px] border-2 border-[#FFB800] bg-[#111] px-4 py-2 text-sm font-black text-[#FFB800]">
            🌯 قائمة الأكل
          </p>
          <h1 className="text-4xl font-black text-white sm:text-5xl">
            المنيو <span className="text-[#FFB800]">كامل</span>
          </h1>
          <div className="mx-auto mt-3 h-0.5 w-16 bg-[#FFB800]" />
        </div>

        {/* ── Search + Favorites ── */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أي صنف..."
              className="w-full rounded-bl-[16px] rounded-tr-[16px] border border-white/10 bg-[#111] py-3 pr-11 pl-4 text-sm text-white placeholder-[#555] outline-none transition focus:border-[#FFB800]/50 focus:ring-1 focus:ring-[#FFB800]/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Favorites toggle */}
          <button
            onClick={() => setShowFavOnly((p) => !p)}
            className={`flex items-center justify-center gap-2 rounded-bl-[16px] rounded-tr-[16px] border-2 px-5 py-3 text-sm font-black transition-all ${
              showFavOnly
                ? "border-[#E11D48] bg-[#E11D48]/15 text-white shadow-[3px_3px_0_#FFB800]"
                : "border-white/10 bg-[#111] text-[#9CA3AF] hover:border-[#E11D48]/40 hover:text-white"
            }`}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <Heart
              size={15}
              className={showFavOnly ? "fill-[#E11D48] text-[#E11D48]" : ""}
            />
            <span>المفضلة</span>
            {wishlist.length > 0 && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-black ${
                  showFavOnly ? "bg-[#FFB800] text-black" : "bg-white/10 text-[#9CA3AF]"
                }`}
              >
                {wishlist.length}
              </span>
            )}
          </button>
        </div>

        {/* ── Category Tabs ── */}
        <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
          {allCategories.map(({ id, label }) => (
            <motion.button
              key={id}
              onClick={() => handleCategoryChange(id)}
              whileTap={{ scale: 0.94 }}
              className={`shrink-0 rounded-bl-[14px] rounded-tr-[14px] border-2 px-4 py-2 text-xs font-black transition-all ${
                activeCategory === id
                  ? "border-white bg-[#FFB800] text-black shadow-[3px_3px_0_#E11D48]"
                  : "border-white/10 bg-[#111] text-[#9CA3AF] hover:border-[#FFB800]/40 hover:text-[#FFB800]"
              }`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* ── Results count ── */}
        {(searchQuery || showFavOnly || activeCategory !== "all") && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-5 text-sm text-[#9CA3AF]"
          >
            {filteredItems.length === 0
              ? "مفيش نتائج"
              : `${filteredItems.length} صنف`}
          </motion.p>
        )}

        {/* ── Empty State ── */}
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              {showFavOnly ? (
                <>
                  <HeartOff size={48} className="mb-4 text-[#FFB800]" />
                  <p className="font-black text-white">مفيش مفضلة لسه</p>
                  <p className="mt-1 text-sm text-[#9CA3AF]">
                    اضغط على ❤️ في أي صنف تعجبك
                  </p>
                  <button
                    onClick={() => setShowFavOnly(false)}
                    className="mt-5 rounded-bl-[14px] rounded-tr-[14px] border-2 border-[#FFB800] px-5 py-2.5 text-sm font-black text-[#FFB800]"
                  >
                    عرض كل الأصناف
                  </button>
                </>
              ) : (
                <>
                  <span className="mb-4 text-5xl">🔍</span>
                  <p className="font-black text-white">مفيش نتائج</p>
                  <p className="mt-1 text-sm text-[#9CA3AF]">
                    جرب كلمة تانية أو غير القسم
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                    className="mt-5 rounded-bl-[14px] rounded-tr-[14px] border-2 border-[#FFB800] px-5 py-2.5 text-sm font-black text-[#FFB800]"
                  >
                    مسح البحث
                  </button>
                </>
              )}
            </motion.div>
          ) : (
            /* ── Grid ── */
            <motion.div
              key={`${activeCategory}-${showFavOnly}`}
              layout
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    isFav={wishlist.some((w) => w.id === item.id)}
                    onAdd={() => handleAdd(item)}
                    onToggleFav={() => handleToggleFav(item)}
                    onOpen={() => openModal(item)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Floating Randomizer ── */}
      <FloatingRandomizer onRandomize={(item) => openModal(item)} />

      {/* ── Sticky Checkout Bar ── */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden"
          >
            <a
              href="/checkout"
              className="flex w-full items-center justify-between rounded-bl-[22px] rounded-tr-[22px] bg-[#FFB800] px-5 py-4 shadow-[4px_4px_0_#E11D48] transition active:scale-[0.98]"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <span className="font-black text-black">إكمال الطلب</span>
              <div className="flex items-center gap-3">
                <span className="font-black text-black">{currency(subtotal)}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-black text-[#FFB800]">
                  {cartCount}
                </span>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Product Modal ── */}
      <ProductModal
        item={selectedItem}
        options={selectedOptions}
        setOptions={setSelectedOptions}
        onClose={() => setSelectedItem(null)}
        onAdd={(item) => {
          handleAdd(item, selectedOptions);
          setSelectedItem(null);
        }}
      />
    </main>
  );
}