import NodeManager from './NodeManager';
import NodeManagerComponent from './NodeManagerComponent.d';
import Subthemes, { LIGHT_SUBTHEMES, DARK_SUBTHEMES } from './subthemes';
import { SubthemeModeType } from './subthemes/Subtheme';

export type SubthemeModeSelectorType = 'light' | 'dark' | 'system';

const SUBTHEME_STORAGE_KEY = 'spec_subtheme_name';
const SUBTHEME_MODE_STORAGE_KEY = 'spec_subtheme_mode';

/**
 * Encapsulates the Settings pane to select subthemes.
 */
export default class SubthemeSettings implements NodeManagerComponent {
  _node_manager: NodeManager;
  $_settings_pane: JQuery;
  $_settings_container: JQuery;
  $_settings_toggle_buttons: JQuery;
  $_subtheme_selector_dropdown: JQuery;
  $_subtheme_mode_selector_dropdown: JQuery;

  _current_subtheme_name: string;
  _current_subtheme_mode: SubthemeModeSelectorType = 'system';
  _settings_is_shown: boolean;

  constructor(
    node_manager: NodeManager,
    $settings_pane: JQuery,
    $settings_container: JQuery,
    $settings_toggle_buttons: JQuery,
    $subtheme_selector_dropdown: JQuery,
    $subtheme_mode_selector_dropdown: JQuery,
  ) {
    this._node_manager = node_manager;
    this.$_settings_pane = $settings_pane;
    this.$_settings_container = $settings_container;
    this.$_settings_toggle_buttons = $settings_toggle_buttons;
    this.$_subtheme_selector_dropdown = $subtheme_selector_dropdown;
    this.$_subtheme_mode_selector_dropdown = $subtheme_mode_selector_dropdown;

    this._current_subtheme_name = '';
    this._settings_is_shown = false;
  }

  get shown() {
    return this._settings_is_shown;
  }

  get current_subtheme_name() {
    return this._current_subtheme_name;
  }

  get current_subtheme_mode() {
    return this._current_subtheme_mode;
  }

  init() {
    this._current_subtheme_name = this._getStoredSubthemeName();
    this._current_subtheme_mode = this._getStoredSubthemeMode();

    this.$_subtheme_mode_selector_dropdown.val(this._current_subtheme_mode);
    this._populateSubthemesInSelectorDropdown();

    this.$_subtheme_selector_dropdown.on('change', () => {
      const chosen_subtheme_name = this.$_subtheme_selector_dropdown.val();
      this.updateTheme(
        chosen_subtheme_name as string,
        this._current_subtheme_mode,
      );
    });
    this.$_subtheme_mode_selector_dropdown.on('change', () => {
      const chosen_subtheme_mode = this.$_subtheme_mode_selector_dropdown.val() as SubthemeModeSelectorType;
      this._storeSubthemeMode(chosen_subtheme_mode);
      this.updateTheme(this._current_subtheme_name, chosen_subtheme_mode);
    });
    this.$_settings_toggle_buttons.on('click', () => this.toggle());

    // Listen for changes to system theme (light/dark mode)
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addListener(() =>
        this.updateTheme(
          this._current_subtheme_name,
          this._current_subtheme_mode,
        ),
      );
  }

  /**
   * Toggle whether the settings pane is shown.
   * @param shown boolean (optional) whether to show or hide the settings pane
   */
  toggle(shown?: boolean): false {
    if (shown === this._settings_is_shown) {
      return false;
    }
    if (this._settings_is_shown) {
      this.$_settings_container.hide();
    } else {
      this.$_settings_container.show();
    }
    this.$_settings_toggle_buttons.toggleClass(
      'primer-spec-settings-toggle-hidden',
    );
    this._settings_is_shown = !this._settings_is_shown;

    // Notify the Topbar
    // TODO: This should be refactored to be an event listener
    this._node_manager.topbar.onToggleSettings();

    // Return false to prevent default link-click behavior.
    return false;
  }

  /**
   * Hide the settings pane.
   */
  hide() {
    return this.toggle(false);
  }

  /**
   * Show the settings pane.
   */
  show() {
    return this.toggle(true);
  }

  /**
   * Populate the available subthemes in the subtheme selector dropdown in the
   * settings pane. Also update the subtheme mode.
   */
  _populateSubthemesInSelectorDropdown() {
    const $light_themes = $('<optgroup/>').prop('label', 'Light themes');
    Object.entries(LIGHT_SUBTHEMES).map(([name, _]) => {
      $light_themes.append($('<option/>').prop('value', name).append(name));
    });

    const $dark_themes = $('<optgroup/>').prop('label', 'Dark themes');
    Object.entries(DARK_SUBTHEMES).map(([name, _]) => {
      $dark_themes.append($('<option/>').prop('value', name).append(name));
    });

    this.$_subtheme_selector_dropdown.append($light_themes);
    this.$_subtheme_selector_dropdown.append($dark_themes);

    // The very first time, set the theme to default to ensure the
    // settings option has the correct initial value.
    this.updateTheme(this._current_subtheme_name, this._current_subtheme_mode);
  }

  /**
   * Update the subtheme of the spec, update the settings pane, and update
   * local storage.
   * @param subtheme_name the name of the newly selected subtheme
   */
  updateTheme(subtheme_name: string, mode: SubthemeModeSelectorType) {
    const normalizedMode = this._normalizeSubthemeMode(mode);

    const old_subtheme = Subthemes[this._current_subtheme_name];
    if (old_subtheme) {
      old_subtheme.reset(normalizedMode);
    }

    const new_subtheme = Subthemes[subtheme_name];
    if (!new_subtheme) {
      return;
    }

    this._current_subtheme_name = subtheme_name;
    this.$_subtheme_selector_dropdown.val(subtheme_name);
    new_subtheme.apply(normalizedMode);
    this._storeSubthemeName(subtheme_name);
  }

  /**
   * Update persistent local storage with the given subtheme name for future
   * retrieval.
   * @param subtheme_name the name to be stored in local storage
   */
  _storeSubthemeName(subtheme_name: string) {
    this._node_manager.storage.set(SUBTHEME_STORAGE_KEY, subtheme_name);
  }

  /**
   * Update persistent local storage with the given subtheme mode for future
   * retrieval.
   * @param subtheme_mode the subtheme mode to be stored in local storage
   */
  _storeSubthemeMode(subtheme_mode: SubthemeModeSelectorType) {
    this._node_manager.storage.set(SUBTHEME_MODE_STORAGE_KEY, subtheme_mode);
  }

  /**
   * Retrieve the previously stored subtheme name from persistent local
   * storage. If this cannot be retrieved, returns the name of the first
   * available subtheme.
   */
  _getStoredSubthemeName() {
    const stored_subtheme_name = this._node_manager.storage.get(
      SUBTHEME_STORAGE_KEY,
    );
    return stored_subtheme_name ? stored_subtheme_name : Subthemes.default.name;
  }

  /**
   * Retrieve the previously stored subtheme mode from persistent local
   * storage. If this cannot be retrieved, returns the default mode.
   */
  _getStoredSubthemeMode(): SubthemeModeSelectorType {
    const stored_subtheme_mode = this._node_manager.storage.get(
      SUBTHEME_MODE_STORAGE_KEY,
    ) as SubthemeModeSelectorType | null;
    return stored_subtheme_mode ? stored_subtheme_mode : 'system';
  }

  _normalizeSubthemeMode(mode: SubthemeModeSelectorType): SubthemeModeType {
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
}
