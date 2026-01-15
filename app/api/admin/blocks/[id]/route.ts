import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { cookies } from "next/headers";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = (await cookies()).get("admin_token")?.value;
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await pool.query(`DELETE FROM blocked_dates WHERE id = $1`, [id]);

  return NextResponse.json({ ok: true });
}
