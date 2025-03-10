<!-- .slide: data-auto-animate -->

# Long & Alevem Rewind!
<!-- .element: class="r-fit-text" -->
### *a surreptitious reveal.js demo*

--- <!-- .slide: data-auto-animate -->

# Long & Alevem Rewind!
<!-- .element: class="r-fit-text" -->

*re-run a small scale experiment using*

## Quordle

## Mastermind

*which one is mathematically harder?*
<!-- .element: class="fragment" -->

+++ <!-- .slide: data-auto-animate -->

# bits
<hr>

### In a World of Possibilities
<!-- .element: class="fragment" -->

+++ <!-- .slide: data-auto-animate -->

### In a World of Possibilities


<div class="r-stretch col-container">
<div data-id="left" class="col" style="background-color: white;">
</div>
<div data-id="right" class="col" style="background-color: white;">
</div>
</div>

*we start with an unexplored space*
<!-- .element: class="fragment" -->

+++ <!-- .slide: data-auto-animate -->

### In a World of Possibilities

<div class="r-stretch col-container">
<div data-id="left" class="col" style="background-color: white;">
</div>
<div data-id="right" class="col" style="background-color: black;">
</div>
</div>

*we get enough info to divide it half*

+++ <!-- .slide: data-auto-animate -->

### In a World of Possibilities


<div class="r-stretch col-container">
<div data-id="left" class="col" style="background-color: white;">
</div>
<div data-id="right" class="col" style="background-color: black;">
</div>
</div>

*this division is called a **bit***

+++ <!-- .slide: data-auto-animate -->

### In a World of Possibilities

<div class="r-stretch col-container">
<div data-id="left" class="col" style="background-color: white;">

<div class="fill-parent row-container">
<div data-id="leftr" class="row" style="background-color: white;">
</div>
<div data-id="rightr" class="row" style="background-color: black;">
</div>
</div>

</div>
<div data-id="right" class="col" style="background-color: gray;">
</div>
</div>


*we repeat, getting more bits...*

+++ <!-- .slide: data-auto-animate -->

### In a World of Possibilities

<div class="r-stretch col-container">
<div data-id="left" class="col" style="background-color: white;">

<div class="fill-parent row-container">
<div data-id="leftr" class="row" style="background-color: white;">

<div class="fill-parent col-container">
<div data-id="lefti" class="col" style="background-color: white;">
</div>
<div data-id="righti" class="col" style="background-color: black;">
</div>
</div>

</div>
<div data-id="rightr" class="row" style="background-color: grey;">
</div>
</div>

</div>
<div data-id="right" class="col" style="background-color: gray;">
</div>
</div>

*we repeat, getting more bits...*

+++ <!-- .slide: data-auto-animate  -->

### In a World of Possibilities

<div class="r-stretch col-container">
<div data-id="left" class="col" style="background-color: white;">

<div class="fill-parent row-container">
<div data-id="leftr" class="row" style="background-color: white;">

<div class="fill-parent col-container">
<div data-id="lefti" class="col" style="background-color: grey;">
</div>
<div data-id="righti" class="col" style="background-color: green;">
</div>
</div>

</div>
<div data-id="rightr" class="row" style="background-color: grey;">
</div>
</div>

</div>
<div data-id="right" class="col" style="background-color: gray;">
</div>
</div>

*... till we find our goal!*

+++ <!-- .slide: data-auto-animate  -->

### In a World of Possibilities

*when we ask:*

> how many bits is this guess worth?

*we mean:*

> how many times do we halve the possibility space?
<!-- .element: class="fragment good" -->

+++ <!-- .slide: data-auto-animate  -->

### In a World of Possibilities

<div class="r-stretch col-container">
<div data-id="left" class="col" style="background-color: white; border: 2px solid black">

<div class="fill-parent row-container">
<div data-id="leftr" class="row" style="background-color: white; border: 2px solid black">

<div class="fill-parent col-container">
<div data-id="lefti" class="col" style="background-color: grey; border: 2px solid black">
</div>
<div data-id="righti" class="col" style="background-color: green; border: 2px solid black">
</div>
</div>

</div>
<div data-id="rightr" class="row" style="background-color: grey; border: 2px solid black">
</div>
</div>

</div>
<div data-id="right" class="col" style="background-color: gray; border: 2px solid black">
</div>
</div>

> how many times do we halve the possibility space?
<!-- .element: class="good" -->

+++ <!-- .slide: data-auto-animate  -->

### In a World of Possibilities

<div class="r-stretch col-container">
<div data-id="left" class="col" style="background-color: white; border: 2px solid black">

<div class="fill-parent row-container">
<div data-id="leftr" class="row" style="background-color: white; border: 2px solid black">

<div class="fill-parent col-container">
<div data-id="lefti" class="col" style="background-color: grey; border: 2px solid black">
</div>
<div data-id="righti" class="col" style="background-color: red; border: 2px solid black">
</div>
</div>

</div>
<div data-id="rightr" class="row" style="background-color: grey; border: 2px solid black">
</div>
</div>

</div>
<div data-id="right" class="col" style="background-color: gray; border: 2px solid black">
</div>
</div>

> how many times do we halve the possibility space?
<!-- .element: class="good" -->

+++ <!-- .slide: data-auto-animate  -->

### In a World of Possibilities

*in other words*

> how many bits is this guess worth?

> more bits is a stronger guess!
<!-- .element: class="fragment good" -->

*because lots of bits means lots of halving!*
<!-- .element: class="fragment good" -->

*for more on this checkout [3blue1brown's video](https://www.youtube.com/watch?v=v68zYyaEmEA)*
<!-- .element: class="fragment citation" -->

+++ <!-- .slide: data-auto-animate -->

# bits
<hr>

*tangent concluded*


--- <!-- .slide: data-auto-animate -->

# Long & Alevem Rewind!
<!-- .element: class="r-fit-text" -->

*re-run a small scale experiment using*

## Mastermind

## Quordle

*which one is mathematically harder?*

+++ <!-- .slide: data-auto-animate -->

## Mastermind

Space of Possibilities: 6 colors, 4 slots

$$\begin{aligned}|S| &= 6^4 \\\ &= 1296  \\\ &\approx 2^{10.3}\end{aligned}$$

*just over a 10 bit space!*
<!-- .element: class="fragment" -->

+++ <!-- .slide: data-auto-animate -->

## Mastermind

Space of Possibilities: 6 colors, 4 slots

*just over a 10 bit space!*

you have 8 guesses...

*each guess has to average $\frac{10.3}{8} \approx 1.3$ bits*
<!-- .element: class="fragment" -->

+++ <!-- .slide: data-auto-animate -->


## Quordle

Space of Possibilities: 2309 hand-picked words

$$\begin{aligned}|S| &= 2309 \\\ &\approx 2^{11.2}\end{aligned}$$
*just over a 12 bit space!*

+++ <!-- .slide: data-auto-animate -->

## Mastermind

Space of Possibilities: 6 colors, 4 slots

*just over a 10 bit space!*

you have 9 guesses for **4 words**...

*each guess has to average $\frac{11.2}{6} \approx 1.9$ bits*
<!-- .element: class="fragment" -->

*we're sweeping some overcounting under the rug*
<!-- .element: class="fragment citation" -->


+++

## the code! the code!

``` py [|4-5|6|]
from math import log2

def required_guess_strength(space: int, guesses: int):
    # remember, log2 asks "how many powers of 2?"
    space_bits = log2(space)
    return space_bits / guesses
```


--- <!-- .slide: data-auto-animate -->

# Long & Alevem Rewind!
<!-- .element: class="r-fit-text" -->

*re-run a small scale experiment using*

## Mastermind

## Quordle

*which one is mathematically harder?*

+++ <!-- .slide: data-auto-animate -->

# Long & Alevem Rewind!
<!-- .element: class="r-fit-text" -->

*which one is mathematically harder?*

## Quordle

**by a lot! 1.9 vs 1.3 bits per guess**

*does this surprise you?*
<!-- .element: class="fragment" -->

*btw: it turns out Wordle with 9 guesses is 1.24 bits, <br> so regular Wordle is still way harder*
<!-- .element: class="fragment citation" -->
