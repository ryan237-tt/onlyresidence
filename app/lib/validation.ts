export function isValidEmail(email: string): boolean {
  // Simple but robust email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  // Accept +237..., digits, spaces
  const cleaned = phone.replace(/\s+/g, "");
  return /^[+]?[\d]{7,15}$/.test(cleaned);
}

/**
 * Date strings are expected as YYYY-MM-DD.
 * Returns an error message or null if ok.
 */
export function validateDates(checkIn: string, checkOut: string): string | null {
  const inDate = new Date(checkIn + "T00:00:00");
  const outDate = new Date(checkOut + "T00:00:00");

  if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime())) {
    return "Invalid dates.";
  }

  if (outDate <= inDate) {
    return "Check-out must be after check-in.";
  }

  // Optional: prevent selecting past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (inDate < today) {
    return "Check-in cannot be in the past.";
  }

  return null;
}
