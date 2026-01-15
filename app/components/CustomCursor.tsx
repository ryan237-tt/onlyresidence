"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  /* ================= MOUSE MOVE ================= */
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
  document.body.classList.add("cursor-ready");
  return () => document.body.classList.remove("cursor-ready");
}, []);


  /* ================= HOVER DETECTION ================= */
  useEffect(() => {
    const isInteractive = (el: Element | null) =>
      !!el?.closest("a, button, [data-cursor]");

    const onOver = (e: Event) => {
      if (isInteractive(e.target as Element)) setHover(true);
    };

    const onOut = (e: Event) => {
      if (isInteractive(e.target as Element)) setHover(false);
    };

    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);

    return () => {
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-[9999]
        -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* INNER DOT */}
      <div
        className={`absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[#E6C200]
          -translate-x-1/2 -translate-y-1/2
          transition-transform duration-200
          ${hover ? "scale-150" : "scale-100"}
        `}
      />

      {/* OUTER RING — REDUCED SIZE */}
      <div
        className={`absolute left-1/2 top-1/2 h-7 w-7 rounded-full
          border border-[#E6C200]
          -translate-x-1/2 -translate-y-1/2
          transition-all duration-300
          ${hover ? "scale-125 opacity-80" : "scale-100 opacity-50"}
        `}
      />
    </div>
  );
}
