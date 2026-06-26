"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ClipboardList, Menu } from "lucide-react";
import { Suspense } from "react";
import { useStorefront } from "../context/storefront-context";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("id") ?? "—";
  const { orders } = useStorefront();
  const order = orders.find((o) => o.id === orderId);

  const locationLabel =
    order?.orderType === "delivery"
      ? [
          order.address?.city,
          order.address?.area,
          order.address?.street,
        ]
          .filter(Boolean)
          .join("، ")
      : order?.branch?.name
      ? `استلام من ${order.branch.name}`
      : null;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 18 } },
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#0D0D0D] px-5 py-16 text-white">
      {/* Subtle ambient blob */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20 blur-[180px]"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, #FFB800 0%, transparent 60%), radial-gradient(circle at 30% 70%, #25D366 0%, transparent 55%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-lg flex-col items-center text-center"
      >
        {/* Logo */}
        <motion.div variants={item}>
          <Image
            src="/navbar-logo-with-no-bg.webp"
            alt="Big Shawerma"
            width={120}
            height={54}
            className="mb-8 h-12 w-auto"
          />
        </motion.div>

        {/* Animated checkmark */}
        <motion.div variants={item}>
          <motion.div
            initial={{ scale: 0.4, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 200 }}
            className="grid h-24 w-24 place-items-center rounded-full border-4 border-[#25D366] bg-[#25D366]/15 shadow-[0_0_40px_#25D366]"
          >
            <CheckCircle size={52} className="text-[#25D366]" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={item} className="mt-6 text-4xl font-black sm:text-5xl">
          تم استلام طلبك! 🎉
        </motion.h1>

        {/* Order ID */}
        <motion.div
          variants={item}
          className="mt-5 rounded-bl-[24px] rounded-tr-[24px] border-2 border-[#FFB800] bg-[#111] px-6 py-4 shadow-[6px_6px_0_#FFB800]"
        >
          <p className="text-sm font-black text-[#9CA3AF]">رقم طلبك</p>
          <p className="mt-1 text-3xl font-black text-[#FFB800]">{orderId}</p>
        </motion.div>

        {/* Location summary */}
        {locationLabel && (
          <motion.p
            variants={item}
            className="mt-5 max-w-xs text-lg font-bold leading-8 text-[#D1D5DB]"
          >
            {order?.orderType === "delivery"
              ? `سيتم التوصيل إلى: ${locationLabel}`
              : locationLabel}
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div variants={item} className="mt-8 flex w-full flex-col gap-3">
          <Link
            href="/order-history"
            className="flex items-center justify-center gap-2 rounded-bl-[26px] rounded-tr-[26px] bg-[#25D366] px-6 py-4 text-lg font-black text-black shadow-[6px_6px_0_#FFB800]"
          >
            <ClipboardList size={20} />
            تتبع طلبي
          </Link>
          <Link
            href="/menu"
            className="flex items-center justify-center gap-2 rounded-bl-[26px] rounded-tr-[26px] border-2 border-white/20 bg-white/5 px-6 py-4 text-lg font-black text-white"
          >
            <Menu size={20} />
            ارجع للمنيو
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={item}
          className="mt-8 max-w-xs text-sm font-bold leading-7 text-[#9CA3AF]"
        >
          تم حفظ الطلب على جهازك — يمكنك مراجعته في صفحة <strong className="text-white">طلباتي</strong>
        </motion.p>
      </motion.div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0D0D0D]">
          <div className="rounded-bl-[28px] rounded-tr-[28px] border-2 border-[#FFB800] bg-[#111] px-8 py-6 text-2xl font-black text-[#FFB800] shadow-[6px_6px_0_#E11D48]">
            جاري التحميل...
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}