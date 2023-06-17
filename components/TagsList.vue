<script setup>
defineProps(['tags'])
</script>

<template>
  <div class="tags"><Tag v-for="tag of tags" :tag="tag" /></div>
</template>

<style scoped lang="scss">
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>