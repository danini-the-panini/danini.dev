<script setup>
const query = queryContent('blog')

useHead({ title: 'Blog - Danini' })
</script>

<template>
  <ArticleList :query="query" />
</template>