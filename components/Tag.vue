<script setup>
const props = defineProps(['tag'])

const route = `/blog/tags/${props.tag}`
</script>

<template>
  <NuxtLink class="tag" :to="route"><span>{{tag}}</span></NuxtLink>
</template>

<style scoped lang="scss">
.tag {
  display: inline-block;
  text-decoration: none;
  color: black;
  font-size: 0.875rem; // 14px
  
  span {
    display: inline-block;
    position: relative;
    background-color: #FDFDA3;
    border: 1px solid #000000;
    box-shadow: -2px 4px 0px #000000;
    transform: translate3d(0, 0, 0);
    transition: transform 200ms ease-in-out, box-shadow 200ms ease-in-out;
    padding: 0 4px;
  }

  &:hover {
    span {
      transform: translate3d(2px, -2px, 0);
      box-shadow: -4px 6px 0px #000000;
    }
  }
}
</style>