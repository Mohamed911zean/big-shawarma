"use client";

import { motion } from "framer-motion";

export function AmbientEnergy() {
  const blobs = [
    { color: "#E11D48", className: "right-[-12rem] top-24 h-80 w-80" },
    { color: "#FFB800", className: "left-[-10rem] top-[34rem] h-96 w-96" },
    { color: "#FFB800", className: "bottom-40 right-1/4 h-72 w-72" },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {blobs.map((blob, index) => (
        <motion.div
          key={blob.className}
          animate={{ x: [0, index % 2 ? 60 : -50, 0], y: [0, index % 2 ? -40 : 45, 0] }}
          transition={{ duration: 10 + index * 3, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute rounded-full opacity-25 blur-[140px] ${blob.className}`}
          style={{ backgroundColor: blob.color }}
        />
      ))}
    </div>
  );
}
