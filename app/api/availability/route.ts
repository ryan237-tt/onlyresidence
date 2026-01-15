import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { headers } from "next/headers";
import { rateLimit } from "@/app/lib/rateLimit";
import { validateDates } from "@/app/lib/validation";


export async function POST(req: Request) {
  const { checkIn, checkOut } = await req.json();
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = rateLimit(`availability:${ip}`, 80, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const err = validateDates(checkIn, checkOut);
  if (err) return NextResponse.json({ error: err }, { status: 400 });

  // overlap with bookings OR blocks
  const res = await pool.query(
    `
    SELECT 1
    FROM booking
    WHERE check_in::date < $2::date AND check_out::date > $1::date
    LIMIT 1
    `,
    [checkIn, checkOut]
  );

  const res2 = await pool.query(
    `
    SELECT 1
    FROM booking_block
    WHERE start_date < $2::date AND end_date > $1::date
    LIMIT 1
    `,
    [checkIn, checkOut]
  );

  const available = res.rows.length === 0 && res2.rows.length === 0;
  return NextResponse.json({ available });
}

export async function GET() {
  // 1) Bookings: check_in -> check_out (check_out est EXCLUSIF)
  const bookingsRes = await pool.query(
    `
    SELECT
      check_in::date AS "from",
      check_out::date AS "to"
    FROM booking
    WHERE payment_status <> 'CANCELLED'
    ORDER BY check_in ASC
    `
  );

  // 2) Blocks: start_date -> end_date (dans ton iCal tu as indiqué end_date EXCLUSIF)
  const blocksRes = await pool.query(
    `
    SELECT
      start_date::date AS "from",
      end_date::date AS "to"
    FROM booking_block
    ORDER BY start_date ASC
    `
  );

  // 3) Fusion simple: tout devient "unavailable"
  const unavailable = [
    ...bookingsRes.rows,
    ...blocksRes.rows,
  ].map((r) => ({
    from: String(r.from).slice(0, 10),
    to: String(r.to).slice(0, 10),
  }));

  return NextResponse.json({ unavailable }, { headers: { "Cache-Control": "no-store" } });
}

