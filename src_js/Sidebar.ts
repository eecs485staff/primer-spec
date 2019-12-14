import NodeManager from './NodeManager';
import Utilities from './Utilities';
import NodeManagerComponent from './NodeManagerComponent.d';

/**
 * Encapsulates the Sidebar and its behaviors.
 */
export default class Sidebar implements NodeManagerComponent {
  _node_manager: NodeManager;
  $_sidebar: JQuery;
  $_toggle_buttons: JQuery;
  $_headings: JQuery;

  _sidebar_is_shown: boolean;

  constructor(node_manager: NodeManager, $sidebar: JQuery,
    $toggle_buttons: JQuery, $headings: JQuery) {
    this._node_manager = node_manager;
    this.$_sidebar = $sidebar;
    this.$_toggle_buttons = $toggle_buttons;
    this.$_headings = $headings;

    this._sidebar_is_shown = true;
  }

  get shown() {
    return this._sidebar_is_shown;
  }

  init() {
    this._addEventHandlers();
  }

  /**
   * Toggle whether the Sidebar is shown.
   * @param shown boolean (optional) whether to show or hide the Sidebar
   */
  toggle(shown?: boolean): false {
    if (shown === this._sidebar_is_shown) {
      return false;
    }
    if (this._sidebar_is_shown) {
      this.$_sidebar.css('display', 'none');
      this.$_toggle_buttons.removeClass('sidebar-shown');
      this._node_manager.main_content.resetMargin();
    }
 else {
      this.$_sidebar.css('display', 'inherit');
      this.$_toggle_buttons.addClass('sidebar-shown');
      if (!Utilities.isSmallScreen()) {
        // On small screens, changing the margin causes the content wrapping
        // to change. For example, when a user clicks a link to a section in
        // the sidebar on mobile and then collapses the sidebar, the content
        // would shift and the user would not know where they are on the page.
        // To avoid this, we DO NOT change the margin of the content on small
        // screens.
        this._node_manager.main_content.showExtraMargin();
      }
    }
    this._sidebar_is_shown = !this._sidebar_is_shown;

    // Return false to prevent default link-click behavior.
    return false;
  }

  /**
   * Hide the Sidebar with the table of contents.
   */
  hide() {
    return this.toggle(false);
  }

  /**
   * Show the Sidebar with the table of contents.
   */
  show() {
    return this.toggle(true);
  }

  _addEventHandlers() {
    // Register clicks on the sidebar-toggle buttons.
    this.$_toggle_buttons.on('click', _e => this.toggle());

    // Spy on the scroll position of the window.
    // Based on: https://codepen.io/eksch/pen/xwdOeK
    $(window)
      .scroll(() => this._highlightActiveSidebarItem())
      .scroll();

    // On mobile, when a user taps outside the sidebar when the sidebar is
    // open, it should close.
    if (Utilities.isSmallScreen()) {
      $(window).on('click', () => {
        if (this._sidebar_is_shown) {
          this.toggle();
        }
      });
      // If the click is inside the sidebar, don't let the sidebar get closed
      // by the above handler.
      this.$_sidebar.on('click', e => e.stopPropagation());
    }
  }

  _highlightActiveSidebarItem() {
    const scroll_distance = $(window).scrollTop() || 0;
    const threshold = this._node_manager.topbar.height;
    this.$_headings
      .filter(function(_) {
        return !$(this).hasClass('primer-spec-toc-ignore');
      })
      .each(function(i) {
        // We "activate" sidebar items that are above the upper half of the
        // viewer's screen. Since we activate section items from the top, the
        // last remaining "active" item is the lowest "active" section.
        if ($(this).position().top - threshold <= scroll_distance) {
          $('.primer-spec-toc-item.primer-spec-toc-active')
              .removeClass('primer-spec-toc-active');
          $('.primer-spec-toc-item').eq(i)
            .addClass('primer-spec-toc-active');
        }
      });
  }
}
