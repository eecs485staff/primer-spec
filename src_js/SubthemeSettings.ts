import Subthemes from './subthemes';
import { SubthemeModeType } from './subthemes/Subtheme';
import store from './store';
import Storage from './Storage';
import Config from './Config';

export type SubthemeType = {
  name: string;
  mode: SubthemeModeSelectorType;
};

const SUBTHEME_STORAGE_KEY = 'spec_subtheme_name';
const SUBTHEME_MODE_STORAGE_KEY = 'spec_subtheme_mode';

// Expose Subthemes publicly
export { Subthemes };

/**
 * Encapsulates the Settings pane to select subthemes.
 */
export function updateTheme({ name, mode }: Partial<SubthemeType>) {
  const { currentSubthemeName, currentSubthemeMode } = getCurrentSubtheme();

  let normalized_name = name ?? currentSubthemeName;
  if (!Subthemes[normalized_name]) {
    throw new Error(`Primer Spec: Theme name not found: ${normalized_name}`);
  }

  let currently_selected_mode = mode ?? currentSubthemeMode;
  let normalized_mode = normalizeSubthemeMode(currently_selected_mode);

  // First store changes. Then decide if we need to take any action on the DOM.
  store.setState({
    currentSubthemeName: normalized_name,
    currentSubthemeMode: currently_selected_mode,
  });
  storeSubtheme({ name: normalized_name, mode: currently_selected_mode });

  if (
    normalized_name === currentSubthemeName &&
    normalized_mode === currentSubthemeMode
  ) {
    return;
  }

  const old_subtheme = Subthemes[currentSubthemeName];
  const new_subtheme = Subthemes[normalized_name];

  old_subtheme.reset(normalizeSubthemeMode(currentSubthemeMode));
  new_subtheme.apply(normalized_mode);
}

// The first time the page loads, we need to init the theme from storage.
updateTheme({
  name: getStoredSubthemeName(),
  mode: getStoredSubthemeMode(),
});

function getCurrentSubtheme() {
  const { currentSubthemeName, currentSubthemeMode } = store.getState();
  return {
    currentSubthemeName: currentSubthemeName || Subthemes.default.name,
    currentSubthemeMode: currentSubthemeMode || 'system',
  };
}

function normalizeSubthemeMode(
  mode: SubthemeModeSelectorType,
): SubthemeModeType {
  if (mode !== 'system') {
    return mode;
  }
  if (!window.matchMedia) {
    return 'light';
  }
  // The following is based on:
  // https://gosink.in/javascript-css-toggle-dark-light-theme-based-on-your-users-preferred-scheme/
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // It's a dark theme
    return 'dark';
  } else {
    // It's not a dark theme
    return 'light';
  }
}

/**
 * Update persistent local storage with the given subtheme for future
 * retrieval.
 * @param subtheme the name to be stored in local storage
 */
function storeSubtheme({ name, mode }: SubthemeType) {
  Storage.set(SUBTHEME_STORAGE_KEY, name);
  Storage.set(SUBTHEME_MODE_STORAGE_KEY, mode);
}

/**
 * Retrieve the previously stored subtheme name from persistent local
 * storage. If this cannot be retrieved, returns the name of the first
 * available subtheme.
 */
function getStoredSubthemeName() {
  const stored_subtheme_name = Storage.get(SUBTHEME_STORAGE_KEY);
  return stored_subtheme_name && Subthemes[stored_subtheme_name]
    ? stored_subtheme_name
    : Config.DEFAULT_SUBTHEME_NAME;
}

/**
 * Retrieve the previously stored subtheme mode from persistent local
 * storage. If this cannot be retrieved, returns the default mode.
 */
function getStoredSubthemeMode(): SubthemeModeSelectorType {
  const stored_subtheme_mode = Storage.get(
    SUBTHEME_MODE_STORAGE_KEY,
  ) as SubthemeModeSelectorType | null;
  return stored_subtheme_mode
    ? stored_subtheme_mode
    : Config.DEFAULT_SUBTHEME_MODE;
}
