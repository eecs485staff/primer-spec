/**
 * Exposes config variables defined in the webpack config (as a plugin).
 */
export default {
    AVAILABLE_SUBTHEMES: process.env.AVAILABLE_SUBTHEMES.split(','),
    BASE_URL: process.env.BASE_URL,
}
