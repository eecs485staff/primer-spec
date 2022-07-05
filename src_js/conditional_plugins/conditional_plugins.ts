/**
 * Conditional plugins are loaded asynchronously and are intentionally
 * isolated from the rest of Primer Spec. This is because this conditional
 * plugin framework was designed to build temporary pranks and jokes! (We don't
 * want these jokes to affect the page load time and the spec-reading
 * experience.)
 *
 * Plugins run based on conditions defined in each of their `shouldRun()`
 * methods. They can also be force-enabled by inserting
 * `?enable_<plugin_id>=1` in the URL.
 */

import { initialize as initializeHalloweenPlugin } from './plugins/halloween.plugin';

import type { ConditionalPluginInput } from './types.d';

const PLUGINS = [initializeHalloweenPlugin()]
  .filter((pluginDefinition) => {
    const forceEnableOption = pluginForceEnableOption(pluginDefinition.id);
    if (forceEnableOption !== null) {
      return forceEnableOption;
    }
    return pluginDefinition.shouldRun();
  })
  .map((pluginDefinition) => pluginDefinition.plugin);

export async function executePlugins(
  input: ConditionalPluginInput,
): Promise<void> {
  await Promise.all(
    PLUGINS.map(async (plugin) => {
      await plugin(input);
    }),
  );
}

function pluginForceEnableOption(pluginId: string): boolean | null {
  const match = window.location.search.match(
    new RegExp(`enable_${pluginId}=([0|1])`),
  );
  if (match) {
    return match[1] === '1';
  }
  return null;
}
