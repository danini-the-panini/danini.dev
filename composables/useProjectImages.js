export default function useProjectImages() {
  const images = import.meta.globEager('~/assets/projects/*.png');

  return { projectImage(project) {
    const path = `/assets${project._path}.png`
    const image = images[path]
    if (!image) throw new Error(`No project image for "${project._path}" (looked at "${path}")`)

    return images[`/assets${project._path}.png`].default
  } }
}