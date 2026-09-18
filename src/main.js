import Reveal from "reveal.js";
import Highlight from "reveal.js/plugin/highlight";
import Markdown from "reveal.js/plugin/markdown";
import RevealMath from "reveal.js/plugin/math";
import Notes from "reveal.js/plugin/notes";
import Search from "reveal.js/plugin/search";
import Zoom from "reveal.js/plugin/zoom";

import "reveal.js/reveal.css";
import "reveal.js/theme/sky.css";
import "reveal.js/plugin/highlight/monokai.css";
import "./styles.css";

const deck = new Reveal({
  hash: true,
  history: true,
  slideNumber: "c/t",
  transition: "slide",
  plugins: [Highlight, Markdown, RevealMath.KaTeX, Notes, Search, Zoom],
});

deck.initialize();
