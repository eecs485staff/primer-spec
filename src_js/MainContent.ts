import NodeManager from "./NodeManager";
import NodeManagerComponent from './NodeManagerComponent.d';

/**
 * Encapsulates operations on the main content in the page.
 */
export default class MainContent implements NodeManagerComponent {
  _node_manager: NodeManager;
  $main_content: JQuery;

  _extra_margin: boolean;

  constructor(node_manager: NodeManager, $main_content: JQuery) {
    this._node_manager = node_manager;
    this.$main_content = $main_content;

    this._extra_margin = true;
  }

  init() {}

  toggleMargin(extra_margin?: boolean) {
    if (extra_margin === this._extra_margin) {
      return;
    }
    if (this._extra_margin) {
      this.$main_content
        .removeClass('primer-spec-content-margin-extra')
        .addClass('primer-spec-content-margin-auto');
    }
    else {
      this.$main_content
        .removeClass('primer-spec-content-margin-auto')
        .addClass('primer-spec-content-margin-extra');
    }
    this._extra_margin = !this._extra_margin;
  }

  resetMargin() {
    return this.toggleMargin(false);
  }

  showExtraMargin() {
    return this.toggleMargin(true);
  }

  enableMobileMode() {
    this.$main_content.addClass('primer-spec-content-mobile');
  }
}
