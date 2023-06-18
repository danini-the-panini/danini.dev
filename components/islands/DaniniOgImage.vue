<script setup lang="ts">
defineProps(['image', 'shadow'])

// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="container w-full h-full flex items-center justify-center">
    <img class="bg" src="/assets/og-image-bg.png" width="1200" height="630" />
    <img :class="{ image: true, shadow }" :src="image" width="900" height="500" />
  </div>
</template>

<style scoped lang="scss">
.container {
  background-color: #55ECC9;
  position: relative;
  width: 100%;
}

svg {
  position: relative;
}

img.bg {
  position: absolute;
  top: 0;
  left: 0;
}

img.image {
  position: relative;
}

img.shadow {
  border: 2px solid black;
  box-shadow: 8px 8px 0px black;
}
</style>