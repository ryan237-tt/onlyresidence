// app/lib/admin-auth.ts
import { cookies } from "next/headers";
import { pool } from "@/app/lib/db";

export type AdminSession = {
  id: string;
  email: string;
  is_super: boolean;
};

export async function requireAdmin(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const adminId = cookieStore.get("admin_id")?.value;
  if (!adminId) return null;

  const res = await pool.query(
    "SELECT id, email, is_super FROM admin_user WHERE id = $1 LIMIT 1",
    [adminId]
  );

  return res.rows[0] ?? null;
}

export async function requireSuperAdmin(): Promise<AdminSession | null> {
  const admin = await requireAdmin();
  if (!admin) return null;
  if (!admin.is_super) return null;
  return admin;
}
