<template>
  <transition leave-active-class="fadeOut">
    <div class="loading-block" :style="{height:height}">
      <van-loading size="24px">{{text}}</van-loading>
    </div>
  </transition>
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
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
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
}
</style>