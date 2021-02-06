import createSubtheme from './createSubtheme';
import Subtheme from './Subtheme';

import default_theme from './definitions/default.theme';
import bella_theme from './definitions/bella.theme';
import modern_theme from './definitions/modern.theme';
import xcode_civic_theme from './definitions/xcode_civic.theme';

export interface RegisteredSubthemes {
  [name: string]: Subtheme;
}

export default {
  default: createSubtheme('default', 'Primer', default_theme),
  bella: createSubtheme('bella', 'Bella', bella_theme),
  modern: createSubtheme('modern', 'Modern', modern_theme),
  'xcode-civic': createSubtheme(
    'xcode-civic',
    'Xcode Civic',
    xcode_civic_theme,
  ),
} as RegisteredSubthemes;
