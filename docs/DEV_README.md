<!-- prettier-ignore-start -->
<!-- omit in toc -->
# Primer Spec Dev Onboarding
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
<!-- omit in toc -->
## Contents
<!-- prettier-ignore-end -->

- [Purpose](#purpose)
- [Jekyll](#jekyll)
- [SCSS Styles](#scss-styles)
- [Syntax highlighting styles](#syntax-highlighting-styles)
- [JavaScript](#javascript)
- [Demo pages](#demo-pages)
- [Scripts](#scripts)
- [Stable and Nightly builds](#stable-and-nightly-builds)
- [Dev setup](#dev-setup)
- [Versioning & backwards compatibility](#versioning--backwards-compatibility)

## Purpose

This document aims to help potential contributors (and curious developers) understand the structure of the repository and how all the code fits in together.

## Jekyll

[Jekyll](https://jekyllrb.com/) is a static site generator built in Ruby — it features reusable layouts, extensible page generation and easy content maintenance. Most importantly:

- Content is typically stored as either HTML or [Markdown](https://guides.github.com/features/mastering-markdown/). Markdown files are automatically converted to HTML using [_kramdown_](https://kramdown.gettalong.org/index.html).
- Content can specify [“front matter”](https://jekyllrb.com/docs/front-matter/) which can contain page configuration data. For instance, a page can specify that it should be generated using a specific [“layout”](https://jekyllrb.com/docs/layouts/).
- Layouts are templates available in a site's `_layouts` directory. They can specify additional front matter and can use powerful [Liquid](https://shopify.github.io/liquid/) templating logic.
- Static assets like CSS, JS and images are customarily stored in an `assets` directory. Any [SCSS](https://sass-lang.com/) files in the `assets` directory will be compiled to CSS at build time.
- [SCSS](https://sass-lang.com/) partials are stored in the `_sass` directory.
- When a Jekyll site uses an external [“theme”](https://jekyllrb.com/docs/themes/), its assets, layouts and SCSS partials are merged with those of the theme.
- Jekyll themes are traditionally distributed as Ruby gems. However, with the introduction of [GitHub Pages](https://pages.github.com/), [Ben Balter](https://github.com/benbalter/) created [`jekyll-remote-theme`](https://github.com/benbalter/jekyll-remote-theme), a Jekyll plugin that allows any public GitHub repository to be used as a Jekyll theme.
- Jekyll Site [configuration options](https://jekyllrb.com/docs/configuration/) are specified in `_config.yml`.

Primer Spec is a _remote_ Jekyll theme. The [README](https://github.com/eecs485staff/primer-spec/#primer-spec) describes how users can integrate Primer Spec as a remote theme with their Jekyll website.

Primer Spec makes the `spec` layout available to website pages. You can find the layout template at [`_layouts/spec.html`](https://github.com/eecs485staff/primer-spec/blob/develop/_layouts/spec.html) — it generates scaffolding around the content, including required stylesheets and scripts. The `spec` layout also accepts a number of [page-specific](https://github.com/eecs485staff/primer-spec/blob/develop/docs/USAGE_ADVANCED.md#page-configuration-options) or [site-wide configuration options](https://github.com/eecs485staff/primer-spec/blob/develop/docs/USAGE_ADVANCED.md#site-configuration-options), usually to make these available to the JavaScript that powers Primer Spec.

Fun fact: The content on the page is actually _always hidden_ when the page loads! The JavaScript uses this hidden content later while rendering the page.

The [`assets` directory](https://github.com/eecs485staff/primer-spec/tree/develop/assets) is versioned — each version directory contains compiled Primer Spec JavaScript and a basic CSS stylesheet that simply imports the Primer Spec SCSS partial from [`_sass/jekyll-theme-primer-spec.scss`](https://github.com/eecs485staff/primer-spec/blob/develop/_sass/jekyll-theme-primer-spec.scss).

## SCSS Styles

Primer Spec is built on top of the [Primer theme](https://github.com/pages-themes/primer), the default theme for GitHub Pages. Both themes use [Primer CSS](https://primer.style/css/), GitHub’s design framework. The main Primer Spec SCSS partial at [`_sass/jekyll-theme-primer-spec.scss`](https://github.com/eecs485staff/primer-spec/blob/develop/_sass/jekyll-theme-primer-spec.scss) imports the base Primer CSS styles, the base Primer Spec styles ([`_sass/spec/base.scss`](https://github.com/eecs485staff/primer-spec/blob/develop/_sass/spec/base.scss)) and the base styles for syntax highlighting ([`_sass/spec/rouge.scss`](https://github.com/eecs485staff/primer-spec/blob/develop/_sass/spec/rouge.scss)).

If you’ve never used [SCSS](https://sass-lang.com/guide) before: It’s like regular CSS (and in fact compiles to regular CSS), but provides features like selector-nesting, compile-time variables, mixins and utility methods. VSCode’s support for SCSS is quite nice. I especially like how hovering over any selector shows an example visualizing the nesting of selectors and what elements would be affected by a block of styles.

Primer Spec’s subtheme styling is achieved via dynamic [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) that can be easily manipulated by JavaScript. The variables are used throughout `spec/base.scss`, and a full list of CSS variables is defined in JavaScript ([`src_js/subthemes/Subtheme.ts`](https://github.com/eecs485staff/primer-spec/blob/b237c2a12d5eaaf6706b64c0d273e14c626eabb6/src_js/subthemes/Subtheme.ts#L7-L38)). These variables are initialized to the default light theme’s values, with all other subtheme variable configurations defined in the JavaScript.

When subthemes are changed, the JavaScript updates CSS variable values on the `body` element, which affects the styling of the entire page.

## Syntax highlighting styles

When content is stored as Markdown and has code blocks, the Markdown parser (_kramdown_) uses [_Rouge_](http://rouge.jneen.net/) to convert the code blocks to semantic HTML to enable syntax highlighting. Rouge creates HTML `<pre>` blocks and encapsulates different semantic elements of the code (tokens, numbers, functions, classes, etc.) with different class names. A [Rouge/Pygments stylesheet](https://github.com/richleland/pygments-css) can then be used to color and style the code block.

The original Primer theme included default styles for Rouge syntax highlighting in `_sass/rouge.scss`. However, since Primer Spec supports a dark mode code block theme, these styles need to be specified as dynamic CSS variables instead.

A full list of Rouge class names can be found in [`_sass/spec/rouge.scss`](https://github.com/eecs485staff/primer-spec/blob/develop/_sass/spec/rouge.scss). The file uses fancy SCSS features like iteration and mixins to initialize CSS variables for each of the Rouge class names and style properties. The corresponding JS definition can be found in [`src_js/subthemes/Subtheme.ts`](https://github.com/eecs485staff/primer-spec/blob/b237c2a12d5eaaf6706b64c0d273e14c626eabb6/src_js/subthemes/Subtheme.ts#L58-L137).

Similar to other subtheme styles, when the subtheme is changed, Rouge CSS variables are updated on the `body` element, which affects code block styling on the page.

## JavaScript

The JavaScript in [`src_js`](https://github.com/eecs485staff/primer-spec/tree/develop/src_js) powers the many dynamic features of Primer Spec, including generating the Sidebar, switching subthemes, enabling a decent mobile viewing experience and making pages printable.

Primer Spec uses [Preact](https://preactjs.com/), a lightweight alternative to [React](https://reactjs.org/). The scripts are written in [TypeScript](https://www.typescriptlang.org/) and are compiled by [Webpack](https://webpack.js.org/) into a single JavaScript bundle in the assets directory. We also use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to keep the code clean and formatted.

The entry point is in [`src_js/main.tsx`](https://github.com/eecs485staff/primer-spec/blob/develop/src_js/main.tsx). It injects necessary stylesheets, performs some initialization, and inserts the Primer Spec Preact component. Preact components are located in the [`components`](https://github.com/eecs485staff/primer-spec/tree/develop/src_js/components) directory, subtheme-changing logic are in the [`subthemes`](https://github.com/eecs485staff/primer-spec/tree/develop/src_js/subthemes) directory and constants in [`Config.ts`](https://github.com/eecs485staff/primer-spec/blob/develop/src_js/Config.ts). Hopefully, the directory structure and the inline comments should help navigate the code.

Don’t forget to open the [VSCode Workspace](https://code.visualstudio.com/docs/editor/multi-root-workspaces#_opening-workspace-files) in this repository and use VSCode's powerful features.

[Jest](https://jestjs.io/) is also available for writing unit and integration tests.

## Demo pages

To test Primer Spec functionality, the repository features several different demo pages. (This repository is itself a Jekyll site!)

[`index.md`](https://github.com/eecs485staff/primer-spec/blob/develop/index.md) features a mock project specification — a long page with several sections.

The [`demo`](https://github.com/eecs485staff/primer-spec/tree/develop/demo) directory contains several other pages that can be used to test other behaviors of Primer Spec, like handling of long headings, page configuration options and task lists.

(The links above take you to the source Markdown files. To actually view the pages rendered with Primer Spec, you'll need to build the site locally or visit one of the [deployments](#stable-and-nightly-builds).)

## Scripts

The `script` directory contains various utility scripts for use during development. Most importantly:

- `bootstrap` initializes your dev environment. It also installs the Git pre-commit hook from `.githooks/pre-commit`, which ensures that the JavaScript bundle is rebuilt and included with every commit.
- `server` starts the Jekyll server at http://localhost:4000 and rebuilds whenever files change (with some exceptions).
- `cibuild` is what’s run by the Travis CI for every Pull Request. It can also be run locally.
- `version` bumps or freezes the Primer Spec version. (Link to contributing section)
- `ci-site-preview-build` is used to generate previews of each Pull Request.

## Stable and Nightly builds

Since the `develop` branch is ahead of the `master` branch [for months at a time](https://github.com/eecs485staff/primer-spec/blob/develop/docs/CONTRIBUTING.md#releasing-for-the-next-semester), Primer Spec deploys to two different websites to preview each branch.

- The `master` branch hosts the latest stable version, and is deployed via GitHub Pages to https://eecs485staff.github.io/primer-spec/. This site also hosts the CSS and JS assets used by most external Primer Spec pages.
- The `develop` branch has all the latest changes and is deployed to a private server at https://preview.seshrs.ml/previews/eecs485staff/primer-spec-nightly. (This link is also available from the project README page.) It’s automatically updated everyday which is why it’s called a “nightly” build.

Every open PR is also deployed to the private server via [Primer Spec Preview](https://github.com/seshrs/primer-spec-preview) to dynamically interact with proposed changes. The link is made available under the “Checks” section.

## Dev setup

See the [CONTRIBUTING docs](https://github.com/eecs485staff/primer-spec/blob/develop/docs/CONTRIBUTING.md#bootstrap-your-local-environment) for actual setup instructions.

Contributing to Primer Spec requires a Ruby environment _and_ a NodeJS environment setup. `script/bootstrap` installs the Ruby dependencies from `Gemfile` and the JS dependencies from `package.json`. The script also installs the pre-commit hook, which builds and includes the latest JavaScript bundle for each commit. (We use pre-committed JavaScript bundles since these are deployed and used by external websites.)

For everyday development, use `script/server`, which builds and serves the site at https://localhost:4000. Open the VSCode workspace `primer-spec.code-workspace` and install the recommended extensions for easy ESLint and Prettier formatting.

For every Pull Review and commit to `develop`/`master`, TravisCI runs `script/cibuild` to sanity-check that Jekyll can build the website, and also runs linters and any Jest tests. Testing is currently manual — **efforts to improve our automated testing of Primer Spec would be appreciated**.

## Versioning & backwards compatibility

Starting with [version v1.2](https://github.com/eecs485staff/primer-spec/releases/tag/v1.2.0%2Bss20), Primer Spec guarantees backwards-compatibility — when an external website is built using a specific version of Primer Spec, pages are guaranteed to appear visually similar as long as the site is not rebuilt. Primer Spec's versioning system is further described in the [CONTRIBUTING docs](https://github.com/eecs485staff/primer-spec/blob/develop/docs/CONTRIBUTING.md#bumping-the-version-in-pull-requests).

When an external site is built, the `spec` layout is used so that the HTML never changes. However, the pages use JS and CSS assets that are hosted on https://eecs485staff.github.io/primer-spec. Hence, to guarantee backwards-compatibility:

- The CSS files must not change drastically for a given minor version.
- Changes to the JS/CSS files must not depend on changes to the HTML templates.
- The URL for those assets must remain stable and unchanged.

To facilitate the above requirements, the `assets` directory is versioned. Before adding `minor` or `major` changes, the previous version's assets _must_ be archived by using [`script/version bump`](https://github.com/eecs485staff/primer-spec/blob/develop/docs/CONTRIBUTING.md#bumping-the-version-in-pull-requests).
