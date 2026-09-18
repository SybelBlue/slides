import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, normalizePath, type Plugin } from "vite";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const catalogPath = resolve(projectRoot, "src/decks.json");
const publicDirectory = resolve(projectRoot, "public");
const sharedStylesPath = normalizePath(resolve(projectRoot, "src/styles.scss"));

export default defineConfig(({ command, isPreview }) => {
  validateDeckDirectories();

  return {
    base: command === "build" || isPreview ? "/slides/" : "/",
    css: {
      preprocessorOptions: {
        scss: {
          additionalData(source: string, filename: string): string {
            if (normalizePath(filename) !== sharedStylesPath) {
              return source;
            }

            const deckStyles = getDeckDirectories()
              .map((directory) => resolve(directory, "_styles.scss"))
              .filter(existsSync)
              .map(
                (stylesheet, index) =>
                  `@use ${JSON.stringify(normalizePath(stylesheet))} as deck${index};`,
              )
              .join("\n");

            return deckStyles ? `${deckStyles}\n${source}` : source;
          },
        },
      },
    },
    plugins: [reloadDeckFiles()],
  };
});

function reloadDeckFiles(): Plugin {
  return {
    name: "reload-deck-files",
    configureServer(server) {
      const deckDirectory = `${normalizePath(server.config.publicDir)}/decks/`;
      const reloadDeck = (file: string): void => {
        const normalizedFile = normalizePath(file);

        if (!normalizedFile.startsWith(deckDirectory)) {
          return;
        }

        if (normalizedFile.endsWith("/_styles.scss")) {
          const styleModules =
            server.moduleGraph.getModulesByFile(sharedStylesPath);

          styleModules?.forEach((module) => {
            server.moduleGraph.invalidateModule(module);
          });
        }

        server.ws.send({ type: "full-reload", path: "*" });
      };

      server.watcher.on("add", reloadDeck);
      server.watcher.on("change", reloadDeck);
      server.watcher.on("unlink", reloadDeck);
    },
  };
}

function validateDeckDirectories(): void {
  for (const directory of getDeckDirectories()) {
    if (!existsSync(directory) || !statSync(directory).isDirectory()) {
      throw new Error(`Deck directory ${directory} does not exist.`);
    }

    const slideFiles = ["slides.md", "slides.html"].filter((filename) =>
      existsSync(resolve(directory, filename)),
    );

    if (slideFiles.length !== 1) {
      throw new Error(
        `Deck directory ${directory} must contain exactly one slides.md or slides.html file.`,
      );
    }
  }
}

function getDeckDirectories(): string[] {
  const catalog: unknown = JSON.parse(readFileSync(catalogPath, "utf8"));

  if (!catalog || Array.isArray(catalog) || typeof catalog !== "object") {
    throw new Error("The deck catalog must contain an object.");
  }

  return Object.entries(catalog).map(([id, entry]) => {
    if (
      !entry ||
      typeof entry !== "object" ||
      !("directory" in entry) ||
      typeof entry.directory !== "string"
    ) {
      throw new Error(`Deck “${id}” must define a directory.`);
    }

    return resolvePublicDirectory(entry.directory, id);
  });
}

function resolvePublicDirectory(directory: string, id: string): string {
  const normalizedDirectory = directory.trim().replace(/^\/+|\/+$/g, "");
  const resolvedDirectory = resolve(publicDirectory, normalizedDirectory);
  const relativeDirectory = relative(publicDirectory, resolvedDirectory);

  if (
    !normalizedDirectory ||
    /[?#]/.test(normalizedDirectory) ||
    !relativeDirectory ||
    isAbsolute(relativeDirectory) ||
    relativeDirectory === ".." ||
    relativeDirectory.startsWith(`..${sep}`)
  ) {
    throw new Error(
      `Deck “${id}” has invalid public directory “${directory}”.`,
    );
  }

  return resolvedDirectory;
}
