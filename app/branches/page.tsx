import { AmbientEnergy } from "@/components/layout/ambient-energy";
import { PageHero } from "@/components/layout/page-hero";
import Navbar from "@/components/layout/navbar";
import { BranchMap } from "@/components/ui/branch-map";
import { FavoriteStrip } from "@/components/ui/favorite-strip";

export const metadata = {
  title: "الفروع | Big Shawerma",
  description: "خريطة فروع Big Shawerma ومعلومات الاتصال ومواعيد العمل.",
};

export default function BranchesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />
      <Navbar />
      <PageHero
        eyebrow="فروع شغالة بإيقاع سريع"
        title="اختار أقرب نقطة وانطلق على ريحة الشاورما"
        copy="خريطة تفاعلية بفروع Big Shawerma، مواعيد العمل، مناطق التوصيل، واتصال مباشر بالفرع."
      />
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <BranchMap />
        <FavoriteStrip />
      </section>
    </main>
  );
}
