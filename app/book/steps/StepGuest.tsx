"use client";

import { useMemo, useState } from "react";
import { useBookingStore } from "../bookingStore";
import { isValidEmail, isValidPhone } from "@/app/lib/validation";

export default function StepGuest() {
  const { guest, setGuest, nextStep, prevStep } = useBookingStore();

  const [firstName, setFirstName] = useState(guest?.firstName ?? "");
  const [lastName, setLastName] = useState(guest?.lastName ?? "");
  const [email, setEmail] = useState(guest?.email ?? "");
  const [phone, setPhone] = useState(guest?.phone ?? "");
  const [error, setError] = useState<string | null>(null);

  const canContinue = useMemo(() => {
    if (!firstName.trim() || !lastName.trim()) return false;
    if (!isValidEmail(email)) return false;
    if (!isValidPhone(phone)) return false;
    return true;
  }, [firstName, lastName, email, phone]);

  function handleContinue() {
    if (!canContinue) {
      setError("Please complete all fields with valid information.");
      return;
    }

    setError(null);
    setGuest({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
    nextStep();
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Guest information</h2>
      <p className="text-gray-600 mt-1">
        We use this to send confirmation and contact you if needed.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="John"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="john@email.com"
            inputMode="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="+237 6..."
            inputMode="tel"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={prevStep}
          className="px-5 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 transition"
        >
          Back
        </button>

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={[
            "px-5 py-3 rounded-xl font-semibold transition",
            canContinue ? "bg-black text-white hover:opacity-90" : "bg-gray-200 text-gray-500 cursor-not-allowed",
          ].join(" ")}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
