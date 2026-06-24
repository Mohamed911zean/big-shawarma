import { Flame, LucideIcon, Sparkles, Store } from "lucide-react";
import { AmbientEnergy, PageHero, ShowcaseNav } from "../components/showcase-parts";

const timeline = [
  { year: "2018", title: "بداية بصوت عالي", copy: "عربة صغيرة، لفائف كبيرة، وصف انتظار يثبت أن الخلطة مختلفة." },
  { year: "2020", title: "مطبخ إنتاج سريع", copy: "تجهيزات أوسع، سيخ يدور طول اليوم، ونظام يخدم الجوع وقت الذروة." },
  { year: "2023", title: "هوية بيج", copy: "شخصية بوب آرت جريئة، منيو أضخم، وتجربة طلب تشبه طاقة الشارع." },
  { year: "اليوم", title: "فروع تتحرك", copy: "طلبات عالية الحجم، فروع متعددة، وصوصات يومية لا تهدأ." },
];

const principles: { Icon: LucideIcon; title: string; copy: string }[] = [
  { Icon: Flame, title: "نكهة قوية", copy: "تتبيلة واضحة وصوصات مصممة لتفضل في الذاكرة." },
  { Icon: Store, title: "تشغيل عالي", copy: "مطبخ يتحمل الطلبات المتراكمة بدون فقدان جودة." },
  { Icon: Sparkles, title: "تجربة مرئية", copy: "ألوان حادة، صور كبيرة، وحضور لا يشبه مطعم تقليدي." },
];

export const metadata = {
  title: "حكايتنا | Big Shawerma",
  description: "قصة Big Shawerma من عربة شارع إلى علامة شاورما عالية الطاقة.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />
      <ShowcaseNav />
      <PageHero
        eyebrow="حكاية بيج"
        title="من سيخ مشتعل إلى علامة شارع لا تهدأ"
        copy="القصة ليست عن وجبة فقط، بل عن سرعة، صوت، حجم، وخلطة صنعت ذاكرة جوع كاملة."
      />
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="grid gap-6 md:grid-cols-4">
          {timeline.map((beat, index) => (
            <article key={beat.year} className={`rounded-br-xl rounded-tl-xl border-2 border-white bg-[#151515] p-6 shadow-[8px_8px_0_#FFB800] ${index % 2 ? "md:translate-y-10 shadow-[8px_8px_0_#E11D48]" : ""}`}>
              <strong className="text-5xl font-black text-[#FFB800]">{beat.year}</strong>
              <h2 className="mt-5 text-2xl font-black">{beat.title}</h2>
              <p className="mt-4 text-lg font-bold leading-8 text-[#D1D5DB]">{beat.copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {principles.map(({ Icon, title, copy }) => (
            <div key={title} className="rounded-bl-[36px] rounded-tr-[36px] border-2 border-white bg-[#FFB800] p-6 text-black shadow-[8px_8px_0_#E11D48]">
              <Icon size={34} />
              <h3 className="mt-5 text-3xl font-black">{title}</h3>
              <p className="mt-3 text-lg font-bold leading-8">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
