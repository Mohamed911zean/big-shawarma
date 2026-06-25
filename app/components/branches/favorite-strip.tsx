import { Heart } from "lucide-react";

export function FavoriteStrip() {
  return (
    <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-3">
      {["سندوتشات ضخمة", "صوصات جريئة", "تجهيز سريع"].map((item) => (
        <div key={item} className="flex items-center gap-3 rounded-bl-[32px] rounded-tr-[32px] border-2 border-white bg-[#151515] p-5 font-black text-white shadow-[7px_7px_0_#FFB800]">
          <Heart className="text-[#E11D48]" />
          {item}
        </div>
      ))}
    </div>
  );
}
