---
layout: spec
---

<!-- prettier-ignore-start -->
# Enhanced Code Blocks
{: .primer-spec-toc-ignore }
<!-- prettier-ignore-end -->

# Introduction

If you've used Markdown, you probably already know that you can insert code blocks using syntax like this:

````markdown
```python
import os
print("Hello world!")
```
````

Primer Spec **_enhances_** plain old code blocks with the following features:

- [ ] **_Line numbers_** 🚀
- [ ] Clicking a line number **_selects the line_**. It's easy to copy a single line!
  - [ ] You can even click-and-drag to select multiple lines simultaneously!
- [ ] **_Copy the entire block_** with a single button.
- [ ] Instructors can **_highlight_** specific lines!

If you want, you can opt out of enhancing code blocks too. See [Legacy Style (Opt Out)](#legacy-style-opt-out).

Ready to see some examples?

# Examples

## Basic example

```
Shall I compare thee to a summer’s day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer’s lease hath all too short a date:
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm’d;
And every fair from fair sometime declines,
By chance or nature’s changing course untrimm’d;
But thy eternal summer shall not fade
Nor lose possession of that fair thou owest;
Nor shall Death brag thou wander’st in his shade,
When in eternal lines to time thou growest:
So long as men can breathe or eyes can see,
So long lives this and this gives life to thee.
```

Try clicking the line numbers to select individual lines!

<details markdown="1">
  <summary>Source code for this plaintext block</summary>
  
  ````markdown
```
Shall I compare thee to a summer’s day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer’s lease hath all too short a date:
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm’d;
And every fair from fair sometime declines,
By chance or nature’s changing course untrimm’d;
But thy eternal summer shall not fade
Nor lose possession of that fair thou owest;
Nor shall Death brag thou wander’st in his shade,
When in eternal lines to time thou growest:
So long as men can breathe or eyes can see,
So long lives this and this gives life to thee.
```
  ````
</details>

## Highlighted lines

<!-- prettier-ignore-start -->
```
Shall I compare thee to a summer’s day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer’s lease hath all too short a date:
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm’d;
And every fair from fair sometime declines,
By chance or nature’s changing course untrimm’d;
But thy eternal summer shall not fade
Nor lose possession of that fair thou owest;
Nor shall Death brag thou wander’st in his shade,
When in eternal lines to time thou growest:
So long as men can breathe or eyes can see,
So long lives this and this gives life to thee.
```
{: data-highlight="5-8,13" }
<!-- prettier-ignore-end -->

In the above block, the second [quatrain](https://en.wikipedia.org/wiki/Quatrain) of the sonnet has been highlighted, along with the first line of the [volta](<https://en.wikipedia.org/wiki/Volta_(literature)>).

Highlights are specified as a single string containing one or more ranges of line numbers separated by commas. A range consists of a single line number, or an inclusive range of line numbers separated by a hypen.

In the above example, we specify the highlights as:

```
data-highlight="5-8,13"
```

<details markdown="1">
  <summary>Source code for this plaintext block with highlighted lines</summary>
  
  ````markdown
```
Shall I compare thee to a summer’s day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer’s lease hath all too short a date:
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimm’d;
And every fair from fair sometime declines,
By chance or nature’s changing course untrimm’d;
But thy eternal summer shall not fade
Nor lose possession of that fair thou owest;
Nor shall Death brag thou wander’st in his shade,
When in eternal lines to time thou growest:
So long as men can breathe or eyes can see,
So long lives this and this gives life to thee.
```
{: data-highlight="5-8,13" }
````
{: data-highlight="17"}

</details>

## Code example

<!-- prettier-ignore-start -->
```python
# This example was downloaded from https://www.w3schools.com/python/trypython.asp?filename=demo_json_from_python_separators
import json

x = {
  "name": "John",
  "age": 30,
  "married": True,
  "divorced": False,
  "children": ("Ann","Billy"),
  "pets": None,
  "cars": [
    {"model": "BMW 230", "mpg": 27.5},
    {"model": "Ford Edge", "mpg": 24.1}
  ]
}

# use . and a space to separate objects, and a space, a = and a space to separate keys from their values:
print(json.dumps(x, indent=4, separators=(". ", " = ")))
```
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
<details markdown="1">
  <summary>Source code for this code block</summary>
  
  ````markdown
```python
# This example was downloaded from https://www.w3schools.com/python/trypython.asp?filename=demo_json_from_python_separators
import json

x = {
"name": "John",
"age": 30,
"married": True,
"divorced": False,
"children": ("Ann","Billy"),
"pets": None,
"cars": [
{"model": "BMW 230", "mpg": 27.5},
{"model": "Ford Edge", "mpg": 24.1}
]
}

# use . and a space to separate objects, and a space, a = and a space to separate keys from their values:

print(json.dumps(x, indent=4, separators=(". ", " = ")))
```
````
</details>
<!-- prettier-ignore-end -->

## Console example

Console blocks have special handling. Try clicking the line number next to line 1, line 3 or line 9 of the following code block:

<!-- prettier-ignore-start -->
```console
$ pwd
/Users/awdeorio/src/eecs485/p2-insta485-serverside
$ tree insta485/static/
insta485/static/
├── css
│   └── style.css
└── images
    └── logo.png
$ touch insta485/model.py
```
{: data-highlight="1,3,9" }
<!-- prettier-ignore-end -->

Notice how selecting a line ONLY selects the command after the prompt symbol (`$`). This makes it easy to copy console commands!

<details markdown="1">
  <summary>Source code for this console code block</summary>
  
  ````markdown
```console
$ pwd
/Users/awdeorio/src/eecs485/p2-insta485-serverside
$ tree insta485/static/
insta485/static/
├── css
│   └── style.css
└── images
    └── logo.png
$ touch insta485/model.py
```
{: data-highlight="1,3,9" }
  ````
</details>

# Legacy Style (Opt Out)

Here's what the "legacy" style code block looks like:

<!-- prettier-ignore-start -->
```console
$ echo "Spam & Eggs"
```
{: data-variant="legacy" }
<!-- prettier-ignore-end -->

In my opinion, the legacy style works best with single-line code blocks.

If you'd like to revert to using the "legacy" style, decide whether you'd like to revert a single code block or all code blocks in the page or in the site.

## Single code block

Add the attribute `{: data-variant="legacy" }` to the code block. For instance:

<!-- prettier-ignore-start -->
````markdown
```console
# This is a LEGACY code block
$ echo "Spam & Eggs"
```
{: data-variant="legacy" }
````
<!-- prettier-ignore-end -->

If you have set the [page](#entire-page) or [site-wide](#entire-site) configuration options to use legacy code blocks, you can override the setting for a single code block as follows:

<!-- prettier-ignore-start -->
````markdown
```console
# This is an ENHANCED code block
$ echo "Spam & Eggs"
```
{: data-variant="enhanced" }
````
<!-- prettier-ignore-end -->

## Entire page

Add the page configuration option `useLegacyCodeBlocks: true` to the top of the page. To learn more about page configuration options, see [USAGE_ADVANCED.md#page-configuration-options](https://github.com/eecs485staff/primer-spec/blob/develop/docs/USAGE_ADVANCED.md#page-configuration-options).

If you have set the [site-wide](#entire-site) configuration option to use legacy code blocks, you can override the setting for a single page by settings `useLegacyCodeBlocks: false` at the top of the page.

## Entire site

Add the site-wide configuration option `useLegacyCodeBlocks: true` under the `primerSpec` settings in `_config.yml`. To learn more about site configuration options, see [USAGE_ADVANCED.md#site-configuration-options](https://github.com/eecs485staff/primer-spec/blob/develop/docs/USAGE_ADVANCED.md#site-configuration-options).
