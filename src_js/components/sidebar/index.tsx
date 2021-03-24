import { h, Fragment } from 'preact';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'preact/hooks';
import IconType from '../common/IconType';
import InlineButton from '../common/InlineButton';
import TableOfContents from './TableOfContents';
import { usePrintInProgress } from '../../utils/hooks/print';
import Storage from '../../utils/Storage';
import SidebarContent from './SidebarContent';
import getSitemapUrls from './getSitemapUrls';

type SidebarProps = {
  contentNodeSelector: string;

  isSmallScreen: boolean;
  sidebarShown: boolean;
  settingsShown: boolean;
  activeSectionOffsetY: number;
  sitemapEnabled: boolean;
  onToggleSidebar: () => void;
  onToggleSettings: () => void;
};

const SIDEBAR_SCROLL_POSITION_STORAGE_KEY =
  'primer_spec_sidebar_scroll_position';

export default function Sidebar(props: SidebarProps): h.JSX.Element {
  const { isSmallScreen, sidebarShown, onToggleSidebar } = props;

  const is_print_in_progress = usePrintInProgress();
  const sidebar_ref = useRef<HTMLElement>(null);

  const sitemapUrls = useMemo(() => getSitemapUrls(props.sitemapEnabled), [
    props.sitemapEnabled,
  ]);

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
      aria-label="Contents Sidebar"
      tabIndex={-1}
    >
      <h2 class="primer-spec-toc-ignore" id="primer-spec-toc-contents">
        {sitemapUrls == null ? undefined : (
          <Fragment>
            <InlineButton
              icon={IconType.HOME}
              href={sitemapUrls.rootPage.url}
              ariaLabel={sitemapUrls.rootPage.title || 'Home'}
            />{' '}
          </Fragment>
        )}
        Contents
        <InlineButton
          icon={IconType.SIDEBAR}
          floatRight
          onClick={saveScrollPositionThenToggleSidebar}
          ariaLabel="Close navigation pane"
        />
      </h2>
      <br />
      <SidebarContent sitemap={sitemapUrls}>
        <TableOfContents
          contentNodeSelector={props.contentNodeSelector}
          isSmallScreen={props.isSmallScreen}
          sidebarShown={props.sidebarShown}
          settingsShown={props.settingsShown}
          activeSectionOffsetY={props.activeSectionOffsetY}
          onToggleSidebar={saveScrollPositionThenToggleSidebar}
          onToggleSettings={props.onToggleSettings}
        />
      </SidebarContent>
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
