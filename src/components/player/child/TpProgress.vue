<template>
  <div class="tab-player-progress">
    <div class="_progress-text">
      <span>{{ audio.current | sToMs }}</span>
      <span>{{ audio.total | sToMs }}</span>
    </div>
    <div class="_progress-contain" ref="progress" @touchend="touchEnd">
      <div class="_inner" :style="{ width: `${curProgress}px` }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TpProgress",
  props: {
    audio: Object,
    dom: HTMLAudioElement,
    visiable: Boolean
  },
  filters: {
    sToMs(a) {
      let m = parseInt(((a % 3600) / 60).toString()),
        s = parseInt(((a % 3600) % 60).toString());
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      return m + ":" + s;
    }
  },
  data() {
    return {
      progress: {
        clientWidth: 0,
        offsetX: 0
      }
    };
  },
  watch: {
    visiable: {
      immediate: true,
      handler(res) {
        res && this.initData();
      }
    }
  },
  computed: {
    curProgress() {
      let { clientWidth = 0 } = this.progress;
      let { total = 0, current = 0 } = this.audio;
      return parseInt((clientWidth / total) * current) || 0;
    }
  },
  methods: {
    initData() {
      let { progress } = this.$refs;
      progress = progress.getBoundingClientRect();
      this.progress.clientWidth = progress.width;
      this.progress.offsetX = progress.x;
    },
    touchEnd(e) {
      const touch = e.changedTouches[0];
      let { clientWidth } = this.progress;
      let res = touch.clientX - this.progress.offsetX;
      this.dom.currentTime = (res / clientWidth) * this.audio.total;
    }
  }
};
</script>
<style lang="less" scoped>
.tab-player-progress {
  position: relative;
  top: 0;
  width: 100%;
  transition: transform 0.3s;
  ._progress-text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }
  ._progress-contain {
    margin: 10px 0;
    width: 100%;
    height: 5px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.4);
    ._inner {
      width: 0;
      height: 100%;
      background: linear-gradient(to left bottom, #68f9e4, #0bdfec);
      border-radius: 10px;
    }
  }
}
</style>