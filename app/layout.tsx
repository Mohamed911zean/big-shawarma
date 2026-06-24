import type { Metadata } from "next";
import { StorefrontProvider } from "./context/storefront-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Big Shawerma | أكبر من مجرد شاورما",
  description: "منيو تفاعلي وشوكيس بصري لمطعم Big Shawerma بطابع بوب آرت سريع وجريء.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth antialiased">
      <body>
        <StorefrontProvider>{children}</StorefrontProvider>
      </body>
    </html>
  );
}
