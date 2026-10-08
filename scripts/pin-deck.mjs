import { readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createInterface } from "node:readline/promises";

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const durationPattern =
  /^\+?([1-9]\d*)\s*(min|minutes?|h|hours?|d|days?|w|weeks?|mo|months?|y|years?)$/i;
const catalogPath = path.resolve(
  process.env.DECK_CATALOG_PATH || "src/decks.json",
);
const interactive = process.stdin.isTTY && process.stdout.isTTY;
const prompt = interactive
  ? createInterface({ input: process.stdin, output: process.stdout })
  : undefined;
const arguments_ = process.argv.slice(2);

try {
  if (arguments_.includes("--help") || arguments_.includes("-h")) {
    printHelp();
  } else {
    await updatePin();
  }
} catch (error) {
  console.error(`Unable to update pin: ${error.message}`);
  process.exitCode = 1;
} finally {
  prompt?.close();
}

async function updatePin() {
  if (arguments_.length > 2) {
    throw new Error("Usage: node scripts/pin-deck.mjs [deck-id] [duration].");
  }

  const id = await getInput(arguments_[0], "DECK_ID", "Deck id: ", "a deck id");
  const duration = await getInput(
    arguments_[1],
    "DECK_PIN_DURATION",
    "Pin duration (for example 7d, 2w, forever, or off): ",
    "a pin duration",
  );

  if (!idPattern.test(id)) {
    throw new Error(
      "Deck ids must use lowercase letters, numbers, and single hyphens.",
    );
  }

  const catalog = JSON.parse(await readFile(catalogPath, "utf8"));

  if (!catalog || Array.isArray(catalog) || typeof catalog !== "object") {
    throw new Error("The deck catalog must contain a JSON object.");
  }

  if (!Object.hasOwn(catalog, id)) {
    throw new Error(`The catalog does not contain a deck named “${id}”.`);
  }

  const deck = catalog[id];

  if (!deck || Array.isArray(deck) || typeof deck !== "object") {
    throw new Error(`The catalog entry for “${id}” must be an object.`);
  }

  const pinned = parsePinDuration(duration, new Date());
  const nextCatalog = {
    ...catalog,
    [id]: {
      ...deck,
      pinned,
    },
  };
  const temporaryCatalogPath = `${catalogPath}.${process.pid}.tmp`;

  try {
    await writeFile(
      temporaryCatalogPath,
      `${JSON.stringify(nextCatalog, null, 2)}\n`,
      { flag: "wx" },
    );
    await rename(temporaryCatalogPath, catalogPath);
  } catch (error) {
    await unlink(temporaryCatalogPath).catch(() => {});
    throw error;
  }

  if (pinned === true) {
    console.log(`Pinned ${id} indefinitely.`);
  } else if (pinned === false) {
    console.log(`Unpinned ${id}.`);
  } else {
    console.log(`Pinned ${id} until ${pinned}.`);
  }
}

function printHelp() {
  console.log(`Usage: node scripts/pin-deck.mjs [deck-id] [duration]

Update an existing deck's pin. Durations are relative to now.

Examples:
  node scripts/pin-deck.mjs workshop 7d
  node scripts/pin-deck.mjs workshop forever
  node scripts/pin-deck.mjs workshop off

Units: min, h, d, w, mo, y (unit names may also be written out)`);
}

async function getInput(argument, environmentName, question, description) {
  const suppliedValue =
    argument?.trim() || process.env[environmentName]?.trim();

  if (suppliedValue) {
    return suppliedValue;
  }

  if (prompt) {
    return (await prompt.question(question)).trim();
  }

  throw new Error(
    `Provide ${description} as an argument or set ${environmentName}.`,
  );
}

function parsePinDuration(value, start) {
  const normalizedValue = value.trim().toLowerCase();

  if (["forever", "true", "on"].includes(normalizedValue)) {
    return true;
  }

  if (["off", "false", "unpin"].includes(normalizedValue)) {
    return false;
  }

  const match = durationPattern.exec(normalizedValue);

  if (!match) {
    throw new Error(
      `Invalid duration “${value}”. Use a positive duration such as 3h, 7d, 2w, 3mo, or 1y; use forever or off for boolean pins.`,
    );
  }

  const amount = Number(match[1]);
  const unit = normalizeUnit(match[2]);
  const expiration = new Date(start);

  switch (unit) {
    case "min":
      expiration.setUTCMinutes(expiration.getUTCMinutes() + amount);
      break;
    case "h":
      expiration.setUTCHours(expiration.getUTCHours() + amount);
      break;
    case "d":
      expiration.setUTCDate(expiration.getUTCDate() + amount);
      break;
    case "w":
      expiration.setUTCDate(expiration.getUTCDate() + amount * 7);
      break;
    case "mo":
      addUtcMonths(expiration, amount);
      break;
    case "y":
      addUtcYears(expiration, amount);
      break;
  }

  return expiration.toISOString();
}

function normalizeUnit(unit) {
  const normalizedUnit = unit.toLowerCase();

  if (normalizedUnit.startsWith("min")) return "min";
  if (normalizedUnit.startsWith("h")) return "h";
  if (normalizedUnit.startsWith("d")) return "d";
  if (normalizedUnit.startsWith("w")) return "w";
  if (normalizedUnit === "mo" || normalizedUnit.startsWith("month")) {
    return "mo";
  }
  return "y";
}

function addUtcMonths(date, months) {
  const day = date.getUTCDate();

  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  date.setUTCDate(Math.min(day, getUtcDaysInMonth(date)));
}

function addUtcYears(date, years) {
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  date.setUTCDate(1);
  date.setUTCFullYear(date.getUTCFullYear() + years);
  date.setUTCMonth(month);
  date.setUTCDate(Math.min(day, getUtcDaysInMonth(date)));
}

function getUtcDaysInMonth(date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
}
