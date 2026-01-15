import type { GuestInfo, PaymentMethod } from "../lib/types";

export type CreateBookingPayload = {
  checkIn: string;
  checkOut: string;
  guest: GuestInfo;
  paymentMethod: PaymentMethod;
  total: number;
};

export type CreateBookingResponse = {
  bookingId: string;
};
/**
 * 
*/

export async function getBooking(id: string) {
  const res = await fetch(`/api/bookings/${id}`, { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? "Fetch failed");
  return data.booking as {
    id: string;
    paymentStatus: "PENDING" | "PAID" | "CANCELLED";
    total: number;
  };
}

/**
 * 
*/
export async function getBookedRanges(): Promise<{ from: string; to: string }[]> {
  const res = await fetch("/api/calendar", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load unavailable dates");

  const data = await res.json();
  return data.ranges ?? [];

}


/**
 * Check availibility
 * @param payload 
 * @returns 
*/

export async function checkAvailability(
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  const res = await fetch("/api/availability", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ checkIn, checkOut }),
  });

  if (!res.ok) {
    throw new Error("Availability check failed");
  }

  const data = await res.json();
  return data.available === true;
}


/**
 * In production:
 * - This function would call your backend endpoint:
 *   POST /api/bookings
 * - Backend would store booking and return bookingId
 */
export async function createBooking(payload: CreateBookingPayload): Promise<CreateBookingResponse> {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error ?? "Booking failed");
  }

  return data as CreateBookingResponse;
}
