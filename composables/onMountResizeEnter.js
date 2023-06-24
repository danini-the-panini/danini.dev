export default function onMountResizeEnter(callback) {
  onMounted(() => {
    window.addEventListener('resize', callback, { passive: true })
    document.addEventListener('transition:after-enter', callback, { passive: true })
    callback()
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', callback)
    document.removeEventListener('transition:after-enter', callback)
  })
}
