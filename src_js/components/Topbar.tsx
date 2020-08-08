import { h } from 'preact';
import { useRef, useLayoutEffect } from 'preact/hooks';
import IconType from './common/IconType';
import InlineButton from './common/InlineButton';

type PropsType = {
  sidebarShown: boolean;
  settingsShown: boolean;
  isSmallScreen: boolean;
  onTopbarHeightChange: (height: number) => void;
  onClickToggleSidebar: () => void;
  onClickToggleSettings: () => void;
};

export default function Topbar(props: PropsType) {
  const topbarRef = useRef<HTMLDivElement>(null);
  // TODO: Refresh the topbar height if the viewport width changes
  useLayoutEffect(() => {
    if (!props.isSmallScreen) {
      // On wide screens, the Topbar is transparent, so its effective height is
      // 0.
      props.onTopbarHeightChange(20);
    } else if (topbarRef.current) {
      // On small screens, the Topbar is opaque, so we should find its true
      // height.
      props.onTopbarHeightChange(
        topbarRef.current.getBoundingClientRect().height,
      );
    }
  }, [props.isSmallScreen]);

  const sidebar_toggle =
    props.isSmallScreen && props.sidebarShown ? null : (
      <div class={`primer-spec-sidebar-toggle-fixed primer-spec-float-left`}>
        <InlineButton
          icon={IconType.SIDEBAR}
          onClick={props.onClickToggleSidebar}
        />
      </div>
    );

  return (
    <div
      ref={topbarRef}
      class={`primer-spec-topbar position-fixed width-full top-0 left-0 py-2 no-print ${
        props.isSmallScreen ? 'primer-spec-topbar-mobile' : ''
      } ${props.settingsShown ? 'primer-spec-topbar-settings-shown' : ''}`}
    >
      {sidebar_toggle}
      <div class="primer-spec-settings-toggle primer-spec-float-right">
        <InlineButton
          icon={props.settingsShown ? IconType.CLOSE : IconType.SETTINGS}
          onClick={props.onClickToggleSettings}
        />
      </div>
    </div>
  );
}
