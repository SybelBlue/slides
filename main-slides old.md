<!-- todo: prairielearn, adoption, fppgen -->
## Automatic Generation of <br> Faded Parsons Problems
#### **Serena Caraco**, Nelson Lojo, <br> Michael Verdicchio, *Armando Fox*


---
<!-- .slide: data-auto-animate -->
## 60 Second Talk
#### Part 1
- Teaching Good Habits is Hard
- Faded Parsons Problems Help
- **FPPgen** Streamlines Authoring

+++
<!-- .slide: data-auto-animate -->
## 60 Second Talk
#### Part 2
- Strong Test Writing is a Good Habit
- **FPPgen** can scale scaffolding and <br> support broad dependencies
- **Mutation-Based Autograders** can <br> grade Test Suites

+++
<!-- .slide: data-auto-animate -->
## 60 Second Talk

*Regardless of students' skill-levels, <br> FPPgen can help you.*

---
<!-- .slide: data-auto-animate -->

> I am not a great programmer, <br>
> I am a good programmer <br>
> with great habits.

*Kent Beck*

*How do we impart good habits?*
<!-- .element: class="fragment fade-in" -->

---
<!-- .slide: data-auto-animate -->

``` py
def is_even(n: int):
    # your recursive code here.
```

+++
<!-- .slide: data-auto-animate -->

``` py
def is_even(n: int):
    # think: what's the base case here?
    if base_case:
        return True
    # solve the rest with recursion!
```

+++
<!-- .slide: data-auto-animate -->

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

*How do we impart good habits?*
<!-- .element: class="fragment fade-in" -->

+++
<!-- .slide: data-auto-animate -->

*How do we impart good habits?*

### Faded Parsons Problems
<!-- .element: class="fragment fade-in" -->

---
<!-- .slide: data-auto-animate -->

### Faded Parsons Problems
#### An Example

![an FPP of the examples above](img/is-even.png)

Note: Guiding idea: force expert solution reconstruction.

+++
<!-- .slide: data-auto-animate -->

### Faded Parsons Problems
#### Another Example

![a simple FPP](img/dragging-simple.png)

Note: Guiding idea: force expert solution reconstruction.

+++
<!-- .slide: data-auto-animate -->

### Faded Parsons Problems
*Do they work?*

At Least as Effective as Code-Writing
<!-- .element: class="fragment fade-in" -->
Designed for Picking Up Good Habits
<!-- .element: class="fragment fade-in" -->

Note: \*citation needed

---
<!-- .slide: data-auto-animate -->

### Faded Parsons Problems

*Can I actually use this?*

- It must be autogradable.
<!-- .element: class="fragment fade-in" -->
- It must not be meaningully harder to <br> author than a Code-Writing problem.
<!-- .element: class="fragment fade-in" -->

---
<!-- .slide: data-auto-animate -->
### Authoring Experience

> The No-Compromises Approach to Bettering Your Authoring UX

Let's start with Converting to FPPs.
<!-- .element: class="fragment fade-in" -->

+++
<!-- .slide: data-auto-animate -->
### Converting to <span class="invis">Faded</span> Parsons Problems

1. Start with your Code-Writing Exercise.
<!-- .element: class="fragment fade-in" -->
2. Run FPPgen.
<!-- .element: class="fragment fade-in" -->
3. Done.
<!-- .element: class="fragment fade-in" -->

+++
<!-- .slide: data-auto-animate -->
### Converting to Faded Parsons Problems

1. Start with your Code-Writing Exercise.
2. Mark `?Blanks?`.
3. Run FPPgen.
4. Done.

*No-Compromises?*
<!-- .element: class="fragment fade-in" -->
💯
<!-- .element: class="fragment fade-in" -->


+++
<!-- .slide: data-auto-animate -->

*Yeah, okay. What about...*

### Authoring From Scratch

First, a recap of authoring Code-Writing problems.
<!-- .element: class="fragment fade-in" -->


+++
<!-- .slide: data-auto-animate -->
### Code-Writing From Scratch

1. Use PrairieLearn to Generate Templates.
1. Rewrite the Question Config.
1. Update the Server File.
1. Write Your Prompt (XML).
1. Write Your Question (XML).
1. Write Your Solution.
1. Write Your Spec.
<!-- .element: class="fragment highlight-red" -->

Note: PL testing grades against your solution with a Spec-Based Autograder.

+++
<!-- .slide: data-auto-animate -->
### Faded Parsons From Scratch

1. Write your Prompt.
1. Write your Solution.
1. Write your Spec.
1. Run FPPgen.

*Better than No-Compromises: <br> FPPgen is Win-Win*
<!-- .element: class="fragment fade-in" -->

Note: prompt embellishment, solution presentation.

---
<!-- .slide: data-auto-animate -->

### Common Misconception

> While useful for beginners, <br>
> FPPs are an impractical medium
> for teaching software engineering.
<!-- .element: class="bad" -->


*This is cool, but aren't blocks for babies?*
<!-- .element: class="fragment fade-in" -->

<hr>

I'll do you one better.
<!-- .element: class="fragment fade-in" -->

---
<!-- .slide: data-auto-animate -->
### Test writing is a critical habit.

#### Difficult to Scaffold.
<!-- .element: class="fragment fade-in" -->
#### Even Harder to Grade.
<!-- .element: class="fragment fade-in" -->

+++
<!-- .slide: data-auto-animate -->

#### Difficult to Scaffold.

*How do we impart good habits?*
<!-- .element: class="fragment fade-in" -->
### Faded Parsons Problems <span class="fragment fade-in">++</span>
<!-- .element: class="fragment fade-in" -->

+++
<!-- .slide: data-auto-animate -->

#### Difficult to Scaffold.

*A simple one-tray pre-/post-text rspec example*

+++
<!-- .slide: data-auto-animate -->

#### Difficult to Scaffold.

*A progression of a multipart problem*

---
<!-- .slide: data-auto-animate -->
### Test writing is a critical habit.

#### ✅ Difficult to Scaffold.
#### Even Harder to Grade.

+++
<!-- .slide: data-auto-animate -->
#### Even Harder to Grade.

Problem Components:
<!-- .element: class="fragment fade-in" -->
- A System Under Test that we provide
<!-- .element: class="fragment fade-in" -->
- A Test Suite that
<!-- .element: class="fragment fade-in" -->
*we want to grade*

> Spec-Based Autograding <br>
> doesn't work here.
<!-- .element: class="fragment fade-in" -->

+++
<!-- .slide: data-auto-animate -->
#### Even Harder to Grade.
- A System Under Test that we provide
- A Test Suite that *we want to grade*
- A Set of Mutants we create
<!-- .element: class="fragment fade-in" data-fragment-index="3" -->

Borrow Mutant Generation from Industry QA
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->

Make a *Mutation-Based Autograder* that <br>
grades a test suite on killed mutants
<!-- .element: class="fragment fade-in" data-fragment-index="2" -->

---

### Future Work

- Automated Mutant Generation
- Streamlined Multi-Part Problem Writing
- Study Efficacy specific to Test Writing
- Use FPPgen with more Topics
