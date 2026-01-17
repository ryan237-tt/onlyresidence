import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await pool.query(
    "SELECT id, email, password_hash FROM admin_user WHERE email = $1 LIMIT 1",
    [email.toLowerCase()]
  );

  const admin = res.rows[0];
  if (!admin) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = bcrypt.compareSync(password, admin.password_hash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  // ✅ COOKIE UNIQUE POUR LA SESSION ADMIN
  response.cookies.set("admin_id", admin.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8h
  });

  return response;
}
