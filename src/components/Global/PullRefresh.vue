<template>
  <van-pull-refresh
    class="ad-pull-refresh"
    :head-height="40"
    v-model="reloadflag"
    :disabled="!disabled"
    @refresh="refresh"
  >
    <template #pulling="props">
      <div
        class="load1 load1-df"
        :style="{ transform: `scale(${props.distance / 40})` }"
      >
        <div
          v-for="(item, index) in anm.classlist"
          :class="item"
          :key="index"
          :style="{ background: color }"
        ></div>
      </div>
    </template>
    <template #loosing>
      <div class="load1">
        <div
          v-for="(item, index) in anm.classlist"
          :class="item"
          :key="index"
          :style="{ background: color }"
        ></div>
      </div>
    </template>
    <template #loading>
      <div class="load1">
        <div
          v-for="(item, index) in anm.classlist"
          class="anm"
          :class="item"
          :key="index"
          :style="{ background: color }"
        ></div>
      </div>
    </template>
    <slot></slot>
  </van-pull-refresh>
</template>

<script>
export default {
  name: "pullrefresh",
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
    reloadFn: Function,
    color: {
      type: String,
      default: "silver",
    },
  },
  data() {
    return {
      reloadflag: true,
      anm: {
        classlist: ["rect1", "rect2", "rect3", "rect4", "rect5"],
      },
    };
  },
  methods: {
    refresh() {
      setTimeout(() => {
        this.reloadFn().then((res) => {
          this.reloadflag = false;
          this.$toast("刷新成功");
        });
      }, 2000);
    },
  },
};
</script>

<style lang="less" scoped>
.ad-pull-refresh {
  & /deep/ .load1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    &.load1-df {
      transform: scale(0.1);
    }
    & > div {
      height: 60%;
      width: 4px;
      margin: 0 2px;
      display: inline-block;
      border-radius: 6px;
      opacity: 0.8;
    }
    .anm {
      animation: stretchdelay 1.2s infinite ease-in-out;
    }
    .rect2 {
      animation-delay: -1.1s;
    }
    .rect3 {
      animation-delay: -1s;
    }
    .rect4 {
      animation-delay: -0.9s;
    }
    .rect5 {
      animation-delay: -0.8s;
    }
  }
  @keyframes stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
}
</style>
