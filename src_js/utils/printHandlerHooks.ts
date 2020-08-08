import { useEffect, useState } from 'preact/hooks';

export function usePrintInProgress() {
  const [isPrintInProgress, setIsPrintInProgress] = useState(false);
  useBeforePrint(() => setIsPrintInProgress(true), []);
  useAfterPrint(() => setIsPrintInProgress(false), []);
  return isPrintInProgress;
}

export function useBeforePrint(handler: () => void, deps?: any[]) {
  useEffect(() => {
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

    // Non-Safari browsers support this.
    window.addEventListener('beforeprint', handler);

    return () => {
      if (window.matchMedia) {
        window.matchMedia('print').removeListener(mql_listener);
      }
      window.removeEventListener('beforeprint', handler);
    };
  }, deps);
}

export function useAfterPrint(handler: () => void, deps?: any[]) {
  useEffect(() => {
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

    // Non-Safari browsers support this.
    window.addEventListener('afterprint', handler);

    return () => {
      if (window.matchMedia) {
        window.matchMedia('print').removeListener(mql_listener);
      }
      window.removeEventListener('afterprint', handler);
    };
  }, deps);
}
