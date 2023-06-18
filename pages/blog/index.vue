<script setup>
const query = queryContent('blog')

useHead({ title: 'Blog' })
</script>

<template>
  <ArticleList :query="query" />
</template>