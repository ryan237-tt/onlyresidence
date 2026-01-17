import { pool } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await pool.query("DELETE FROM admin_user WHERE id = $1", [params.id]);
  return NextResponse.json({ ok: true });
}
