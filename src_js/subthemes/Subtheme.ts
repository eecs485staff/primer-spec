export default interface Subtheme {
  readonly name: string;
  readonly label: string;
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

  '--primer-spec-callout-neutral-bg-color',
  '--primer-spec-callout-neutral-text-color',
  '--primer-spec-callout-neutral-border-color',
  '--primer-spec-callout-info-bg-color',
  '--primer-spec-callout-info-text-color',
  '--primer-spec-callout-info-border-color',
  '--primer-spec-callout-warning-bg-color',
  '--primer-spec-callout-warning-text-color',
  '--primer-spec-callout-warning-border-color',
  '--primer-spec-callout-danger-bg-color',
  '--primer-spec-callout-danger-text-color',
  '--primer-spec-callout-danger-border-color',
  '--primer-spec-callout-success-bg-color',
  '--primer-spec-callout-success-text-color',
  '--primer-spec-callout-success-border-color',

  '--gist-default-color',
  '--gist-bg-color',
  '--gist-border-color',
  '--gist-header-bg-color',
  '--gist-line-number-color',
  '--gist-highlight-bg-color',
  '--gist-highlight-shadow-color',
  '--gist-button-hover-color',

  '--tooltip-background-color',
  '--tooltip-color',
] as const;

// As described in: https://stackoverflow.com/a/45257357/5868796
export type SubthemeDefinitionVariableType = typeof SUBTHEME_VARS[number];

// Mapped type: https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types
export type SubthemeModeDefinitionType = {
  [T in SubthemeDefinitionVariableType]?: string;
} & { rouge_theme: string };

export interface SubthemeDefinitionType {
  light: SubthemeModeDefinitionType;
  dark: SubthemeModeDefinitionType;
}

export interface RougeTheme {
  readonly name: string;
  apply(): void;
  reset(): void;
}

export const ROUGE_STYLE_PROPS = [
  'color',
  'background-color',
  'font-style',
  'font-weight',
] as const;

export const ROUGE_CLASS_NAMES = [
  'cm', // Comment::Multiline
  'cp', // Comment::Preproc
  'c1', // Comment::Single
  'cs', // Comment::Special
  'cd', // Comment
  'c', // Comment

  'err', // Error
  'gd', // Generic::Deleted
  'ge', // Generic::Emph
  'gr', // Generic::Error
  'gh', // Generic::Heading
  'gi', // Generic::Inserted
  'go', // Generic::Output
  'gp', // Generic::Prompt
  'gs', // Generic::Strong
  'gu', // Generic::Subheading
  'gt', // Generic::Traceback

  'kc', // Keyword::Constant
  'kd', // Keyword::Declaration
  'kn', // Keyword::Namespace
  'kp', // Keyword::Pseudo
  'kr', // Keyword::Reserved
  'kt', // Keyword::Type
  'kv', // Keyword
  'k', // Keyword

  'mf', // Literal::Number::Float
  'mh', // Literal::Number::Hex
  'il', // Literal::Number::Integer::Long
  'mi', // Literal::Number::Integer
  'mo', // Literal::Number::Oct
  'mb', // Literal::Number
  'mx', // Literal::Number
  'm', // Literal::Number

  'sb', // Literal::String::Backtick
  'sc', // Literal::String::Char
  'sd', // Literal::String::Symbol
  's2', // Literal::String::Double
  'se', // Literal::String::Escape
  'sh', // Literal::String::Heredoc
  'si', // Literal::String::Interpol
  'sx', // Literal::String::Other
  'sr', // Literal::String::Regex
  's1', // Literal::String::Single
  'ss', // Literal::String::Symbol
  's', // Literal::String

  'na', // Name::Attribute
  'bp', // Name::Builtin::Pseudo
  'nb', // Name::Builtin
  'nc', // Name::Class
  'no', // Name::Constant
  'nd', // Name::Decorator
  'ni', // Name::Entity
  'ne', // Name::Exception
  'nf', // Name::Function
  'nl', // Name::Label
  'nn', // Name::Namespace
  'nt', // Name::Tag
  'nx', // Name::Other
  'vc', // Name::Variable::Class
  'vg', // Name::Variable::Global
  'vi', // Name::Variable::Instance
  'nv', // Name::Variable

  'ow', // Operator::Word
  'o', // Operator
  'w', // Text::Whitespace
  'txt', // Text
] as const;

export type RougeStyle = {
  [T in typeof ROUGE_STYLE_PROPS[number]]?: string;
};

export type RougeVarsType = {
  [T in typeof ROUGE_CLASS_NAMES[number]]: RougeStyle;
};
