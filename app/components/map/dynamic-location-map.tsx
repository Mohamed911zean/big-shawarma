"use client";

import dynamic from "next/dynamic";

const LeafletLocationMap = dynamic(() => import("./leaflet-location-map"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[430px] place-items-center rounded-bl-[48px] rounded-tr-[48px] border-[4px] border-white bg-black font-black text-[#FFB800] shadow-[10px_10px_0_#FFB800]">
      جاري تحميل الخريطة
    </div>
  ),
});

export default LeafletLocationMap;
