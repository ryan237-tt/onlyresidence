import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  // 🔐 Admin auth
  const token = (await cookies()).get("admin_token")?.value;
  if (token !== process.env.ADMIN_TOKEN) {
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
