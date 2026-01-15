"use client";

export default function GalleryHero() {
  return (
    <section className="pt-32 pb-16 bg-[#fbfbf9]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="reveal-up font-display text-5xl md:text-6xl lg:text-7xl mb-6">
          Gallery
        </h1>

        <p
          className="reveal-up body-lg text-gray-600 max-w-3xl mx-auto"
          style={{ animationDelay: "120ms" }}
        >
          Discover every detail of our suite: from the nocturnal LED façade to the dark marble finishes, down to the forest view from your bed.
        </p>
      </div>
    </section>
  );
}
