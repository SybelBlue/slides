## Fading Strategies <br> for Parsons Problems <br> in Intermediate Classrooms

*what's the problem with parsons problems?*

+++

An Example Faded Parsons Problem

```py
def is_even(n: int):
  if n == 0:
    return True
  return not is_even(n - 1)
```

+++

An Example Faded Parsons Problem

![fpp gif](img/is-even-no-loop.gif)

*"fades" are blanks*

+++

Faded Parsons Problems are good, but there's potential for "bad fading"

Bad fading can make FPPs difficult or illegible

*so now we need a good “fading strategy”*

+++

Strategy-imposed difficulty is not fully understood
- Studied in introductory courses
- Tested largely in C-like languages
- Hints at semantic vs syntactic tactics

+++

In short, our problems:
- how do we make strategies for "good fading"
- previous strategies are language-bound
- no clear indication of sem./syn. tactic difficulty

+++

We create a conceptual guide for creating language-agnostic fading strategies.
- Based on amalgam of previous work and our own experiences
- 5 guidelines based on “Legible, Reliable, Predictable”

*and we put it to use...*

+++

We generate three strategies using <br> a spectrum of "context-aware" tactics.

We find a fine distinction between the strategies <br>
"obfuscation," not difficulty/efficacy.

*advice: after following the guide, <br> "good fading" is about consistency*

*added bonus: this gives us easy autogen*

---

## Related work
*where did we start from?*

+++

Landmark study: Fromont

The good news:
- formalizes "strategy", "candidate", "selection"
- set a methodology for subj./obj. difficulty
- introduce an important semantic strategy (cond)

<br>

The bad news:

Fromont's strategies <br> yield 0 candidates on our problems

---

## A Guide for Strategy Creation

+++

Three basic principles for good strategies:
- legible: make fades easier to reason about
- reliable: make breaking the AG harder
- predictable: elicit familiar solutions and errors

+++ <!-- .slide: data-auto-animate -->

This yields five guidelines:

![guidelines](./img/guidelines.png)

please read the paper for a detailed discussion, <br>
or we can cover them in questions, if desired!

---

## New Fading Strategies

*language-agnostic, context-aware*

+++

*idea: bookend the fade with visual cues*

![mismatched delimiters](img/misdelim.png)

+++

*idea: make "important things" likely candidates*

![pace](img/pace.png)

"Prompt-Aware...": importance is frequency

"Control Expressions": importance is control-flow

+++

![darts](img/darts.png)

---

## Study Results
*how did our strategies stack up?*

+++

We mirrored the methodology in Fromont:
- we augmented with TLX and UI log data
- they had a x10 n, so stronger results

+++

Moral 1: Roughly equivalent in difficulty and efficacy
- Scores, time, attempts strong equiv at first sitting
- Subjective ratings equiv or non-stat sig
- Long-term retention weakly equiv after two weeks (62% resp.)

+++

Moral 2: Avoid "obfuscation"
- Obfuscation is "interactions/time"
- Time was equivalent, but obfuscation was not!
- Throwing Darts at least as bad as any other on all but one problem

+++

Mismatched Delimiters performs well on all metrics and is very easy to instrument...

*Bonus Moral: make a consistent strategy that meets the guidelines and is simple to implement!*

+++

Limitations:
- Smaller n and attrition for follow-up
- Strats equivalent only in aggregagte?
- Strange trend reversal on problem 1 only

---

## Conclusion

*we advise against random strategies <br> and for simply implemented ones!*

to expand a limited body of work, we contribute:
- a guide for creating fading strategies
- a new set of "context-aware" strategies
- a comparitive study of those strategies
