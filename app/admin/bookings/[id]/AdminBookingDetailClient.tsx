"use client";

import { useEffect, useState } from "react";

export default function AdminBookingDetailClient({ id }: { id: string }) {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setBooking(data.booking ?? null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000); // 🔁 auto-refresh
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!booking) return <div className="p-6">Booking not found.</div>;

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold">
        Booking #{booking.id}
      </h1>

      <div className="space-y-2 text-sm">
        <div><b>Guest:</b> {booking.first_name} {booking.last_name}</div>
        <div><b>Email:</b> {booking.email}</div>
        <div><b>Phone:</b> {booking.phone}</div>
        <div>
          <b>Dates:</b>{" "}
          {String(booking.check_in).slice(0, 10)} →{" "}
          {String(booking.check_out).slice(0, 10)}
        </div>
        <div><b>Total:</b> {booking.total} XAF</div>
        <div><b>Status:</b> {booking.payment_status}</div>
      </div>

      {booking.payment_status === "PAID" && (
        <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-green-700 text-sm">
          ✅ Payment confirmed. Booking fully validated.
        </div>
      )}

      {booking.payment_status === "PENDING" && (
        <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-yellow-700 text-sm">
          ⏳ Payment pending.
        </div>
      )}

      {booking.payment_status === "CANCELLED" && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          ❌ Booking cancelled.
        </div>
      )}
    </main>
  );
}
