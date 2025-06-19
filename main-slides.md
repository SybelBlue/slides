## Intro

*what's the problem with parsons problems?*

+++

Parsons Problems work, but are prone to brute-forcing.
- Known effective
- Able to autogen

+++

FPPs help, but require a “strategy” for fading.
- No brute-forcing
- potential "bad fading" (difficult or illegible)

+++

Fading strategy difficulty has only been studied in narrow settings.
- Introductory C & Java vs SWE Rails
- Lit. hints at semantic vs syntactic fading, remember this for later

+++

in short, the problems:
- bad fading can cause big problems
- prev fading studies are language-bound
- no adv. level studies of fading

*would be nice to get autogen back along the way, as a treat*

+++

We expand with a conceptual guide for creating language-agnostic fading strategies.
- Based on amalgam of previous work and our own experiences
- 5 rules based on “Legible, Reliable, Predictable”

+++

We use the guide to generate a spectrum of strategies that extend previous work.
- Fromont -> Us
- Semantic/Syntactic Spectrum

+++

In a surprise result, we find the strats are roughly equal, with a catch
- Difficulty & time are even, but interaction freq is not.
- Plot twist: randomness appears slightly unfavorable

*this makes bad fading much more a matter of reliability*

---

## Related work
*where did we start from?*

+++

Landmark study of fading strategy difficulty: Fromont

The good:
- formalizes "strategy", "candidate", "selection"
- set a methodology for subj./obj. difficulty
- 2 syntactic strats (var, op), one kinda semantic (cond)

+++

Landmark study of fading strategy difficulty: Fromont

The bad:
- language-locked (strats mostly yield 0 candidates)
- wildly unpredictable (one strats yield way too many)

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

cognitive overhead of manipulating CFG

+++ <!-- .slide: data-auto-animate -->

This yields five guidelines:

![guidelines](./img/guidelines.png)

ws seperated fades are redundant

+++ <!-- .slide: data-auto-animate -->

This yields five guidelines:

![guidelines](./img/guidelines.png)

scoping symbols are usually wrangled by IDEs, and missing ones can cause AG context to leak or just really bad error messages

+++ <!-- .slide: data-auto-animate -->

This yields five guidelines:

![guidelines](./img/guidelines.png)

don't tamper with var defs, good for AGs, trivial for students


+++ <!-- .slide: data-auto-animate -->

This yields five guidelines:

![guidelines](./img/guidelines.png)

incomplete fades may be hard to catch and cause strange bugs, if parsing succeeds at all

+++

this is derived from Fromont, adhered to by others, and used for the rest of our work

---

## New Fading Strategies

*language-agnostic, context-aware*

+++

![mismatched delimiters](img/misdelim.png)

+++

![pace](img/pace.png)

+++

![darts](img/darts.png)

<!-- 22 mins to get here, first run -->

---

## Study Results
*how did our strategies stack up?*

+++

we mirrored the methodology in Fromont:
- we augmented with TLX and UI log data
- they had a x10 n, so stronger results

+++

Rough Equivalence of Difficulty & Efficacy
- Scores, time, attempts strong equiv at first sitting
- Subjective ratings equiv or non-stat sig
- Long-term retention weakly equiv after two weeks (62% resp.)

+++

Small moral: avoid "obfuscation"
- kind of like "interaction density/freq"
- remember, time is equivalent, but freq is not!
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

*we advise against random strategies and for simply implemented ones!*

to expand a limited body of work, we contribute:
- a guide for creating fading strategies
- a new set of "context-aware" strategies
- a comparitive study of those strategies
