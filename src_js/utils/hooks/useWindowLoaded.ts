import { useEffect, useState } from 'preact/hooks';

/**
 * Returns a stateful boolean that indicates whether all resources on the page
 * have been downloaded (and the 'load' event will fire / has fired on the
 * window).
 */
export default function useWindowLoaded(): boolean {
  const [windowLoaded, setWindowLoaded] = useState(
    document.readyState === 'complete',
  );
  useEffect(() => {
    const onWindowLoad = () => {
      setWindowLoaded(true);
    };
    window.addEventListener('load', onWindowLoad);
    return () => {
      window.removeEventListener('load', onWindowLoad);
    };
  });
  return windowLoaded;
}
