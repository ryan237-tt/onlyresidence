"use client";

import { useBookingStore } from "./bookingStore";
import StepDates from "./steps/StepDates";
import StepGuest from "./steps/StepGuest";
import StepPayment from "./steps/StepPayment";
import StepConfirm from "./steps/StepConfirm";

function StepHeader() {
  const step = useBookingStore((s) => s.step);
  

  const items = [
    { id: 1, label: "Dates" },
    { id: 2, label: "Guest" },
    { id: 3, label: "Payment" },
    { id: 4, label: "Confirm" },
  ] as const;

  return (
    <div className="max-w-3xl mx-auto px-4 pt-10">
      <div className="flex items-center justify-between gap-3">
        {items.map((it) => (
          <div key={it.id} className="flex flex-col items-center flex-1">
            <div
              className={[
                "w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold",
                step === it.id ? "bg-black text-white border-black" : "bg-white text-black border-gray-300",
              ].join(" ")}
            >
              {it.id}
            </div>
            <div className="mt-2 text-xs text-gray-600">{it.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 h-px bg-gray-200" />
    </div>
  );
}

export default function BookingFlow() {
  const step = useBookingStore((s) => s.step);

  return (
    <section className="pb-16">
      <StepHeader />

      <div className="max-w-3xl mx-auto px-4 pt-8">
        {step === 1 && <StepDates />}
        {step === 2 && <StepGuest />}
        {step === 3 && <StepPayment />}
        {step === 4 && <StepConfirm />}
      </div>
    </section>
  );
}
