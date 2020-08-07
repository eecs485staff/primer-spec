import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import IconType from './common/IconType';
import InlineButton from './common/InlineButton';
import Utilities from '../Utilities';

// Importing only for types
import { BoundActions } from 'redux-zero/types/Actions';
import actions from '../actions';
import { StoreStateType } from '../store';

type PropsType = {};

function Topbar(
  props: PropsType &
    StoreStateType &
    BoundActions<StoreStateType, typeof actions>,
) {
  const topbarRef = useRef<HTMLDivElement>(null);
  // TODO: Refresh the topbar height if the viewport width changes
  useEffect(() => {
    if (topbarRef.current && Utilities.isSmallScreen()) {
      props.setTopbarHeight(topbarRef.current.getBoundingClientRect().height);
    }
  });

  return (
    <div
      ref={topbarRef}
      class="primer-spec-topbar position-fixed width-full top-0 left-0 py-2 no-print"
    >
      <div
        class={`primer-spec-sidebar-toggle-fixed primer-spec-float-left ${
          props.sidebarShown ? 'sidebar-shown' : ''
        }`}
      >
        <InlineButton
          icon={IconType.SIDEBAR}
          onClick={props.toggleSidebarShown}
        />
      </div>
      <div class="primer-spec-settings-toggle primer-spec-float-right">
        <InlineButton
          icon={props.settingsShown ? IconType.CLOSE : IconType.SETTINGS}
          onClick={props.toggleSettingsShown}
        />
      </div>
    </div>
  );
}

export default connect(null, actions)(Topbar);
