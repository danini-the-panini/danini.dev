<script setup>
import GithubIcon from '~/assets/github_smol.svg'
import YoutubeIcon from '~/assets/youtube.svg'
import SlidesIcon from '~/assets/slides.svg'

useHead({
  title: 'Talks',
  bodyAttrs: {
    class: 'talks'
  }
});
useSeoMeta({
  description: 'Various presentations that I have given at conferences and meetups'
})
defineOgImageStatic({
  component: 'DaniniOgImage',
  text: 'talks'
})
</script>

<template>
  <GridLayout class="layout" title="Talks">
    <ContentQuery v-slot="{ data }" path="/talks" :sort="{ date: -1 }">
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
          <NuxtImg format="webp" :src="`/images${talk._path}.png`" width="900" height="500" />
          <div class="date">{{ formatDate(talk.date) }}</div>
        </NuxtLink>
      </li>
    </ContentQuery>
  </GridLayout>
</template>

<style scoped lang="scss">
.layout:deep(h1) {
  color: #3CE4FA;
}

li {
  width: 100%;
  max-width: 370px;
  margin: 0 auto;

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
    transition: transition(transform), transition(box-shadow);

    &:hover {
      transform: translate3d(-4px, -4px, 0);
      box-shadow: 8px 10px 0 black;
    }
  }

  @media (min-width: 40em) {
    width: 370px;
    margin: 0;
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

img {
  width: 100%;
  height: auto;
  border: 1px solid black;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.25);
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
