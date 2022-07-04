import { useEffect, useState } from 'preact/hooks';

/**
 * Return a stateful boolean that describes whether the user's OS settings
 * indicate a preference for light-themes or dark-themes. This preference is
 * used when the subtheme mode is set to 'system'.
 */
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
