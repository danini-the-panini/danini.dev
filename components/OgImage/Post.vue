<script setup lang="ts">
defineProps(['title', 'date'])

// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false
})

</script>

<template>
  <div class="container w-full h-full flex items-center justify-center" :style="{
    backgroundColor: '#55ECC9',
    backgroundImage: 'url(https://danini.dev/images/og-image-bg.png)',
    width: '100%',
    height: '100%',
  }">
    <div :style="{
      maxWidth: '80%',
      maxHeight: '80%',
      textAlign: 'center',
      backgroundColor: 'white',
      padding: '48px 24px',
      border: '2px solid black',
      boxShadow: '8px 8px 0px black',
      transform: 'rotate(-3deg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }">
      <h1 :style="{
        fontSize: '64px',
        fontWeight: '900',
        margin: '0 0 16px 0'
      }">{{ title }}</h1>
      <p :style="{
        fontSize: '32px',
        color: '#444'
      }">{{ formatDate(date) }}</p>
    </div>
  </div>
</template>