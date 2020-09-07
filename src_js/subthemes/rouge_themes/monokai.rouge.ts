import { RougeVarsType } from '../Subtheme';

// The styles in this file were partially generated using the command:
// bundle exec rougify style monokai.sublime
// Readability changes are based on the original Roguify source:
// https://github.com/rouge-ruby/rouge/blob/184848ae363c41b7f8372791d6f4701bf601c722/lib/rouge/themes/monokai_sublime.rb

// const black = '#000000';
const bright_green = '#a6e22e';
const bright_pink = '#f92672';
const carmine = '#960050';
const dark = '#49483e';
// const dark_graphite = '#272822';
const dark_grey = '#888888';
// const dark_red = '#aa0000';
const dimgrey = '#75715e';
const emperor = '#555555';
const grey = '#999999';
const light_grey = '#aaaaaa';
const light_violet = '#ae81ff';
const soft_cyan = '#66d9ef';
const soft_yellow = '#e6db74';
// const very_dark = '#1e0010';
// const whitish = '#f8f8f2';
const orange = '#f6aa11';
const white = '#ffffff';

const monokai_rouge_style: RougeVarsType = {
  cm: {
    // Comment::Multiline
    color: dimgrey,
  },
  cp: {
    // Comment::Preproc
    color: dimgrey,
  },
  c1: {
    // Comment::Single
    color: dimgrey,
  },
  cs: {
    // Comment::Special
    color: dimgrey,
  },
  cd: {
    // Comment
    color: dimgrey,
  },
  c: {
    // Comment
    color: dimgrey,
  },

  err: {
    // Error
    color: carmine,
  },
  gd: {
    // Generic::Deleted
    color: dark,
  },
  ge: {
    // Generic::Emph
    color: dark,
  },
  gr: {
    // Generic::Error
    color: carmine,
  },
  gh: {
    // Generic::Heading
    color: grey,
  },
  gi: {
    // Generic::Inserted
    color: dark,
  },
  go: {
    // Generic::Output
    color: dark_grey,
  },
  gp: {
    // Generic::Prompt
    color: emperor,
  },
  gs: {
    // Generic::Strong
  },
  gu: {
    // Generic::Subheading
    color: light_grey,
  },
  gt: {
    // Generic::Traceback
    color: carmine,
  },

  kc: {
    // Keyword::Constant
    color: soft_cyan,
  },
  kd: {
    // Keyword::Declaration
    color: soft_cyan,
  },
  kn: {
    // Keyword::Namespace
    color: bright_pink,
  },
  kp: {
    // Keyword::Pseudo
    color: bright_pink,
  },
  kr: {
    // Keyword::Reserved
    color: soft_cyan,
  },
  kt: {
    // Keyword::Type
    color: soft_cyan,
  },
  kv: {
    // Keyword
    color: bright_pink,
  },
  k: {
    // Keyword
    color: bright_pink,
  },

  mf: {
    // Literal::Number::Float
    color: light_violet,
  },
  mh: {
    // Literal::Number::Hex
    color: light_violet,
  },
  il: {
    // Literal::Number::Integer::Long
    color: light_violet,
  },
  mi: {
    // Literal::Number::Integer
    color: light_violet,
  },
  mo: {
    // Literal::Number::Oct
    color: light_violet,
  },
  mb: {
    // Literal::Number
    color: light_violet,
  },
  mx: {
    // Literal::Number
    color: light_violet,
  },
  m: {
    // Literal::Number
    color: light_violet,
  },

  sb: {
    // Literal::String::Backtick
    color: soft_yellow,
  },
  sc: {
    // Literal::String::Char
    color: light_violet,
  },
  sd: {
    // Literal::String::Symbol
    color: soft_yellow,
  },
  s2: {
    // Literal::String::Double
    color: soft_yellow,
  },
  se: {
    // Literal::String::Escape
    color: light_violet,
  },
  sh: {
    // Literal::String::Heredoc
    color: soft_yellow,
  },
  si: {
    // Literal::String::Interpol
    color: soft_yellow,
  },
  sx: {
    // Literal::String::Other
    color: soft_yellow,
  },
  sr: {
    // Literal::String::Regex
    color: orange,
  },
  s1: {
    // Literal::String::Single
    color: soft_yellow,
  },
  ss: {
    // Literal::String::Symbol
    color: light_violet,
  },
  s: {
    // Literal::String
    color: soft_yellow,
  },

  na: {
    // Name::Attribute
    color: bright_green,
  },
  bp: {
    // Name::Builtin::Pseudo
    color: white,
  },
  nb: {
    // Name::Builtin
    color: orange,
  },
  nc: {
    // Name::Class
    color: bright_green,
  },
  no: {
    // Name::Constant
    color: soft_cyan,
  },
  nd: {
    // Name::Decorator
    color: bright_green,
  },
  ni: {
    // Name::Entity
    color: white,
  },
  ne: {
    // Name::Exception
    color: bright_green,
  },
  nf: {
    // Name::Function
    color: bright_green,
  },
  nl: {
    // Name::Label
    color: white,
  },
  nn: {
    // Name::Namespace
    color: white,
  },
  nt: {
    // Name::Tag
    color: bright_pink,
  },
  vc: {
    // Name::Variable::Class
    color: white,
  },
  vg: {
    // Name::Variable::Global
    color: white,
  },
  vi: {
    // Name::Variable::Instance
    color: white,
  },
  nv: {
    // Name::Variable::Instance
    color: white,
  },

  ow: {
    // Operator::Word
    color: bright_pink,
  },
  o: {
    // Operator
    color: bright_pink,
  },
  w: {
    // Text::Whitespace
    color: white,
  },
  txt: {
    color: white,
    'background-color': 'rgb(35, 37, 41)',
  },
};
export default monokai_rouge_style;
