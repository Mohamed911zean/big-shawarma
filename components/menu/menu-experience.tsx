"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

import { useStorefront } from "@/context/storefront-context";
import { useToast } from "@/components/ui/toast-provider";
import { MenuItem, currency, groupedMenu, menuItems } from "@/data/storefront";
import { ProductModal } from "./product-modal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const carouselItems: MenuItem[] = menuItems.slice(0, 10);

// ── Card component مستقل عشان نعيد استخدامه في الـ slide ──
function CarouselCard({
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

  const isOdd = index % 2 !== 0;

  return (
    <article
      className={`group relative h-full rounded-br-xl rounded-tl-xl border-2 border-white bg-[#151515] p-5 transition duration-300 ${
        isOdd
          ? "rounded-bl-[44px] rounded-tr-[20px] shadow-[7px_7px_0_#FFB800]"
          : "rounded-bl-[20px] rounded-tr-[44px] shadow-[7px_7px_0_#E11D48]"
      }`}
    >
      {/* Wishlist */}
      <button
        type="button"
        onClick={onToggleWishlist}
        aria-label="إضافة للمفضلة"
        className={`absolute left-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 transition ${
          isWishlisted ? "bg-[#E11D48] text-white" : "bg-black text-[#FFB800]"
        }`}
      >
        <Heart size={19} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      {/* Image */}
      <div className="mb-5 grid h-28 place-items-center rounded-bl-[34px] rounded-tr-[34px] bg-[#FFB800]">
        <Image
          src="/hero-section-cool-img-with-no-bg.png"
          alt={item.name}
          width={176}
          height={150}
          className="h-32 w-auto -translate-y-3 object-contain transition duration-300 group-hover:-translate-y-6"
        />
      </div>

      {/* Category */}
      <p className="mb-2 text-sm font-black text-[#FFB800]">{item.category}</p>

      {/* Name */}
      <h3 className="text-2xl font-black leading-snug text-white">{item.name}</h3>

      {/* Description */}
      <p className="mt-3 min-h-[5rem] text-base font-bold leading-7 text-[#9CA3AF]">
        {item.description}
      </p>

      {/* Details + Price */}
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

      {/* Add to cart */}
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

// ── Main component ──
export default function MenuCarousel() {
  const { wishlist, cartCount, subtotal, addToCart, toggleWishlist } = useStorefront();
  const router = useRouter();
  const { showToast } = useToast();

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["تومية إكسترا"]);

  useGSAP(
    () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      })
        .from(headingRef.current, {
          y: 40,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(".bs-swiper-wrapper", {
          y: 50,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
        }, "-=0.3");
    },
    { scope: sectionRef }
  );

  function handleAddToCart(item: MenuItem, options: string[] = []) {
    addToCart(item, options);
    showToast(`تمت إضافة ${item.name}`, "cart", "🛒");
  }

  function handleToggleWishlist(item: MenuItem) {
    const isIn = wishlist.some((e) => e.id === item.id);
    toggleWishlist(item);
    showToast(
      isIn ? `تم حذف ${item.name} من المفضلة` : `تمت إضافة ${item.name} للمفضلة`,
      "wishlist",
      isIn ? "💔" : "❤️"
    );
  }

  function openDetails(item: MenuItem) {
    setSelectedItem(item);
    setSelectedOptions(["تومية إكسترا"]);
  }

  return (
    <section ref={sectionRef} className="relative z-10 overflow-hidden py-20 md:py-28 bg-[#0D0D0D]">
      <style>{`
        /* Pagination */
        .bs-mob-swiper .swiper-pagination-bullet,
        .bs-desk-pagination .swiper-pagination-bullet {
          background: rgba(255,255,255,0.25) !important;
          opacity: 1 !important;
          transition: all .3s ease;
          width: 8px;
          height: 8px;
        }
        .bs-mob-swiper .swiper-pagination-bullet-active,
        .bs-desk-pagination .swiper-pagination-bullet-active {
          background: #FFB800 !important;
          width: 28px !important;
          border-radius: 999px !important;
        }

        /* Desktop creative */
        .bs-desk-swiper {
          width: 360px;
          height: 560px;
          overflow: visible !important;
        }
        .bs-desk-slide {
          height: 100%;
        }

        /* Mobile */
        .bs-mob-swiper {
          width: 100%;
          padding-bottom: 56px !important;
          overflow: visible !important;
        }
        .bs-mob-slide {
          height: auto !important;
        }
      `}</style>

      {/* HEADER */}
      <div ref={headingRef} className="mx-auto mb-14 max-w-7xl px-5 md:px-8 text-center">
        <p className="mb-4 inline-flex rounded-br-[18px] rounded-tl-[18px] border-2 border-[#FFB800] bg-[#111] px-4 py-2 text-sm font-black text-[#FFB800]">
          اختار طلبك
        </p>
        <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
          الأكثر طلباً
          <span className="block text-[#FFB800]">دلوقتي 🔥</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#666]">
          أشهر أصناف بيج شاورما — اختار وابدأ طلبك في ثانية
        </p>
      </div>

      <div className="bs-swiper-wrapper">

        {/* ===== DESKTOP ===== */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <Swiper
            modules={[EffectCreative, Pagination, Autoplay]}
            effect="creative"
            loop
            speed={800}
            grabCursor
            dir="rtl"
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            creativeEffect={{
              limitProgress: 3,
              prev: {
                shadow: true,
                translate: ["-118%", 0, -300],
                rotate: [0, 0, -7],
                scale: 0.88,
              },
              next: {
                shadow: true,
                translate: ["118%", 0, -300],
                rotate: [0, 0, 7],
                scale: 0.88,
              },
            }}
            pagination={{ el: ".bs-desk-pagination", clickable: true }}
            className="bs-desk-swiper"
          >
            {carouselItems.map((item, index) => (
              <SwiperSlide key={item.id} className="bs-desk-slide">
                <CarouselCard
                  item={item}
                  index={index}
                  isWishlisted={wishlist.some((e) => e.id === item.id)}
                  onAddToCart={() => handleAddToCart(item)}
                  onToggleWishlist={() => handleToggleWishlist(item)}
                  onOpenDetails={() => openDetails(item)}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Desktop Controls */}
          <div className="mt-12 flex items-center gap-8">
            <button className="bs-desk-prev flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#111] text-white transition hover:border-[#FFB800] hover:text-[#FFB800] hover:-translate-x-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="bs-desk-pagination flex items-center gap-1" />
            <button className="bs-desk-next flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#111] text-white transition hover:border-[#FFB800] hover:text-[#FFB800] hover:translate-x-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <Link
            href="/menu"
            className="mt-8 inline-flex items-center gap-2 rounded-bl-[18px] rounded-tr-[18px] bg-[#FFB800] px-6 py-3 font-black text-black shadow-[4px_4px_0_#E11D48] transition hover:-translate-y-0.5"
          >
            عرض المنيو كامل — {menuItems.length} صنف ←
          </Link>
        </div>

        {/* ===== MOBILE ===== */}
        <div className="md:hidden px-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            centeredSlides
            slidesPerView={1.08}
            spaceBetween={16}
            loop
            dir="rtl"
            autoplay={{ delay: 3500 }}
            pagination={{ clickable: true }}
            className="bs-mob-swiper"
          >
            {carouselItems.map((item, index) => (
              <SwiperSlide key={item.id} className="bs-mob-slide">
                <CarouselCard
                  item={item}
                  index={index}
                  isWishlisted={wishlist.some((e) => e.id === item.id)}
                  onAddToCart={() => handleAddToCart(item)}
                  onToggleWishlist={() => handleToggleWishlist(item)}
                  onOpenDetails={() => openDetails(item)}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-4 flex justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-bl-[16px] rounded-tr-[16px] bg-[#FFB800] px-6 py-3 font-black text-black shadow-[4px_4px_0_#E11D48]"
            >
              المنيو كامل ←
            </Link>
          </div>
        </div>

      </div>

      {/* Sticky checkout bar */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="fixed inset-x-0 bottom-[76px] z-40 px-4 md:bottom-4 lg:hidden"
          >
            <Link
              href="/checkout"
              className="flex w-full items-center justify-between rounded-bl-[24px] rounded-tr-[24px] bg-[#25D366] px-5 py-4 font-black text-black shadow-[5px_5px_0_#FFB800]"
            >
              <span>إكمال الطلب</span>
              <span className="flex items-center gap-2">
                <span>{currency(subtotal)}</span>
                <span className="rounded-full bg-black px-2 py-0.5 text-sm text-white">{cartCount}</span>
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <ProductModal
        item={selectedItem}
        options={selectedOptions}
        setOptions={setSelectedOptions}
        onClose={() => setSelectedItem(null)}
        onAdd={(item) => {
          handleAddToCart(item, selectedOptions);
          setSelectedItem(null);
          router.push("/checkout");
        }}
      />
    </section>
  );
}