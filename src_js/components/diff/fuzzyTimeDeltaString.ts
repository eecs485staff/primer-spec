/**
 * Returns a string representing how long ago `ts` was in a "fuzzy"
 * human-readable format.
 *
 * `ts` is the older Epoch time in milliseconds.
 * Assumes that `ts < Date.now()`.
 */
export function fuzzyTimeDeltaString(ts: number): string {
  const now = Date.now();
  if (now < ts) {
    console.error(
      `Primer Spec: fuzzyTimeDeltaString: ts (${ts}) is in the future`,
    );
    return 'a minute ago';
  }

  const deltaSeconds = Math.round((now - ts) / 1000);
  if (deltaSeconds < 60) {
    return 'a minute ago';
  }
  if (deltaSeconds < 60 * 60) {
    return 'a few minutes ago';
  }
  if (deltaSeconds < 60 * 60 * 2) {
    return 'an hour ago';
  }
  if (deltaSeconds < 60 * 60 * 24) {
    return 'a few hours ago';
  }
  if (deltaSeconds < 60 * 60 * 24 * 7) {
    return 'a few days ago';
  }
  if (deltaSeconds < 60 * 60 * 24 * 7 * 2) {
    return 'a week ago';
  }
  return 'a few weeks ago';
}
