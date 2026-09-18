PNPM ?= pnpm
CATALOG ?= src/decks.json
DECK_DIR ?= public/decks
URL_PREFIX ?= /decks

export DECK_ID := $(ID)
export DECK_TITLE := $(TITLE)
export DECK_DESCRIPTION := $(DESCRIPTION)
export DECK_CATALOG_PATH := $(CATALOG)
export DECK_PUBLIC_DIR := $(DECK_DIR)
export DECK_URL_PREFIX := $(URL_PREFIX)

.DEFAULT_GOAL := help

.PHONY: help install dev build preview new-deck clean

help:
	@printf '%s\n' \
		'Usage:' \
		'  make install  Install dependencies with pnpm' \
		'  make dev      Start the temporary development server' \
		'  make build    Build the static presentation site' \
		'  make preview  Preview the production build locally' \
		'  make new-deck Create a deck and add it to the JSON catalog' \
		'                  Optional: ID=name TITLE="Title" DESCRIPTION="Summary"' \
		'  make clean    Remove the generated dist directory'

install:
	$(PNPM) install

dev:
	$(PNPM) dev

build:
	$(PNPM) build

preview:
	$(PNPM) preview

new-deck:
	@node scripts/new-deck.mjs

clean:
	rm -rf dist
