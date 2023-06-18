<script setup>
const query = queryContent('blog')

useHead({
  title: 'Blog'
})
useSeoMeta({
  description: 'Where I occasionally share some thoughts on the interwebs'
})
defineOgImageStatic({
  component: 'DaniniOgImage',
  text: 'blog'
})
</script>

<template>
  <ArticleList :query="query" />
</template>