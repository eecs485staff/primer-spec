<div align="center">
	<img src="demo/logo-light.svg#gh-light-mode-only" alt="Primer Spec logo" width="250em" />
	<img src="demo/logo-dark.svg#gh-dark-mode-only" alt="Primer Spec logo" width="250em" />
	<h1>Primer Spec</h1>
	<p>
		<b>A website theme for long informative web pages.</b>
	</p>
	<a href="https://github.com/eecs485staff/primer-spec/actions/workflows/cibuild.yml">
	  <img src="https://github.com/eecs485staff/primer-spec/actions/workflows/cibuild.yml/badge.svg?branch=develop" alt="cibuild" />
        </a>
	<a href="https://preview.sesh.rs/previews/eecs485staff/primer-spec/develop-preview/">
	  <img src="https://img.shields.io/badge/develop-preview-blue.svg" alt="Nightly Preview" />
        </a>
</div>

<br>

_Primer Spec is a Jekyll theme that makes long informative web pages (like project specifications!) easier to read. In addition to aesthetic styling, the theme generates a table of contents displayed in a sidebar. You can [preview the theme to see what it looks like](http://eecs485staff.github.io/primer-spec), or even [use it today](#usage)._

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
     - jemoji
   kramdown:
     input: GFM
   readme_index:
     remove_originals: true
     with_frontmatter: true
   ```

4. [Deploy your site with GitHub pages.](https://github.com/seshrs/build-primer-spec-action#setting-up-github-pages-deployment)

This repository hosts a Primer Spec site too! The original Markdown content is in [index.md](index.md), and you can preview the page at [https://eecs485staff.github.io/primer-spec/index.html](https://eecs485staff.github.io/primer-spec/).

Also see the [Advanced Usage](https://eecs485staff.github.io/primer-spec/docs/USAGE_ADVANCED.html) docs, they describe quite a few tricks including how to:

- [Preview locally](https://eecs485staff.github.io/primer-spec/docs/USAGE_ADVANCED.html#previewing-locally) (especially if you aren't using GitHub Pages)
- [Hide sections from the sidebar](https://eecs485staff.github.io/primer-spec/docs/USAGE_ADVANCED.html#hiding-sections-from-the-sidebar)
- [Add Callouts for important information](https://eecs485staff.github.io/primer-spec/docs/USAGE_ADVANCED.html#callouts)
- [Render math expressions with LaTeX](https://eecs485staff.github.io/primer-spec/docs/USAGE_ADVANCED.html#latex-boolean)
- [Highlight lines in code blocks](https://eecs485staff.github.io/primer-spec/docs/USAGE_ADVANCED.html#enhanced-code-blocks)
- [Render diagrams with Mermaid!](https://eecs485staff.github.io/primer-spec/docs/USAGE_ADVANCED.html#mermaid-diagrams)
- [Render a sitemap](https://eecs485staff.github.io/primer-spec/docs/USAGE_ADVANCED.html#sitemap-boolean--label-string)
- (And more!)

You may also want to read the [`MARKDOWN_TIPS`](https://eecs485staff.github.io/primer-spec/docs/MARKDOWN_TIPS.html), which has notes on how you can edit your specs to take best advantage of Primer Spec markdown features.

## User Showcase

The Primer Spec theme is currently used by the following courses at the University of Michigan:

- [ENGR 100](https://980.engr100.org) (Introduction to Engineering). Example [ENGR 100-980 Lab 1: Arduino 101](https://980.engr100.org/labs/lab-1).
- [EECS 280](https://eecs280staff.github.io/eecs280.org/) (Programming and Intro Data Structures). Example [EECS 280 Project 2: Computer Vision](https://eecs280staff.github.io/p2-cv/).
- [EECS 281](https://eecs281staff.github.io/eecs281.org/) (Data Structures and Algorithms). Example [EECS 281 Project 1: Back to the Ship!](https://eecs281staff.github.io/p1-back-to-the-ship/).
- [EECS 285](https://eecs285.github.io/eecs285.org/) (Practical Programming in Java). Example [EECS 285 Project 3: Wheel of Fortune](https://eecs285.github.io/p3-wheel/).
- [EECS 370](https://www.eecs.umich.edu/courses/eecs370/) (Introduction to Computer Organization). Example [Project 1: Assembler, Simulator, and Assembly-Language Multiplication](https://eecs370.github.io/project_1_spec/)
- [EECS 485](https://eecs485staff.github.io/eecs485.org/) (Web Systems). Example [EECS 485 Project 4: Map Reduce](https://eecs485staff.github.io/p4-mapreduce/).
- [ENGR 101](https://engr101staff.github.io/engr101.org/) (Using Computing to Solve Engineering Problems).
- [EECS 183](https://eecs183.github.io/eecs183.org/) (Elementary Programming Concepts).
- [EECS 298](https://eecs298.github.io/) (Social Consequences of Computing).
- [EECS 441](https://eecs441.eecs.umich.edu/) (Mobile App Development for Entrepreneurs).
- [EECS 442](https://eecs442.github.io) (Computer Vision).
- [EECS 484](https://eecs484db.github.io/) (Database Management Systems).
- EECS 482 (Introduction to Operating Systems).

And at Tufts University:

- [CS 105](https://www.cs.tufts.edu/comp/105/) (Programming Languages).

Students: Would you like to see your course use this theme for their project specifications? Let your course staff know about this theme!

Course staff: If you have questions about how to integrate this theme with your project release workflow, [create a discussion](https://github.com/eecs485staff/primer-spec/discussions/new), or email [seshrs@umich.edu](mailto:seshrs@umich.edu).

## Contributing

Interested in contributing to Primer Spec? We'd love your help. See [the CONTRIBUTING file](https://eecs485staff.github.io/primer-spec/docs/CONTRIBUTING.html) for further instructions on how to contribute. Also see [the Dev Onboarding file](https://eecs485staff.github.io/primer-spec/docs/DEV_README.html) for notes on how the theme works.

For maintenance and release instructions, see [Maintenance & Release section](https://eecs485staff.github.io/primer-spec/docs/CONTRIBUTING.html#Maintenance--Release) of the CONTRIBUTING file.

## Acknowledgements

Primer Spec is maintained by Sesh Sadasivam ([@seshrs](https://github.com/seshrs)) along with the EECS 485 Staff ([@eecs485staff](https://github.com/eecs485staff)). Bella Kim ([@bellakiminsun](https://github.com/bellakiminsun)) contributed to the design, and designed the subthemes.
