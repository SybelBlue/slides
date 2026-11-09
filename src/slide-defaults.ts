import type { RevealPlugin } from "reveal.js";

export type DefaultSlideAttributeValue = string | true;

export interface SlideDefaultsConfig {
  defaultSlideAttrs?: Record<string, DefaultSlideAttributeValue>;
  defaultSlideClasses?: string[];
}

export const EXCLUDE_DEFAULTS_ATTRIBUTE = "data-exclude-defaults";

const htmlAttributeNamePattern = /^[A-Za-z_:][A-Za-z0-9_.:-]*$/;

export function createSlideDefaultsPlugin(
  config: SlideDefaultsConfig,
): RevealPlugin {
  return {
    id: "slide-defaults",
    init(reveal) {
      const slidesElement = reveal.getSlidesElement();

      if (!slidesElement) return;

      for (const slide of getSlideElements(slidesElement)) {
        if (slide.hasAttribute(EXCLUDE_DEFAULTS_ATTRIBUTE)) continue;

        for (const [name, value] of Object.entries(
          config.defaultSlideAttrs ?? {},
        )) {
          if (!slide.hasAttribute(name)) {
            slide.setAttribute(name, value === true ? "" : value);
          }
        }

        for (const className of config.defaultSlideClasses ?? []) {
          slide.classList.add(className);
        }
      }
    },
  };
}

export function validateSlideDefaultsConfig(
  config: Record<string, unknown>,
  deckId: string,
): void {
  const attributes = config.defaultSlideAttrs;

  if (attributes !== undefined) {
    if (!isRecord(attributes)) {
      throw new Error(`Deck “${deckId}” defaultSlideAttrs must be an object.`);
    }

    for (const [name, value] of Object.entries(attributes)) {
      if (!htmlAttributeNamePattern.test(name)) {
        throw new Error(
          `Deck “${deckId}” has invalid default slide attribute “${name}”.`,
        );
      }

      if (name.toLowerCase() === "class") {
        throw new Error(
          `Deck “${deckId}” must declare default classes in defaultSlideClasses, not defaultSlideAttrs.`,
        );
      }

      if (name.toLowerCase() === EXCLUDE_DEFAULTS_ATTRIBUTE) {
        throw new Error(
          `Deck “${deckId}” cannot declare ${EXCLUDE_DEFAULTS_ATTRIBUTE} as a default slide attribute.`,
        );
      }

      if (typeof value !== "string" && value !== true) {
        throw new Error(
          `Deck “${deckId}” defaultSlideAttrs.${name} must be a string or true.`,
        );
      }
    }
  }

  const classes = config.defaultSlideClasses;

  if (classes !== undefined) {
    if (!Array.isArray(classes)) {
      throw new Error(`Deck “${deckId}” defaultSlideClasses must be an array.`);
    }

    for (const className of classes) {
      if (
        typeof className !== "string" ||
        className.length === 0 ||
        /\s/.test(className)
      ) {
        throw new Error(
          `Deck “${deckId}” defaultSlideClasses entries must be non-empty class names without whitespace.`,
        );
      }
    }
  }
}

function getSlideElements(slidesElement: HTMLElement): HTMLElement[] {
  const slides: HTMLElement[] = [];

  for (const horizontalSlide of getDirectSectionChildren(slidesElement)) {
    const verticalSlides = getDirectSectionChildren(horizontalSlide);

    slides.push(
      ...(verticalSlides.length > 0 ? verticalSlides : [horizontalSlide]),
    );
  }

  return slides;
}

function getDirectSectionChildren(element: HTMLElement): HTMLElement[] {
  return Array.from(element.children).filter(
    (child): child is HTMLElement => child.tagName === "SECTION",
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
