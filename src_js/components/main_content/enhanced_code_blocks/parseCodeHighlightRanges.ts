/**
 * Parse a string reprenting a list of line numbers, some of which may be
 * ranges. The parsed output is a Set of line numbers that are included in the
 * range.
 *
 * For instance, the string `'13, 24-26, 25-27'` is parsed as
 * `Set([13, 24, 25, 26, 27])`
 *
 * @param rawHighlightRanges A comma-separated string representing ranges
 * @param maxLineNumber The maximum valid line number (BEFORE removing lines)
 * @param removedLineNumbers A list of line numbers that were removed from the
 *                           final code block (hence the raw highlight ranges
 *                           need to be updated based on the removed line
 *                           numbers)
 */
export function parseCodeHighlightRanges(
  rawHighlightRanges: string | null,
  maxLineNumber: number,
  removedLineNumbers?: Array<number>,
): Set<number> {
  const validRemovedLines = (
    removedLineNumbers ?? []
  ).filter((removedLineNumber) =>
    isNumWithinInclusiveRange(removedLineNumber, 1, maxLineNumber),
  );
  const normalizedMaxLineNumber = maxLineNumber - validRemovedLines.length;

  const highlightedLines = new Set<number>();
  if (!rawHighlightRanges) {
    return highlightedLines;
  }

  const ranges = rawHighlightRanges.split(',');
  ranges.forEach((range) => {
    // First check if it's a single number
    const potentialLineNum = +range;
    if (
      isNumWithinInclusiveRange(potentialLineNum, 1, normalizedMaxLineNumber)
    ) {
      addLineNumberToHighlightRanges(
        potentialLineNum,
        highlightedLines,
        validRemovedLines,
      );
    } else {
      const rangeParts = range.trim().split('-');
      if (rangeParts.length === 2) {
        const lower = +rangeParts[0];
        const upper = +rangeParts[1];
        if (
          isNumWithinInclusiveRange(lower, 1, normalizedMaxLineNumber) &&
          isNumWithinInclusiveRange(upper, 1, normalizedMaxLineNumber) &&
          lower <= upper
        ) {
          for (let i = lower; i <= upper; ++i) {
            addLineNumberToHighlightRanges(
              i,
              highlightedLines,
              validRemovedLines,
            );
          }
        }
      }
    }
  });
  return highlightedLines;
}

/**
 * Return a boolean indicating whether `num` is in the range [`lower`, `upper`]
 * (inclusive).
 */
function isNumWithinInclusiveRange(
  num: number | null,
  lower: number,
  upper: number,
): boolean {
  return num != null && !Number.isNaN(num) && num >= lower && num <= upper;
}

function addLineNumberToHighlightRanges(
  lineNumberToAdd: number,
  highlightedLineRanges: Set<number>,
  removedLineNumbers?: Array<number> | null,
): void {
  const normalizedNum = normalizeAfterRemovingLines(
    lineNumberToAdd,
    removedLineNumbers,
  );
  if (normalizedNum != null) {
    highlightedLineRanges.add(normalizedNum);
  }
}

function normalizeAfterRemovingLines(
  num: number,
  removedLineNumbers?: Array<number> | null,
): number | null {
  if (removedLineNumbers == null) {
    return num;
  } else if (removedLineNumbers.includes(num)) {
    return null;
  }
  return (
    num -
    removedLineNumbers.filter((removedLineNumber) => num >= removedLineNumber)
      .length
  );
}
