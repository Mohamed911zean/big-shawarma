"use client";

import Image from "next/image";
import { X, ShoppingCart, Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MenuItem, currency } from "@/data/storefront";



const modifications = ["تومية إكسترا", "جبنة سايحة", "نسخة حارة"];

export function ProductModal({
  item,
  options,
  setOptions,
  onClose,
  onAdd,
}: {
  item: MenuItem | null;
  options: string[];
  setOptions: (options: string[]) => void;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // منع scroll الخلفية لما الـ modal مفتوح
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm"
          />

          {isMobile ? (
            // ===== MOBILE: Bottom Sheet =====
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-[90] flex flex-col overflow-hidden rounded-t-[32px] bg-[#111] pb-safe"
              style={{ maxHeight: "92dvh" }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="h-1 w-12 rounded-full bg-white/20" />
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
                {/* Image strip */}
                <div className="relative -mx-5 mb-5 flex h-56 items-center justify-center bg-[#FFB800]">
                  <Image
                    src="/hero-section-cool-img-with-no-bg.png"
                    alt={item.name}
                    width={240}
                    height={200}
                    className="h-44 w-auto object-contain drop-shadow-[8px_8px_0_rgba(0,0,0,0.3)]"
                  />
                  {/* Close btn — فوق الصورة */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
                    aria-label="إغلاق"
                  >
                    <X size={20} />
                  </button>

                  {/* Macros row داخل الصورة */}
                  <div className="absolute bottom-3 left-4 right-4 flex gap-2">
                    {["حجم كبير", "بروتين عالي", "صوص كثيف"].map((m) => (
                      <span
                        key={m}
                        className="flex-1 rounded-bl-[12px] rounded-tr-[12px] border-2 border-black bg-white py-1 text-center text-[11px] font-black text-black shadow-[2px_2px_0_#111]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-3xl font-black leading-tight">{item.name}</h3>
                <p className="mt-2 leading-7 text-[#9CA3AF]">{item.description}</p>
                <strong className="mt-3 block text-3xl text-[#FFB800]">
                  {currency(item.price)}
                </strong>

                {/* Modifications */}
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-black text-[#666] uppercase tracking-wider">التعديلات</p>
                  {modifications.map((option) => {
                    const checked = options.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setOptions(
                            checked
                              ? options.filter((e) => e !== option)
                              : [...options, option]
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-bl-[18px] rounded-tr-[18px] border p-4 font-black transition
                          ${checked
                            ? "border-[#FFB800] bg-[#FFB800]/10 text-[#FFB800]"
                            : "border-white/10 bg-white/5 text-white"
                          }`}
                      >
                        <span>{option}</span>
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition
                          ${checked ? "border-[#FFB800] bg-[#FFB800]" : "border-white/30"}`}
                        >
                          {checked && <span className="text-black text-xs font-black">✓</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA — pinned at bottom */}
              <div className="shrink-0 border-t border-white/10 bg-[#111] px-5 py-4">
                <button
                  type="button"
                  onClick={() => onAdd(item)}
                  className="flex w-full items-center justify-center gap-3 rounded-bl-[24px] rounded-tr-[24px] bg-[#E11D48] py-4 text-lg font-black shadow-[5px_5px_0_#FFB800] active:scale-[0.98] transition-transform"
                >
                  <ShoppingCart size={20} />
                  إضافة للسلة
                  <span className="rounded-full bg-white/20 px-3 py-0.5 text-sm">
                    {currency(item.price)}
                  </span>
                </button>
              </div>
            </motion.div>
          ) : (
            // ===== DESKTOP: Center Modal =====
            <motion.div
              key="modal"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[90] grid place-items-center p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative grid w-full max-w-4xl overflow-hidden rounded-bl-[60px] rounded-tr-[60px] border-[4px] border-white bg-[#111] shadow-[14px_14px_0_#FFB800] md:grid-cols-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute left-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-[#E11D48] text-white transition hover:scale-110"
                  aria-label="إغلاق"
                >
                  <X size={20} />
                </button>

                {/* Left — image */}
                <div className="flex flex-col bg-[#FFB800] p-8 text-black">
                  <Image
                    src="/hero-section-cool-img-with-no-bg.png"
                    alt={item.name}
                    width={352}
                    height={299}
                    className="mx-auto w-64 drop-shadow-[10px_12px_0_rgba(0,0,0,0.35)]"
                  />
                  <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                    {["حجم كبير", "بروتين عالي", "صوص كثيف"].map((m) => (
                      <div
                        key={m}
                        className="rounded-bl-[16px] rounded-tr-[16px] border-2 border-black bg-white p-2.5 text-xs font-black shadow-[3px_3px_0_#111]"
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — info */}
                <div className="overflow-y-auto p-8">
                  <h3 className="text-4xl font-black leading-tight">{item.name}</h3>
                  <p className="mt-4 leading-8 text-[#9CA3AF]">{item.description}</p>
                  <strong className="mt-5 block text-4xl text-[#FFB800]">
                    {currency(item.price)}
                  </strong>

                  <div className="mt-6 space-y-3">
                    {modifications.map((option) => {
                      const checked = options.includes(option);
                      return (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-center justify-between rounded-bl-[20px] rounded-tr-[20px] border p-4 font-black transition
                            ${checked
                              ? "border-[#FFB800] bg-[#FFB800]/10 text-[#FFB800]"
                              : "border-white/15 bg-white/5 text-white"
                            }`}
                        >
                          <span>{option}</span>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setOptions(
                                checked
                                  ? options.filter((e) => e !== option)
                                  : [...options, option]
                              )
                            }
                            className="h-5 w-5 accent-[#FFB800]"
                          />
                        </label>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => onAdd(item)}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#E11D48] px-6 py-4 text-lg font-black shadow-[6px_6px_0_#FFB800] transition hover:-translate-y-0.5"
                  >
                    <ShoppingCart size={20} />
                    إضافة بالتعديلات
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}