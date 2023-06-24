<script setup>
import { globalMiddleware } from '#build/middleware'

const loading = ref(false)

function start() { loading.value = true }
function finish() { loading.value = false }

globalMiddleware.unshift(start)
const nuxtApp = useNuxtApp()
const router = useRouter()
router.beforeResolve((to, from) => {
  if (to === from || to.matched.every((comp, index) => comp.components && comp.components?.default === from.matched[index]?.components?.default)) {
    finish()
  }
})
nuxtApp.hook('page:finish', finish)
nuxtApp.hook('vue:error', finish)
onBeforeUnmount(() => {
  globalMiddleware.splice(globalMiddleware.indexOf(start, 1))
  indicator.clear()
})
</script>

<template>
  <img src="~/assets/hourglass.gif" :class="{ loading: loading }" />
</template>

<style scoped lang="scss">
img {
  position: fixed;
  bottom: 16px;
  right: -64px;
  filter: drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.25));
  transition: transition(right);

  &.loading {
    right: 16px;
  }
}
</style>
