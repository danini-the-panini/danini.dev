<script setup>
const props = defineProps({
  slides: String,
  ratio: {
    type: Number,
    default: 1.77777777777778
  }
})

const iframe = ref(null)

const embedSrc = computed(() => `https://docs.google.com/presentation/d/e/${props.slides}/embed?start=false&loop=false&delayms=3000`)

onMountResizeEnter(() => {
  if (!iframe.value) return

  iframe.value.style.height = `${iframe.value.clientWidth/props.ratio + 36}px`;
})
</script>

<template>
  <div class="container">
    <div class="bogus"></div>
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
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
}

.bogus {
  @include hourglass;
  box-sizing: content-box;
  aspect-ratio: v-bind(ratio);
  border-bottom: 36px solid #E5E7E8;
}

iframe {
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
