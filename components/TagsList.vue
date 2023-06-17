<script setup>
defineProps({
  tags: Array,
  link: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="tags"><Tag v-for="tag of tags" :tag="tag" :link="link" :key="tag" /></div>
</template>

<style scoped lang="scss">
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>