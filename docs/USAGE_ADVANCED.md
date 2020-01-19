# Advanced Usage

See the [Primer Spec README](../README.md) for the main usage instructions. This page contains further instructions for more advanced workflows.

## Contents
- [Previewing locally](#previewing-locally)
- [Customizing Jekyll](#customizing-jekyll)
- [Hiding sections from the sidebar](#hiding-sections-from-the-sidebar)
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
google_analytics: [Your Google Analytics tracking ID]
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

<h3 class='primer-spec-toc-ignore'>
    This heading does NOT appear in the sidebar
</h3>

<p>Spam spam spam.</p>
```

### Using without Jekyll
We recommend using Primer Spec with Jekyll because:
- You can store your content as Markdown. Jekyll converts Markdown files to HTML automatically.
- Jekyll applies much of the scaffolding needed for Primer Spec.

However, with some work, it is _possible_ to add Primer Spec styling to a plain HTML page:

1. Make sure that all sections of your web page are marked by header tags (like `h1`, `h2`, etc.).

2. Place all your main content within a `div` with ID `primer-spec-plugin-main-content` and a dummy `onClick` event handler:

    ```html
    <div id="primer-spec-plugin-main-content" onClick="return true;">
        <!-- Your main content goes here. -->
    </div>
    ```

3. Add the following lines at the top of your file, just after the opening `head` tag:

    ```html
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://eecs485staff.github.io/primer-spec/assets/css/primer-spec-base.css">
    <link rel="preload" href="https://eecs485staff.github.io/primer-spec/assets/js/primer_spec_plugin.min.js" as="script" crossorigin>
    ```

4. Add the following line at the bottom of the file, just before the closing `body` tag:

    ```html
    <script src="https://eecs485staff.github.io/primer-spec/assets/js/primer_spec_plugin.min.js" crossorigin="anonymous"></script>
    ```

Your final HTML file will probably look something like this:

```html
<html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://eecs485staff.github.io/primer-spec/assets/css/primer-spec-base.css">
      <link rel="preload" href="https://eecs485staff.github.io/primer-spec/assets/js/primer_spec_plugin.min.js" as="script" crossorigin>
      
      <title>My long project spec</title>
  </head>
  <body>
      <div id="primer-spec-plugin-main-content" onClick="return true;">
          <!-- Main content goes in here. For example: -->
          <h1 class="primer-spec-toc-ignore">My long project spec</h1>
          ...
          <h2>Setup</h2>
          <h3>Installing Python</h3>
          ...
          <h2>Grading</h2>
          ...
      </div>
      <script src="https://eecs485staff.github.io/primer-spec/assets/js/primer_spec_plugin.min.js" crossorigin="anonymous"></script>
  </body>
</html>
```

That's it! The page should now display with Primer Spec styling.
