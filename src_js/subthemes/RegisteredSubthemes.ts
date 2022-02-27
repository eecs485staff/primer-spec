import createSubtheme from './createSubtheme';
import Subtheme, { SubthemeDefinitionType } from './Subtheme';

import default_theme from './definitions/default.theme';
import bella_theme from './definitions/bella.theme';
import modern_theme from './definitions/modern.theme';
import xcode_civic_theme from './definitions/xcode_civic.theme';

export interface RegisteredSubthemes {
  [name: string]: Subtheme;
}

export const REGISTERED_SUBTHEMES = {
  default: createSubtheme('default', 'Primer', default_theme),
  bella: createSubtheme('bella', 'Bella', bella_theme),
  modern: createSubtheme('modern', 'Modern', modern_theme),
  'xcode-civic': createSubtheme(
    'xcode-civic',
    'Xcode Civic',
    xcode_civic_theme,
  ),
} as RegisteredSubthemes;

export function registerNewSubtheme(
  name: string,
  label: string,
  definition: SubthemeDefinitionType,
): void {
  REGISTERED_SUBTHEMES[name] = createSubtheme(name, label, definition);
}

window.PrimerSpec = {
  ...window.PrimerSpec,
  REGISTERED_SUBTHEMES,
  registerNewSubtheme,
};
