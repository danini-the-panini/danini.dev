<script setup lang="ts">
defineProps(['tag'])

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
    height: '100%'
  }">
    <div :style="{
      maxWidth: '80%',
      maxHeight: '80%',
      fontSize: '96px',
      textAlign: 'center',
      backgroundColor: '#FDFDA3',
      padding: '16px 32px',
      border: '2px solid black',
      boxShadow: '8px 8px 0px black',
      transform: 'rotate(-4deg)'
    }">
      {{ tag }}
    </div>
  </div>
</template>