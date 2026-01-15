"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MonthCalendar, { type BookingRow, type DaySelection } from "./MonthCalendar";

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function expandRange(start: string, end: string) {
  const out: string[] = [];
  const s = new Date(start + "T00:00:00");
  const e = new Date(end + "T00:00:00");

  for (let d = new Date(s); d <= e; d = addDays(d, 1)) {
    out.push(iso(d));
  }
  return out;
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function startOfWeekSunday(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - x.getDay());
  return x;
}

function daterangeDays(fromISO: string, toISO: string) {
  const out: string[] = [];
  const from = new Date(fromISO + "T00:00:00");
  const to = new Date(toISO + "T00:00:00");
  for (let d = new Date(from); d < to; d = addDays(d, 1)) out.push(iso(d));
  return out;
}

export default function CalendarBooking() {
  const [view, setView] = useState<"month" | "week">("month");
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [blockedDays, setBlockedDays] = useState<Map<string, string | null>>(new Map());
  const [blockedDayToId, setBlockedDayToId] = useState<Map<string, string>>(new Map());

  const [selected, setSelected] = useState<DaySelection | null>(null);
  const [loading, setLoading] = useState(false);


  const [blockModalDay, setBlockModalDay] = useState<string | null>(null);
  const [blockModalReason, setBlockModalReason] = useState("");
  const [blockModalId, setBlockModalId] = useState<string | null>(null);


  // ================= LOAD BOOKINGS =================
  async function load() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/bookings", { cache: "no-store" });
      const data = await res.json();

      const normalized: BookingRow[] = (data.bookings ?? []).map((b: any) => ({
        id: String(b.id),
        check_in: String(b.checkIn).slice(0, 10),
        check_out: String(b.checkOut).slice(0, 10),
        payment_status: String(b.paymentStatus).toUpperCase(),
      }));

      setBookings(normalized);
    } catch (e) {
      console.error("Failed to load bookings", e);
    } finally {
      setLoading(false);
    }
  }

  // ================= LOAD BLOCKED DAYS =================
  async function loadBlockedDays() {
    const res = await fetch("/api/admin/calendar-block", { cache: "no-store" });
    const data = await res.json();

    const reasonMap = new Map<string, string | null>();
    const idMap = new Map<string, string>();

    for (const b of data.blocks ?? []) {
      for (const day of expandRange(
        String(b.startDate).slice(0, 10),
        String(b.endDate).slice(0, 10)
      )) {
        reasonMap.set(day, b.reason ?? null);
        idMap.set(day, String(b.id));
      }
    }

    setBlockedDays(reasonMap);
    setBlockedDayToId(idMap);
  }


  // ================= TOGGLE BLOCK =================
  function toggleBlock(day: string) {
    // 👉 si déjà bloqué : ouvrir la modal d’édition
    if (blockedDays.has(day)) {
      setBlockModalDay(day);
      setBlockModalReason(blockedDays.get(day) ?? "");
      setBlockModalId(blockedDayToId.get(day) ?? null);
      return;
    }

    // 👉 sinon : créer un nouveau bloc (1 jour)
    const reason = prompt("Reason for blocking (optional):") ?? null;

    fetch("/api/admin/calendar-block", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: day,
        endDate: day,
        reason,
      }),
    }).then(loadBlockedDays);
  }


  useEffect(() => {
    load();
    loadBlockedDays();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  // ================= MAP BOOKINGS PER DAY =================
  const dayBookings = useMemo(() => {
    const map = new Map<string, BookingRow[]>();

    for (const b of bookings) {
      for (const day of daterangeDays(b.check_in, b.check_out)) {
        const arr = map.get(day) ?? [];
        arr.push(b);
        map.set(day, arr);
      }
    }

    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => {
        const pa =
          a.payment_status === "PAID" ? 0 : a.payment_status === "PENDING" ? 1 : 2;
        const pb =
          b.payment_status === "PAID" ? 0 : b.payment_status === "PENDING" ? 1 : 2;
        return pa - pb;
      });
      map.set(k, arr);
    }

    return map;
  }, [bookings]);

  function monthLabel() {
    return cursor.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  // ================= WEEK VIEW (UNCHANGED) =================
  function renderWeek() {
    const start = startOfWeekSunday(cursor);
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

    return (
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const dayISO = iso(d);
          const arr = dayBookings.get(dayISO) ?? [];
          const isBlocked = blockedDays.has(dayISO);

          const primary = arr[0];
          const bg = isBlocked
            ? "bg-gray-300 border-gray-400"
            : primary?.payment_status === "PAID"
            ? "bg-green-100 border-green-400"
            : primary?.payment_status === "PENDING"
            ? "bg-yellow-100 border-yellow-400"
            : "bg-white border-gray-200";

          return (
            <button
              key={dayISO}
              onClick={() =>
                isBlocked
                  ? toggleBlock(dayISO)
                  : arr.length
                  ? setSelected({ day: dayISO, bookings: arr })
                  : toggleBlock(dayISO)
              }
              className={`border rounded-xl p-3 min-h-[120px] text-left hover:ring-2 hover:ring-black ${bg}`}
            >
              <div className="text-lg font-semibold">{d.getDate()}</div>
              <div className="text-[11px] text-gray-600 hidden sm:block">
                {dayISO}
              </div>

              <div className="mt-2 text-[11px] text-gray-700">
                {isBlocked ? (
                  <span className="font-semibold">🚫 Blocked</span>
                ) : arr.length ? (
                  <span>
                    {arr.length} booking{arr.length > 1 ? "s" : ""} —{" "}
                    {primary?.payment_status}
                  </span>
                ) : (
                  <span className="text-gray-400">Available</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  // ================= RENDER =================
  return (
    <main className="min-h-screen bg-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Admin Calendar</h1>
            <p className="text-sm text-gray-600">
              Green = PAID, Yellow = PENDING, Gray = BLOCKED
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 rounded-xl border"
              onClick={() =>
                setCursor(view === "month" ? addMonths(cursor, -1) : addDays(cursor, -7))
              }
            >
              ←
            </button>

            <div className="text-sm font-semibold min-w-[160px] text-center">
              {monthLabel()}
            </div>

            <button
              className="px-3 py-2 rounded-xl border"
              onClick={() =>
                setCursor(view === "month" ? addMonths(cursor, 1) : addDays(cursor, 7))
              }
            >
              →
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setView("month")}
            className={`px-4 py-2 rounded-lg border ${
              view === "month" ? "bg-black text-white" : "bg-white"
            }`}
          >
            Month
          </button>

          <button
            onClick={() => setView("week")}
            className={`px-4 py-2 rounded-lg border ${
              view === "week" ? "bg-black text-white" : "bg-white"
            }`}
          >
            Week
          </button>

          <button onClick={load} className="ml-auto px-4 py-2 rounded-lg border bg-white">
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {view === "month" ? (
          <MonthCalendar
            month={cursor}
            dayBookings={dayBookings}
            blockedDays={blockedDays}
            onToggleBlock={toggleBlock}
            onSelectDay={(sel) => setSelected(sel)}
          />
        ) : (
          renderWeek()
        )}
      </div>

      {/* ================= MODAL (UNCHANGED) ================= */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center p-2 sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl p-5 w-full max-w-lg space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Details — {selected.day}</h2>
                <p className="text-sm text-gray-600">
                  {selected.bookings.length} booking(s)
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="px-3 py-2 rounded-lg border"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              {selected.bookings.map((b) => (
                <div key={b.id} className="border rounded-xl p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold">Booking #{b.id}</div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${
                        b.payment_status === "PAID"
                          ? "bg-green-50 border-green-200"
                          : b.payment_status === "PENDING"
                          ? "bg-yellow-50 border-yellow-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      {b.payment_status}
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <div>
                      <b>Check-in:</b> {b.check_in}
                    </div>
                    <div>
                      <b>Check-out:</b> {b.check_out}
                    </div>
                  </div>

                  <div className="mt-3">
                    <Link
                      href={`/admin/bookings/${b.id}`}
                      className="text-blue-700 underline text-sm"
                    >
                      Open booking record
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {blockModalDay && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-full max-w-sm space-y-4">
            <h2 className="text-lg font-semibold">
              Edit block — {blockModalDay}
            </h2>

            <input
              value={blockModalReason}
              onChange={(e) => setBlockModalReason(e.target.value)}
              placeholder="Reason (optional)"
              className="w-full border rounded px-3 py-2"
            />

            <div className="flex justify-between gap-2">
              <button
                onClick={async () => {
                  if (!blockModalId) return;
                  await fetch(`/api/admin/calendar-block?id=${blockModalId}`, {
                    method: "DELETE",
                  });
                  setBlockModalDay(null);
                  await loadBlockedDays();
                }}
                className="px-3 py-2 border border-red-300 text-red-600 rounded"
              >
                Unblock
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setBlockModalDay(null)}
                  className="px-3 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    if (!blockModalId) return;
                    await fetch(`/api/admin/calendar-block?id=${blockModalId}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ reason: blockModalReason || null }),
                    });
                    setBlockModalDay(null);
                    await loadBlockedDays();
                  }}
                  className="px-3 py-2 bg-black text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
