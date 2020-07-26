import unflattenHeadings from '../unflattenHeadings';

function createElement(tagName: string) {
  return { tagName };
}

describe('unflattenHeadings', () => {
  test('no headings', () => {
    const unflattened = unflattenHeadings([]);
    expect(unflattened).toStrictEqual([]);
  });

  test('single heading', () => {
    const headings = [createElement('H1')];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      { heading: createElement('H1'), section: [] },
    ]);
  });

  test('two headings at same level', () => {
    const headings = [createElement('H1'), createElement('H1')];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      { heading: createElement('H1'), section: [] },
      { heading: createElement('H1'), section: [] },
    ]);
  });

  test('two headings one section', () => {
    const headings = [createElement('H1'), createElement('H2')];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      {
        heading: createElement('H1'),
        section: [{ heading: createElement('H2'), section: [] }],
      },
    ]);
  });

  test('two headings two sections', () => {
    const headings = [createElement('H2'), createElement('H1')];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      { heading: createElement('H2'), section: [] },
      { heading: createElement('H1'), section: [] },
    ]);
  });

  test('three headings two sections', () => {
    const headings = [
      createElement('H2'),
      createElement('H1'),
      createElement('H3'),
    ];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      { heading: createElement('H2'), section: [] },
      {
        heading: createElement('H1'),
        section: [{ heading: createElement('H3'), section: [] }],
      },
    ]);
  });

  test('generic test', () => {
    const headings = [
      createElement('H1'),
      createElement('H2'),
      createElement('H2'),
      createElement('H3'),
      createElement('H5'),
      createElement('H3'),
      createElement('H2'),
      createElement('H6'),
      createElement('H1'),
      createElement('H4'),
    ];
    const unflattened = unflattenHeadings(headings);
    expect(unflattened).toStrictEqual([
      {
        heading: createElement('H1'),
        section: [
          { heading: createElement('H2'), section: [] },
          {
            heading: createElement('H2'),
            section: [
              {
                heading: createElement('H3'),
                section: [{ heading: createElement('H5'), section: [] }],
              },
              { heading: createElement('H3'), section: [] },
            ],
          },
          {
            heading: createElement('H2'),
            section: [{ heading: createElement('H6'), section: [] }],
          },
        ],
      },
      {
        heading: createElement('H1'),
        section: [{ heading: createElement('H4'), section: [] }],
      },
    ]);
  });
});
