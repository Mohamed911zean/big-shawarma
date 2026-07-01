"use client";

import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingCart, Dices } from "lucide-react";
import { menuItems, currency } from "@/data/storefront";
import { useStorefront } from "@/context/storefront-context";
import Image from "next/image"

export default function FloatingRandomizer() {
  const { randomizerOpen, setRandomizerOpen, addToCart } = useStorefront();
  const [index, setIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    if (randomizerOpen && !showNudge) {
      sessionStorage.setItem("bs_randomizer_triggered", "true");
    }
  }, [randomizerOpen, showNudge]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasTriggered = sessionStorage.getItem("bs_randomizer_triggered");
      if (!hasTriggered && !randomizerOpen) {
        setShowNudge(true);
        sessionStorage.setItem("bs_randomizer_triggered", "true");
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [randomizerOpen]);

  const selected = useMemo(() => menuItems[index % menuItems.length], [index]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setJustAdded(false);

    const target = Math.floor(Math.random() * menuItems.length);
    let ticks = 0;
    const maxTicks = 20 + target;

    const interval = window.setInterval(() => {
      ticks += 1;
      setIndex((prev) => (prev + 1) % menuItems.length);

      if (ticks >= maxTicks) {
        window.clearInterval(interval);
        setIndex(target);
        setSpinning(false);
      }
    }, Math.max(60, 200 - (maxTicks - ticks) * 10));
  };

  const handleOpen = () => {
    setRandomizerOpen(true);
    setShowNudge(false);
  };

  const handleAddToCart = () => {
    addToCart(selected);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <>
      <div className="fixed bottom-24 left-5 z-40 md:bottom-5 md:left-5">
        <AnimatePresence>
          {showNudge && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-16 left-0 mb-2 w-max max-w-[200px]"
              onClick={handleOpen}
            >
              <div className="relative rounded-bl-[20px] rounded-tr-[20px] bg-[#E11D48] p-4 text-white shadow-[4px_4px_0_#FFB800] cursor-pointer">
                <p className="text-sm font-black">محتار تختار؟ 🤔</p>
                <p className="mt-1 text-xs font-bold opacity-90">خلينا نختار لك عشوتك</p>
                <div className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 bg-[#E11D48]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleOpen}
          className="grid h-14 w-14 place-items-center rounded-bl-[16px] rounded-tr-[16px] border-2 border-[#FFB800] bg-[#FFB800] text-black shadow-[4px_4px_0_#E11D48] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#E11D48] active:scale-95"
          aria-label="اختر عشوائي"
        >
          <Dices size={28} className="animate-pulse" />
        </button>
      </div>

      <AnimatePresence>
        {randomizerOpen && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 22 }}
              className="w-full max-w-sm overflow-hidden rounded-bl-[40px] rounded-tr-[40px] border-[3px] border-[#FFB800] bg-[#111] p-6 text-white shadow-[10px_10px_0_#E11D48]"
            >
              <div className="mb-5 flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <Dices className="text-[#FFB800]" size={24} />
                  <h2 className="text-2xl font-black text-white">عجلة الحظ</h2>
                </div>
                <button
                  onClick={() => setRandomizerOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#E11D48]"
                >
                  <X size={18} />
                </button>
              </div>

              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`relative mb-6 overflow-hidden rounded-bl-[28px] rounded-tr-[28px] border-2 p-4 text-center ${
                  spinning ? "border-white/15 bg-white/5" : "border-[#FFB800] bg-[#191919] shadow-[6px_6px_0_#E11D48]"
                }`}
              >
                <div className="flex items-center justify-center h-32 mb-4">
                  <Image src="/hero-section-cool-img-with-no-bg.png" alt="bg-image" width={150} height={150} className="object-contain" />
                </div>
                <h3 className="text-xl font-black">{selected.name}</h3>
                <p className="mt-2 min-h-[40px] text-sm font-bold text-[#9CA3AF] line-clamp-2">
                  {selected.description}
                </p>
                <p className="mt-3 text-2xl font-black text-[#FFB800]">
                  {currency(selected.price)}
                </p>
                {spinning && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <Dices className="animate-spin text-[#FFB800]" size={48} />
                  </div>
                )}
              </motion.div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={spin}
                  disabled={spinning}
                  className="flex items-center justify-center rounded-bl-[20px] rounded-tr-[20px] bg-[#E11D48] py-3.5 font-black text-white shadow-[4px_4px_0_#FFB800] transition active:scale-95 disabled:opacity-50 disabled:shadow-none"
                >
                  {spinning ? "جاري اللف..." : "لف العجلة!"}
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={spinning}
                  className={`flex items-center justify-center gap-2 rounded-bl-[20px] rounded-tr-[20px] border-2 py-3.5 font-black transition active:scale-95 disabled:opacity-50 ${
                    justAdded
                      ? "border-[#25D366] bg-[#25D366] text-black shadow-[4px_4px_0_#FFB800]"
                      : "border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800]/10"
                  }`}
                >
                  <ShoppingCart size={18} />
                  {justAdded ? "تمت الإضافة!" : "أضف للسلة"}
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
