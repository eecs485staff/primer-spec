# The Primer Spec theme

[![Build Status](https://travis-ci.com/eecs485staff/primer-spec.svg?branch=master)](https://travis-ci.com/eecs485staff/primer-spec)

*Primer Spec is a Jekyll theme for GitHub Pages. You can [preview the theme to see what it looks like](http://eecs485staff.github.io/primer-spec), or even [use it today](#usage).*

Primer Spec is built on top of the wonderful [Primer theme](https://github.com/pages-themes/primer), and adds functionality useful for pages with a lot of content. This theme was primarily designed for hosting Project specifications for EECS courses at the University of Michigan.

## Contents
- [Integrating with GitHub Pages](#integrating-with-github-pages)
- [Previewing locally](#previewing-locally)
  - [Part 1: Create the dependency files](#local-setup-part-1-create-the-dependency-files)
  - [Part 2: Install the dependencies](#local-setup-part-2-install-the-dependencies)
- [Customization](#customization)
- [Contributing](#contributing)
  - [Typical workflow](#typical-workflow)
  - [Bootstrap your local environment](#bootstrap-your-local-environment)
  - [Run tests](#run-tests)
  - [Modifications from Primer](#modifications-from-primer)
  - [Adding new subthemes](#adding-new-subthemes)
- [Keeping this theme up-to-date with Primer](#keeping-this-theme-up-to-date-with-primer)

## Integrating with GitHub Pages

To use the Primer Spec theme:

1. Decide where to host your GitHub pages. See https://pages.github.com for guides.

2. Add your Markdown files. Note that files named README.md will be ignored by Jekyll when using a custom theme.

3. In your GitHub Pages directory, create a file named `_config.yml`. Add this to the file:

    ```yml
    remote_theme: eecs485staff/primer-spec
    plugins:
        - jekyll-remote-theme
    ```

4. Finally, to display a table of contents in the sidebar, add the following at the top of your MarkDown files:

    ```yml
    ---
    layout: spec # Change to `default` if you prefer not to show the sidebar.
    ---
    ```

5. (Optional) To prevent a heading from appearing in the sidebar, add `{: .primer-spec-toc-ignore }` under the heading. For instance:

    ```markdown
    ### This heading appears in the sidebar
    
    Spam spam spam.

    ### This heading does NOT appear in the sidebar.
    {: .primer-spec-toc-ignore }

    Spam spam spam.
    ```


## Previewing locally

If you'd like to preview your site on your computer do the following.

### Local Setup Part 1: Create the dependency files

1. Create a file named `Gemfile` in your project root directory. Add this to the file:

    ```ruby
    source 'https://rubygems.org'

    gem 'github-pages', group: :jekyll_plugins
    gem 'jekyll-remote-theme'

    # Windows does not include zoneinfo files, so bundle the tzinfo-data gem
    gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

    # Performance-booster for watching directories on Windows
    gem 'wdm', '~> 0.1.0' if Gem.win_platform?
    ```

2. Create a `.gitignore` file in your GitHub Pages directory with the following contents:

    ```gitignore
    # This .gitignore file is for locally-rendered Jekyll sites.

    # Locally rendered website
    _site

    # Other Jekyll files
    .sass-cache
    .jekyll-metadata
    ```

### Local Setup Part 2: Install the dependencies

1. Ensure that you have a version of Ruby later than 2.1.0. If you're on a Mac, you may need to run `brew install ruby` first. You must also install bundler.

    ```console
    $ ruby --version
    ruby 2.6.1p33 (2019-01-30 revision 66950) [x86_64-darwin18]
    $ gem install bundler
    ```

2. Install the dependencies.

    ```console
    $ pwd
    /seshrs/demo-project
    $ bundle install
    ```

3. Run the Jekyll server to build the site and watch for changes. By default, the site is served at http://127.0.0.1:4000.

    ```console
    $ pwd
    /seshrs/demo-project/docs
    $ bundle exec jekyll serve
    ```


## Customizing

### Configuration variables

Primer Spec will respect the following variables, if set in your site's `_config.yml`:

```yml
title: [The title of your site]
description: [A short description of your site's purpose]
```

Additionally, you may choose to set the following optional variables:

```yml
google_analytics: [Your Google Analytics tracking ID]
```

### Stylesheet

If you'd like to add your own custom styles:

1. Create a file called `/assets/css/style.scss` in your site
2. Add the following content to the top of the file, exactly as shown:
    ```scss
    ---
    ---

    @import "{{ site.theme }}";
    ```
3. Add any custom CSS (or Sass, including imports) you'd like immediately after the `@import` line

### Layouts

If you'd like to change the theme's HTML layout:

1. [Copy the original template](https://github.com/pages-themes/primer/blob/master/_layouts/default.html) from the theme's repository<br />(*Pro-tip: click "raw" to make copying easier*)
2. Create a file called `/_layouts/default.html` in your site
3. Paste the default layout content copied in the first step
4. Customize the layout as you'd like

## Contributing

Interested in contributing to Primer? We'd love your help. Primer is an open source project, built one contribution at a time by users like you. See [the CONTRIBUTING file](docs/CONTRIBUTING.md) for further instructions on how to contribute.

### Typical workflow

1. [Fork the repository.](https://github.com/eecs485staff/primer-spec/fork)
2. Clone your repository to a local directory.
3. Create a new branch with an appropriate name. (`git checkout -b feature/my-feature`)
4. [Bootstrap your local environment.](#bootstrap-your-local-environment)
5. Make some changes and create commits.
6. Push your branch to GitHub. (`git push -u origin feature/my-feature`)
7. Open a pull request from your branch to the EECS 485 repository. (For example, https://github.com/eecs485staff/primer-spec/compare/eecs485staff:master...pages-themes:master)

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

The theme contains a minimal test suite, to ensure a site with the theme would build successfully. To run the tests, simply run `script/cibuild`. You'll need to run `script/bootstrap` one before the test script will work.

### Modifications from Primer

Here are key changes made to the original Primer theme to add a sidebar:

- Created `_layouts/spec.html`. This file is used to render MarkDown files with `layout: spec` at the top. The file is similar to `_layouts/default.html`, but adds the sidebar and references the JavaScript needed to render the table of contents. HTML comments in `spec.html` indicate sections of the layout that have been modified from `default.html`.

- Created `_sass/spec/` with the SCSS files needed to display the sidebar. Also created stylesheets in `assets/css` to include these files.

- Created `assets/js/` with the necessary scripts to generate a table of contents.

### Adding new subthemes

Primer spec allows website visitors to change the appearance of the website by selecting from built-in subthemes. The stylesheets for these subthemes are defined in `_sass/spec`, and are typically named as `<name>.theme.scss`.

To create a new subtheme:
- Create the file `_sass/spec/<name>.theme.scss`. Take inspiration from the structure of other subtheme stylesheets.
- Create the file `assets/css/theme_<name>.scss`. Follow the structure of other stylesheets in the same directory to import the theme stylesheet from the `_sass/spec` directory.
- Modify the list of subthemes in `_layouts/spec.html`. The list is defined in the `_available_subthemes` function inside the custom scripts on the page.
- Ensure that your changes work well on mobile! Use browser developer tools to verify this before creating a Pull Request on GitHub.

## Keeping this theme up-to-date with Primer

It's important to periodically check for changes from the [original upstream theme (Primer)](https://github.com/pages-themes/primer).

- Compare the two repositories to check for changes. This can be achieved by [drafting a Pull Request](https://github.com/eecs485staff/primer-spec/compare/master...pages-themes:master).

- If there are changes, check the scope of changes. (If there are changes to `_layouts/default.html`, they will have to be reflected in `_layouts/spec.html` also.)
