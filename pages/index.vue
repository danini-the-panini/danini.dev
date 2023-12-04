<script setup>
import BookIcon from "~/assets/book2.svg"
import HammerIcon from "~/assets/hammer2.svg"
import MicrophoneIcon from "~/assets/microphone2.svg"
import MastoIcon from "~/assets/masto.svg"
import GithubIcon from "~/assets/github.svg"
import ManiculeIcon from "~/assets/manicule.svg"

useHead({
  title: 'Home',
  bodyAttrs: {
    class: 'home'
  }
})
definePageMeta({
  pageTransition: {
    name: 'home'
  }
})
</script>

<template>
  <main>
    <dl>
      <dt>Species</dt>
      <dd>Human</dd>

      <dt>Designation</dt>
      <dd>Dani Smith</dd>

      <dt>Occupation</dt>
      <dd>Full-Stack Developer</dd>

      <dt>Location</dt>
      <dd>South Africa</dd>

      <dt>Affiliation</dt>
      <dd><a href="https://www.platform45.com" target="_blank" rel="noreferrer noopener">Platform45</a></dd>
    </dl>

    <nav class="nav-links">
      <NuxtLink to="/blog" class="blog">
        <ManiculeIcon class="manicule" />
        <span>Blog</span>
        <BookIcon class="icon" />
      </NuxtLink>
      <NuxtLink to="/projects" class="projects">
        <HammerIcon class="icon" />
        <span>Projects</span>
        <ManiculeIcon class="manicule inverted" />
      </NuxtLink>
      <NuxtLink to="/talks" class="talks">
        <ManiculeIcon class="manicule" />
        <span>Talks</span>
        <MicrophoneIcon class="icon" />
      </NuxtLink>
    </nav>

    <nav class="social-links">
      <a href="https://github.com/danini-the-panini" target="_blank" rel="noreferrer noopener">
        <GithubIcon />
        <span>@danini-the-panini</span>
      </a>
    </nav>
  </main>
</template>

<style scoped lang="scss">
main {
  position: fixed;
  width: 100%;
  top: 0;
  padding-top: 160px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  overflow-y: auto;
  overflow-x: hidden;
}

dl {
  font-size: 0.875rem;
  line-height: 1.5;
  background: white repeating-linear-gradient(transparent, transparent 1.5em, #CFEEFF 1.5em, #CFEEFF calc(1.5em + 1px));
  border: 1px solid #000000;
  box-shadow: 5px 7px 0px #000000;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 4px 16px 8px 32px;
  width: fit-content;
  position: relative;
  align-self: center;
  margin: 0;
  transform: translateY(0)
}

dl::before {
  content: '';
  position: absolute;
  left: 26px;
  top: 0;
  bottom: 0;
  width: 1px;
  display: block;
  background-color: #FFDDF8;
}

dl::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  display: block;
  left: 6px;
  bottom: 24px;
  border-radius: 50%;
  background: #55ECC9;
  border: 1px solid #000000;
  box-shadow: inset 5px 7px 0px #000000;
}

dt {
  font-weight: 700;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-self: center;
  padding-left: 8px;

  a {
    font-family: 'Cherry Bomb One', sans-serif;
    font-weight: 900;
    font-size: 48px;
    text-decoration: none;
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      text-shadow: 0px 4px 0px #000000;
      -webkit-text-stroke: 1px black;

      transition: transition(transform), transition(text-shadow);
    }

    .manicule {
      filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.25));
      position: relative;
      top: 8px;

      &.inverted {
        transform: scaleX(-1);
        filter: drop-shadow(-2px 4px 0px rgba(0, 0, 0, 0.25));
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        span {
          transform: translateY(-4px);
          text-shadow: 0px 8px 0px #000000;
        }

        .manicule {
          animation: manicule-hover $manicule-duration infinite;

          &.inverted {
            animation-name: manicule-hover-inverted;
          }
        }

        .icon {
          animation: icon-jiggle 200ms 1;
        }
      }
    }
  }

  .blog {
    margin-left: 30px;

    span {
      color: #EB9DFF;
    }

    .icon {
      margin-bottom: -8px;

      &:deep(g.thing) {
        filter: drop-shadow(-3px 2px 0px rgba(0, 0, 0, 0.25));
      }
    }
  }

  .projects {
    span {
      color: #FDFDA3;
    }

    &:deep(g.thing) {
      filter: drop-shadow(0px 4px 0px rgba(0, 0, 0, 0.25));
    }
  }

  .talks {
    margin-left: 10px;

    span {
      color: #3CE4FA;
    }

    &:deep(g.thing) {
      filter: drop-shadow(3px 2px 0px rgba(0, 0, 0, 0.25));
    }
  }
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 8px;
  margin-bottom: 12px;

  a {
    font-size: 1.5rem;
    text-decoration: none;
    display: grid;
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
        transform: translate3d(4px, -4px, 0px);
        box-shadow: -9px 8px 0px #000000;
      }
    }
  }
}

.home-enter-active,
.home-leave-active {
  transition: transition-page(opacity);
  overflow: hidden;

  dl, .nav-links, .social-links {
    transition: transition-page(transform);
  }
}

.home-enter-from,
.home-leave-to {
  opacity: 0.999;

  dl {
    transform: translateX(-100vw);

    @media (min-width: 40em) {
      transform: rotate(-270deg) scale3d(0.01, 0.01, 1);
    }
  }


  .nav-links {
    transform: translateX(100vw);
  }

  .social-links {
    transform: translateY(200px);

    @media (min-width: 40em) {
      transform: translate3d(-150%, 150%, 0);
    }
  }
}

@media (min-width: 40em) {
  main {
    overflow: visible;
  }

  dl {
    transform: rotate(3deg);
  }

  .nav-links {
    position: fixed;
    right: 100px;
    bottom: 20vh;

    .blog {
      margin-left: 60px;
    }

    .talks {
      margin-left: 40px;
    }

    > * {
      z-index: 2;
    }
  }

  .social-links {
    position: fixed;
    bottom: 0;
    left: 0;
    width: fit-content;

    &:before {
      content: '';
      position: absolute;
      top: -30px;
      left: -30px;
      right: -30px;
      bottom: -30px;
      background: #5E91EB;
      box-shadow: 9px 11px 0px #000000;
      transform: rotate(7.15deg);
      z-index: 1;
    }

    > * {
      z-index: 2;
    }
  }
}
</style>
