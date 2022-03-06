---
layout: spec
---

# Images

## Basic syntax

Primer Spec automatically adds a subtle `1px` border to images. In my opinion, the border helps with readability, especially for images whose background colors match the background of the page.

For instance, try viewing this image in the "default" theme in "light" mode:

![This image shows a screenshot of Primer Spec in the 'Bella' theme.](https://drive.google.com/uc?export=view&id=1_QPsSGlXKjfqY-3TUbsXej5isOZypK7U)

You can use either Markdown syntax or HTML syntax to define images.

<details mardown="1">
<summary>Source code for basic image syntax</summary>

<pre data-title="Basic image syntax">
Markdown syntax:
![This image shows a screenshot of Primer Spec in the 'Bella' theme.](./screenshot.png)

Equivalent HTML syntax:
&lt;img
  src="./screenshot.png"
  alt="This image shows a screenshot of Primer Spec in the 'Bella' theme." /&gt;
</pre>
</details>

<div class="primer-spec-callout warning" markdown="1">
Don't forget the 'alt' text! It's the only way fot visually-impaired users to understand the context provided by the image.
</div>

## Opt-out of image borders

Simply add the `no-border` class to the image. For instance:

![This image shows a screenshot of Primer Spec in the 'Bella' theme.](https://drive.google.com/uc?export=view&id=1_QPsSGlXKjfqY-3TUbsXej5isOZypK7U){: .no-border }

<details mardown="1">
<summary>Source code for borderless images</summary>

<pre data-title="Auto-inverted image syntax">
Markdown syntax:
![This image shows a screenshot of Primer Spec in the 'Bella' theme.](./screenshot.png){: .no-border }

Equivalent HTML syntax:
&lt;img
  src="./screenshot.png"
  alt="This image shows a screenshot of Primer Spec in the 'Bella' theme."
  class="no-border" /&gt;
</pre>
</details>

## Auto-invert colors in dark mode

If you add the `invert-colors-in-dark-mode` class to an image, Primer Spec will automatically invert the colors of the image when users view the page in a dark theme!

For instance, the following image changes colors in light mode and dark mode:

![This image shows a screenshot of Primer Spec in the 'Bella' theme.](https://drive.google.com/uc?export=view&id=1_QPsSGlXKjfqY-3TUbsXej5isOZypK7U){: .invert-colors-in-dark-mode }

<details mardown="1">
<summary>Source code for auto-inverted images</summary>

<pre data-title="Auto-inverted image syntax">
Markdown syntax:
![This image shows a screenshot of Primer Spec in the 'Bella' theme.](./screenshot.png){: .invert-colors-in-dark-mode }

Equivalent HTML syntax:
&lt;img
  src="./screenshot.png"
  alt="This image shows a screenshot of Primer Spec in the 'Bella' theme."
  class="invert-colors-in-dark-mode" /&gt;
</pre>
</details>

If you prefer to opt-out of borders, also add the `no-border` class.

![This image shows a screenshot of Primer Spec in the 'Bella' theme.](https://drive.google.com/uc?export=view&id=1_QPsSGlXKjfqY-3TUbsXej5isOZypK7U){: .invert-colors-in-dark-mode .no-border }

<details mardown="1">
<summary>Source code for auto-inverted images</summary>

<pre data-title="Auto-inverted borderless image syntax">
Markdown syntax:
![This image shows a screenshot of Primer Spec in the 'Bella' theme.](./screenshot.png){: .invert-colors-in-dark-mode .no-border }

Equivalent HTML syntax:
&lt;img
  src="./screenshot.png"
  alt="This image shows a screenshot of Primer Spec in the 'Bella' theme."
  class="invert-colors-in-dark-mode no-border" /&gt;
</pre>
</details>

## [Excalidraw](https://excalidraw.com)

While you can use [Mermaid](https://eecs485staff.github.io/primer-spec/demo/mermaid-diagrams.html) to create diagrams, I recommend using [Excalidraw](https://excalidraw.com) for creating free-form diagrams.

After you've created your diagram on Exccalidraw, I recommend exporting it as a PNG *with the scene embedded*. ("Embedding the scene" allows you to reopen the PNG file on Excalidraw in future to make updates!)

Upload the exported PNG image to your Primer Spec website. Then, when you add the image to your page, don't forget to [auto-invert the colors](#auto-invert-colors-in-dark-mode)!
