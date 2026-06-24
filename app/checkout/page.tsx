import { Check, Store, Truck } from "lucide-react";
import { AmbientEnergy, PageHero, ShowcaseNav } from "../components/showcase-parts";

export const metadata = {
  title: "تأكيد الطلب | Big Shawerma",
  description: "نموذج طلب مختصر لتوصيل أو استلام Big Shawerma.",
};

export default function CheckoutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />
      <ShowcaseNav />
      <PageHero
        eyebrow="طلب سريع"
        title="بيانات واضحة وطلبك جاهز للتحرك"
        copy="اختار طريقة الاستلام، اكتب بيانات التواصل، وسيتم تجهيز رسالة واتساب منظمة للفرع."
      />
      <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 pb-24 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-bl-[48px] rounded-tr-[48px] border-[4px] border-white bg-[#FFB800] p-7 text-black shadow-[10px_10px_0_#E11D48]">
          <h2 className="text-4xl font-black leading-tight">الخطوة الأخيرة قبل السخونة</h2>
          <p className="mt-5 text-lg font-bold leading-8">النموذج مصمم للطلبات السريعة: رقم واضح، عنوان مختصر، ونوع الطلب بدون تعقيد.</p>
          <div className="mt-8 grid gap-4">
            {["تأكيد عبر واتساب", "تجهيز فوري في الفرع", "متابعة اتصال عند الحاجة"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-bl-[22px] rounded-tr-[22px] border-2 border-black bg-white p-4 font-black shadow-[4px_4px_0_#111]">
                <Check />
                {item}
              </div>
            ))}
          </div>
        </aside>
        <form className="grid gap-4 rounded-bl-[54px] rounded-tr-[54px] border-[4px] border-white bg-[#111] p-6 shadow-[10px_10px_0_#FFB800]">
          <div className="grid grid-cols-2 gap-3">
            {["توصيل", "استلام من الفرع"].map((type) => (
              <label key={type} className="flex min-h-16 items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-white/5 p-4 font-black">
                <input name="orderType" type="radio" className="accent-[#FFB800]" defaultChecked={type === "توصيل"} />
                {type === "توصيل" ? <Truck size={18} /> : <Store size={18} />}
                {type}
              </label>
            ))}
          </div>
          <input placeholder="الاسم" className="rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-white/5 px-5 py-4 font-bold outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]" />
          <input placeholder="رقم الموبايل" className="rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-white/5 px-5 py-4 font-bold outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]" />
          <input placeholder="العنوان أو الفرع المفضل" className="rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-white/5 px-5 py-4 font-bold outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]" />
          <textarea placeholder="تفاصيل الطلب والملاحظات" rows={5} className="resize-none rounded-bl-[22px] rounded-tr-[22px] border border-white/15 bg-white/5 px-5 py-4 font-bold outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB800]" />
          <button className="flex items-center justify-center gap-2 rounded-bl-[28px] rounded-tr-[28px] bg-[#25D366] px-5 py-4 text-lg font-black text-black shadow-[6px_6px_0_#FFB800]">
            <Check />
            تأكيد الطلب وإرسال عبر واتساب
          </button>
        </form>
      </section>
    </main>
  );
}
