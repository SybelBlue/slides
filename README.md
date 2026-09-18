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
make new-deck ID=workshop TITLE="Workshop" DESCRIPTION="Hands-on exercises"
```

The command creates `public/decks/<id>/slides.md` and adds its metadata to [`src/decks.json`](src/decks.json). It refuses invalid identifiers, duplicate catalog entries, and existing Markdown files. The generated catalog entry uses `source`, which can point to either a Markdown or HTML file.

For example, a `workshop` entry would be available at `?deck=workshop`. If the URL has no `deck` parameter—or the key is not recognized—the selection list is shown.

## Write slides

Edit a deck's `slides.md` file under [`public/decks`](public/decks):

- Put `---` on its own line between horizontal slides.
- Put `+++` on its own line between vertical slides. Use vertical stacks to group sections so left/right navigation moves between topics.
- Add slide attributes beside a separator, for example `--- <!-- .slide: data-auto-animate -->`.
- Add element attributes on the next line, for example `<!-- .element: class="fragment fade-in" -->`.
- Start speaker notes with `Note:`. Press <kbd>S</kbd> during the presentation to open speaker view.
- Press <kbd>?</kbd> in the presentation for all Reveal.js shortcuts.

Keep images and other deck-specific files beside `slides.md`. Reference them from
Markdown with their path under `public`; for example, a diagram stored at
`public/decks/workshop/diagram.png` is `![Diagram](decks/workshop/diagram.png)`.
This relative URL works both locally and under the repository's GitHub Pages URL.

To write a deck in HTML instead, set its catalog `source` to an `.html` file.
The file may be an HTML fragment containing top-level `<section>` elements, or a
complete document containing a `.slides` element. Top-level sections are
horizontal slides, and nested sections form a vertical stack:

```html
<section>
  <h1>First slide</h1>
</section>
<section>
  <section><h2>Vertical slide one</h2></section>
  <section><h2>Vertical slide two</h2></section>
</section>
```

Presentation behavior is configured in [`src/main.ts`](src/main.ts), and visual overrides live in [`src/styles.scss`](src/styles.scss). Vite transpiles the TypeScript entry point and compiles Sass automatically. The template uses the Sky theme; change the `reveal.js/theme/sky.css` import to select another bundled theme.

The enabled Reveal.js plugins provide Markdown, syntax highlighting, KaTeX math, speaker notes, slide search, and zoom. Useful presenter shortcuts include:

- <kbd>Space</kbd> or the arrow keys to navigate
- <kbd>O</kbd> for the overview
- <kbd>S</kbd> for speaker view
- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> to search
- <kbd>Alt</kbd>/<kbd>Option</kbd>+click to zoom

For a PDF-friendly view, add `&print-pdf` to a deck URL, such as `?deck=template&print-pdf`, and print from a Chromium-based browser.

## Production build

```sh
make build
make preview
```

The generated static site is written to `dist/`.

Pushes to `main` build and deploy the site to
<https://sybelblue.github.io/slides/> with GitHub Actions.
