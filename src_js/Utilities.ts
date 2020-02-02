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

  /**
   * Return a number indicating the Chrome major version. Returns false if
   * not Chrome.
   */
  static getChromeVersion () {
    // Based on: https://stackoverflow.com/a/4900484/5868796
    const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : false;
  }
}
