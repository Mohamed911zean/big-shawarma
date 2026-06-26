import { useStorefront } from "@/app/context/storefront-context";
import { AnimatePresence , motion } from "framer-motion";
import {Minus , Plus , X} from "lucide-react"
import Link from "next/link"
import { getCartLineKey } from "@/app/context/storefront-context";
import {currency} from "../../data/storefront"

export default function CartDrawer({
  open,
  cart,
  subtotal,
  onClose,
  onQuantity,
}: {
  open: boolean;
  cart: ReturnType<typeof useStorefront>["cart"];
  subtotal: number;
  onClose: () => void;
  onQuantity: (lineKey: string, delta: number) => void;
}) {
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
              <h2 className="text-3xl font-black">سلة الطلب</h2>
              <button
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-black"
              >
                <X />
              </button>
            </div>
            <div className="mt-6 flex-1 space-y-4 overflow-auto pr-1">
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
            </div>
            <div className="border-t border-white/15 pt-5">
              <div className="flex items-center justify-between text-2xl font-black">
                <span>الإجمالي</span>
                <span className="text-[#FFB800]">{currency(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#25D366] px-5 py-4 text-lg font-black text-black shadow-[6px_6px_0_#FFB800]"
              >
                إكمال الطلب ←
              </Link>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}