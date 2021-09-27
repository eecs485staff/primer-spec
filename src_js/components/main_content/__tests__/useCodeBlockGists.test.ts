import useCodeBlockGists, {
  parseGistHighlightRanges,
} from '../useCodeBlockGists';

const PYTHON_GIST = `<div class="language-console primer-spec-gist highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="gp">$</span><span class="w"> </span>python3 <span class="nt">--version</span>  <span class="c"># NOTE: Your Python version may be different.</span>
<span class="go">Python 3.7.4
</span></code></pre></div></div>`;
const PYTHON_GIST_NUM_LINES = 2;

const PLAINTEXT_GIST = `<div class="language-plaintext primer-spec-gist highlighter-rouge"><div class="highlight"><pre class="highlight"><code>$ pwd
/users/seshrs
$ wget https://eecs485staff.github.io/primer-spec/demo/starter_files.tar.gz
$ tar -xvzf starter_files.tar.gz
</code></pre></div></div>`;
const PLAINTEX_GIST_NUM_LINES = 4;

const REGULAR_CODE_BLOCK = `<div class="language-console highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="gp">$</span><span class="w"> </span>python3 <span class="nt">--version</span>  <span class="c"># NOTE: Your Python version may be different.</span>
<span class="go">Python 3.7.4
</span></code></pre></div></div>`;

describe('useCodeBlockGists', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  test('code block gists should be transformed into tables', () => {
    document.body.innerHTML = `${PYTHON_GIST}${PLAINTEXT_GIST}${REGULAR_CODE_BLOCK}`;

    useCodeBlockGists({ current: document.body });

    const gists = document.querySelectorAll('table.highlight');
    expect(gists.length).toBe(2);

    expect(gists[0].childNodes[0].childNodes.length).toBe(
      PYTHON_GIST_NUM_LINES,
    );
    expect(gists[1].childNodes[0].childNodes.length).toBe(
      PLAINTEX_GIST_NUM_LINES,
    );
  });

  test('gist tables should contain line numbers', () => {
    document.body.innerHTML = `${PYTHON_GIST}`;

    useCodeBlockGists({ current: document.body });

    const gists = document.querySelectorAll('table.highlight');
    expect(gists.length).toBe(1);

    const tbody = gists[0].childNodes[0] as HTMLElement;
    expect(tbody.childElementCount).toBe(PYTHON_GIST_NUM_LINES);
    expect(PYTHON_GIST_NUM_LINES).toBe(2);

    let row, lineNum;

    // Row 1
    row = tbody.childNodes[0] as HTMLElement;
    expect(row.tagName).toBe('TR');
    expect(row.childElementCount).toBe(2);
    lineNum = row.childNodes[0] as HTMLElement;
    expect(lineNum.getAttribute('data-line-number')).toBe('1');

    // Row 2
    row = tbody.childNodes[1] as HTMLElement;
    expect(row.tagName).toBe('TR');
    expect(row.childElementCount).toBe(2);
    lineNum = row.childNodes[0] as HTMLElement;
    expect(lineNum.getAttribute('data-line-number')).toBe('2');
    expect((row.childNodes[1] as HTMLElement).innerHTML).toBe(
      '<span class="go">Python 3.7.4</span>',
    );
  });
});

describe('parseGistHighlightRanges', () => {
  test('empty string', () => {
    expect(parseGistHighlightRanges('', 30)).toEqual(new Set());
  });

  test('invalid string', () => {
    expect(parseGistHighlightRanges('spam and eggs', 30)).toEqual(new Set());
  });

  test('invalid comma-separated string', () => {
    expect(parseGistHighlightRanges('spam,eggs', 30)).toEqual(new Set());
  });

  test('single line number', () => {
    expect(parseGistHighlightRanges('24', 30)).toEqual(new Set([24]));
  });

  test('single line number out of bounds', () => {
    expect(parseGistHighlightRanges('32', 30)).toEqual(new Set());
  });

  test('single line number at upper bound', () => {
    expect(parseGistHighlightRanges('30', 30)).toEqual(new Set([30]));
  });

  test('single line number at lower bound', () => {
    expect(parseGistHighlightRanges('1', 30)).toEqual(new Set([1]));
  });

  test('single range', () => {
    expect(parseGistHighlightRanges('18-21', 30)).toEqual(
      new Set([18, 19, 20, 21]),
    );
  });

  test('single range completely out of bounds', () => {
    expect(parseGistHighlightRanges('32-38', 30)).toEqual(new Set());
  });

  test('single range partially out of bounds', () => {
    expect(parseGistHighlightRanges('28-32', 30)).toEqual(new Set());
  });

  test('single range with inverted bounds', () => {
    expect(parseGistHighlightRanges('28-26', 30)).toEqual(new Set());
  });

  test('multiple single numbers', () => {
    expect(parseGistHighlightRanges('4,0,6', 30)).toEqual(new Set([4, 6]));
  });

  test('multiple ranges', () => {
    expect(parseGistHighlightRanges('14-15,24-32,12-14', 30)).toEqual(
      new Set([12, 13, 14, 15]),
    );
  });

  test('multiple ranges and lines', () => {
    expect(parseGistHighlightRanges('4, 24-27, 3-5', 30)).toEqual(
      new Set([3, 4, 5, 24, 25, 26, 27]),
    );
  });
});
