import { h } from 'preact';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks';
import Config from '../../Config';
import IconType from '../common/IconType';
import InlineButton from '../common/InlineButton';
import TableOfContents from './TableOfContents';
import { usePrintInProgress } from '../../utils/hooks';
import Storage from '../../utils/Storage';
import unflattenSitemapTree from './unflattenSitemapTree';
import Sitemap from './Sitemap';

type SidebarProps = {
  contentNodeSelector: string;

  isSmallScreen: boolean;
  sidebarShown: boolean;
  settingsShown: boolean;
  activeSectionOffsetY: number;
  onToggleSidebar: () => void;
  onToggleSettings: () => void;
};

type NavType = 'toc' | 'sitemap';

const SIDEBAR_SCROLL_POSITION_STORAGE_KEY =
  'primer_spec_sidebar_scroll_position';

export default function Sidebar(props: SidebarProps): h.JSX.Element {
  const { isSmallScreen, sidebarShown, onToggleSidebar } = props;

  const is_print_in_progress = usePrintInProgress();
  const sidebar_ref = useRef<HTMLElement>(null);

  const [currentNavType, setCurrentNavType] = useState<NavType>('toc');

  const sitemapNode = useMemo(
    () => unflattenSitemapTree(Config.SITEMAP_URLS, Config.SITEMAP_SITE_TITLE),
    [],
  );
  const isSitemapAvailable = !!sitemapNode;

  const saveScrollPositionThenToggleSidebar = useCallback(() => {
    // Before closing the sidebar, persist the scroll position within the
    // Sidebar.
    if (sidebar_ref?.current) {
      setSidebarScrollPosition(sidebar_ref.current.scrollTop);
    }
    onToggleSidebar();
  }, [onToggleSidebar]);

  useEffect(() => {
    // On small screens, close the Sidebar if the user clicks outside the
    // Sidebar. We have to check the following before toggling the Sidebar:
    //   - The clicked element is not in the sidebar
    //   - The clicked element is still present in the DOM
    //       (If the user clicks the Sidebar toggle, the toggle disappears with
    //       the Sidebar, but the click handler fires only afterwards. The
    //       toggle is _technically_ not in the sidebar any more.)
    //   - The Sidebar is shown.
    const window_click_listener = (event: Event) => {
      const target = event?.target as HTMLElement | null;
      if (
        target &&
        !target.matches('.primer-spec-sidebar, .primer-spec-sidebar *') &&
        document.body.contains(target) &&
        sidebarShown
      ) {
        saveScrollPositionThenToggleSidebar();
      }
    };

    if (isSmallScreen) {
      window.addEventListener('click', window_click_listener);
    }
    return () => {
      window.removeEventListener('click', window_click_listener);
    };
  }, [isSmallScreen, sidebarShown, saveScrollPositionThenToggleSidebar]);

  useLayoutEffect(() => {
    // Use the persisted scroll position if available, then reset it.
    // useLayoutEffect runs *before* the screen is updated. This means that
    // the Sidebar scrolls *before* it's shown to the user (preventing
    // "flashing".)
    const scrollPosition = getSidebarScrollPosition();
    if (scrollPosition && sidebar_ref?.current) {
      sidebar_ref.current.scrollTop = scrollPosition;
      setSidebarScrollPosition(null);
    }
  });

  if (!props.sidebarShown || is_print_in_progress) {
    return <div />;
  }

  const headerLabel = currentNavType === 'toc' ? 'Contents' : 'Sitemap';
  const sidebarChild =
    currentNavType === 'toc' ? (
      <TableOfContents
        contentNodeSelector={props.contentNodeSelector}
        isSmallScreen={props.isSmallScreen}
        sidebarShown={props.sidebarShown}
        settingsShown={props.settingsShown}
        activeSectionOffsetY={props.activeSectionOffsetY}
        onToggleSidebar={saveScrollPositionThenToggleSidebar}
        onToggleSettings={props.onToggleSettings}
      />
    ) : (
      <Sitemap sitemapNode={sitemapNode} />
    );

  // The explicit onClick handler is needed to force Safari (iOS) to propagate
  // click events for the sidebar.
  // We use an <aside> element to indicate to screen-readers that the Sidebar
  // only contains complementary content.
  // We also need to unset the Sidebar's `tabIndex` to make its border
  // unfocusable.
  return (
    <aside
      ref={sidebar_ref}
      class="primer-spec-sidebar position-fixed top-0 py-5 no-print"
      aria-label="Table of Contents"
      tabIndex={-1}
    >
      <h2 class="primer-spec-toc-ignore" id="primer-spec-toc-contents">
        {headerLabel}
        <InlineButton
          icon={IconType.SIDEBAR}
          onClick={saveScrollPositionThenToggleSidebar}
          ariaLabel="Close navigation pane"
        />
      </h2>
      <br />
      {isSitemapAvailable ? (
        <div class="tabnav">
          <nav class="tabnav-tabs" aria-label="Navigation type">
            <button
              class="tabnav-tab"
              aria-current={currentNavType === 'toc' ? 'location' : undefined}
              onClick={() => setCurrentNavType('toc')}
            >
              <i class="fas fa-stream" /> Contents
            </button>
            <button
              class="tabnav-tab"
              aria-current={
                currentNavType === 'sitemap' ? 'location' : undefined
              }
              onClick={() => setCurrentNavType('sitemap')}
            >
              <i class="fas fa-sitemap" /> Sitemap
            </button>
          </nav>
        </div>
      ) : null}
      <div role="presentation" onClick={() => true}>
        {sidebarChild}
      </div>
    </aside>
  );
}

function setSidebarScrollPosition(scrollPosition: number | null): void {
  Storage.setForPage(SIDEBAR_SCROLL_POSITION_STORAGE_KEY, `${scrollPosition}`);
}

function getSidebarScrollPosition(): number | null {
  const scrollPosition = parseInt(
    Storage.getForPage(SIDEBAR_SCROLL_POSITION_STORAGE_KEY) || '',
    10,
  );
  return Number.isNaN(scrollPosition) ? null : scrollPosition;
}
