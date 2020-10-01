<template>
  <div class="single-video" @click="playHandler">
    <video :src="src" ref="video"></video>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div
        class="_handler van-icon"
        v-show="!play.switch && play.load"
        :class="[!play.switch?'van-icon-play':'van-icon-pause']"
      ></div>
    </transition>
    <van-loading class="_handler" v-if="!play.load" />
  </div>
</template>

<script>
export default {
  name: "singlevideo",
  props: {
    src: String,
    isControllable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      play: {
        switch: false,
        load: false,
      },
    };
  },
  watch: {
    "play.switch"(val) {
      let { video } = this.$refs;
      val ? video.play() : video.pause();
      this.$emit("statusHanlder", val);
    },
  },
  computed: {},
  mounted() {
    this.addEvents();
  },
  beforeDestroy() {
    this.removeEvents();
  },
  methods: {
    playHandler() {
      if (!this.isControllable) return;
      if (!this.play.load) return this.$toast("加载中..");
      this.play.switch = !this.play.switch;
    },
    pause() {
      this.play.switch = false;
    },
    addEvents() {
      let { video } = this.$refs;
      video.addEventListener("canplay", this.canPlayEvent);
    },
    removeEvents() {
      let { video } = this.$refs;
      video.removeEventListener("canplay", this.canPlayEvent);
    },
    canPlayEvent() {
      this.play.load = true;
    },
  },
};
</script>
<style lang="less" scoped>
.single-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  video {
    width: 100%;
  }
  ._handler {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    font-size: 60px;
    color: rgba(255, 255, 255, 0.9);
    animation-duration: 0.4s;
    animation-delay: 0.8s;
    &::before {
      text-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>