<script setup lang="ts">
defineProps(['text'])

// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="container w-full h-full flex items-center justify-center" :style="{
    backgroundColor: '#55ECC9',
    backgroundImage: 'url(https://danini.dev/images/og-image-bg.png)',
    width: '100%',
    height: '100%',
  }">
    <img :src="`/images/${text}-large.png`" />
  </div>
</template>