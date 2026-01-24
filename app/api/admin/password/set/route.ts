import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(password, 10);

  const res = await pool.query(
    `
    UPDATE admin_user
    SET password_hash = $1
    WHERE email = $2
    RETURNING id
    `,
    [hash, email]
  );

  if (res.rowCount === 0) {
    return NextResponse.json(
      { error: "Admin not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true });
}
