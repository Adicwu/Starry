<template>
  <BotLoadRequest
    class="home-search-mv"
    offset
    :perpage="14"
    :request="mainRequset"
    resword="videos"
  >
    <template #contain="{curdata}">
      <SearchVideoList v-for="(item,index) in curdata" :key="index" :info="item" />
    </template>
  </BotLoadRequest>
</template>

<script>
import { mixSearch } from "apis/else";
import SearchVideoList from "comps/card/SearchVideoList";

export default {
  name: "homesearchmv",
  components: {
    SearchVideoList
  },
  props: {
    keyword: String
  },
  data() {
    return {};
  },
  methods: {
    mainRequset(...args) {
      return new Promise(resolve => {
        mixSearch(this.keyword, 1014, ...args).then(res => {
          resolve({
            data: {
              videos: res.data.result.videos
            }
          });
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home-search-mv {
  width: 100%;
}
</style>