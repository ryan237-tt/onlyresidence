"use client";

import Link from "next/link";

export default function SuiteCTA() {
  return (
    <section className="py-20 bg-[#1C1B1A] text-white text-center">
      <h2 className="reveal-up h2-section mb-8">
        Ready to experience the suite?
      </h2>

      <Link
        href="/contact"
        className="inline-block mt-4 px-12 py-4 rounded-full bg-[#E6C200] text-black accent"
      >
        Check Availability
      </Link>
    </section>
  );
}
