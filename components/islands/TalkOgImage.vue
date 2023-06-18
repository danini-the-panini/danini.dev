<script setup lang="ts">
defineProps(['image'])

// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false
})

const imageStyle = {
  border: '2px solid black',
  boxShadow: '8px 8px 0px black'
}
</script>

<template>
  <div class="container w-full h-full flex items-center justify-center" :style="{
    backgroundColor: '#55ECC9',
    backgroundImage: 'url(https://danini.dev/images/og-image-bg.png)',
    width: '100%',
    height: '100%',
  }">
    <img :src="image" width="900" height="500" :style="imageStyle" />
  </div>
</template>