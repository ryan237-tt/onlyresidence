"use client";

import { create } from "zustand";
import type { GuestInfo, PaymentMethod } from "@/app/lib/types";

export type BookingStep = 1 | 2 | 3 | 4;

type BookingStore = {
  step: number;

  checkIn: string | null;
  checkOut: string | null;
  guest: GuestInfo | null;

  paymentMethod: PaymentMethod | null;
  bookingId: string | null;

  setDates: (checkIn: string, checkOut: string) => void;
  setGuest: (guest: GuestInfo) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setBookingId: (id: string) => void;

  nextStep: () => void;
  prevStep: () => void;
};

export type BookingState = {
  // flow control
  step: BookingStep;
  setStep: (step: BookingStep) => void;
  nextStep: () => void;
  prevStep: () => void;

  // dates
  checkIn: string | null;  // ISO date: "2025-12-30"
  checkOut: string | null; // ISO date
  setDates: (checkIn: string, checkOut: string) => void;

  // guest
  guest: GuestInfo | null;
  setGuest: (guest: GuestInfo) => void;

  // payment
  paymentMethod: PaymentMethod | null;
  setPaymentMethod: (m: PaymentMethod) => void;

  // booking result (after "submit")
  bookingId: string | null;
  setBookingId: (id: string) => void;

  // reset
  reset: () => void;
};

const initial = {
  step: 1 as BookingStep,
  checkIn: null,
  checkOut: null,
  guest: null,
  paymentMethod: null,
  bookingId: null,
};

export const useBookingStore = create<BookingState>((set, get) => ({
  ...initial,

  setStep: (step) => set({ step }),
  nextStep: () => set({ step: (Math.min(get().step + 1, 4) as BookingStep) }),
  prevStep: () => set({ step: (Math.max(get().step - 1, 1) as BookingStep) }),

  setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
  setGuest: (guest) => set({ guest }),
  setPaymentMethod: (m) => set({ paymentMethod: m }),

  setBookingId: (id) => set({ bookingId: id }),

  reset: () => set({ ...initial }),
}));
