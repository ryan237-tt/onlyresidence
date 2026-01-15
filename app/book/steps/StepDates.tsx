"use client";

import { useEffect, useMemo, useState } from "react";
import { useBookingStore } from "../bookingStore";
import { validateDates } from "@/app/lib/validation";
import { checkAvailability, getBookedRanges } from "@/app/lib/api";


import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";


function parseLocalDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export default function StepDates() {
  const { setDates, nextStep } = useBookingStore();

  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [bookedRanges, setBookedRanges] = useState<{ from: string; to: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBookedRanges()
      .then((data) => {
        console.log("BOOKED RANGES FROM API:", data);
        setBookedRanges(data);
      })
      .catch((e) => {
        console.error("Failed to load booked ranges", e);
        setBookedRanges([]);
      });
  }, []);

  const selectedCheckIn = range?.from ? toISO(range.from) : "";
  const selectedCheckOut = range?.to ? toISO(range.to) : "";

  const canContinue = useMemo(() => {
    if (!range?.from || !range?.to) return false;
    return validateDates(selectedCheckIn, selectedCheckOut) === null;
  }, [range, selectedCheckIn, selectedCheckOut]);

  // IMPORTANT:
  // - booking.check_out est EXCLUSIF (donc on désactive jusqu’à la veille)
  // - booking_block.end_date chez toi est aussi EXCLUSIF (d’après tes requêtes)
  const blockedMatchers = useMemo(() => {
    return bookedRanges.map((r) => {
      const from = parseLocalDate(r.from);
      const toExclusive = parseLocalDate(r.to);
      const toInclusive = addDays(toExclusive, -1);
      return { from, to: toInclusive };
    });
  }, [bookedRanges]);

  async function handleContinue() {
    if (!range?.from || !range?.to) {
      setError("Please select check-in and check-out.");
      return;
    }

    const msg = validateDates(selectedCheckIn, selectedCheckOut);
    if (msg) {
      setError(msg);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const available = await checkAvailability(selectedCheckIn, selectedCheckOut);
      if (!available) {
        setError("Selected dates are not available.");
        return;
      }

      setDates(selectedCheckIn, selectedCheckOut);
      nextStep();
    } catch {
      setError("Could not check availability. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Select your stay dates</h2>
      <p className="text-gray-600 mt-1">Unavailable dates are disabled automatically.</p>

      <div className="mt-6 rounded-2xl border border-gray-200 p-4 bg-gray-50">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          disabled={blockedMatchers}
          modifiers={{ blocked: blockedMatchers }}
          modifiersClassNames={{ blocked: "rdp-day_blocked" }}
        />
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <div><strong>Check-in:</strong> {selectedCheckIn || "—"}</div>
        <div><strong>Check-out:</strong> {selectedCheckOut || "—"}</div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!canContinue || loading}
          className="px-5 py-3 rounded-xl font-semibold bg-black text-white hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Checking..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
