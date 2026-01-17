import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await pool.query("DELETE FROM admin_user WHERE id = $1", [id]);

  return NextResponse.json({ ok: true });
}
