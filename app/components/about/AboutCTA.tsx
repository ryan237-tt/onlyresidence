import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="py-20 bg-black text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="reveal-up font-display text-3xl md:text-4xl mb-8">
          Ready to experience Vita?
        </h2>

        <Link
          href="/contact"
          className="reveal-up inline-block px-12 py-4 bg-[#E6C200] text-black font-accent rounded-full hover:translate-y-[-2px] transition"
        >
          Reserve the Suite
        </Link>
      </div>
    </section>
  );
}
