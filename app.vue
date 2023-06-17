<script setup>
import BookIcon from "~/assets/book.svg"
import HammerIcon from "~/assets/hammer.svg"
import MicrophoneIcon from "~/assets/microphone.svg"
import MastoIcon from "~/assets/masto.svg"
import GithubIcon from "~/assets/github.svg"
</script>

<template>
  <header>
    <div class="header-content">
      <div class="bar3"></div>
      <div class="bar2"></div>
      <div class="bar1"></div>

      <nav>
        <div class="links nav-links">
          <NuxtLink to="/blog"><BookIcon /></NuxtLink>
          <NuxtLink to="/projects"><HammerIcon /></NuxtLink>
          <NuxtLink to="/talks"><MicrophoneIcon /></NuxtLink>
        </div>

        <h1>
          <NuxtLink to="/">
            <span>D</span>
            <span>a</span>
            <span>n</span>
            <span>i</span>
            <span>n</span>
            <span>i</span>
          </NuxtLink>
        </h1>

        <div class="links social-links">
          <a href="https://toot.cat/@danini" target="_blank" rel="me noreferrer noopener"><MastoIcon /></a>
          <a href="https://github.com/danini-the-panini" target="_blank" rel="noreferrer noopener"><GithubIcon /></a>
        </div>
      </nav>
    </div>
  </header>

  <div>
    <NuxtPage />
  </div>
</template>

<style>
html, body {
  background-color: #55ECC9;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 100%;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}
</style>

<style scoped lang="scss">

@function transition($name, $duration: 200ms, $easing: ease-in-out) {
  @return $name $duration $easing;
}

header {
  height: 48px;
}

.header-content {
  position: relative;
  padding: 0 8px;
}

$header-anim-duration: 300ms;

h1 {
  transition: transition(transform, $header-anim-duration),
    transition(margin, $header-anim-duration),
    transition(padding, $header-anim-duration),
    transition(text-shadow, $header-anim-duration),
    transition(font-size, $header-anim-duration);
}

.bar1, .bar2, .bar3 {
  &, &:before, &:after {
    transition: transition(all, $header-anim-duration);
  }
}

.bar1, .bar2, .bar3 {
  height: 16px;
  width: 100vw;
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

.nav-links, .social-links {
  display: flex;
  align-items: center;
  gap: 8px;

  transition: top 500ms ease-in-out;
}

.social-links {
  position: absolute;
  right: 8px;
  top: 3px;
}

.nav-links {
  position: absolute;
  left: 8px;
  top: 8px;
}

svg.book {
  filter: drop-shadow(-2px 2px 0px rgba(0, 0, 0, 0.25));
}

svg.hammer {
  filter: drop-shadow(0px 3px 0px rgba(0, 0, 0, 0.25));
}

svg.microphone {
  filter: drop-shadow(1px 2px 0px rgba(0, 0, 0, 0.25));
}

.links a {
  display: block;

  svg {
    transition: transform 200ms ease-in-out;
    transform: translate3d(0, 0, 0);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      svg {
        transform: translate3d(0, -4px, 0);
      }
    }
  }
}

nav {
  display: flex;
}

h1 {
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
  h1 a {
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
  .header-content {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

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

  h1 {
    font-size: 76px;
    margin-top: 40px;
    padding-left: 0;
    text-shadow: -3px 7px 0px #000000, -5px 12px 0px #7131C1;

    transform: rotate(-5.83deg);
  }

  .nav-links, .social-links {
    top: -48px;
  }
}
</style>