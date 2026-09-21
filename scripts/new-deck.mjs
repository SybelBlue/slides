import {
  access,
  mkdir,
  readFile,
  rename,
  rmdir,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createInterface } from "node:readline/promises";

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const catalogPath = path.resolve(
  process.env.DECK_CATALOG_PATH || "src/decks.json",
);
const deckDirectory = path.resolve(
  process.env.DECK_PUBLIC_DIR || "public/decks",
);
const urlPrefix = normalizeUrlPrefix(process.env.DECK_URL_PREFIX || "/decks");
const interactive = process.stdin.isTTY && process.stdout.isTTY;
const prompt = interactive
  ? createInterface({ input: process.stdin, output: process.stdout })
  : undefined;

try {
  const id = await getDeckId();
  const defaultTitle = id
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  const title = await getValue("DECK_TITLE", `Title [${defaultTitle}]: `);
  const description = await getValue(
    "DECK_DESCRIPTION",
    "Description [A Reveal.js presentation.]: ",
  );
  const tags = parseTags(
    await getValue("DECK_TAGS", "Tags (comma-separated) [none]: "),
  );
  const finalTitle = title || defaultTitle;
  const finalDescription = description || "A Reveal.js presentation.";
  const deckPath = path.join(deckDirectory, id);
  const markdownPath = path.join(deckPath, "slides.md");
  const directoryUrl = `${urlPrefix === "/" ? "" : urlPrefix}/${id}`;
  const catalog = JSON.parse(await readFile(catalogPath, "utf8"));

  if (!catalog || Array.isArray(catalog) || typeof catalog !== "object") {
    throw new Error("The deck catalog must contain a JSON object.");
  }

  if (Object.hasOwn(catalog, id)) {
    throw new Error(`The catalog already contains a deck named “${id}”.`);
  }

  if (await fileExists(deckPath)) {
    throw new Error(
      `${path.relative(process.cwd(), deckPath)} already exists.`,
    );
  }

  const nextCatalog = {
    ...catalog,
    [id]: {
      title: finalTitle,
      description: finalDescription,
      directory: directoryUrl,
      tags,
    },
  };
  const temporaryCatalogPath = `${catalogPath}.${process.pid}.tmp`;
  const starter = createStarterDeck(finalTitle);

  await mkdir(deckPath, { recursive: true });
  await writeFile(markdownPath, starter, { flag: "wx" });

  try {
    await writeFile(
      temporaryCatalogPath,
      `${JSON.stringify(nextCatalog, null, 2)}\n`,
      { flag: "wx" },
    );
    await rename(temporaryCatalogPath, catalogPath);
  } catch (error) {
    await unlink(markdownPath).catch(() => {});
    await rmdir(deckPath).catch(() => {});
    await unlink(temporaryCatalogPath).catch(() => {});
    throw error;
  }

  console.log(`Created ${path.relative(process.cwd(), markdownPath)}`);
  console.log(`Open ?deck=${id} after starting the development server.`);
} catch (error) {
  console.error(`Unable to create deck: ${error.message}`);
  process.exitCode = 1;
} finally {
  prompt?.close();
}

async function getDeckId() {
  const suppliedId = process.env.DECK_ID?.trim();
  const id =
    suppliedId ||
    (await ask("Deck id (lowercase letters, numbers, hyphens): "));

  if (!idPattern.test(id)) {
    throw new Error(
      "Deck ids must use lowercase letters, numbers, and single hyphens.",
    );
  }

  return id;
}

async function getValue(environmentName, question) {
  const suppliedValue = process.env[environmentName]?.trim();

  if (suppliedValue) {
    return suppliedValue;
  }

  return interactive ? await ask(question) : "";
}

function parseTags(value) {
  const seen = new Set();

  return value
    .split(",")
    .map((tag) => tag.trim().replace(/\s+/g, " "))
    .filter((tag) => {
      const key = tag.toLowerCase();

      if (!key || seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
}

async function ask(question) {
  if (!prompt) {
    throw new Error(
      "Set ID (and optionally TITLE and DESCRIPTION) when running non-interactively.",
    );
  }

  return (await prompt.question(question)).trim();
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

function normalizeUrlPrefix(prefix) {
  const normalized = `/${prefix}`.replaceAll(/\/{2,}/g, "/").replace(/\/$/, "");
  return normalized || "/";
}

function createStarterDeck(title) {
  return `<!-- .slide: class="rs-center" -->

# ${title}

## Subtitle

Note:
Add speaker notes here.

---

## First section

- Add your content
<!-- .element: class="fragment fade-in" -->
- Reveal ideas as you present
<!-- .element: class="fragment fade-in" -->

+++

## A vertical slide

Use vertical slides to group a section.
`;
}
