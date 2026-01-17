import { pool } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export async function GET() {
  const res = await pool.query("SELECT id, email FROM admin_user ORDER BY created_at");
  return NextResponse.json({ admins: res.rows });
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const hash = bcrypt.hashSync(password, 10);

  await pool.query(
    "INSERT INTO admin_user (id, email, password_hash) VALUES ($1, $2, $3)",
    [randomUUID(), email.toLowerCase(), hash]
  );

  return NextResponse.json({ ok: true });
}
