import { diffTextByWords } from '../diffTextByWords';

describe('diffTextByWords', () => {
  test('empty inputs', () => {
    expect(diffTextByWords('', '')).toEqual([]);
    expect(diffTextByWords('', 'spam')).toEqual([
      { type: 'diff', removed: '', inserted: 'spam' },
    ]);
    expect(diffTextByWords('brie', '')).toEqual([
      { type: 'diff', removed: 'brie', inserted: '' },
    ]);
  });

  test('identical inputs', () => {
    expect(diffTextByWords('spam', 'spam')).toEqual([
      { type: 'shared', value: 'spam' },
    ]);
    expect(diffTextByWords('spam brie', 'spam brie')).toEqual([
      { type: 'shared', value: 'spam brie' },
    ]);
    expect(diffTextByWords('   spam  ,', '   spam  ,')).toEqual([
      { type: 'shared', value: '   spam  ,' },
    ]);
  });

  test('single words differ', () => {
    expect(diffTextByWords('spam', 'eggs')).toEqual([
      { type: 'diff', removed: 'spam', inserted: 'eggs' },
    ]);
  });

  test('multiple words, but single word differs', () => {
    expect(diffTextByWords('spam brie', 'spam eggs')).toEqual([
      { type: 'shared', value: 'spam ' },
      { type: 'diff', removed: 'brie', inserted: 'eggs' },
    ]);
  });

  test('multiple words, but punctuation inserted', () => {
    expect(diffTextByWords('spam eggs', 'spam, eggs')).toEqual([
      { type: 'shared', value: 'spam' },
      { type: 'diff', removed: ' ', inserted: ', ' },
      { type: 'shared', value: 'eggs' },
    ]);
  });

  test('multiple words, but punctuation removed', () => {
    expect(diffTextByWords('spam, eggs', 'spam eggs')).toEqual([
      { type: 'shared', value: 'spam' },
      { type: 'diff', removed: ', ', inserted: ' ' },
      { type: 'shared', value: 'eggs' },
    ]);
  });

  test('multiple words, differing only by a single letter', () => {
    expect(diffTextByWords('spam brie', 'spam bree')).toEqual([
      { type: 'shared', value: 'spam ' },
      { type: 'diff', removed: 'brie', inserted: 'bree' },
    ]);
  });

  test('multiple words, word inserted in the middle', () => {
    expect(diffTextByWords('spam eggs  ', 'spam ham,eggs  ')).toEqual([
      { type: 'shared', value: 'spam ' },
      { type: 'diff', removed: '', inserted: 'ham,' },
      { type: 'shared', value: 'eggs  ' },
    ]);
  });

  test('multiple words, word removed in the middle', () => {
    expect(diffTextByWords('spam ham, eggs.', 'spam eggs.')).toEqual([
      { type: 'shared', value: 'spam ' },
      { type: 'diff', removed: 'ham, ', inserted: '' },
      { type: 'shared', value: 'eggs.' },
    ]);
  });

  test('multiple words, everything is different', () => {
    expect(diffTextByWords('Call me Ishmael.', 'I am your father.')).toEqual([
      {
        type: 'diff',
        removed: 'Call me Ishmael.',
        inserted: 'I am your father.',
      },
    ]);
  });

  test('multiple words, mostly different', () => {
    expect(
      diffTextByWords(
        'Call me Ishmael today',
        'This Ishmael means nothing to me.',
      ),
    ).toEqual([
      {
        type: 'diff',
        removed: 'Call ',
        inserted: 'This Ishmael means nothing to ',
      },
      { type: 'shared', value: 'me' },
      { type: 'diff', removed: ' Ishmael today', inserted: '.' },
    ]);
  });
});
