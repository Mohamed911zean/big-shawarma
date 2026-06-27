"use client";

import { RotateCcw, Trash2 } from "lucide-react";
import { DemoOrder, currency } from "@/data/storefront";

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (mins < 1) return "الآن";
  if (mins < 60) return `منذ ${mins} دقيقة`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  if (days === 1) return "أمس";
  return new Date(iso).toLocaleDateString("ar-EG");
}

export function OrderCard({
  order,
  onDelete,
  onReorder,
}: {
  order: DemoOrder;
  onDelete: () => void;
  onReorder: () => void;
}) {
  const itemsLabel = order.items
    .slice(0, 3)
    .map((i) => `${i.name} × ${i.quantity}`)
    .join("، ");
  const hasMore = order.items.length > 3;

  return (
    <div>
      {/* Top row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-bl-[14px] rounded-tr-[14px] bg-[#FFB800] px-4 py-1.5 text-sm font-black text-black shadow-[3px_3px_0_#E11D48]">
          {order.id}
        </span>
        <span className="text-sm font-bold text-[#9CA3AF]">{relativeTime(order.createdAt)}</span>
      </div>

      {/* Order type + location */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${
            order.orderType === "delivery"
              ? "bg-[#25D366]/20 text-[#25D366]"
              : "bg-[#FFB800]/20 text-[#FFB800]"
          }`}
        >
          {order.orderType === "delivery" ? "توصيل" : "استلام من الفرع"}
        </span>
        {order.orderType === "delivery" && order.address?.street && (
          <span className="text-sm font-bold text-[#D1D5DB]">
            {[order.address.city, order.address.area, order.address.street]
              .filter(Boolean)
              .join("، ")}
          </span>
        )}
        {order.orderType === "pickup" && order.branch && (
          <span className="text-sm font-bold text-[#D1D5DB]">{order.branch.name}</span>
        )}
      </div>

      {/* Items summary */}
      <p className="mt-3 text-sm font-bold text-[#9CA3AF]">
        {itemsLabel}
        {hasMore && ` و${order.items.length - 3} أصناف أخرى`}
      </p>

      {/* Total + actions */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <strong className="text-2xl text-[#FFB800]">{currency(order.subtotal)}</strong>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onReorder}
            className="flex items-center gap-2 rounded-bl-[18px] rounded-tr-[18px] bg-[#25D366] px-4 py-2.5 text-sm font-black text-black shadow-[3px_3px_0_#FFB800]"
          >
            <RotateCcw size={15} />
            إعادة الطلب
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-2 rounded-bl-[18px] rounded-tr-[18px] border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-black text-[#E11D48]"
          >
            <Trash2 size={15} />
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
