<template>
  <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
    <div
      class="movable-mask"
      :class="containPos"
      ref="contain"
      v-if="value"
      @click.self="$emit('input', false)"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "movablemask",
  props: {
    getContainer: String,
    value: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "center"
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        val && this.getContainer && this.$nextTick(this.moveDom);
      }
    }
  },
  computed: {
    containPos() {
      return `_${this.position}`;
    }
  },
  methods: {
    moveDom() {
      let el = this.$refs.contain;
      document.querySelector(this.getContainer).appendChild(el);
    }
  }
};
</script>

<style scoped lang="less">
.movable-mask {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  animation-duration: 0.4s;
  &._center {
    justify-content: center;
    align-items: center;
  }
  &._top {
    align-items: flex-start;
  }
  &._bottom {
    align-items: flex-end;
  }
  &._left {
    justify-content: flex-start;
  }
  &._right {
    justify-content: flex-end;
  }
}
</style>
