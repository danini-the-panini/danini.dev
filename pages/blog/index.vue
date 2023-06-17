<script setup>
const query = queryContent('blog')
</script>

<template>
  <ArticleList :query="query" />
</template>