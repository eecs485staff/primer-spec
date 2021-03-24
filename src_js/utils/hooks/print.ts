import { useCallback, useEffect, useState } from 'preact/hooks';

/**
 * Returns a stateful boolean representing if a print-event is in progress
 * (between beforeprint and afterprint).
 */
export function usePrintInProgress(): boolean {
  const [isPrintInProgress, setIsPrintInProgress] = useState(false);
  const beforePrint = useCallback(useBeforePrint, []);
  const afterPrint = useCallback(useAfterPrint, []);
  useEffect(() => {
    return beforePrint(() => setIsPrintInProgress(true));
  }, [beforePrint]);
  useEffect(() => {
    return afterPrint(() => setIsPrintInProgress(false));
  }, [afterPrint]);
  return isPrintInProgress;
}

/**
 * Register a function (that could contain imperative and possibly effectful
 * code) that will be invoked when window.onbeforeprint fires.
 *
 * The return-value is a cleanup method that must be returned at the end of
 * the `useEffect()` handler. For instance:
 * ```
 * const beforePrint = useCallback(useBeforePrint, []);
 * useEffect(
 *   () => { return beforePrint(handler); },
 *   [beforePrint, dep1, dep2],
 * );
 * ```
 * @param handler Imperative function to be invoked onbeforeprint
 */
export function useBeforePrint(handler: () => void): () => void {
  // Safari < 13 requires this polyfill:
  let mql_listener: (mql: MediaQueryListEvent) => void;
  if (window.matchMedia) {
    mql_listener = (mql) => {
      if (mql.matches) {
        // webkit equivalent of onbeforeprint
        handler();
      }
    };
    window.matchMedia('print').addListener(mql_listener);
  }

  // Non-Safari browsers support this:
  window.addEventListener('beforeprint', handler);

  return () => {
    if (window.matchMedia) {
      window.matchMedia('print').removeListener(mql_listener);
    }
    window.removeEventListener('beforeprint', handler);
  };
}

/**
 * Register a function (that could contain imperative and possibly effectful
 * code) that will be invoked when window.onafterprint fires.
 *
 * The return-value is a cleanup method that must be returned at the end of
 * the `useEffect()` handler. For instance:
 * ```
 * const afterPrint = useCallback(useAfterPrint, []);
 * useEffect(
 *   () => { return afterPrint(handler); },
 *   [afterPrint, dep1, dep2],
 * );
 * ```
 * @param handler Imperative function to execute onafterprint
 */
export function useAfterPrint(handler: () => void): () => void {
  // Safari < 13 requires this polyfill:
  let mql_listener: (mql: MediaQueryListEvent) => void;
  if (window.matchMedia) {
    mql_listener = (mql) => {
      if (!mql.matches) {
        // webkit equivalent of onafterprint
        handler();
      }
    };
    window.matchMedia('print').addListener(mql_listener);
  }

  // Non-Safari browsers support this:
  window.addEventListener('afterprint', handler);

  return () => {
    if (window.matchMedia) {
      window.matchMedia('print').removeListener(mql_listener);
    }
    window.removeEventListener('afterprint', handler);
  };
}
