---
layout: spec
---

<!-- prettier-ignore-start -->
# Callouts
{: .primer-spec-toc-ignore }
<!-- prettier-ignore-end -->

Use Callouts when you want to elevate information and draw attention to it. Use these components sparingly!

<p class="primer-spec-callout-success primer-spec-callout-icon-success" markdown="1">
All of these callouts work great in dark mode too!
</p>

## Usage

```markdown
<p class="primer-spec-callout-[variant]" markdown="1">
  This is an example note box.
  If you use this in a `markdown` file, *markdown* works inside the box too!
</p>
```

Primer Spec offers four variants of callouts:

- `info`
- `warning`
- `danger`
- `sucess`

See below for examples of each of these callouts.

### `info`

<p class="primer-spec-callout-info" markdown="1">
_**Pro tip:** Use this for additional information, context or hints._
</p>

<details markdown="1">
  <summary><code>info</code> source</summary>
  
  ```markdown
<p class="primer-spec-callout-info" markdown="1">
  _**Pro tip:** Use this for additional information, context or hints._
</p>
  ```
</details>

### `warning`

<p class="primer-spec-callout-warning" markdown="1">
_**Pro tip:** Use this to alert readers or when extra care/attention is needed._
</p>

<details markdown="1">
  <summary><code>warning</code> source</summary>
  
  ```markdown
<p class="primer-spec-callout-warning" markdown="1">
  _**Pro tip:** Use this to alert readers or when extra care/attention is needed._
</p>
  ```
</details>

### `danger`

<p class="primer-spec-callout-danger" markdown="1">
_**Pro tip:** Use this to caution readers about dangerous outcomes (or when something won't work as expected)._
</p>

<details markdown="1">
  <summary><code>danger</code> source</summary>
  
  ```markdown
<p class="primer-spec-callout-danger" markdown="1">
  _**Pro tip:** Use this to caution readers about dangerous outcomes (or when something won't work as expected)._
</p>
  ```
</details>

### `success`

<p class="primer-spec-callout-success" markdown="1">
_**Pro tip:** Use this to celebrate an achievement!_
</p>

<details markdown="1">
  <summary><code>success</code> source</summary>
  
  ```markdown
<p class="primer-spec-callout-success" markdown="1">
  _**Pro tip:** Use this to celebrate an achievement!_
</p>
  ```
</details>

## Usage with icons

You can also include an icon with each callout. You can use any icon with any callout-variant, but we stronly recommend using the icons with the variant in their names.

See below for recommended exmaples.

### `info` icon

<p class="primer-spec-callout-info primer-spec-callout-icon-info" markdown="1">
A callout with an "info" icon.
</p>

<details markdown="1">
  <summary><code>info</code> icon source</summary>
  
  ```markdown
<p class="primer-spec-callout-info primer-spec-callout-icon-info" markdown="1">
  A callout with an "info" icon.
</p>
  ```
</details>

### `warning` icon

<p class="primer-spec-callout-warning primer-spec-callout-icon-warning" markdown="1">
A callout with an excalamation-triangle icon.
</p>

<details markdown="1">
  <summary><code>warning</code> icon source</summary>
  
  ```markdown
<p class="primer-spec-callout-warning primer-spec-callout-icon-warning" markdown="1">
  A callout with an excalamation-triangle icon.
</p>
  ```
</details>

### `danger` icon

<p class="primer-spec-callout-danger primer-spec-callout-icon-danger" markdown="1">
A callout with an excalamation-circle icon.
</p>

<details markdown="1">
  <summary><code>danger</code> icon source</summary>
  
  ```markdown
<p class="primer-spec-callout-danger primer-spec-callout-icon-danger" markdown="1">
  A callout with an excalamation-circle icon.
</p>
  ```
</details>

### `success` icon

<p class="primer-spec-callout-success primer-spec-callout-icon-success" markdown="1">
A callout with a check-mark icon.
</p>

<details markdown="1">
  <summary><code>success</code> icon source</summary>
  
  ```markdown
<p class="primer-spec-callout-success primer-spec-callout-icon-success" markdown="1">
  A callout with a check-mark icon.
</p>
  ```
</details>
