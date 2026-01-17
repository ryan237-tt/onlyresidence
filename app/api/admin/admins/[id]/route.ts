import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pool } from "@/app/lib/db";
import { requireSuperAdmin } from "@/app/lib/admin-auth";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await requireSuperAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  // Sécurité : un super admin ne peut pas se supprimer lui-même
  if (id === admin.id) {
    return NextResponse.json(
      { error: "You cannot delete yourself" },
      { status: 400 }
    );
  }

  await pool.query("DELETE FROM admin_user WHERE id = $1", [id]);

  return NextResponse.json({ ok: true });
}
