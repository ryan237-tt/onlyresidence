import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ✅ UNWRAP params CORRECTEMENT
  const { id } = await context.params;

  const res = await pool.query(
    `SELECT * FROM booking WHERE id = $1 LIMIT 1`,
    [id]
  );

  if (res.rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ booking: res.rows[0] });
}
