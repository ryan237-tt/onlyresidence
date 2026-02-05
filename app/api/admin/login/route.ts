import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "Email required" },
      { status: 400 }
    );
  }

  const res = await pool.query(
    `
    SELECT id, password_hash
    FROM admin_user
    WHERE email = $1
    `,
    [email]
  );

  if (res.rows.length === 0) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const admin = res.rows[0];

  // 🔴 CAS : password jamais défini
  if (!admin.password_hash) {
    return NextResponse.json(
      { code: "PASSWORD_NOT_SET" },
      { status: 403 }
    );
  }

  if (!password) {
    return NextResponse.json(
      { error: "Password required" },
      { status: 400 }
    );
  }

  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // TODO: créer session / cookie ici

  return NextResponse.json({ ok: true });
}
