---
layout: spec
sitemapOrder: 1
---

<!-- prettier-ignore-start -->
# Callouts
{: .primer-spec-toc-ignore }
<!-- prettier-ignore-end -->

Use Callouts when you want to elevate information and draw attention to it. Use these components sparingly!

<p class="primer-spec-callout success" markdown="1">
All of these callouts work great in dark mode too!
</p>

<div class="primer-spec-callout info" markdown="1">
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

Primer Spec offers five variants of callouts:

- `neutral`
- `info`
- `warning`
- `danger`
- `sucess`

See below for examples of each of these callouts.

### `neutral`

<div class="primer-spec-callout" markdown="1">
_**Pro tip:** Use this to create a simple note box. It's weaker than `info`, but offers stronger emphasis than main body text._
</div>

<details markdown="1">
  <summary><code>neutral</code> source</summary>
  
  ```markdown
<div class="primer-spec-callout" markdown="1">
  _**Pro tip:** Use this to create a simple note box. It's weaker than `info`, but offers stronger emphasis than main body text._
</div>
  ```
</details>

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
