# Reveal.js Markdown slide template

A small, Markdown-first Reveal.js deck served locally with Vite.

## Start the temporary development server

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Vite (normally <http://127.0.0.1:5173>). Changes reload automatically. Stop the server with <kbd>Ctrl</kbd>+<kbd>C</kbd>.

## Write slides

Edit [`public/slides.md`](public/slides.md):

- Put `---` on its own line between horizontal slides.
- Put `+++` on its own line between vertical slides. Use vertical stacks to group sections so left/right navigation moves between topics.
- Add slide attributes beside a separator, for example `--- <!-- .slide: data-auto-animate -->`.
- Add element attributes on the next line, for example `<!-- .element: class="fragment fade-in" -->`.
- Start speaker notes with `Note:`. Press <kbd>S</kbd> during the presentation to open speaker view.
- Press <kbd>?</kbd> in the presentation for all Reveal.js shortcuts.

Add images or other static files to `public/` and reference them from Markdown with an absolute path such as `![Diagram](/diagram.png)`.

Presentation behavior is configured in [`src/main.js`](src/main.js), and visual overrides live in [`src/styles.css`](src/styles.css). The template uses the Sky theme; change the `reveal.js/theme/sky.css` import to select another bundled theme.

The enabled Reveal.js plugins provide Markdown, syntax highlighting, KaTeX math, speaker notes, slide search, and zoom. Useful presenter shortcuts include:

- <kbd>Space</kbd> or the arrow keys to navigate
- <kbd>O</kbd> for the overview
- <kbd>S</kbd> for speaker view
- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> to search
- <kbd>Alt</kbd>/<kbd>Option</kbd>+click to zoom

For a PDF-friendly view, add `?print-pdf` to the presentation URL and print from a Chromium-based browser.

## Production build

```sh
pnpm build
pnpm preview
```

The generated static site is written to `dist/`.
