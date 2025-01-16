<script setup>
import MicrophoneIcon from '~/assets/microphone.svg'
import GithubIcon from '~/assets/github.svg'
import YoutubeIcon from '~/assets/youtube.svg'
import SlidesIcon from '~/assets/slides.svg'
import ManiculeIcon from "~/assets/manicule.svg"

const route = useRoute()
const slides = ref(null)
const video = ref(null)

useHead({
  bodyAttrs: {
    class: 'talks talk'
  }
});
definePageMeta({
  pageTransition: {
    onAfterEnter: () => {
      document.dispatchEvent(new Event('transition:after-enter'))
    }
  }
})
</script>

<template>
  <ArticleLayout>
    <ContentQuery :path="route.path" v-slot="{ data }" find="one">
      <OgImage component="Talk" :image="`/images${route.path}.png`" />
      <header>
        <NuxtLink to="/talks"><MicrophoneIcon /></NuxtLink>
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
        <GoogleSlides :slides="data.slides" class="slides" :ratio="data.deckRatio" ref="slides" />
      </template>
      <template v-if="data.video">
        <h3><YoutubeIcon />Video</h3>
        <YoutubeEmbed :video="data.video" class="video" ref="video" />
      </template>
    </ContentQuery>
  </ArticleLayout>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  h1 {
    margin-right: auto;
  }

  a {
    svg {
      transition: transition(transform), transition(filter);
      transform: translateY(0);
      filter: drop-shadow(1px 2px 0px rgba(0, 0, 0, 0.25));
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      svg {
        transform: translateY(-4px);
        filter: drop-shadow(1px 6px 0px rgba(0, 0, 0, 0.25));
      }
    }
  }
}

h1 {
  margin: 0;
}

.date {
  font-size: 16px;
  color: #818181;
  font-family: 'Caveat', cursive;
  transform: rotate(-3deg);
  align-self: flex-start;
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
    transition: transition(transform), transition(box-shadow);
  }

  .manicule {
    transform: scaleX(-1);
    filter: drop-shadow(-2px 4px 0px rgba(0, 0, 0, 0.25));
    position: relative;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      span {
        transform: translate3d(4px, -4px, 0px);
        box-shadow: -9px 8px 0px #000000;
      }

      .manicule {
        animation: manicule-hover-inverted $manicule-duration infinite;
      }
    }
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
