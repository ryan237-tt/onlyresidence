import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { cookies } from "next/headers";
import { requireAdmin } from "@/app/lib/admin-auth";

/* =========================
   GET SINGLE BOOKING (ADMIN)
========================= */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
 const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const res = await pool.query(
    `SELECT * FROM booking WHERE id = $1 LIMIT 1`,
    [id]
  );

  if (res.rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ booking: res.rows[0] });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies(); // ✅

  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { paymentStatus } = await req.json();

  if (!["PAID", "PENDING", "CANCELLED"].includes(paymentStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const res = await pool.query(
    `
    UPDATE booking
    SET payment_status = $1
    WHERE id = $2
    RETURNING *
    `,
    [paymentStatus, id]
  );

  const booking = res.rows[0];



  return NextResponse.json({ ok: true });
}
