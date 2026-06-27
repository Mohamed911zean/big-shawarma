"use client";

import Image from "next/image";
import { X, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-lg"
        >
          <motion.div
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            className="relative grid w-full max-w-5xl overflow-hidden rounded-bl-[70px] rounded-tr-[70px] border-[4px] border-white bg-[#111] shadow-[12px_12px_0_#FFB800] md:grid-cols-2"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute left-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-[#E11D48] text-white"
            >
              <X />
            </button>
            <div className="bg-[#FFB800] p-8 text-black">
              <Image
                src="/hero-section-cool-img-with-no-bg.png"
                alt=""
                width={352}
                height={299}
                className="mx-auto w-72 drop-shadow-[10px_12px_0_rgba(0,0,0,0.35)]"
              />
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                {["حجم كبير", "بروتين عالي", "صوص كثيف"].map((macro) => (
                  <div
                    key={macro}
                    className="rounded-bl-[20px] rounded-tr-[20px] border-2 border-black bg-white p-3 text-sm font-black shadow-[4px_4px_0_#111]"
                  >
                    {macro}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-4xl font-black leading-tight">{item.name}</h3>
              <p className="mt-4 text-lg font-bold leading-8 text-[#9CA3AF]">{item.description}</p>
              <strong className="mt-6 block text-4xl text-[#FFB800]">{currency(item.price)}</strong>
              <div className="mt-8 space-y-3">
                {modifications.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center justify-between rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-white/5 p-4 font-black"
                  >
                    <span>{option}</span>
                    <input
                      type="checkbox"
                      checked={options.includes(option)}
                      onChange={() =>
                        setOptions(
                          options.includes(option)
                            ? options.filter((e) => e !== option)
                            : [...options, option],
                        )
                      }
                      className="h-5 w-5 accent-[#FFB800]"
                    />
                  </label>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onAdd(item)}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#E11D48] px-6 py-4 text-lg font-black shadow-[6px_6px_0_#FFB800]"
              >
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
