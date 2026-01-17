// import { NextResponse } from "next/server";
// import { pool } from "@/app/lib/db";
// import { validateDates, isValidEmail, isValidPhone } from "@/app/lib/validation";
// import { calculatePricing } from "@/app/lib/pricing";
// import { randomUUID } from "crypto";
// import { headers } from "next/headers";
// import { rateLimit } from "@/app/lib/rateLimit";

// /* =========================
//    CREATE BOOKING (POST)
// ========================= */
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
//     const rl = rateLimit(`availability:${ip}`, 80, 60_000);
//     if (!rl.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });      const { checkIn, checkOut, guest, paymentMethod } = body;

//     // Validation
//     const err = validateDates(checkIn, checkOut);
//     if (err) return NextResponse.json({ error: err }, { status: 400 });

//     if (!guest || !guest.firstName || !guest.lastName) {
//       return NextResponse.json({ error: "Guest info missing" }, { status: 400 });
//     }
//     if (!isValidEmail(guest.email)) {
//       return NextResponse.json({ error: "Invalid email" }, { status: 400 });
//     }
//     if (!isValidPhone(guest.phone)) {
//       return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
//     }

//     // Overlap check
//     const overlap = await pool.query(
//       `
//       SELECT 1 FROM booking
//       WHERE check_in < $2 AND check_out > $1
//       LIMIT 1
//       `,
//       [checkIn, checkOut]
//     );

//     if (overlap.rows.length > 0) {
//       return NextResponse.json(
//         { error: "Dates not available" },
//         { status: 409 }
//       );
//     }


//     const pricing = calculatePricing(checkIn, checkOut);
//     const id = randomUUID();

//     // Insert booking
//     await pool.query(
//       `
//       INSERT INTO booking
//       (id, check_in, check_out, first_name, last_name, email, phone, payment_method, total)
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
//       `,
//       [
//         id,
//         checkIn,
//         checkOut,
//         guest.firstName,
//         guest.lastName,
//         guest.email,
//         guest.phone,
//         paymentMethod,
//         pricing.total,
//       ]
//     );

//     // Emails
//     // await sendBookingEmails({
//     //   bookingId: id,
//     //   checkIn,
//     //   checkOut,
//     //   total: pricing.total,
//     //   paymentMethod,
//     //   guest,
//     // });

//     return NextResponse.json({ bookingId: id });
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ error: "Booking failed" }, { status: 500 });
//   }
// }

// /* =========================
//    LIST BOOKINGS (GET)
// ========================= */
// export async function GET() {
//   const res = await pool.query(
//     `SELECT * FROM booking ORDER BY created_at DESC LIMIT 200`
//   );
//   return NextResponse.json({ bookings: res.rows });
// }
