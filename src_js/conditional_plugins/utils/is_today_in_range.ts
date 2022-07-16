export enum Month {
  JANUARY = 0,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

type DateWithoutYear = {
  month: Month; // 0-indexed
  date: number;
};

/**
 * Return a boolean indicating whether today's date is between the dates
 * `lowerBound` (inclusive) and `upperBound` (exclusive).
 *
 * KNOWN LIMITATION: Doesn't work across years (for instance, around New Year).
 */
export function isTodayInRange(
  lowerBound: DateWithoutYear,
  upperBound: DateWithoutYear,
): boolean {
  const today = new Date();

  if (today.getMonth() < lowerBound.month) {
    return false;
  }
  let beyondLowerBound = true;
  if (today.getMonth() === lowerBound.month) {
    beyondLowerBound = today.getDate() >= lowerBound.date;
  }

  if (today.getMonth() !== upperBound.month) {
    return today.getMonth() < upperBound.month;
  }
  const withinUpperBound = today.getDate() < upperBound.date;

  return beyondLowerBound && withinUpperBound;
}
