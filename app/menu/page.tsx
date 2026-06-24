import Image from "next/image";
import { Plus, Star } from "lucide-react";
import { AmbientEnergy, PageHero, ShowcaseNav } from "../components/showcase-parts";

const featured = [
  ["شاورما تنور دجاج", "خبز ساخن، دجاج متبل، تومية كثيفة، ومخلل مقرمش.", "110 جنيه"],
  ["فتة شاورما لحم", "أرز وعيش محمص وطبقات لحم بصوص طحينة غني.", "155 جنيه"],
  ["صينية بيج العملاقة", "وليمة مشاركة للصحاب والعائلة مع مشويات وأرز وسلطات.", "3800 جنيه"],
  ["بيتزا شاورما فراخ", "عجينة هشة، موتزاريلا، وصوص خاص مع شاورما دجاج.", "255 جنيه"],
  ["كتف ضاني مدخن", "كتف مطهي ببطء مع أرز فاخر وصوص دقوس.", "1245 جنيه"],
  ["حواوشي بيج إكسترا", "رغيف بلدي محشو بلحم حار ومحمص بالزبدة.", "130 جنيه"],
];

export const metadata = {
  title: "المنيو | Big Shawerma",
  description: "مختارات منيو Big Shawerma للشاورما والفتة والبيتزا والصواني.",
};

export default function MenuPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />
      <ShowcaseNav />
      <PageHero
        eyebrow="منيو يفتح النفس"
        title="اختيارات ضخمة لكل نوع جوع"
        copy="صفحة مختصرة لأقوى الأصناف، أما المنيو التفاعلي الكامل موجود في الصفحة الرئيسية مع الفلاتر والسلة."
      />
      <section className="relative z-10 mx-auto grid max-w-7xl gap-7 px-5 pb-24 md:grid-cols-2 md:px-8 xl:grid-cols-3">
        {featured.map(([name, copy, price], index) => (
          <article key={name} className={`group rounded-br-xl rounded-tl-xl border-2 border-white bg-[#151515] p-5 transition duration-300 hover:scale-[1.03] ${index % 2 ? "rounded-bl-[44px] rounded-tr-[20px] shadow-[7px_7px_0_#FFB800]" : "rounded-bl-[20px] rounded-tr-[44px] shadow-[7px_7px_0_#E11D48]"}`}>
            <div className="mb-5 grid h-32 place-items-center rounded-bl-[34px] rounded-tr-[34px] bg-[#FFB800]">
              <Image src="/hero-section-cool-img-with-no-bg.png" alt="" width={176} height={150} className="h-36 w-auto -translate-y-4 object-contain transition duration-300 group-hover:-translate-y-7" />
            </div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-br-[16px] rounded-tl-[16px] bg-black px-3 py-2 text-sm font-black text-[#FFB800]"><Star size={16} /> ترشيح بيج</p>
            <h2 className="text-3xl font-black">{name}</h2>
            <p className="mt-3 min-h-20 text-lg font-bold leading-8 text-[#9CA3AF]">{copy}</p>
            <div className="mt-5 flex items-center justify-between">
              <strong className="text-3xl text-[#FFB800]">{price}</strong>
              <button className="flex items-center gap-2 rounded-bl-[20px] rounded-tr-[20px] bg-[#E11D48] px-4 py-3 font-black shadow-[5px_5px_0_#FFB800]"><Plus size={18} /> أضف</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
