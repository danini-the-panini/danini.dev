<template>
  <div class="card">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
$hole-radius: 8px;
$hole-size: $hole-radius * 2;
$hole-left: 6px;
$hole-bottom: 10px;

.card {
  box-shadow: 5px 7px 0px #000000;
  margin: 0;
  position: relative;
  transition: box-shadow 100ms ease-in-out;

  .content {
    font-size: 0.875rem;
    line-height: 1.5;
    background: white repeating-linear-gradient(transparent, transparent 1.5em, #CFEEFF 1.5em, #CFEEFF calc(1.5em + 1px));
    border: 1px solid #000000;
    padding: 4px 16px 12px 40px;
    align-self: center;
    mask: radial-gradient(circle at calc($hole-left + $hole-radius) calc(100% - $hole-radius - $hole-bottom), black $hole-radius, white $hole-radius, white) luminance;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 26px;
      top: 1px;
      bottom: 1px;
      width: 1px;
      display: block;
      background-color: #FFDDF8;
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: $hole-size;
    height: $hole-size;
    display: block;
    left: $hole-left;
    bottom: $hole-bottom;
    border-radius: 50%;
    border: 1px solid #000000;
    box-shadow: inset 5px 7px 0px #000000;
  }
}
</style>
