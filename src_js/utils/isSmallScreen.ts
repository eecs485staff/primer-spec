/**
 * Returns a boolean indicating whether the viewer's screen width is
 * smaller than 900px.
 */
export default function isSmallScreen() {
  return document.documentElement.clientWidth < 900;
}
