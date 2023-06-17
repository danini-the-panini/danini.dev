export default function useProjectTagImages() {
  const images = import.meta.globEager('~/assets/project-tags/*.png');

  return { projectTagImage(tag) {
    const path = `/assets/project-tags/${tag}.png`
    const image = images[path]
    if (!image) throw new Error(`No project tag image for "${tag}" (looked at "${path}")`)

    return image.default
  } }
}