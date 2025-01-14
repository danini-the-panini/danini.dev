<script setup>
const route = useRoute()

const { tag } = route.params
const query = queryContent('blog').where({ tags: { $contains: tag } })

useHead({ title: `Posts tagged "${tag}" ` })

useHead({
  bodyAttrs: {
    class: 'blog tag'
  }
})
defineOgImage({
  component: 'Tag',
  props: { tag }
})
</script>

<template>
  <ArticleList :query="query" :tag="tag" />
</template>
