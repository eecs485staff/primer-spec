import {
  didSpecContentChange,
  OLD_HTML_STORAGE_KEY,
} from '../didSpecContentChange';
import Storage from '../../../utils/Storage';
import Config from '../../../Config';

jest.mock('../../../Config');

const CURRENT_TS_3 = 3;

describe('didSpecContentChange', () => {
  beforeEach(() => {
    Date.now = jest.fn(() => CURRENT_TS_3);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('no old HTML stored', () => {
    expect(Storage.getForPage(OLD_HTML_STORAGE_KEY)).toBe(null);

    const newRawHTML = '<h1>HIMALAMAZON</h1>';
    expect(didSpecContentChange(newRawHTML)).toEqual({ changed: false });
    expect(Storage.getForPage(OLD_HTML_STORAGE_KEY)).toBe(
      JSON.stringify({
        rawHTML: newRawHTML,
        ts: CURRENT_TS_3,
      }),
    );
  });

  test('old HTML has expired', () => {
    const oldHTML = {
      rawHTML: '<h1>SUPER TREE</h1>',
      ts: CURRENT_TS_3 - Config.DIFF_HTML_STORAGE_TTL - 1,
    };
    Storage.setForPage(OLD_HTML_STORAGE_KEY, JSON.stringify(oldHTML));
    expect(Storage.getForPage(OLD_HTML_STORAGE_KEY)).toBe(
      JSON.stringify(oldHTML),
    );

    const newRawHTML = '<h1>GENETIC RECOMBINATION</h1>';
    expect(didSpecContentChange(newRawHTML)).toEqual({ changed: false });
    expect(Storage.getForPage(OLD_HTML_STORAGE_KEY)).toBe(
      JSON.stringify({
        rawHTML: newRawHTML,
        ts: CURRENT_TS_3,
      }),
    );
  });

  test('HTML has changed, and old HTML has not expired', () => {
    const oldHTML = {
      rawHTML: '<h1>AIR FAILURE</h1>',
      ts: CURRENT_TS_3 - 1,
    };
    Storage.setForPage(OLD_HTML_STORAGE_KEY, JSON.stringify(oldHTML));
    expect(Storage.getForPage(OLD_HTML_STORAGE_KEY)).toBe(
      JSON.stringify(oldHTML),
    );

    const newRawHTML = '<h1>6 MONTHS</h1>';
    expect(didSpecContentChange(newRawHTML)).toEqual({
      changed: true,
      lastVisitedTs: CURRENT_TS_3 - 1,
    });
    expect(Storage.getForPage(OLD_HTML_STORAGE_KEY)).toBe(
      JSON.stringify(oldHTML),
    );
  });
});
