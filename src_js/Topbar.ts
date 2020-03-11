import NodeManager from './NodeManager';
import NodeManagerComponent from './NodeManagerComponent.d';

/**
 * Encapsulates the Topbar and its behaviors.
 *
 * The Topbar is only displayed on mobile. Internal links also have to account
 * for the presence of the opaque Topbar, hence the link offset needs to be
 * changed.
 */
export default class Topbar implements NodeManagerComponent {
  _node_manager: NodeManager;
  $_topbar: JQuery;
  _height: number;

  constructor(node_manager: NodeManager, $topbar: JQuery) {
    this._node_manager = node_manager;
    this.$_topbar = $topbar;
    this._height = 0;
  }

  /**
   * Returns the height of the Topbar *including padding*.
   */
  get height() {
    return this._height;
  }

  init() {}

  /**
   * Show the Topbar, and change internal link offset to account for it.
   */
  enableMobileMode() {
    // Add a background color to the topbar to make it opaque.
    this.$_topbar.addClass('primer-spec-topbar-mobile');
    this._height = this.$_topbar.outerHeight() || 0;
  }

  /**
   * When the settings pane is toggled, this method changes the z-index of the
   * Topbar (to make the Topbar appear on top of the Settings pane).
   */
  onToggleSettings() {
    // TODO: This should probably be modeled as listening to the event of a
    // settings toggle.
    this.$_topbar.toggleClass('primer-spec-topbar-settings-shown');
  }
}
