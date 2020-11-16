<template>
  <FullscreenScroll class="village" @indexHanlder="indexHanlder">
    <EmptyTextBox
      text="请先登录!"
      color="rgba(255,255,255,.9)"
      @click.native="$router.push('/login')"
      v-if="!user.flag"
    />
    <Fullscreen
      v-for="(item, index) in videos"
      class="village-item"
      :key="index"
    >
      <ScreenVideo :detail="item.data" :isReady="curVideo === index" />
    </Fullscreen>
  </FullscreenScroll>
</template>

<script>
import { rmdVideo, videoLists } from "apis/video";
import Fullscreen from "comps/common/Fullscreen";
import FullscreenScroll from "comps/common/FullscreenScroll";
import ScreenVideo from "comps/video/ScreenVideo";
export default {
  name: "village",
  components: {
    Fullscreen,
    FullscreenScroll,
    ScreenVideo,
  },
  inject: ["user"],
  data() {
    return {
      videos: [],
      offset: 0,
      curVideo: 0,
    };
  },
  watch: {
    "user.flag": {
      immediate: true,
      handler(val) {
        val && this.mainRequest();
      },
    },
    curVideo(val) {
      if (this.videos.length - val <= 2) this.mainRequest();
    },
  },
  methods: {
    mainRequest() {
      rmdVideo(this.offset).then((res) => {
        let rel = res.data.datas.filter(
          (item) => typeof item.data.creator !== "undefined"
        );
        this.videos.push(...rel);
        this.offset += 4;
      });
    },
    indexHanlder(index) {
      this.curVideo = index;
    },
  },
};
</script>

<style lang="less" scoped>
.village {
  background: #000;
  .village-item {
    padding: 54px 20px 90px 20px;
    box-sizing: border-box;
  }
}
</style>
