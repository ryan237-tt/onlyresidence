"use client";

const DAY_ROUTE =
  "https://maps.google.com/?q=3.9104212,11.5004514&travelmode=driving";
const NIGHT_ROUTE =
  "https://maps.google.com/?q=3.9104212,11.5004514&travelmode=driving";

export default function ContactVideos() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="reveal-up h2-section mb-8">
          Arrival Guidance
        </h2>

        {/* Day / Night actions */}
        <div className="flex justify-center gap-4 mb-10">
          <a
            href={DAY_ROUTE}
            target="_blank"
            className="px-8 py-4 bg-[#857416] text-black font-accent font-semibold rounded-lg hover:opacity-90 transition"
          >
            Arrive by Day
          </a>

          <a
            href={NIGHT_ROUTE}
            target="_blank"
            className="px-8 py-4 border border-gray-300 font-accent font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Arrive by Night
          </a>
        </div>

        {/* Optional future videos */}
        <div className="bg-gray-200 aspect-video rounded-xl flex items-center justify-center">
          <p className="body text-gray-600">
            Short arrival videos can be added here later
          </p>
        </div>

        <p className="body text-gray-600 mt-6">
          Live guidance available by phone or WhatsApp
        </p>
      </div>
    </section>
  );
}
