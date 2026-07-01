"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, MapPin, Users, ClipboardList } from "lucide-react";
import { useStorefront } from "@/context/storefront-context";

const navItems = [
  { href: "/orders",   icon: ClipboardList,   label: "طلباتي",   hasOrders: true  },
  { href: "/branches", icon: MapPin,           label: "الفروع",   hasOrders: false },
  { href: "/",         icon: Home,             label: "الرئيسية", hasOrders: false },
  { href: "/menu",     icon: UtensilsCrossed,  label: "المنيو",   hasOrders: false },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { orders } = useStorefront();

  const activeOrders = orders.filter(
    (o) => o.status !== "delivered" && o.status !== "cancelled"
  ).length;

  return (
    <nav
      dir="rtl"
      className="fixed bottom-0 inset-x-0 z-50 md:hidden
                 flex items-center justify-around
                 bg-[#111111]/95 backdrop-blur-xl
                 border-t border-white/[0.06]
                 px-2 pb-5 pt-2 z-[999]"
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
            className="flex flex-col items-center gap-1 min-w-[52px] group"
            aria-label={label}
          >
            {/* Icon Circle */}
            <div className="relative">
              <div
                className={`
                  w-11 h-11 rounded-full flex items-center justify-center
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
                    isActive ? "text-black" : "text-[#555] group-hover:text-[#888]"
                  }`}
                />
              </div>

              {/* Badge */}
              {badge && (
                <span
                  className="absolute -top-0.5 -right-0.5
                             flex h-[14px] w-[14px] items-center justify-center
                             rounded-full bg-[#E11D48]
                             border-[1.5px] border-[#111111]
                             text-[8px] font-black text-white"
                >
                  {badge}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={`text-[10px] font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-[#FFB800] font-bold"
                  : "text-[#444] group-hover:text-[#777]"
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