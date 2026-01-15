"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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

  useEffect(() => {
    fetch(`/api/bookings/${id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setBooking(d.booking))
      .catch(() => setBooking(null));
  }, [id]);

  if (!booking) {
    return <div className="p-8">Booking not found.</div>;
  }

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const adminLink = `${siteUrl}/admin/bookings/${booking.id}`;

const whatsappMessage = encodeURIComponent(
  [
    "Hello, I want to confirm payment for my booking.",
    "",
    `Booking ID: ${booking.id}`,
    `Guest: ${booking.first_name} ${booking.last_name}`,
    `Dates: ${booking.check_in.slice(0, 10)} → ${booking.check_out.slice(0, 10)}`,
    `Total: ${Number(booking.total).toLocaleString("fr-FR")} XAF`,
    "",
    "Admin booking link:",
    adminLink,
    
  ].join("\n")
);




const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-xl mx-auto border rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Booking created ✅</h1>

        <div className="text-sm space-y-1">
          <div><strong>Name:</strong> {booking.first_name} {booking.last_name}</div>
          <div><strong>Dates:</strong> {booking.check_in.slice(0,10)} → {booking.check_out.slice(0,10)}</div>
          <div><strong>Total:</strong> {booking.total.toLocaleString("fr-FR")} XAF</div>
          <div><strong>Status:</strong> {booking.payment_status}</div>
        </div>

        <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-sm">
          Payment is handled manually.<br />
          Please contact us on WhatsApp to confirm.
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          className="block text-center rounded-xl px-4 py-3 bg-black text-white"
        >
          Confirm payment on WhatsApp
        </a>
      </div>
    </main>
  );
}
