import Subthemes from './RegisteredSubthemes';
import { SubthemeModeType } from './Subtheme';
import Storage from '../utils/Storage';
import Config from '../Config';

// Expose Subthemes publicly
export { Subthemes };

const NOOP_HANDLER = () => {};

/**
 * Updates the appearance of the page based on the Subtheme details to be
 * changed. If no Subtheme details are specified, the method uses Subtheme info
 * from Storage.
 *
 * This method also persists Subtheme changes to Storage (unless
 * `persistUpdate` is set to `false`.)
 *
 * @param newSubtheme   The subtheme details to be updated. This defaults to
 *                      the subtheme from Storage.
 * @param onUpdate      A function to be invoked while the theme is being
 *                      updated. Will not be invoked if `persistUpdate` is set
 *                      to `false`.
 * @param persistUpdate Defaults to true. If set to false, the updated theme
 *                      is not persisted to Storage (and will not invoke
 *                      `onUpdate`.)
 */
export function updateTheme(
  { name, mode }: Partial<SubthemeType> = {},
  onUpdate: (subtheme: SubthemeType) => void = NOOP_HANDLER,
  persistUpdate: boolean = true,
) {
  const {
    name: stored_subtheme_name,
    mode: stored_subtheme_mode,
  } = getStoredSubtheme();

  let normalized_name = name ?? stored_subtheme_name;
  if (!Subthemes[normalized_name]) {
    throw new Error(`Primer Spec: Theme name not found: ${normalized_name}`);
  }

  let currently_selected_mode = mode ?? stored_subtheme_mode;
  let normalized_mode = normalizeSubthemeMode(currently_selected_mode);

  // First store changes. Then decide if we need to take any action on the DOM.
  if (persistUpdate) {
    onUpdate({
      name: normalized_name,
      mode: currently_selected_mode,
    });
    storeSubtheme({ name: normalized_name, mode: currently_selected_mode });
  }

  // If stores are not updated, the "current" subthemes from the store may be
  // stale. Hence, skip this optimization.
  if (
    persistUpdate &&
    normalized_name === stored_subtheme_name &&
    normalized_mode === stored_subtheme_mode
  ) {
    return;
  }

  const old_subtheme = Subthemes[stored_subtheme_name];
  const new_subtheme = Subthemes[normalized_name];

  old_subtheme.reset(normalizeSubthemeMode(stored_subtheme_mode));
  new_subtheme.apply(normalized_mode);
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
  Storage.set(Config.SUBTHEME_NAME_STORAGE_KEY, name);
  Storage.set(Config.SUBTHEME_MODE_STORAGE_KEY, mode);
}

function getStoredSubtheme() {
  return { name: getStoredSubthemeName(), mode: getStoredSubthemeMode() };
}

/**
 * Retrieve the previously stored subtheme name from persistent local
 * storage. If this cannot be retrieved, returns the name of the first
 * available subtheme.
 */
function getStoredSubthemeName() {
  const stored_subtheme_name = Storage.get(Config.SUBTHEME_NAME_STORAGE_KEY);
  return stored_subtheme_name && Subthemes[stored_subtheme_name]
    ? stored_subtheme_name
    : Config.INIT_SUBTHEME_NAME;
}

/**
 * Retrieve the previously stored subtheme mode from persistent local
 * storage. If this cannot be retrieved, returns the default mode.
 */
function getStoredSubthemeMode(): SubthemeModeSelectorType {
  const stored_subtheme_mode = Storage.get(
    Config.SUBTHEME_MODE_STORAGE_KEY,
  ) as SubthemeModeSelectorType | null;
  return stored_subtheme_mode ?? Config.INIT_SUBTHEME_MODE;
}
