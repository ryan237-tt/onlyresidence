import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const { startDate, endDate, reason } = await req.json();

  await pool.query(
    `INSERT INTO blocked_dates (id, start_date, end_date, reason)
     VALUES ($1, $2, $3, $4)`,
    [randomUUID(), startDate, endDate, reason]
  );

  return NextResponse.json({ ok: true });
}

export async function GET() {
  // bookings
  const bookings = await pool.query(`
    SELECT
      check_in::date as from,
      check_out::date as to
    FROM booking
    WHERE payment_status != 'CANCELLED'
  `);

  // blocks
  const blocks = await pool.query(`
    SELECT
      start_date as from,
      end_date as to
    FROM booking_block
  `);

  const ranges = [
    ...bookings.rows.map((r) => ({
      from: String(r.from),
      to: String(r.to),
    })),
    ...blocks.rows.map((r) => ({
      from: String(r.from),
      to: String(r.to),
    })),
  ];

  return NextResponse.json({ ranges });
}

