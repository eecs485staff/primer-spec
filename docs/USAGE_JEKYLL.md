# Usage with Jekyll

See the [Primer Spec README](../README.md) for the main usage instructions. This page contains further instructions for more advanced workflows.

## Contents
- [Previewing locally](#previewing-github-pages-locally)
  - [Part 1: Create the dependency files](#local-setup-part-1-create-the-dependency-files)
  - [Part 2: Install the dependencies](#local-setup-part-2-install-the-dependencies)
- [Customizing Jekyll](#customizing-jekyll)


## Previewing GitHub Pages locally
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

## Customizing Jekyll

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
