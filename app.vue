<script setup>
import BookIcon from "~/assets/book.svg"
import HammerIcon from "~/assets/hammer.svg"
import MicrophoneIcon from "~/assets/microphone.svg"
import MastoIcon from "~/assets/masto.svg"
import GithubIcon from "~/assets/github.svg"
import BackgroundBg from "~/assets/background-bg.svg"
import BackgroundFg from "~/assets/background-fg.svg"

useHead({
  themeColor: '#55ECC9'
})
defineOgImageStatic({
  component: 'DaniniOgImage',
  text: 'danini'
})
</script>

<template>
  <Head>
    <SeoKit />
  </Head>

  <div class="background">
    <div class="white"></div>
    <BackgroundBg />
    <div class="zigzags"></div>
    <BackgroundFg />
  </div>
  <div class="spots"></div>
  <div class="nav-bg"></div>
  <div class="bars">
    <div class="bar3"></div>
    <div class="bar2"></div>
    <div class="bar1"></div>
  </div>

  <header>
    <nav>
      <div class="links nav-links">
        <NuxtLink to="/blog"><BookIcon class="shadow"/><BookIcon class="actual"/></NuxtLink>
        <NuxtLink to="/projects"><HammerIcon class="shadow"/><HammerIcon class="actual"/></NuxtLink>
        <NuxtLink to="/talks"><MicrophoneIcon class="shadow"/><MicrophoneIcon class="actual"/></NuxtLink>
      </div>

      <div class="logo">
        <NuxtLink to="/">
          <span>D</span>
          <span>a</span>
          <span>n</span>
          <span>i</span>
          <span>n</span>
          <span>i</span>
        </NuxtLink>
      </div>

      <div class="links social-links">
        <a href="https://github.com/danini-the-panini" target="_blank" rel="me noreferrer noopener"><GithubIcon /></a>
      </div>
    </nav>
  </header>

  <div class="app">
    <NuxtPage />
  </div>

  <LoadingIndicator />
</template>

<style lang="scss">

@keyframes manicule-hover {
  0% {
    left: 0;
  }

  50% {
    left: -5px;
  }

  100% {
    left: 0;
  }
}

@keyframes manicule-hover-inverted {
  0% {
    right: 0;
  }

  50% {
    right: -5px;
  }

  100% {
    right: 0;
  }
}

@keyframes icon-jiggle {
  0% {
    transform: rotate(0);
  }

  33% {
    transform: rotate(-10deg);
  }

  66% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(0);
  }
}

@media (prefers-reduced-motion) {
  *, *::before, *::after {
    transition: none!important;
    animation: none!important;
  }
}

html {
  background-color: #55ECC9;
  min-height: 100%;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

#__nuxt {
  flex-grow: 1;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.page-enter-active,
.page-leave-active {
  overflow: hidden;
  transition: transition-page(transform);
}

.page-enter-from {
  transform: translateX(100vw);
}

.page-leave-to {
  transform: translateX(-100vw);
}

img[data-nuxt-img] {
  background-image: url(~/assets/hourglass.gif);
  background-position: center;
  background-repeat: no-repeat;
}
img[data-error="1"] {
  background-image: url(~/assets/borkfile.png);
}
</style>

<style scoped lang="scss">
header {
  height: 54px;
  width: 100%;
  transition: transition-page(height);
  overflow: hidden;
}

.logo {
  transition: transition-page(transform),
    transition-page(margin),
    transition-page(padding),
    transition-page(text-shadow),
    transition-page(font-size);
}

.bar1, .bar2, .bar3 {
  &, &:before, &:after {
    transition: transition-page(all);
  }
}

.bars {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  z-index: -1;
}

.bar1, .bar2, .bar3 {
  height: 16px;
  width: 100%;
  position: absolute;
  left: 0;

  &::after {
    content: '';
    width: 24px;
    height: 0;
    position: absolute;
    top: 0;
    right: 0;
    background: inherit;
    box-shadow: 8px 8px 0px #000000;
  }
}

.bar1 {
  background-color: #FF4FAA;
  top: 0;
}

.bar2 {
  background-color: #FDFDA3;
  top: 16px;
}

.bar1, .bar2 {
  box-shadow: 0px 0px 0px #000000;
}

.bar3 {
  background-color: #5E91EB;
  top: 32px;
  box-shadow: 0px 6px 0px #000000;
}

.links {
  display: flex;
  align-items: center;
  gap: 8px;

  transition: transition(top);
}

.nav-links {
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 1;

  svg.shadow {
    position: absolute;
    opacity: 0.25;

    :deep(*) {
      stroke: black;
      fill: black;
    }
  }

  svg.book.shadow {
    transform: translate3d(-2px, 2px, 0);
  }

  svg.hammer.shadow {
    transform: translate3d(0, 3px, 0);
  }

  svg.microphone.shadow {
    transform: translate3d(1px, 2px, 0);
  }
}

body.blog {
  a[href="/blog"] {
    pointer-events: none;
  }

  svg.book.actual {
    transform: translateY(-48px) !important;
    // filter: drop-shadow(-2px 50px 0px rgba(0, 0, 0, 0.25)) !important;
  }
}

body.projects {
  a[href="/projects"] {
    pointer-events: none;
  }
  svg.hammer.actual {
    transform: translateY(-48px) !important;
    // filter: drop-shadow(0px 51px 0px rgba(0, 0, 0, 0.25)) !important;
  }
}

body.talks {
  a[href="/talks"] {
    pointer-events: none;
  }
  svg.microphone.actual {
    transform: translateY(-48px) !important;
    // filter: drop-shadow(1px 50px 0px rgba(0, 0, 0, 0.25)) !important;
  }
}

.social-links {
  position: absolute;
  right: 8px;
  top: 3px;
}

.links a {
  display: block;

  svg:not(.shadow) {
    transition: transition(transform);
    transform: translate3d(0, 0, 0);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      svg:not(.shadow) {
        transform: translate3d(0, -4px, 0);
      }
    }
  }
}

nav {
  display: flex;
}

.logo {
  position: relative;
  font-family: 'Cherry Bomb One', sans-serif;
  font-weight: 900;
  font-size: 32px;
  text-transform: uppercase;
  margin: 4px auto 0;
  transform: rotate(-4.13deg);
  text-shadow: -2px 3px 0px #000000;
  color: white;
  line-height: 1;
  padding-left: 16px;

  a {
    color: inherit;
    text-decoration: none;
  }

  span {
    position: relative;
    -webkit-text-stroke: 0.02em black;
  }

  @for $i from 1 through 6 {
    span:nth-child(#{$i}) {
      z-index: 100 - $i;
    }
  }
}

@keyframes title-letter {
  0% {
    top: 0;
  }

  50% {
    top: -4px;
    color: #3CE4FA;
  }

  100% {
    top: 0;
  }
}

body:not(.home) {
  .logo a {
    @for $i from 1 through 6 {
      span:nth-child(#{$i}) {
        animation-delay: 100ms * ($i - 1);
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        span {
          animation-name: title-letter;
          animation-duration: 200ms;
          animation-timing-function: ease-in-out;
          animation-iteration-count: 1;
        }
      }
    }
  }
}

body.home {
  .bar1, .bar2, .bar3 {
    height: 24px;
    width: calc(100vw - 64px);

    transform: rotate(3deg);

    box-shadow: 8px 8px 0px #000000;

    &::after {
      height: 80vh;
    }
  }

  .bar1 {
    left: 13px;
    top: 0px;
  }

  .bar2 {
    left: 43px;
    top: 33px;
  }

  .bar3 {
    left: 73px;
    top: 66px;
  }

  .logo {
    font-size: 76px;
    margin-top: 40px;
    padding-left: 0;
    text-shadow: -3px 7px 0px #000000, -5px 12px 0px #7131C1;

    transform: rotate(-5.83deg);
  }

  .nav-links, .social-links {
    top: -48px;
  }

  header {
    height: 140px;
  }
}

.background {
  position: fixed;
  bottom: 0;
  left: 0;
  display: none;
  z-index: -2;

  svg {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  div {
    position: absolute;
    width: 547.59px;
    height: 1114.26px;
    left: -100px;
    bottom: -500px;

    transform: rotate(-42.56deg);
  }

  .white {
    background-color: white;
  }

  .zigzags {
    background-image: url(~/assets/zigzags.png);
  }
}

.spots {
  display: none;
  position: fixed;
  width: 700px;
  height: 400px;
  right: -200px;
  top: -100px;
  z-index: -2;
  
  background-image: url(~/assets/spots.png);
  background-size: 13px 26px;
  transform: rotate(-39.41deg);
  background-position-y: 6px;
}

.nav-bg {
  position: fixed;
  right: 20px;
  bottom: calc(20vh - 25px);
  width: 440px;
  height: 210px;
  background: #FFFFFF;
  border: 1px solid #000000;
  box-shadow: 9px 10px 0px #000000;
  z-index: -1;
  opacity: 0;
  display: none;
  transform: translateX(100vw) rotate(-4.23deg);
  transition: transition-page(transform),
              transition-page(opacity);
}

@media (min-width: 40em) {
  .background {
    display: block;
  }

  .spots {
    display: block;
  }

  .nav-bg {
    display: block;
  }

  body.home {
    .bars {
      position: fixed;
    }

    .bar1, .bar2, .bar3 {
      height: 24px;
      width: calc(100vw - 150px);
    }

    .nav-bg {
      opacity: 1;
      transform: rotate(-4.23deg) translateY(0);
      transition-delay: $page-duration;
    }

    .bar1 {
      left: 53px;
      top: 20px;
    }

    .bar2 {
      left: 83px;
      top: 53px;
    }

    .bar3 {
      left: 113px;
      top: 86px;
    }
  }
}
</style>
