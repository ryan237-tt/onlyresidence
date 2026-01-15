"use client";

export default function SuiteSpecifications() {
  return (
    <section className="py-20  relative overflow-hidden">
      {/* very subtle grain (luxury feel) */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Title */}
        <h2 className="reveal-up h2-section text-center mb-14 tracking-tight">
          Specifications
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 text-center">
          {[
            ["Size", "33 m²"],
            ["Bed", "1 King"],
            ["Capacity", "2 guests"],
            ["Check-in / Out", "14:00 / 12:00"],
          ].map(([label, value], i) => (
            <div
              key={label}
              className="
                reveal-up
                relative
                p-8
                rounded-xl
                bg-white/80
                backdrop-blur-sm
                shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                transition-transform duration-500 ease-out
                hover:-translate-y-1
              "
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Label */}
              <p className="accent text-gray-500 mb-3 uppercase">
                {label}
              </p>

              {/* Value */}
              <p className="font-display text-3xl tracking-tight">
                {value}
              </p>

              {/* soft gold underline */}
              <span className="
                absolute left-1/2 -bottom-px
                h-px w-12
                -translate-x-1/2
                bg-[#857416]/40
              " />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
