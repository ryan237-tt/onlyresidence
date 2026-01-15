"use client";

import Image from "next/image";
import { useState } from "react";
import GalleryLightbox from "./GalleryLightbox";

const images = [
  {
    src: "/images/home/design-suite.avif",
    alt: "Forest view from the suite"  },  
  {
    src: "/images/gallery/02_HERO_full-suite-warm-COMPLETE.png",
    alt: "Full luxury suite with warm lighting and panoramic forest view",
  },
  {
    src: "/images/gallery/03_HERO_bathtub-balcony-pristine.png",
    alt: "Freestanding bathtub with balcony and forest view",
  },
  {
    src: "/images/gallery/04_HERO_drone-night-aerial.jpg",
    alt: "Aerial night view of Vita Resort outlined by LED lighting",
  },
  {
    src: "/images/gallery/05_HERO_bathroom-gold-luxury.jpg",
    alt: "Luxury spa bathroom with dark marble and gold finishes",
  },

  // BEDROOM
  {
    src: "/images/gallery/06_BEDROOM_cove-lighting-architectural.png",
    alt: "Architectural cove ceiling with indirect LED lighting",
  },
  {
    src: "/images/gallery/07_BEDROOM_daytime-ottoman-natural.png",
    alt: "Bedroom with natural daylight and forest-facing windows",
  },
  {
    src: "/images/gallery/08_BEDROOM_evening-ottoman-glow.png",
    alt: "Bedroom ambiance with warm evening lighting",
  },
  {
    src: "/images/gallery/09_BEDROOM_full-suite-evening.png",
    alt: "Complete suite view in the evening with warm tones",
  },
  {
    src: "/images/gallery/10_BEDROOM_clean-angle-modern.png",
    alt: "Modern bedroom angle highlighting refined finishes",
  },
  {
    src: "/images/gallery/11_BEDROOM_daytime-bright-natural.jpg",
    alt: "Bright bedroom with floor-to-ceiling forest views",
  },
  {
    src: "/images/gallery/12_BEDROOM_evening-forest-ambiance.jpg",
    alt: "Evening bedroom atmosphere overlooking the forest",
  },
  {
    src: "/images/gallery/13_BEDROOM_cove-ceiling-feature.png",
    alt: "Circular cove ceiling feature with architectural lighting",
  },

  // BATHROOM
  {
    src: "/images/gallery/14_BATHROOM_bathtub-balcony-wide.png",
    alt: "Wide-angle bathtub view with balcony access",
  },
  {
    src: "/images/gallery/15_BATHROOM_bathtub-forest-window.png",
    alt: "Bathtub with chromotherapy lighting and forest window",
  },
  {
    src: "/images/gallery/16_BATHROOM_mirror-tv-tech.png",
    alt: "Mirror TV integrated into the spa bathroom",
  },
  {
    src: "/images/gallery/17_BATHROOM_vanity-gold-luxury.png",
    alt: "Luxury bathroom vanity with gold accents",
  },
  {
    src: "/images/gallery/18_BATHROOM_marble-interior-full.png",
    alt: "Full bathroom interior clad in dark marble",
  },
  {
    src: "/images/gallery/19_BATHROOM_complete-layout.png",
    alt: "Complete bathroom layout with tub, shower, and fixtures",
  },
  {
    src: "/images/gallery/20_BATHROOM_bathtub-curtain-elegant.png",
    alt: "Elegant bathtub with sheer curtains and soft daylight",
  },
  {
    src: "/images/gallery/21_BATHROOM_view-from-bedroom.png",
    alt: "Bathroom view as seen directly from the bedroom",
  },

  // EXTERIOR
  {
    src: "/images/gallery/22_EXTERIOR_entrance-golden-close.jpg",
    alt: "Vita Resort entrance with golden signage detail",
  },
  {
    src: "/images/gallery/23_EXTERIOR_daytime-branding.png",
    alt: "Daytime exterior view featuring Vita Resort branding",
  },
  {
    src: "/images/gallery/24_EXTERIOR_drone-balcony-detail.jpg",
    alt: "Drone view highlighting balcony and surrounding greenery",
  },

  // DINING & DETAILS
  {
    src: "/images/gallery/25_DINING_chandelier-warm.png",
    alt: "Dining area with geometric chandelier and warm lighting",
  },
  {
    src: "/images/gallery/26_DINING_evening-chandelier.jpg",
    alt: "Dining space illuminated in the evening",
  },
  {
    src: "/images/gallery/27_AMENITIES_kitchenette-fridge.png",
    alt: "Kitchenette amenities including refrigerator",
  },
  {
    src: "/images/gallery/28_DINING_workspace-functional.png",
    alt: "Dining table used as a functional workspace",
  },
  {
    src: "/images/gallery/29_DETAILS_headboard-quality.png",
    alt: "High-quality headboard detail showing craftsmanship",
  },
];


export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="pb-28 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <div
              key={img.src}
              className="img-blur-up transition-all group relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-100 cursor-pointer ease-out duration-700"
              onClick={() => setActiveIndex(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <GalleryLightbox
          images={images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
        />
      )}
    </section>
  );
}

