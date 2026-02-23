"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const isID = locale === "id";

  const navLinks = [
    { label: isID ? "LAYANAN" : "SERVICES", href: "#services" },
    { label: isID ? "KARYA" : "WORK", href: "#work" },
    { label: isID ? "HARGA" : "PRICING", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Toggle dark/light theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty("--bg", "#0a0a0a");
      root.style.setProperty("--bg-secondary", "#0f0f0f");
      root.style.setProperty("--text", "#f0f0ff");
      root.style.setProperty("--text-muted", "#6b6b8a");
      root.style.setProperty("--text-subtle", "#2a2a3a");
      root.style.setProperty("--surface", "rgba(255,255,255,0.04)");
      root.style.setProperty("--surface-hover", "rgba(255,255,255,0.07)");
      root.style.setProperty("--border", "rgba(255,255,255,0.08)");
      root.style.setProperty("--border-hover", "rgba(255,255,255,0.15)");
    } else {
      root.style.setProperty("--bg", "#f5f5f5");
      root.style.setProperty("--bg-secondary", "#ebebeb");
      root.style.setProperty("--text", "#0a0a0a");
      root.style.setProperty("--text-muted", "#555566");
      root.style.setProperty("--text-subtle", "#ccccdd");
      root.style.setProperty("--surface", "rgba(0,0,0,0.04)");
      root.style.setProperty("--surface-hover", "rgba(0,0,0,0.07)");
      root.style.setProperty("--border", "rgba(0,0,0,0.08)");
      root.style.setProperty("--border-hover", "rgba(0,0,0,0.15)");
    }
  }, [isDark]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-2 md:pt-5 md:px-4">
        <nav
          className={[
            "w-full md:w-auto max-w-5xl md:max-w-none flex items-center justify-between px-2 py-2 rounded-2xl",
            "border transition-all duration-500",
            scrolled
              ? "bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl"
              : "bg-white/[0.03] backdrop-blur-md border-white/[0.06]",
          ].join(" ")}
        >
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
              <Image
                src="/avatar.jpg"
                alt="Ainura"
                width={44}
                height={44}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            <div className="hidden md:block w-px h-5 bg-white/10 mx-1" />

            {/* Desktop Links */}
            <div className="hidden md:flex items-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-xl text-[13px] font-medium tracking-widest transition-all duration-200 hover:bg-white/5"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2">
            <div
              className="hidden md:flex items-center rounded-xl border overflow-hidden"
              style={{ borderColor: "var(--border)" }}
            >
              <button
                onClick={() => setLocale("en")}
                className="px-2.5 py-1.5 text-[11px] font-bold tracking-widest transition-colors"
                style={{
                  color: locale === "en" ? "#fff" : "var(--text-muted)",
                  background: locale === "en" ? "var(--accent)" : "transparent",
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLocale("id")}
                className="px-2.5 py-1.5 text-[11px] font-bold tracking-widest transition-colors"
                style={{
                  color: locale === "id" ? "#fff" : "var(--text-muted)",
                  background: locale === "id" ? "var(--accent)" : "transparent",
                }}
              >
                ID
              </button>
            </div>

            {/* Moon / Sun toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/5 flex-shrink-0"
              style={{ color: "var(--text-muted)" }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            {/* Contact Button */}
            <a
              href="#contact"
              className="px-3 md:px-5 py-2 rounded-xl text-[11px] md:text-[13px] font-bold tracking-[0.14em] md:tracking-widest text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] flex-shrink-0"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 20px var(--accent-glow)",
              }}
            >
              {isID ? "KONTAK" : "CONTACT"}
            </a>

            {/* Hamburger - mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-all duration-200 flex-shrink-0"
              style={{ color: "var(--text-muted)" }}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={[
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={[
          "fixed top-24 left-2 right-2 z-50 md:hidden",
          "rounded-2xl p-3 flex flex-col gap-1",
          "border border-white/10 transition-all duration-300",
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none",
        ].join(" ")}
        style={{
          background: "rgba(15,15,25,0.95)",
          backdropFilter: "blur(40px)",
        }}
      >
        <div
          className="flex items-center justify-center gap-2 px-2 pb-2"
        >
          <button
            onClick={() => setLocale("en")}
            className="px-3 py-2 rounded-xl text-xs font-bold tracking-widest"
            style={{
              background: locale === "en" ? "var(--accent)" : "var(--surface)",
              color: locale === "en" ? "#fff" : "var(--text-muted)",
            }}
          >
            EN
          </button>
          <button
            onClick={() => setLocale("id")}
            className="px-3 py-2 rounded-xl text-xs font-bold tracking-widest"
            style={{
              background: locale === "id" ? "var(--accent)" : "var(--surface)",
              color: locale === "id" ? "#fff" : "var(--text-muted)",
            }}
          >
            ID
          </button>
        </div>

        {navLinks.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between px-4 py-4 rounded-xl text-sm font-medium tracking-widest hover:bg-white/5 transition-all duration-200"
            style={{
              color: "var(--text-muted)",
              transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {link.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        ))}

        <div className="h-px mx-4 my-1" style={{ background: "rgba(255,255,255,0.06)" }} />

        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center gap-2 mx-1 py-3 rounded-xl text-sm font-bold tracking-widest text-white"
          style={{ background: "var(--accent)" }}
        >
          {isID ? "KONTAK -&gt;" : "CONTACT -&gt;"}
        </a>
      </div>
    </>
  );
}
