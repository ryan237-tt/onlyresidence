"use client";

import Image from "next/image";

export default function BookingHero() {
  return (
    <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/home/design-suite.avif" // <-- your Vita-like image
        alt="Luxury suite booking"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-center px-6">
        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
          Reserve Your Dates
        </h1>
        <p className="font-body text-lg text-white/90">
          Real-time availability, instant confirmation, WhatsApp assistance if needed.
        </p>
      </div>
    </section>
  );
}
