import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { requireAdmin } from "@/app/lib/admin-auth";

export async function GET() {
  
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  const res = await pool.query(
    `SELECT * FROM blocked_dates ORDER BY start_date ASC`
  );

  return NextResponse.json({ blocks: res.rows });
}

export async function POST(req: Request) {
  const token = (await cookies()).get("admin_token")?.value;
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { startDate, endDate, reason } = await req.json();

  await pool.query(
    `
    INSERT INTO blocked_dates (id, start_date, end_date, reason)
    VALUES ($1, $2, $3, $4)
    `,
    [randomUUID(), startDate, endDate, reason ?? null]
  );

  return NextResponse.json({ ok: true });
}
