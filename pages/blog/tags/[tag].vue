<script setup>
const route = useRoute()

const { tag } = route.params
const query = queryContent('blog').where({ tags: { $contains: tag } })
</script>

<template>
  <ArticleList :query="query" :tag="tag" />
</template>