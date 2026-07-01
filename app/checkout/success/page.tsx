"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  MapPin,
  Package,
  ChevronLeft,
  Home,
  ClipboardList,
} from "lucide-react";
import { useStorefront } from "@/context/storefront-context";
import { currency, ORDER_STATUS_LABELS } from "@/data/storefront";
import Navbar from "@/components/layout/navbar";
import { AmbientEnergy } from "@/components/layout/ambient-energy";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { orders, advanceOrderStatus } = useStorefront();
  const [latestOrder, setLatestOrder] = useState(orders[0] ?? null);

  useEffect(() => {
    if (orders[0]) setLatestOrder(orders[0]);
  }, [orders]);

  useEffect(() => {
    if (!latestOrder) {
      router.replace("/");
      return;
    }
    // Demo: auto-advance status every 12 seconds
    if (
      latestOrder.status === "delivered" ||
      latestOrder.status === "cancelled"
    )
      return;

    const timer = setInterval(() => {
      advanceOrderStatus(latestOrder.id);
    }, 12000);

    return () => clearInterval(timer);
  }, [latestOrder, advanceOrderStatus, router]);

  if (!latestOrder) return null;

  const isDelivery = latestOrder.orderType === "delivery";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />

      <div className="relative z-10 mx-auto max-w-2xl px-5 pb-24 pt-32">
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#FFB800] bg-[#FFB800]/10 text-5xl shadow-[0_0_40px_rgba(255,184,0,0.3)]">
            🎉
          </div>
          <h1 className="text-3xl font-black text-white">
            تم استلام طلبك!
          </h1>
          <p className="mt-2 text-[#9CA3AF]">
            رقم الطلب:{" "}
            <span className="font-black text-[#FFB800]">{latestOrder.id}</span>
          </p>
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 rounded-bl-[22px] rounded-tr-[22px] border border-[#FFB800]/30 bg-[#111] p-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#FFB800]" />
            <span className="font-black text-[#FFB800]">
              {ORDER_STATUS_LABELS[latestOrder.status]}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
            <Clock size={14} />
            <span>
              وقت التسليم المتوقع:{" "}
              <span className="font-bold text-white">
                {latestOrder.estimatedMinutes} دقيقة
              </span>
            </span>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 rounded-bl-[22px] rounded-tr-[22px] border border-white/10 bg-[#111] p-5"
        >
          <h2 className="mb-4 font-black text-white">تفاصيل الطلب</h2>

          <div className="mb-4 space-y-2">
            {latestOrder.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[#D1D5DB]">
                  {item.name}{" "}
                  <span className="text-[#9CA3AF]">× {item.quantity}</span>
                </span>
                <span className="font-bold text-white">
                  {currency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-3">
            <div className="flex justify-between text-sm text-[#9CA3AF]">
              <span>المجموع الفرعي</span>
              <span>{currency(latestOrder.subtotal)}</span>
            </div>
            {isDelivery && (
              <div className="flex justify-between text-sm text-[#9CA3AF]">
                <span>رسوم التوصيل</span>
                <span>{currency(latestOrder.deliveryFee)}</span>
              </div>
            )}
            <div className="mt-2 flex justify-between font-black text-white">
              <span>الإجمالي</span>
              <span className="text-[#FFB800]">{currency(latestOrder.total)}</span>
            </div>
          </div>
        </motion.div>

        {/* Delivery Info */}
        {isDelivery && latestOrder.address?.street && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 flex items-start gap-3 rounded-bl-[22px] rounded-tr-[22px] border border-white/10 bg-[#111] p-5"
          >
            <MapPin size={18} className="mt-0.5 shrink-0 text-[#FFB800]" />
            <div>
              <p className="text-sm font-bold text-white">عنوان التوصيل</p>
              <p className="text-sm text-[#9CA3AF]">
                {latestOrder.address.street}، {latestOrder.address.area}،{" "}
                {latestOrder.address.city}
              </p>
            </div>
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/orders"
            className="flex flex-1 items-center justify-center gap-2 rounded-br-[28px] rounded-tl-[28px] border-2 border-white bg-[#FFB800] px-6 py-3 font-black text-black shadow-[5px_5px_0px_0px_#E11D48] transition hover:-translate-y-0.5"
          >
            <ClipboardList size={18} />
            تتبع الطلب
          </Link>
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] border-2 border-[#FFB800] bg-transparent px-6 py-3 font-black text-[#FFB800] transition hover:-translate-y-0.5"
          >
            <Home size={18} />
            الرئيسية
          </Link>
        </motion.div>
      </div>
    </main>
  );
}