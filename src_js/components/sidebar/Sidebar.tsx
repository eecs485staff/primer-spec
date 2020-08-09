import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import IconType from '../common/IconType';
import InlineButton from '../common/InlineButton';
import TableOfContents from './TableOfContents';
import { usePrintInProgress } from '../../utils/hooks';

type SidebarProps = {
  contentNodeSelector: string;

  sidebarShown: boolean;
  settingsShown: boolean;
  topbarHeight: number;
  isSmallScreen: boolean;
  onToggleSidebar: () => void;
  onToggleSettings: () => void;
};

export default function Sidebar(props: SidebarProps) {
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
        props.sidebarShown
      ) {
        props.onToggleSidebar();
      }
    };

    if (props.isSmallScreen) {
      window.addEventListener('click', window_click_listener);
    }
    return () => {
      window.removeEventListener('click', window_click_listener);
    };
  });

  const isPrintInProgress = usePrintInProgress();

  if (!props.sidebarShown || isPrintInProgress) {
    return <div />;
  }

  // The explicit onClick handler is needed to force Safari (iOS) to propagate
  // click events for the sidebar.
  return (
    <div
      class="primer-spec-sidebar position-fixed top-0 py-5 no-print"
      onClick={() => true}
    >
      <h2 class="primer-spec-toc-ignore" id="contents">
        Contents
        <InlineButton icon={IconType.SIDEBAR} onClick={props.onToggleSidebar} />
      </h2>
      <br />
      <TableOfContents
        contentNodeSelector={props.contentNodeSelector}
        sidebarShown={props.sidebarShown}
        settingsShown={props.settingsShown}
        topbarHeight={props.topbarHeight}
        isSmallScreen={props.isSmallScreen}
        onToggleSidebar={props.onToggleSidebar}
        onToggleSettings={props.onToggleSettings}
      />
    </div>
  );
}
