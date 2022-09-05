import { elevateHeadingSectionsLevels } from '../elevateHeadingSectionLevels';
import unflattenHeadings from '../unflattenHeadings';

function createElement(tagName: string) {
  // Naughty typecasting to fix Typescript errors in this test!
  return { tagName } as HTMLElement;
}

describe('elevateHeadingSectionsLevels', () => {
  test('no headings', () => {
    const consoleWarn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const unflattened = elevateHeadingSectionsLevels([]);
    expect(unflattened).toStrictEqual([]);

    consoleWarn.mockReset();
  });

  test('already fully elevated headers', () => {
    const headings = [
      createElement('H1'),
      createElement('H3'),
      createElement('H1'),
    ];
    const unflattened = elevateHeadingSectionsLevels(
      unflattenHeadings(headings),
    );
    expect(unflattened).toStrictEqual([
      {
        heading: createElement('H1'),
        headingLevel: 1,
        active: false,
        section: [
          {
            heading: createElement('H3'),
            headingLevel: 3,
            active: false,
            section: [],
          },
        ],
      },
      {
        heading: createElement('H1'),
        headingLevel: 1,
        active: false,
        section: [],
      },
    ]);
  });

  test('elevate headings by two steps', () => {
    const headings = [
      createElement('H4'),
      createElement('H3'),
      createElement('H4'),
      createElement('H5'),
      createElement('H3'),
      createElement('H5'),
    ];
    const unflattened = elevateHeadingSectionsLevels(
      unflattenHeadings(headings),
    );
    expect(unflattened).toStrictEqual([
      {
        heading: createElement('H4'),
        headingLevel: 2,
        active: false,
        section: [],
      },
      {
        heading: createElement('H3'),
        headingLevel: 1,
        active: false,
        section: [
          {
            heading: createElement('H4'),
            headingLevel: 2,
            active: false,
            section: [
              {
                heading: createElement('H5'),
                headingLevel: 3,
                active: false,
                section: [],
              },
            ],
          },
        ],
      },
      {
        heading: createElement('H3'),
        headingLevel: 1,
        active: false,
        section: [
          {
            heading: createElement('H5'),
            headingLevel: 3,
            active: false,
            section: [],
          },
        ],
      },
    ]);
  });

  test('remove title, then elevate headings by two steps', () => {
    const headings = [
      createElement('H1'), // this is a title
      createElement('H4'),
      createElement('H3'),
      createElement('H4'),
      createElement('H5'),
      createElement('H3'),
      createElement('H5'),
    ];
    const unflattened = elevateHeadingSectionsLevels(
      unflattenHeadings(headings),
    );
    expect(unflattened).toStrictEqual([
      {
        heading: createElement('H4'),
        headingLevel: 2,
        active: false,
        section: [],
      },
      {
        heading: createElement('H3'),
        headingLevel: 1,
        active: false,
        section: [
          {
            heading: createElement('H4'),
            headingLevel: 2,
            active: false,
            section: [
              {
                heading: createElement('H5'),
                headingLevel: 3,
                active: false,
                section: [],
              },
            ],
          },
        ],
      },
      {
        heading: createElement('H3'),
        headingLevel: 1,
        active: false,
        section: [
          {
            heading: createElement('H5'),
            headingLevel: 3,
            active: false,
            section: [],
          },
        ],
      },
    ]);
  });
});
