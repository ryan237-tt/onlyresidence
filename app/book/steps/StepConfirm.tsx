"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useBookingStore } from "../bookingStore";
import { getBooking } from "@/app/lib/api";

type PaymentStatus = "PENDING" | "PAID" | "CANCELLED";

export default function StepConfirm() {
  const { bookingId, reset } = useBookingStore();

  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ ENV
  const phone =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "237659099178";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "http://localhost:3000";

const adminLink = `${siteUrl}/admin/bookings/${bookingId}`;


  // 🔁 Refresh booking status
  async function refresh() {
    if (!bookingId) return;
    setLoading(true);

    try {
      const b = await getBooking(bookingId);
      setStatus(b.paymentStatus);
      setTotal(b.total);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  // 🟢 Badge UI
  const badge =
    status === "PAID"
      ? "bg-green-100 text-green-700 border-green-200"
      : status === "CANCELLED"
      ? "bg-red-100 text-red-700 border-red-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200";

  // 📲 WhatsApp message (ADMIN LINK INCLUDED)
  const whatsappMessage = encodeURIComponent(
    [
      "Hello Vita Resort,",
      "",
      "I want to confirm payment for my booking.",
      "",
      `Booking ID: ${bookingId}`,
      `Total: ${total} XAF`,
      "",
      "Admin booking link:",
      adminLink, // 👈 SEUL SUR SA LIGNE
      "",
      "Thank you.",
    ].join("\n")
  );


const whatsappUrl = `https://wa.me/${phone}?text=${whatsappMessage}`;

  // ⛔ No booking
  if (!bookingId) {
    return (
      <div className="p-6 text-center text-gray-600">
        No booking found.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold">
        Booking received ✅
      </h2>

      <p className="text-gray-600 mt-2">
        Your reservation has been created.  
        Payment will be completed with our team via WhatsApp.
      </p>

      <div className="mt-4 inline-flex flex-col items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 bg-gray-50">
        <div className="text-sm text-gray-600">Booking ID</div>
        <div className="text-sm font-semibold">{bookingId}</div>

        {status && (
          <div className={`mt-2 inline-flex px-2 py-1 rounded-lg border ${badge}`}>
            Payment: {status}
          </div>
        )}
      </div>

      {/* STATUS MESSAGE */}
      {status === "PAID" && (
        <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4 text-green-700 text-sm">
          ✅ Payment confirmed. Your booking is fully validated.
        </div>
      )}

      {status === "PENDING" && (
        <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-yellow-700 text-sm">
          ⏳ Payment pending. Please contact us via WhatsApp.
        </div>
      )}

      {status === "CANCELLED" && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          ❌ Booking cancelled.
        </div>
      )}

      {/* ACTIONS */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-xl font-semibold bg-green-600 text-white hover:opacity-90 transition"
        >
          Continue on WhatsApp
        </a>

        <button
          onClick={refresh}
          disabled={loading}
          className="px-5 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
        >
          Refresh status
        </button>

        <button
          onClick={reset}
          className="px-5 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 transition"
        >
          Make another booking
        </button>

        <Link
          href="/"
          className="px-5 py-3 rounded-xl font-semibold bg-black text-white hover:opacity-90 transition"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
