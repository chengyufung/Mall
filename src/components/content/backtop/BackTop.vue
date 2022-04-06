<template>
  <div class="back-top">
      <img src="~assets/images/common/to-top.png" alt="">
  </div>
</template>

<script>
export default {
    name: 'BackTop',
}
</script>

<style scoped>
.back-top {
    position: fixed;
    right: 0;
    bottom: 49px;
    font-size: 0;
}
.back-top img {
    width: 90px;
}
</style>