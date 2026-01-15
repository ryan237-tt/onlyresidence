"use client";

import { useMemo, useState } from "react";
import { useBookingStore } from "../bookingStore";
import { calculatePricing, formatXAF } from "@/app/lib/pricing";
import { createBooking } from "@/app/lib/api";

export default function StepPayment() {
  const {
    checkIn,
    checkOut,
    guest,
    paymentMethod,
    setPaymentMethod,
    setBookingId,
    nextStep,
    prevStep,
  } = useBookingStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pricing = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    return calculatePricing(checkIn, checkOut);
  }, [checkIn, checkOut]);

  if (!checkIn || !checkOut || !guest || !pricing) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Payment</h2>
        <p className="text-gray-600 mt-2">
          Missing booking information. Please go back and complete previous steps.
        </p>
        <div className="mt-6">
          <button
            onClick={prevStep}
            className="px-5 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 transition"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  async function handleConfirm() {
    // Narrow inside the function (TypeScript-safe)
    const ci = checkIn;
    const co = checkOut;
    const g = guest;
    const p = pricing;
    const pm = paymentMethod;

    if (!pm) {
      setError("Please choose a payment method.");
      return;
    }

    if (!ci || !co || !g || !p) {
      setError("Missing booking information.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await createBooking({
        checkIn: ci,
        checkOut: co,
        guest: g,
        paymentMethod: pm,
        total: p.total,
      });

      setBookingId(res.bookingId);
      nextStep();
    } catch (e: any) {
      setError(e?.message ?? "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Payment</h2>
      <p className="text-gray-600 mt-1">
        Choose a payment method. Payment will be completed with our team via WhatsApp after booking.
      </p>

      <div className="mt-6 rounded-2xl border border-gray-200 p-5 bg-gray-50">
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Dates</span>
            <span className="font-medium">{checkIn} → {checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span>Guest</span>
            <span className="font-medium">{guest.firstName} {guest.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span>Nights</span>
            <span className="font-medium">{pricing.nights}</span>
          </div>
          <div className="flex justify-between">
            <span>Price/night</span>
            <span className="font-medium">{formatXAF(pricing.pricePerNight)}</span>
          </div>
          <div className="h-px bg-gray-200 my-2" />
          <div className="flex justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatXAF(pricing.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Choose payment method</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <PaymentCard active={paymentMethod === "cash"} title="Cash" subtitle="Pay at check-in" onClick={() => setPaymentMethod("cash")} />
          <PaymentCard active={paymentMethod === "mobile_money"} title="Mobile Money" subtitle="MTN / Orange" onClick={() => setPaymentMethod("mobile_money")} />
          <PaymentCard active={paymentMethod === "card"} title="Card" subtitle="Visa / Mastercard (manual now)" onClick={() => setPaymentMethod("card")} />
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button onClick={prevStep} className="px-5 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 transition" disabled={loading}>
          Back
        </button>

        <button onClick={handleConfirm} disabled={loading} className="px-5 py-3 rounded-xl font-semibold bg-black text-white hover:opacity-90 transition disabled:opacity-50">
          {loading ? "Creating booking..." : "Confirm booking"}
        </button>
      </div>
    </div>
  );
}

function PaymentCard({ active, title, subtitle, onClick }: { active: boolean; title: string; subtitle: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={[
        "text-left rounded-2xl border p-4 transition",
        active ? "border-black bg-white" : "border-gray-200 bg-gray-50 hover:bg-gray-100",
      ].join(" ")}
    >
      <div className="font-semibold">{title}</div>
      <div className="text-xs text-gray-600 mt-1">{subtitle}</div>
    </button>
  );
}
