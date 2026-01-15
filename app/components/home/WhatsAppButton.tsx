"use client";

import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed bottom-12 right-8 z-50
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        group
      `}
    >
      {/* Tooltip */}
      <span
        className="
          absolute right-full mr-4 top-1/2 -translate-y-1/2
          whitespace-nowrap
          bg-black text-white text-xs
          px-3 py-1.5 rounded-md
          font-accent
          opacity-0 translate-x-2
          transition-all duration-500
          group-hover:opacity-100 group-hover:translate-x-0
        "
      >
        Questions? Chat with us
      </span>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/237659099178?text=Hello%2C%20I%20would%20like%20to%20reserve%20a%20night%20at%20Vita%20Resort."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Vita Resort on WhatsApp"
        data-cursor
        className="
          w-16 h-16 aspect-square shrink-0
          rounded-full
          bg-[#E6C200] text-black
          flex items-center justify-center
          shadow-[0_0_0_rgba(230,194,0,0)]
          animate-[reserve-glow_6s_ease-in-out_infinite]
          transition-all duration-300
          hover:shadow-[0_0_25px_rgba(230,194,0,0.5)]
          hover:-translate-y-1
        "
      >
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
        </svg>
      </a>
    </div>
  );
}
