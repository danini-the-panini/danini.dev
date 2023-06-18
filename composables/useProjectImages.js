export default function useProjectImages() {
  const images = import.meta.glob('~/assets/projects/*.png', { eager: true });

  return { projectImage(project) {
    const path = `/assets${project._path}.png`
    const image = images[path]
    if (!image) throw new Error(`No project image for "${project._path}" (looked at "${path}")`)

    return images[`/assets${project._path}.png`].default
  } }
}