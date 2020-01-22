import Subtheme, {SubthemeVarsType, SUBTHEME_VARS} from './Subtheme';

function apply(theme_vars: SubthemeVarsType) {
  const bodyEl = document.body;
  for (let [theme_var, value] of Object.entries(theme_vars)) {
    bodyEl.style.setProperty(theme_var, value);
  }
}

function reset() {
  const bodyEl = document.body;
  SUBTHEME_VARS.map(theme_var => {
    bodyEl.style.removeProperty(theme_var);
  });
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
    reset: reset,
  };
}
