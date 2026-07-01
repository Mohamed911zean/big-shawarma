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
import PageLoader from "@/components/layout/PageLoader";

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
            <PageLoader />
            <Navbar />
            <main className="min-h-screen pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            <BottomNav />
            <GlobalCart />
          </ToastProvider>
        </StorefrontProvider>
      </body>
    </html>
  );
}