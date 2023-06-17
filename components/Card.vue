<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.card {
  font-size: 0.875rem;
  line-height: 1.5;
  background: white repeating-linear-gradient(transparent, transparent 1.5em, #CFEEFF 1.5em, #CFEEFF calc(1.5em + 1px));
  border: 1px solid #000000;
  box-shadow: 5px 7px 0px #000000;
  padding: 4px 16px 12px 40px;
  width: fit-content;
  position: relative;
  align-self: center;
  margin: 0;

  &::before {
    content: '';
    position: absolute;
    left: 26px;
    top: 0;
    bottom: 0;
    width: 1px;
    display: block;
    background-color: #FFDDF8;
  }

  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    display: block;
    left: 6px;
    bottom: 10px;
    border-radius: 50%;
    background: #55ECC9;
    border: 1px solid #000000;
    box-shadow: inset 5px 7px 0px #000000;
  }
}
</style>