---
layout: spec
---

<!-- prettier-ignore-start -->
# Callouts
{: .primer-spec-toc-ignore }
<!-- prettier-ignore-end -->

Use Callouts when you want to elevate information and draw attention to it. Use these components sparingly!

<p class="primer-spec-callout success icon-success" markdown="1">
All of these callouts work great in dark mode too!
</p>

<div class="primer-spec-callout info icon-info" markdown="1">
You can include code blocks in your callouts too!

```c++
int main() {
  std::cout << "Primer Spec!" << std::endl;
  return 0;
}
```

</div>

## Usage

```markdown
<div class="primer-spec-callout [variant]" markdown="1">
  This is an example note box.
  If you use this in a `markdown` file, *markdown* works inside the box too!
</div>
```

Primer Spec offers four variants of callouts:

- `info`
- `warning`
- `danger`
- `sucess`

See below for examples of each of these callouts.

### `info`

<div class="primer-spec-callout info" markdown="1">
_**Pro tip:** Use this for additional information, context or hints._
</div>

<details markdown="1">
  <summary><code>info</code> source</summary>
  
  ```markdown
<div class="primer-spec-callout info" markdown="1">
  _**Pro tip:** Use this for additional information, context or hints._
</div>
  ```
</details>

### `warning`

<div class="primer-spec-callout warning" markdown="1">
_**Pro tip:** Use this to alert readers or when extra care/attention is needed._
</div>

<details markdown="1">
  <summary><code>warning</code> source</summary>
  
  ```markdown
<div class="primer-spec-callout warning" markdown="1">
  _**Pro tip:** Use this to alert readers or when extra care/attention is needed._
</div>
  ```
</details>

### `danger`

<div class="primer-spec-callout danger" markdown="1">
_**Pro tip:** Use this to caution readers about dangerous outcomes (or when something won't work as expected)._
</div>

<details markdown="1">
  <summary><code>danger</code> source</summary>
  
  ```markdown
<div class="primer-spec-callout danger" markdown="1">
  _**Pro tip:** Use this to caution readers about dangerous outcomes (or when something won't work as expected)._
</div>
  ```
</details>

### `success`

<div class="primer-spec-callout success" markdown="1">
_**Pro tip:** Use this to celebrate an achievement!_
</div>

<details markdown="1">
  <summary><code>success</code> source</summary>
  
  ```markdown
<div class="primer-spec-callout success" markdown="1">
  _**Pro tip:** Use this to celebrate an achievement!_
</div>
  ```
</details>

## Usage with icons

You can also include an icon with each callout. You can use any icon with any callout-variant, but we stronly recommend using the icons with the variant in their names.

See below for recommended exmaples.

### `info` icon

<div class="primer-spec-callout info icon-info" markdown="1">
A callout with an "info" icon.
</div>

<details markdown="1">
  <summary><code>info</code> icon source</summary>
  
  ```markdown
<div class="primer-spec-callout info icon-info" markdown="1">
  A callout with an "info" icon.
</div>
  ```
</details>

### `warning` icon

<div class="primer-spec-callout warning icon-warning" markdown="1">
A callout with an excalamation-triangle icon.
</div>

<details markdown="1">
  <summary><code>warning</code> icon source</summary>
  
  ```markdown
<div class="primer-spec-callout warning icon-warning" markdown="1">
  A callout with an excalamation-triangle icon.
</div>
  ```
</details>

### `danger` icon

<div class="primer-spec-callout danger icon-danger" markdown="1">
A callout with an excalamation-circle icon.
</div>

<details markdown="1">
  <summary><code>danger</code> icon source</summary>
  
  ```markdown
<div class="primer-spec-callout danger icon-danger" markdown="1">
  A callout with an excalamation-circle icon.
</div>
  ```
</details>

### `success` icon

<div class="primer-spec-callout success icon-success" markdown="1">
A callout with a check-mark icon.
</div>

<details markdown="1">
  <summary><code>success</code> icon source</summary>
  
  ```markdown
<div class="primer-spec-callout success icon-success" markdown="1">
  A callout with a check-mark icon.
</div>
  ```
</details>
