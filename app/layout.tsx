import type { Metadata } from "next";
import { StorefrontProvider } from "@/context/storefront-context";
import { ToastProvider } from "@/components/ui/toast-provider";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import BottomNav from "@/components/layout/bottom-nav";
import Footer from "@/components/layout/footer";
import { GlobalCart } from "@/components/layout/cartDrawer";
import FloatingChatbot from "@/components/ui/floating-chatbot";
import FloatingRandomizer from "@/components/ui/floating-randomizer";

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
            {/* pb-20 عشان المحتوى ميتغطاش بالـ bottom bar على موبايل */}
            <main className="min-h-screen pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            <BottomNav />
            <GlobalCart />
            <FloatingChatbot />
            <FloatingRandomizer />
          </ToastProvider>
        </StorefrontProvider>
      </body>
    </html>
  );
}