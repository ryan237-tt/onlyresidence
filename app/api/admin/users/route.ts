// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { requireSuperAdmin } from "@/app/lib/admin-auth";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export async function GET() {
  const admin = await requireSuperAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = await pool.query(
    "SELECT id, email, is_super, created_at FROM admin_user ORDER BY created_at DESC"
  );

  return NextResponse.json({ admins: res.rows });
}

export async function POST(req: Request) {
  const admin = await requireSuperAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email, password } = await req.json();

  const cleanEmail = String(email ?? "").toLowerCase().trim();
  const cleanPassword = String(password ?? "");

  if (!cleanEmail || !cleanEmail.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (cleanPassword.length < 10) {
    return NextResponse.json({ error: "Password too short (min 10)" }, { status: 400 });
  }

  const passwordHash = bcrypt.hashSync(cleanPassword, 10);

  try {
    await pool.query(
      `INSERT INTO admin_user (id, email, password_hash, is_super)
       VALUES ($1, $2, $3, false)`,
      [randomUUID(), cleanEmail, passwordHash]
    );
  } catch (e: any) {
    // email unique
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}
