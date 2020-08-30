import { h } from 'preact';
import { useRef, useLayoutEffect } from 'preact/hooks';
import IconType from './common/IconType';
import InlineButton from './common/InlineButton';

type PropsType = {
  isSmallScreen: boolean;
  showSidebarToggle: boolean;
  showSettingsToggle: boolean;
  sidebarShown: boolean;
  settingsShown: boolean;
  onActiveSectionOffsetChange: (height: number) => void;
  onToggleSidebar: () => void;
  onToggleSettings: () => void;
};

export default function Topbar(props: PropsType) {
  const topbarRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!props.isSmallScreen) {
      // On wide screens, the Topbar is transparent, so its effective height is
      // 0.
      props.onActiveSectionOffsetChange(20);
    } else if (topbarRef.current) {
      // On small screens, the Topbar is opaque, so we should find its true
      // height.
      props.onActiveSectionOffsetChange(
        topbarRef.current.getBoundingClientRect().height,
      );
    }
  }, [props.isSmallScreen]);

  let sidebar_toggle = null;
  if (props.showSidebarToggle) {
    sidebar_toggle = props.sidebarShown ? null : (
      <div class={`primer-spec-sidebar-toggle-fixed primer-spec-float-left`}>
        <InlineButton
          icon={IconType.SIDEBAR}
          onClick={props.onToggleSidebar}
          ariaLabel={'Open navigation pane'}
        />
      </div>
    );
  }

  let settings_toggle = null;
  if (props.showSettingsToggle) {
    settings_toggle = (
      <div class="primer-spec-settings-toggle primer-spec-float-right">
        <InlineButton
          icon={props.settingsShown ? IconType.CLOSE : IconType.SETTINGS}
          onClick={props.onToggleSettings}
          ariaLabel={
            props.settingsShown ? 'Close settings pane' : 'Open settings pane'
          }
        />
      </div>
    );
  }

  return (
    <header
      ref={topbarRef}
      class={`primer-spec-topbar position-fixed width-full top-0 left-0 py-2 no-print ${
        props.isSmallScreen ? 'primer-spec-topbar-mobile' : ''
      } ${props.settingsShown ? 'primer-spec-topbar-settings-shown' : ''}`}
    >
      {sidebar_toggle}
      {settings_toggle}
    </header>
  );
}
