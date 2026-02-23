"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const socials = [
  {
    label: "GitHub",
    handle: "@ainuradev",
    href: "https://github.com/ainuradev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "Ainura Dev",
    href: "https://linkedin.com/in/Ainuradev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    handle: "sepsigmay",
    href: "https://instagram.com/sepsigmay",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "adtyanugraha654@gmail.com",
    href: "mailto:adtyanugraha654@email.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
      </svg>
    ),
  },
];

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

export default function Contact() {
  const { locale } = useLanguage();
  const isID = locale === "id";
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulasi kirim â€” ganti dengan API call lo (Resend, EmailJS, dsb)
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
  };

  return (
    <section id="contact" ref={sectionRef} className="relative px-6 pt-32 pb-24">
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

        {/* â”€â”€ Big heading â”€â”€ */}
        <div className="mb-16">
          <RevealText delay={0.1}>
            <span
              className="text-[clamp(36px,9vw,100px)] font-black tracking-tighter leading-none"
              style={{ color: "var(--text)" }}
            >
              Let&apos;s{" "}
              <em
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--text-muted)",
                }}
              >
                work
              </em>{" "}
              {isID ? "bareng." : "together."}
            </span>
          </RevealText>
        </div>

        {/* â”€â”€ Two column layout â”€â”€ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* â”€â”€ Left: Form â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl p-7"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-8 right-8 h-px"
              style={{
                background: "linear-gradient(to right, transparent, rgba(124,106,255,0.5), transparent)",
              }}
            />

            {status === "sent" ? (
              // â”€â”€ Success state â”€â”€
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(124,106,255,0.15)",
                    border: "1px solid rgba(124,106,255,0.3)",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-lg font-bold" style={{ color: "var(--text)" }}>
                  {isID ? "Pesan terkirim!" : "Message sent!"}
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {isID ? "Saya akan balas dalam 24 jam." : "I&apos;ll get back to you within 24 hours."}
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-2 text-xs underline underline-offset-4 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  {isID ? "Kirim lagi" : "Send another"}
                </button>
              </motion.div>
            ) : (
              // â”€â”€ Form â”€â”€
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="text-base font-semibold mb-2" style={{ color: "var(--text)" }}>
                  {isID ? "Kirim pesan" : "Send a message"}
                </p>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={isID ? "Nama kamu" : "Your name"}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--text)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(124,106,255,0.4)";
                      e.currentTarget.style.background = "rgba(124,106,255,0.05)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={isID ? "kamu@email.com" : "your@email.com"}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--text)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(124,106,255,0.4)";
                      e.currentTarget.style.background = "rgba(124,106,255,0.05)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={isID ? "Ceritakan project kamu..." : "Tell me about your project..."}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--text)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(124,106,255,0.4)";
                      e.currentTarget.style.background = "rgba(124,106,255,0.05)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 30px var(--accent-glow)",
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      {isID ? "Mengirim..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      {isID ? "Kirim Pesan" : "Send Message"}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* â”€â”€ Right: Info + Socials â”€â”€ */}
          <div className="flex flex-col gap-4">

            {/* Info card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="relative overflow-hidden rounded-3xl p-7"
              style={{
                background: "rgba(124,106,255,0.06)",
                border: "1px solid rgba(124,106,255,0.15)",
              }}
            >
              <div
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background: "rgba(124,106,255,0.15)",
                  filter: "blur(30px)",
                }}
              />
              <div className="relative z-10">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-4"
                  style={{
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.2)",
                    color: "#4ade80",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {isID ? "Siap untuk project baru" : "Available for projects"}
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--text)" }}
                >
                  {isID ? "Siap mulai sesuatu?" : "Ready to start something?"}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {isID ? "Mau landing page atau full product, saya terbuka untuk project baru. Biasanya dibalas dalam 24 jam." : "Whether it&apos;s a landing page or a full product â€” I&apos;m open to new projects. Response time is usually within 24 hours."}
                </p>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              className="relative overflow-hidden rounded-3xl p-7"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {isID ? "Temukan saya di" : "Find me on"}
              </p>
              <div className="flex flex-col gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.45 + i * 0.07 }}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {s.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                          {s.label}
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {s.handle}
                        </p>
                      </div>
                    </div>
                    <svg
                      width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* â”€â”€ Footer â”€â”€ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="max-w-5xl mx-auto mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          (c) {new Date().getFullYear()} Ainura. {isID ? "Semua hak dilindungi." : "All rights reserved."}
        </p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {isID ? "Dibuat dengan Next.js · Tailwind CSS · Framer Motion" : "Built with Next.js · Tailwind CSS · Framer Motion"}
        </p>
      </motion.div>

    </section>
  );
}




