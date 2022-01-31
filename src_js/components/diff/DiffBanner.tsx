import { h } from 'preact';
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks';
import { didSpecContentChange } from './didSpecContentChange';
import { fuzzyTimeDeltaString } from './fuzzyTimeDeltaString';

type PropsType = {
  specHTML: string;
  onOffsetChange: (offset: number) => void;
};

export function DiffBanner({
  specHTML,
  onOffsetChange,
}: PropsType): h.JSX.Element {
  const bannerRef = useRef<HTMLDivElement>(null);
  const didSpecContentChangeResult = useMemo(
    () => didSpecContentChange(specHTML),
    [specHTML],
  );
  const [bannerShown, setBannerShown] = useState(
    didSpecContentChangeResult.changed,
  );
  // useEffect(() => {
  //   if (bannerRef.current) {
  //     // On small screens, the Topbar is opaque, so we should find its true
  //     // height.
  //     onOffsetChange(bannerRef.current.getBoundingClientRect().height);
  //   }
  // }, [onOffsetChange]);

  if (!bannerShown || !didSpecContentChangeResult.changed) {
    return <div />;
  }

  const fuzzyLastVisitedTime = fuzzyTimeDeltaString(
    didSpecContentChangeResult.lastVisitedTs,
  );
  return (
    <div ref={bannerRef} class="flash primer-spec-flash-banner">
      This page appears to have changed since you last visited on
      {` ${fuzzyLastVisitedTime}`}.
      <button
        class="flash-close"
        type="button"
        aria-label="Close"
        onClick={() => setBannerShown(false)}
      >
        <i class="fas fa-times" />
      </button>
      <button class="btn btn-sm flash-action">View changes</button>
    </div>
  );
}
