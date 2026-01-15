"use client";

export default function SuiteGoodToKnow() {
  return (
    <section className="py-24 bg-[#f7f7f5] relative overflow-hidden">
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Title */}
        <h2 className="reveal-up h2-section text-center mb-12 tracking-tight">
          Good to Know
        </h2>

        {/* Intro */}
        <p
          className="reveal-up body-lg text-gray-700 text-center max-w-3xl mx-auto mb-20"
          style={{ animationDelay: "100ms" }}
        >
          Vita Resort focuses exclusively on a refined suite experience.
          Everything is designed to offer calm, privacy, and effortless comfort —
          without distractions.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* No */}
          <div
            className="
              reveal-up
              p-10
              rounded-2xl
              bg-white/85
              backdrop-blur-sm
              shadow-[0_30px_80px_rgba(0,0,0,0.08)]
            "
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="h3-card mb-8 text-[#857416]">
              What we do not provide
            </h3>

            <ul className="body-lg space-y-4 text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-red-500 text-lg">✕</span>
                <span>No on-site restaurant or full kitchen</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-red-500 text-lg">✕</span>
                <span>No swimming pool or fitness facilities</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-red-500 text-lg">✕</span>
                <span>No traditional reception desk</span>
              </li>
            </ul>
          </div>

          {/* Yes */}
          <div
            className="
              reveal-up
              p-10
              rounded-2xl
              bg-white/85
              backdrop-blur-sm
              shadow-[0_30px_80px_rgba(0,0,0,0.08)]
            "
            style={{ animationDelay: "300ms" }}
          >
            <h3 className="h3-card mb-8 text-[#857416]">
              What we do offer
            </h3>

            <ul className="body-lg space-y-4 text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-green-600 text-lg">✓</span>
                <span>Microwave, fridge, and essential utensils</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-green-600 text-lg">✓</span>
                <span>Fast delivery from trusted local restaurants</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-green-600 text-lg">✓</span>
                <span>Full focus on your comfort and privacy</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
