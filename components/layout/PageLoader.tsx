"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function PageLoader() {
  const pathname = usePathname();
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(true);
  const isFirstLoad = useRef(true);

  // ── أول تحميل ──
  useGSAP(
    () => {
      if (!loaderRef.current || !logoRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      });

      // اللوجو بيظهر
      tl.from(logoRef.current, {
        scale: 0.4,
        autoAlpha: 0,
        duration: 0.6,
        ease: "back.out(1.8)",
      })
      // نبضة خفيفة
      .to(logoRef.current, {
        scale: 1.08,
        duration: 0.18,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      })
      // النص يظهر
      .from(textRef.current, {
        y: 10,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.out",
      }, "-=0.1")
      // pause صغيرة
      .to({}, { duration: 0.5 })
      // الكرتين بيطلع لفوق
      .to(curtainRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power4.inOut",
      })
      // اللوجو يتعمل fade مع الكرتين
      .to(logoRef.current, {
        autoAlpha: 0,
        y: -20,
        duration: 0.3,
      }, "<");
    },
    { scope: loaderRef, dependencies: [] }
  );

  // ── بين الصفحات ──
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    setVisible(true);

    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    tl.fromTo(
      loaderRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.35, ease: "power3.inOut" }
    )
    .from(logoRef.current, {
      scale: 0.5,
      autoAlpha: 0,
      duration: 0.3,
      ease: "back.out(2)",
    })
    .to({}, { duration: 0.35 })
    .to(curtainRef.current, {
      yPercent: -100,
      duration: 0.5,
      ease: "power4.inOut",
    })
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0,
    });

    return () => { tl.kill(); };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
      style={{ background: "#0D0D0D" }}
    >
      {/* نقط زخرفية */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#FFB800]/5 blur-[80px]" />
        {/* خطوط pop-art */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute border-[#FFB800]/5"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              border: "1px solid rgba(255,184,0,0.06)",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* الكرتين اللي بيطلع لفوق */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#FFB800]"
        style={{ transform: "translateY(100%)" }}
      />

      {/* اللوجو */}
      <div ref={logoRef} className="relative z-10 flex flex-col items-center gap-4">
        <div className="relative">
          {/* halo صفرا خلف اللوجو */}
          <div className="absolute inset-0 -m-4 rounded-full bg-[#FFB800]/10 blur-xl" />
          <Image
            src="/navbar-logo-with-no-bg.webp"
            alt="Big Shawerma"
            width={200}
            height={90}
            className="relative h-auto w-[180px] md:w-[220px] drop-shadow-[0_8px_24px_rgba(255,184,0,0.3)]"
            priority
          />
        </div>

        {/* tagline */}
        <p
          ref={textRef}
          className="text-sm font-black tracking-[0.25em] text-[#FFB800]/60 uppercase"
        >
          Special Size Food
        </p>

        {/* loading dots */}
        <div className="flex items-center gap-2 mt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#FFB800]"
              style={{
                animation: `loaderDot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loaderDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}