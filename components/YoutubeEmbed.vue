<script setup>
const props = defineProps(['video'])

const iframe = ref(null)

const embedSrc = computed(() => `https://www.youtube.com/embed/${props.video}`)

const ratio = 1.7777777777777

onMountResizeEnter(() => {
  if (!iframe.value) return

  iframe.value.style.height = `${iframe.value.clientWidth/ratio}px`
})
</script>

<template>
  <div class="container">
    <iframe
      ref="iframe"
      width="840"
      height="472"
      :src="embedSrc"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
  </div>
</template>

<style scoped lang="scss">
.container {
  aspect-ratio: v-bind(ratio);
}

iframe {
  width: 100%;
  display: block;
}
</style>
