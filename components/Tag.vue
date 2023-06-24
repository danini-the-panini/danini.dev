<script setup>
const props = defineProps({
  tag: String,
  link: {
    type: Boolean,
    default: true
  }
})

const routeTo = props.link ? `/blog/tags/${props.tag}` : null
</script>

<template>
  <NuxtLink class="tag" :to="routeTo" v-if="link"><span>{{tag}}</span></NuxtLink>
  <div class="tag" v-else><span>{{tag}}</span></div>
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
    transition: transition(transform), transition(box-shadow);
    padding: 0 4px;
  }
}

a.tag:hover {
  span {
    transform: translate3d(2px, -2px, 0);
    box-shadow: -4px 6px 0px #000000;
  }
}
</style>
