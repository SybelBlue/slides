#### *The Algorithms and Computing for Education Lab presents*
## Scaffolding Test Writing with Faded Parsons Problems


--- <!-- .slide: data-auto-animate -->

#### A Crash Course in
### Faded Parsons Problems

Goal: reconstruct an expert solution
<!-- .element: class="fragment fade-in" -->

--- <!-- .slide: data-auto-animate -->

### Recursion

``` py
def is_even(n: int):
    if n == 0:
        return True
    return not is_even(n - 1)
```
<!-- .element: class="fragment fade-in -->

Note: - early return
- recursive syntax
- tidy solution

+++ <!-- .slide: data-auto-animate -->

### Recursion
#### **MOABH (Mother of All Bad Habits) Solution**

``` py [|8|]
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

+++ <!-- .slide: data-auto-animate -->

### Recursion

*Imparting style? Scaffolding syntax? Unwieldy solutions?*
<!-- .element: class="demph" -->

> Faded Parsons Problems!
<!-- .element: class="fragment fade-in good" -->

+++ <!-- .slide: data-auto-animate -->

### Faded Parsons Problems

![a simple FPP](img/is-even-no-loop.gif)

--- <!-- .slide: data-auto-animate -->

### What's Exciting About Our Work?

*We know Faded Parsons impart good habits...*

We leverage Faded Parsons to teach **Test-Writing**
<!-- .element: class="fragment fade-in" -->

- We give students a System Under Test
<!-- .element: class="fragment fade-in" -->
- They write us a Test Suite
<!-- .element: class="fragment fade-in" -->

+++ <!-- .slide: data-auto-animate -->

### What **Challenges** Did We Face?

*We know Faded Parsons impart good habits...*

> Writing means syncing data by hand.
<!-- .element: class="fragment bad" -->

> Converting old material is involved.
<!-- .element: class="fragment bad" -->

We leverage Faded Parsons to teach Test-Writing

> No theory of "correctness" <br> or practical, reusable autograder
<!-- .element: class="fragment fade-in bad" -->


+++ <!-- .slide: data-auto-animate -->
### Our Contributions

> **FPPgen** streamlines Authoring, <br>
> supports new kinds of scaffolding.*
<!-- .element: class="fragment fade-in" -->

> A **Mutation-Based Autograder** <br>
> to assess Test Quality.
<!-- .element: class="fragment fade-in good" -->

*\* we'll be skipping this one today*
<!-- .element: class="fragment fade-in demph" -->

Note: spec-based!

open source, online

--- <!-- .slide: data-auto-animate -->

### Roadmap

0. Background
1. Assessing Test-Writing

---

### Part Zero
<hr>

## Background

--- <!-- .slide: data-auto-animate -->

> I am not a great programmer, <br>
> I am a good programmer <br>
> with great habits.

*Kent Beck*

*How do we impart good habits?*
<!-- .element: class="fragment fade-in" -->

--- <!-- .slide: data-auto-animate -->

*How do we impart good habits?*

### Faded Parsons Problems
<!-- .element: class="fragment fade-in" -->

+++ <!-- .slide: data-auto-animate -->

### Faded Parsons Problems
*Do they work?*

- At least as effective as Code-Writing
- More efficient use of Student Time
- Highly Constrain the Solution Space

[Ericson '18, Zhi '19, Weinmann '20]
<!-- .element: class="demph" -->

+++ <!-- .slide: data-auto-animate -->

*So how does any of this apply to writing test suites?*

*Let's follow an expert as they write a test suite...*
<!-- .element: class="fragment fade-in" -->

### An Expert Tests `Giftcard`
<!-- .element: class="fragment fade-in" -->

+++ <!-- .slide: data-auto-animate -->

### An Expert Tests `Giftcard`

``` rb
# test Giftcard
```

<u>Student Roadblocks</u>
<!-- .element: class="fragment fade-in demph"-->

+++ <!-- .slide: data-auto-animate -->

### An Expert Tests `Giftcard`

``` rb
describe 'Giftcard' do
    it 'changes the balance' do
        # test logic
    end
end
```

-  RSpec Syntax
<!-- .element: class="demph"-->
-  Arrange-Act-Assert Pattern  <!-- invisible!! here for spacing reasons -->
<!-- .element: class="demph invis" -->

+++ <!-- .slide: data-auto-animate -->

### An Expert Tests `Giftcard`

``` rb [|3|4|5|]
describe 'Giftcard' do
    it 'changes the balance' do
        @gift_card = Giftcard.new(20)
        @result = @gift_card.withdraw(15)
        expect(@gift_card.balance).to eq(5)
    end
end
```

-  RSpec Syntax
<!-- .element: class="demph"-->
-  Arrange-Act-Assert Pattern
<!-- .element: class="demph" -->

+++ <!-- .slide: data-auto-animate -->

### An Expert Tests `Giftcard`

``` rb [|3,9,14|]
describe 'Giftcard' do
    it 'changes the balance' do
        @gift_card = Giftcard.new(20)
        @result = @gift_card.withdraw(15)
        expect(@gift_card.balance).to eq(5)
    end

    it 'successfully inits a positive balance' do
        @gift_card = Giftcard.new(20)
        expect(@gift_card.balance).to eq(20)
    end

    it 'does not result in error messages' do
        @gift_card = Giftcard.new(20)
        @result = @gift_card.withdraw(15)
        expect(@gift_card.error).to be_empty
    end
end
```

-  RSpec Syntax
<!-- .element: class="demph"-->
-  Arrange-Act-Assert Pattern
<!-- .element: class="demph" -->
-  File-length Solution
<!-- .element: class="demph" -->

+++ <!-- .slide: data-auto-animate -->

### An Expert Tests `Giftcard`

``` rb [|2-4|]
describe 'Giftcard' do
    before(:each) do
        @gift_card = Giftcard.new(20)
    end

    it 'changes the balance' do
        @result = @gift_card.withdraw(15)
        expect(@gift_card.balance).to eq(5)
    end

    it 'successfully inits a positive balance' do
        expect(@gift_card.balance).to eq(20)
    end

    it 'does not result in error messages' do
        @result = @gift_card.withdraw(15)
        expect(@gift_card.error).to be_empty
    end
end
```

-  RSpec Syntax
<!-- .element: class="demph"-->
-  Arrange-Act-Assert Pattern
<!-- .element: class="demph" -->
-  File-length Solution
<!-- .element: class="demph" -->
-  Remove Repetition
<!-- .element: class="demph" -->


+++ <!-- .slide: data-auto-animate -->

### Student Difficulties with Test Writing

<u>Student Roadblocks</u>

-  RSpec Syntax
<!-- .element: class="demph"-->
-  Arrange-Act-Assert Pattern
<!-- .element: class="demph" -->
-  File-length Solution
<!-- .element: class="demph" -->
-  Remove Repetition
<!-- .element: class="demph" -->

*Imparting style? Scaffolding syntax? Unwieldy solutions?*
<!-- .element: class="fragment fade-in demph" -->

> Faded Parsons Problems!
<!-- .element: class="fragment fade-in good" -->

+++ <!-- .slide: data-auto-animate -->
## Motivation

*So we started writing new content...*

> Writing Faded Parsons Problems <br> is hard everywhere.
<!-- .element: class="fragment fade-in bad" -->

*And if you want to know how we fixed this with programming language design concepts, <br> come chat after!*
<!-- .element: class="fragment fade-in " -->
Note: bring scaffolding, grading, habits

---

### Part One
<hr>

## Assessing Test-Writing

--- <!-- .slide: data-auto-animate -->

### Test Writing

#### Needs Scaffolding

> Faded Parsons Problems++
<!-- .element: class="fragment fade-in good" -->

Note: solution space, scaffolding, style!

+++ <!-- .slide: data-auto-animate -->

#### Single-Tray Problems with Context

<img src="img/giftcard-sequence/0.png">

+++ <!-- .slide: data-auto-animate -->

#### Multi-Part Faded Parsons

<div class="r-stack">
    <img src="img/giftcard-sequence/0.png" class="fragment fade-out" data-fragment-index="2">
    <img src="img/giftcard-sequence/1.png" class="fragment fade-in taper-fade" data-fragment-index="2">
</div>

+++ <!-- .slide: data-auto-animate -->

#### Multi-Part Faded Parsons

<div class="col-container">
    <div class="col">
        <img src="img/giftcard-sequence/0.png">
        <h4>. . . Solved!</h4>
    </div>
    <div class="col">
        <img src="img/giftcard-sequence/1.png">
    </div>
</div>

+++ <!-- .slide: data-auto-animate -->

#### Multi-Part Faded Parsons


<div class="col-container">
    <div class="col">
        <img src="img/giftcard-sequence/1.png">
        <h4>. . . Solved!</h4>
    </div>
    <div class="col">
        <img src="img/giftcard-sequence/2.png">
    </div>
</div>

+++ <!-- .slide: data-auto-animate -->

#### Multi-Part Faded Parsons

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

+++ <!-- .slide: data-auto-animate -->

#### Multi-Part Faded Parsons

![a final question to DRY out code](img/giftcard-sequence/dry-cropped.png)
<!-- .element: class="taper-fade" -->

--- <!-- .slide: data-auto-animate -->
### Test Writing

#### Needs Scaffolding

> Faded Parsons Problems++

#### Needs Grading

> Mutation-Based Autograders
<!-- .element: class="fragment fade-in good" -->

+++ <!-- .slide: data-auto-animate -->

### Assessing Test Suites

#### Problem Components:
<!-- .element: class="fragment fade-in" -->
- A System Under Test that we provide
<!-- .element: class="fragment fade-in" -->
- A Test Suite that
<!-- .element: class="fragment fade-in" -->
*we want to grade*

> Spec-Based Autograding fails <br>
> in practice and in theory.
<!-- .element: class="fragment fade-in" -->

Note: arbitrary SUT dependencies! arbitrary test deps!

+++ <!-- .slide: data-auto-animate -->

### Assessing Test Suites
- A System Under Test that we provide
- A Test Suite that *we want to grade*
- A Set of Mutants we create
<!-- .element: class="fragment fade-in" data-fragment-index="2" -->

Borrow Mutant Generation from Industry QA

Make a *Mutation-Based Autograder* that <br>
grades a test suite on caught mutations
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->

+++ <!-- .slide: data-auto-animate -->

### Mutation-Based Autograders

<div class="col-container">
    <div class="col" style="flex: 1 1 0">
        <h4><u>Instructor Writes</u></h4>
        <p class="col">Reference Solution</p>
        <p class="col">System Under Test</p>
        <p class="col">Mutations</p>
    </div>
    <div class="col" style="flex: 1 1 0">
        <h4><u>Student Writes</u></h4>
        <p class="col">&nbsp</p>
        <p class="col">&nbsp</p>
        <p class="col">&nbsp</p>
        <p class="col fragment fade-in">Student Solution</p>
    </div>
    <div class="col" style="flex: 2 1 0">
        <h4><u>Grader Generates on Submit</u></h4>
        <div class="col-container">
            <div class="col">
                <p class="col">&nbsp</p>
                <p class="col fragment fade-in">$\bigg \}$ Mutants</p>
            </div>
            <div class="col">
                <p class="col fragment fade-in" style="text-align: left;">$\bigg \}~~$ Reference Output</p>
                <hr style="color:#00000000"></hr>
                <p class="col fragment fade-in" style="text-align: left;">$\bigg \}~~~~$ Student Output</p>
                <hr class="col fragment fade-in">
                <p class="col fragment fade-in"><b>Score</b></p>
            </div>
        </div>
    </div>
</div>

Note: - Only one mutation set for all parts.
- This scheme does not require FPPs
--- <!-- .slide: data-auto-animate -->

### Future Work

- Continue to improve the Authoring UX
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->
  - Streamline Multi-Part Problems
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->
  - Automate Mutant Generation
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->
- Automate Fading in Conversion
<!-- .element: class="fragment fade-in" -->
- Use Parsons more in the Upper Division
<!-- .element: class="fragment fade-in" -->

--- <!-- .slide: data-auto-animate -->

### Conclusion

> **FPPgen** streamlines Authoring, <br>
> supports new kinds of scaffolding.

> A **Mutation-Based Autograder** <br>
> to assess Test Quality.
<!-- .element: class="good" -->

*No matter the problem skill level or complexity, <br> our tools can help.*
