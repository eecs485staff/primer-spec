export default interface Subtheme {
  readonly name: string;
  readonly theme_definition: SubthemeDefinitionType;
  apply(mode: SubthemeModeType): void;
  reset(mode: SubthemeModeType): void;
}

export const SUBTHEME_VARS = [
  '--sidebar-bg-color',
  '--sidebar-border-color',
  '--sidebar-heading-text-color',
  '--sidebar-heading-link-color',

  '--sidebar-toc-h1-link-color',
  '--sidebar-toc-h1-border-color',
  '--sidebar-toc-h2-link-color',

  '--sidebar-active-toc-section-bg-color',
  '--sidebar-active-toc-section-link-color',
  '--sidebar-active-toc-h1-section-link-color',
  '--sidebar-active-toc-h2-section-link-color',
  '--sidebar-toc-section-link-color',
  '--sidebar-tt-active-text-color',
  '--sidebar-tt-active-bg-color',
  '--sidebar-tt-active-border',
  '--sidebar-tt-active-border-radius',

  '--main-heading-text-color',
  '--main-heading-link-color',
  '--main-link-color',
  '--hoverable-link-hover-color',

  '--tt-text-color',
  '--tt-bg-color',
  '--tt-border',
  '--tt-border-radius',
  '--main-bg-color',
  '--main-text-color',
  '--main-table-pre-bg-color',
  '--main-table-pre-text-color',
  '--main-table-pre-border',
  '--main-blockquote-text-color',
  '--main-blockquote-text-border',
  '--main-header-border-bottom-color',
];

export interface SubthemeVarsType {
  [css_var: string]: string;
  rouge_theme: string;
}

export interface SubthemeDefinitionType {
  light: SubthemeVarsType;
  dark: SubthemeVarsType;
}

export type SubthemeModeType = 'light' | 'dark';

export interface RougeTheme {
  readonly name: string;
  apply(): void;
  reset(): void;
}

export interface RougeStyle {
  color?: string;
  'background-color'?: string;
  'font-style'?: string;
  'font-weight'?: string;
}

export interface RougeVarsType {
  cm: RougeStyle; // Comment::Multiline
  cp: RougeStyle; // Comment::Preproc
  c1: RougeStyle; // Comment::Single
  cs: RougeStyle; // Comment::Special
  cd: RougeStyle; // Comment
  c: RougeStyle; // Comment

  err: RougeStyle; // Error
  gd: RougeStyle; // Generic::Deleted
  ge: RougeStyle; // Generic::Emph
  gr: RougeStyle; // Generic::Error
  gh: RougeStyle; // Generic::Heading
  gi: RougeStyle; // Generic::Inserted
  go: RougeStyle; // Generic::Output
  gp: RougeStyle; // Generic::Prompt
  gs: RougeStyle; // Generic::Strong
  gu: RougeStyle; // Generic::Subheading
  gt: RougeStyle; // Generic::Traceback

  kc: RougeStyle; // Keyword::Constant
  kd: RougeStyle; // Keyword::Declaration
  kn: RougeStyle; // Keyword::Namespace
  kp: RougeStyle; // Keyword::Pseudo
  kr: RougeStyle; // Keyword::Reserved
  kt: RougeStyle; // Keyword::Type
  kv: RougeStyle; // Keyword
  k: RougeStyle; // Keyword

  mf: RougeStyle; // Literal::Number::Float
  mh: RougeStyle; // Literal::Number::Hex
  il: RougeStyle; // Literal::Number::Integer::Long
  mi: RougeStyle; // Literal::Number::Integer
  mo: RougeStyle; // Literal::Number::Oct
  mb: RougeStyle; // Literal::Number
  mx: RougeStyle; // Literal::Number
  m: RougeStyle; // Literal::Number

  sb: RougeStyle; // Literal::String::Backtick
  sc: RougeStyle; // Literal::String::Char
  sd: RougeStyle; // Literal::String::Symbol
  s2: RougeStyle; // Literal::String::Double
  se: RougeStyle; // Literal::String::Escape
  sh: RougeStyle; // Literal::String::Heredoc
  si: RougeStyle; // Literal::String::Interpol
  sx: RougeStyle; // Literal::String::Other
  sr: RougeStyle; // Literal::String::Regex
  s1: RougeStyle; // Literal::String::Single
  ss: RougeStyle; // Literal::String::Symbol
  s: RougeStyle; // Literal::String

  na: RougeStyle; // Name::Attribute
  bp: RougeStyle; // Name::Builtin::Pseudo
  nb: RougeStyle; // Name::Builtin
  nc: RougeStyle; // Name::Class
  no: RougeStyle; // Name::Constant
  nd: RougeStyle; // Name::Decorator
  ni: RougeStyle; // Name::Entity
  ne: RougeStyle; // Name::Exception
  nf: RougeStyle; // Name::Function
  nl: RougeStyle; // Name::Label
  nn: RougeStyle; // Name::Namespace
  nt: RougeStyle; // Name::Tag
  vc: RougeStyle; // Name::Variable::Class
  vg: RougeStyle; // Name::Variable::Global
  vi: RougeStyle; // Name::Variable::Instance
  nv: RougeStyle; // Name::Variable

  ow: RougeStyle; // Operator::Word
  o: RougeStyle; // Operator
  w: RougeStyle; // Text::Whitespace
  txt: RougeStyle; // Text
}

export const ROUGE_STYLE_PROPS = [
  'color',
  'background-color',
  'font-style',
  'font-weight',
];

export const ROUGE_CLASS_NAMES = [
  'cm',
  'cp',
  'c1',
  'cs',
  'cd',
  'c',
  'err',
  'gd',
  'ge',
  'gr',
  'gh',
  'gi',
  'go',
  'gp',
  'gs',
  'gu',
  'gt',
  'kc',
  'kd',
  'kn',
  'kp',
  'kr',
  'kt',
  'kv',
  'k',
  'mf',
  'mh',
  'il',
  'mi',
  'mo',
  'mb',
  'mx',
  'm',
  'sb',
  'sc',
  'sd',
  's2',
  'se',
  'sh',
  'si',
  'sx',
  'sr',
  's1',
  'ss',
  's',
  'na',
  'bp',
  'nb',
  'nc',
  'no',
  'nd',
  'ni',
  'ne',
  'nf',
  'nl',
  'nn',
  'nt',
  'vc',
  'vg',
  'vi',
  'nv',
  'ow',
  'o',
  'w',
  'txt',
];
