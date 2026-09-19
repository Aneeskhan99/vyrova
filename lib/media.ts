/** Poster frame for a film in /public/videos, by convention. */
export function posterFor(src: string): string {
  return src.replace(/^\/videos\/(.+)\.mp4$/, "/videos/posters/$1.webp");
}

/**
 * The lightweight 720p, silent copy of a film, for tiles that autoplay
 * muted. The full file is only fetched when someone opens the lightbox.
 */
export function tileFor(src: string): string {
  return src.replace(/^\/videos\/(.+)\.mp4$/, "/videos/tiles/$1.mp4");
}
