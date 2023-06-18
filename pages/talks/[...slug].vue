<script setup>
import GithubIcon from '~/assets/github.svg'
import YoutubeIcon from '~/assets/youtube.svg'
import SlidesIcon from '~/assets/slides.svg'
import ManiculeIcon from "~/assets/manicule.svg"

const route = useRoute()
</script>

<template>
  <ArticleLayout>
    <ContentQuery :path="route.path" v-slot="{ data }" find="one">
      <header>
        <h1>{{data.title}}</h1>
        <span class="date">{{formatDate(data.date)}}</span>
      </header>
      <ContentDoc class="content-doc" />
      <a class="repo" :href="data.repo" rel="noopener noreferrer" target="_blank" v-if="data.repo">
        <GithubIcon />
        <span>Code</span>
        <ManiculeIcon class="manicule" />
      </a>
      <template v-if="data.slides">
        <h3><SlidesIcon />Slides</h3>
        <GoogleSlides :slides="data.slides" class="slides" :ratio="data.deckRatio" />
      </template>
      <template v-if="data.video">
        <h3><YoutubeIcon />Video</h3>
        <YoutubeEmbed :video="data.video" class="video" />
      </template>
    </ContentQuery>
  </ArticleLayout>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
}

.date {
  font-size: 16px;
  color: #818181;
  font-family: 'Caveat', cursive;
  transform: rotate(-3deg);
}

.repo {
  font-size: 1.5rem;
  text-decoration: none;
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  margin: 32px auto;

  span {
    color: black;
    display: block;
    background: white;
    border: 1px solid #000000;
    box-shadow: -5px 4px 0px #000000;
    padding: 2px 4px;
    transition: transform 200ms ease-in-out, box-shadow 200ms ease-in-out;
  }

  &:hover {
    span {
      transform: translate3d(4px, -4px, 0px);
      box-shadow: -9px 8px 0px #000000;
    }
  }

  .manicule {
    transform: scaleX(-1);
    filter: drop-shadow(-2px 4px 0px rgba(0, 0, 0, 0.25));
  }
}

h3 {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slides, .video {
  max-width: 100%;
  border: 1px solid black;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.25);
  
  &:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>