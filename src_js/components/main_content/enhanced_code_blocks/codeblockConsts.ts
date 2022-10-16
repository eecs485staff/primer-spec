export enum CodeblockVariant {
  ENHANCED = 'enhanced',
  NO_LINE_NUMBERS = 'no-line-numbers',
  LEGACY = 'legacy',
}

/**
 * The class used on each <td> element that represents the contents of the code
 * block.
 */
export const CODEBLOCK_LINE_CLASS = 'primer-spec-code-block-line-code';

/**
 * We use the following class to ensure that we don't double-process code
 * blocks.
 */
export const CODEBLOCK_PROCESSED_CLASS = 'primer-spec-code-block-processed';

/**
 * Since we want to linkify code block titles, this is the class used to
 * identify them to AnchorJS.
 */
export const CODEBLOCK_TITLE_CLASS = 'primer-spec-code-block-title';

/**
 * We perform special handling for blocks in the `console` language: If a user
 * clicks the line number, the entire line will be highlighted EXCLUDING the
 * prompt (`$`) at the beginning, if it exists.
 * See the special handling in `createCodeBlockLine()`.
 */
export const LANGUAGE_CONSOLE = 'console';
