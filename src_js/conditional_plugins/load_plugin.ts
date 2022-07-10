import { Plugin } from './types.d';

/**
 * Given a plugin ID, lazy-load the appropriate JS module containing the plugin
 * definition and return the plugin.
 *
 * Notice that we use the dynamic `import()` syntax. Webpack identifies this as
 * an opportunity to split the JS bundle, hence decreasing the size of the main
 * Primer Spec JS bundle. Additionally, we won't download the JS code for all
 * plugins, only the ones that need to run.
 */
export async function loadPlugin(pluginId: string): Promise<Plugin | null> {
  let plugin: Plugin | null = null;
  switch (pluginId) {
    case 'halloween':
      plugin = (await import('./plugins/halloween.plugin')).default;
      break;
    case 'april_fools_languages':
      plugin = (await import('./plugins/april_fools_languages.plugin')).default;
      break;
  }
  return plugin;
}
