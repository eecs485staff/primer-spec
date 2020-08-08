import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import IconType from './common/IconType';
import InlineButton from './common/InlineButton';
import Utilities from '../Utilities';

type PropsType = {
  sidebarShown: boolean;
  settingsShown: boolean;
  onTopbarHeightChange: (height: number) => void;
  onClickToggleSidebar: () => void;
  onClickToggleSettings: () => void;
};

export default function Topbar(props: PropsType) {
  const topbarRef = useRef<HTMLDivElement>(null);
  // TODO: Refresh the topbar height if the viewport width changes
  useEffect(() => {
    if (topbarRef.current && Utilities.isSmallScreen()) {
      props.onTopbarHeightChange(
        topbarRef.current.getBoundingClientRect().height,
      );
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
          onClick={props.onClickToggleSidebar}
        />
      </div>
      <div class="primer-spec-settings-toggle primer-spec-float-right">
        <InlineButton
          icon={props.settingsShown ? IconType.CLOSE : IconType.SETTINGS}
          onClick={props.onClickToggleSettings}
        />
      </div>
    </div>
  );
}
