// import { pool } from "@/app/lib/db";
// import { NextResponse } from "next/server";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   await pool.query("DELETE FROM admin_user WHERE id = $1", [params.id]);
//   return NextResponse.json({ ok: true });
// }
import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { requireSuperAdmin } from "@/app/lib/admin-auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await requireSuperAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  // 🔒 Sécurité : ne pas se supprimer soi-même
  if (id === admin.id) {
    return NextResponse.json(
      { error: "You cannot delete yourself" },
      { status: 400 }
    );
  }

  await pool.query("DELETE FROM admin_user WHERE id = $1", [id]);

  return NextResponse.json({ ok: true });
}
