<script setup>
const query = queryContent('blog')

useHead({
  title: 'Blog',
  bodyAttrs: {
    class: 'blog'
  }
})
useSeoMeta({
  description: 'Where I occasionally share some thoughts on the interwebs'
})
defineOgImage({
  component: 'Danini',
  props: { text: 'blog' }
})
</script>

<template>
  <ArticleList :query="query" />
</template>
