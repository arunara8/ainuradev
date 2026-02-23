"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const services = [
  {
    title: "Website Design",
    description:
      "I design modern, minimal websites that balance beauty with usability. Each layout is built to tell a story, guide visitors naturally, and feel effortless to navigate. From structure to typography, every detail is tuned for clarity and emotion.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
      </svg>
    ),
    number: "01",
    accent: "#3b82f6",
    accentMuted: "rgba(59,130,246,0.12)",
    accentBorder: "rgba(59,130,246,0.2)",
    tags: ["Figma", "Webflow", "Framer"],
  },
  {
    title: "Web Development",
    description:
      "Clean, performant code is my foundation. I build full-stack web apps with Next.js, React, and Node.js — optimized for speed, accessibility, and scalability. Every line of code is written with intention.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    number: "02",
    accent: "#7c6aff",
    accentMuted: "rgba(124,106,255,0.12)",
    accentBorder: "rgba(124,106,255,0.2)",
    tags: ["Next.js", "React", "Node.js"],
  },
  {
    title: "UI/UX Design",
    description:
      "Great design starts with understanding. I map out user journeys, define key moments, and shape interfaces that feel intuitive from the first click. The goal is to create experiences that connect and resonate.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    number: "03",
    accent: "#22d3ee",
    accentMuted: "rgba(34,211,238,0.10)",
    accentBorder: "rgba(34,211,238,0.18)",
    tags: ["Research", "Wireframe", "Prototype"],
  },
  {
    title: "SEO & Performance",
    description:
      "A beautiful website means nothing if no one finds it. I optimize for Core Web Vitals, semantic HTML, and search visibility — ensuring your site loads fast, ranks well, and converts visitors into customers.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    number: "04",
    accent: "#f59e0b",
    accentMuted: "rgba(245,158,11,0.10)",
    accentBorder: "rgba(245,158,11,0.18)",
    tags: ["Core Web Vitals", "Analytics", "Lighthouse"],
  },
];

function RevealText({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={className}
        style={style}
        initial={{ y: "100%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Services() {
  const { locale } = useLanguage();
  const isID = locale === "id";
  const idCopy = [
    {
      title: "Desain Website",
      description:
        "Saya merancang website modern dan minimalis yang menyeimbangkan estetika dengan kemudahan penggunaan.",
      tags: ["Figma", "Webflow", "Framer"],
    },
    {
      title: "Pengembangan Web",
      description:
        "Saya membangun web app full-stack dengan Next.js, React, dan Node.js yang cepat, aksesibel, dan scalable.",
      tags: ["Next.js", "React", "Node.js"],
    },
    {
      title: "Desain UI/UX",
      description:
        "Saya memetakan user journey dan merancang interface yang intuitif agar pengalaman terasa natural sejak klik pertama.",
      tags: ["Riset", "Wireframe", "Prototype"],
    },
    {
      title: "SEO & Performa",
      description:
        "Saya optimasi Core Web Vitals, semantic HTML, dan visibilitas search agar website cepat, mudah ditemukan, dan konversinya bagus.",
      tags: ["Core Web Vitals", "Analytics", "Lighthouse"],
    },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={sectionRef} className="relative px-6 pt-32 pb-0">
      <div className="max-w-3xl mx-auto w-full">

        {/* ── Label ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--accent-light)" }}
        >
        </motion.p>

        {/* ── Heading ── */}
        <div className="mb-24">
          <RevealText
            delay={0.1}
            className="text-[clamp(32px,8vw,72px)] font-black tracking-tighter leading-none"
            style={{ color: "var(--text)" } as React.CSSProperties}
          >
            {isID ? "Apa yang bisa saya " : "What I can "}
            <em
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--text-muted)",
              }}
            >
              {isID ? "bantu" : "help"}
            </em>{" "}
            {isID ? "kerjakan." : "with."}
          </RevealText>
        </div>

        {/* ── Sticky Stack Cards ── */}
        <div className="flex flex-col">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="sticky"
              style={{
                top: "88px",
                zIndex: i + 1,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.12 }}
                // Margin bawah gede supaya scroll cukup panjang
                // dan efek sticky stack kerasa
                className="mb-[30vh]"
              >
                {/* ── Glass Card ── */}
                <div
                  className="relative overflow-hidden rounded-3xl"
                  style={{
                    // Glassmorphism: backdrop blur + semi transparan
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    border: `1px solid ${service.accentBorder}`,
                    boxShadow: `
                      0 0 0 1px rgba(255,255,255,0.04),
                      0 20px 60px rgba(0,0,0,0.5),
                      inset 0 1px 0 rgba(255,255,255,0.08),
                      0 0 80px ${service.accentMuted}
                    `,
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-8 right-8 h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, ${service.accent}60, transparent)`,
                    }}
                  />

                  {/* Glow blob kanan atas */}
                  <div
                    className="absolute -right-16 -top-16 w-64 h-64 rounded-full pointer-events-none"
                    style={{
                      background: service.accentMuted,
                      filter: "blur(50px)",
                    }}
                  />

                  {/* Number watermark */}
                  <div
                    className="absolute right-6 top-2 font-black select-none pointer-events-none leading-none"
                    style={{
                      fontSize: "clamp(72px,14vw,120px)",
                      color: "rgba(255,255,255,0.03)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {service.number}
                  </div>

                  {/* ── Content ── */}
                  <div className="relative z-10 p-6 md:p-10">

                    {/* Icon + number row */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                          background: service.accentMuted,
                          border: `1px solid ${service.accentBorder}`,
                          color: service.accent,
                          boxShadow: `0 0 20px ${service.accentMuted}`,
                        }}
                      >
                        {service.icon}
                      </div>

                      {/* Tags */}
                      <div className="hidden sm:flex items-center gap-2">
                        {service.tags.map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                            style={{
                              background: service.accentMuted,
                              border: `1px solid ${service.accentBorder}`,
                              color: service.accent,
                            }}
                          >
                            {isID ? idCopy[i].tags[tagIndex] : tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
                      style={{ color: "var(--text)" }}
                    >
                      {isID ? idCopy[i].title : service.title}
                    </h3>

                    {/* Divider */}
                    <div
                      className="w-12 h-px mb-6"
                      style={{ background: `${service.accent}50` }}
                    />

                    {/* Description */}
                    <p
                      className="text-sm md:text-base leading-relaxed max-w-lg"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {isID ? idCopy[i].description : service.description}
                    </p>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between mt-8">
                      {/* Mobile tags */}
                      <div className="flex sm:hidden items-center gap-2 flex-wrap">
                        {service.tags.map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                            style={{
                              background: service.accentMuted,
                              border: `1px solid ${service.accentBorder}`,
                              color: service.accent,
                            }}
                          >
                            {isID ? idCopy[i].tags[tagIndex] : tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <a
                        href="#contact"
                        className="ml-auto flex items-center gap-2 text-xs tracking-widest uppercase transition-all duration-200 hover:gap-3"
                        style={{ color: service.accent }}
                      >
                        {isID ? "Mulai sekarang" : "Get started"}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M17 7H7M17 7v10"/>
                        </svg>
                      </a>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
