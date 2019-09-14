import Config from './Config';
import NodeManager from './NodeManager';
import NodeManagerComponent from './NodeManagerComponent.d';

interface Subtheme {
  name: string;
  url: string;
}

const SUBTHEME_STORAGE_KEY = 'spec_subtheme_name';

/**
 * Returns a dictionary of currently available subthemes and their CSS URLs.
 *
 * This function is implemented in a separate inline script in the template
 * HTML because Jekyll needs to correctly populate the URLs of the CSS files.
 */
declare function availableSubthemes(): Array<Subtheme>;

/**
 * Encapsulates the Settings pane to select subthemes.
 */
export default class SubthemeSettings implements NodeManagerComponent {
  _node_manager: NodeManager;
  $_settings_pane: JQuery;
  $_settings_toggle_buttons: JQuery;
  $_subtheme_stylesheet: JQuery;
  $_subtheme_selector_dropdown: JQuery;

  _subthemes: Array<Subtheme>;
  _current_subtheme_name: string;
  _settings_is_shown: boolean;

  constructor(node_manager: NodeManager, $settings_pane: JQuery,
    $settings_toggle_buttons: JQuery,
    $subtheme_stylesheet: JQuery,
    $subtheme_selector_dropdown: JQuery) {
    this._node_manager = node_manager;
    this.$_settings_pane = $settings_pane;
    this.$_settings_toggle_buttons = $settings_toggle_buttons;
    this.$_subtheme_stylesheet = $subtheme_stylesheet;
    this.$_subtheme_selector_dropdown = $subtheme_selector_dropdown;

    this._subthemes = [];
    this._current_subtheme_name = '';
    this._settings_is_shown = false;
  }

  get shown() {
    return this._settings_is_shown;
  }

  init() {
    this._initSubthemes();
    this._current_subtheme_name = this._getStoredSubthemeName();

    this._populateSubthemesInSelectorDropdown();
    this.$_subtheme_selector_dropdown.on('change', () => {
      const chosen_subtheme_name = this.$_subtheme_selector_dropdown.val();
      this.updateTheme(chosen_subtheme_name as string);
    });
    this.$_settings_toggle_buttons.on('click', () => this.toggle());
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
      this.$_settings_pane.hide();
    }
 else {
      this.$_settings_pane.show();
    }
    this._settings_is_shown = !this._settings_is_shown;

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
   * Get the config subthemes and initialize the _subthemes property.
   */
  _initSubthemes() {
    this._subthemes = Config.AVAILABLE_SUBTHEMES.map(
      subtheme_name => ({
        name: subtheme_name,
        url: `${Config.BASE_URL}/assets/css/theme_${subtheme_name}.css`,
      }),
    );
  }

  /**
   * Populate the available subthemes in the subtheme selector dropdown in the
   * settings pane.
   */
  _populateSubthemesInSelectorDropdown() {
    this._subthemes.map((subtheme, idx) => {
      this.$_subtheme_selector_dropdown.append(
        $('<option/>')
          .prop('value', subtheme.name)
          .append(subtheme.name),
      );
    });

    // The very first time, set the theme to default to ensure the
    // settings option has the correct initial value.
    this.updateTheme(this._current_subtheme_name);
  }

  /**
   * Update the subtheme of the spec, update the settings pane, and update
   * local storage.
   * @param subtheme_name the name of the newly selected subtheme
   */
  updateTheme(subtheme_name: string) {
    const current_subtheme = this._subthemes.find(subtheme => subtheme.name === subtheme_name);
    if (!current_subtheme) {
      return;
    }

    this._current_subtheme_name = subtheme_name;
    this.$_subtheme_selector_dropdown.val(subtheme_name);
    this.$_subtheme_stylesheet.prop('href', current_subtheme.url);
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
   * Retrieve the previously stored subtheme name from persistent local
   * storage. If this cannot be retrieved, returns the name of the first
   * available subtheme.
   */
  _getStoredSubthemeName() {
    const stored_subtheme_name =
      this._node_manager.storage.get(SUBTHEME_STORAGE_KEY);
    return stored_subtheme_name
      ? stored_subtheme_name
      : this._subthemes[0].name;
  }
}
