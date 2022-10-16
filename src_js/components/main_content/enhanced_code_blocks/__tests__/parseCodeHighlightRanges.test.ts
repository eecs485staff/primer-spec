import { parseCodeHighlightRanges } from '../parseCodeHighlightRanges';

describe('parseCodeHighlightRanges', () => {
  describe('basic tests', () => {
    test('empty string', () => {
      expect(parseCodeHighlightRanges('', 30)).toEqual(new Set());
    });

    test('invalid string', () => {
      expect(parseCodeHighlightRanges('spam and eggs', 30)).toEqual(new Set());
    });

    test('invalid comma-separated string', () => {
      expect(parseCodeHighlightRanges('spam,eggs', 30)).toEqual(new Set());
    });

    test('single line number', () => {
      expect(parseCodeHighlightRanges('24', 30)).toEqual(new Set([24]));
    });

    test('single line number out of bounds', () => {
      expect(parseCodeHighlightRanges('32', 30)).toEqual(new Set());
    });

    test('single line number at upper bound', () => {
      expect(parseCodeHighlightRanges('30', 30)).toEqual(new Set([30]));
    });

    test('single line number at lower bound', () => {
      expect(parseCodeHighlightRanges('1', 30)).toEqual(new Set([1]));
    });

    test('single range', () => {
      expect(parseCodeHighlightRanges('18-21', 30)).toEqual(
        new Set([18, 19, 20, 21]),
      );
    });

    test('single range completely out of bounds', () => {
      expect(parseCodeHighlightRanges('32-38', 30)).toEqual(new Set());
    });

    test('single range partially out of bounds', () => {
      expect(parseCodeHighlightRanges('28-32', 30)).toEqual(new Set());
    });

    test('single range with inverted bounds', () => {
      expect(parseCodeHighlightRanges('28-26', 30)).toEqual(new Set());
    });

    test('multiple single numbers', () => {
      expect(parseCodeHighlightRanges('4,0,6', 30)).toEqual(new Set([4, 6]));
    });

    test('multiple ranges', () => {
      expect(parseCodeHighlightRanges('14-15,24-32,12-14', 30)).toEqual(
        new Set([12, 13, 14, 15]),
      );
    });

    test('multiple ranges and lines', () => {
      expect(parseCodeHighlightRanges('4, 24-27, 3-5', 30)).toEqual(
        new Set([3, 4, 5, 24, 25, 26, 27]),
      );
    });
  });

  describe('with removed lines', () => {
    test('single line number before removed line number', () => {
      expect(parseCodeHighlightRanges('24', 30, [26])).toEqual(new Set([24]));
    });

    test('single line number is a removed line number', () => {
      expect(parseCodeHighlightRanges('24', 30, [24])).toEqual(new Set());
    });

    test('single line number after removed line number', () => {
      expect(parseCodeHighlightRanges('24', 30, [20])).toEqual(new Set([23]));
    });

    test('single line number after two removed lines', () => {
      expect(parseCodeHighlightRanges('24', 30, [20, 12])).toEqual(
        new Set([22]),
      );
    });

    test('single line number out of bounds after removing lines', () => {
      expect(parseCodeHighlightRanges('30', 30, [20])).toEqual(new Set());
    });

    test('multiple line numbers with multiple removed lines', () => {
      expect(
        parseCodeHighlightRanges('20-24,6,12-14', 30, [22, 8, 12]),
      ).toEqual(new Set([6, 11, 12, 18, 19, 20, 21]));
    });

    test('invalid removed lines', () => {
      expect(parseCodeHighlightRanges('20-24', 30, [32, 8, 12])).toEqual(
        new Set([18, 19, 20, 21, 22]),
      );
    });
  });
});
