<script setup>
const props = defineProps(['video'])

const iframe = ref(null)

const embedSrc = computed(() => `https://www.youtube.com/embed/${props.video}`)

onMounted(() => {
  window.addEventListener('resize', onResize, { passive: true })
  onResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

function onResize() {
  if (!iframe.value) return

  iframe.value.style.height = `${iframe.value.clientWidth/1.7777777777777}px`
}
</script>

<template>
  <iframe
    ref="iframe"
    width="840"
    height="472"
    :src="embedSrc"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
</template>
