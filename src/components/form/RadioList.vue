<template>
  <div class="radio-list" @click="selects.flag = true" ref="contain">
    <label for>{{ title }}</label>
    <p>{{ curText }}</p>
    <MovableMask get-container="#app" v-model="selects.flag" v-prevent-back="close">
      <RadioListItems v-model="selects.val" :selects="list" @confirm="onConfirm" />
    </MovableMask>
  </div>
</template>

<script>
import RadioListItems from "./RadioListItems";
import MovableMask from "../common/MovableMask";
export default {
  name: "radiolist",
  components: {
    RadioListItems,
    MovableMask
  },
  props: {
    title: String,
    value: Number,
    list: Array
  },
  computed: {
    curText() {
      return this.list[this.value];
    }
  },
  data() {
    return {
      selects: {
        flag: false,
        val: 0
      }
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.selects.val = val;
      }
    }
  },
  methods: {
    onConfirm(val) {
      this.selects.flag = false;
      this.$emit("input", val);
    },
    close() {
      this.selects.flag = false;
    }
  }
};
</script>

<style lang="less">
.radio-list {
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
  p {
    width: 100%;
    height: 100%;
    text-align: right;
    color: #777;
    font-size: 14px;
  }
}
</style>
