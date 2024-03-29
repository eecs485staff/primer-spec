import { h } from 'preact';
import clsx from 'clsx';
import Config from '../../Config';
import { Subthemes, updateTheme, normalizeSubthemeMode } from '../../subthemes';
import {
  useAfterPrint,
  useBeforePrint,
  usePrintInProgress,
} from '../../utils/hooks/print';
import usePrefersDarkMode from '../../utils/hooks/usePrefersDarkMode';
import ThemePreview from './ThemePreview';

type PropsType = {
  isSmallScreen: boolean;
  sidebarShown: boolean;
  settingsShown: boolean;
  currentSubthemeName: string;
  currentSubthemeMode: SubthemeModeSelectorType;
  onSubthemeNameChange: (newSubthemeName: string) => void;
  onSubthemeModeChange: (newSubthemeMode: SubthemeModeSelectorType) => void;
};

const SUBTHEME_MODE_INFO: Array<{
  name: SubthemeModeSelectorType;
  label: string;
}> = [
  { name: 'light', label: 'Light' },
  { name: 'dark', label: 'Dark' },
  { name: 'system', label: 'Sync with OS setting' },
];

export default function Settings(props: PropsType): h.JSX.Element | null {
  const is_print_in_progress = usePrintInProgress();
  // Refresh the component if dark mode changes (because we also want to
  // refresh the theme previews).
  usePrefersDarkMode();

  // If a print is in progress, temporarily reset the theme to default light.
  useBeforePrint(() => updateTheme({ name: 'default', mode: 'light' }, false));
  useAfterPrint(() =>
    updateTheme(
      { name: props.currentSubthemeName, mode: props.currentSubthemeMode },
      false,
    ),
  );

  if (!props.settingsShown || is_print_in_progress) {
    return null;
  }

  const normalizedMode = normalizeSubthemeMode(props.currentSubthemeMode);

  return (
    <div class="primer-spec-settings-container position-fixed top-0 left-0 width-full height-full">
      <div
        class={clsx(
          'primer-spec-settings',
          'container-lg',
          'markdown-body',
          'px-3',
          'my-5',
          {
            'primer-spec-content-margin-extra':
              props.sidebarShown && !props.isSmallScreen,
            'primer-spec-content-mobile': props.isSmallScreen,
          },
        )}
      >
        <h1 class="primer-spec-toc-ignore">{'Spec Theme Settings'}</h1>
        <h2>Colors</h2>
        <form
          class="primer-spec-settings-theme-preview-container"
          onSubmit={(e) => e.preventDefault()}
        >
          {Object.values(Subthemes).map((subtheme) => (
            <label
              key={subtheme.name}
              class={clsx('primer-spec-settings-theme-preview-box', {
                'primer-spec-settings-theme-preview-selected':
                  props.currentSubthemeName === subtheme.name,
              })}
            >
              <ThemePreview subtheme={subtheme} mode={normalizedMode} />
              <div
                class={clsx('primer-spec-settings-theme-preview-title', {
                  'primer-spec-settings-theme-preview-selected':
                    props.currentSubthemeName === subtheme.name,
                })}
              >
                <input
                  type="radio"
                  value={subtheme.name}
                  name="primer-spec-settings-subtheme"
                  checked={props.currentSubthemeName === subtheme.name}
                  onChange={(e) =>
                    props.onSubthemeNameChange(
                      (e.target as HTMLInputElement).value,
                    )
                  }
                />{' '}
                {subtheme.label}
              </div>
            </label>
          ))}
        </form>
        <h2>Color mode</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {SUBTHEME_MODE_INFO.map((modeInfo) => (
            <label
              key={modeInfo.name}
              class="primer-spec-settings-theme-mode-label"
            >
              <input
                type="radio"
                value={modeInfo.name}
                name="primer-spec-settings-subtheme-mode"
                checked={props.currentSubthemeMode === modeInfo.name}
                onChange={(e) =>
                  props.onSubthemeModeChange(
                    (e.target as HTMLInputElement)
                      .value as SubthemeModeSelectorType,
                  )
                }
              />{' '}
              {modeInfo.label}
            </label>
          ))}
        </form>
        <hr />
        <p>
          <small>
            {'Does the spec display incorrectly? '}
            <a href="https://github.com/eecs485staff/primer-spec/issues">
              {'Let us know by adding a new "issue" here.'}
            </a>
          </small>
        </p>
        <p class="primer-spec-brand">
          <a
            href="https://github.com/eecs485staff/primer-spec/"
            target="_blank"
            rel="noreferrer"
          >
            {`Primer Spec v${Config.VERSION_RAW}`}
          </a>
        </p>
      </div>
    </div>
  );
}
