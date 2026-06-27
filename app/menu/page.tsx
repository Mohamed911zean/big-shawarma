import { AmbientEnergy } from "@/components/layout/ambient-energy";
import { PageHero } from "@/components/layout/page-hero";
import Navbar from "@/components/layout/navbar";
import MenuExperience from "@/components/menu/menu-experience";

export const metadata = {
  title: "المنيو | Big Shawerma",
  description: "منيو Big Shawerma التفاعلي للشاورما والفتة والبيتزا والصواني.",
};

export default function MenuPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />
      <Navbar />
      <PageHero
        eyebrow="منيو يفتح النفس"
        title="اختيارات ضخمة لكل نوع جوع"
        copy="فلترة، بحث، تفاصيل، إضافات، مفضلة، وسلة مستمرة حتى بعد تحديث الصفحة."
      />
      <MenuExperience />
    </main>
  );
}
