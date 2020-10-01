<template>
  <div class="warrper" ref="warrper">
    <div class="content" :class="{ 'content-x': scrollX, 'content-y': scrollY }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "bscroll",
  props: {
    probeType: {
      type: Number, // 非实时派发scroll事件和位置参数, 类型由0,1,2,3,
      default: 3
    },
    scrollX: {
      type: Boolean, //是否左右滑动
      default: false
    },
    scrollY: {
      type: Boolean, //是否上下滑动
      default: false
    },
    freeScroll: {
      type: Boolean, //是否上下左右滑动
      default: false
    },
    bounce: {
      type: Boolean, // 是否滚底动画
      default: false
    },
    momentum: {
      type: Boolean, // 是否滚动惯性
      default: true
    },
    preventDefault: {
      type: Boolean, // 是否阻止默认
      default: false
    },
    leftStop: {
      type: Boolean, // 是否左滚动到底设置冒泡
      default: false
    },
    rightStop: {
      type: Boolean, // 是否右滚动到底设置冒泡
      default: false
    },
    data: {
      type: Array, // 组件数据,可用于重新刷新scroll组件
      default: null
    },
    listenScroll: {
      type: Boolean, // 监听滚动
      default: false
    },
    pullup: {
      type: Boolean, // 上拉加载更多,请求接口
      default: false
    },
    beforeScroll: {
      type: Boolean, // 滚动之前做些什么
      default: false
    },
    refreshDelay: {
      type: Number, // scroll刷新时间
      default: 20
    },
    pullDownRefresh: {
      type: Boolean || Object, // 下拉刷新，threshold设置距离
      default: false
    },
    pullUpLoad: {
      type: Boolean || Object, // 上拉加载，threshold设置触发距离
      default: false
    },
    threshold: {
      type: Number,
      default: 120
    }
  },
  data() {
    return {
      scroll: "",
      isStopPropagation: false
    };
  },
  watch: {
    // 	data() {
    // 		setTimeout(() => {
    // 			this.refresh();
    // 		}, this.refreshDelay);
    // 	},
  },
  mounted() {
    this.$nextTick(this.initScroll);
    // this.$on('hook:destroyed', this.scroll.destroy);
  },
  methods: {
    initScroll() {
      if (!this.$refs.warrper) return;
      let {
        freeScroll,
        scrollX,
        scrollY,
        bounce,
        probeType,
        momentum,
        preventDefault,
        pullDownRefresh,
        threshold,
        pullUpLoad
      } = this;
      this.scroll = new BScroll(this.$refs.warrper, {
        freeScroll,
        scrollX,
        scrollY,
        bounce,
        probeType,
        momentum,
        preventDefault,
        pullDownRefresh,
        pullUpLoad,
        threshold,
        stopPropagation: true,
        click: true
      });
      if (this.listenScroll) {
        this.scroll.on("scroll", pos => this.$emit("scroll", pos));
      }
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          this.scroll.y <= this.scroll.maxScrollY + 50 &&
            this.$emit("scrollToEnd");
        });
      }
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => this.$emit("beforeScroll"));
      }
    },
    dfEvent() {
      this.scroll.on("scroll", e => {
        if (this.leftStop) {
          this.scroll.options.stopPropagation = e.x === 0;
        }
        if (this.rightStop) {
          this.scroll.options.stopPropagation = e.x === this.scroll.maxScrollX;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.warrper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    position: relative;
    overflow: hidden;
  }
  .content-x {
    width: -webkit-max-content;
  }
  .content-y {
    width: 100%;
  }
}
</style>
