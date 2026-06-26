import type { Metadata } from "next";
import { StorefrontProvider } from "@/context/storefront-context";
import { ToastProvider } from "./components/ui/toast-provider";
import {GlobalCart}  from "./components/layout/cartDrawer";
import "./globals.css";
import Navbar from "./components/layout/navbar"

export const metadata: Metadata = {
  title: "Big Shawerma | أكبر من مجرد شاورما",
  description: "منيو تفاعلي وشوكيس بصري لمطعم Big Shawerma بطابع بوب آرت سريع وجريء.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth antialiased">
      <body>
        <StorefrontProvider>
          <ToastProvider>
            <Navbar />
            {children}
            <GlobalCart/>
          </ToastProvider>
        </StorefrontProvider>
      </body>
    </html>
  );
}
