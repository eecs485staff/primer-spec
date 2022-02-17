import { useEffect, useState } from 'preact/hooks';
import {
  registerThemeModeListener,
  unregisterThemeModeListener,
  getCurrentThemeMode,
} from '../../subthemes';

export default function useSubthemeMode(): SubthemeModeType {
  const [subthemeMode, setSubthemeMode] = useState<SubthemeModeType>(
    getCurrentThemeMode(),
  );
  useEffect(() => {
    registerThemeModeListener(setSubthemeMode);
    return () => {
      unregisterThemeModeListener(setSubthemeMode);
    };
  }, []);
  return subthemeMode;
}
