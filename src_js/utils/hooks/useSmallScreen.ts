import { useLayoutEffect, useState } from 'preact/hooks';
import isSmallScreen from '../isSmallScreen';

/**
 * Return a stateful boolean indicating whether the viewer's screen width is
 * 'small' (as defined by `isSmallScreen()`).
 */
export default function useSmallScreen(): boolean {
  const [is_small_screen, setIsSmallScreen] = useState(isSmallScreen());
  useLayoutEffect(() => {
    const window_resize_listener = () => {
      const is_window_now_a_small_screen = isSmallScreen();
      if (is_window_now_a_small_screen !== is_small_screen) {
        setIsSmallScreen(is_window_now_a_small_screen);
      }
    };

    window.addEventListener('resize', window_resize_listener);
    return () => {
      window.removeEventListener('resize', window_resize_listener);
    };
  }, [is_small_screen]);

  return is_small_screen;
}
