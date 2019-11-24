# The Primer Spec theme

[![Build Status](https://travis-ci.com/eecs485staff/primer-spec.svg?branch=master)](https://travis-ci.com/eecs485staff/primer-spec)

*Primer Spec is an HTML (and Jekyll) theme that makes long informative web pages easier to read. In addition to aesthetic styling, the theme generates a table of contents displayed in a sidebar. You can [preview the theme to see what it looks like](http://eecs485staff.github.io/primer-spec), or even [use it today](#usage).*

Primer Spec is built on top of the wonderful [Primer theme](https://github.com/pages-themes/primer), and adds functionality useful for pages with a lot of content. This theme was primarily designed for hosting project specifications for EECS courses at the University of Michigan. (Here are [some](https://eecs485staff.github.io/p1-insta485-static/) [examples](https://eecs280staff.github.io/p1-stats/).)

## Contents
- [Usage](#usage)
  - [Using with Jekyll](#using-with-jekyll)
  - [Using the plugin](#using-the-plugin)
- [Contributing](#contributing)

## Usage
There are two ways to quickly get started using this theme. First, answer this question:

*Do you want to store your long webpage as MarkDown or as HTML?*

- *MarkDown*:
  Use the Jekyll theme, probably coupled with GitHub/GitLab pages. Jekyll converts your MarkDown files into HTML, and has some other great features to host a website. See [Using with Jekyll](#using-with-jekyll).

- *HTML*:
  Use the plugin script. Simply add a couple of lines to your plain HTML webpage and watch it magically transform in your browser! See [Using the plugin](#using-the-plugin).


### Using with Jekyll
*If you plan to use GitHub Pages, see https://pages.github.com for guides.*

Follow these steps to add MarkDown files that use the Primer Spec theme.

1. Add your Markdown files. Note that files named README.md will be ignored by Jekyll when using a custom theme.

2. If it doesn't already exist, create a file `_config.yml` in your site's root directory. Add this content to the file:

    ```yml
    remote_theme: eecs485staff/primer-spec
    plugins:
        - jekyll-remote-theme
    ```

3. To add the Primer Spec theme to a MarkDown file, add the following at the top of the file:

    ```yml
    ---
    layout: spec
    ---
    ```

4. (Skip this step if you are using GitHub Pages.) Add the following to your Gemfile:

    ```ruby
    gem "jekyll-remote-theme"
    ```

5. (Optional) To prevent a heading from appearing in the sidebar, add `{: .primer-spec-toc-ignore }` under the heading. For instance:

    ```markdown
    ### This heading appears in the sidebar
    
    Spam spam spam.

    ### This heading does NOT appear in the sidebar.
    {: .primer-spec-toc-ignore }

    Spam spam spam.
    ```

6. If you're using GitHub pages, follow the steps in the [USAGE_JEKYLL file](docs/USAGE_JEKYLL.md#Previewing-GitHub-Pages-locally) to preview your website locally.


### Using the plugin
Follow these steps to add the plugin to your plain HTML webpage.

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

## Contributing

Interested in contributing to Primer Spec? We'd love your help. Primer Spec is an open source project, built one contribution at a time by users like you. See [the CONTRIBUTING file](docs/CONTRIBUTING.md) for further instructions on how to contribute.

For maintenance and release instructions, see [Maintenance & Release section](docs/CONTRIBUTING.md#Maintenance--Release) of the CONTRIBUTING file.
