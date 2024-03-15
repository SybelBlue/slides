## Automatic Generation of <br> Faded Parsons Problems
### (The Journey to Scaffold Test Writing)
#### **Serena Caraco**, Nelson Lojo, <br> *Michael Verdicchio*, Armando Fox

Note: Prof Verdicchio in from Charleston, SC

--- <!-- .slide: data-auto-animate -->

#### A Crash Course in
### Faded Parsons Problems

Goal: reconstruct an expert solution
<!-- .element: class="fragment fade-in" -->

--- <!-- .slide: data-auto-animate -->

#### An Example of Faded Parsons
### Recursion

``` py
def is_even(n: int):
    if n == 0:
        return True
    return not is_even(n - 1)
```
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->

+++ <!-- .slide: data-auto-animate -->

### Recursion
#### **MOABH (Mother of All Bad Habits) Solution**

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

+++ <!-- .slide: data-auto-animate -->

### Recursion

*Imparting style? Scaffolding syntax? Unwieldy solutions?*
<!-- .element: class="demph" -->

> Faded Parsons Problems!
<!-- .element: class="fragment fade-in good" -->

+++ <!-- .slide: data-auto-animate -->

### Faded Parsons Problems

<!-- make this single cycle -->
![a simple FPP](img/is-even-no-loop.gif)

Note: Guiding idea: force expert solution reconstruction.

--- <!-- .slide: data-auto-animate -->

### What's Exciting About Our Work?

*We know Faded Parsons impart good habits*
<!-- .element: class="fragment fade-in" -->

We leverage them to teach Test-Writing
<!-- .element: class="fragment fade-in" -->

- We give them a System Under Test
<!-- .element: class="fragment fade-in" -->
- They write us a Test Suite
<!-- .element: class="fragment fade-in" -->

+++ <!-- .slide: data-auto-animate -->

### What **Challenges** Did We Face?

*We know Faded Parsons impart good habits*

> Writing means syncing data by hand.
<!-- .element: class="fragment bad" -->

> Converting old material is laborious.
<!-- .element: class="fragment bad" -->

We want to impart strong Test-Writing

> No theory of "correctness" or <br> practical, reusable autograder
<!-- .element: class="fragment fade-in bad" -->


+++ <!-- .slide: data-auto-animate -->
### Our Contributions

> **FPPgen** streamlines Authoring, <br>
> supports Arbitrary Complexity.
<!-- .element: class="fragment fade-in" -->

> A **Mutation-Based Autograder** <br>
> to assess Test Quality.
<!-- .element: class="fragment fade-in good" -->

Available online now!
<!-- .element: class="fragment fade-in demph" -->

Note: open source, online

--- <!-- .slide: data-auto-animate -->

### Roadmap

0. Faded Parsons Background
1. Authoring Experience
2. Assessing Test-Writing

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
<!-- .element: class="fragment fade-in" -->
- More efficient than Code-Writing
<!-- .element: class="fragment fade-in" -->
- Highly constrain the Solution Space
<!-- .element: class="fragment fade-in" -->

<!-- <img class="fragment fade-in" src="img/kenobi.gif"> -->
<img class="fragment fade-in" src="img/kenobi.png">

[Ericson '18, Zhi '19, Weinmann '20]
<!-- .element: class="demph" -->

Note: - Ericson FPP efficacy
- Zhi efficiency
- Weinmann ease of use, good habits

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

\* Student Roadblocks *
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
-  DRY Style
<!-- .element: class="demph" -->


+++ <!-- .slide: data-auto-animate -->

### Student Difficulties with Test Writing
Student Roadblocks
<!-- .element: class="demph"-->
-  RSpec Syntax
<!-- .element: class="demph"-->
-  Arrange-Act-Assert Pattern
<!-- .element: class="demph" -->
-  File-length Solution
<!-- .element: class="demph" -->
-  DRY Style
<!-- .element: class="demph" -->

*Imparting style? Scaffolding syntax? Unwieldy solutions?*
<!-- .element: class="fragment fade-in demph" -->

> Faded Parsons Problems!
<!-- .element: class="fragment fade-in good" -->

+++ <!-- .slide: data-auto-animate -->
## Motivation

*So we started writing new content...*

> Authoring Faded Parsons Problems is hard everywhere.
<!-- .element: class="fragment fade-in bad" -->

Note: bring scaffolding, grading, habits

---

### Part One
<hr>

## Authoring Experience

Note: we diverge from previous work here.

+++ <!-- .slide: data-auto-animate -->

### Presenting Faded Parsons

- Serve Faded Parsons Codelines
<!-- .element: class="fragment fade-in" -->
- Grade the Student Submission
<!-- .element: class="fragment fade-in" -->
-
<!-- .element: class="fragment fade-in" -->
*Provide a Reference Solution\**

+++ <!-- .slide: data-auto-animate -->

### Presenting Faded Parsons

<table>
<thead>
  <tr>
    <th></th>
    <th align="center">Parsons Codelines</th>
    <th align="center">Autograder Solution</th>
    <th align="center">Reference Solution</th>
  </tr>
</thead>
<tbody>
  <tr class="fragment fade-in">
    <td>Raw Code</td>
    <td class="table-data" align="center">✅</td>
    <td class="table-data" align="center">✅</td>
    <td class="table-data" align="center">✅</td>
  </tr>
  <tr class="fragment fade-in">
    <td>Formatting</td>
    <td class="table-data" align="center">✅</td>
    <td class="table-data" align="center"></td>
    <td class="table-data" align="center"></td>
  </tr>
  <tr class="fragment fade-in">
    <td>Spec</td>
    <td class="table-data" align="center"></td>
    <td class="table-data" align="center">✅</td>
    <td class="table-data" align="center"></td>
  </tr>
  <tr class="fragment fade-in">
    <td>Commentary</td>
    <td class="table-data" align="center"></td>
    <td class="table-data" align="center"></td>
    <td class="table-data" align="center">✅</td>
  </tr>
</tbody>
</table>

+++ <!-- .slide: data-auto-animate -->

> Manually synchronizing data <br> is like baking with sugar glass.
<!-- .element: class="bad" -->

- long creative loops kill inspiration
<!-- .element: class="fragment fade-in" -->
- constant "paper cuts" loose users
<!-- .element: class="fragment fade-in" -->
- instantly, perpetually brittle
<!-- .element: class="fragment fade-in" -->
- attracts
<!-- .element: class="fragment fade-in" -->
**so many** bugs

Note:- takes so long to melt and dye
- getting sugar burns **suck**
- as soon as it sets, it shatters
- so many bugs

+++ <!-- .slide: data-auto-animate -->

### Faded Parsons with FPPgen

In one file, write your prompt and solution.
<!-- .element: class="fragment fade-in" -->

Add `?blanks?`, mark `#given` lines.
<!-- .element: class="fragment fade-in" -->

*Surround your spec with `## test ##`.*
<!-- .element: class="fragment fade-in" -->

Run FPPgen, and repeat.
<!-- .element: class="fragment fade-in" -->

Note: fully documented online, and more details in paper

+++ <!-- .slide: data-auto-animate -->

### Code-Writing **without** FPPgen

1. Spin-up PrairieLearn
2. Generate Templates
3. Edit info.json
4. Update server.py
5. Write your prompt (HTML)
6. Format your question (XML)
7. Write your solution (BYOL)
8. Write your spec

Note: - no longer blocking on PrairieLearn, but still need it
- human readable output
- prompt embellishment, reference solution presentation.

+++ <!-- .slide: data-auto-animate -->

*Well, what about...*

### Conversion from Code-Writing

+++ <!-- .slide: data-auto-animate -->
### Conversion from Code-Writing

Start with your Code-Writing Solution
<!-- .element: class="fragment fade-in" -->

Add `?blanks?` and mark `#given` lines.
<!-- .element: class="fragment fade-in" -->

Surround your spec with `## test ##`.
<!-- .element: class="fragment fade-in" -->

Run FPPgen, and repeat.
<!-- .element: class="fragment fade-in" -->

---

### Part Two
<hr>

## Assessing Test-Writing

--- <!-- .slide: data-auto-animate -->

### Common Misconception

> While useful for beginners, <br>
> FPPs are an impractical medium
> for teaching software engineering.
<!-- .element: class="bad" -->

I'll do you one better.
<!-- .element: class="fragment fade-in" -->

--- <!-- .slide: data-auto-animate -->

### Test Writing

#### Needs Scaffolding

> Faded Parsons Problems<span class="fragment fade-in">++!</span>
<!-- .element: class="fragment fade-in good" -->

Note: solution space, scaffolding, style!

+++ <!-- .slide: data-auto-animate -->

#### Single-Tray Problems with Context

<img src="img/giftcard-sequence/0.png">

+++ <!-- .slide: data-auto-animate -->

#### Multi-Part Faded Parsons

<div class="col-container">
    <div class="col">
        <img src="img/giftcard-sequence/0.png">
        <h4 class="fragment fade-in">. . . Solved!</h4>
    </div>
    <div class="col">
        <img class="fragment fade-in" src="img/giftcard-sequence/1.png">
    </div>
</div>

+++ <!-- .slide: data-auto-animate -->

#### Multi-Part Faded Parsons


<div class="col-container">
    <div class="col">
        <img class="fragment" src="img/giftcard-sequence/1.png">
        <h4 class="fragment fade-in">. . . Solved!</h4>
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

> Faded Parsons Problems ++
<!-- .element: class="fragment fade-in good" -->

#### Needs Grading
<!-- .element: class="fragment fade-in" -->

> Mutation-Based Autograding
<!-- .element: class="fragment fade-in good" -->

--- <!-- .slide: data-auto-animate -->
<!-- .slide: data-auto-animate -->
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

### Mutation-Based Autograders
#### Sample Feedback

![Overview of Feedback](img/ag-feedback/feedback-overview.png)

+++ <!-- .slide: data-auto-animate -->

### Mutation-Based Autograders
#### Sample Feedback

![Overview of Feedback](img/ag-feedback/correct-feedback.png)

+++ <!-- .slide: data-auto-animate -->

### Mutation-Based Autograders
#### Sample Feedback

![Overview of Feedback](img/ag-feedback/incorrect-feedback.png)

--- <!-- .slide: data-auto-animate -->

*What about authoring these...*

+++

### Future Work

- Continue to improve the Authoring UX
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->
  - Streamline Multi-Part Problems
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->
  - Automate Mutant Generation
<!-- .element: class="fragment fade-in" data-fragment-index="1" -->
- Automate the Fading in Conversion
<!-- .element: class="fragment fade-in" -->
- Use Parsons more in the upper division
<!-- .element: class="fragment fade-in" -->

--- <!-- .slide: data-auto-animate -->

### Conclusion

> **FPPgen** streamlines Authoring,<br>
> supports Arbitrary Complexity.

> A **Mutation-Based Autograder** <br>
> to assess Test Quality.
<!-- .element: class="good" -->

*No matter the problem skill level or complexity, <br> our tools can help.*

--- <!-- .slide: data-auto-animate -->

### Thank You!

*No matter the problem skill level or complexity, <br> our tools can help.*

<div class="r-stack">
<img alt-text="qr code here" style="width: 300px; height: 300px">
<span> definitely a <br> QR code </span>
</div>
