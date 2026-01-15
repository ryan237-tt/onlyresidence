"use client";

import Image from "next/image";
import Link from "next/link";

export default function Location() {
  return (
    <section className="py-24 bg-[#fafafa] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Image */}
        <div className="reveal-up rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <Image
            src="/images/home/location-bastos.jpg"
            alt="Vita Resort exterior in Golf Bastos"
            width={1200}
            height={900}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text */}
        <div className="reveal-up" style={{ animationDelay: "200ms" }}>
          <h2 className="h2-section mb-6">
            In the heart of Golf Bastos.
          </h2>

          <p className="body-lg text-gray-600 mb-8">
            Minutes from embassies and tree-lined residential streets.
            Adjacent to the Presidential area.
            One of the most secure neighborhoods in Yaoundé.
          </p>

          <Link
            href="/contact"
            className="
              inline-block
              bg-[#E6C200]
              text-black
              px-8 py-4
              rounded-full
              font-medium
              transition-all duration-300
              hover:shadow-[0_0_25px_rgba(230,194,0,0.45)]
              hover:-translate-y-[1px]
            "
          >
            Get Directions
          </Link>
        </div>
      </div>
    </section>
  );
}
