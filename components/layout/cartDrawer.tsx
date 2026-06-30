"use client"

import { AnimatePresence , motion } from "framer-motion";
import {Minus , Plus , X} from "lucide-react"
import Link from "next/link"
import { getCartLineKey, useStorefront } from "@/context/storefront-context";
import {currency} from "@/data/storefront"
import type { CartLine } from "@/data/storefront";
import { useState } from "react";
import { Phone, ShoppingBag, ArrowLeft, MessageCircle } from "lucide-react";

export default function CartDrawer({
  open,
  cart,
  subtotal,
  onClose,
  onQuantity,
}: {
  open: boolean;
  cart: CartLine[];
  subtotal: number;
  onClose: () => void;
  onQuantity: (lineKey: string, delta: number) => void;
}) {
  const [step, setStep] = useState<"cart" | "channel">("cart");

  const handleChannel = (ch: "website" | "whatsapp" | "call") => {
    if (ch === "whatsapp") {
      let msg = "أهلاً، أريد طلب:\n";
      cart.forEach((item, i) => {
        msg += `${i + 1}. *${item.name}* x${item.quantity} = ${item.price * item.quantity} ج.م\n`;
      });
      msg += `\n*الإجمالي:* ${subtotal} ج.م`;
      window.open(`https://wa.me/201050009994?text=${encodeURIComponent(msg)}`, "_blank");
      onClose();
    } else if (ch === "call") {
      window.location.href = "tel:01050009994";
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-md"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 24 }}
            className="mr-auto flex h-full w-full max-w-md flex-col border-r-4 border-[#FFB800] bg-[#111] p-5 shadow-[-10px_0_0_#E11D48]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step === "channel" && (
                  <button
                    onClick={() => setStep("cart")}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <h2 className="text-3xl font-black">{step === "cart" ? "سلة الطلب" : "طريقة الطلب"}</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setTimeout(() => setStep("cart"), 300);
                }}
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-black"
              >
                <X />
              </button>
            </div>
            <AnimatePresence mode="wait">
              {step === "cart" && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="mt-6 flex-1 space-y-4 overflow-auto pr-1 flex flex-col"
                >
                  {cart.length === 0 ? (
                    <p className="rounded-bl-[28px] rounded-tr-[28px] border border-white/15 bg-white/5 p-5 text-center font-bold text-[#9CA3AF]">
                      السلة فارغة حالياً.
                    </p>
                  ) : (
                    cart.map((line) => {
                      const key = getCartLineKey(line);
                      return (
                        <div
                          key={key}
                          className="rounded-bl-[26px] rounded-tr-[26px] border border-white/15 bg-white/5 p-4"
                        >
                          <div className="flex justify-between gap-3">
                            <div>
                              <h3 className="font-black">{line.name}</h3>
                              <p className="mt-1 text-sm text-[#9CA3AF]">
                                {line.options.join("، ") || "بدون تعديلات"}
                              </p>
                            </div>
                            <strong className="text-[#FFB800]">
                              {currency(line.price * line.quantity)}
                            </strong>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => onQuantity(key, -1)}
                              className="grid h-9 w-9 place-items-center rounded-full bg-[#E11D48]"
                            >
                              <Minus size={18} />
                            </button>
                            <span className="text-xl font-black">{line.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onQuantity(key, 1)}
                              className="grid h-9 w-9 place-items-center rounded-full bg-[#FFB800] text-black"
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                  
                  {/* Footer inside cart step to stay sticky at bottom of step */}
                  <div className="mt-auto border-t border-white/15 pt-5 pb-2">
                    <div className="flex items-center justify-between text-2xl font-black">
                      <span>الإجمالي</span>
                      <span className="text-[#FFB800]">{currency(subtotal)}</span>
                    </div>
                    {cart.length > 0 ? (
                      <button
                        onClick={() => setStep("channel")}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#25D366] px-5 py-4 text-lg font-black text-black shadow-[6px_6px_0_#FFB800] hover:-translate-y-0.5 transition"
                      >
                        متابعة الطلب ←
                      </button>
                    ) : (
                      <button
                        disabled
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-white/10 px-5 py-4 text-lg font-black text-white/40 cursor-not-allowed"
                      >
                        متابعة الطلب ←
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {step === "channel" && (
                <motion.div
                  key="channel"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="mt-6 flex-1 overflow-auto pr-1 flex flex-col gap-4"
                >
                  <p className="text-[#D1D5DB] font-bold text-sm">
                    تفضل بطلب منتجاتك من خلال إحدى القنوات التالية:
                  </p>

                  <Link
                    href="/checkout"
                    onClick={() => {
                      onClose();
                      setTimeout(() => setStep("cart"), 300);
                    }}
                    className="group flex items-center justify-between rounded-bl-[24px] rounded-tr-[24px] border-2 border-white/15 bg-white/5 p-4 transition hover:border-[#FFB800] hover:bg-[#FFB800]/10"
                  >
                    <div>
                      <p className="font-black text-lg text-white">الموقع الإلكتروني</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">تحديد الموقع على الخريطة مباشرة</p>
                    </div>
                    <ShoppingBag className="text-[#FFB800] transition group-hover:scale-110" size={24} />
                  </Link>

                  <button
                    onClick={() => handleChannel("whatsapp")}
                    className="group flex items-center justify-between rounded-bl-[24px] rounded-tr-[24px] border-2 border-[#25D366]/30 bg-[#25D366]/10 p-4 transition hover:border-[#25D366] hover:bg-[#25D366]/20"
                  >
                    <div>
                      <p className="font-black text-lg text-white">عبر الواتساب</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">إرسال الأصناف بضغطة زر</p>
                    </div>
                    <MessageCircle className="text-[#25D366] transition group-hover:scale-110" size={26} />
                  </button>

                  <button
                    onClick={() => handleChannel("call")}
                    className="group flex items-center justify-between rounded-bl-[24px] rounded-tr-[24px] border-2 border-[#E11D48]/30 bg-[#E11D48]/10 p-4 transition hover:border-[#E11D48] hover:bg-[#E11D48]/20"
                  >
                    <div>
                      <p className="font-black text-lg text-white">اتصال هاتفي</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">تحدث مع خدمة العملاء مباشرة</p>
                    </div>
                    <Phone className="text-[#E11D48] transition group-hover:scale-110" size={24} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export function GlobalCart() {
  const { cartOpen, closeCartDrawer, cart, subtotal, updateQuantity } = useStorefront();

  return (
    <>
      <CartDrawer
        open={cartOpen}
        cart={cart}
        subtotal={subtotal}
        onClose={closeCartDrawer}
        onQuantity={updateQuantity}
      />
    </>
  );
}