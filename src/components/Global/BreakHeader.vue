<template>
  <div
    class="break-header"
    :style="{ height: height, color: color ,background: background}"
    :class="{ fixed: fixed }"
  >
    <span class="van-icon van-icon-arrow-left" @click="$router.go(-1)"></span>
    <p>{{ title }}</p>
    <span></span>
    <slot />
  </div>
</template>

<script>
export default {
  name: "breakheader",
  props: {
    title: String,
    height: {
      type: String,
      default: "48px"
    },
    fixed: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#fff"
    },
    background: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="less">
.break-header {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  z-index: 100;
  &.fixed {
    position: fixed;
  }
  justify-items: center;
  span {
    font-size: 20px;
  }
  p {
    justify-self: flex-start;
    font-size: 14px;
  }
}
</style>
