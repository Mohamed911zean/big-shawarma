"use client";

import { useState } from "react";
import { Bike, ChefHat, Clock3, Navigation, Phone } from "lucide-react";
import { branches } from "../../data/storefront";
import LeafletLocationMap from "../map/dynamic-location-map";

export function BranchMap() {
  const [activeBranchId, setActiveBranchId] = useState(branches[0].id);
  const activeBranch = branches.find((branch) => branch.id === activeBranchId) ?? branches[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
      <LeafletLocationMap
        mode="branches"
        selectedLocation={null}
        onLocationChange={() => undefined}
        selectedBranchId={activeBranchId}
        onBranchSelect={setActiveBranchId}
      />
      <div className="rounded-bl-[48px] rounded-tr-[48px] border-[4px] border-white bg-[#FFB800] p-6 text-black shadow-[10px_10px_0_#E11D48]">
        <p className="mb-3 inline-flex rounded-br-[16px] rounded-tl-[16px] bg-black px-4 py-2 text-sm font-black text-[#FFB800]">{activeBranch.area}</p>
        <h3 className="text-4xl font-black">{activeBranch.name}</h3>
        <p className="mt-5 flex items-center gap-3 text-lg font-black"><Clock3 size={18}/> {activeBranch.hours}</p>
        <p className="mt-4 flex items-center gap-3 text-lg font-bold"><Navigation size={18} /> {activeBranch.address}</p>
        <p className="mt-4 flex items-center gap-3 text-lg font-bold"><ChefHat size={18} /> {activeBranch.delivery}</p>
        <div className="mt-8 grid gap-3">
          <a href={`tel:${activeBranch.phone}`} className="flex items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#111] px-5 py-4 font-black text-white shadow-[5px_5px_0_#E11D48]"><Phone size={18} /> اتصال فوري</a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${activeBranch.position[0]},${activeBranch.position[1]}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#25D366] px-5 py-4 font-black text-black shadow-[5px_5px_0_#111]"><Bike size={18} /> افتح الاتجاهات</a>
        </div>
      </div>
    </div>
  );
}
