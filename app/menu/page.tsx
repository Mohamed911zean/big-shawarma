import { AmbientEnergy, PageHero, ShowcaseNav } from "../components/showcase-parts";
import MenuExperience from "../components/menu-experience";

export const metadata = {
  title: "المنيو | Big Shawerma",
  description: "منيو Big Shawerma التفاعلي للشاورما والفتة والبيتزا والصواني.",
};

export default function MenuPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-white">
      <AmbientEnergy />
      <ShowcaseNav />
      <PageHero
        eyebrow="منيو يفتح النفس"
        title="اختيارات ضخمة لكل نوع جوع"
        copy="فلترة، بحث، تفاصيل، إضافات، مفضلة، وسلة مستمرة حتى بعد تحديث الصفحة."
      />
      <MenuExperience />
    </main>
  );
}
