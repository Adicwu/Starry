<template>
  <div class="ad-video" :style="fullScreen.css" @mouseleave="controlFlag = false">
    <transition enter-active-class="slideInDown" leave-active-class="slideOutUp">
      <div class="ad-video-header" v-show="controlFlag">
        <span class="fa fa-angle-left" @click="breakHandler"></span>
        <p class="text-truncate">{{ title }}</p>
        <span class="fa fa-share-alt"></span>
      </div>
    </transition>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="ad-video-footer" v-show="controlFlag">
        <p>{{ time.current | timeFormat }}/{{ time.duration | timeFormat }}</p>
        <span class="van-icon van-icon-shrink" @click="fullScreenHandler"></span>
      </div>
    </transition>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div
        class="ad-video-play fa"
        :class="[playFlag ? 'fa-pause' : 'fa-play']"
        @click="playHandler"
        v-show="controlFlag"
      ></div>
    </transition>
    <div class="ad-video-progress" ref="progress">
      <div class="_current" ref="progresscur" :style="{ width: `${progress.current}px` }"></div>
      <span
        class="_hanlder"
        @touchstart="pgsTouchStart"
        @touchmove="pgsTouchMove"
        @touchend="pgsTouchEnd"
        :style="{ transform: `translateX(${progress.current}px) scale(${pgsHandlerScale})` }"
      ></span>
      <div class="_buffer" :style="{ width: `${progress.buffer}px` }"></div>
    </div>
    <video :src="src" ref="video" @click="controlFlag = !controlFlag" />
  </div>
</template>

<script>
export default {
  name: "advideo",
  props: {
    src: String,
    title: String
  },
  data() {
    return {
      controlFlag: true,
      playFlag: false,
      fullScreen: {
        flag: false,
        css: {}
      },
      canPlay: false,
      volume: 0.5,
      time: {
        current: "00:00",
        duration: "00:00"
      },
      progress: {
        current: 0,
        buffer: 0,
        handler: 0
      },
      pgsTouch: {
        flag: false,
        stratX: 0,
        moveX: 0,
        endX: 0
      },
      events: {
        timeupdate: false,
        canplay: false
      },
      timer: null
    };
  },
  computed: {
    pgsHandlerScale() {
      return this.pgsTouch.flag ? 1.4 : 1;
    }
  },
  watch: {
    playFlag(val) {
      if (val) {
        this.timeUpdater();
        this.$store.commit("musicPause");
      }
    },
    controlFlag: {
      immediate: true,
      handler(val) {
        val && this.closeControl();
      }
    }
  },
  filters: {
    timeFormat(val) {
      if (typeof val === "string") return val;
      var m = parseInt((val % 3600) / 60);
      m = m < 10 ? "0" + m : m;
      var s = parseInt(val % 60);
      s = s < 10 ? "0" + s : s;
      return m + ":" + s;
    }
  },
  mounted() {
    this.videoInit();
  },
  beforeDestroy() {
    this.eventsRemover();
  },
  methods: {
    videoInit() {
      let { video } = this.$refs;
      video.addEventListener("canplay", this.canPlayEvent);
    },
    canPlayEvent(e) {
      let dom = e.target;
      this.canPlay = this.events.canplay = true;
      dom.volume = this.volume;
      this.time.duration = dom.duration;
      this.$emit("canplay", this.canPlay);
    },
    timeUpdater() {
      if (this.events.timeupdate) return;
      let { video } = this.$refs;
      video.addEventListener("timeupdate", this.timeUpdateEvent);
    },
    timeUpdateEvent(e) {
      let { currentTime, buffered } = e.target;
      this.events.timeupdate = true;
      this.time.current = currentTime;
      this.progressHandler(currentTime, buffered.end(0));
    },
    closeControl() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => (this.controlFlag = false), 2000);
    },
    progressHandler(curtime, buffered) {
      let { clientWidth } = this.$refs.progress;
      this.progress.current = (curtime / this.time.duration) * clientWidth;
      this.progress.buffer = (buffered / this.time.duration) * clientWidth;
    },
    pgsTouchStart(e) {
      this.pgsTouch.flag = true;
      let { pageX, pageY } = e.targetTouches[0],
        keyPos = this.fullScreen.flag ? pageY : pageX;
      this.pgsTouch.stratX = keyPos;
    },
    pgsTouchMove(e) {
      let { video, progress, progresscur } = this.$refs,
        { pageX, pageY } = e.targetTouches[0],
        keyPos = this.fullScreen.flag ? pageY : pageX;
      this.progress.current =
        this.pgsTouch.endX + keyPos - this.pgsTouch.stratX;
      video.currentTime =
        (this.progress.current / progress.clientWidth) * video.duration;
    },
    pgsTouchEnd(e) {
      this.pgsTouch.flag = false;
      this.pgsTouch.endX = this.progress.current;
    },
    playHandler() {
      let { video } = this.$refs;
      this.playFlag = !this.playFlag;
      this.playFlag ? video.play() : video.pause();
    },
    breakHandler() {
      this.fullScreen.flag ? this.fullScreenHandler() : this.$router.go(-1);
    },
    fullScreenHandler() {
      let { video } = this.$refs,
        videoOffset = (window.innerHeight - window.innerWidth) / 2;
      this.fullScreen.flag = !this.fullScreen.flag;
      this.fullScreen.css = this.fullScreen.flag
        ? {
            transform: `rotate(90deg) translate3d(${videoOffset}px, ${videoOffset}px,0)`,
            width: "100vh",
            height: "100vw",
            zIndex: "9999"
          }
        : {};
    },
    eventsRemover() {
      let { timeupdate, canplay } = this.events,
        { video } = this.$refs;
      timeupdate && video.removeEventListener("timeupdate", this.canPlayEvent);
      canplay && video.removeEventListener("canplay", this.canPlayEvent);
    }
  }
};
</script>

<style scoped lang="less">
.ad-video {
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  background: #000;
  .ad-video-header,
  .ad-video-footer {
    position: absolute;
    display: grid;
    width: 100%;
    height: 40px;
    z-index: 3;
    animation-duration: 0.3s;
    color: rgba(255, 255, 255, 0.9);
  }
  .ad-video-play {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    z-index: 3;
    font-size: 40px;
    color: rgba(255, 255, 255, 0.8);
    animation-duration: 0.3s;
    &::before {
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    }
  }
  .ad-video-header {
    top: 0;
    grid-template-columns: 40px 1fr 40px;
    align-items: center;
    justify-items: center;
    background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
    span {
      font-size: 18px;
    }
    p {
      text-align: center;
      font-size: 12px;
    }
  }
  .ad-video-footer {
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.9)
    );
    p {
      margin-left: 12px;
      font-size: 12px;
    }
    span {
      padding: 10px;
      font-size: 20px;
    }
  }
  .ad-video-progress {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    z-index: 4;
    ._current,
    ._buffer {
      position: absolute;
      bottom: 0;
      height: 100%;
    }
    ._hanlder {
      position: absolute;
      top: -4px;
      left: -4px;
      width: 10px;
      height: 10px;
      background: crimson;
      border-radius: 50%;
      z-index: 3;
    }
    ._current {
      width: 0;
      background: crimson;
      z-index: 2;
    }
    ._buffer {
      width: 0;
      background: rgba(255, 255, 255, 0.5);
      z-index: 1;
    }
  }
  video {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
