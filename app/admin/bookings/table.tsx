"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sendPaymentConfirmedWhatsApp } from "@/app/lib/sendPaymentConfirmedWhatsApp";



type BookingRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  total: number;
  paymentMethod: string;
  paymentStatus: "PENDING" | "PAID" | "CANCELLED";
  createdAt: string;
};

function badge(status: BookingRow["paymentStatus"]) {
  if (status === "PAID") return "bg-green-100 text-green-700 border-green-200";
  if (status === "CANCELLED") return "bg-red-100 text-red-700 border-red-200";
  return "bg-yellow-100 text-yellow-800 border-yellow-200";
}

export default function AdminBookingsTable() {
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/bookings", {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    
const data = await res.json();
setRows(data.bookings ?? []);


    setLoading(false);
  }

  async function setStatus(
  booking: BookingRow,
  paymentStatus: BookingRow["paymentStatus"]
) {
  await fetch(`/api/admin/bookings/${booking.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_TOKEN!,
    },
    body: JSON.stringify({ paymentStatus }),
  });

  await load(); // refresh UI

  // ✅ SI paiement confirmé → ouvrir WhatsApp
  if (paymentStatus === "PAID") {
    const whatsappUrl = sendPaymentConfirmedWhatsApp({
      phone: booking.phone,
      firstName: booking.firstName,
      bookingId: booking.id,
      checkIn: booking.checkIn.slice(0, 10),
      checkOut: booking.checkOut.slice(0, 10),
      total: booking.total,
    });

    window.open(whatsappUrl, "_blank");
  }
}

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000); // refresh toutes les 5s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-sm text-gray-600">Loading...</div>;

  return (
    <div className="border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-3">Guest</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Total</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">
                  <div className="font-medium">{b.firstName} {b.lastName}</div>
                  <div className="text-gray-600">{b.email}</div>
                  <div className="text-gray-600">{b.phone}</div>
                  <Link
                    href={`/admin/bookings/${b.id}`}
                    className="text-xs text-blue-600 underline hover:text-blue-800"
                  >
                    View booking
                  </Link>

                </td>
                <td className="p-3 text-gray-700">
                  {b.checkIn.slice(0,10)} → {b.checkOut.slice(0,10)}
                </td>
                <td className="p-3 font-semibold">{b.total.toLocaleString("fr-FR")} XAF</td>
                <td className="p-3">{b.paymentMethod}</td>
                <td className="p-3">
                  <span className={`inline-flex px-2 py-1 rounded-lg border ${badge(b.paymentStatus)}`}>
                    {b.paymentStatus}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-2 rounded-xl bg-black text-white"
                      onClick={() => setStatus(b, "PAID")}
                      disabled={b.paymentStatus === "PAID"}
                    >
                      Mark PAID
                    </button>
                    <button
                      className="px-3 py-2 rounded-xl bg-gray-100"
                      onClick={() => setStatus(b, "CANCELLED")}
                      disabled={b.paymentStatus === "CANCELLED"}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-2 rounded-xl bg-gray-100"
                      onClick={() => setStatus(b, "PENDING")}
                      disabled={b.paymentStatus === "PENDING"}
                    >
                      Pending
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="p-6 text-gray-600" colSpan={6}>
                  No bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-gray-50 border-t">
        <button onClick={load} className="px-3 py-2 rounded-xl bg-white border">
          Refresh
        </button>
      </div>
    </div>
  );
}
