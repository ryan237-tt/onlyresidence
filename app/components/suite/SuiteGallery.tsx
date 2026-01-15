"use client";

import Image from "next/image";

const images = [
  { src: "/images/suite/hero-suite.png", alt: "Suite with forest view" },
  { src: "/images/suite/bedroom-forest.png", alt: "Bedroom panoramic forest view" },
  { src: "/images/suite/bathroom-bathtub.png", alt: "Bathtub with balcony" },
  { src: "/images/suite/bathroom-gold.png", alt: "Luxury marble bathroom" },
  { src: "/images/suite/dining.png", alt: "Dining nook" },
  { src: "/images/suite/lighting.jpg", alt: "Architectural cove lighting" },
  { src: "/images/suite/exterior-night.jpg", alt: "Vita Resort exterior at night" },
  { src: "/images/suite/bathtub-wide.jpg", alt: "Wide bathtub view" },
];

export default function SuiteGallery() {
  return (
    <section className="py-24 bg-[#f7f7f5]">
      <div className="max-w-[1680px] mx-auto px-28">
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6 lg:gap-8
          "
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="
                reveal-up
                relative
                overflow-hidden
                rounded-2xl
                aspect-[7/6]
                shadow-[0_30px_70px_rgba(0,0,0,0.10)]
              "
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 33vw, 25vw"
                className="
                  object-cover
                  transition-transform
                  duration-[900ms]
                  ease-out
                  hover:scale-[1.07]
                "
                priority={i < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
