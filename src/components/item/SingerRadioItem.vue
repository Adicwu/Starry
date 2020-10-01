<template>
  <li class="singer-radio-item" @click="handler">
    <slot />
  </li>
</template>

<script>
export default {
  name: "singerradioitem",
  props: {
    name: Number
    // curval: Number
  },
  data() {
    return {};
  },
  computed: {
    isSelect() {
      // return this.name == this.curVal
    }
  },
  mounted() {},
  methods: {
    handler() {
      this.$parent.handler(this.name)
    }
  }
};
</script>
<style lang="less" scoped>
.singer-radio-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 16px 20px;
  font-size: 14px;
  &:active {
    background: rgba(0, 0, 0, 0.2);
  }
  i {
    font-size: 18px;
    color: crimson;
  }
}
</style>