"use client";

import Image from "next/image";

export default function DesignTech() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        
        {/* Text */}
        <div className="reveal-up">
          <h2 className="h2-section mb-6">
            Design first. Technology second.
          </h2>

          <p className="body-lg text-gray-600">
            Every detail was designed before the first tile was laid.
            Light temperature, water pressure, acoustics.
            The result is a suite that feels intuitive.
            Simple controls. Reliable systems.
            You only notice what truly matters.
          </p>
        </div>

        {/* Image */}
        <div
          className="reveal-up rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
          style={{ animationDelay: "200ms" }}
        >
          <Image
            src="/design-suite.JPG"
            alt="Forest view from the suite"
            width={1200}
            height={900}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
