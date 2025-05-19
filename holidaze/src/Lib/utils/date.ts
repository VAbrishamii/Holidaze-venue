
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
 * Converts a Date object to a "YYYY-MM-DD" string.
 * This avoids timezone issues by stripping the time part.
 */

export function formatToYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
