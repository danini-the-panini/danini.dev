export default function useProjectTagImages() {
  const images = import.meta.glob('~/assets/project-tags/*.png', { eager: true });

  return { projectTagImage(tag) {
    const path = `/assets/project-tags/${tag}.png`
    const image = images[path]
    if (!image) throw new Error(`No project tag image for "${tag}" (looked at "${path}")`)

    return image.default
  } }
}