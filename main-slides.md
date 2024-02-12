<!-- todo: prairielearn, adoption, fppgen -->
## Automatic Generation of <br> Faded Parsons Problems
#### **Serena Caraco**, *Nelson Lojo*, <br> Michael Verdicchio, Armando Fox

---
<!-- .slide: data-auto-animate -->

> I am not a great programmer, <br>
> I am a good programmer <br>
> with great habits.

*Kent Beck*
<!-- .element: class="fragment fade-in" -->

*How do we impart good habits?*
<!-- .element: class="fragment fade-in" -->

---
<!-- .slide: data-auto-animate -->
### Students *must* learn proper style.

*How do we impart good habits?*

+++
<!-- .slide: data-auto-animate -->

*How do we impart good habits?*

``` js
function isEven(n: Number) {
    // your recursive code here.
}
```

+++
<!-- .slide: data-auto-animate -->

*How do we impart good habits?*

``` js
function isEven(n: Number) {
    if (n /* is this the first base case?*/) {
        return true;
    }
    // try to make it recursive!.
}
```

+++
<!-- .slide: data-auto-animate -->

*How do we impart good habits?*

``` js
function isEven(n: Number) {
    if (n == 0) {
        return true;
    } else if (isEven(n - 1) == false) {
        return false;
    } else if (isEven(n - 2) == true) {
        return true;
    } else if (isEven(n - 3) == false) {
        return false;
    } else if (isEven(n - 4) == true) {
        return true;
    } else if (isEven(n - 5) == false) {
        return false;
    } else if (isEven(n - 6) == true) {
        return true;
    } else if (isEven(n - 7) == false) {
        return false;
    } else if (isEven(n - 8) == true) {
        return true;
    } else if (isEven(n - 9) == false) {
        return false;
    }
}
```
<!-- .element: class="fragment fade-in" -->

+++
<!-- .slide: data-auto-animate -->

*How do we impart good habits?*

### Faded Parsons Problems

---
<!-- .slide: data-auto-animate -->

### Faded Parsons Problems

![a simple FPP](img/dragging-simple.png)

Note: Guiding idea: force expert solution reconstruction.

+++
<!-- .slide: data-auto-animate -->

### Faded Parsons Problems

*At Least as Effective as Code-Writing*
<!-- .element: class="fragment fade-in" -->
*Designed for Picking Up Good Habits*
<!-- .element: class="fragment fade-in" -->

Note: \*citation needed

---
<!-- .slide: data-auto-animate -->

### Faded Parsons Problems

*Is this actually usable?*

- *It must be autogradable.*
<!-- .element: class="fragment fade-in" -->
- *It must not be meaningully harder <br> to make than code writing.*
<!-- .element: class="fragment fade-in" -->

---
<!-- .slide: data-auto-animate -->
### Autograding

*It must be autogradable.*

- (Good) code is meant to run.
- (Good) platforms tighten the inner dev loop.

---
<!-- .slide: data-auto-animate -->
### Authoring

> The No-Compromises Approach to Bettering Your Authoring UX

+++
<!-- .slide: data-auto-animate -->
### Authoring <span class="invis">Faded</span> Parsons Problems

1. Start with your Code Writing Exercise.
2. Run FPPgen.

+++
<!-- .slide: data-auto-animate -->
### Authoring Faded Parsons Problems

1. Start with your Code Writing Exercise.
2. Mark `?Blanks?`.
3. Run FPPgen.

*No-Compromises?*
<!-- .element: class="fragment fade-in" -->
💯
<!-- .element: class="fragment fade-in" -->


---
<!-- .slide: data-auto-animate -->

*Yeah, okay. What about...*

### Authoring From Scratch

+++
<!-- .slide: data-auto-animate -->
### Python Code Writing From Scratch

2. Use PrairieLearn to Generate Templates.
3. Rewrite the Question Config.
4. Update the Server File.
5. Write Your Prompt (XML).
6. Write Your Question (XML).
7. Write Your Solution.
8. Write Your Tests.

Note: PL testing grades against your solution.

+++
<!-- .slide: data-auto-animate -->
### Python Faded Parsons From Scratch

1. Write your Prompt.
2. Write your Solution.
3. Write your Tests.
4. Run FPPgen.

*Better than No-Compromises: <br> FPPgen is Win-Win*
<!-- .element: class="fragment fade-in" -->

Note: prompt embellishment, solution presentation.

---
<!-- .slide: data-auto-animate -->
*This is cool, but aren't blocks for babies?*

---
<!-- .slide: data-auto-animate -->
### Students *must* learn test writing.

*How do we impart good habits?*
<!-- .element: class="fragment fade-in" -->
