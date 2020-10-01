<template>
  <!-- <AdWaterfall :data="videos" class="home-search-video" v-if="videos.length>0">
    <template #left="{leftlist}">
      <SearchMlogItem v-for="(item,index) in leftlist" :key="index" :info="item.data" />
    </template>
    <template #right="{rightlist}">
      <SearchMlogItem v-for="(item,index) in rightlist" :key="index" :info="item.data" />
    </template>
  </AdWaterfall> -->
  <div class="home-search-video">接口开发中</div>
</template>

<script>
import AdWaterfall from "comps/common/AdWaterfall";
import SearchMlogItem from "comps/item/SearchMlogItem";
import { mixSearch } from "apis/else";
export default {
  name: "homesearchvideo",
  components: {
    SearchMlogItem,
    AdWaterfall
  },
  props: {
    keyword: String
  },
  data() {
    return {
      videos: []
    };
  },
  mounted() {
    // this.mainRequset();
  },
  methods: {
    mainRequset() {
      mixSearch(this.keyword, 1014, 30).then(res => {
        console.log(res.data.result.videos);
        // this.videos = res.data.result.videos;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home-search-video {
  width: 100%;
}
</style>