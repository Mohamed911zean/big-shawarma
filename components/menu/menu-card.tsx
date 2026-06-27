"use client";

import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import { MenuItem, currency } from "@/data/storefront";

export function MenuCard({
  item,
  index,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onOpenDetails,
}: {
  item: MenuItem;
  index: number;
  isWishlisted: boolean;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onOpenDetails: () => void;
}) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article
      className={`group relative rounded-br-xl rounded-tl-xl border-2 border-white bg-[#151515] p-5 transition duration-300 hover:scale-[1.03] ${
        index % 2
          ? "rounded-bl-[44px] rounded-tr-[20px] shadow-[7px_7px_0_#FFB800] hover:rotate-2"
          : "rounded-bl-[20px] rounded-tr-[44px] shadow-[7px_7px_0_#E11D48] hover:-rotate-2"
      }`}
    >
      <button
        type="button"
        onClick={onToggleWishlist}
        aria-label="إضافة للمفضلة"
        className={`absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 ${
          isWishlisted ? "bg-[#E11D48] text-white" : "bg-black text-[#FFB800]"
        }`}
      >
        <Heart size={19} fill={isWishlisted ? "currentColor" : "none"} />
      </button>
      <div className="mb-5 grid h-28 place-items-center rounded-bl-[34px] rounded-tr-[34px] bg-[#FFB800]">
        <Image
          src="/hero-section-cool-img-with-no-bg.png"
          alt=""
          width={176}
          height={150}
          className="h-32 w-auto -translate-y-3 object-contain transition duration-300 group-hover:-translate-y-6"
        />
      </div>
      <p className="mb-2 text-sm font-black text-[#FFB800]">{item.category}</p>
      <h3 className="text-2xl font-black leading-snug text-white">{item.name}</h3>
      <p className="mt-3 min-h-20 text-base font-bold leading-7 text-[#9CA3AF]">{item.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onOpenDetails}
          className="rounded-br-[18px] rounded-tl-[18px] border border-white/20 px-4 py-2 text-sm font-black text-[#FFB800] transition hover:bg-white hover:text-black"
        >
          تفاصيل
        </button>
        <strong className="text-2xl text-[#FFB800]">{currency(item.price)}</strong>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-bl-[24px] rounded-tr-[24px] px-5 py-3 font-black shadow-[5px_5px_0_#FFB800] transition hover:-translate-y-1 ${
          added ? "bg-[#25D366] text-black" : "bg-[#E11D48] text-white"
        }`}
      >
        <Plus size={19} />
        {added ? "✓ تمت الإضافة" : "إضافة للطلب"}
      </button>
    </article>
  );
}
