import createSubtheme from './createSubtheme';
import Subtheme from './Subtheme';

import default_theme from './definitions/default.theme';
import bella_theme from './definitions/bella.theme';
import modern_theme from './definitions/modern.theme';
import xcode_dark_theme from './definitions/xcode_dark.theme';

export interface RegisteredSubthemes {
  [name: string]: Subtheme,
}

const registered_subthemes: RegisteredSubthemes = {
  'default': createSubtheme('default', default_theme),
  'bella': createSubtheme('bella', bella_theme),
  'modern': createSubtheme('modern', modern_theme),
  'xcode-dark': createSubtheme('xcode-dark', xcode_dark_theme),
};
export default registered_subthemes;
