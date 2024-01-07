/**
 * Conditional plugins are loaded asynchronously and are intentionally
 * isolated from the rest of Primer Spec. This is because this conditional
 * plugin framework was designed to build temporary pranks and jokes! (We don't
 * want these jokes to affect the page load time and the spec-reading
 * experience.)
 *
 * Plugins run based on conditions defined in the `shouldLoadPlugin()` method.
 * They can also be force-enabled by inserting
 * `?enable_<plugin_id>=1` in the URL.
 */

import type { ConditionalPluginInput } from './types.d';
import { shouldLoadPlugin } from './should_load_plugin';
import { loadPlugin } from './load_plugin';

/**
 * When adding a new Plugin:
 * 1. Add the plugin definition to `./plugins/[your-plugin].plugin.ts`
 * 2. Choose a plugin ID, then add it to this list
 * 3. Add a condition to `shouldLoadPlugin()` for this plugin ID
 * 4. Update `loadPlugin()` to load the plugin definition from (1)
 */
const PLUGIN_IDS = [
  'halloween',
  'april_fools_languages',
  'april_fools_star_wars',
];

const pluginsPromises = PLUGIN_IDS.filter((pluginId) =>
  shouldLoadPlugin(pluginId),
).map((pluginId) => loadPlugin(pluginId));

export async function executePlugins(
  input: ConditionalPluginInput,
): Promise<void> {
  const plugins = await Promise.all(pluginsPromises);
  await Promise.all(
    plugins.map(async (plugin) => {
      await plugin?.(input);
    }),
  );
}
