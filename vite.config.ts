import { defineConfig, normalizePath } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "reload-deck-files",
      configureServer(server) {
        const deckDirectory = `${normalizePath(server.config.publicDir)}/decks/`;
        const reloadDeck = (file: string): void => {
          if (normalizePath(file).startsWith(deckDirectory)) {
            server.ws.send({ type: "full-reload", path: "*" });
          }
        };

        server.watcher.on("add", reloadDeck);
        server.watcher.on("change", reloadDeck);
        server.watcher.on("unlink", reloadDeck);
      },
    },
  ],
});
