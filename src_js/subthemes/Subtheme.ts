export default interface Subtheme {
  readonly name: string,
  apply(): void,
  reset(): void,
}

export const SUBTHEME_VARS = [
  '--sidebar-bg-color',
  '--sidebar-heading-text-color',
  '--sidebar-heading-link-color',

  '--sidebar-toc-h1-link-color',
  '--sidebar-toc-h1-border-color',
  '--sidebar-toc-h2-link-color',

  '--sidebar-active-toc-section-bg-color',
  '--sidebar-active-toc-section-link-color',
  '--sidebar-toc-section-link-color',

  '--main-heading-text-color',
  '--main-heading-link-color',
  '--main-link-color',
  '--hoverable-link-hover-color',

  '--main-bg-color',
  '--main-text-color',
  '--main-table-pre-bg-color',
  '--main-table-pre-text-color',
  '--main-blockquote-text-color',
];

export interface SubthemeVarsType {
  [css_var: string]: string,
}
