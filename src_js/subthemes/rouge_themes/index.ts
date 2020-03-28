import createRougeTheme from './createRougeTheme';
import { RougeTheme } from '../Subtheme';

import default_rouge_theme from './default.rouge';
import monokai_rouge_theme from './monokai.rouge';

export interface RegisteredRougeThemes {
  [name: string]: RougeTheme;
}

const registered_rouge_themes: RegisteredRougeThemes = {
  default: createRougeTheme('default', default_rouge_theme),
  monokai: createRougeTheme('monokai', monokai_rouge_theme),
};
export default registered_rouge_themes;
