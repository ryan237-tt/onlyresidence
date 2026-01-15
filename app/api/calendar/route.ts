import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function GET() {
  // BOOKINGS (PENDING + PAID)
  const bookings = await pool.query(`
    SELECT
      check_in::date AS from,
      check_out::date AS to
    FROM booking
    WHERE payment_status != 'CANCELLED'
  `);

  // BLOCKED DATES (admin)
  const blocks = await pool.query(`
    SELECT
      start_date AS from,
      end_date AS to
    FROM blocked_dates
  `);

  const ranges = [
    ...bookings.rows.map((r) => ({
      from: r.from.toISOString().slice(0, 10),
      to: r.to.toISOString().slice(0, 10),
    })),
    ...blocks.rows.map((r) => ({
      from: r.from.toISOString().slice(0, 10),
      to: r.to.toISOString().slice(0, 10),
    })),
  ];

  return NextResponse.json({ ranges });
}
