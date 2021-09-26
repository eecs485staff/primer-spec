import useCodeBlockGists from '../useCodeBlockGists';

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
