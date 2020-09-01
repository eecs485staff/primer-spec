<!-- prettier-ignore-start -->
<!-- omit in toc -->
# Primer Spec
<!-- prettier-ignore-end -->

[![Build Status](https://travis-ci.com/eecs485staff/primer-spec.svg?branch=master)](https://travis-ci.com/eecs485staff/primer-spec)
[![Nightly Preview](https://img.shields.io/badge/nightly-preview-blue.svg)](https://preview.seshrs.ml/previews/eecs485staff/primer-spec-nightly)

_Primer Spec is a Jekyll theme that makes long informative web pages easier to read. In addition to aesthetic styling, the theme generates a table of contents displayed in a sidebar. You can [preview the theme to see what it looks like](http://eecs485staff.github.io/primer-spec), or even [use it today](#usage)._

[![Primer Spec live preview][2]][1]

[1]: https://eecs485staff.github.io/primer-spec/
[2]: demo/screenshot.png 'site preview'

Primer Spec is built on top of the wonderful [Primer theme](https://github.com/pages-themes/primer), and adds functionality useful for pages with a lot of content. This theme was primarily designed for hosting project specifications for EECS courses at the University of Michigan. See the [User Showcase](#user-showcase) for inspiration.

<!-- prettier-ignore-start -->
<!-- omit in toc -->
## Contents
<!-- prettier-ignore-end -->

- [Usage](#usage)
- [User Showcase](#user-showcase)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Usage

Primer Spec is a Jekyll theme, which means you can start using this theme with [GitHub Pages](https://pages.github.com) right away!

1. Add your Markdown/HTML files to the Jekyll site. These are your "webpages".

2. Add Primer Spec to each "webpage" by inserting the following at the top of the file:

   ```yml
   ---
   layout: spec
   ---

   ```

3. If it doesn't already exist, create a file `_config.yml` in your site's root directory. Add this content to the file:

   ```yml
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
   ```

4. Deploy your site with GitHub pages!

This repository hosts a Primer Spec site too! The original Markdown content is in [index.md](index.md), and you can preview the page at [https://eecs485staff.github.io/primer-spec/index.html](https://eecs485staff.github.io/primer-spec/).

Also see the [Advanced Usage](docs/USAGE_ADVANCED.md) docs, they describe quite a few tricks including how to:

- [Preview locally](docs/USAGE_ADVANCED.md#previewing-locally) (especially if you aren't using GitHub Pages)
- [Hide sections from the sidebar](docs/USAGE_ADVANCED.md#hiding-sections-from-the-sidebar)
- [Configure Primer Spec](docs/USAGE_ADVANCED.md#page-configuration-options)
  - [Render math expressions with LaTeX](docs/USAGE_ADVANCED.md#latex-boolean)
  - [Disable the sidebar](docs/USAGE_ADVANCED.md#dissablesidebar-boolean)
  - (And more!)

## User Showcase

The Primer Spec theme is currently used by the following courses at the University of Michigan:

- [EECS 280](https://eecs280staff.github.io/eecs280.org/) (Programming and Intro Data Structures). Example [EECS 280 Project 4: Web](https://eecs280staff.github.io/p4-web/).
- [EECS 285](https://eecs285.github.io/eecs285.org/) (Practical Programming in Java). Example [EECS 285 Project 3: Wheel of Fortune](https://eecs285.github.io/p3-wheel/).
- [EECS 485](https://eecs485staff.github.io/eecs485.org/) (Web Systems). Example [EECS 485 Project 4: Map Reduce](https://eecs485staff.github.io/p4-mapreduce/).
- [EECS 370](https://www.eecs.umich.edu/courses/eecs370/) (Introduction to Computer Organization).
- [EECS 441](https://eecs441.eecs.umich.edu/) (Mobile App Development for Entrepreneurs).
- EECS 482 (Introduction to Operating Systems).

Students: Would you like to see your course use this theme for their project specifications? Let your course staff know about this theme!

Course staff: If you have questions about how to integrate this theme with your project release workflow, [create an issue](https://github.com/eecs485staff/primer-spec/issues/), or email [seshrs@umich.edu](mailto:seshrs@umich.edu).

## Contributing

Interested in contributing to Primer Spec? We'd love your help. Primer Spec is an open source project, built one contribution at a time by users like you. See [the CONTRIBUTING file](docs/CONTRIBUTING.md) for further instructions on how to contribute.

For maintenance and release instructions, see [Maintenance & Release section](docs/CONTRIBUTING.md#Maintenance--Release) of the CONTRIBUTING file.

## Acknowledgements

Primer Spec is maintained by Sesh Sadasivam ([@seshrs](https://github.com/seshrs)) along with the EECS 485 Staff ([@eecs485staff](https://github.com/eecs485staff)). Bella Kim ([@bellakiminsun](https://github.com/bellakiminsun)) contributed to the design, and designed the subthemes.
