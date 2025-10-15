<!-- .slide: data-auto-animate -->

# Module 8 Discussion
<!-- .element: class="r-fit-text" -->
### TDD

*thanks to Paul Woo for slide inspiration*
<!-- .element: class="small" -->

--- <!-- .slide: data-auto-animate -->

# Agenda

- berkeley time: 10mins
- lecture: 25mins
- worksheet: 25mins

--- <!-- .slide: data-auto-animate -->

### TDD

*aka writing tests before you code new functionality*

<hr>

an aspect of Agile: <br>
unlike P&D, QA is not a separate team

+++ <!-- .slide: data-auto-animate -->

### TDD

#### Good Tests

*a FIRST principles approach 😛*
- Fast
- Independent
- Repeatable
- Self-Checking
- Timely

Note:
Fast - should not take long to run them or run a subset of them. Ideally should be automatic - everytime you change a file the tests should run

Independent - Every test should be able to run anytime in any order. Whatever conditions the test expects to be true before running, should be explicitly stated within the test.

Repeatable - Should not depend on external factors like time and date / or magic constants that will break the test if ther values change -- Think Y2K problem

Self-checking - The test should self-report whether it failed

Timely - Write test when code is written - In test driven development write test before the code is written

+++ <!-- .slide: data-auto-animate -->

### TDD

*that's nice and all, <br> but how do we actually do it?*

--- <!-- .slide: data-auto-animate -->

### RSpec

*how we actually do it*

+++ <!-- .slide: data-auto-animate -->

### RSpec

#### Quick Review

Define "SUT":

> the "System Under Test": <br> a method, method group, class, module...
<!-- .element: class="fragment wide" -->

+++ <!-- .slide: data-auto-animate -->

### RSpec

#### Quick Review

- a **suite** covers one SUT
- each **test** in a suite covers a specific behavior
- a **unit test** covers a single-method behavior
- generally, every test follows **3A** structure

*regretably, no, this is not the three-act structure*
<!-- .element: class="citation" -->

+++ <!-- .slide: data-auto-animate -->

### RSpec

#### 3A

- Arrange
- Act
- Assert

Note:
Every test has 3 main components - you have seen this in cucumber--

Arrange - set up necessary pre conditions /assumptions  for the test case. Given part in cucumber
Act - do something that stimulates the software - When in cucumber
Assert - check that something did or did not occur as a result - Then step of cucumber

Every non-trivial test more or less looks like this


+++ <!-- .slide: data-auto-animate -->

### RSpec

#### 3A

- Arrange

> set up neccessary pre-conditions
<!-- .element: class="good wide" -->

- Act
- Assert

Note:
Every test has 3 main components - you have seen this in cucumber--

Arrange - set up necessary pre conditions /assumptions  for the test case. Given part in cucumber
Act - do something that stimulates the software - When in cucumber
Assert - check that something did or did not occur as a result - Then step of cucumber

Every non-trivial test more or less looks like this


+++ <!-- .slide: data-auto-animate -->

### RSpec

#### 3A

- Arrange
- Act

> exercise the SUT
<!-- .element: class="wide" -->

- Assert

Note:
Every test has 3 main components - you have seen this in cucumber--

Arrange - set up necessary pre conditions /assumptions  for the test case. Given part in cucumber
Act - do something that stimulates the software - When in cucumber
Assert - check that something did or did not occur as a result - Then step of cucumber

Every non-trivial test more or less looks like this


+++ <!-- .slide: data-auto-animate -->

### RSpec

#### 3A

- Arrange
- Act
- Assert

> verify behavior

Note:
Every test has 3 main components - you have seen this in cucumber--

Arrange - set up necessary pre conditions /assumptions  for the test case. Given part in cucumber
Act - do something that stimulates the software - When in cucumber
Assert - check that something did or did not occur as a result - Then step of cucumber

Every non-trivial test more or less looks like this


<!-- .element: class="bad wide" -->

+++ <!-- .slide: data-auto-animate -->

### RSpec

#### Syntax

- `describe [:sym|'sym']` defines a suite
- `context 'desc'` defines shared state
- `before` defines context-wide pre-conditions
- `it 'desc'` defines a single test


+++ <!-- .slide: data-auto-animate -->

### RSpec

#### Recap

*remember:*

- tests are short, specific, and descriptive
- nothing ever persists between tests...
- ...including `before` behaviors

*self check: so then how does `before` work?*
<!-- .element: class="small" -->

--- <!-- .slide: data-auto-animate -->

### A Difficult Example

```rb [|2-3|4-14|15-17]
class MovieController < ApplicationController
  def review_movie
    search_string = params[:search]
    begin
      matches = Movie.find_in_tmdb search_string
      if matches.empty?
        redirect_to review_movie_path, alert: "No matches!"
      elsif matches.length == 1
        @movie = matches[0]
        render review_movie_path
      else
        @movies = matches
        render select_movie_path
      end
    rescue Movie::ConnectionError => err
      redirect_to review_movie_path, alert: err.message
    end
  end
end
```

+++ <!-- .slide: data-auto-animate -->

### A Difficult Example

<table class="small">
<thead>
  <tr>
    <td>SUT Behavior/Property has...</td>
    <td>Example</td>
    <td>Testing Strategy</td>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Depended-On Components (DOCs)</td>
    <td><code>Movie.search_in_tmdb</code></td>
    <td>isolate dependencies (usually in Arrange)</td>
  </tr>
  <tr>
    <td>side-effects</td>
    <td>setting <code>:alert</code></td>
    <td>ensure relevent state is set in Arrange, <br> always assert side-effect has occurred</td>
  </tr>
  <tr>
    <td>non-determinism/time-dependence</td>
    <td>--</td>
    <td>Arrange for the proper state</td>
  </tr>
</tbody>
</table>

+++ <!-- .slide: data-auto-animate -->

### A Difficult Example

#### Seams

a place where you can change app behavior <br> *without* editting source

your friend in testing, helpful to have a plan for seams before writing code, so TDD helps make friends in testing!

+++ <!-- .slide: data-auto-animate -->

### A Difficult Example

#### Seams

*seam validation through message passing!*


Arranging (Stubs):
```rb
allow(@object).to recieve(:method_name).and_return(value)
# @object.method_name => value
```

Asserting (Double/Mocks):
```rb
expect(@object).to recieve(:method_name).with_params(value)
# if "@object.method_name value" called, success! otherwise fail!
```

+++ <!-- .slide: data-auto-animate -->

### A Difficult Example

*where are our 3As?*

```rb [|3,5||2||7,9-10,12-13,16]
class MovieController < ApplicationController
  def review_movie
    search_string = params[:search]
    begin
      matches = Movie.find_in_tmdb search_string
      if matches.empty?
        redirect_to review_movie_path, alert: "No matches!"
      elsif matches.length == 1
        @movie = matches[0]
        render review_movie_path
      else
        @movies = matches
        render select_movie_path
      end
    rescue Movie::ConnectionError => err
      redirect_to review_movie_path, alert: err.message
    end
  end
end
```

+++ <!-- .slide: data-auto-animate -->

### A Difficult Example

```rb []
describe MoviesController do
  describe 'looking up a movie' do
    it 'redirects to search page if no match' do
      allow(Movie).to recieve(:find_in_tmbd).and_return([])
      post 'review_movie', { search_string: '<no match>' }
      expect(response).to redirect_to(review_movie_path)
      expect(assigns(:alert))
    end
  end
end
```

--- <!-- .slide: data-auto-animate -->

## The Testing Zoo

<hr>

*a whirlwind tour of the vocabulary you will encounter while testing, vaguely zoo-themed*

+++ <!-- .slide: data-auto-animate -->

## The Testing Zoo

*standard specimens*

- unit test: ~lowest level of testing, typically a single method
- integration test: ~middle level of testing, typically multiple methods
- system test: ~highest level, typically end-to-end, in this class we write in cucumber

+++ <!-- .slide: data-auto-animate -->

## The Testing Zoo

*standard specimens*

- smoke test: minimal coverage of critical functions
- stress test: checks perf under high synthetic load
- accessibility test: tests... accessibility
- open/closed-box (aka glass/opaque-box) test: tests that do/don't rely on insider knowledge of implementation details

+++ <!-- .slide: data-auto-animate -->

## The Testing Zoo

*entomologists*

*(read: this section is my zoo-themed way of grouping kinds of "tests" that check if **the test suite itself** is incomplete, usually by aggressive bug-finding)*

+++ <!-- .slide: data-auto-animate -->

## The Testing Zoo

*entomologists*

- coverage: the % of lines of source a test executes
- coverage test: an assertion that your test suite covers at least x%

*poor coverage/failing coverage tests indicate unfinished test suites!*

+++ <!-- .slide: data-auto-animate -->

## The Testing Zoo

*entomologists*

- fuzzing: seeks out bugs by generating pathologically bad inputs using source reflection
``` rb
# a terrible checksum function
def checksum? f
  hash = (1010 << f) - (32 / f)
  if f == 42 or hash == 42
    return true
  end
  false
end
```
*fuzzing picks out the literals; finds 42 as a missing testcase*

Note: fuzzing will
- inspect source
- finds tokens 1010, 32, 42
- adds to basic token set, eg 0, -1, inf, nan
- runs `valid_num? t` for all tokens `t`
- detects that 0 raises an uncaught error

+++ <!-- .slide: data-auto-animate -->

## The Testing Zoo

*entomologists (bug hunters)*

- mutation testing: *validates your test suite* by making a mutation to the source code and checking that a test fails
``` rb
# a terrible checksum function, *by design*
def checksum? f
  hash = (1010 << f) - (32 / f)
  if f == 42 or hash == 42
    return true
  end
  false
end
```

+++ <!-- .slide: data-auto-animate -->

## The Testing Zoo

- mutation testing: *validates your test suite* by making a mutation to the source code and checking that a test fails
``` rb
# a terrible checksum function, *by design*
def checksum? f
  hash = (1010 << f) - (32 / f)
  if f != 42 or hash == 42 # mutation!!
    return true
  end
  false
end
```
*mutation makes a change to source that passes all tests; finds 42 is a missing test case*

+++ <!-- .slide: data-auto-animate -->

## The Testing Zoo

*zookeepers (common utils)*

- doubles: basic term for a stand-in object in a test
- fakes: a double with a working (shortcutted) impl
- mocks: assert that certain func calls were made
- spies: stubs that keep a log of func calls
- stubs: give canned responses to func calls <br> (ie `allow`)

+++ <!-- .slide: data-auto-animate -->

## The Testing Zoo

*zookeepers (common utils)*

- factories: classes/modules that allow for quick creation of full objects*
- `FactoryBot`: a gem for making factories*
- `spec/fixtures`: rails location for reusing common/shared test data
- `SimpleCov`: a framework for automatic coverage instrumentation

*\*useful outside of testing too!*
<!-- .element: class="citation" -->

---

## Worksheet!

![mod 8 worksheet](img/mod-8-worksheet-qr.png)

*or in the drive as Module 8 Worksheet*