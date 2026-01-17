// app/api/admin/users/[id]/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { requireSuperAdmin } from "@/app/lib/admin-auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireSuperAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  // Ne jamais supprimer soi-même (super admin)
  if (id === admin.id) {
    return NextResponse.json({ error: "You cannot delete yourself" }, { status: 400 });
  }

  await pool.query("DELETE FROM admin_user WHERE id = $1", [id]);

  return NextResponse.json({ ok: true });
}
