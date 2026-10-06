# Theme extensions

Add optional overrides for a bundled Reveal theme in `<theme>.scss`. The file
name must match a value from `RevealTheme` in `src/reveal-themes.ts`.

The loader applies styles in this order:

1. Reveal base theme
2. Shared `src/styles.scss`
3. Matching theme extension

For example, `moon.scss` adjusts heading kerning and letter spacing only when a
deck selects `"theme": "moon"`.
