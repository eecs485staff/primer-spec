import Subtheme, {SubthemeVarsType} from './Subtheme';

function apply(theme_vars: SubthemeVarsType) {
  const documentEl = document.documentElement;
  for (let [theme_var, value] of Object.entries(theme_vars)) {
    documentEl.style.setProperty(theme_var, value);
  }
}

/**
 * Create a Subtheme based on a given CSS config
 * @param name The name of the subtheme
 * @param theme_vars The CSS variables describing this subtheme
 */
export default function createSubtheme(
  name: string,
  theme_vars: SubthemeVarsType,
): Subtheme {
  return {
    name: name,
    apply: () => apply(theme_vars),
  };
}
