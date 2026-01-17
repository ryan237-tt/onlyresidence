import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { cookies } from "next/headers";
import { requireAdmin } from "@/app/lib/admin-auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await pool.query(`DELETE FROM blocked_dates WHERE id = $1`, [id]);

  return NextResponse.json({ ok: true });
}
