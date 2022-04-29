---
layout: spec
title: '[DOCS] How to Contribute'
---

<!-- prettier-ignore-start -->
<!-- omit in toc -->
# Contributing to the Primer Spec Theme
{: .primer-spec-toc-ignore }
<!-- prettier-ignore-end -->

_This document was adapted in part from the corresponding documents from the original [Primer theme](https://github.com/pages-themes/primer)._

<!-- prettier-ignore-start -->
<!-- omit in toc -->
## Contents
{: .primer-spec-toc-ignore }
<!-- prettier-ignore-end -->

- [Looking for support?](#looking-for-support)
- [How to report a bug](#how-to-report-a-bug)
- [How to suggest a feature or enhancement](#how-to-suggest-a-feature-or-enhancement)
- [How to propose changes](#how-to-propose-changes)
  - [Dev Onboarding](#dev-onboarding)
  - [Typical workflow](#typical-workflow)
  - [Bootstrap your local environment](#bootstrap-your-local-environment)
  - [Run tests](#run-tests)
  - [Adding new subthemes](#adding-new-subthemes)
- [Maintenance & Release](#maintenance--release)
  - [Releasing for the next semester](#releasing-for-the-next-semester)
  - [Bumping the version in Pull Requests](#bumping-the-version-in-pull-requests)
- [Modifications from Primer](#modifications-from-primer)
- [Code of conduct](#code-of-conduct)
- [Additional Resources](#additional-resources)

## Looking for support?

We'd love to help. Check out [the support guidelines](./SUPPORT.html).

## How to report a bug

Think you found a bug? Please check [the list of open issues](https://github.com/eecs485staff/primer-spec/issues) to see if your bug has already been reported. If it hasn't please [submit a new issue](https://github.com/eecs485staff/primer-spec/issues/new).

Here are a few tips for writing _great_ bug reports:

- Describe the specific problem (e.g., "widget doesn't turn clockwise" versus "getting an error")
- Include the steps to reproduce the bug, what you expected to happen, and what happened instead
- Check that you are using the latest version of the project and its dependencies
- Include what version of the project your using, as well as any relevant dependencies
- Only include one bug per issue. If you have discovered two bugs, please file two issues
- Even if you don't know how to fix the bug, including a failing test may help others track it down

## How to suggest a feature or enhancement

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and goals of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible, including describing the problem you're trying to solve.

[Open an issue](https://github.com/eecs485staff/primer-spec/issues/new) which describes the feature you would like to see, why you want it, how it should work, etc.

## How to propose changes

Here are a few general guidelines for proposing changes:

### Dev Onboarding

Read the [Dev Onboarding](DEV_README.md) doc to familiarize yourself with the organization of the Primer Spec repository and how the theme works in general.

### Typical workflow

1. [Fork the repository.](https://github.com/eecs485staff/primer-spec/fork)
2. Clone your repository to a local directory.
3. Create a new branch with an appropriate name. (`git checkout -b feature/my-feature`)
4. [Bootstrap your local environment.](#bootstrap-your-local-environment)
5. Make some changes and create commits.
6. Push your branch to GitHub. (`git push -u origin feature/my-feature`)
7. Open a pull request from your branch to the EECS 485 repository's `develop` branch.
8. Wait for a project member to review your changes and determine its [semver label](#bumping-the-version-in-pull-requests).

### Bootstrap your local environment

1. Ensure that you have a version of Ruby later than 2.4.0. If you're on a Mac, you may need to run `brew install ruby` first.

2. Ensure that you have [NodeJS](https://nodejs.org/en/download/package-manager/) installed.

3. Run `script/bootstrap`.

   ```console
   $ ruby --version
   ruby 2.6.1p33 (2019-01-30 revision 66950) [x86_64-darwin18]
   $ pwd
   /seshrs/primer-spec
   $ ./script/bootstrap
   ```

4. Run `script/server` to begin the Jekyll server. By default, the site is served at http://localhost:4000/. (It monitors changes you make to most theme files and automatically rebuilds the website.)

### Run tests

The theme contains a minimal test suite, to ensure a site with the theme would build successfully. To run the tests, simply run `script/cibuild`. You'll need to run `script/bootstrap` once before the test script will work.

### Adding new subthemes

Primer spec allows website visitors to change the appearance of the website by selecting from built-in subthemes. The themes are implemented by changing [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) used in the [base stylesheet](https://github.com/eecs485staff/primer-spec/blob/b93df3bf257082983c00d09e246b8046463de1a7/_sass/spec/base.scss). The themes are declared in JavaScript (see [bella.theme.ts](https://github.com/eecs485staff/primer-spec/blob/b93df3bf257082983c00d09e246b8046463de1a7/src_js/subthemes/definitions/bella.theme.ts), for example).

To create a new subtheme:

- Create the file `src_js/subthemes/definitions/<name>.theme.ts`. Take inspiration from the structure of other subthemes in that directory.
- Import and add your subtheme to the default export of [`src_js/subthemes/index.ts`](https://github.com/eecs485staff/primer-spec/blob/b93df3bf257082983c00d09e246b8046463de1a7/src_js/subthemes/index.ts). Follow the structure of other imports in the module.
- Ensure that your changes work well on mobile! Use browser developer tools to verify this before creating a Pull Request on GitHub.

_Pro tip: Upload screenshots of the new subtheme to make it easier to review your Pull Request._

## Maintenance & Release

This theme is used by [several courses at the University of Michigan](https://github.com/eecs485staff/primer-spec#user-showcase). If a PR proposes major design changes, it's usually a good idea to keep the courses' staff aware of the changes.

Some notes about maintaining this project:

1. [Create a new release by syncing `develop` and `main`](#releasing-for-the-next-semester)
2. [Bump the version if required in Pull Requests](#bumping-the-version-in-pull-requests)

### Releasing for the next semester

_Also known as a "release freeze"._

The latest stable version of the theme is available on the `main` branch. (This is the default branch selected by the [Jekyll Remote Theme](https://github.com/benbalter/jekyll-remote-theme), the plugin that allows this theme to be used on course websites.) This branch is not changed during semesters at the University of Michigan while courses are in-session. This is to ensure that all project specs throughout the semester have a consistent appearance.

The `develop` branch is the default branch for the GitHub repository, and hosts the latest accepted code changes to the theme. This branch is usually ahead of `main`. Between semesters at the University of Michigan, changes from the `develop` branch are merged with `main` to keep them in sync.

To publish a new release, first prepare the `main` branch and sync with `develop` by initiating the `release` GitHub Actions workflow from the [Actions tab](https://github.com/eecs485staff/primer-spec/actions/workflows/release.yml).

<details markdown="1">
  <summary>If the GH Actions workflow fails, expand this section for detailed steps.</summary>

1. Pull the latest versions of both branches.

```console
$ pwd
/users/seshrs/primer-spec
$ git checkout develop
$ git pull
$ git checkout main
$ git pull
```

1. Merge `develop` into `main`. (If you like [signing your commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits), don't forget to add the `-S` flag.)

```console
$ git checkout main
$ git merge -S develop
```

3. Build the latest JS source

```console
$ script/cibuild
$ git add assets
```

4. Freeze the version (remove the `.d` at the end of the version string) by running:

```console
$ script/version freeze
$ git add VERSION
$ STAGE_STATIC_ASSETS=true git commit -S -m "Freeze version v1.2"
```

4. Push your changes to GitHub with `git push`.
</details>

Finally, tag the release:

1. Visit the [releases page](https://github.com/eecs485staff/primer-spec/releases). Note the most recent release's version number (for example, `1.0.0+fa19`).

2. Also specify the upcoming semester after the `+` symbol — this is metadata and is not parsed as part of the version number. (For more about versioning, see [Semver](https://semver.org/).)

3. Click the "Draft a new release" button. Specify the version number. Title and description are optional. _(Switch the "target branch" to `main`. That said, the two branches should be in sync at the time of release so this should not really matter.)_

### Bumping the version in Pull Requests

Primer Spec uses [semantic versioning](https://semver.org/) to communicate the scope of changes between releases. Correct versioning provides for backwards compatibility, so that documents generated with older versions of Primer Spec still work.

Imagine labeling every change to this project with the following labels (listed _in increasing order of precedence_):

- `noop`: No updates to client-facing code; documentation updates. Does not require a version bump.
- `patch`: Bugfixes that do not affect any HTML files; bugfixes that do not drastically change the appearance of a site.
- `minor`: Changes to CSS or HTML files that do not require users to update their config files; minor changes to the appearance of a site.
- `major`: Changes that require users to update their configs or deployment systems.

Except `noop` changes, all changes require the version to be bumped from the current release freeze. A version bump IS REQUIRED if a code change is not preceded by another code change of similar or higher precedence.

This means that:

- If a Pull Request proposes a `patch` change, and there have been no other `patch`, `minor` or `major` changes since the last "freeze", then the Pull Request must also propose a "patch" version bump.
- If a Pull Request proposes a `minor` change, and there have been no other `minor` or `major` changes since the last "freeze", then the Pull Request must also propose a "minor" version bump.
- If a Pull Request proposes a `major` change, and there have been no other `major` changes since the last "freeze", the the Pull Request must also propose a "major" version bump.

To propose a version bump, use the `version` script. For example:

```console
$ script/version bump minor
```

The version bump _must_ be done in the same Pull Request that proposes such a change. (If the Pull Request is merged without bumping the version, the previous older version of Primer Spec will lose its backwards-compatibility guarantee!)

## Modifications from Primer

Here are key changes made to the original Primer theme to add a sidebar:

- `_layouts/spec.html`: Renders MarkDown files that have `layout: spec` iin their front-matter. The file is based on `_layouts/default.html`, but includes a reference to the Primer Spec Plugin script at the end. The script modifies the HTML on a user's browser, adding the sidebar and theme styling.

- `_sass/spec/`: SCSS files needed to display the sidebar and subthemes. Stylesheets in `assets/css` include these files.

- `src_js`: TypeScript code that generates a table of contents, the sidebar and the subtheme-picker modal. The code also adds HTML and CSS scaffolding needed for the theme. The TypeScript code is bundled by webpack into `assets/js/primer_spec_plugin.min.js`.

Further reading: [DEV_README.md](DEV_README.md)

## Code of conduct

This project is governed by [the Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Additional Resources

- [Contributing to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitHub Help](https://docs.github.com/en)
