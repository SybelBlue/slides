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
import "./styles.scss";

import deckCatalog from "./decks.json";

interface DeckConfig {
  title: string;
  description: string;
  markdown: string;
}

const decks: Record<string, DeckConfig> = deckCatalog;
const deckId = new URLSearchParams(window.location.search).get("deck");
const selectedDeck =
  deckId && Object.hasOwn(decks, deckId)
    ? decks[deckId]
    : undefined;

if (selectedDeck) {
  initializePresentation(selectedDeck);
} else {
  showDeckSelector(deckId);
}

function initializePresentation(deckConfig: DeckConfig): void {
  const presentation = requireElement<HTMLElement>("#presentation");
  const markdownDeck = requireElement<HTMLElement>(
    "[data-markdown]",
    presentation,
  );

  document.title = `${deckConfig.title} · Reveal.js`;
  markdownDeck.dataset.markdown = `${import.meta.env.BASE_URL}${deckConfig.markdown.replace(
    /^\/+/,
    "",
  )}`;
  presentation.hidden = false;

  const deck = new Reveal({
    hash: true,
    history: true,
    slideNumber: "c/t",
    transition: "slide",
    plugins: [Highlight, Markdown, RevealMath.KaTeX, Notes, Search, Zoom],
  });

  void deck.initialize();
}

function showDeckSelector(unknownDeckId: string | null): void {
  const selector = requireElement<HTMLElement>("#deck-selector");
  const message = requireElement<HTMLElement>("#deck-selector-message");
  const deckList = requireElement<HTMLUListElement>("#deck-list");

  if (unknownDeckId) {
    message.textContent = `No deck named “${unknownDeckId}” was found. Choose an available presentation.`;
  }

  for (const [id, deckConfig] of Object.entries(decks)) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const title = document.createElement("strong");
    const description = document.createElement("span");
    const url = new URL(window.location.pathname, window.location.origin);

    url.searchParams.set("deck", id);
    link.href = url.href;
    link.className = "deck-card";
    title.textContent = deckConfig.title;
    description.textContent = deckConfig.description;
    link.append(title, description);
    item.append(link);
    deckList.append(item);
  }

  selector.hidden = false;
}

function requireElement<T extends Element>(
  selector: string,
  parent: ParentNode = document,
): T {
  const element = parent.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Required element not found: ${selector}`);
  }

  return element;
}
