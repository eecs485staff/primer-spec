# Contributing to The Primer Spec Theme

*This document was adapted from the corresponding documents from the original [Primer theme](https://github.com/pages-themes/primer).*

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.


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

**If you find a security vulnerability, do not open an issue. Please email security@github.com instead.**

## How to suggest a feature or enhancement

If you find yourself wishing for a feature that doesn't exist in The Primer Theme, you are probably not alone. There are bound to be others out there with similar needs. Many of the features that The Primer Theme has today have been added because our users saw the need.

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and goals of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible, including describing the problem you're trying to solve.

[Open an issue](https://github.com/eecs485staff/primer-spec/issues/new) which describes the feature you would like to see, why you want it, how it should work, etc.


## How to propose changes

Here are a few general guidelines for proposing changes:

* If you are making visual changes, include a screenshot of what the affected element looks like, both before and after.
* Follow the [Jekyll style guide](https://ben.balter.com/jekyll-style-guide).
* If you are changing any user-facing functionality, please be sure to update the documentation
* Each pull request should implement **one** feature or bug fix. If you want to add or fix more than one thing, submit more than one pull request
* Do not commit changes to files that are irrelevant to your feature or bug fix
* Don't bump the version number in your pull request (it will be bumped prior to release)
* Write [a good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)

At a high level, [the process for proposing changes](https://guides.github.com/introduction/flow/) is:

1. [Fork](https://github.com/eecs485staff/primer-spec/fork) and clone the project
2. Configure and install the dependencies: `script/bootstrap`
3. Make sure the tests pass on your machine: `script/cibuild`
4. Create a new branch: `git checkout -b my-branch-name`
5. Make your change, add tests, and make sure the tests still pass
6. Push to your fork and [submit a pull request](https://github.com/eecs485staff/primer-spec/compare)
7. Pat your self on the back and wait for your pull request to be reviewed and merged

**Interesting in submitting your first Pull Request?** It's easy! You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Bootstrapping your local development environment

`script/bootstrap`

## Running tests

`script/cibuild`

## Code of conduct

This project is governed by [the Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Additional Resources

* [Contributing to Open Source on GitHub](https://guides.github.com/activities/contributing-to-open-source/)
* [Using Pull Requests](https://help.github.com/articles/using-pull-requests/)
* [GitHub Help](https://help.github.com)
