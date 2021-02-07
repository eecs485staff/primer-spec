import { h } from 'preact';
import { useCallback, useEffect } from 'preact/hooks';
import Config from '../../Config';
import { Subthemes, updateTheme, normalizeSubthemeMode } from '../../subthemes';
import {
  useAfterPrint,
  useBeforePrint,
  usePrintInProgress,
  usePrefersDarkMode,
} from '../../utils/hooks';
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

const SUBTHEME_MODE_INFO = [
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
  const beforePrint = useCallback(useBeforePrint, []);
  const afterPrint = useCallback(useAfterPrint, []);
  useEffect(() => {
    return beforePrint(() =>
      updateTheme({ name: 'default', mode: 'light' }, false),
    );
  }, [beforePrint]);
  useEffect(() => {
    return afterPrint(() =>
      updateTheme(
        { name: props.currentSubthemeName, mode: props.currentSubthemeMode },
        false,
      ),
    );
  }, [afterPrint, props.currentSubthemeName, props.currentSubthemeMode]);

  if (!props.settingsShown || is_print_in_progress) {
    return null;
  }

  const normalizedMode = normalizeSubthemeMode(props.currentSubthemeMode);

  return (
    <div class="primer-spec-settings-container position-fixed top-0 left-0 width-full height-full">
      <div
        class={`primer-spec-settings container-lg markdown-body px-3 my-5 ${
          props.sidebarShown && !props.isSmallScreen
            ? 'primer-spec-content-margin-extra'
            : ''
        } ${props.isSmallScreen ? 'primer-spec-content-mobile' : ''}`}
      >
        <h1 class="primer-spec-toc-ignore">{'Spec Theme Settings'}</h1>
        <h2>Colors</h2>
        <form
          class="primer-spec-settings-theme-preview-container"
          onSubmit={(e) => e.preventDefault()}
        >
          {Object.values(Subthemes).map((subtheme) => (
            <label class="primer-spec-settings-theme-preview-box">
              <ThemePreview subtheme={subtheme} mode={normalizedMode} />
              <div class="primer-spec-settings-theme-preview-title">
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
            <label class="primer-spec-settings-theme-mode-label">
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
