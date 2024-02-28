<!-- todo: prairielearn, adoption, fppgen -->
## Automatic Generation of <br> Faded Parsons Problems <br> For All Levels of Coursework
#### **Serena Caraco**, Nelson Lojo, <br> Michael Verdicchio, *Armando Fox*


---
<!-- .slide: data-auto-animate -->
## Motivation

### Faded Parsons is Usable at Any Scale

+++
<!-- .slide: data-auto-animate -->
## Motivation

- Complex Problems need Scaffolding
- Students need to form Good Habits Early

> Faded Parsons Problems work, <br>
> but are hard to write from scratch.
<!-- .element: class="fragment fade-in" -->

Note: Intro-Level Learning

+++
<!-- .slide: data-auto-animate -->
## Motivation

- Test Writing is a *Complex* Problem
- Test Writing is a Good Habit

> Code-Writing Problems and Existing Autograders falter here.
<!-- .element: class="fragment fade-in" -->

Note: Upper-Level Learning

+++
<!-- .slide: data-auto-animate -->
## Motivation

> **FPPgen** streamlines Authoring,<br>
> supports Arbitrary Complexity.

> **Mutation-Based Autograders** <br> assess Test Quality.
<!-- .element: class="fragment fade-in good" -->

*No matter the problem skill level or complexity, <br> our tools can help.*
<!-- .element: class="fragment fade-in" -->

Note: Our Tools solve these Issues.

---

### Part One
<hr>

## Authoring

---
<!-- .slide: data-auto-animate -->

> I am not a great programmer, <br>
> I am a good programmer <br>
> with great habits.

*Kent Beck*

*How do we impart good habits?*
<!-- .element: class="fragment fade-in" -->

---

#### An Example:

### Recursion
<!-- .element: class="fragment fade-in" -->

``` py
def is_even(n: int):
    # solve with recursion!
```
<!-- .element: class="fragment fade-in" -->

---
<!-- .slide: data-auto-animate -->

### Recursion

``` py
def is_even(n: int):
    # think: what's the base case here?
    if base_case:
        return True
    # solve the rest with recursion!
```

+++
<!-- .slide: data-auto-animate -->
### Recursion

``` py
def is_even(n: int):
    if n == 2:
        return True
    else if is_even(n - 1) == False:
        return False
    else if is_even(n - 2) == True:
        return True
    elif is_even(n - 3) == False:
        return False
    else if is_even(n - 4) == True:
        return True
    else if is_even(n - 5) == False:
        return False
    else if is_even(n - 6) == True:
        return True
    else if is_even(n - 7) == False:
        return False
    else if is_even(n - 8) == True:
        return True
    else if is_even(n - 9) == False:
        return False
```

---
<!-- .slide: data-auto-animate -->

*How do we impart good habits?*

### Faded Parsons Problems
<!-- .element: class="fragment fade-in" -->

---
<!-- .slide: data-auto-animate -->

### Faded Parsons Problems
#### An Example

![a simple FPP](img/is-even.png)

Note: Guiding idea: force expert solution reconstruction.

+++
<!-- .slide: data-auto-animate -->

### Faded Parsons Problems
#### Another Example

![an FPP of the examples above](img/dragging-simple.png)

+++
<!-- .slide: data-auto-animate -->

### Faded Parsons Problems
*Do they work?*

At Least as Effective as Code-Writing
<!-- .element: class="fragment fade-in" -->
Designed for Picking Up Good Habits
<!-- .element: class="fragment fade-in" -->
Highly Constrain Student Solution Space
<!-- .element: class="fragment fade-in" -->

Note: \*citation needed

---
<!-- .slide: data-auto-animate -->
### Authoring Experience

> The No-Compromises Approach to Bettering Your Authoring UX

Let's start with Converting from Code-Writing.
<!-- .element: class="fragment fade-in" -->

+++
<!-- .slide: data-auto-animate -->
### Converting to Faded Parsons Problems

1. Start with your Code-Writing Solution.
2. Mark
<!-- .element: class="fragment fade-in" -->
`?Blanks?`.
3. Run FPPgen.
<!-- .element: class="fragment fade-in" -->

Note: no compromises!!


+++
<!-- .slide: data-auto-animate -->

*Well, what about...*

### Authoring From Scratch

First, a recap of authoring Code-Writing problems.
<!-- .element: class="fragment fade-in" -->


+++
<!-- .slide: data-auto-animate -->
### Code-Writing From Scratch

1. Use PrairieLearn to Generate Templates
1. Rewrite the Question Config
1. Update the Server File
1. Write Your Prompt (HTML)
1. Write Your Question (XML)
1. Write Your Solution
1. Write Your Spec

Note: PL testing grades against your solution with a Spec-Based Autograder.

+++
<!-- .slide: data-auto-animate -->
### Faded Parsons From Scratch

1. Write your Prompt
1. Write your Solution
1. Write your Spec
1. Run FPPgen

*Better than No-Compromises: <br> FPPgen is Win-Win*
<!-- .element: class="fragment fade-in" -->

Note: prompt embellishment, solution presentation.

---

### Part Two
<hr>

## Faded Parsons at Scale

---
<!-- .slide: data-auto-animate -->

### Common Misconception

> While useful for beginners, <br>
> FPPs are an impractical medium
> for teaching software engineering.
<!-- .element: class="bad" -->

I'll do you one better.
<!-- .element: class="fragment fade-in" -->

---
<!-- .slide: data-auto-animate -->

### Test Writing

#### Difficult to Scaffold.
<!-- .element: class="fragment fade-in" -->
#### Even Harder to Grade.
<!-- .element: class="fragment fade-in" -->

+++
<!-- .slide: data-auto-animate -->

*How do we scaffold and constrain solution space?*

*How do we impart good habits?*
<!-- .element: class="fragment fade-in" -->
### Faded Parsons Problems <span class="fragment fade-in">++</span>
<!-- .element: class="fragment fade-in" -->

Note: narrows solution space while scaffolding!

+++
<!-- .slide: data-auto-animate -->

#### Single-Tray Problems with Context

<img src="img/giftcard-sequence/0.png">

+++
<!-- .slide: data-auto-animate -->

#### Mutli-Part Faded Parsons


<div class="col-container">
    <div class="col">
        <img src="img/giftcard-sequence/0.png">
        <h4 class="fragment fade-in">. . . Solved!</h4>
    </div>
    <div class="col">
        <img class="fragment fade-in" src="img/giftcard-sequence/1.png">
    </div>
</div>

+++
<!-- .slide: data-auto-animate -->

#### Mutli-Part Faded Parsons


<div class="col-container">
    <div class="col">
        <img class="fragment" src="img/giftcard-sequence/1.png">
        <h4 class="fragment fade-in">. . . Solved!</h4>
    </div>
    <div class="col">
        <img src="img/giftcard-sequence/2.png">
    </div>
</div>

+++
<!-- .slide: data-auto-animate -->

#### Mutli-Part Faded Parsons


<div class="col-container">
    <div class="col">
        <img src="img/giftcard-sequence/0.png">
    </div>
    <div class="col">
        <img src="img/giftcard-sequence/1.png">
    </div>
    <div class="col">
        <img src="img/giftcard-sequence/2.png">
    </div>
</div>

+++
<!-- .slide: data-auto-animate -->

#### Mutli-Part Faded Parsons

![a final question to DRY out code](img/giftcard-sequence/dry-cropped.png)
<!-- .element: class="taper-fade" -->

---
<!-- .slide: data-auto-animate -->
### Spec-Based Autograder

<div class="col-container">
    <div class="col">
        <h4>From Instructor</h4>
        <p class="col fragment fade-in">Reference Solution</p>
        <p class="col fragment fade-in">Test Inputs</p>
    </div>
    <div class="col">
        <h4>From Student</h4>
        <p class="col">&nbsp</p>
        <p class="col">&nbsp</p>
        <p class="col fragment fade-in">Student Solution</p>
    </div>
    <div class="col">
        <h4>At Grading</h4>
        <p style="font-size:6pt; color:#00000000"> spacer </p>
        <p class="col fragment fade-in">$\rangle$ Reference Output</p>
        <p class="col fragment fade-in">$\rangle$ Student Output</p>
        <hr class="col fragment fade-in">
        <p class="col fragment fade-in"><b>Score</b></p>
    </div>
</div>


+++
<!-- .slide: data-auto-animate -->
### Assessing Test Suites

#### Problem Components:
<!-- .element: class="fragment fade-in" -->
- A System Under Test that we provide
<!-- .element: class="fragment fade-in" -->
- A Test Suite that
<!-- .element: class="fragment fade-in" -->
*we want to grade*

> Spec-Based Autograding <br>
> doesn't work here.
<!-- .element: class="fragment fade-in" -->

Note: arbitrary SUT dependencies! arbitrary test deps!

+++
<!-- .slide: data-auto-animate -->
### Assessing Test Suites
- A System Under Test that we provide
- A Test Suite that *we want to grade*
- A Set of Mutants we create
<!-- .element: class="fragment fade-in" data-fragment-index="2" -->

Borrow Mutant Generation from Industry QA

Make a *Mutation-Based Autograder* that <br>
grades a test suite on killed mutants
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->

+++
<!-- .slide: data-auto-animate -->

### Mutation-Based Autograders

<div class="col-container">
    <div class="col" style="flex: 1 1 0">
        <h4>From Instructor</h4>
        <p class="col">Ref. Solution</p>
        <p class="col">System Under Test</p>
        <p class="col">Mutations</p>
    </div>
    <div class="col" style="flex: 1 1 0">
        <h4>From Student</h4>
        <p class="col">&nbsp</p>
        <p class="col">&nbsp</p>
        <p class="col">&nbsp</p>
        <p class="col">Stud. Solution</p>
    </div>
    <div class="col" style="flex: 2 1 0">
        <h4>At Grading</h4>
        <div class="col-container">
            <div class="col">
                <p class="col">&nbsp</p>
                <p style="font-size:4pt; color:#00000000"> spacer </p>
                <p class="col">$\rangle\rangle\rangle$ Mutants</p>
            </div>
            <div class="col">
                <p style="font-size:6pt; color:#00000000"> spacer </p>
                <p class="col">$\rangle$ Reference Output</p>
                <p class="col">&nbsp</p>
                <p class="col">$\rangle$ Student Output</p>
                <hr class="col">
                <p class="col"><b>Score</b></p>
            </div>
        </div>
    </div>
</div>

Note: Only one set of mutations is necessary across all parts of a problem.

+++
<!-- .slide: data-auto-animate -->

### Mutation-Based Autograders

![Overview of Feedback](img/ag-feedback/feedback-overview.png)

+++
<!-- .slide: data-auto-animate -->

### Mutation-Based Autograders

![Overview of Feedback](img/ag-feedback/correct-feedback.png)

+++
<!-- .slide: data-auto-animate -->

### Mutation-Based Autograders

![Overview of Feedback](img/ag-feedback/incorrect-feedback.png)

---
<!-- .slide: data-auto-animate -->
### Test Writing

#### Difficult to Scaffold.
> Multi-Part Faded Parsons
<!-- .element: class="fragment fade-in" -->
#### Even Harder to Grade.
> Mutation-Based Autograder
<!-- .element: class="fragment fade-in" -->

*What about authoring these...*
<!-- .element: class="fragment fade-in" -->

---

### Future Work

- Continue the No-Compromises Approach
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->
  - Streamlined Multi-Part Problem Writing
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->
  - Automated Mutant Generation
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->
- Study Efficacy specific to Test Writing
<!-- .element: class="fragment fade-in" -->
- Use Faded Parsons in more Upper Div Topics
<!-- .element: class="fragment fade-in" -->
