<script setup>
const props = defineProps(['slides', 'ratio'])

const iframe = ref(null)

const embedSrc = computed(() => `https://docs.google.com/presentation/d/e/${props.slides}/embed?start=false&loop=false&delayms=3000`)

onMounted(() => {
  window.addEventListener('resize', onResize, { passive: true });
  onResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
})

function onResize() {
  if (!iframe.value) return

  const ratio = (props.ratio || 1.77777777777778);
  iframe.value.style.height = `${iframe.value.clientWidth/ratio + 36}px`;
}
</script>

<template>
  <iframe
    ref="iframe"
    :src="embedSrc"
    frameborder="0"
    width="960"
    height="569"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true"
  >
  </iframe>
</template>
