<script setup>
defineProps(['query', 'tag'])

function compareFn(a, b) {
  if (a.publishedAt < b.publishedAt) {
    return 1
  }
  if (a.publishedAt > b.publishedAt) {
    return -1
  }
  return 0
}
</script>

<template>
  <main>
    <h1><NuxtLink class="link" to="/blog">Blog</NuxtLink><Tag :tag="tag" v-if="tag" /></h1>

    <nav>
      <ContentNavigation v-slot="{ navigation }" :query="query">
        <ul>
          <li v-for="link of navigation[0].children.sort(compareFn)" :key="link._path">
            <Card>
              <h2><NuxtLink :to="link._path">{{ link.title }}</NuxtLink></h2>
              <TagsList :tags="link.tags" />
              <span class="date">{{formatDate(link.publishedAt)}}</span>
            </Card>
          </li>
        </ul>
      </ContentNavigation>
    </nav>
  </main>
</template>

<style scoped lang="scss">
main {
  margin: 0 auto;
  padding: 0 8px;
  width: 640px;
  max-width: 100%;
}

h1 {
  display: flex;
  align-items: center;
  margin: 16px 0 16px;

  a.link {
    font-family: 'Cherry Bomb One', sans-serif;
    font-weight: 900;
    font-size: 3rem; // 48px
    text-shadow: 0px 4px 0px #000000;
    -webkit-text-stroke: 1px black;
    color: #EB9DFF;
    text-decoration: none;
    transform: translateY(0);
    transition: transform 200ms ease-in-out, text-shadow 200ms ease-in-out;

    &:hover {
      transform: translateY(-4px);
      text-shadow: 0px 8px 0px #000000;
    }
  }

  .tag {
    font-size: 2rem; // 32px
    font-weight: normal;
    margin-left: auto;
    transform: rotate(-4.12deg);
  }
}

h2 {
  margin: 0;
}

ul {
  list-style: none;
  margin: 0 0 32px;
  padding: 0;
  display: grid;
  width: 100%;
  gap: 16px;
}

.card {
  display: grid;
  grid-template-areas: 'title title' 'tags date';
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  background-position: 0 0;
  gap: 8px;
  width: 100%;

  h2 {
    grid-area: title;
  }

  .tags {
    grid-area: tags;
  }

  .date {
    grid-area: date;
    align-self: end;
    font-size: 16px;
    color: #818181;
    font-family: 'Caveat', cursive;
    transform: rotate(-3deg);
  }
}
</style>