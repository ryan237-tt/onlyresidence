import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

function esc(s: string) {
  return String(s ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function yyyymmdd(dateISO: string) {
  return dateISO.replaceAll("-", "");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!process.env.ICAL_TOKEN || token !== process.env.ICAL_TOKEN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const bookingsRes = await pool.query(
    `SELECT id, first_name, last_name, check_in::date as check_in, check_out::date as check_out, payment_status
     FROM booking
     ORDER BY check_in ASC`
  );

  const blocksRes = await pool.query(
    `SELECT id, start_date, end_date, note
     FROM booking_block
     ORDER BY start_date ASC`
  );

  const lines: string[] = [];
  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//Vita Resort//Calendar//EN");

  for (const b of bookingsRes.rows) {
    const start = String(b.check_in);
    const end = String(b.check_out); // exclusive
    const summary = `Booking (${String(b.payment_status).toUpperCase()}) - ${b.first_name} ${b.last_name}`;
    const uid = `booking-${b.id}@vitaresort`;

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${esc(uid)}`);
    lines.push(`DTSTART;VALUE=DATE:${yyyymmdd(start)}`);
    lines.push(`DTEND;VALUE=DATE:${yyyymmdd(end)}`);
    lines.push(`SUMMARY:${esc(summary)}`);
    lines.push("END:VEVENT");
  }

  for (const x of blocksRes.rows) {
    const start = String(x.start_date);
    const end = String(x.end_date); // exclusive
    const summary = `BLOCKED - ${x.note ? String(x.note) : "Unavailable"}`;
    const uid = `block-${x.id}@vitaresort`;

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${esc(uid)}`);
    lines.push(`DTSTART;VALUE=DATE:${yyyymmdd(start)}`);
    lines.push(`DTEND;VALUE=DATE:${yyyymmdd(end)}`);
    lines.push(`SUMMARY:${esc(summary)}`);
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
