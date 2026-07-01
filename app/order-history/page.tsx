"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { AmbientEnergy } from "@/components/layout/ambient-energy";
import Navbar from "@/components/layout/navbar";
import { useStorefront } from "@/context/storefront-context";
import { useToast } from "@/components/ui/toast-provider";
import { OrderCard } from "@/components/ui/order-card";

export default function OrderHistoryPage() {
  const { orders, deleteOrder, clearAllOrders, reorderItems, addToCart } = useStorefront();
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  function handleDelete(id: string) {
    setPendingDelete(id);
    setTimeout(() => {
      setPendingDelete((current) => {
        if (current === id) {
          deleteOrder(id);
          return null;
        }
        return current;
      });
    }, 4000);
  }

  function undoDelete(id: string) {
    if (pendingDelete === id) setPendingDelete(null);
  }

  function handleReorder(orderId: string) {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      reorderItems(order.items);
      showToast("تمت إضافة الطلب للسلة — أكمل الطلب!", "success", "✓");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pt-32 pb-24 md:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-br-[18px] rounded-tl-[18px] border-2 border-[#FFB800] bg-[#111] px-4 py-2 text-sm font-black text-[#FFB800] shadow-[4px_4px_0_#E11D48]">
              <ClipboardList size={16} />
              سجل الطلبات
            </p>
            <h1 className="text-4xl font-black sm:text-5xl">طلباتي</h1>
            {orders.length > 0 && (
              <p className="mt-2 text-sm font-bold text-[#9CA3AF]">
                {orders.length} طلب مسجل على الجهاز ده
              </p>
            )}
          </div>
          {orders.length > 0 && (
            <div className="text-left">
              {confirmClearAll ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#E11D48]">متأكد؟</span>
                  <button
                    type="button"
                    onClick={() => {
                      clearAllOrders();
                      setConfirmClearAll(false);
                    }}
                    className="rounded-bl-[14px] rounded-tr-[14px] bg-[#E11D48] px-4 py-2 text-sm font-black text-white shadow-[3px_3px_0_#111]"
                  >
                    امسح الكل
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClearAll(false)}
                    className="text-sm font-bold text-[#9CA3AF] underline"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmClearAll(true)}
                  className="text-sm font-bold text-[#9CA3AF] underline hover:text-white"
                >
                  مسح كل الطلبات
                </button>
              )}
            </div>
          )}
        </div>

        {/* Empty state */}
        {orders.length === 0 && (
          <div className="rounded-bl-[48px] rounded-tr-[48px] border-2 border-[#FFB800] bg-[#111] p-12 text-center shadow-[8px_8px_0_#FFB800]">
            <ShoppingBag size={52} className="mx-auto text-[#FFB800]" />
            <h2 className="mt-5 text-2xl font-black">ما طلبتش حاجة لحد دلوقتي</h2>
            <p className="mt-3 text-lg font-bold text-[#9CA3AF]">
              ابدأ بتصفح المنيو وأضف اللي يعجبك للسلة
            </p>
            <Link
              href="/menu"
              className="mt-6 inline-flex items-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#FFB800] px-6 py-3 font-black text-black shadow-[5px_5px_0_#E11D48]"
            >
              تصفح المنيو
            </Link>
          </div>
        )}

        {/* Orders list */}
        <div className="space-y-5">
          <AnimatePresence>
            {orders
              .filter((o) => o.id !== pendingDelete)
              .map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="rounded-bl-[36px] rounded-tr-[36px] border-2 border-white/15 bg-[#111] p-5 shadow-[6px_6px_0_#FFB800]"
                >
                  <OrderCard
                    order={order}
                    onDelete={() => handleDelete(order.id)}
                    onReorder={() => handleReorder(order.id)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Pending delete undo */}
          <AnimatePresence>
            {pendingDelete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between rounded-bl-[22px] rounded-tr-[22px] border-2 border-[#E11D48] bg-[#E11D48]/15 p-4"
              >
                <span className="font-bold">تم حذف الطلب</span>
                <button
                  type="button"
                  onClick={() => undoDelete(pendingDelete)}
                  className="rounded-bl-[14px] rounded-tr-[14px] bg-white px-4 py-2 text-sm font-black text-black shadow-[3px_3px_0_#E11D48]"
                >
                  تراجع
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}