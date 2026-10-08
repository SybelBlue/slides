import Reveal from "reveal.js";
import Highlight from "reveal.js/plugin/highlight";
import Markdown from "reveal.js/plugin/markdown";
import RevealMath from "reveal.js/plugin/math";
import Notes from "reveal.js/plugin/notes";
import Search from "reveal.js/plugin/search";
import Zoom from "reveal.js/plugin/zoom";
import LaserPointer from "./laser-pointer";
import {
  DEFAULT_REVEAL_THEME,
  isRevealTheme,
  RevealTheme,
} from "./reveal-themes";

import "reveal.js/reveal.css";
import "./highlight-atom-one-dark.css";

import deckCatalog from "./decks.json";

interface DeckConfig {
  title: string;
  description: string;
  directory: string;
  created: string;
  pinned?: boolean | string;
  tags?: string[];
  theme?: RevealTheme;
}

type DeckSort = "default" | "name" | "created-newest" | "created-oldest";

interface DeckListItem {
  id: string;
  config: DeckConfig;
  item: HTMLLIElement;
  tags: string[];
  createdAt: number;
  pinned: boolean;
  catalogIndex: number;
}

interface DeckSource {
  type: "html" | "markdown";
  url: string;
  content: string;
}

const themeLoaders = {
  [RevealTheme.Beige]: () => import("reveal.js/theme/beige.css"),
  [RevealTheme.Black]: () => import("reveal.js/theme/black.css"),
  [RevealTheme.BlackContrast]: () =>
    import("reveal.js/theme/black-contrast.css"),
  [RevealTheme.Blood]: () => import("reveal.js/theme/blood.css"),
  [RevealTheme.Dracula]: () => import("reveal.js/theme/dracula.css"),
  [RevealTheme.League]: () => import("reveal.js/theme/league.css"),
  [RevealTheme.Moon]: () => import("reveal.js/theme/moon.css"),
  [RevealTheme.Night]: () => import("reveal.js/theme/night.css"),
  [RevealTheme.Serif]: () => import("reveal.js/theme/serif.css"),
  [RevealTheme.Simple]: () => import("reveal.js/theme/simple.css"),
  [RevealTheme.Sky]: () => import("reveal.js/theme/sky.css"),
  [RevealTheme.Solarized]: () => import("reveal.js/theme/solarized.css"),
  [RevealTheme.White]: () => import("reveal.js/theme/white.css"),
  [RevealTheme.WhiteContrast]: () =>
    import("reveal.js/theme/white-contrast.css"),
} satisfies Record<RevealTheme, () => Promise<unknown>>;

const themeExtensionLoaders = import.meta.glob("./theme-extensions/*.scss");

const decks = deckCatalog as Record<string, DeckConfig>;
const deckId = new URLSearchParams(window.location.search).get("deck");
const selectedDeck =
  deckId && Object.hasOwn(decks, deckId) ? decks[deckId] : undefined;

if (selectedDeck) {
  void initializePresentation(selectedDeck);
} else {
  void initializeDeckSelector(deckId);
}

async function initializePresentation(deckConfig: DeckConfig): Promise<void> {
  const presentation = requireElement<HTMLElement>("#presentation");
  const slides = requireElement<HTMLElement>(".slides", presentation);
  const theme = resolveRevealTheme(deckConfig.theme);
  const [source] = await Promise.all([
    resolveDeckSource(deckConfig.directory),
    themeLoaders[theme](),
  ]);
  await import("./styles.scss");
  await loadThemeExtension(theme);

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

async function initializeDeckSelector(
  unknownDeckId: string | null,
): Promise<void> {
  await import("./styles.scss");
  showDeckSelector(unknownDeckId);
}

function resolveRevealTheme(theme: unknown): RevealTheme {
  if (theme === undefined) {
    return DEFAULT_REVEAL_THEME;
  }

  if (!isRevealTheme(theme)) {
    throw new Error(`Unknown Reveal theme “${String(theme)}”.`);
  }

  return theme;
}

async function loadThemeExtension(theme: RevealTheme): Promise<void> {
  const extensionPath = `./theme-extensions/${theme}.scss`;
  const loadExtension = themeExtensionLoaders[extensionPath];

  await loadExtension?.();
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
  const nameFilter = requireElement<HTMLInputElement>("#deck-name-filter");
  const sortSelect = requireElement<HTMLSelectElement>("#deck-sort");
  const emptyMessage = requireElement<HTMLElement>("#deck-empty-message");
  const deckList = requireElement<HTMLUListElement>("#deck-list");
  const deckItems: DeckListItem[] = [];
  const filterButtons = new Map<string | null, HTMLButtonElement>();
  const now = Date.now();
  let activeTag: string | null = null;

  if (unknownDeckId) {
    message.textContent = `No deck named “${unknownDeckId}” was found. Choose an available presentation.`;
  }

  for (const [catalogIndex, [id, deckConfig]] of Object.entries(
    decks,
  ).entries()) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const heading = document.createElement("span");
    const title = document.createElement("strong");
    const description = document.createElement("span");
    const created = document.createElement("time");
    const tags = document.createElement("ul");
    const url = new URL(window.location.pathname, window.location.origin);
    const createdAt = parseTimestamp(deckConfig.created, `${id}.created`);
    const pinned = isPinned(deckConfig.pinned, now, id);

    url.searchParams.set("deck", id);
    link.href = url.href;
    link.className = "deck-card";
    heading.className = "deck-card__heading";
    title.textContent = deckConfig.title;
    description.className = "deck-card__description";
    description.textContent = deckConfig.description;
    created.className = "deck-card__created";
    created.dateTime = new Date(createdAt).toISOString();
    created.textContent = `Created ${formatTimestamp(createdAt)}`;
    tags.className = "deck-card__tags";
    tags.setAttribute("aria-label", "Tags");

    heading.append(title);

    if (pinned) {
      heading.append(createPinMarker(deckConfig.pinned, id));
    }

    for (const tag of deckConfig.tags ?? []) {
      const badge = document.createElement("li");
      badge.className = "deck-card__tag";
      badge.textContent = tag;
      tags.append(badge);
    }

    link.append(heading, description, created);

    if (tags.childElementCount > 0) {
      link.append(tags);
    }

    item.append(link);
    deckList.append(item);
    deckItems.push({
      id,
      config: deckConfig,
      item,
      tags: deckConfig.tags ?? [],
      createdAt,
      pinned,
      catalogIndex,
    });
  }

  const updateDeckList = (): void => {
    const query = nameFilter.value.trim().toLocaleLowerCase();
    const sort = sortSelect.value as DeckSort;
    const sortedItems = [...deckItems].sort(getDeckComparator(sort));
    let visibleCount = 0;

    for (const deckItem of sortedItems) {
      const matchesName =
        query.length === 0 ||
        deckItem.config.title.toLocaleLowerCase().includes(query) ||
        deckItem.id.toLocaleLowerCase().includes(query);
      const matchesTag =
        activeTag === null || deckItem.tags.includes(activeTag);
      const visible = matchesName && matchesTag;

      deckItem.item.hidden = !visible;
      visibleCount += Number(visible);
      deckList.append(deckItem.item);
    }

    emptyMessage.hidden = visibleCount > 0;
  };

  nameFilter.addEventListener("input", updateDeckList);
  sortSelect.addEventListener("change", updateDeckList);

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
      activeTag = tag;

      for (const [filterTag, filterButton] of filterButtons) {
        filterButton.setAttribute("aria-pressed", String(filterTag === tag));
      }

      updateDeckList();
    });
    filterButtons.set(tag, button);
    filters.append(button);
  }

  filters.hidden = availableTags.length === 0;
  updateDeckList();
  selector.hidden = false;
}

function getDeckComparator(
  sort: DeckSort,
): (first: DeckListItem, second: DeckListItem) => number {
  const compareNames = (first: DeckListItem, second: DeckListItem): number =>
    first.config.title.localeCompare(second.config.title, undefined, {
      numeric: true,
      sensitivity: "base",
    }) || first.id.localeCompare(second.id);

  switch (sort) {
    case "name":
      return compareNames;
    case "created-newest":
      return (first, second) =>
        second.createdAt - first.createdAt || compareNames(first, second);
    case "created-oldest":
      return (first, second) =>
        first.createdAt - second.createdAt || compareNames(first, second);
    default:
      return (first, second) =>
        Number(second.pinned) - Number(first.pinned) ||
        first.catalogIndex - second.catalogIndex;
  }
}

function isPinned(
  pinned: DeckConfig["pinned"],
  now: number,
  deckId: string,
): boolean {
  if (pinned === undefined || pinned === false) {
    return false;
  }

  if (pinned === true) {
    return true;
  }

  if (typeof pinned !== "string") {
    throw new Error(
      `Invalid pinned value for ${deckId}; expected a boolean or timestamp.`,
    );
  }

  return parseTimestamp(pinned, `${deckId}.pinned`) > now;
}

function createPinMarker(
  pinned: DeckConfig["pinned"],
  deckId: string,
): HTMLElement {
  const marker = document.createElement("span");
  const icon = document.createElement("span");
  const label =
    typeof pinned === "string"
      ? `Pinned until ${formatTimestamp(parseTimestamp(pinned, `${deckId}.pinned`))}`
      : "Pinned";

  marker.className = "deck-card__pin";
  marker.title = label;
  marker.setAttribute("aria-label", label);
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "📌";
  marker.append(icon, " Pinned");

  return marker;
}

function parseTimestamp(timestamp: string, field: string): number {
  const value = Date.parse(timestamp);

  if (Number.isNaN(value)) {
    throw new Error(`Invalid timestamp for ${field}: “${timestamp}”.`);
  }

  return value;
}

function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    timestamp,
  );
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
