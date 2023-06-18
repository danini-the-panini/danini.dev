<script setup>
import GithubIcon from '~/assets/github_smol.svg'
import YoutubeIcon from '~/assets/youtube.svg'
import SlidesIcon from '~/assets/slides.svg'

useHead({
  title: 'Talks'
});
useSeoMeta({
  description: 'Various presentations that I have given at conferences and meetups'
})
</script>

<template>
  <ContentQuery v-slot="{ data }" path="/talks" :sort="{ date: -1 }">
    <GridLayout class="layout" title="Talks">
      <li v-for="talk of data" :key="talk._path">
        <NuxtLink :to="talk._path">
          <header>
            <h2>{{ talk.title }}</h2>
            <div class="icons">
              <GithubIcon v-if="talk.repo" />
              <YoutubeIcon v-if="talk.video" />
              <SlidesIcon v-if="talk.slides" />
            </div>
          </header>
          <ContentRenderer :value="talk" class="description" />
          <NuxtPicture format="avif,webp" :src="`/images${talk._path}.png`" />
          <div class="date">{{ formatDate(talk.date) }}</div>
        </NuxtLink>
      </li>
    </GridLayout>
  </ContentQuery>
</template>

<style scoped lang="scss">
.layout:deep(h1) {
  color: #3CE4FA;
}

li {
  width: 100%;

  a {
    text-decoration: none;
    border: 1px solid black;
    box-shadow: 4px 6px 0 black;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height: 100%;
    padding: 16px;
    transform: translate3d(0, 0, 0);
    transition: transform 200ms ease-in-out, box-shadow 200ms ease-in-out;

    &:hover {
      transform: translate3d(-4px, -4px, 0);
      box-shadow: 8px 10px 0 black;
    }
  }

  @media (min-width: 40em) {
    width: 370px;
  }
}

header {
  display: flex;
  align-items: flex-start;
  gap: 4px;
}

h2 {
  text-decoration: underline;
  margin: 0;
  margin-right: auto;
}

.icons {
  display: flex;
  gap: 2px;
  align-items: center;
  flex-shrink: 0;
}

picture, img {
  width: 100%;
  height: fit-content;
  border: 1px solid black;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.25);

  :deep(img) {
    width: 100%;
    height: auto;
    display: block;
  }
}

svg.github {
  width: 24px;
  height: auto;
}

.description {
  line-height: 1.5;
  color: black;

  &:deep(p) {
    margin: 8px 0;
    font-size: 0.875rem;
    
    @media (min-width: 40em) {
      min-height: 3em;
    }
  }
}

.date {
  align-self: flex-end;
  font-size: 16px;
  color: #818181;
  font-family: 'Caveat', cursive;
  transform: rotate(-3deg);
  position: relative;
  top: 4px;
}
</style>