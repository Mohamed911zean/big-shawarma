"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  UtensilsCrossed,
  MapPin,
  ClipboardList,
} from "lucide-react";
import { useStorefront } from "@/context/storefront-context";

const navItems = [
  { href: "/orders", label: "طلباتي", icon: ClipboardList, hasOrders: true },
  { href: "/branches", label: "الفروع", icon: MapPin, hasOrders: false },
  { href: "/", label: "الرئيسية", icon: Home, hasOrders: false },
  { href: "/menu", label: "المنيو", icon: UtensilsCrossed, hasOrders: false },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { orders } = useStorefront();

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 20) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY) {
        // المستخدم بينزل
        setShowNav(false);
      } else {
        // المستخدم بيطلع
        setShowNav(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeOrders = orders.filter(
    (o) => o.status !== "delivered" && o.status !== "cancelled"
  ).length;

  return (
    <nav
      dir="rtl"
      className={`
        fixed inset-x-0 bottom-0 z-[999] md:hidden
        flex items-center justify-around
        bg-[#111111]/95 backdrop-blur-xl
        border-t border-white/[0.06]
        px-2 pt-2 pb-5
        transition-transform duration-300 ease-in-out
        ${showNav ? "translate-y-0" : "translate-y-full"}
      `}
    >
      {navItems.map(({ href, icon: Icon, label, hasOrders }) => {
        const isActive =
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(href + "/");

        const badge = hasOrders && activeOrders > 0 ? activeOrders : null;

        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className="group flex min-w-[52px] flex-col items-center gap-1"
          >
            {/* Icon */}
            <div className="relative">
              <div
                className={`
                  flex h-11 w-11 items-center justify-center rounded-full
                  transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "bg-[#FFB800] shadow-[0_4px_20px_rgba(255,184,0,0.4)] -translate-y-1"
                      : "bg-transparent group-hover:bg-white/[0.05]"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-black"
                      : "text-[#555] group-hover:text-[#888]"
                  }`}
                />
              </div>

              {badge && (
                <span
                  className="
                    absolute -top-0.5 -right-0.5
                    flex h-[14px] w-[14px]
                    items-center justify-center
                    rounded-full
                    border-[1.5px] border-[#111111]
                    bg-[#E11D48]
                    text-[8px] font-black text-white
                  "
                >
                  {badge}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={`text-[10px] transition-colors duration-200 ${
                isActive
                  ? "font-bold text-[#FFB800]"
                  : "font-semibold text-[#444] group-hover:text-[#777]"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}