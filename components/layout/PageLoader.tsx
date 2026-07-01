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
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const isFirstLoad = useRef(true);

  // التحكم في السكرول لضمان ثبات الأبعاد أثناء الإنيميشن
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  // ── أول تحميل (First Load Performance Custom) ──
  useGSAP(
    () => {
      if (!loaderRef.current || !logoRef.current || !curtainRef.current || !progressBarRef.current) return;

      // تريكة الأداء: ضبط الـ GPU Layers مسبقاً قبل أي حركة
      gsap.set([loaderRef.current, curtainRef.current, logoRef.current], { 
        force3D: true, 
        z: 0.1, 
        backfaceVisibility: "hidden" 
      });
      gsap.set(curtainRef.current, { yPercent: 100 });
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      });

      // 1. ظهور اللوجو والـ Tagline بأنعم Ease ممكن (Power1) لتقليل الضغط
      tl.fromTo(
        logoRef.current,
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power1.out" }
      )
      .fromTo(
        textRef.current,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 0.6, duration: 0.3, ease: "power1.out" },
        "-=0.2"
      )
      
      // 2. الـ Progress line الفخم
      .to(progressBarRef.current, {
        scaleX: 1,
        duration: 1.0,
        ease: "power1.inOut",
      })
      
      // 3. صعود الستارة الصفراء (لون صلب صريح لسرعة الرندرة بنسبة 300%)
      .to(curtainRef.current, {
        yPercent: 0,
        duration: 0.5,
        ease: "power2.inOut", // الإيز الأقوى والأخف للأجهزة الضعيفة
      }, "+=0.1")
      
      // إخفاء المحتوى فوراً أول ما الستارة تغطيه تماماً
      .to(logoRef.current, { opacity: 0, duration: 0.15 }, "-=0.3")
      
      // 4. كشف الموقع (بدل ما نحرك عنصرين، بنحرك الـ loader الفولدر الرئيسي كله لفوق)
      // دي بتخلي المتصفح يحرك بكسل واحد كأنه صورة ثابتة
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "power2.inOut",
      });
    },
    { scope: loaderRef, dependencies: [] }
  );

  // ── الانتقال بين الصفحات (Page Transition Performance) ──
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    setVisible(true);

    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    // ريست كامل وسريع للـ Layers
    gsap.set(loaderRef.current, { yPercent: 0 });
    gsap.set(curtainRef.current, { yPercent: 100 });

    tl.to(curtainRef.current, {
      yPercent: 0,
      duration: 0.4,
      ease: "power2.inOut",
    })
    .fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.25, ease: "power1.out" }
    )
    .to({}, { duration: 0.25 }) // ثبات سريع جداً عشان المستخدم ميزهقش
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.45,
      ease: "power2.inOut",
    });

    return () => { tl.kill(); };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#0D0D0D]"
      style={{ 
        willChange: "transform",
        transform: "translate3d(0,0,0)" // تشغيل الـ Hardware Acceleration إجباريًا
      }}
    >
      {/* الستارة الذهبية الفاخرة - استخدمنا لون صلب صريح بدلاً من الـ Gradient لضمان الـ 60fps */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-20 bg-[#FFB800]"
        style={{ 
          willChange: "transform",
          transform: "translate3d(0,100%,0)"
        }}
      />

      {/* محتوى اللوجو والبروجرس بار */}
      <div 
        ref={logoRef} 
        className="relative z-10 flex flex-col items-center gap-4 opacity-0"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="relative">
          <Image
            src="/navbar-logo-with-no-bg.webp"
            alt="Big Shawerma"
            width={200}
            height={90}
            className="relative h-auto w-[150px] md:w-[190px]"
            priority
          />
        </div>

        {/* الـ Tagline الفخم */}
        <p
          ref={textRef}
          className="text-xs font-black tracking-[0.3em] text-[#FFB800] uppercase opacity-60"
        >
          Special Size Food
        </p>

        {/* خط التحميل الأفقي الـ Premium النحيف */}
        <div className="relative h-[2px] w-[100px] overflow-hidden rounded-full bg-[#FFB800]/10 mt-1">
          <div
            ref={progressBarRef}
            className="absolute inset-y-0 left-0 w-full bg-[#FFB800]"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>
    </div>
  );
}