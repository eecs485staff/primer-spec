import { initialize as initializeHalloweenPlugin } from './halloween.plugin';

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
