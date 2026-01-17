import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { cookies } from "next/headers";
import { requireAdmin } from "@/app/lib/admin-auth";

export async function GET() {

    const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await pool.query(`
    SELECT id, check_in, check_out, payment_status
    FROM booking
    WHERE payment_status != 'CANCELLED'
    ORDER BY check_in ASC
  `);

  return NextResponse.json({ bookings: res.rows });
}
