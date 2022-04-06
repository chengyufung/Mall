<template>
  <div class="check-button">
      <i class="iconfont" :class="[isChecked==false ? 'icon-checkbox-unchecked':'icon-checkbox-checked-o']"></i>
  </div>
</template>

<script>
export default {
    name: 'CheckButton',
    props: {
        isChecked: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.check-button {
    text-align: center;
    display:inline-block;
}
.iconfont {
    font-size: 25px;
}
</style>