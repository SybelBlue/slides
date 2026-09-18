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
  source: string;
}

const decks: Record<string, DeckConfig> = deckCatalog;
const deckId = new URLSearchParams(window.location.search).get("deck");
const selectedDeck =
  deckId && Object.hasOwn(decks, deckId) ? decks[deckId] : undefined;

if (selectedDeck) {
  void initializePresentation(selectedDeck);
} else {
  showDeckSelector(deckId);
}

async function initializePresentation(deckConfig: DeckConfig): Promise<void> {
  const presentation = requireElement<HTMLElement>("#presentation");
  const slides = requireElement<HTMLElement>(".slides", presentation);
  const sourceUrl = `${import.meta.env.BASE_URL}${deckConfig.source.replace(
    /^\/+/,
    "",
  )}`;

  document.title = `${deckConfig.title} · Reveal.js`;

  if (getSourceType(deckConfig.source) === "markdown") {
    const markdownDeck = document.createElement("section");

    markdownDeck.dataset.markdown = sourceUrl;
    markdownDeck.dataset.separator = "^---";
    markdownDeck.dataset.separatorVertical = "^\\+\\+\\+";
    markdownDeck.dataset.separatorNotes = "^Note:";
    markdownDeck.dataset.charset = "utf-8";
    slides.append(markdownDeck);
  } else {
    const response = await fetch(sourceUrl);

    if (!response.ok) {
      throw new Error(
        `Unable to load deck source ${sourceUrl}: ${response.status} ${response.statusText}`,
      );
    }

    const sourceDocument = new DOMParser().parseFromString(
      await response.text(),
      "text/html",
    );
    const sourceSlides = sourceDocument.querySelector<HTMLElement>(
      ".reveal .slides, .slides",
    );

    slides.innerHTML = sourceSlides?.innerHTML ?? sourceDocument.body.innerHTML;

    if (!slides.querySelector(":scope > section")) {
      throw new Error(
        `HTML deck source ${sourceUrl} must contain at least one section element.`,
      );
    }
  }

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

function getSourceType(source: string): "html" | "markdown" {
  const pathname = new URL(
    source,
    window.location.origin,
  ).pathname.toLowerCase();

  if (pathname.endsWith(".md") || pathname.endsWith(".markdown")) {
    return "markdown";
  }

  if (pathname.endsWith(".html") || pathname.endsWith(".htm")) {
    return "html";
  }

  throw new Error(
    `Unsupported deck source “${source}”. Use a Markdown or HTML file.`,
  );
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
