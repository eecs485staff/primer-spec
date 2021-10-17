<!-- prettier-ignore-start -->
<!-- omit in toc -->
# Advanced Usage
<!-- prettier-ignore-end -->

See the [Primer Spec README](../README.md) for the main usage instructions. This page contains further instructions for more advanced workflows.

<!-- prettier-ignore-start -->
<!-- omit in toc -->
## Contents
<!-- prettier-ignore-end -->

- [Previewing locally](#previewing-locally)
- [Customizing Jekyll](#customizing-jekyll)
- [Hiding sections from the sidebar](#hiding-sections-from-the-sidebar)
- [Callouts](#callouts)
- [Enhanced code blocks](#enhanced-code-blocks)
- [Page configuration options](#page-configuration-options)
    - [`disableSidebar`: Boolean](#disablesidebar-boolean)
    - [`hideSidebarOnLoad`: Boolean](#hidesidebaronload-boolean)
    - [`latex`: Boolean](#latex-boolean)
    - [`useLegacyCodeBlocks`: Boolean](#uselegacycodeblocks-boolean)
    - [`excludeFromSitemap`: Boolean](#excludefromsitemap-boolean)
- [Site configuration options](#site-configuration-options)
    - [`defaultSubthemeName`: String](#defaultsubthemename-string)
    - [`defaultSubthemeMode`: String](#defaultsubthememode-string)
    - [`useLegacyCodeBlocks`: Boolean](#uselegacycodeblocks-boolean-1)
    - [`sitemap`: Boolean | {label: String}](#sitemap-boolean--label-string)
- [Pinning to a specific version](#pinning-to-a-specific-version)
- [Using without Jekyll](#using-without-jekyll)

## Previewing locally

If you'd like to preview your site on your computer (or if you aren't using GitHub Pages), do the following:

1. Follow steps 2 and 3 from the main [usage instructions](../README.md#usage).

2. Create a file named `Gemfile` in your project root directory. Add this to the file:

   ```ruby
   source 'https://rubygems.org'

   gem 'jekyll-seo-tag'
   gem 'jekyll-remote-theme'
   gem 'jekyll-github-metadata'
   gem 'webrick'

   # The following plugins are enabled on GitHub Pages without a _config.yml.
   gem 'jekyll-optional-front-matter'
   gem 'jekyll-readme-index'
   gem 'jekyll-relative-links'
   gem 'jekyll-default-layout'
   gem 'kramdown-parser-gfm'
   gem 'jemoji'

   # GitHub Pages doesn't support jekyll 4.0 yet
   gem 'jekyll', '<4.0'

   # Windows does not include zoneinfo files, so bundle the tzinfo-data gem
   gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

   # Performance-booster for watching directories on Windows
   gem 'wdm', '~> 0.1.0' if Gem.win_platform?
   ```

3. (Optional) Create a `.gitignore` file in your site directory with the following contents:

   ```gitignore
   # This .gitignore file is for locally-rendered Jekyll sites.

   # Locally rendered website
   _site

   # Other Jekyll files
   .sass-cache
   .jekyll-metadata
   ```

4. Ensure that you are using a version of Ruby later than 2.1.0. If you're on a Mac, you may need to run `brew install ruby` first. You must also install `bundler`.

   ```console
   $ ruby --version
   ruby 2.6.1p33 (2019-01-30 revision 66950) [x86_64-darwin18]
   $ gem install bundler
   ```

5. Install the dependencies.

   ```console
   $ pwd
   /seshrs/demo-project
   $ bundle install
   ```

6. Run the Jekyll server to build the site and watch for changes. By default, the site is served at http://127.0.0.1:4000.

   ```console
   $ pwd
   /seshrs/demo-project/docs
   $ bundle exec jekyll serve
   ```

At this point, the HTML files with Primer Spec styling are available in the `_site` directory. (You may move them to a remote webserver if you wish.)

## Customizing Jekyll

Primer Spec will respect the following variables, if set in your site's `_config.yml`:

```yml
title: [The title of your site]
description: [A short description of your site's purpose]
```

Additionally, you may choose to set the following optional variables:

```yml
favicon: [Path/URL to 32x32 favicon]
google_analytics: [Your Google Analytics tracking ID / measurement ID]
```

## Hiding sections from the sidebar

To prevent a heading from appearing in the sidebar, add the class `primer-spec-toc-ignore` to a header element.

In Markdown files, this can be achieved by inserting `{: .primer-spec-toc-ignore }` under the heading. For instance:

```markdown
### This heading appears in the sidebar

Spam spam spam.

### This heading does NOT appear in the sidebar

{: .primer-spec-toc-ignore }

Spam spam spam.
```

In HTML files, this can be achieved by adding a `class` attribute to the heading element. For instance:

```html
<h3>This heading appears in the sidebar</h3>

<p>Spam spam spam.</p>

<h3 class="primer-spec-toc-ignore">
  This heading does NOT appear in the sidebar
</h3>

<p>Spam spam spam.</p>
```

## Callouts

Use Callouts to highlight information in your specs. Here's an example:

```markdown
<div class="primer-spec-callout info" markdown="1">
  This is an example callout.
  If you use this in a `markdown` file, *markdown* works inside the box too!
</p>
```

See the [Callouts demo](https://eecs485staff.github.io/primer-spec/demo/callouts.html) for examples of how to customize Callouts for your spec.

## Enhanced code blocks

Primer Spec automatically upgrades your code blocks! These enhanced code blocks let viewers copy code easily, while also letting you highlight important lines in the code.

To highlight lines in a codeblock, specify them in a `data-highlight` attribute like this::

<!-- prettier-ignore-start -->
````markdown
```python
import os
print("Hello world")
print("spam and eggs")
print("Ni! Ni! Ni!")
```
{: data-highlight="1,3" }
````
<!-- prettier-ignore-end -->

If you'd like to revert back to the original "legacy" style of code blocks, simply add the attribute `data-variant="legacy"`:

<!-- prettier-ignore-start -->
````markdown
```console
$ echo "Eggs & Spam"
```
{: data-variant="legacy" }
````
<!-- prettier-ignore-end -->

Check out the [demo](https://eecs485staff.github.io/primer-spec/demo/gists.html) for more examples of how to customize Enhanced code blocks for your spec.

## Page configuration options

The following configuration options can be specified in the ["front-matter"](https://jekyllrb.com/docs/front-matter/) of your page, in the same place that you specify the page's layout. For instance, to disable the Primer Spec sidebar and render LaTeX expressions, modify your page to look like this:

```yml
---
layout: spec

# Disable the Sidebar completely
disableSidebar: true
# Render LaTeX expressions
latex: true
---
...your webpage's MarkDown/HTML content...
```

Primer Spec supports the following page configuration options:

#### `disableSidebar`: Boolean

Disable the the sidebar completely. (The Table of Contents will also not be generated.) Defaults to `false`.

Example page: http://eecs485staff.github.io/primer-spec/demo/page-configuration-options.html

#### `hideSidebarOnLoad`: Boolean

Prevent the sidebar (with table of contents) from appearing when a user loads the page. Defaults to `false`.

Example page: http://eecs485staff.github.io/primer-spec/demo/hide-sidebar-on-load.html

#### `latex`: Boolean

Render Mathematical expressions using [LaTeX syntax and rendering](https://en.wikibooks.org/wiki/LaTeX/Mathematics). Defaults to `false`.

LaTeX can be rendered inline or as separate blocks. Here is an example of a MarkDown file with LaTeX typesetting:

```markdown
---
layout: spec
latex: true
---

LaTeX can be inlined ($$ \forall x \in R $$) or as a separate math block.

$$
-b \pm \sqrt{b^2 - 4ac} \over 2a
$$
```

For a full list of supported LaTeX commands, see the [MathJax docs](https://docs.mathjax.org/en/latest/input/tex/macros/index.html).

_NOTE:_ LaTeX rendering only supports MarkDown that was parsed using the
GFM Kramdown parser. See the [Usage](../README.md#usage) instructions for the
correct contents for `_config.yml`.

#### `useLegacyCodeBlocks`: Boolean

Opt out of ["enhancing" code blocks](#enhanced-code-blocks) on the entire page. See an example of the "legacy" style code block in the [demo](../demo/enhanced-code-blocks.md#legacy-style-opt-out).

This setting can be overriden per-block.

#### `excludeFromSitemap`: Boolean

Prevent the page from being displayed as part of the [Sitemap](#sitemap-boolean--label-string) in the Sidebar. This option does not have any effect if the [`sitemap` site-wide configuration option](#sitemap-boolean--label-string) is not set.

_NOTE:_ If the site-wide option `sitemap` is enabled, then a Sitemap will _not_ be rendered on the page.

## Site configuration options

The following site-configuration options can be specified in the [`_config.yml`](https://jekyllrb.com/docs/configuration/) file of your site under the `primerSpec` key. For instance, to always hide the Primer Spec sidebar when users visit your page, modify your `_config.yml` to look like this:

```yml
# REQUIRED configuration options, as specified in the Primer Spec README
remote_theme: eecs485staff/primer-spec
plugins:
  - jekyll-remote-theme
  - jekyll-optional-front-matter
  - jekyll-readme-index
  - jekyll-relative-links
  - jekyll-default-layout
  - jemoji
kramdown:
  input: GFM
readme_index:
  remove_originals: true
  with_frontmatter: true

# OPTIONAL site configuration options
primerSpec:
  defaultSubthemeName: modern
  # Other site configuration options can go here too.
```

Primer Spec supports the following site configuration options:

#### `defaultSubthemeName`: String

Specify the default subtheme name. This subtheme will be applied for first-time site visitors. Defaults to `default`.

#### `defaultSubthemeMode`: String

Specify the default subtheme mode. This subtheme will be applied for first-time site visitors. Defaults to `system`.

#### `useLegacyCodeBlocks`: Boolean

Opt out of ["enhancing" code blocks](#enhanced-code-blocks) on all pages in the entire site. See an example of the "legacy" style code block in the [demo](../demo/enhanced-code-blocks.md#legacy-style-opt-out).

This setting can be overriden per-page or per-block.

#### `sitemap`: Boolean | {label: String}

_[EECS 280's Project 1](https://eecs280staff.github.io/p1-stats/) has a great example of a sitemap!_

If set to `true`, a sitemap will be auto-generated and displayed in the Sidebar of every Primer Spec page with the label _"Supplemental Pages"_.

To customize the label, specify it under a `label` field. Your `_config.yml` would look like this:

```yml
# REQUIRED configuration options, as specified in the Primer Spec README
remote_theme: eecs485staff/primer-spec
# ...

# OPTIONAL site configuration options
primerSpec:
  sitemap:
    label: My custom sitemap label
  # ... (other site configuration options)
```

To exclude a page from the sitemap, set [`excludeFromSitemap: true`](#excludeFromSitemap-boolean) in the front-matter of your page.

_NOTE:_ A sitemap will only be rendered if your site has multiple pages.

## Pinning to a specific version

We take care to release new versions of Primer Spec on the `main` branch only between semesters at the University of Michigan. However, if your site needs an even stronger guarantee of stability, you can pin your site to a specific _minor_ version of Primer Spec.

1. Visit the [Primer Spec Releases](https://github.com/eecs485staff/primer-spec/releases) page. Find the version to which you'd like to pin your site, and note down its title. (For instance, `v1.3.1+fa20`.)
2. Update your site's `_config.yml` with the version tag from step (1). Specifically, update this line:
   ```yml
   # Replace the contents after the '@' symbol with the version tag from
   # step (1).
   remote_theme: eecs485staff/primer-spec@v1.3.1+fa20
   ```
3. Don't forget to update your Primer Spec version regularly!

Note that you will _always_ get patch version updates for a specific minor version. (For instance, if you pin to `v1.3.1`, you will automatically be upgraded to `v1.3.2` if that version is released.)

## Using without Jekyll

We recommend using Primer Spec with Jekyll because:

- You can store your content as Markdown. Jekyll converts Markdown files to HTML automatically.
- Jekyll applies much of the scaffolding needed for Primer Spec.

However, with some work, it is _possible_ to add Primer Spec styling to a plain HTML page:

1. Make sure that all sections of your web page are marked by header tags (like `h1`, `h2`, etc.).

2. Place all your main content within a `div` with ID `primer-spec-plugin-main-content`:

   ```html
   <div id="primer-spec-plugin-main-content">
     <!-- Your main content goes here. -->
   </div>
   ```

3. Add the following lines at the top of your file, just after the opening `head` tag. Replace `<version>` with the appropriate version in the [`assets/`](../assets/) directory.

   ```html
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <link
     rel="stylesheet"
     href="https://eecs485staff.github.io/primer-spec/assets/<version>/css/primer-spec-base.css"
   />
   <script
     src="https://eecs485staff.github.io/primer-spec/assets/<version>/js/primer_spec_plugin.min.js"
     crossorigin="anonymous"
     defer
   ></script>
   ```

4. Add the following lines at the top of the `body` tag.

   ```html
   <div id="primer-spec-top"></div>
   <div id="primer-spec-app-container" onclick="return true;"></div>
   ```

Your final HTML file will probably look something like this:

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://eecs485staff.github.io/primer-spec/assets/<version>/css/primer-spec-base.css"
    />
    <script
      src="https://eecs485staff.github.io/primer-spec/assets/<version>/js/primer_spec_plugin.min.js"
      crossorigin="anonymous"
      defer
    ></script>

    <title>My long project spec</title>
  </head>
  <body>
    <div id="primer-spec-top"></div>
    <div id="primer-spec-app-container"></div>
    <div id="primer-spec-plugin-main-content">
      <!-- Main content goes in here. For example: -->
      <h1 class="primer-spec-toc-ignore">My long project spec</h1>
      ...
      <h2>Setup</h2>
      <h3>Installing Python</h3>
      ...
      <h2>Grading</h2>
      ...
    </div>
  </body>
</html>
```

That's it! The page should now display with Primer Spec styling.
