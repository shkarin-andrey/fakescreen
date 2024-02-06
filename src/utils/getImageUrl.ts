export function getImageUrl(name: string) {
  return new URL(`../assets/emoji/${name}.png`, import.meta.url).href;
}
