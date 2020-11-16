<template>
  <div class="loading-block" :style="{height:height}">
    <van-loading size="24px">{{text}}</van-loading>
  </div>
</template>

<script>
export default {
  name: "LoadingBlock",
  props: {
    height: {
      type: String,
      default: "140px"
    },
    text: {
      type: String,
      default: "努力加载中..."
    }
  }
};
</script>
<style lang="less" scoped>
.loading-block {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  animation-duration: 0.3s;
  background: #fff;
  z-index: 333;
}
</style>