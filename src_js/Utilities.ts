/**
 * Shared utilities used across modules.
 */
export default class Utilities {
    /**
     * Returns a boolean indicating whether the viewer's screen width is
     * smaller than 900px.
     */
    static isSmallScreen() {
        const _width = Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || 0
        );
        return _width < 900;
    }
}
