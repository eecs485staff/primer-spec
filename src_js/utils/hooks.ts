import { useEffect, useState } from 'preact/hooks';

/**
 * Returns a stateful boolean representing if a print-event is in progress
 * (between beforeprint and afterprint).
 */
export function usePrintInProgress(): boolean {
  const [isPrintInProgress, setIsPrintInProgress] = useState(false);
  useEffect(
    useBeforePrint(() => setIsPrintInProgress(true)),
    [],
  );
  useEffect(
    useAfterPrint(() => setIsPrintInProgress(false)),
    [],
  );
  return isPrintInProgress;
}

/**
 * Accepts a function that could contain imperative and possibly effectful
 * code that will be invoked when window.onbeforeprint fires.
 * @param handler Imperative function to be invoked onbeforeprint
 */
export function useBeforePrint(handler: () => void): () => void {
  return () => {
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
  };
}

/**
 * Accepts a function that could contain imperative and possibly effectful
 * code that will be invoked when window.onafterprint fires.
 * @param handler Imperative function to execute onafterprint
 */
export function useAfterPrint(handler: () => void): () => void {
  return () => {
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
  };
}
