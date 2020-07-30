import { h } from 'preact';
import { connect } from 'redux-zero/preact';
import IconType from '../common/IconType';
import InlineButton from '../common/InlineButton';
import TableOfContents from './TableOfContents';

// Importing only for types
import { BoundActions } from 'redux-zero/types/Actions';
import actions from '../../actions';
import { StoreStateType } from '../../store';

type SidebarProps = {
  contentNodeSelector: string;
};

function Sidebar(
  props: SidebarProps &
    StoreStateType &
    BoundActions<StoreStateType, typeof actions>,
) {
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
          onClick={props.toggleSidebarShown}
        />
      </h2>
      <br />
      <TableOfContents contentNodeSelector={props.contentNodeSelector} />
    </div>
  );
}

export default connect(null, actions)(Sidebar);
