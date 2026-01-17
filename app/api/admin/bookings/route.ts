
import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { requireAdmin } from "@/app/lib/admin-auth";



export async function GET() {
     const res = await pool.query( "SELECT * FROM booking ORDER BY created_at DESC LIMIT 500" ); 
     
      const admin = await requireAdmin();
      if (!admin) {
         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
     const bookings = res.rows.map((b) => ({ 
        id: b.id,
        firstName: b.first_name, 
        lastName: b.last_name, 
        email: b.email, phone: 
        b.phone, checkIn: 
        b.check_in, checkOut: 
        b.check_out, total: 
        b.total, paymentMethod: 
        b.payment_method, 
        paymentStatus: String(b.payment_status).toUpperCase(), createdAt: b.created_at, })); 
        return NextResponse.json({ bookings }); }