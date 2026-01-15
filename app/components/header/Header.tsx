"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import ReserveButton from "../ReserveButton";

export default function Header() {
  // We get the current route to highlight active navigation items
  const pathname = usePathname();

  // We track if the page is scrolled to change header transparency
  const [scrolled, setScrolled] = useState(false);

  // We control the mobile menu open / close state
  const [menuOpen, setMenuOpen] = useState(false);

  // We store scroll progress for the top progress bar
  const [scrollProgress, setScrollProgress] = useState(0);

  // We keep references for accessibility and focus management
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  /* ================= SCROLL HANDLING ================= */
  // We listen to page scroll to:
  // - change header background
  // - update scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(scrollTop > 80);
      setScrollProgress(
        docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      );
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= ESC KEY CLOSE ================= */
  // We allow closing the mobile menu using the Escape key
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /* ================= AUTO CLOSE ON RESIZE ================= */
  // We automatically close the mobile menu when switching to desktop view
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  /* ================= FOCUS MANAGEMENT ================= */
  // We move focus correctly when the menu opens or closes
  useEffect(() => {
    if (menuOpen) {
      firstMobileLinkRef.current?.focus();
    } else {
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  // Shared navigation styles
  const navItem =
    "font-accent text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[#E6C200]";
  const active =
    "text-[#E6C200] font-medium";

  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed top-3 left-3 z-[9999] bg-white px-4 py-2 rounded shadow"
      >
        Skip to content
      </a>

      {/* ================= HEADER ================= */}
      <header
        className={`sticky top-0 z-50 relative transition-all duration-300 ${
          scrolled
            ? "bg-white/75 backdrop-blur-xl shadow-sm"
            : "bg-white/30 backdrop-blur-lg"
        }`}
      >
        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 h-[3px] w-full">
          <div
            className="h-full bg-[#E6C200]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Top bar containing logo and navigation */}
        <div
          className={`flex items-center justify-between max-w-7xl mx-auto px-6 transition-all duration-500 ${
            scrolled ? "h-20" : "h-24"
          }`}
        >
          {/* Logo */}
          <Link href="/" data-cursor>
            <Image
              src="/vita-logo.jpg"
              alt="Vita Resort"
              width={70}
              height={20}
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-10 text-sm uppercase tracking-wide font-accent">
            {[
              ["/", "Home"],
              ["/suite", "Suite"],
              ["/gallery", "Gallery"],
              ["/about", "About"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                data-cursor
                className={`${navItem} ${
                  pathname === href ? active : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-6">
            
            <ReserveButton />

            <button
              data-cursor
              aria-label="Switch language"
              className="text-sm hover:text-[#E6C200] transition"
            >
              EN
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <button
            ref={menuButtonRef}
            data-cursor
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden p-2 rounded-full hover:bg-black/5 transition"
          >
            {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>

        {/* ================= MOBILE DROPDOWN ================= */}
        <div
          className={`
            absolute left-0 right-0 top-full
            bg-white/80 backdrop-blur-2xl
            transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            border-t border-white/70
            ${
              menuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-3 pointer-events-none"
            }
          `}
        >
          {/* Mobile navigation */}
          <nav className="flex flex-col gap-6 px-6 pt-6 text-base uppercase font-accent">
            <Link
              ref={firstMobileLinkRef}
              href="/"
              data-cursor
              onClick={() => setMenuOpen(false)}
              className={pathname === "/" ? active : ""}
            >
              Home
            </Link>

            {[
              ["suite", "Suite"],
              ["gallery", "Gallery"],
              ["about", "About"],
              ["contact", "Contact"],
              ["faq", "FAQ"],
            ].map(([slug, label]) => (
              <Link
                key={slug}
                href={`/${slug}`}
                data-cursor
                onClick={() => setMenuOpen(false)}
                className={pathname === `/${slug}` ? active : ""}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="px-6 py-10">
            
            <ReserveButton
              fullWidth
              onClick={() => setMenuOpen(false)}
            />
            
          </div>
        </div>
      </header>
    </>
  );
}
