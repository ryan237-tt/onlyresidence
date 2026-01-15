export type PricingResult = {
  nights: number;
  pricePerNight: number;
  subtotal: number;
  taxes: number;
  total: number;
};

export function nightsBetween(checkIn: string, checkOut: string): number {
  const inDate = new Date(checkIn + "T00:00:00");
  const outDate = new Date(checkOut + "T00:00:00");
  const diffMs = outDate.getTime() - inDate.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Pricing policy:
 * - base price: 120000 XAF per night (from your schema)
 * - taxes: 0 for now (adjust if needed)
 */
export function calculatePricing(checkIn: string, checkOut: string): PricingResult {
  const pricePerNight = 120000;
  const nights = nightsBetween(checkIn, checkOut);
  const subtotal = nights * pricePerNight;

  const taxes = 0; // change later if you add taxes
  const total = subtotal + taxes;

  return { nights, pricePerNight, subtotal, taxes, total };
}

export function formatXAF(amount: number): string {
  // XAF is typically shown without decimals
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }).format(amount);
}
