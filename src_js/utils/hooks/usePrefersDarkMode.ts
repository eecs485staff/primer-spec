import { useEffect, useState } from 'preact/hooks';

export default function usePrefersDarkMode(): boolean {
  const [prefersDarkMode, setPrefersDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  useEffect(() => {
    const listener = (mql: MediaQueryListEvent) =>
      setPrefersDarkMode(mql.matches);

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', listener);
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', listener);
    };
  }, []);
  return prefersDarkMode;
}
