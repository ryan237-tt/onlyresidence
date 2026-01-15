"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Booking = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  total: number;
  payment_method: string;
  payment_status: "PENDING" | "PAID" | "CANCELLED";
};

export default function BookingConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      fetch(`/api/bookings/${id}`, { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          setBooking(data.booking);
          setLoading(false);
        });
    };

    load(); // initial load
    const interval = setInterval(load, 5000); // auto refresh every 5s

    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading booking…</div>;
  }

  if (!booking) {
    return <div className="p-6">Booking not found.</div>;
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-xl mx-auto border rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold">
          Booking confirmation
        </h1>

        <div className="text-sm space-y-1">
          <div><b>Name:</b> {booking.first_name} {booking.last_name}</div>
          <div><b>Dates:</b> {booking.check_in.slice(0,10)} → {booking.check_out.slice(0,10)}</div>
          <div><b>Total:</b> {booking.total.toLocaleString("fr-FR")} XAF</div>
          <div><b>Payment method:</b> {booking.payment_method}</div>
        </div>

        {/* STATUS BLOCK */}
        {booking.payment_status === "PENDING" && (
          <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-yellow-800 text-sm">
            ⏳ Payment pending.  
            Please contact us via WhatsApp to confirm your payment.
          </div>
        )}

        {booking.payment_status === "PAID" && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-green-700 text-sm">
            ✅ Payment confirmed.  
            Your booking is fully validated. We look forward to welcoming you.
          </div>
        )}

        {booking.payment_status === "CANCELLED" && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
            ❌ This booking has been cancelled.
          </div>
        )}
      </div>
    </main>
  );
}
