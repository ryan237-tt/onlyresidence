"use client";

import Image from "next/image";

const images = [
  {
    src: "https://res.cloudinary.com/divylndt3/image/upload/v1768608559/IMG_2378_ms6ttp.jpg",
    alt: "Suite exterior surrounded by forest",
  },
  {
    src: "https://res.cloudinary.com/divylndt3/image/upload/v1768608535/IMG_2455_cdrfiw.jpg",
    alt: "Bedroom with panoramic forest view",
  },
  {
    src: "https://res.cloudinary.com/divylndt3/image/upload/v1768608533/IMG_2473_kfjidt.jpg",
    alt: "Luxury bedroom interior",
  },
  {
    src: "https://res.cloudinary.com/divylndt3/image/upload/v1768608522/IMG_2466_wvavs4.jpg",
    alt: "Modern suite seating area",
  },
  {
    src: "https://res.cloudinary.com/divylndt3/image/upload/v1768608549/IMG_2405_ntjkko.jpg",
    alt: "Dining and kitchenette area",
  },
  {
    src: "https://res.cloudinary.com/divylndt3/image/upload/v1768608544/IMG_2407_rqatud.jpg",
    alt: "Bathroom with bathtub and premium finishes",
  },
  {
    src: "https://res.cloudinary.com/divylndt3/image/upload/v1768608564/IMG_2494_mhovir.jpg",
    alt: "Vita Resort façade at night",
  },
  {
    src: "https://res.cloudinary.com/divylndt3/image/upload/v1768608562/IMG_2489_dl6bxc.jpg",
    alt: "Architectural exterior detail",
  },
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
