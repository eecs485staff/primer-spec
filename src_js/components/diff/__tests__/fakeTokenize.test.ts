import { fakeTokenize } from '../fakeTokenize';

describe('fakeTokenize', () => {
  test('empty string', () => {
    expect(fakeTokenize('')).toEqual([]);
  });

  test('single word', () => {
    expect(fakeTokenize('foo')).toEqual(['foo']);
  });

  test('trailing whitespace included in separate token', () => {
    expect(fakeTokenize('foo ')).toEqual(['foo', ' ']);
  });

  test('preceding whitespace included in separate token', () => {
    expect(fakeTokenize(' foo')).toEqual([' ', 'foo']);
  });

  test('two words', () => {
    expect(fakeTokenize('foo bar')).toEqual(['foo', ' ', 'bar']);
  });

  test('sentence with punctuation', () => {
    expect(fakeTokenize('Call me Ishmael,sorry, Dio.')).toEqual([
      'Call',
      ' ',
      'me',
      ' ',
      'Ishmael',
      ',',
      'sorry',
      ', ',
      'Dio',
      '.',
    ]);
  });
});
