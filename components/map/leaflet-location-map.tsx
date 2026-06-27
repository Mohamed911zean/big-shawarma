"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { LocateFixed, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
import { Branch, LocationPoint, branches } from "@/data/storefront";

type LocationMapProps = {
  selectedLocation: LocationPoint | null;
  onLocationChange: (location: LocationPoint) => void;
  selectedBranchId?: string;
  onBranchSelect?: (branchId: string) => void;
  mode?: "delivery" | "branches";
};

const center: [number, number] = [30.0444, 31.2357];

function makeIcon(color: string, label: string) {
  return L.divIcon({
    className: "",
    html: `<div class="bs-map-pin" style="--pin-color:${color}"><span>${label}</span></div>`,
    iconSize: [46, 54],
    iconAnchor: [23, 50],
  });
}

const branchIcon = makeIcon("#FFB800", "B");
const activeBranchIcon = makeIcon("#E11D48", "B");
const customerIcon = makeIcon("#25D366", "م");

function ClickCapture({ onLocationChange }: { onLocationChange: (location: LocationPoint) => void }) {
  useMapEvents({
    click(event) {
      onLocationChange({ lat: event.latlng.lat, lng: event.latlng.lng, source: "map" });
    },
  });
  return null;
}

export default function LeafletLocationMap({ selectedLocation, onLocationChange, selectedBranchId, onBranchSelect, mode = "delivery" }: LocationMapProps) {
  const [gpsStatus, setGpsStatus] = useState<"idle" | "loading" | "error">("idle");
  const selectedPosition = useMemo<[number, number] | null>(() => (selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : null), [selectedLocation]);

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  function useGps() {
    if (!navigator.geolocation) {
      setGpsStatus("error");
      return;
    }
    setGpsStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsStatus("idle");
        onLocationChange({ lat: position.coords.latitude, lng: position.coords.longitude, source: "gps" });
      },
      () => setGpsStatus("error"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div className="relative overflow-hidden rounded-bl-[48px] rounded-tr-[48px] border-[4px] border-white bg-black shadow-[10px_10px_0_#FFB800]">
      <div className="absolute right-4 top-4 z-[500] max-w-[calc(100%-2rem)] rounded-bl-[24px] rounded-tr-[24px] border-2 border-black bg-[#FFB800] px-4 py-3 text-sm font-black text-black shadow-[5px_5px_0_#E11D48]">
        {mode === "delivery" ? "اضغط على الخريطة لتحديد مكانك أو استخدم GPS" : "اضغط على فرع لعرض بياناته"}
      </div>
      {mode === "delivery" && (
        <button
          type="button"
          onClick={useGps}
          className="absolute bottom-4 right-4 z-[500] flex items-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-[#25D366] px-4 py-3 font-black text-black shadow-[5px_5px_0_#111]"
        >
          <LocateFixed size={19} />
          {gpsStatus === "loading" ? "جاري تحديد موقعك" : "استخدم GPS"}
        </button>
      )}
      {gpsStatus === "error" && (
        <div className="absolute bottom-20 right-4 z-[500] rounded-bl-[20px] rounded-tr-[20px] bg-[#E11D48] px-4 py-3 text-sm font-black text-white shadow-[4px_4px_0_#111]">
          لم نتمكن من قراءة GPS. حدد مكانك يدوياً على الخريطة.
        </div>
      )}
      <MapContainer center={selectedPosition ?? center} zoom={selectedPosition ? 15 : 10} scrollWheelZoom className="h-[430px] w-full">
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickCapture onLocationChange={onLocationChange} />
        {branches.map((branch: Branch) => (
          <Marker
            key={branch.id}
            position={branch.position}
            icon={branch.id === selectedBranchId ? activeBranchIcon : branchIcon}
            eventHandlers={{ click: () => onBranchSelect?.(branch.id) }}
          >
            <Tooltip direction="top" offset={[0, -38]} opacity={1} permanent={branch.id === selectedBranchId}>
              {branch.name}
            </Tooltip>
          </Marker>
        ))}
        {selectedPosition && (
          <Marker position={selectedPosition} icon={customerIcon}>
            <Tooltip direction="top" offset={[0, -38]} opacity={1} permanent>
              موقع العميل
            </Tooltip>
          </Marker>
        )}
      </MapContainer>
      <div className="absolute left-4 bottom-4 z-[500] hidden items-center gap-2 rounded-bl-[22px] rounded-tr-[22px] bg-black/85 px-4 py-3 text-sm font-black text-white shadow-[4px_4px_0_#FFB800] md:flex">
        <MapPin className="text-[#FFB800]" size={18} />
        خريطة فعلية بتصميم بيج
      </div>
    </div>
  );
}
