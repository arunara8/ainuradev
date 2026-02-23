"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const faqs = [
  {
    q: "What's your typical project timeline?",
    a: "Landing pages usually take 5â€“7 days. Full-stack projects run in weekly sprints â€” scope and complexity determine the total duration. I'll give you a clear estimate before we start.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely. I work fully remote and async-friendly across timezones. Communication happens via Notion, Slack, or whatever works best for your team.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A brief overview of your project, your goals, and any references or inspiration you have in mind. From there I'll prepare a proposal with timeline and pricing.",
  },
  {
    q: "Can I request revisions after delivery?",
    a: "Starter plan includes 1 round of revisions. Premium sprints include unlimited revisions within the sprint period. Custom projects are scoped individually.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes â€” Custom plan clients get ongoing support. For other plans, maintenance can be arranged as a separate retainer. Just reach out and we'll figure out what makes sense.",
  },
  {
    q: "What technologies do you work with?",
    a: "My main stack is Next.js, React, TypeScript, Tailwind CSS, and Node.js with PostgreSQL. For design I use Figma. I'm flexible and can adapt to your existing stack if needed.",
  },
  {
    q: "How do payments work?",
    a: "50% upfront, 50% on delivery for one-time projects. Weekly sprints are billed at the start of each week. I accept bank transfer, PayPal, or Wise.",
  },
];
const faqsID = [
  {
    q: "Berapa lama timeline project biasanya?",
    a: "Landing page biasanya 5-7 hari. Untuk full-stack, dikerjakan per sprint mingguan sesuai scope dan kompleksitas.",
  },
  {
    q: "Apakah kamu menerima klien internasional?",
    a: "Ya, saya kerja remote dan nyaman async lintas zona waktu.",
  },
  {
    q: "Apa yang kamu butuhkan untuk mulai?",
    a: "Brief singkat project, tujuan, dan referensi. Dari situ saya susun proposal timeline serta biaya.",
  },
  {
    q: "Bisa revisi setelah delivery?",
    a: "Paket Starter termasuk 1x revisi. Paket Premium revisi tanpa batas selama sprint berjalan.",
  },
  {
    q: "Apakah ada maintenance berkelanjutan?",
    a: "Ada. Untuk plan Custom tersedia support ongoing. Plan lain bisa ditambah retainer maintenance.",
  },
  {
    q: "Teknologi apa yang kamu pakai?",
    a: "Stack utama saya Next.js, React, TypeScript, Tailwind CSS, Node.js, dan PostgreSQL.",
  },
  {
    q: "Sistem pembayarannya bagaimana?",
    a: "50% di awal, 50% saat selesai untuk project one-time. Sprint dibayar di awal tiap minggu.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
      className="relative overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: isOpen ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${isOpen ? "rgba(124,106,255,0.25)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: isOpen ? "0 0 40px rgba(124,106,255,0.08)" : "none",
      }}
    >
      {/* Accent line â€” muncul saat open */}
      <div
        className="absolute top-0 left-8 right-8 h-px transition-opacity duration-300"
        style={{
          background: "linear-gradient(to right, transparent, rgba(124,106,255,0.6), transparent)",
          opacity: isOpen ? 1 : 0,
        }}
      />

      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div className="flex items-center gap-4">
          {/* Number */}
          <span
            className="text-xs font-bold tabular-nums flex-shrink-0"
            style={{ color: isOpen ? "var(--accent-light)" : "var(--text-subtle)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Question */}
          <span
            className="text-sm md:text-base font-medium transition-colors duration-200"
            style={{ color: isOpen ? "var(--text)" : "var(--text-muted)" }}
          >
            {faq.q}
          </span>
        </div>

        {/* Toggle icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
          style={{
            background: isOpen ? "rgba(124,106,255,0.15)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${isOpen ? "rgba(124,106,255,0.3)" : "rgba(255,255,255,0.08)"}`,
            color: isOpen ? "var(--accent-light)" : "var(--text-muted)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="px-6 pb-5 pl-[52px]">
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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

export default function FAQ() {
  const { locale } = useLanguage();
  const isID = locale === "id";
  const shownFaqs = isID ? faqsID : faqs;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" ref={sectionRef} className="relative px-6 pt-32 pb-32">
      <div className="max-w-3xl mx-auto w-full">

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
              Got{" "}
              <em
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--text-muted)",
                }}
              >
                questions?
              </em>
            </span>
          </RevealText>
        </div>

        {/* â”€â”€ FAQ List â”€â”€ */}
        {inView && (
          <div className="flex flex-col gap-3">
          {shownFaqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        )}

        {/* â”€â”€ Bottom CTA â”€â”€ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          className="mt-12 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "rgba(124,106,255,0.06)",
            border: "1px solid rgba(124,106,255,0.15)",
          }}
        >
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>
              Still have questions?
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              I&apos;m happy to chat before you commit to anything.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 24px var(--accent-glow)",
            }}
          >
            {isID ? "Tanya langsung" : "Ask me directly"} â†—
          </a>
        </motion.div>

      </div>
    </section>
  );
}



