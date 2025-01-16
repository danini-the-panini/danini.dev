<script setup lang="ts">
defineProps(['text'])

// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="container h-full items-center justify-center" :style="{
    backgroundColor: '#55ECC9',
    backgroundImage: 'url(https://danini.dev/images/og-image-bg.png)',
  }">
    <div>
      <img :src="`/images/${text}-large.png`" />
    </div>
  </div>
</template>
