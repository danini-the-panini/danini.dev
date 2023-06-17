<script setup>
defineProps(['tag'])

const { projectTagImage } = useProjectTagImages()
</script>

<template>
  <div :class="['project-tag', tag]">
    <img :src="projectTagImage(tag)" />
  </div>
</template>

<style scoped lang="scss">
.project-tag {
  border-radius: 50%;
  background-color: white;
  border: 1px solid black;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 6px 0px #000000;
}

.game, .library {
  background-color: #FF4FAA;
}

.web, .app {
  background-color: #FDFDA3;
}

.graphics, .database {
  background-color: #5E91EB;
}

img {
  image-rendering: pixelated;
}
</style>