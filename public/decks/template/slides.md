<!-- .slide: class="rs-center" data-auto-animate -->

# Presentation title

## Subtitle

<small>Press <kbd>?</kbd> for keyboard shortcuts</small>

Note:
Speaker notes go here. Press <kbd>S</kbd> to open the speaker view.

--- <!-- .slide: data-auto-animate -->

## Subtitle

- Write the deck in one Markdown file

<!-- .element: class="fragment fade-in" -->

- Add fragments with element attributes

<!-- .element: class="fragment fade-in" -->

- Add slide options beside a separator

<!-- .element: class="fragment fade-in" -->

+++ <!-- .slide: data-auto-animate -->

## Subtitle

> Normal

> Good

<!-- .element: class="fragment fade-in rs-good" -->

> Bad

<!-- .element: class="fragment fade-in rs-bad" -->

---

## Code and math

```js [1|3-5]
const slides = document.querySelector(".slides");

for (const slide of slides.children) {
  console.log(slide);
}
```

$$
\texttt{.md} \times \KaTeX = \mathrm{Yay!}
$$

---

## Layout helpers

<div class="rs-col-container">
  <div class="rs-col rs-centered">Left column</div>
  <div class="rs-col rs-centered">Right column</div>
</div>

<p class="rs-citation">Sources and asides can use the citation class.</p>

+++

## Useful annotations

- `.fragment` reveals an element later
- `.rs-good`, `.rs-bad`, and `.rs-alt` style blockquotes
- `.rs-demph` and `.rs-citation` reduce emphasis
- `.rs-wide`, `.rs-centered`, and the row/column helpers control layout

--- <!-- .slide: class="rs-center" data-background-color="#153243" -->

## Ready to present

Edit `public/decks/template/slides.md` and save—the browser updates automatically.
