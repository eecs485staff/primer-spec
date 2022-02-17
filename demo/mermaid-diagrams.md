---
layout: spec
mermaid: true
---

<!-- prettier-ignore-start -->
# Mermaid Diagrams
{: .primer-spec-toc-ignore }
<!-- prettier-ignore-end -->

[Mermaid](https://mermaid-js.github.io/mermaid/#/?id=diagram-types) lets you define diagrams (like flow charts and sequence diagrams) with easy-to-learn Markdown-ish syntax.

This page contains some examples of how you can use Mermaid in your specs!

## Usage

Just add `mermaid: true` to the front-matter of your spec page. For instance:

<!-- prettier-ignore-start -->
```plaintext
---
layout: spec
mermaid: true
---

# My Spec
...
```
{: data-title="my_spec.md" data-highlight="3" }
<!-- prettier-ignore-end -->

## Flowcharts

_Docs: [https://mermaid-js.github.io/mermaid/#/flowchart](https://mermaid-js.github.io/mermaid/#/flowchart)_

### Basic example

```mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```

<details markdown="1">
<summary>Show code</summary>

````markdown
```mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```
````

</details>

### FontAwesome Icons

```mermaid
flowchart TD
  B["fa:fa-hand-peace for peace"]
  B-->C[fa:fa-ban forbidden]
  B-->D(fa:fa-spinner);
  B-->E(A fa:fa-camera-retro perhaps?);
```

<details markdown="1">
<summary>Show code</summary>

````markdown
```mermaid
flowchart TD
  B["fa:fa-hand-peace for peace"]
  B-->C[fa:fa-ban forbidden]
  B-->D("fa:fa-spinner ");
  B-->E(A fa:fa-camera-retro perhaps?);
```
````

</details>

Look for FontAwesome icons on their website: [https://fontawesome.com/search?m=free](https://fontawesome.com/search?m=free)

### Subgraphs

```mermaid
flowchart TB
  c1-->a2
  subgraph one
  a1-->a2
  end
  subgraph two
  b1-->b2
  end
  subgraph three
  c1-->c2
  end
  one --> two
  three --> two
  two --> c2
```

<details markdown="1">
<summary>Show code</summary>

````markdown
```mermaid
flowchart TB
  c1-->a2
  subgraph one
  a1-->a2
  end
  subgraph two
  b1-->b2
  end
  subgraph three
  c1-->c2
  end
  one --> two
  three --> two
  two --> c2
```
````

</details>

## Sequence Diagrams

_Docs: [https://mermaid-js.github.io/mermaid/#/sequenceDiagram](https://mermaid-js.github.io/mermaid/#/sequenceDiagram)_

> A Sequence diagram is an interaction diagram that shows how processes operate with one another and in what order.

```mermaid
sequenceDiagram
  participant Adi
  participant Barbara
  participant C as Chi-Chih
  Adi->>C: Hello Chi-Chih, how are you?
  loop Healthcheck
    C->>C: Fight against hypochondria
  end
  Note right of C: Rational thoughts <br/>prevail!
  C-->>Adi: Great!
  C->>Barbara: How about you?
  Barbara-->>C: Jolly good!
```

<details markdown="1">
<summary>Show code</summary>

````markdown
```mermaid
sequenceDiagram
  participant Adi
  participant Barbara
  participant C as Chi-Chih
  Adi->>C: Hello Chi-Chih, how are you?
  loop Healthcheck
    C->>C: Fight against hypochondria
  end
  Note right of C: Rational thoughts <br/>prevail!
  C-->>Adi: Great!
  C->>Barbara: How about you?
  Barbara-->>C: Jolly good!
```
````

</details>

## Class diagrams

_Docs: [https://mermaid-js.github.io/mermaid/#/classDiagram](https://mermaid-js.github.io/mermaid/#/classDiagram)_

> "In software engineering, a class diagram in the Unified Modeling Language (UML) is a type of static structure diagram that describes the structure of a system by showing the system's classes, their attributes, operations (or methods), and the relationships among objects." Wikipedia

```mermaid
classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck{
    +String beakColor
    +swim()
    +quack()
  }
  class Fish{
    -int sizeInFeet
    -canEat()
  }
  class Zebra{
    +bool is_wild
    +run()
  }
```

<details markdown="1">
<summary>Show code</summary>

````markdown
```mermaid
classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck{
    +String beakColor
    +swim()
    +quack()
  }
  class Fish{
    -int sizeInFeet
    -canEat()
  }
  class Zebra{
    +bool is_wild
    +run()
  }
```
````

</details>

## State diagrams

_Docs: [https://mermaid-js.github.io/mermaid/#/stateDiagram](https://mermaid-js.github.io/mermaid/#/stateDiagram)_

> "A state diagram is a type of diagram used in computer science and related fields to describe the behavior of systems. State diagrams require that the system described is composed of a finite number of states; sometimes, this is indeed the case, while at other times this is a reasonable abstraction." Wikipedia

```mermaid
stateDiagram
  [*] --> Still
  Still --> [*]

  Still --> Moving
  Moving --> Still
  Moving --> Crash
  Crash --> [*]
```

<details markdown="1">
<summary>Show code</summary>

````markdown
```mermaid
stateDiagram
  [*] --> Still
  Still --> [*]

  Still --> Moving
  Moving --> Still
  Moving --> Crash
  Crash --> [*]
```
````

</details>
