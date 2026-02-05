import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { rateLimit } from "@/app/lib/rateLimit";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 🛑 email requis
  if (!email) {
    return NextResponse.json(
      { error: "Email required" },
      { status: 400 }
    );
  }

  // 🔐 rate limit
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (!rateLimit(`admin_login_ip:${ip}`, 20, 60_000).ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!rateLimit(`admin_login_email:${email}`, 10, 60_000).ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // 🔎 fetch admin
  const res = await pool.query(
    `
    SELECT
      id,
      email,
      password_hash,
      failed_login_count,
      locked_until
    FROM admin_user
    WHERE email = $1
    LIMIT 1
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

  // 🔒 account locked
  if (admin.locked_until && new Date(admin.locked_until) > new Date()) {
    return NextResponse.json(
      { error: "Account temporarily locked" },
      { status: 423 }
    );
  }

  // 🟡 PREMIÈRE CONNEXION → SET PASSWORD
  if (!admin.password_hash) {
    return NextResponse.json(
      { code: "PASSWORD_NOT_SET" },
      { status: 403 }
    );
  }

  // 🛑 password requis maintenant seulement
  if (!password) {
    return NextResponse.json(
      { error: "Password required" },
      { status: 400 }
    );
  }

  // ❌ wrong password
  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) {
    await pool.query(
      `
      UPDATE admin_user
      SET failed_login_count = failed_login_count + 1,
          locked_until = CASE
            WHEN failed_login_count + 1 >= 8
              THEN NOW() + INTERVAL '15 minutes'
            ELSE locked_until
          END
      WHERE id = $1
      `,
      [admin.id]
    );

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // ✅ success → reset counters
  await pool.query(
    `
    UPDATE admin_user
    SET failed_login_count = 0,
        locked_until = NULL
    WHERE id = $1
    `,
    [admin.id]
  );

  const response = NextResponse.json({ ok: true });

  response.cookies.set("admin_id", admin.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
