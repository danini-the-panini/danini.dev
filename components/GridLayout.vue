<template>
  <main>
    <h1><slot name="title"></slot></h1>
    <ul>
      <slot></slot>
    </ul>
  </main>
</template>

<style scoped lang="scss">
main {
  margin: 16px;

  @media (min-width: 40em) {
    margin: 16px auto;
    width: 80%;
  }
}

h1 {
  font-family: 'Cherry Bomb One', sans-serif;
  font-weight: 900;
  font-size: 3rem; // 48px
  text-shadow: 0px 4px 0px #000000;
  -webkit-text-stroke: 1px black;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

ul {
  list-style: none;
  margin: 0 0 64px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 48px 16px;
}
</style>
