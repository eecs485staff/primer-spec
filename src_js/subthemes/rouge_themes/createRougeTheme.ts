import {
  ROUGE_CLASS_NAMES,
  ROUGE_STYLE_PROPS,
  RougeTheme,
  RougeVarsType,
} from '../Subtheme';

interface RougeVarsTypeInternal {
  [class_name: string]: {
    [style_prop: string]: string | undefined;
  };
}

function apply(theme_vars: RougeVarsTypeInternal) {
  const documentEl = document.documentElement;
  ROUGE_CLASS_NAMES.map((class_name) => {
    if (theme_vars[class_name]) {
      for (const [style_prop, value] of Object.entries(
        theme_vars[class_name],
      )) {
        const var_name = `--primer-spec-rouge-${class_name}-${style_prop}`;
        documentEl.style.setProperty(var_name, value ?? null);
      }
    }
  });
}

function reset() {
  const documentEl = document.documentElement;
  ROUGE_CLASS_NAMES.map((class_name) => {
    ROUGE_STYLE_PROPS.map((style_prop) => {
      const var_name = `--primer-spec-rouge-${class_name}-${style_prop}`;
      documentEl.style.removeProperty(var_name);
    });
  });
}

/**
 * Create a Rouge (syntax highlighting) theme based on a given config
 * @param name The name of the subtheme
 * @param theme_vars The config describing this Rouge theme
 */
export default function createRougeTheme(
  name: string,
  theme_vars: RougeVarsType,
): RougeTheme {
  return {
    name,
    // TODO: Figure out why TypeScript is not able to unify RougeVarsType and
    //       RougeVarsTypeInternal.
    apply: () => apply(theme_vars as unknown as RougeVarsTypeInternal),
    reset,
  };
}
