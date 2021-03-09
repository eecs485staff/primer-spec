---
layout: spec
---

<!-- prettier-ignore-start -->
# Note Boxes
{: .primer-spec-toc-ignore }
<!-- prettier-ignore-end -->

Use Note Boxes when you want to elevate information and draw attention to it. Use these components sparingly!

<p class="primer-spec-success primer-spec-icon-success" markdown="1">
All of these note boxes work great in dark mode too!
</p>

## Usage

```markdown
<p class="primer-spec-[level]" markdown="1">
  This is an example note box.
  If you use this in a `markdown` file, *markdown* works inside the box too!
</p>
```

Primer Spec offers four levels of note boxes:

- `info`
- `warning`
- `danger`
- `sucess`

See below for examples of each of these note boxes.

### `info`

<p class="primer-spec-info" markdown="1">
_**Pro tip:** Use this for additional information, context or hints._
</p>

<details markdown="1">
  <summary><code>info</code> source</summary>
  
  ```markdown
<p class="primer-spec-info" markdown="1">
  _**Pro tip:** Use this for additional information, context or hints._
</p>
  ```
</details>

### `warning`

<p class="primer-spec-warning" markdown="1">
_**Pro tip:** Use this to alert readers or when extra care/attention is needed._
</p>

<details markdown="1">
  <summary><code>warning</code> source</summary>
  
  ```markdown
<p class="primer-spec-warning" markdown="1">
  _**Pro tip:** Use this to alert readers or when extra care/attention is needed._
</p>
  ```
</details>

### `danger`

<p class="primer-spec-danger" markdown="1">
_**Pro tip:** Use this to caution readers about dangerous outcomes (or when something won't work as expected)._
</p>

<details markdown="1">
  <summary><code>danger</code> source</summary>
  
  ```markdown
<p class="primer-spec-danger" markdown="1">
  _**Pro tip:** Use this to caution readers about dangerous outcomes (or when something won't work as expected)._
</p>
  ```
</details>

### `success`

<p class="primer-spec-success" markdown="1">
_**Pro tip:** Use this to celebrate an achievement!_
</p>

<details markdown="1">
  <summary><code>success</code> source</summary>
  
  ```markdown
<p class="primer-spec-success" markdown="1">
  _**Pro tip:** Use this to celebrate an achievement!_
</p>
  ```
</details>

## Usage with icons

You can also include an icon with each Note Box. You can use any icon with any level of note box, but we stronly recommend using the icons with the levels in their names.

See below for recommended exmaples.

### `info` icon

<p class="primer-spec-info primer-spec-icon-info" markdown="1">
A Note Box with an "info" icon.
</p>

<details markdown="1">
  <summary><code>info</code> icon source</summary>
  
  ```markdown
<p class="primer-spec-info primer-spec-icon-info" markdown="1">
  A Note Box with an "info" icon.
</p>
  ```
</details>

### `warning` icon

<p class="primer-spec-warning primer-spec-icon-warning" markdown="1">
A Note Box with an excalamation-triangle icon.
</p>

<details markdown="1">
  <summary><code>warning</code> icon source</summary>
  
  ```markdown
<p class="primer-spec-warning primer-spec-icon-warning" markdown="1">
  A Note Box with an excalamation-triangle icon.
</p>
  ```
</details>

### `danger` icon

<p class="primer-spec-danger primer-spec-icon-danger" markdown="1">
A Note Box with an excalamation-circle icon.
</p>

<details markdown="1">
  <summary><code>danger</code> icon source</summary>
  
  ```markdown
<p class="primer-spec-danger primer-spec-icon-danger" markdown="1">
  A Note Box with an excalamation-circle icon.
</p>
  ```
</details>

### `success` icon

<p class="primer-spec-success primer-spec-icon-success" markdown="1">
A Note Box with a check-mark icon.
</p>

<details markdown="1">
  <summary><code>success</code> icon source</summary>
  
  ```markdown
<p class="primer-spec-success primer-spec-icon-success" markdown="1">
  A Note Box with a check-mark icon.
</p>
  ```
</details>
