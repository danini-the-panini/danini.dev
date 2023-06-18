<script setup>
const query = queryContent('blog')

useHead({
  title: 'Blog'
})
useSeoMeta({
  description: 'Where I occasionally share some thoughts on the interwebs'
})
</script>

<template>
  <ArticleList :query="query" />
</template>