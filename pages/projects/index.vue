<script setup>
import HammerIcon from '~/assets/hammer2.svg'
import GithubIcon from '~/assets/github_smol.svg'
import BookIcon from '~/assets/book.svg'
import MicrophoneIcon from '~/assets/microphone.svg'
import LinkIcon from "~/assets/link.svg"

useHead({
  title: 'Projects',
  bodyAttrs: {
    class: 'projects'
  }
})
useSeoMeta({
  description: 'Things I have built, hacked, or tinkered with in my lifetime'
})
defineOgImageStatic({
  component: 'DaniniOgImage',
  text: 'projects'
})
</script>

<template>
  <GridLayout class="layout">
    <template #title>
      <HammerIcon class="icon" />
      <span class="title">Projects</span>
    </template>
    <ContentQuery v-slot="{ data }" path="/projects">
      <li v-for="project of data" :key="project._path">
        <h2>{{ project.name }}</h2>
        <div class="project-tags">
          <ProjectTag v-for="tag in project.tags" :tag="tag" :key="tag" />
        </div>
        <TagsList :tags="project.tools" :link="false" />
        <NuxtImg format="webp" :src="`/images${project._path}.png`" width="412" height="226" />
        <ContentRenderer :value="project" />
        <div class="links">
          <a :href="project.repo" rel="noopener noreferrer" target="_blank" v-if="project.repo">
            <GithubIcon />
            <span>Code</span>
          </a>
          <NuxtLink :to="`/blog/${project.article}`" v-if="project.article">
            <BookIcon />
            <span>Post</span>
          </NuxtLink>
          <NuxtLink :to="`/talks/${project.talk}`" v-if="project.talk">
            <MicrophoneIcon />
            <span>Talk</span>
          </NuxtLink>
          <NuxtLink :to="project.link" v-if="project.link">
            <LinkIcon />
            <span>Link</span>
          </NuxtLink>
        </div>
      </li>
    </ContentQuery>
  </GridLayout>
</template>

<style scoped lang="scss">
.title {
  color: #FDFDA3;
}

.icon {
  &:deep(g.thing) {
    filter: drop-shadow(0px 4px 0px rgba(0, 0, 0, 0.25));
  }
}

li {
  border: 1px solid black;
  box-shadow: 4px 6px 0 black;
  background-color: white;
  width: 100%;
  max-width: 350px;
  padding: 16px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  margin: 0 auto;

  @media (min-width: 40em) {
    width: 350px;
    margin: 0;
  }
}

h2 {
  margin: 0;
}

.project-tags {
  display: flex;
  gap: 8px;
  position: absolute;
  top: -20px;
  right: 12px;
}

img {
  width: 100%;
  height: auto;
  border: 1px solid black;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.tags {
  margin-bottom: 8px;
}

.links {
  display: flex;
  gap: 16px;
  margin-top: auto;
  margin-bottom: 8px;

  a {
    font-size: 1.2rem;
    text-decoration: none;
    display: flex;
    grid-template-columns: 40px auto;
    width: fit-content;
    align-items: center;
    gap: 8px;

    span {
      color: black;
      display: block;
      background: white;
      border: 1px solid #000000;
      box-shadow: -5px 4px 0px #000000;
      padding: 2px 4px;
      transition: transition(transform), transition(box-shadow);
    }

    &:hover {
      span {
        transform: translate3d(3px, -3px, 0px);
        box-shadow: -8px 7px 0px #000000;
      }
    }
  }

  
}

svg.github {
  width: 29px;
  height: auto;
}

svg.book {
  filter: drop-shadow(-2px 2px 0px rgba(0, 0, 0, 0.25));
  margin-right: 4px;
}

svg.microphone {
  filter: drop-shadow(1px 2px 0px rgba(0, 0, 0, 0.25));
  margin-top: 3px;
  margin-right: 2px;
}
</style>
