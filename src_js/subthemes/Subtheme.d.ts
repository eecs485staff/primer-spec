export default interface Subtheme {
  readonly name: string,
  apply(): void,
}

interface SubthemeVarsType {
  '--sidebar-bg-color': string,
  '--sidebar-heading-text-color': string,
  '--sidebar-heading-link-color': string,

  '--sidebar-toc-h1-link-color': string,
  '--sidebar-toc-h1-border-color': string,
  '--sidebar-toc-h2-link-color': string,

  '--sidebar-active-toc-section-bg-color': string,
  '--sidebar-active-toc-section-link-color': string,
  '--sidebar-toc-section-link-color': string,

  '--main-heading-text-color': string,
  '--main-heading-link-color': string,
  '--main-link-color': string,
  '--hoverable-link-hover-color': string,

  '--main-bg-color': string,
  '--main-text-color': string,
  '--main-pre-bg-color': string,
  '--main-table-pre-text-color': string,
  '--main-blockquote-text-color': string,
}
