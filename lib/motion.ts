/**
 * Every duration and easing in the site lives here (M-02).
 * Changing the feel of the whole site is one edit to this file.
 */

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
} as const;

/** Gentle deceleration — the default for entrances. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** Symmetrical — for things that move and settle, like the compare handle. */
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** Loop lengths, in seconds. Slow enough to read as ambient, not busy. */
export const LOOP = {
  marquee: 40,
  marqueeSlow: 60,
  orbitInner: 22,
  orbitOuter: 34,
  beam: 6,
  borderBeam: 8,
} as const;

/** Distance a revealed element travels, in pixels. */
export const RISE = 16;
