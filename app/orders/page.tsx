"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  Package,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";
import { useStorefront } from "@/context/storefront-context";
import {
  currency,
  ORDER_STATUS_FLOW,
  ORDER_STATUS_ICONS,
  ORDER_STATUS_LABELS,
  OrderStatus,
} from "@/data/storefront";
import Navbar from "@/components/layout/navbar";
import { AmbientEnergy } from "@/components/layout/ambient-energy";
import { SectionTitle } from "@/components/layout/section-title";

function StatusTimeline({ status }: { status: OrderStatus }) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-2 text-sm text-red-400">
        <span>{ORDER_STATUS_ICONS.cancelled}</span>
        <span>{ORDER_STATUS_LABELS.cancelled}</span>
      </div>
    );
  }

  const currentIndex = ORDER_STATUS_FLOW.indexOf(status);

  return (
    <div className="relative flex items-center gap-0">
      {ORDER_STATUS_FLOW.map((step, i) => {
        const isDone = i <= currentIndex;
        const isCurrent = i === currentIndex;

        return (
          <div key={step} className="flex items-center">
            {/* Step dot */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm transition-all duration-500 ${
                  isDone
                    ? "border-[#FFB800] bg-[#FFB800] text-black"
                    : "border-white/20 bg-[#0D0D0D] text-[#9CA3AF]"
                } ${isCurrent ? "shadow-[0_0_12px_rgba(255,184,0,0.6)]" : ""}`}
              >
                {isCurrent ? (
                  <div className="h-2 w-2 animate-pulse rounded-full bg-black" />
                ) : isDone ? (
                  <span className="text-xs">✓</span>
                ) : (
                  <span className="text-xs">{i + 1}</span>
                )}
              </div>
              <span
                className={`mt-1 hidden text-center text-[10px] sm:block ${
                  isDone ? "text-[#FFB800]" : "text-[#9CA3AF]"
                }`}
                style={{ width: 64 }}
              >
                {ORDER_STATUS_LABELS[step]}
              </span>
            </div>

            {/* Connector line */}
            {i < ORDER_STATUS_FLOW.length - 1 && (
              <div
                className={`h-0.5 w-6 transition-all duration-700 sm:w-8 ${
                  i < currentIndex ? "bg-[#FFB800]" : "bg-white/20"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order }: { order: ReturnType<typeof useStorefront>["orders"][0] }) {
  const [expanded, setExpanded] = useState(false);
  const { advanceOrderStatus } = useStorefront();

  const isActive =
    order.status !== "delivered" && order.status !== "cancelled";

  const formattedDate = new Date(order.createdAt).toLocaleString("ar-EG", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-bl-[22px] rounded-tr-[22px] border border-white/10 bg-[#111]"
    >
      {/* Header */}
      <div className="p-5">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <span className="font-black text-[#FFB800]">{order.id}</span>
            <p className="text-xs text-[#9CA3AF]">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-2">
            {isActive && (
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#FFB800]" />
            )}
            <span
              className={`rounded-full px-3 py-1 text-xs font-black ${
                order.status === "delivered"
                  ? "bg-green-900/40 text-green-400"
                  : order.status === "cancelled"
                  ? "bg-red-900/40 text-red-400"
                  : "bg-[#FFB800]/10 text-[#FFB800]"
              }`}
            >
              {ORDER_STATUS_ICONS[order.status]}{" "}
              {ORDER_STATUS_LABELS[order.status]}
            </span>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="mb-4 overflow-x-auto pb-1">
          <StatusTimeline status={order.status} />
        </div>

        {/* Summary row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
            <span className="flex items-center gap-1">
              <Package size={14} />
              {order.items.length} منتج
            </span>
            {order.orderType === "delivery" && (
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                توصيل
              </span>
            )}
            {order.estimatedMinutes && isActive && (
              <span className="flex items-center gap-1">
                <Clock size={14} />~{order.estimatedMinutes} دقيقة
              </span>
            )}
          </div>
          <span className="font-black text-white">{currency(order.total)}</span>
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-center gap-1 border-t border-white/10 py-2.5 text-xs text-[#9CA3AF] transition hover:text-white"
      >
        {expanded ? (
          <>تصغير <ChevronUp size={14} /></>
        ) : (
          <>تفاصيل الطلب <ChevronDown size={14} /></>
        )}
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 p-5">
              {/* Items */}
              <h3 className="mb-3 text-sm font-black text-white">المنتجات</h3>
              <div className="mb-4 space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-[#D1D5DB]">
                      {item.name}{" "}
                      <span className="text-[#9CA3AF]">× {item.quantity}</span>
                    </span>
                    <span className="text-white">
                      {currency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="mb-4 space-y-1 border-t border-white/10 pt-3 text-sm">
                <div className="flex justify-between text-[#9CA3AF]">
                  <span>المجموع الفرعي</span>
                  <span>{currency(order.subtotal)}</span>
                </div>
                {order.orderType === "delivery" && (
                  <div className="flex justify-between text-[#9CA3AF]">
                    <span>رسوم التوصيل</span>
                    <span>{currency(order.deliveryFee)}</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-white">
                  <span>الإجمالي</span>
                  <span className="text-[#FFB800]">{currency(order.total)}</span>
                </div>
              </div>

              {/* Address */}
              {order.address?.street && (
                <div className="flex items-start gap-2 rounded-lg bg-white/5 p-3 text-sm">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#FFB800]" />
                  <span className="text-[#D1D5DB]">
                    {order.address.street}، {order.address.area}، {order.address.city}
                  </span>
                </div>
              )}

              {/* Demo: manual advance button (للعرض فقط) */}
              {isActive && (
                <button
                  onClick={() => advanceOrderStatus(order.id)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#FFB800]/40 py-2 text-xs text-[#FFB800]/60 transition hover:border-[#FFB800] hover:text-[#FFB800]"
                >
                  <RotateCcw size={12} />
                  تقدم الحالة (للعرض فقط)
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function OrdersPage() {
  const { orders } = useStorefront();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />
      <Navbar />

      <div className="relative z-10 mx-auto max-w-2xl px-5 pb-24 pt-32">
        <SectionTitle
          title="طلباتي"
          subtitle="تابع حالة طلباتك الحالية والسابقة"
        />

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col items-center gap-5 text-center"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-white/20 text-5xl">
              🛵
            </div>
            <div>
              <p className="text-lg font-black text-white">لا توجد طلبات بعد</p>
              <p className="mt-1 text-sm text-[#9CA3AF]">
                اطلب دلوقتي واتابع طلبك هنا
              </p>
            </div>
            <Link
              href="/menu"
              className="flex items-center gap-2 rounded-br-[22px] rounded-tl-[22px] border-2 border-white bg-[#FFB800] px-6 py-3 font-black text-black shadow-[5px_5px_0px_0px_#E11D48] transition hover:-translate-y-0.5"
            >
              <ShoppingBag size={18} />
              اطلب دلوقتي
            </Link>
          </motion.div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}