<script setup>
useHead({
  bodyAttrs: {
    class: 'home'
  }
})
</script>

<template>
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
</template>

<style scoped>
dl {
  font-size: 0.875rem;
  line-height: 1.5;
  background: white repeating-linear-gradient(transparent, transparent 1.5em, #CFEEFF 1.5em, #CFEEFF calc(1.5em + 1px));
  border: 1px solid #000000;
  box-shadow: 5px 7px 0px #000000;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(24px);
  padding: 4px 16px 8px 32px;
  margin: 150px 0 0 29px;
  width: fit-content;
  position: relative;
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
</style>