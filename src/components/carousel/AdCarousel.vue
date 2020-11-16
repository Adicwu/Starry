<template>
  <div
    class="ad-carousel"
    ref="carousel"
    :style="{ height: height }"
    @mouseenter="clearMove"
    @mouseleave="autoMove"
    @touchstart.stop="touchStart"
    @touchend.stop="touchEnd"
  >
    <div
      class="_contain"
      ref="contain"
      :class="{ 'is-animating': isTransition }"
      :style="{ transform: `translate3d(${moveX}px,0,0)` }"
    >
      <slot></slot>
    </div>
    <span class="_arrow _arrow-left" @click="debounce(prevItem)"
      ><i class="fa fa-angle-left"></i
    ></span>
    <span class="_arrow _arrow-right" @click="debounce(nextItem)"
      ><i class="fa fa-angle-right"></i
    ></span>
    <ul class="_indicators">
      <li
        v-for="item in items.length"
        :class="{ '_indicators-active': index == item - 1 }"
        :key="item"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "adcarousel",
  props: {
    autoplay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 3000,
    },
    height: {
      type: String,
      default: "100px",
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "default",
    },
  },
  provide() {
    return {
      type: this.type,
    };
  },
  data() {
    return {
      index: 0,
      timer: null,
      items: {
        childList: null,
        length: 0,
      },
      touch: {
        startX: 0,
      },
      isTransition: true,
      dbtimer: null,
    };
  },
  activated() {
    this.autoMove();
  },
  deactivated() {
    this.clearMove();
  },
  computed: {
    moveX() {
      return this.items.childList
        ? -(this.index * this.items.childList[0].clientWidth)
        : 0;
    },
  },
  watch: {
    autoplay: {
      immediate: true,
      handler(val) {
        val ? this.autoMove() : this.clearMove();
      },
    },
    index(val) {
      let rel = 0;
      if (this.index == this.items.length) {
        rel = this.index - 1;
      } else if (this.index < 0) {
        rel = this.items.length - 1;
      } else {
        rel = this.index;
      }
      this.$emit("change", rel);
    },
  },
  mounted() {
    this.$nextTick(this.init);
    window.addEventListener("resize", this.nextItem);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.nextItem);
  },
  methods: {
    init() {
      let dom = this.$refs.contain;
      this.items.childList = dom.childNodes;
      this.items.length = dom.childNodes.length;
    },
    debounce(fn) {
      this.dbtimer && clearTimeout(this.dbtimer);
      this.dbtimer = setTimeout(() => fn(), 300);
    },
    autoMove() {
      this.clearMove();
      this.autoplay &&
        (this.timer = setInterval(() => this.nextItem(), this.interval));
    },
    clearMove() {
      this.timer && clearInterval(this.timer);
    },
    nextItem() {
      if (this.index + 1 >= this.items.length) {
        let dom = this.items.childList[0];
        dom.style.left = `${Math.abs(this.moveX) + dom.clientWidth}px`;
        this.index++;
        this.blindFold(dom, 0);
      } else {
        this.index++;
      }
    },
    prevItem() {
      if (this.index <= 0) {
        let len = this.items.length;
        let dom = this.items.childList[len - 1];
        dom.style.left = `-${len * dom.clientWidth}px`;
        this.index--;
        this.blindFold(dom, len - 1);
      } else {
        this.index--;
      }
    },
    blindFold(dom, index) {
      setTimeout(() => {
        this.isTransition = false;
        dom.style.left = 0;
        this.index = index;
        setTimeout(() => (this.isTransition = true), 60);
      }, 400);
    },
    touchStart(event) {
      this.touch.startX = event.targetTouches[0].pageX;
      this.clearMove();
    },
    touchEnd(event) {
      let endX = event.changedTouches[0].pageX;
      endX - this.touch.startX > 100 && endX && this.prevItem();
      this.touch.startX - endX > 100 && endX && this.nextItem();
      this.autoMove();
    },
  },
};
</script>

<style lang="less" scoped>
.ad-carousel {
  position: relative;
  width: 100%;
  white-space: nowrap;
  ._contain {
    position: relative;
    display: inline-block;
    width: auto;
    height: 100%;
    &.is-animating {
      transition: transform 0.4s ease-in-out;
    }
  }
  ._arrow {
    position: absolute;
    top: 50%;
    bottom: 50%;
    margin: auto 0;
    height: 36px;
    width: 36px;
    transition: 0.3s;
    border-radius: 50%;
    background-color: rgba(31, 45, 61, 0.3);
    color: #fff;
    z-index: 10;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 1rem;
    }
  }
  ._arrow-left {
    left: 8px;
    transform: translateX(0);
  }
  ._arrow-right {
    right: 8px;
    transform: translateX(0);
  }
  ._indicators {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 14px;
    margin: 0 auto;
    display: table;
    & > li {
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #ebedf0;
      border-radius: 100%;
      opacity: 0.8;
      margin: 0 4px;
      transition: all 0.3s;
      &._indicators-active {
        width: 14px;
        background-color: crimson;
        border-radius: 4px;
      }
    }
  }
  &:hover ._arrow {
    opacity: 1;
  }
  &:hover ._arrow-left {
    transform: translateX(8px);
  }
  &:hover ._arrow-right {
    transform: translateX(-8px);
  }
}
</style>
