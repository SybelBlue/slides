export enum RevealTheme {
  Beige = "beige",
  Black = "black",
  BlackContrast = "black-contrast",
  Blood = "blood",
  Dracula = "dracula",
  League = "league",
  Moon = "moon",
  Night = "night",
  Serif = "serif",
  Simple = "simple",
  Sky = "sky",
  Solarized = "solarized",
  White = "white",
  WhiteContrast = "white-contrast",
}

export const DEFAULT_REVEAL_THEME = RevealTheme.Sky;
export const REVEAL_THEMES = Object.values(RevealTheme);

export function isRevealTheme(value: unknown): value is RevealTheme {
  return REVEAL_THEMES.includes(value as RevealTheme);
}
