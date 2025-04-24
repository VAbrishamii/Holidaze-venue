/**
 * Normalizes a Date object to midnight UTC.
 * This avoids timezone shift when converting to ISO string.
 *
 * @param date - The original Date object
 * @returns A new Date normalized to midnight UTC
 */
export function normalizeDateToUTC(date: Date): Date {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
}
