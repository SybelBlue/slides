<!-- .slide: data-auto-animate -->
## introductions

+++ <!-- .slide: data-auto-animate -->
## introductions

*who am I?*

**Serena Caraco**
<!-- .element: class="fragment fade-in" -->

- 3rd Year PhD Student in the ACE Lab
<!-- .element: class="fragment fade-in" -->
- Research in CS Education and Dev
<!-- .element: class="fragment fade-in" -->
- Background in Accessibility and PL
<!-- .element: class="fragment fade-in" -->

+++ <!-- .slide: data-auto-animate -->

## introductions

*who am I?*

- My passion is teaching
<!-- .element: class="fragment fade-in" -->
- HCI is an essential
<!-- .element: class="fragment fade-in" -->
*standalone* discipline

+++ <!-- .slide: data-auto-animate -->

## introductions

*you and hci?*

--- <!-- .slide: data-auto-animate -->

## topics
*In the spirit of multi-disciplinarity...*

### of making meaning
<!-- .element: class="fragment fade-in" -->

+++ <!-- .slide: data-auto-animate -->

## topics
*In the spirit of multi-disciplinarity...*

### science as an art
### of making meaning
<!-- .element: class="demph" -->

+++ <!-- .slide: data-auto-animate -->

## topics
*In the spirit of multi-disciplinarity...*

### science is an art
### of making meaning

+++ <!-- .slide: data-auto-animate -->

## outline

### of making meaning
#### interlude: "engineer brain"
<!-- .element: class="fragment small fade-in" -->
### science is an art
#### interlude: enjoying college
<!-- .element: class="fragment small fade-in" -->
### dramatic conclusion
<!-- .element: class="fragment small fade-in" -->

--- <!-- .slide: data-auto-animate -->

## of making meaning

### representations
### abstractions
### *sneaky surprise topic*

[Rawn, '23 - *What Computers Do, Doing With Computers*]
<!-- .element: style="font-size: 20pt;" -->

+++ <!-- .slide: data-auto-animate -->

### representations

> A Formalization of a Format for <br> some Knowledge or Behavior
<!-- .element: class="fragment good fade-in" -->

*there is a **space** of representations for everything*
<!-- .element: class="fragment good fade-in" -->

+++ <!-- .slide: data-auto-animate -->

### representations
*ex: color*


<div class="col-container">
  <div class="col centered">
    <div class="swatch fragment"></div>
  </div>
  <div class="col row-container">
    <div class="row centered">
      <div class="fragment">cornflower blue</div>
    </div>
    <div class="row centered">
      <code class="fragment">rgb(<span class="fragment highlight-current-red">100</span>,<span class="fragment highlight-current-green">149</span>,<span class="fragment highlight-current-blue">237</span>)</code>
    </div>
  </div>
</div>

<span class="fragment"></span>

*So... what's the best representation for color?*
<!-- .element: class="fragment fade-in" -->

+++ <!-- .slide: data-auto-animate -->

### representations
*So... what's the best representation for color?*

</style>
<table class="tg"><thead>
  <tr>
    <th class="">rep</th>
    <th class="">swatches</th>
    <th class="">names</th>
    <th class="">rgb values<br></th>
  </tr></thead>
<tbody>
  <tr>
    <td class="">pros</td>
    <td class="">self-evident*</td>
    <td class="">specific</td>
    <td class="">computable</td>
  </tr>
  <tr>
    <td class="">cons</td>
    <td class="">impractical<br><br>hard to recreate</td>
    <td class="">unintuitive<br><br>hard to customize</td>
    <td class="">unintuitive<br><br>hard to recreate</td>
  </tr>
</tbody>
</table>

+++ <!-- .slide: data-auto-animate -->

### representations
*So... what's the best representation for color?*
> context matters.
<!-- .element: class="fragment fade-in" -->
**particularly when you're choosing an abstraction**
<!-- .element: class="fragment good fade-in" -->

--- <!-- .slide: data-auto-animate -->

### abstractions

> The Representation of Choice <br> in some Context
<!-- .element: class="fragment good fade-in" -->

choosing an abstraction introduces a new hazard:
<!-- .element: class="fragment good fade-in" -->
*abstraction blindness*
<!-- .element: class="fragment good fade-in" -->

+++ <!-- .slide: data-auto-animate -->

### abstractions
*ex: text editing in Docs*


<div class="col-container">
  <div class="col fragment">
    <h4 class="">dictation</h4>
    <p class="">just speak what <br> you want written down</p>
  </div>
  <div class="col fragment">
    <h4 class="">action grammar</h4>
    pick from a list of actions:
    <ul class="">
      <li>jump to [position]</li>
      <li>type a word</li>
      <li>put newline</li>
      <li>make bold</li>
      <li>...</li>
    </ul>
  </div>
</div>

pros and cons to every representation...
<!-- .element: class="fragment" -->

+++ <!-- .slide: data-auto-animate -->

### abstractions
*intent: make a guest list from email*


> Artemon Báthory arteboy@sfsu.edu, Kin Gwon king_won@gmail.com, Jess Atreides lisanmama@bg.net, ...
<!-- .element: class="bad demph" style="width: 100%"-->


*into*
<!-- .element: class="fragment" -->

> Artemon Báthory <br>
> Kin Gwon <br>
> Jess Atreides ...
<!-- .element: class="fragment good fade-in" -->

+++ <!-- .slide: data-auto-animate -->

### abstractions

*intent: make a guest list from email*

<div class="col-container">
  <div class="col">
    <h4 class="highlight-current-green">action grammar</h4>
    <ul class="">
      <li>jump to [position]</li>
      <li>delete word</li>
      <li>put newline</li>
    </ul>
  </div>
  <div class="col fragment">
    Docs sees these actions:
    <ol style="font-size: 20pt !important;">
      <li>jump forward two words</li>
      <li>delete word</li>
      <li>put newline</li>
      <li>jump forward two words</li>
      <li>delete word</li>
      <li>put newline</li>
      <li>jump forward two words</li>
      <li>...</li>
    </ol>
  </div>
</div>

+++ <!-- .slide: data-auto-animate -->

### abstractions

Not only is Docs blind to the intent,
<!-- .element: class="fragment" -->

It's also *unaware of its blindness at all.*
<!-- .element: class="fragment" -->

> blindness is <br> the power & the peril of abstraction
<!-- .element: class="fragment fade-in" -->

+++ <!-- .slide: data-auto-animate -->

### abstractions

*recall that abstractions are situated in context*

abstraction blindness gets worse if <br>
your context is poorly-constructed.

Note: assumptions about the user, system

+++ <!-- .slide: data-auto-animate -->

*so how do we use abstractions responsibly?*

- Explore Representations
- Track your Blindness
- Update the Context

**each of these are ongoing processes**

if you want to go beyond the basics here: <br>
philosophy, anthropology, sociology, <br>
**HCI**

--- <!-- .slide: data-auto-animate -->

### disciplines

disciplines are abstractions whose <br>
representations all begin with:

> "everything worth studying is..."

*so what's your discipline's blindness...*

+++ <!-- .slide: data-auto-animate -->

### disciplines

multi-disciplinarity is necessary for a
deep understanding of the world

--- <!-- .slide: data-auto-animate -->

### Interlude: Engineer Brain

> "All Problems Reduce to <br> Orthogonal Components"
<!-- .element: class="fragment good" -->

Note: The correct, implicit default problem-solving strategy

--- <!-- .slide: data-auto-animate -->



--- <!-- .slide: data-auto-animate -->

### science is (also) an art
- What is Art
  - CJ's def of Art
    - the utility of art
  - good art has gestalt synthesis
- Practice, Practice, Practice
  - Practice fundamentals & challenges
  - Practice with passion projects
  - Practice in Community
- (Find Your) Community
  - Friends, Family, Enemies
  - Peers, Experts, Pupils
- Analysis and Synthesis
  - Style, Structure, Composition
  - CJ & Ira
  - Computing "Wizards"

### Interlude: Enjoying College
- Practice, Practice, Practice
  - Go to events, talk to people, try new things
- Find Your Community
  - _Go to Office Hours_
- Analysis and Synthesis
  - Don't Forget to Have Fun
- *You Gotta Be Yourself.

### science is an art of making meaning
- a good thinker tracks blindness
- blindness can be tremendously powerful
- the magic lives in the blindness of abstraction
- *always be willing to switch abstractions*

### Final Takeaways
- Mind Your Abstractions
  - Take care they don't blind you.
- Context is Key
  - When in doubt, *Talk to humans*!
- This is an Artform
  - Enjoy the process.
