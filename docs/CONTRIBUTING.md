# Contributing to The Primer Spec Theme

*This document was adapted in part from the corresponding documents from the original [Primer theme](https://github.com/pages-themes/primer).*

## Contents
- [Support](#looking-for-support)
- [Reporting bugs](#how-to-report-a-bug)
- [Suggesting features](#how-to-suggest-a-feature-or-enhancement)
- [Proposing changes](#how-to-propose-changes)
  - [Typical workflow](#typical-workflow)
  - [Bootstrap your local environment](#bootstrap-your-local-environment)
  - [Run tests](#run-tests)
  - [Adding new subthemes](#adding-new-subthemes)
- [Maintenance & Release](#maintenance--release)
  - [Keeping this theme up-to-date with Primer](#keeping-this-theme-up-to-date-with-primer)
  - [Semester Release Process](#releasing-for-the-next-semester)
- [Modifications from Primer](#modifications-from-primer)
- [Code of Conduct](#code-of-conduct)
- [Additional Resources](#additional-resources)

## Looking for support?

We'd love to help. Check out [the support guidelines](SUPPORT.md).

## How to report a bug

Think you found a bug? Please check [the list of open issues](https://github.com/eecs485staff/primer-spec/issues) to see if your bug has already been reported. If it hasn't please [submit a new issue](https://github.com/eecs485staff/primer-spec/issues/new).

Here are a few tips for writing *great* bug reports:

* Describe the specific problem (e.g., "widget doesn't turn clockwise" versus "getting an error")
* Include the steps to reproduce the bug, what you expected to happen, and what happened instead
* Check that you are using the latest version of the project and its dependencies
* Include what version of the project your using, as well as any relevant dependencies
* Only include one bug per issue. If you have discovered two bugs, please file two issues
* Even if you don't know how to fix the bug, including a failing test may help others track it down

## How to suggest a feature or enhancement

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and goals of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible, including describing the problem you're trying to solve.

[Open an issue](https://github.com/eecs485staff/primer-spec/issues/new) which describes the feature you would like to see, why you want it, how it should work, etc.

## How to propose changes

Here are a few general guidelines for proposing changes:

### Typical workflow

1. [Fork the repository.](https://github.com/eecs485staff/primer-spec/fork)
2. Clone your repository to a local directory.
3. Create a new branch with an appropriate name. (`git checkout -b feature/my-feature`)
4. [Bootstrap your local environment.](#bootstrap-your-local-environment)
5. Make some changes and create commits.
6. Push your branch to GitHub. (`git push -u origin feature/my-feature`)
7. Open a pull request from your branch to the EECS 485 repository's `develop` branch. (For example, https://github.com/eecs485staff/primer-spec/compare/eecs485staff:develop...pages-themes:master)

### Bootstrap your local environment

1. Ensure that you have a version of Ruby later than 2.1.0. If you're on a Mac, you may need to run `brew install ruby` first.

2. Run `script/bootstrap`.

    ```console
    $ ruby --version
    ruby 2.6.1p33 (2019-01-30 revision 66950) [x86_64-darwin18]
    $ pwd
    /seshrs/primer-spec
    $ ./script/bootstrap
    ```

3. Run `script/server` to begin the Jekyll server. By default, the site is served at http://localhost:4000/. (It monitors changes you make to most theme files and automatically rebuilds the website.)

### Run tests

The theme contains a minimal test suite, to ensure a site with the theme would build successfully. To run the tests, simply run `script/cibuild`. You'll need to run `script/bootstrap` once before the test script will work.

### Adding new subthemes

Primer spec allows website visitors to change the appearance of the website by selecting from built-in subthemes. The themes are implemented by changing [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) used in the [base stylesheet](../_sass/spec/base.scss). The themes are declared in JavaScript (see [bella.theme.ts](../src_js/subthemes/definitions/bella.theme.ts), for example).

To create a new subtheme:
- Create the file `src_js/subthemes/definitions/<name>.theme.ts`. Take inspiration from the structure of other subthemes in that directory.
- Import and add your subtheme to the default export of [`src_js/subthemes/index.ts`](../src_js/subthemes/index.ts). Follow the structure of other imports in the module.
- Ensure that your changes work well on mobile! Use browser developer tools to verify this before creating a Pull Request on GitHub.

*Pro tip: Upload screenshots of the new subtheme to make it easier to review your Pull Request.*


## Maintenance & Release

This theme is used by several courses at the University of Michigan, including EECS 280, EECS 285, EECS 482 and EECS 485. If a PR proposes major design changes, it's usually a good idea to keep the courses' staff aware of the changes.

Keep the theme up-to-date between semesters by:

1. [Keeping the `develop` branch up-to-date with Primer](#keeping-this-theme-up-to-date-with-primer)
2. [Creating a new release by syncing `develop` and `master`](#releasing-for-the-next-semester)

### Keeping this theme up-to-date with Primer

It's important to periodically check for changes from the [original upstream theme (Primer)](https://github.com/pages-themes/primer). Follow these steps:

1. If you have not already done so, add the original upstream repo as a "remote" to your local Git setup. (This will allow you to cherry-pick commits.)

```console
$ pwd
/users/seshrs/primer-spec
$ git remote add upstream https://github.com/pages-themes/primer.git
```

2. Get the latest code from the `upstream` remote.

```console
$ git fetch upstream
```

3. Compare the two repositories to check for changes. This can be achieved by [drafting a Pull Request](https://github.com/eecs485staff/primer-spec/compare/develop...pages-themes:master).

4. If there are changes, check the scope of changes. (If there are changes to `_layouts/default.html`, they may have to be reflected in `_layouts/spec.html` also.)

5. Create a new branch and merge the upstream master branch. You may have to resolve merge conflicts.

```console
$ git checkout -b maintenance/f19
$ git merge upstream/master maintenance/f19
```

5. Push this branch to `origin` and [open a new Pull Request](https://github.com/eecs485staff/primer-spec/compare/develop...eecs485staff:develop).

### Releasing for the next semester

The latest stable version of the theme is available on the `master` branch. (This is the default branch selected by the [Jekyll Remote Theme](https://github.com/benbalter/jekyll-remote-theme), the plugin that allows this theme to be used on course websites.) This branch is not changed during semesters at the University of Michigan while courses are in-session. This is to ensure that all project specs throughout the semester have a consistent appearance.

The `develop` branch is the default branch for the GitHub repository, and hosts the latest accepted code changes to the theme. This branch is usually ahead of `master`. Between semesters at the University of Michigan, changes from the `develop` branch are merged with `master` to keep them in sync.

To publish a new release:

1. Pull the latest versions of both branches.

```console
$ pwd
/users/seshrs/primer-spec
$ git checkout develop
$ git pull
$ git checkout master
$ git pull
```

2. Merge `develop` into `master`. (If you like [signing your commits](https://help.github.com/en/articles/signing-commits), don't forget to add the `-S` flag.)

```console
$ git checkout master
$ git merge -S develop
```

3. Push your changes to GitHub with `git push`.

4. Draft a new "release". Visit the [releases page](https://github.com/eecs485staff/primer-spec/releases). Note the most recent release's version number (for example, `1.0.0+fa19`).

5. Decide what the next version number should be. If there are no major changes, simply bump the "patch version number" (for example, `1.4.1` would be followed by `1.4.2`). If there are design changes, bump the "minor version number" (for example, `1.4.1` would become `1.5.0`). Also specify the upcoming semester after the `+` symbol — this is metadata and is not parsed as part of the version number. (For more about versioning, see [Semver](https://semver.org/).)

6. Click the "Draft a new release" button. Specify the version number. Title and description are optional. *(Switch the "target branch" to `master`. That said, the two branches should be in sync at the time of release so this should not really matter.)*


## Modifications from Primer

Here are key changes made to the original Primer theme to add a sidebar:

- `_layouts/spec.html`: Renders MarkDown files that have `layout: spec` iin their front-matter. The file is based on `_layouts/default.html`, but includes a reference to the Primer Spec Plugin script at the end. The script modifies the HTML on a user's browser, adding the sidebar and theme styling.

- `_sass/spec/`: SCSS files needed to display the sidebar and subthemes. Stylesheets in `assets/css` include these files.

- `src_js`: TypeScript code that generates a table of contents, the sidebar and the subtheme-picker modal. The code also adds HTML and CSS scaffolding needed for the theme. The TypeScript code is bundled by webpack into `assets/js/primer_spec_plugin.min.js`.


## Code of conduct

This project is governed by [the Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Additional Resources

* [Contributing to Open Source on GitHub](https://guides.github.com/activities/contributing-to-open-source/)
* [Using Pull Requests](https://help.github.com/articles/using-pull-requests/)
* [GitHub Help](https://help.github.com)
