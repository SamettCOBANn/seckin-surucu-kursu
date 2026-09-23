const turkishLiraFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats integer kuruş; rejects malformed amounts instead of silently rounding. */
export function formatTurkishLira(amountKurus: number): string {
  if (!Number.isSafeInteger(amountKurus) || amountKurus < 0) {
    throw new RangeError("The amount must be a non-negative safe integer in kuruş.");
  }

  return turkishLiraFormatter.format(amountKurus / 100);
}
