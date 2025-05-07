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
/**
 * Calculate number of nights between two ISO date strings.
 */
export function getNumberOfNights(from?: string, to?: string): number {
  if (!from || !to) return 0;
  const start = new Date(from);
  const end = new Date(to);
  const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(diff, 0);
}
/**
 * Format date to readable string (e.g., Jan 5, 2025)
 */
export function formatDateShort(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
