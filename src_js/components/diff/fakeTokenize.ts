const WORD_REGEX = /(\w*)([\p{Punctuation}\p{Separator}]*)/u;
export const WORD_BOUNDARY_REGEX = /[\p{Punctuation}\p{Separator}]/u;

/**
 * A very simple "tokenizer" that just splits a string into words. No other
 * fancy normalization. Whitespace and punctuation are retained but are split
 * into separate tokens.
 *
 * Because word boundaries are retained, the following is true:
 * ```javascript
 * fakeTokenize(str).join('') === str
 * ```
 */
export function fakeTokenize(text: string): Array<string> {
  return text.split(WORD_REGEX).filter(Boolean);
}
