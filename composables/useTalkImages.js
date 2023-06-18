export default function useTalkImages() {
  const images = import.meta.glob('~/assets/talks/*.png', { eager: true });

  return { talkImage(talk) {
    const path = `/assets${talk._path}.png`
    const image = images[path]
    if (!image) throw new Error(`No talk image for "${talk._path}" (looked at "${path}")`)

    return images[`/assets${talk._path}.png`].default
  } }
}