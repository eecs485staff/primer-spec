import type { HeadingsSectionType } from './unflattenHeadings';

const HIGHEST_EXPECTED_HEADING_LEVEL = 1;

export function elevateHeadingSectionsLevels(
  unflattenedHeadings: HeadingsSectionType[],
): HeadingsSectionType[] {
  const headingsWithoutTitle = removeTitleIfNecessary(unflattenedHeadings);

  const highestHeadingLevel = getHighestHeadingLevel(headingsWithoutTitle);
  if (highestHeadingLevel == null) {
    // This should never happen, we should silently abort this process.
    console.warn(
      'Primer Spec: Something went wrong while attempting to elevate the header levels in the sidebar. Please report this issue on https://github.com/eecs485staff/primer-spec/issues',
    );
    return unflattenedHeadings;
  }

  const diff = highestHeadingLevel - HIGHEST_EXPECTED_HEADING_LEVEL;
  return updateAllHeaderLevels(headingsWithoutTitle, diff);
}

/**
 * If there is only a single H1 in the entire document, then that's a title
 * that doesn't need to be displayed in the sidebar.
 */
function removeTitleIfNecessary(unflattenedHeadings: HeadingsSectionType[]) {
  if (
    unflattenedHeadings.length === 1 &&
    unflattenedHeadings[0].headingLevel === 1
  ) {
    return unflattenedHeadings[0].section;
  }
  return unflattenedHeadings;
}

function getHighestHeadingLevel(
  unflattenedHeadings: HeadingsSectionType[],
): number | null {
  return unflattenedHeadings.reduce(
    (highestHeadingLevelSoFar: number | null, headingSection) => {
      if (
        highestHeadingLevelSoFar == null ||
        headingSection.headingLevel < highestHeadingLevelSoFar
      ) {
        return headingSection.headingLevel;
      }
      return highestHeadingLevelSoFar;
    },
    null,
  );
}

function updateAllHeaderLevels(
  unflattenedHeadings: HeadingsSectionType[],
  elevateBy: number,
): HeadingsSectionType[] {
  if (elevateBy <= 0) {
    return unflattenedHeadings;
  }

  return unflattenedHeadings.map((headingSection) => {
    let newHeadingLevel = headingSection.headingLevel - elevateBy;
    if (newHeadingLevel < HIGHEST_EXPECTED_HEADING_LEVEL) {
      console.error('Primer Spec: Unexpectedly negative heading level');
      newHeadingLevel = HIGHEST_EXPECTED_HEADING_LEVEL;
    }
    return {
      ...headingSection,
      headingLevel: newHeadingLevel,
      section: updateAllHeaderLevels(headingSection.section, elevateBy),
    };
  });
}
