---
layout: spec
---

# Images
{: .primer-spec-toc-ignore }

# Basic syntax

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

# Opt-out of image borders

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

# Supporting dark mode

Primer Spec supports built-in dark mode themes, which invert the background and foreground colors on the page. Primer Spec is able to invert most colors automatically, but *cannot* automatically handle images on your pages.

You'll need to opt-in to these optimizations to better support your dark mode users. Primer Spec offers you two easy options to add dark mode support for your images:

- [**Option 1 *(recommended)***](#option-1-recommended-auto-invert-image-colors-in-dark-mode): Ask Primer Spec to auto-invert your image!
- [**Option 2**](#option-2-show-images-only-in-certain-theme-mode): Create two separate images (one optimized for light mode, the other for dark mode)

## Option 1 (recommended): Auto-invert image colors in dark mode

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

## Option 2: Show images only in certain theme mode

You can specify that an image is only shown in light mode or dark mode by appending `#gh-dark-mode-only` or `#gh-light-mode-only` to the end of an image URL.

<table>
<tr><th>Context</th><th>URL</th></tr>
<tr>
  <td>Light mode</td>
  <td><code>![Light mode image](./image.png#gh-light-mode-only)</code></td>
</tr>
<tr>
  <td>Dark mode</td>
  <td><code>![Dark mode image](./image.png#gh-dark-mode-only)</code></td>
</tr>
</table>

For instance, I created two different versions of the Primer Spec logo:

<table>
<tr><th>Light mode</th><th>Dark mode</th></tr>
<tr>
  <td><img src="./logo-light.svg" alt="Light mode version of Primer Spec logo" width="250em" class="no-border" /></td>
  <td><img src="./logo-dark.svg" alt="Dark mode version of Primer Spec logo" width="250em" class="no-border" /></td>
</tr>
</table>

However, I only want to show the correct version of the image depending on the theme mode. The following image dynamically displays the correct version of the logo when you change the theme between light and dark modes!

<img src="./logo-light.svg#gh-light-mode-only" alt="Light mode version of Primer Spec logo" width="250em" class="no-border" />
<img src="./logo-dark.svg#gh-dark-mode-only" alt="Dark mode version of Primer Spec logo" width="250em" class="no-border" />

<details mardown="1">
<summary>Source code for auto-switching logo</summary>

<pre data-title="Auto-switching logo syntax">
Markdown syntax:
![Light mode version of Primer Spec logo](./logo-light.svg#gh-light-mode-only)
![Dark mode version of Primer Spec logo](./logo-dark.svg#gh-dark-mode-only)

Equivalent HTML syntax:
&lt;img
  src="./logo-light.svg#gh-light-mode-only"
  alt="Light mode version of Primer Spec logo" /&gt;
&lt;img
  src="./logo-dark.svg#gh-dark-mode-only"
  alt="Dark mode version of Primer Spec logo" /&gt;
</pre>
</details>

# [Excalidraw](https://excalidraw.com)

While you can use [Mermaid](https://eecs485staff.github.io/primer-spec/demo/mermaid-diagrams.html) to create diagrams, I recommend using [Excalidraw](https://excalidraw.com) for creating free-form diagrams.

After you've created your diagram on Exccalidraw, I recommend exporting it as a PNG *with the scene embedded*. ("Embedding the scene" allows you to reopen the PNG file on Excalidraw in future to make updates!)

Upload the exported PNG image to your Primer Spec website. Then, when you add the image to your page, don't forget to [auto-invert the colors](#auto-invert-colors-in-dark-mode)!
