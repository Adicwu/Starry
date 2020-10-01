<template>
  <AdWaterfall :data="videos" class="village" v-if="videos.length>0" @more="mainRequest">
    <template #left="{leftlist}">
      <VideoCoverCard v-for="(item,index) in leftlist" :key="index" :info="item.data" />
    </template>
    <template #right="{rightlist}">
      <VideoCoverCard v-for="(item,index) in rightlist" :key="index" :info="item.data" />
    </template>
  </AdWaterfall>
</template>

<script>
import AdWaterfall from "comps/common/AdWaterfall";
import VideoCoverCard from "comps/card/VideoCoverCard";
import { rmdVideo,videoLists } from "apis/video";
import axios from "axios";
export default {
  name: "village",
  components: {
    AdWaterfall,
    VideoCoverCard
  },
  inject: ["user"],
  data() {
    return {
      videos: [],
      offset: 0,
    };
  },
  watch: {
    "user.flag": {
      immediate: true,
      handler(val) {
        val && this.mainRequest();
      }
    }
  },
  methods: {
    mainRequest() {
      if (!this.user.flag) return;
      rmdVideo(this.offset).then(res => {
        let rel = res.data.datas.filter(
          item => typeof item.data.creator !== "undefined"
        );
        this.videos.push(...rel);
        this.offset+=4
      });
    },
  }
};
</script>

<style lang="less" scoped>
.village {
  width: 100%;
  height: 100%;
  background: #000;
  padding-top: 44px;
  padding-bottom: 60px;
  box-sizing: border-box;
}
</style>
