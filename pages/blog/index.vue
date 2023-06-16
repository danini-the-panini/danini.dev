<script setup>
const blogQuery = queryContent('blog')

function compareFn(a, b) {
  if (a.publishedAt < b.publishedAt) {
    return -1
  }
  if (a.publishedAt > b.publishedAt) {
    return 1
  }
  return 0
}
</script>

<template>
  <h1>Blog</h1>

  <nav>
    <ContentNavigation v-slot="{ navigation }" :query="blogQuery">
      <ul>
        <li v-for="link of navigation[0].children.sort(compareFn)" :key="link._path">
          <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
        </li>
      </ul>
    </ContentNavigation>
  </nav>
</template>