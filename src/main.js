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

import deckCatalog from "./decks.json";

const deckId = new URLSearchParams(window.location.search).get("deck");
const selectedDeck =
  deckId && Object.hasOwn(deckCatalog, deckId)
    ? deckCatalog[deckId]
    : undefined;

if (selectedDeck) {
  initializePresentation(selectedDeck);
} else {
  showDeckSelector(deckId);
}

function initializePresentation(deckConfig) {
  const presentation = document.querySelector("#presentation");
  const markdownDeck = document.querySelector("#markdown-deck");

  document.title = `${deckConfig.title} · Reveal.js`;
  markdownDeck.dataset.markdown = deckConfig.markdown;
  presentation.hidden = false;

  const deck = new Reveal({
    hash: true,
    history: true,
    slideNumber: "c/t",
    transition: "slide",
    plugins: [Highlight, Markdown, RevealMath.KaTeX, Notes, Search, Zoom],
  });

  deck.initialize();
}

function showDeckSelector(unknownDeckId) {
  const selector = document.querySelector("#deck-selector");
  const message = document.querySelector("#deck-selector-message");
  const deckList = document.querySelector("#deck-list");

  if (unknownDeckId) {
    message.textContent = `No deck named “${unknownDeckId}” was found. Choose an available presentation.`;
  }

  for (const [id, deckConfig] of Object.entries(deckCatalog)) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const title = document.createElement("strong");
    const description = document.createElement("span");
    const url = new URL(window.location.pathname, window.location.origin);

    url.searchParams.set("deck", id);
    link.href = url;
    link.className = "deck-card";
    title.textContent = deckConfig.title;
    description.textContent = deckConfig.description;
    link.append(title, description);
    item.append(link);
    deckList.append(item);
  }

  selector.hidden = false;
}
