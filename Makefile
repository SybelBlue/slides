PNPM ?= pnpm
CATALOG ?= src/decks.json
DECK_DIR ?= public/decks
URL_PREFIX ?= /decks
GH_PAGES_URL ?= https://sybelblue.github.io/slides/

export DECK_ID := $(ID)
export DECK_TITLE := $(TITLE)
export DECK_DESCRIPTION := $(DESCRIPTION)
export DECK_TAGS := $(TAGS)
export DECK_CATALOG_PATH := $(CATALOG)
export DECK_PUBLIC_DIR := $(DECK_DIR)
export DECK_URL_PREFIX := $(URL_PREFIX)

.DEFAULT_GOAL := help

.PHONY: help install watch dev build preview open new-deck clean

help:
	@printf '%s\n' \
		'Usage:' \
		'  make install  Install dependencies with pnpm' \
		'  make watch    Start the development server and reload on changes' \
		'  make dev      Alias for make watch' \
		'  make build    Build the static presentation site' \
		'  make preview  Preview the production build locally' \
		'  make open     Open the GitHub Pages site in the default browser' \
		'  make new-deck Create a deck and add it to the JSON catalog' \
		'                  Optional: ID=name TITLE="Title" DESCRIPTION="Summary" TAGS="Topic, Type"' \
		'  make clean    Remove the generated dist directory'

install:
	$(PNPM) install

watch:
	$(PNPM) watch

dev: watch

build:
	$(PNPM) build

preview:
	$(PNPM) preview

open:
	@case "$$(uname -s)" in \
		Darwin) open "$(GH_PAGES_URL)" ;; \
		Linux) xdg-open "$(GH_PAGES_URL)" ;; \
		MINGW*|MSYS*|CYGWIN*) cmd.exe /c start "" "$(GH_PAGES_URL)" ;; \
		*) printf 'Open %s in a browser.\n' "$(GH_PAGES_URL)" ;; \
	esac

new-deck:
	@node scripts/new-deck.mjs

clean:
	rm -rf dist
