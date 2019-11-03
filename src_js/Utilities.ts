/**
 * Shared utilities used across modules.
 */
export default class Utilities {
  /**
   * Returns a boolean indicating whether the viewer's screen width is
   * smaller than 900px.
   */
  static isSmallScreen() {
    return document.documentElement.clientWidth < 900;
  }
}
