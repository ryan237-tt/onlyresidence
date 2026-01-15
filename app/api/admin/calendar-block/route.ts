import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

// Auth helper
async function requireAdmin() {
  const token = (await cookies()).get("admin_token")?.value;
  if (token !== process.env.ADMIN_TOKEN) {
    throw new Error("UNAUTHORIZED");
  }
}

/* ================= GET BLOCKS ================= */
export async function GET() {
  const res = await pool.query(
    "SELECT * FROM blocked_dates ORDER BY start_date ASC"
  );

  return NextResponse.json({
    blocks: res.rows.map((b) => ({
      id: b.id,
      startDate: b.start_date.toLocaleDateString("en-CA"),
      endDate: b.end_date.toLocaleDateString("en-CA"),

      reason: b.reason,
      createdAt: b.created_at,
    })),
  });
}

/* ================= CREATE BLOCK ================= */
export async function POST(req: Request) {
  const { startDate, endDate, reason } = await req.json();

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "startDate and endDate are required" },
      { status: 400 }
    );
  }

  // Prevent overlap with bookings
  const overlap = await pool.query(
    `
    SELECT 1 FROM booking
    WHERE check_in < $2::date AND check_out > $1::date
    LIMIT 1
    `,
    [startDate, endDate]
  );

  if (overlap.rows.length > 0) {
    return NextResponse.json(
      { error: "Cannot block dates with existing bookings" },
      { status: 409 }
    );
  }

  await pool.query(
    `
    INSERT INTO blocked_dates (id, start_date, end_date, reason)
    VALUES ($1, $2::date, $3::date, $4)
    `,
    [randomUUID(), startDate, endDate, reason ?? null]
  );

  return NextResponse.json({ ok: true });
}

/* ================= DELETE BLOCK ================= */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await pool.query("DELETE FROM blocked_dates WHERE id = $1", [id]);

  return NextResponse.json({ ok: true });
}
