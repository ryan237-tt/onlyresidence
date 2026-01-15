"use client";

const MAPS_URL = "https://maps.google.com/?q=3.9104212,11.5004514";

export default function ContactMap() {
  return (
    <section className="py-20 bg-[#F6F6F6]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="reveal-up h2-section text-center mb-10">
          Map & Directions
        </h2>

        {/* Map container */}
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-6 group">
          <iframe
            title="Vita Resort location"
            src="https://www.google.com/maps?q=3.9104212,11.5004514&z=16&output=embed"
            width="100%"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none"
          />

          {/* Click overlay */}
          <a
            href={MAPS_URL}
            target="_blank"
            aria-label="Open in Google Maps"
            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition"
          >
            <span className="opacity-0 group-hover:opacity-100 transition bg-white px-6 py-3 rounded-lg font-accent text-sm">
              Open in Google Maps
            </span>
          </a>
        </div>

        <p className="body text-center text-gray-600 italic">
          If you hesitate at any turn, call us — we guide you live.
        </p>

        <div className="text-center mt-6">
          <a
            href={MAPS_URL}
            target="_blank"
            className="inline-block px-8 py-4 bg-[#857416] text-black font-semibold rounded-lg hover:opacity-90 transition"
          >
            Open Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
