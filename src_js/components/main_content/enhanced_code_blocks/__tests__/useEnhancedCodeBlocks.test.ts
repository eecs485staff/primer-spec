import useEnhancedCodeBlocks from '../useEnhancedCodeBlocks';

jest.mock('../../../../Config', () => ({
  USE_LEGACY_CODE_BLOCKS: false,
}));

const CONSOLE_BLOCK = `<div class="language-console highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="gp">$</span><span class="w"> </span>python3 <span class="nt">--version</span>  <span class="c"># NOTE: Your Python version may be different.</span>
<span class="go">Python 3.7.4
Copyright (c) 2001-2019 Python Software Foundation.
</span></code></pre></div></div>`;
const CONSOLE_BLOCK_NUM_LINES = 3;

const PLAINTEXT_BLOCK = `<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>$ pwd
/users/seshrs
$ wget https://eecs485staff.github.io/primer-spec/demo/starter_files.tar.gz
$ tar -xvzf starter_files.tar.gz
</code></pre></div></div>`;
const PLAINTEX_BLOCK_NUM_LINES = 4;

const PYTHON_BLOCK = `<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="s">"""This is a docstring."""</span>
<span class="kn">import</span> <span class="nn">math</span>

<span class="k">def</span> <span class="nf">sqrt</span><span class="p">(</span><span class="n">x</span><span class="p">):</span>
  <span class="s">"""Print the square root of x."""</span>
  <span class="k">print</span><span class="p">(</span><span class="n">math</span><span class="p">.</span><span class="n">sqrt</span><span class="p">(</span><span class="n">x</span><span class="p">))</span>

<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">"__main__"</span><span class="p">:</span>
  <span class="k">print</span><span class="p">(</span><span class="n">sqrt</span><span class="p">(</span><span class="mi">81</span><span class="p">))</span>
</code></pre></div></div>`;

describe('useEnhancedCodeBlocks', () => {
  function triggerMouseEvent(node: HTMLElement | null, eventType: string) {
    if (!node) {
      throw new Error('node cannot be null');
    }
    const mouseEvent = new CustomEvent(eventType);
    node.dispatchEvent(mouseEvent);
  }

  test('code blocks should be transformed into tables', () => {
    document.body.innerHTML = `${CONSOLE_BLOCK}${PLAINTEXT_BLOCK}`;

    useEnhancedCodeBlocks({ current: document.body });

    const codeContainers = document.querySelectorAll(
      'div.primer-spec-code-block',
    );
    expect(codeContainers.length).toBe(2);

    const codeblocks = [...codeContainers]
      .map((container) => container.querySelector('table.highlight'))
      .filter(Boolean) as Array<HTMLElement>;
    expect(codeblocks.length).toBe(2);

    expect(codeblocks[0].childNodes[0].childNodes.length).toBe(
      CONSOLE_BLOCK_NUM_LINES,
    );
    expect(codeblocks[1].childNodes[0].childNodes.length).toBe(
      PLAINTEX_BLOCK_NUM_LINES,
    );
  });

  test('code block tables should contain line numbers', () => {
    document.body.innerHTML = `${CONSOLE_BLOCK}`;

    useEnhancedCodeBlocks({ current: document.body });

    const codeblocks = document.querySelectorAll('table.highlight');
    expect(codeblocks.length).toBe(1);

    const tbody = codeblocks[0].childNodes[0] as HTMLElement;
    expect(tbody.childElementCount).toBe(CONSOLE_BLOCK_NUM_LINES);
    expect(CONSOLE_BLOCK_NUM_LINES).toBe(3);

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

    // Row 3
    row = tbody.childNodes[2] as HTMLElement;
    expect(row.tagName).toBe('TR');
    expect(row.childElementCount).toBe(2);
    lineNum = row.childNodes[0] as HTMLElement;
    expect(lineNum.getAttribute('data-line-number')).toBe('3');
    expect((row.childNodes[1] as HTMLElement).innerHTML).toBe(
      '<span class="go">Copyright (c) 2001-2019 Python Software Foundation.</span>',
    );
  });

  describe('code selection by clicking line numbers', () => {
    test('clicking a line number selects the line', () => {
      document.body.innerHTML = `${PLAINTEXT_BLOCK}${CONSOLE_BLOCK}`;

      useEnhancedCodeBlocks({ current: document.body });

      const codeblocks = document.querySelectorAll('.Box');
      expect(codeblocks.length).toBe(2);
      expect(codeblocks[0].id).toBe('primer-spec-code-block-0');
      expect(codeblocks[1].id).toBe('primer-spec-code-block-1');

      // Click line 3 of the plaintext code block
      const line3 = document.getElementById('primer-spec-code-block-0-L3');
      expect(line3).toBeDefined();
      triggerMouseEvent(line3, 'mousedown');
      expect(document.getSelection()?.toString()).toBe(
        '$ wget https://eecs485staff.github.io/primer-spec/demo/starter_files.tar.gz',
      );
    });

    test('special console handling: clicking a line number selects the line without the prompt', () => {
      document.body.innerHTML = `${PLAINTEXT_BLOCK}${CONSOLE_BLOCK}`;

      useEnhancedCodeBlocks({ current: document.body });

      const codeblocks = document.querySelectorAll('.Box');
      expect(codeblocks.length).toBe(2);
      expect(codeblocks[0].id).toBe('primer-spec-code-block-0');
      expect(codeblocks[1].id).toBe('primer-spec-code-block-1');

      // Click line 1 of the console code block
      const line1 = document.getElementById('primer-spec-code-block-1-L1');
      expect(line1).toBeDefined();
      triggerMouseEvent(line1, 'mousedown');
      expect(document.getSelection()?.toString()).toBe(
        'python3 --version  # NOTE: Your Python version may be different.',
      );
    });
  });

  describe('copy an enhanced codeblock', () => {
    test('clicking the copy button on a codeblock with empty lines copies all the lines using correct whitespace', () => {
      // jsdom doesn't implement window.navigator, so we need to mock it.
      Object.defineProperty(window, 'navigator', {
        value: {
          clipboard: {
            writeText: jest.fn().mockImplementation(() => Promise.resolve()),
          },
        },
      });

      document.body.innerHTML = PYTHON_BLOCK;

      useEnhancedCodeBlocks({ current: document.body });

      const buttons = document.querySelectorAll('button');
      expect(buttons.length).toBe(1);

      const copyButton = buttons[0];
      triggerMouseEvent(copyButton, 'click');

      expect(window.navigator.clipboard.writeText)
        .toHaveBeenCalledWith(`"""This is a docstring."""
import math

def sqrt(x):
  """Print the square root of x."""
  print(math.sqrt(x))

if __name__ == "__main__":
  print(sqrt(81))
`);
    });
  });
});
