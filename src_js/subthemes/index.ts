import createSubtheme from './createSubtheme';
import Subtheme from './Subtheme';

import default_theme from './definitions/default.theme';
import bella_theme from './definitions/bella.theme';
import modern_theme from './definitions/modern.theme';
import xcode_dark_theme from './definitions/xcode_dark.theme';
import midnight_theme from './definitions/midnight.theme';

export interface RegisteredSubthemes {
  [name: string]: Subtheme;
}

export const LIGHT_SUBTHEMES: RegisteredSubthemes = {
  default: createSubtheme('default', default_theme),
  bella: createSubtheme('bella', bella_theme),
  modern: createSubtheme('modern', modern_theme),
};

export const DARK_SUBTHEMES: RegisteredSubthemes = {
  'xcode-dark': createSubtheme('xcode-dark', xcode_dark_theme),
  midnight: createSubtheme('midnight', midnight_theme),
};

export default {
  ...LIGHT_SUBTHEMES,
  ...DARK_SUBTHEMES,
};
