"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLanguage } from "./LanguageProvider";

// ─── Marquee brand text di background ───────────────
function BrandMarquee() {
  const text = "AINURA® ";
  const repeated = text.repeat(10);

  return (
    <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none z-0">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap"
        style={{
          fontSize: "clamp(80px, 14vw, 160px)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.07)",
          lineHeight: 1,
        }}
      >
        {/* Duplikat 2x supaya seamless */}
        <span>{repeated}</span>
        <span>{repeated}</span>
      </motion.div>
    </div>
  );
}

// ─── Tilt Card ───────────────────────────────────────
function TiltCard({ isID }: { isID: boolean }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const springConfig = { stiffness: 95, damping: 16, mass: 0.7 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  // Gerak lebih bebas tapi tetap dibatasi
  const rotateY = useTransform(springX, [-1, 1], [-14, 14]);
  const rotateX = useTransform(springY, [-1, 1], [10, -10]);
  const translateX = useTransform(springX, [-1, 1], [-120, 120]);
  const translateY = useTransform(springY, [-1, 1], [-60, 60]);

  const glareX = useTransform(springX, [-1, 1], [0, 100]);
  const glareY = useTransform(springY, [-1, 1], [0, 100]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (isCoarsePointer) {
      const onOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma == null) return;
        // Mobile: gerak kiri-kanan lebih kerasa saat HP digerakkan
        rawX.set(clamp(e.gamma / 12, -1, 1));
        if (e.beta != null) rawY.set(clamp((e.beta - 45) / 22, -1, 1));
      };

      const onMotion = (e: DeviceMotionEvent) => {
        if (!e.accelerationIncludingGravity) return;
        const ax = e.accelerationIncludingGravity.x ?? 0;
        rawX.set(clamp(ax / 3.2, -1, 1));
      };

      window.addEventListener("deviceorientation", onOrientation, true);
      window.addEventListener("devicemotion", onMotion, true);

      return () => {
        window.removeEventListener("deviceorientation", onOrientation, true);
        window.removeEventListener("devicemotion", onMotion, true);
        rawX.set(0);
        rawY.set(0);
      };
    }

    const onMove = (e: MouseEvent) => {
      // Map posisi pointer ke ruang -1..1 lalu boost supaya card benar-benar move
      const nx = clamp((e.clientX / window.innerWidth) * 2 - 1, -1, 1);
      const ny = clamp((e.clientY / window.innerHeight) * 2 - 1, -1, 1);
      rawX.set(clamp(nx * 1.2, -1, 1));
      rawY.set(clamp(ny * 1.1, -1, 1));
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY]);

  return (
    <motion.div
      style={{ rotateX, rotateY, translateX, translateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
      animate={{ opacity: 1, scale: 1, rotate: -4 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="relative"
    >
      {/* Shadow card 1 — sangat subtle */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          transform: "translate(10px, 10px) rotate(3deg)",
          background: "rgba(255,255,255,0.02)",
          zIndex: -1,
        }}
      />
      {/* Shadow card 2 */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          border: "1px solid rgba(255,255,255,0.03)",
          transform: "translate(18px, 18px) rotate(6deg)",
          background: "rgba(255,255,255,0.01)",
          zIndex: -2,
        }}
      />

      {/* Main card — lebih kecil, persis aluro */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          width: "clamp(200px, 22vw, 280px)",
          aspectRatio: "3/4",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
        }}
      >
        {/*
          Ganti placeholder ini dengan foto lo:
          import Image from "next/image"
          <Image src="/photo.jpg" alt="Ainura" fill className="object-cover object-top" priority />
        */}
        <Image src="/ainura.png" alt="Ainura" fill className="object-cover object-top" priority />

        {/* Gradient overlay bawah */}
        <div
          className="absolute bottom-0 inset-x-0 z-20 p-4"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
          }}
        >
          <p
            className="text-center text-[10px] tracking-[0.12em] uppercase font-medium"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {isID ? "Merancang Pengalaman" : "Designing Quiet, Confident"}
            <br />
            {isID ? "Digital yang Tenang" : "Digital Experiences"}
          </p>
        </div>

        {/* Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]: number[]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 55%)`
            ),
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────
export default function Hero() {
  const { locale } = useLanguage();
  const isID = locale === "id";
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Vertical layout grid lines (3-column feel) */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="mx-auto h-full w-full max-w-[1220px] grid grid-cols-3 px-4 md:px-8">
          <div className="h-full border-l border-white/[0.08]" />
          <div className="h-full border-l border-white/[0.08]" />
          <div className="h-full border-l border-r border-white/[0.08]" />
        </div>
      </div>

      {/* Brand text marquee di background */}
      <BrandMarquee />

      {/* Vignette — tengah transparan, pinggir gelap */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 20%, var(--bg) 80%)",
        }}
      />

      {/* Ambient glow di belakang card */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Tilt card */}
      <div className="relative z-20" style={{ perspective: "1000px" }}>
        <TiltCard isID={isID} />
      </div>

    </section>
  );
}
