<template>
  <main>
    <article>
      <slot></slot>
    </article>
  </main>
</template>

<style scoped lang="scss">
main {
  background: white;
  font-family: -apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI","Helvetica Neue";
  font-size: 1rem;
  text-rendering: optimizeLegibility;
  color: #3b4351;
  box-shadow: 5px 7px 0px #000000;

  @media (min-width: 40em) {
    box-shadow: none;
    background: transparent;
    padding: 8px 16px 64px;
  }
}

article {
  margin: 0 auto;
  width: 840px;
  max-width: 100%;
  line-height: 1.5;
  padding: 16px 16px 32px;

  @media (min-width: 40em) {
    background: white;
    margin: 16px auto;
    max-width: 100%;
    border: 1px solid black;
    box-shadow: 5px 7px 0px #000000;
  }
}
</style>
