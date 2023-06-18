<script setup>
const query = queryContent('blog')

useHead({ title: 'Blog - danini.dev' })
</script>

<template>
  <ArticleList :query="query" />
</template>