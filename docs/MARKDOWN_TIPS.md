---
layout: spec
---

<!-- prettier-ignore-start -->
<!-- omit in toc -->
# Markdown Tips
<!-- prettier-ignore-end -->

_Author: Sesh Sadasivam_

Primer Spec is designed to _magically_ provide useful features out-of-the-box with minimal configuration. However, Primer Spec (and Github-Flavored Markdown in general) provides several useful features that can enhance your project specs and make them more useful to students.

In this guide, I describe what I look for when I add Primer Spec to an existing project website. I also point out some lesser-known markdown features that might be useful for your website.

<!-- prettier-ignore-start -->
<!-- omit in toc -->
## Table of Contents
<!-- prettier-ignore-end -->

- [Callouts](#callouts)
- [Codeblocks](#codeblocks)
  - [Code block titles](#code-block-titles)
  - [Highlighting lines](#highlighting-lines)
  - [Console blocks (and `pycon`)](#console-blocks-and-pycon)
- [Abbreviations](#abbreviations)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Task Lists (Checklists)](#task-lists-checklists)
- [Footnotes](#footnotes)

## Callouts

_Docs: [https://eecs485staff.github.io/primer-spec/demo/callouts.html](https://eecs485staff.github.io/primer-spec/demo/callouts.html)_

Look for places where your spec calls out a "pro-tip" or a "hint" — these can be made more prominent by embedding them inside a callout.

```markdown
## Some section in your spec

Some paragraph text...

<div class="primer-spec-callout info" markdown="1">
**Hint:** Try looking up this documentation...
</div>
```

You will likely find yourself using the **`info`** callout most often. For asides, I like to use the `neutral` variant. I try to use `warning` and `danger` as infrequently as possible.

## Codeblocks

_Docs: [https://eecs485staff.github.io/primer-spec/demo/enhanced-code-blocks.html](https://eecs485staff.github.io/primer-spec/demo/enhanced-code-blocks.html)_

### Code block titles

Look for code blocks in your spec that could use a "title". For instance, if the code block represents content in a file, help your students understand the code block's context by adding the filename as the title.

<!-- prettier-ignore-start -->
````markdown
Create a file named `map.py` with the following content:

```python
def map(input_file, output_file):
  with open(input_file, "r") as input_stream, open(output_file, "w") as output_stream:
    for line in input_stream:
      output_stream.write(line)
```
{: data-title="map.py" }
````
<!-- prettier-ignore-end -->

### Highlighting lines

Look for instructions in your spec that ask students to "add a line" to a code block, or "notice" some piece of code. To help make these lines of code stand out, specify which lines of the code block should be highlighted.

<!-- prettier-ignore-start -->
````markdown
Notice how we use a `for` loop to iterate over the lines in the input file.

```python
def map(input_file, output_file):
  with open(input_file, "r") as input_stream, open(output_file, "w") as output_stream:
    for line in input_stream:
      output_stream.write(line)
```
{: data-highlight="3-4" }
````
<!-- prettier-ignore-end -->

The `data-highlight` attribute is a comma-separated list of line numbers to highlight. You can also use ranges, e.g. `1-3` or `1,3,5-7`.

### Console blocks (and `pycon`)

Wherever your spec instructs students to "run a command", use a console block to display the command as well as its output.

<!-- prettier-ignore-start -->
````markdown
Make sure you're using Python 3.8+.

```console
$ python3 --version
Python 3.8.0
```
````
<!-- prettier-ignore-end -->

When rendered, students can click the line number of the command to select just the command text — that way, it's easy to copy!

The `console` block also accepts parameters that allow you to customize what counts as a "prompt". For instance, you can mimic `pycon` support like this:

````markdown
```console?lang=python&prompt=>>>,...
>>> from task import MapTask
>>> task = MapTask(
...   input_files=["file01", "file02"],
...   executable="map0.py", output_directory="output")
>>> task
MapTask(input_files=['file01', 'file02'], executable=map.py, output_directory=output)
```
````

## Abbreviations

When you're using an abbreviation in a spec and you'd like to help students recall its definition, it might make sense to display its expansion in a tooltip. Define abbrevations like this:

```markdown
We will be using the <abbr title="Last In First Out (like a stack)">LIFO</abbr> while manipulating this array.
```

You can also define a global abbreviation anywhere in your markdown file — **all** occurrecnces of the abbreviation will show a tooltip. [(Docs)](https://kramdown.gettalong.org/quickref.html#abbreviations)

```mardown
We'll be creating an HTML page. Then we'll use a static file server to serve the HTML file when someone visits our site.
example.

*[HTML]: Hyper Text Markup Language
```

## Keyboard shortcuts

Keyboard shortcuts look visually distinct, akin to keys on a keyboard. Surround keyboard shortcuts with `<kbd>` and `</kbd>` tags.

```markdown
To interrupt and abort a process, press <kbd>Ctrl+C</kbd>.
```

## Task Lists (Checklists)

Task lists are lists of checkboxes (aka _checklists_). They're a great way to help students keep track of their progress towards completing the spec. Primer Spec will even remember what boxes a student has checked so far!

I recommend including project checklists in the beginning or at the end of your spec. For instance:

```markdown
## Submission checklist

- [ ] Implement the mapper in `map.py`.
- [ ] Implement the reducer in `reduce.py`.
- [ ] Upload your code to the autograder.
```

For a real-world example, check out EECS 280's coding practices checklist: [https://eecs280staff.github.io/p2-cv/#appendix-c-project-2-coding-practices-checklist](https://eecs280staff.github.io/p2-cv/#appendix-c-project-2-coding-practices-checklist)

## Footnotes

_Docs: [https://kramdown.gettalong.org/quickref.html#footnotes](https://kramdown.gettalong.org/quickref.html#footnotes)_

I don't personally use footnotes in specs, but I think they have their use-cases. A footnote consists of a usage (which looks like a citation reference number) and footnote text, which is included at the bottom of the page. For instance:

```markdown
Kramdown lets you define footnotes[^kramdown-footnotes] that show up at the bottom of the page.

[^kramdown-footnotes]: This is the footnote text. It appears at the bottom of the page, even if it's defined in the middle of a markdown file.
```
