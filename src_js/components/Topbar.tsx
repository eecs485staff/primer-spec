import { h } from 'preact';
import { useLayoutEffect, useRef } from 'preact/hooks';
import clsx from 'clsx';
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

export default function Topbar(props: PropsType): h.JSX.Element {
  const topbarRef = useRef<HTMLDivElement>(null);
  const { isSmallScreen, onActiveSectionOffsetChange } = props;
  useLayoutEffect(() => {
    if (!isSmallScreen) {
      // On wide screens, the Topbar is transparent, so its effective height is
      // 0.
      onActiveSectionOffsetChange(20);
    } else if (topbarRef.current) {
      // On small screens, the Topbar is opaque, so we should find its true
      // height.
      onActiveSectionOffsetChange(
        topbarRef.current.getBoundingClientRect().height,
      );
    }
  }, [isSmallScreen, onActiveSectionOffsetChange]);

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
      class={clsx(
        'primer-spec-topbar',
        'position-fixed',
        'width-full',
        'top-0',
        'left-0',
        'py-2',
        'no-print',
        {
          'primer-spec-topbar-mobile': props.isSmallScreen,
          'primer-spec-topbar-settings-shown': props.settingsShown,
        },
      )}
    >
      {sidebar_toggle}
      {settings_toggle}
    </header>
  );
}
