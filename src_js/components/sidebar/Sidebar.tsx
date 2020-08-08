import { h } from 'preact';
import IconType from '../common/IconType';
import InlineButton from '../common/InlineButton';
import TableOfContents from './TableOfContents';

type SidebarProps = {
  contentNodeSelector: string;

  sidebarShown: boolean;
  topbarHeight: number;
  onClickToggleSidebar: () => void;
};

// TODO: Subscribe to viewport changes
// TODO: Implement small screen handling
export default function Sidebar(props: SidebarProps) {
  if (!props.sidebarShown) {
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
        <InlineButton
          icon={IconType.SIDEBAR}
          onClick={props.onClickToggleSidebar}
        />
      </h2>
      <br />
      <TableOfContents
        contentNodeSelector={props.contentNodeSelector}
        topbarHeight={props.topbarHeight}
      />
    </div>
  );
}
