"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/home/hero-forest-suite.avif"
        alt="Forest view luxury suite"
        fill
        priority
        className="object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-5xl px-6 text-center text-white">
          {/* Hero Title */}
          <h1 className="h1-hero animate-fadeUp">
            Wake up facing the forest.
          </h1>

          {/* Subtitle */}
          <p className="body-lg text-white/90 max-w-3xl mx-auto mb-10 animate-fadeUp delay-200">
            A thoughtfully designed suite. Forest views from the bed.
            Spa bathroom. Intelligent lighting.
            <br />
            In the heart of Golf Bastos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeUp delay-400">
            {/* Primary CTA */}
            <Link
              href="/contact"
              data-cursor
              className="
                bg-[#E6C200]
                text-black
                px-8 py-4
                rounded-full
                font-medium
                transition-all duration-300
                hover:-translate-y-[2px]
                hover:shadow-[0_0_25px_rgba(230,194,0,0.45)]
              "
            >
              Reserve
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/suite"
              data-cursor
              className="
                px-8 py-4
                rounded-full
                border border-white/30
                text-white
                backdrop-blur-sm
                transition-all duration-300
                hover:bg-white/10
              "
            >
              View the Suite
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
