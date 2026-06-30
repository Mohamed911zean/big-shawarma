import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-[#FFB800] bg-[#111] px-5 py-12 pb-28 md:pb-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row">
        
        {/* Brand */}
        <div className="flex max-w-sm flex-col items-start gap-4">
          <Link href="/">
            <Image
              src="/navbar-logo-with-no-bg.webp"
              alt="Big Shawerma"
              width={140}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          <p className="font-bold leading-relaxed text-[#9CA3AF]">
            أكبر من مجرد شاورما.. لفائف ضخمة، صوصات جريئة، ومكونات طازجة يومياً. جرب الطعم اللي هيغير مفهومك عن الشاورما.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="grid h-10 w-20 place-items-center rounded-bl-[14px] rounded-tr-[14px] bg-white/5 text-[#D1D5DB] transition hover:bg-[#FFB800] hover:text-black hover:-translate-y-1 font-bold text-sm">
              فيسبوك
            </a>
            <a href="#" className="grid h-10 w-20 place-items-center rounded-bl-[14px] rounded-tr-[14px] bg-white/5 text-[#D1D5DB] transition hover:bg-[#FFB800] hover:text-black hover:-translate-y-1 font-bold text-sm">
              انستجرام
            </a>
            <a href="#" className="grid h-10 w-20 place-items-center rounded-bl-[14px] rounded-tr-[14px] bg-white/5 text-[#D1D5DB] transition hover:bg-[#FFB800] hover:text-black hover:-translate-y-1 font-bold text-sm">
              تويتر
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col gap-3 font-bold text-[#D1D5DB]">
            <h3 className="mb-2 text-xl font-black text-white">روابط سريعة</h3>
            <Link href="/menu" className="transition hover:text-[#FFB800]">المنيو</Link>
            <Link href="/branches" className="transition hover:text-[#FFB800]">الفروع</Link>
            <Link href="/checkout" className="transition hover:text-[#FFB800]">تتبع الطلب</Link>
          </div>
          <div className="flex flex-col gap-3 font-bold text-[#D1D5DB]">
            <h3 className="mb-2 text-xl font-black text-white">المساعدة</h3>
            <Link href="#" className="transition hover:text-[#FFB800]">الشروط والأحكام</Link>
            <Link href="#" className="transition hover:text-[#FFB800]">سياسة الخصوصية</Link>
            <Link href="#" className="transition hover:text-[#FFB800]">تواصل معنا</Link>
          </div>
        </div>
      </div>
      
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-sm font-bold text-[#9CA3AF]">
        © {new Date().getFullYear()} بيج شاورما. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
