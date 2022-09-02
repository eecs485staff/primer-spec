type HTMLElementLikeType = { tagName: string };

export type HeadingsSectionType = {
  heading: HTMLElementLikeType;
  active: boolean;
  section: HeadingsSectionType[];
};

/**
 * Converts a flat list of heading nodes into a nested tree-like structure
 * indicating "sections".
 *
 * A particular heading's "section" consists of all subsequent headings with
 * lower precedence. For instance:
 *
 *   Flat list of headings: `[h2, h1, h3, h4, h3]`
 *   Active heading index: 3
 *   Resulting unflattened structure:
 * ```
 *     [
 *       { heading: h2, section: [] },
 *       {
 *         heading: h1,
 *         section: [
 *           {
 *             heading: h3,
 *             active: true,
 *             section: [
 *               { heading: h4, section: [] },
 *             ],
 *           },
 *           { heading: h3, section: [] }
 *         ],
 *       }
 *     ]
 * ```
 *
 * @param headings List of HTML elements representing heading nodes in the DOM
 * @param activeHeadingIndex (optional) Index of the active heading item.
 */
export default function unflattenHeadings(
  headings: HTMLElementLikeType[],
  activeHeadingIndex = -1,
): HeadingsSectionType[] {
  if (!headings.length) {
    return [];
  }

  // This is where we will build the result.
  const unflattened: HeadingsSectionType[] = [];

  // We process each of the headings in the list sequentially. Since we will
  // init the following vars with headings[0], we start headingsIndex at 1.
  let headingsIndex = 1;

  // This is the section of the previous heading (headings[headingsIndex - 1]).
  let previousHeadingSection: HeadingsSectionType = {
    heading: headings[0],
    active: activeHeadingIndex === 0,
    section: [],
  };

  // When we find a heading of lower precedence, we store the higher
  // precedence headings in this stack.
  // For instance, when processing [h1, h2, h3], and headingsIndex is 2, we
  // expect the stack to hold h1's section, and we expect
  // previousHeadingSection to hold h2's section.
  const stackOfSections: HeadingsSectionType[] = [];

  while (headingsIndex < headings.length) {
    const currentHeading = headings[headingsIndex];
    const currentHeadingSection = {
      heading: currentHeading,
      active: activeHeadingIndex === headingsIndex,
      section: [],
    };

    if (currentHeading.tagName > previousHeadingSection.heading.tagName) {
      // The current heading should be included in the previous heading's
      // section.
      previousHeadingSection.section.push(currentHeadingSection);
      // We need to compare the current heading with subsequent headings.
      // (What if the next heading needs to be included in the current
      // heading's section?)
      stackOfSections.push(previousHeadingSection);
      previousHeadingSection = currentHeadingSection;
      ++headingsIndex;
    } else {
      // The current heading should NOT be part of the previous heading's
      // section.
      // eslint-disable-next-line no-lonely-if
      if (stackOfSections.length) {
        // But maybe the current heading needs to be included in the section of
        // the heading before the previous? We need to compare with every
        // section in the stack to be sure. (Notice that we don't increment
        // headingsIndex because we're not yet done with this heading.)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        previousHeadingSection = stackOfSections.pop()!;
      } else {
        // The current heading can't fit in any of the existing sections. We
        // close off the previousHeadingSection and start a new top-level
        // section.
        unflattened.push(previousHeadingSection);
        previousHeadingSection = currentHeadingSection;
        ++headingsIndex;
      }
    }
  }

  // At the end, if the stack has stuff, we need to close off the section.
  if (stackOfSections.length) {
    // Notice that previousHeadingSection may not be at the bottom of the
    // stack, but it's definitely included in one of the sub-sections.
    unflattened.push(stackOfSections[0]);
  } else {
    // The previousHeadingSection is not attached to any other sections, so
    // it's a top-level section.
    unflattened.push(previousHeadingSection);
  }
  return unflattened;
}
