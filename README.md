these slides run on hakimel's wonderful reveal.js.

to get started, clone this repo and run `npm install`.

if successful, from then on, this command will start up the presentation:
```sh
$ npm start
...
[XX:XX:XX] Server started on http://localhost:8000
[XX:XX:XX] LiveReload started on port 35729
```
the presentation is now viewable at localhost:8000.
*(Note, if either the server or LiveReload port is in use, there are options to configure it in the docs.)*

to get a pdf add `?print-pdf` to the url (only works on certain browsers)

to view a different slide deck, change branches!

### for presenters:
useful key commands:
- <kbd>Space</kbd>: next slide
- <kbd>p</kbd>: previous slide
- <kbd>Arrows</kbd>: navigate slides
- <kbd>f</kbd>: toggle fullscreen
- <kbd>o</kbd>: toggle overview mode
- <kbd>s</kbd>: open speaker view (what gslides calls presentation mode)
- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>f</kbd>: toggle slides search
- <kbd>Alt/Opt</kbd>+<kbd>Left Click</kbd>: toggle zoom

### for slide authors:
I have it set up so you only really have to edit `main-slides.md` by default. If you want to change the themes/plugins, that's all in `index.html`, and the custom classes are in `index.css`.

[the critical documentation is here.](https://revealjs.com/)

content-wise, I try to organize each section/chapter into vertical stacks of slides so I can quickly navigate through the sections with left/right.

as a final note, just like markdown supports KaTeX, so too does reveal!

$$\texttt{.md} \times \KaTeX = \mathrm{Yay!}$$