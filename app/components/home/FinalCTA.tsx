"use client";

import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-[#1C1B1A] text-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 reveal-up">
        
        <h2 className="h2-section mb-8">
          Ready for a different kind of stay?
        </h2>

        <Link
          href="/contact"
          aria-label="Reserve the Vita Resort luxury suite"
          className="
            relative inline-block
            bg-[#E6C200]
            text-black
            px-12 py-5
            rounded-full
            accent text-base
            overflow-hidden

            animate-[reserve-glow_4s_ease-in-out_infinite,reserve-vibrate_3.5s_ease-in-out_infinite]

            transition-all duration-300
            hover:-translate-y-[2px]
          "
        >
          <span
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-r
              from-transparent
              via-[#fff4b8]/70
              to-transparent
              animate-[reserve-shimmer_5.5s_linear_infinite]
            "
          />
          <span className="relative z-10">
            Reserve the Suite
          </span>
        </Link>
      </div>
    </section>
  );
}
