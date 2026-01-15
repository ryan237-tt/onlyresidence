"use client";

import Image from "next/image";
import { useEffect } from "react";

type ImageItem = {
  src: string;
  alt: string;
};

interface Props {
  images: ImageItem[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function GalleryLightbox({
  images,
  index,
  onClose,
  onChange,
}: Props) {
  const total = images.length;

  // 🔑 Keyboard controls
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [index]);

  function next() {
    onChange((index + 1) % total);
  }

  function prev() {
    onChange((index - 1 + total) % total);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center px-6">
      
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-4xl hover:text-[#857416]"
      >
        ×
      </button>

      {/* Prev */}
      <button
        onClick={prev}
        className="absolute left-6 text-white text-5xl hover:text-[#857416]"
      >
        ‹
      </button>

      {/* Image */}
      <div className="relative w-full max-w-6xl h-[85vh]">
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Next */}
      <button
        onClick={next}
        className="absolute right-6 text-white text-5xl hover:text-[#857416]"
      >
        ›
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 text-white text-sm font-accent">
        {index + 1} / {total}
      </div>
    </div>
  );
}
