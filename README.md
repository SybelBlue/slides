# Reveal.js slide template

A small Reveal.js deck catalog, with Markdown and HTML slide sources, served
locally with Vite.

This template replaces the repository's former Reveal.js fork. The previous
default-branch content is preserved on the `legacy-main` branch for reference.

## Watch and develop

```sh
make install
make watch
```

Open the local URL printed by Vite (normally <http://127.0.0.1:5173>). The base URL displays the deck selection page; `?deck=template` opens the starter deck directly. Changes to TypeScript, Sass, catalog data, and deck files reload the browser automatically. Stop the watcher with <kbd>Ctrl</kbd>+<kbd>C</kbd>.

`make dev` remains available as an alias for `make watch`.

The Make targets use pnpm internally. Run `make` to see all available commands.

## Add another deck

Run the interactive generator:

```sh
make new-deck
```

Or provide the values in one command:

```sh
make new-deck ID=workshop TITLE="Workshop" DESCRIPTION="Hands-on exercises" TAGS="Teaching, PrairieLearn"
```

The command creates `public/decks/<id>/slides.md` and adds its metadata to [`src/decks.json`](src/decks.json). It refuses invalid identifiers, duplicate catalog entries, and existing deck directories. Catalog entries use `directory` and point only to the deck's public directory; the loader requires that directory to contain exactly one `slides.md` or `slides.html` file. New entries use the `sky` theme by default. Add tags with the optional comma-separated `TAGS` value or edit the catalog's `tags` array directly. Tags appear as badges on the selection page, and the buttons under the page title filter decks by one tag at a time. Use **All** to reset the filter.

For example, a `workshop` entry would be available at `?deck=workshop`. If the URL has no `deck` parameter—or the key is not recognized—the selection list is shown.

## Write slides

Each deck directory under [`public/decks`](public/decks) must contain exactly one
`slides.md` or `slides.html`. For a Markdown deck, edit its `slides.md` file:

- Put `---` on its own line between horizontal slides.
- Put `+++` on its own line between vertical slides. Use vertical stacks to group sections so left/right navigation moves between topics.
- Add slide attributes beside a separator, for example `--- <!-- .slide: data-auto-animate -->`.
- Add element attributes on the next line, for example `<!-- .element: class="fragment fade-in" -->`.
- Start speaker notes with `Note:`. Press <kbd>S</kbd> during the presentation to open speaker view.
- Press <kbd>?</kbd> in the presentation for all Reveal.js shortcuts.

Keep all images and other public deck dependencies in the same deck directory.
Reference them from Markdown with their path under `public`; for example, a diagram stored at
`public/decks/workshop/diagram.png` is `![Diagram](decks/workshop/diagram.png)`.
This relative URL works both locally and under the repository's GitHub Pages URL.

Open the
[`features` deck](https://sybelblue.github.io/slides/?deck=features) for live
examples and copyable markup covering the shared utility families.

Use `rs-overflow-center` on a wrapper when wide content should remain centered
instead of shrinking to its container. The direct child may overflow equally on
both sides:

```html
<div class="rs-overflow-center">
  <div class="rs-workflow process"><!-- steps --></div>
</div>
```

Use `rs-max-w-50`, `rs-max-w-60`, `rs-max-w-70`, `rs-max-w-80`, or
`rs-max-w-90` to limit an element's width. Add `rs-mx-auto` when the element
should also be centered in its container:

```html
<div class="rs-max-w-80 rs-mx-auto"><!-- content --></div>
```

To write a deck in HTML instead, replace `slides.md` with `slides.html`; the
catalog directory does not change. The file may be an HTML fragment containing
top-level `<section>` elements, or a complete document containing a `.slides`
element. Top-level sections are horizontal slides, and nested sections form a
vertical stack:

```html
<section>
  <h1>First slide</h1>
</section>
<section>
  <section><h2>Vertical slide one</h2></section>
  <section><h2>Vertical slide two</h2></section>
</section>
```

### File trees

Use the shared `rs-filetree` class on an outer `<ul>`. Nest another `<ul>` inside
each directory's `<li>`; directories with children are emphasized automatically.

```html
<ul class="rs-filetree">
  <li>README.md</li>
  <li>
    src/
    <ul>
      <li>main.ts</li>
      <li>styles.scss</li>
    </ul>
  </li>
  <li class="directory">empty-directory/</li>
</ul>
```

Use `class="directory"` for an empty directory. Set `--rs-filetree-font-size`,
`--rs-filetree-font-family`, `--rs-filetree-indent`, or
`--rs-filetree-guide-color` on the list or a containing slide to customize it.

### Timelines

Use `rs-timeline` on an ordered list for a compact horizontal sequence. Add
`complete` to finished milestones and `current` to the active milestone; items
without a state class render as upcoming. A milestone can contain a `small`
label, a `strong` title, and an optional `span` description.

```html
<ol class="rs-timeline">
  <li class="complete">
    <small>September</small>
    <strong>Plan</strong>
  </li>
  <li class="current">
    <small>October</small>
    <strong>Build</strong>
    <span>Active work</span>
  </li>
  <li>
    <small>November</small>
    <strong>Launch</strong>
  </li>
</ol>
```

Set `--rs-timeline-marker-size`, `--rs-timeline-line-size`,
`--rs-timeline-fade-size`, `--rs-timeline-accent`, or
`--rs-timeline-label-color` on the list or a containing slide to customize it.
Add `fade-left`, `fade-right`, or both to the `ol` when the timeline continues
beyond the displayed milestones:

```html
<ol class="rs-timeline fade-left fade-right">
  <!-- milestones -->
</ol>
```

### Carousels

Use `rs-carousel` on the viewport and `rs-carousel-item` on each direct child.
The first item starts centered. Add the `auto-advance` modifier when Reveal.js
fragment navigation should move the `current-fragment` item to the center. Use
at least three items so both side previews can appear:

```html
<div class="rs-carousel auto-advance" aria-label="Space photographs">
  <figure class="rs-carousel-item">
    <img src="decks/example/earth.jpg" alt="Earth above the Moon" />
    <figcaption>Earthrise</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img src="decks/example/saturn.jpg" alt="Saturn and its rings" />
    <figcaption>Saturn</figcaption>
  </figure>
  <figure class="rs-carousel-item fragment">
    <img src="decks/example/mars.jpg" alt="Rocky terrain on Mars" />
    <figcaption>Mars</figcaption>
  </figure>
</div>
```

Without `auto-advance`, the first item stays centered even if child items are
fragments. The modifier follows Reveal navigation; it does not start a timer.

The side previews wrap visually: the last item appears beside the first and the
first appears beside the last. Reveal.js still controls navigation, so advancing
past the final fragment moves to the next slide.

Customize the layout with `--rs-carousel-height`,
`--rs-carousel-item-width`, `--rs-carousel-item-offset`,
`--rs-carousel-side-opacity`, `--rs-carousel-radius`, and
`--rs-carousel-edge-fade` on the carousel or a containing slide.

Presentation behavior is configured in [`src/main.ts`](src/main.ts), and shared visual overrides live in [`src/styles.scss`](src/styles.scss). A deck can add scoped Sass beside its slides and public dependencies in `_styles.scss`; Vite discovers and compiles these files automatically.

Choose a bundled Reveal theme with the catalog entry's `theme` property. Supported values are `beige`, `black`, `black-contrast`, `blood`, `dracula`, `league`, `moon`, `night`, `serif`, `simple`, `sky`, `solarized`, `white`, and `white-contrast`. Decks without a `theme` property use `sky`.

Theme-specific overrides live in `src/theme-extensions/<theme>.scss`. The file name must match the catalog theme exactly. Reveal loads the matching extension after the base theme and shared styles, so its declarations take precedence. For example, `src/theme-extensions/moon.scss` can tune the heading font without affecting other themes.

The enabled Reveal.js plugins provide Markdown, syntax highlighting, KaTeX math, speaker notes, slide search, and zoom. Useful presenter shortcuts include:

- <kbd>Space</kbd> or the arrow keys to navigate
- <kbd>O</kbd> for the overview
- <kbd>S</kbd> for speaker view
- <kbd>L</kbd> to toggle the laser pointer
- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> to search
- <kbd>Alt</kbd>/<kbd>Option</kbd>+click to zoom

On the first slide, move the mouse to the lower-left corner to reveal **Back to decks** and **Print mode**. The controls fade as the mouse moves away and stay hidden while the laser pointer is active. **Print mode** opens Reveal.js's PDF layout; use the browser print dialog to export. You can also add `&print-pdf` to a deck URL, such as `?deck=template&print-pdf`, and print from a Chromium-based browser.

## Production build

```sh
make build
make preview
```

The generated static site is written to `dist/`.

Pushes to `main` build and deploy the site to
<https://sybelblue.github.io/slides/> with GitHub Actions.
Open the deployed site in your system's default browser with `make open`.
