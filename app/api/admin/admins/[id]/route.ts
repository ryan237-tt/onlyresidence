import { NextResponse, type NextRequest } from "next/server";
import { pool } from "@/app/lib/db";
import { requireSuperAdmin } from "@/app/lib/admin-auth";

// Typage explicite pour le contexte
interface Context {
  params: {
    id: string;
  };
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } } // Typage direct, sans Promise
) {
  const admin = await requireSuperAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = context.params; // Pas besoin d'attendre, car le typage est direct

  if (id === admin.id) {
    return NextResponse.json(
      { error: "You cannot delete yourself" },
      { status: 400 }
    );
  }

  await pool.query("DELETE FROM admin_user WHERE id = $1", [id]);

  return NextResponse.json({ ok: true });
}
