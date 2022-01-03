import { fakeTokenize, WORD_BOUNDARY_REGEX } from './fakeTokenize';

export type DiffTextHunk =
  | {
      type: 'shared';
      value: string;
    }
  | {
      type: 'diff';
      removed: string;
      inserted: string;
    };

export function diffTextByWords(
  oldText: string | null,
  newText: string | null,
): Array<DiffTextHunk> {
  if (!oldText && !newText) {
    return [];
  }
  if (!oldText) {
    return [{ type: 'diff', removed: '', inserted: newText ?? '' }];
  }
  if (!newText) {
    return [{ type: 'diff', removed: oldText, inserted: '' }];
  }

  const oldTokens = fakeTokenize(oldText);
  const newTokens = fakeTokenize(newText);
  const diff: Array<DiffTextHunk> = [];

  let oldIndex = 0;
  let newIndex = 0;
  let currentSharedTokens = [];
  while (oldIndex < oldTokens.length && newIndex < newTokens.length) {
    // (1) First greedily consume shared tokens.
    while (
      oldIndex < oldTokens.length &&
      newIndex < newTokens.length &&
      oldTokens[oldIndex] === newTokens[newIndex]
    ) {
      currentSharedTokens.push(oldTokens[oldIndex]);
      oldIndex++;
      newIndex++;
    }
    if (currentSharedTokens.length !== 0) {
      diff.push({ type: 'shared', value: currentSharedTokens.join('') });
      currentSharedTokens = [];
    }

    // (2) Now that we've hit a difference, let's find the next point of
    //     similarity. In other words, we'll find the next "old" word that
    //     appears in the list of new words.
    const removedTokens = [];
    let insertedTokens: Array<string> = [];
    while (oldIndex < oldTokens.length && newIndex < newTokens.length) {
      // If the token is whitespace, don't attempt to look for a match in the
      // new text. This improves the perceived quality of the diff!
      if (WORD_BOUNDARY_REGEX.test(oldTokens[oldIndex])) {
        removedTokens.push(oldTokens[oldIndex]);
        oldIndex++;
        continue;
      }
      // Find the first occurrence of the old token in the remaining new text.
      const oldTokenInNewTokensIndex = newTokens.findIndex(
        (newToken, i) => i > newIndex && newToken === oldTokens[oldIndex],
      );
      if (oldTokenInNewTokensIndex === -1) {
        // (2.1) The old token doesn't appear in the new text.
        //       Move on to the next old word.
        removedTokens.push(oldTokens[oldIndex]);
        oldIndex++;
      } else {
        // (2.2) The old token appears in the new text. Push any differing
        //       tokens into the diff before continuing to compare the shared
        //       text.
        insertedTokens = newTokens.slice(newIndex, oldTokenInNewTokensIndex);
        newIndex = oldTokenInNewTokensIndex;
        break;
      }
    }
    // If we exited the above loop without finding any remaining similarity
    // between old and new text, then push all remaining new text into the
    // diff.
    if (oldIndex >= oldTokens.length && newIndex < newTokens.length) {
      insertedTokens.push(...newTokens.slice(newIndex));
      newIndex = newTokens.length;
    }
    // As long as there truly *is* a difference, push it to the diff.
    if (removedTokens.length !== 0 || insertedTokens.length !== 0) {
      diff.push({
        type: 'diff',
        removed: removedTokens.join(''),
        inserted: insertedTokens.join(''),
      });
    }
  }

  return diff;
}
