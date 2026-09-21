import Reveal from "reveal.js";
import Highlight from "reveal.js/plugin/highlight";
import Markdown from "reveal.js/plugin/markdown";
import RevealMath from "reveal.js/plugin/math";
import Notes from "reveal.js/plugin/notes";
import Search from "reveal.js/plugin/search";
import Zoom from "reveal.js/plugin/zoom";
import LaserPointer from "./laser-pointer";

import "reveal.js/reveal.css";
import "reveal.js/theme/sky.css";
import "./highlight-atom-one-dark.css";
import "./styles.scss";

import deckCatalog from "./decks.json";

interface DeckConfig {
  title: string;
  description: string;
  directory: string;
  tags?: string[];
}

interface DeckSource {
  type: "html" | "markdown";
  url: string;
  content: string;
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
  const source = await resolveDeckSource(deckConfig.directory);

  document.title = `${deckConfig.title} · Reveal.js`;

  if (source.type === "markdown") {
    const markdownDeck = document.createElement("section");

    markdownDeck.dataset.markdown = source.url;
    markdownDeck.dataset.separator = "^---";
    markdownDeck.dataset.separatorVertical = "^\\+\\+\\+";
    markdownDeck.dataset.separatorNotes = "^Note:";
    markdownDeck.dataset.charset = "utf-8";
    slides.append(markdownDeck);
  } else {
    const sourceDocument = new DOMParser().parseFromString(
      source.content,
      "text/html",
    );
    const sourceSlides = sourceDocument.querySelector<HTMLElement>(
      ".reveal .slides, .slides",
    );

    slides.innerHTML = sourceSlides?.innerHTML ?? sourceDocument.body.innerHTML;

    if (!slides.querySelector(":scope > section")) {
      throw new Error(
        `HTML deck source ${source.url} must contain at least one section element.`,
      );
    }
  }

  presentation.hidden = false;

  const deck = new Reveal({
    hash: true,
    history: true,
    slideNumber: "c/t",
    transition: "slide",
    plugins: [
      Markdown,
      Highlight,
      RevealMath.KaTeX,
      Notes,
      Search,
      Zoom,
      LaserPointer,
    ],
  });

  await deck.initialize();
  initializeDeckToolbar(deck);
}

function initializeDeckToolbar(deck: InstanceType<typeof Reveal>): void {
  const toolbar = requireElement<HTMLElement>("#deck-toolbar");
  const backButton = requireElement<HTMLButtonElement>(
    "#back-to-decks",
    toolbar,
  );
  const printButton = requireElement<HTMLButtonElement>("#print-mode", toolbar);
  const updateOpacity = fadeDeckToolbar(toolbar);

  backButton.addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("deck");
    url.searchParams.delete("print-pdf");
    url.hash = "";
    window.location.assign(url.href);
  });

  printButton.addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.searchParams.set("print-pdf", "");
    window.location.assign(url.href);
  });

  const updateToolbar = (): void => {
    const { h, v, f } = deck.getIndices();
    toolbar.hidden =
      deck.getConfig().view === "print" ||
      h !== 0 ||
      (v ?? 0) !== 0 ||
      (f ?? 0) > 0;
    updateOpacity();
  };

  deck.on("slidechanged", updateToolbar);
  deck.on("fragmentshown", updateToolbar);
  deck.on("fragmenthidden", updateToolbar);
  updateToolbar();
}

function fadeDeckToolbar(toolbar: HTMLElement): () => void {
  let pointerPosition: { x: number; y: number } | null = null;

  const updateOpacity = (): void => {
    if (!pointerPosition || toolbar.hidden) return;

    const bounds = toolbar.getBoundingClientRect();
    const xDistance = Math.max(
      bounds.left - pointerPosition.x,
      0,
      pointerPosition.x - bounds.right,
    );
    const yDistance = Math.max(
      bounds.top - pointerPosition.y,
      0,
      pointerPosition.y - bounds.bottom,
    );
    const distance = Math.hypot(
      xDistance / window.innerWidth,
      yDistance / window.innerHeight,
    );

    toolbar.style.setProperty(
      "--toolbar-opacity",
      String(Math.max(0, 1 - distance / 0.4)),
    );
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType === "touch") return;
      pointerPosition = { x: event.clientX, y: event.clientY };
      updateOpacity();
    },
    { passive: true },
  );

  document.documentElement.addEventListener("pointerleave", () => {
    pointerPosition = null;
    toolbar.style.setProperty("--toolbar-opacity", "0");
  });

  return updateOpacity;
}

async function resolveDeckSource(directory: string): Promise<DeckSource> {
  const directoryUrl = getDeckDirectoryUrl(directory);
  const candidates = await Promise.all([
    loadDeckSource(directoryUrl, "slides.md", "markdown"),
    loadDeckSource(directoryUrl, "slides.html", "html"),
  ]);
  const sources = candidates.filter(
    (candidate): candidate is DeckSource => candidate !== undefined,
  );

  if (sources.length === 1) {
    return sources[0];
  }

  if (sources.length > 1) {
    throw new Error(
      `Deck directory ${directoryUrl} contains both slides.md and slides.html; keep exactly one.`,
    );
  }

  throw new Error(
    `Deck directory ${directoryUrl} must contain either slides.md or slides.html.`,
  );
}

async function loadDeckSource(
  directoryUrl: string,
  filename: string,
  type: DeckSource["type"],
): Promise<DeckSource | undefined> {
  const url = new URL(filename, directoryUrl).href;
  const response = await fetch(url);

  if (!response.ok) {
    return undefined;
  }

  const content = await response.text();

  if (type === "html" && !containsHtmlSlides(content)) {
    return undefined;
  }

  if (
    type === "markdown" &&
    (/^\s*<!doctype html/i.test(content) || content.trim().length === 0)
  ) {
    return undefined;
  }

  return { type, url, content };
}

function containsHtmlSlides(content: string): boolean {
  const sourceDocument = new DOMParser().parseFromString(content, "text/html");
  const sourceSlides = sourceDocument.querySelector<HTMLElement>(
    ".reveal .slides, .slides",
  );
  const sourceRoot = sourceSlides ?? sourceDocument.body;

  return sourceRoot.querySelector(":scope > section") !== null;
}

function getDeckDirectoryUrl(directory: string): string {
  const normalizedDirectory = directory.trim().replace(/^\/+|\/+$/g, "");

  if (
    !normalizedDirectory ||
    normalizedDirectory.split("/").includes("..") ||
    /[?#]/.test(normalizedDirectory)
  ) {
    throw new Error(`Invalid deck directory “${directory}”.`);
  }

  const baseUrl = new URL(import.meta.env.BASE_URL, window.location.origin);

  return new URL(`${normalizedDirectory}/`, baseUrl).href;
}

function showDeckSelector(unknownDeckId: string | null): void {
  const selector = requireElement<HTMLElement>("#deck-selector");
  const message = requireElement<HTMLElement>("#deck-selector-message");
  const filters = requireElement<HTMLElement>("#deck-filters");
  const deckList = requireElement<HTMLUListElement>("#deck-list");
  const deckItems: { item: HTMLLIElement; tags: string[] }[] = [];
  const filterButtons = new Map<string | null, HTMLButtonElement>();

  if (unknownDeckId) {
    message.textContent = `No deck named “${unknownDeckId}” was found. Choose an available presentation.`;
  }

  for (const [id, deckConfig] of Object.entries(decks)) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const title = document.createElement("strong");
    const description = document.createElement("span");
    const tags = document.createElement("ul");
    const url = new URL(window.location.pathname, window.location.origin);

    url.searchParams.set("deck", id);
    link.href = url.href;
    link.className = "deck-card";
    title.textContent = deckConfig.title;
    description.className = "deck-card__description";
    description.textContent = deckConfig.description;
    tags.className = "deck-card__tags";
    tags.setAttribute("aria-label", "Tags");

    for (const tag of deckConfig.tags ?? []) {
      const badge = document.createElement("li");
      badge.className = "deck-card__tag";
      badge.textContent = tag;
      tags.append(badge);
    }

    link.append(title, description);

    if (tags.childElementCount > 0) {
      link.append(tags);
    }

    item.append(link);
    deckList.append(item);
    deckItems.push({ item, tags: deckConfig.tags ?? [] });
  }

  const availableTags = [
    ...new Set(Object.values(decks).flatMap((deck) => deck.tags ?? [])),
  ].sort((first, second) => first.localeCompare(second));

  for (const tag of [null, ...availableTags]) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "deck-filter";
    button.textContent = tag ?? "All";
    button.setAttribute("aria-pressed", String(tag === null));
    button.addEventListener("click", () => {
      for (const { item, tags } of deckItems) {
        item.hidden = tag !== null && !tags.includes(tag);
      }

      for (const [filterTag, filterButton] of filterButtons) {
        filterButton.setAttribute("aria-pressed", String(filterTag === tag));
      }
    });
    filterButtons.set(tag, button);
    filters.append(button);
  }

  filters.hidden = availableTags.length === 0;
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
