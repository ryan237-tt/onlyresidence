"use client";

export type BookingRow = {
  id: string;
  check_in: string;
  check_out: string;
  payment_status: "PAID" | "PENDING" | "CANCELLED";
};

export type DaySelection = {
  day: string;
  bookings: BookingRow[];
};

/* ================= DATE HELPERS (LOCAL SAFE) ================= */

function parseLocalDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function isoLocal(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function endISOExclusive(checkOutISO: string) {
  const d = parseLocalDate(checkOutISO);
  d.setDate(d.getDate() - 1);
  return isoLocal(d);
}

function statusColor(b: BookingRow) {
  if (b.payment_status === "PAID") return "bg-green-500/70";
  if (b.payment_status === "PENDING") return "bg-yellow-500/70";
  return "bg-gray-400/70";
}

/* ================= PROPS ================= */

interface MonthCalendarProps {
  month: Date;

  dayBookings: Map<string, BookingRow[]>;
  onSelectDay: (sel: DaySelection) => void;

  blockedDays: Map<string, string | null>;
  onToggleBlock: (day: string) => void | Promise<void>;
}

/* ================= COMPONENT ================= */

export default function MonthCalendar({
  month,
  dayBookings,
  onSelectDay,
  blockedDays,
  onToggleBlock,

}: MonthCalendarProps) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(new Date(year, monthIndex, d));
  while (cells.length < 42) cells.push(null);


  return (
    <div>
      <div className="grid grid-cols-7 text-[11px] sm:text-xs font-semibold text-gray-600 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0 border rounded-2xl overflow-hidden">
        {cells.map((date, i) => {
          if (!date) {
            return <div key={i} className="h-24 sm:h-28 border border-gray-100 bg-white" />;
          }

          const dayISO = isoLocal(date);
          const bookings = dayBookings.get(dayISO) ?? [];

          // ✅ AJOUT STRICT MINIMUM
          const blockReason = blockedDays.get(dayISO);
          const isBlocked = blockReason !== undefined;

          return (
            <button
              key={dayISO}
              type="button"

              // ✅ tooltip natif (hover)
              title={isBlocked && blockReason ? `Blocked: ${blockReason}` : undefined}

              onClick={(e) => {
  

                e.preventDefault();
                e.stopPropagation();

                if (isBlocked) {
                  onToggleBlock(dayISO);
                  return;
                }

                if (bookings.length > 0) {
                  onSelectDay({ day: dayISO, bookings });
                  return;
                }

                onToggleBlock(dayISO);
              }}


              className={[
                "relative h-24 sm:h-28 border border-gray-100 p-2 text-left",
                "focus:outline-none focus:ring-2 focus:ring-black",
                "cursor-pointer select-none",
                isBlocked
                  ? "bg-blue-100 cursor-grabbing"
                  : "bg-white hover:bg-gray-50",

              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-xs sm:text-sm">{date.getDate()}</div>

                {isBlocked ? (
                  <span className="text-[8px] px-2 py-0.5 rounded-full bg-gray-800 text-white">
                    BLOCKED
                  </span>
                ) : bookings.length > 0 ? (
                  <div className="text-[10px] sm:text-[11px] text-gray-600">
                    {bookings.length} booking{bookings.length > 1 ? "s" : ""}
                  </div>
                ) : (
                  <div className="text-[10px] sm:text-[11px] text-gray-400">Free</div>
                )}
              </div>

              {/* ✅ raison visible DANS la case */}
              {isBlocked && blockReason && (
                <div className="mt-2 text-[10px] text-gray-600 truncate">
                  {blockReason}
                </div>
              )}

              {!isBlocked && bookings.length > 0 && (
                <div className="mt-2 space-y-1">
                  {bookings.slice(0, 3).map((b) => {
                    const start = b.check_in.slice(0, 10);
                    const end = endISOExclusive(b.check_out.slice(0, 10));
                    const isStart = dayISO === start;
                    const isEnd = dayISO === end;

                    return (
                      <div
                        key={`${b.id}-${dayISO}`}
                        className={[
                          "h-2 w-full",
                          statusColor(b),
                          isStart ? "rounded-l-full" : "rounded-l-none",
                          isEnd ? "rounded-r-full" : "rounded-r-none",
                        ].join(" ")}
                      />
                    );
                  })}
                </div>
              )}

              <div className="absolute bottom-2 left-2 text-[10px] text-gray-400 hidden sm:block">
                {dayISO}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
