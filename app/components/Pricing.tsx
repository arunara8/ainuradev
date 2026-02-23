"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const plans = [
  {
    name: "Starter",
    label: "Landing Page",
    price: "$89",
    period: "one-time",
    description: "Perfect for individuals and small businesses who need a fast, beautiful online presence.",
    accent: "#22d3ee",
    accentMuted: "rgba(34,211,238,0.10)",
    accentBorder: "rgba(34,211,238,0.20)",
    features: [
      "Landing page or small website scope",
      "Responsive front-end implementation",
      "Core performance and SEO setup",
      "Domain + hosting setup",
      "1 round of revisions",
      "Delivery in 5â€“7 days",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    label: "Full Stack",
    price: "$179",
    period: "per week",
    description: "For teams requiring full product development with backend, APIs, and scalable architecture.",
    accent: "#7c6aff",
    accentMuted: "rgba(124,106,255,0.12)",
    accentBorder: "rgba(124,106,255,0.25)",
    features: [
      "Multi-page front-end architecture",
      "Backend, API, and database implementation",
      "Performance tuning and deployment",
      "Auth, CMS, or dashboard integration",
      "Unlimited revisions during sprint",
      "Priority support & weekly updates",
    ],
    cta: "Start a Project",
    popular: true,
  },
  {
    name: "Custom",
    label: "Enterprise",
    price: "Let's talk",
    period: "custom scope",
    description: "Complex products, unique requirements, or long-term partnerships â€” let's figure it out together.",
    accent: "#f59e0b",
    accentMuted: "rgba(245,158,11,0.10)",
    accentBorder: "rgba(245,158,11,0.20)",
    features: [
      "Full discovery & scoping session",
      "Custom tech stack & architecture",
      "Dedicated development sprints",
      "Third-party integrations",
      "Ongoing maintenance & support",
      "Flexible billing & timeline",
    ],
    cta: "Contact Me",
    popular: false,
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function RevealText({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Pricing() {
  const { locale } = useLanguage();
  const isID = locale === "id";
  const plansID = [
    {
      name: "Starter",
      label: "Landing Page",
      period: "sekali bayar",
      description: "Cocok untuk personal brand atau bisnis kecil yang butuh website cepat dan rapi.",
      features: [
        "Landing page atau website scope kecil",
        "Implementasi front-end responsif",
        "Setup performa dan SEO dasar",
        "Setup domain + hosting",
        "1x revisi",
        "Selesai dalam 5-7 hari",
      ],
      cta: "Mulai",
    },
    {
      name: "Premium",
      label: "Full Stack",
      period: "per minggu",
      description: "Untuk tim yang butuh pengembangan produk lengkap dengan backend, API, dan arsitektur scalable.",
      features: [
        "Arsitektur front-end multi halaman",
        "Implementasi backend, API, dan database",
        "Optimasi performa dan deployment",
        "Integrasi auth, CMS, atau dashboard",
        "Revisi tanpa batas selama sprint",
        "Priority support & weekly updates",
      ],
      cta: "Mulai Proyek",
    },
    {
      name: "Custom",
      label: "Enterprise",
      period: "scope custom",
      description: "Untuk kebutuhan kompleks, requirement khusus, atau kerja sama jangka panjang.",
      features: [
        "Discovery dan scoping mendalam",
        "Arsitektur dan stack custom",
        "Sprint pengembangan dedicated",
        "Integrasi third-party",
        "Maintenance & support berkelanjutan",
        "Skema billing dan timeline fleksibel",
      ],
      cta: "Hubungi Saya",
    },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="pricing" ref={sectionRef} className="relative px-6 pt-32 pb-32">
      <div className="max-w-5xl mx-auto w-full">

        {/* â”€â”€ Label â”€â”€ */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--accent-light)" }}
        >
        </motion.p>

        {/* â”€â”€ Heading â”€â”€ */}
        <div className="mb-16">
          <RevealText delay={0.1}>
            <span
              className="text-[clamp(32px,8vw,72px)] font-black tracking-tighter leading-none"
              style={{ color: "var(--text)" }}
            >
              Simple,{" "}
              <em
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--text-muted)",
                }}
              >
                transparent
              </em>{" "}
              {isID ? "untuk kamu." : "pricing."}
            </span>
          </RevealText>
        </div>

        {/* â”€â”€ Cards Grid â”€â”€ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative"
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white"
                  style={{ background: plan.accent }}
                >
                  {isID ? "Paling Populer" : "Most Popular"}
                </div>
              )}

              <div
                className="relative overflow-hidden rounded-3xl h-full flex flex-col transition-all duration-500"
                style={{
                  background: hovered === i
                    ? `rgba(255,255,255,0.06)`
                    : "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(40px)",
                  WebkitBackdropFilter: "blur(40px)",
                  border: `1px solid ${hovered === i || plan.popular
                    ? plan.accentBorder
                    : "rgba(255,255,255,0.07)"}`,
                  boxShadow: hovered === i || plan.popular
                    ? `0 0 0 1px rgba(255,255,255,0.05), 0 30px 60px rgba(0,0,0,0.4), 0 0 60px ${plan.accentMuted}`
                    : "0 0 0 1px rgba(255,255,255,0.03)",
                  transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-8 right-8 h-px transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, transparent, ${plan.accent}80, transparent)`,
                    opacity: hovered === i || plan.popular ? 1 : 0.3,
                  }}
                />

                {/* Glow blob */}
                <div
                  className="absolute -right-10 -top-10 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-300"
                  style={{
                    background: plan.accentMuted,
                    filter: "blur(40px)",
                    opacity: hovered === i ? 1 : 0.5,
                  }}
                />

                <div className="relative z-10 p-7 flex flex-col h-full">

                  {/* Label pill */}
                  <div className="mb-5">
                    <span
                      className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-semibold"
                      style={{
                        background: plan.accentMuted,
                        border: `1px solid ${plan.accentBorder}`,
                        color: plan.accent,
                      }}
                    >
                      {isID ? plansID[i].label : plan.label}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span
                      className="font-black tracking-tighter"
                      style={{
                        fontSize: plan.price === "Let's talk" ? "32px" : "48px",
                        color: "var(--text)",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                    {plan.price !== "Let's talk" && (
                      <span
                        className="text-sm ml-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        / {isID ? plansID[i].period : plan.period}
                      </span>
                    )}
                  </div>

                  {/* Plan name */}
                  <p
                    className="text-lg font-bold mb-3"
                    style={{ color: plan.accent }}
                  >
                    {isID ? plansID[i].name : plan.name}
                  </p>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {isID ? plansID[i].description : plan.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="w-full h-px mb-6"
                    style={{ background: `${plan.accent}20` }}
                  />

                  {/* Features */}
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {(isID ? plansID[i].features : plan.features).map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div
                          className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: plan.accentMuted,
                            border: `1px solid ${plan.accentBorder}`,
                          }}
                        >
                          <CheckIcon color={plan.accent} />
                        </div>
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300"
                    style={
                      plan.popular
                        ? {
                            background: plan.accent,
                            color: "#fff",
                            boxShadow: `0 0 30px ${plan.accentMuted}`,
                          }
                        : {
                            background: plan.accentMuted,
                            border: `1px solid ${plan.accentBorder}`,
                            color: plan.accent,
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!plan.popular) {
                        e.currentTarget.style.background = plan.accent;
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!plan.popular) {
                        e.currentTarget.style.background = plan.accentMuted;
                        e.currentTarget.style.color = plan.accent;
                      }
                    }}
                  >
                    {isID ? plansID[i].cta : plan.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* â”€â”€ Bottom note â”€â”€ */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-xs mt-10"
          style={{ color: "var(--text-subtle)" }}
        >
          {isID ? "Semua harga dalam USD · Butuh paket tengah?" : "All prices in USD · Need something in between?"}{" "}
          <a
            href="#contact"
            className="underline underline-offset-4 transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {isID ? "Yuk diskusi" : "Let&apos;s talk"}
          </a>
        </motion.p>

      </div>
    </section>
  );
}



