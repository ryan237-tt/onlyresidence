"use client";

import Link from "next/link";

export default function BookingHelp() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="font-display text-2xl mb-6">
            Need Help?
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/237694425910"
              target="_blank"
              className="px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:opacity-90 transition"
            >
              WhatsApp
            </a>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-gray-100 font-semibold hover:bg-gray-200 transition"
            >
              View Map
            </Link>

            <Link
              href="/faq"
              className="px-6 py-3 rounded-xl bg-gray-100 font-semibold hover:bg-gray-200 transition"
            >
              FAQ
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          By booking, you agree to our cancellation policy and terms & conditions.
        </p>
      </div>
    </section>
  );
}
