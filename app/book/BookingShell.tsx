"use client";

import BookingFlow from "./BookingFlow";
import Image from "next/image";

export default function BookingShell() {
  return (
    <section className="relative">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/suite/hero-suite.png" // your Vita-style image
          alt="Luxury suite background"
          fill
          className="object-cover brightness-[0.35]"
          priority
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/60" />

      {/* Content */}
      <div className="relative py-20">
        <BookingFlow />
      </div>
    </section>
  );
}
