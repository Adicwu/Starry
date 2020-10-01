<template>
  <ul class="radio-items">
    <slot />
  </ul>
</template>

<script>
export default {
  name: "radioitems",
  props: {
    value: {
      type: Number,
      default: 0
    },
  },
  methods: {
    handler(val){
      this.$emit('input',val);
    }
  },
};
</script>

<style scoped lang="less">
.radio-items {
  padding: 4px 0;
  width: 90%;
  border-radius: 8px;
  background: #fff;
}
</style>
