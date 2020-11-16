<template>
  <BotLoadRequest
    class="home-search-song"
    offset
    :perpage="14"
    :request="mainRequset"
    resword="songs"
    v-loading="!flags.load"
    @firstLoad="firstLoad"
  >
    <template #contain="{ curdata }">
      <SearchAudioItem
        v-for="(item, index) in curdata"
        :key="index"
        :detail="item"
      />
    </template>
  </BotLoadRequest>
</template>

<script>
import SearchAudioItem from "comps/item/SearchAudioItem";
import { mixSearch } from "apis/else";
export default {
  name: "homesearchsong",
  components: {
    SearchAudioItem,
  },
  props: {
    keyword: String,
  },
  data() {
    return {
      flags: {
        load: false,
      },
    };
  },
  methods: {
    mainRequset(...args) {
      return new Promise((resolve) => {
        mixSearch(this.keyword, 1, ...args).then((res) => {
          resolve({
            data: {
              songs: res.songs,
            },
          });
        });
      });
    },
    firstLoad(res) {
      this.flags.load = res;
    },
  },
};
</script>
<style lang="less" scoped>
.home-search-song {
  width: 100%;
}
</style>