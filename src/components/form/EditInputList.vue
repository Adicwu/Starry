<template>
  <div class="edit-input-list">
    <label for="">{{ title }}</label>
    <input type="text" :value="curVal" @change="breakVal" />
  </div>
</template>

<script>
export default {
  name: "editinputlist",
  props: {
    title: String,
    value: [String, Number],
  },
  data() {
    return {
      curVal: this.value,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(res) {
        this.curVal = res;
      },
    },
  },
  methods: {
    breakVal(e) {
      let { value } = e.target;
    //   this.curVal = value;
      this.$emit("input", value);
    },
  },
};
</script>
<style lang="less" scoped>
.edit-input-list {
  position: relative;
  display: grid;
  grid-template-columns: 120px 1fr;
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 16px;
    display: block;
    width: calc(100% - 16px);
    height: 1px;
    background: #e6e6e6;
    transform: scaleY(0.5);
  }
  label {
    align-self: center;
  }
  input {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    text-align: right;
    outline: none;
    background: none;
    color: #777;
    font-size: 14px;
  }
}
</style>
