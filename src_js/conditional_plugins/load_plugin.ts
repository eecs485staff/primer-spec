import { Plugin } from './types.d';

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
