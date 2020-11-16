<template>
  <BotLoadRequest
    class="home-search-album"
    offset
    :perpage="12"
    :request="mainRequset"
    resword="albums"
    v-loading="!flags.load"
    @firstLoad="firstLoad"
  >
    <template #contain="{ curdata }">
      <ul>
        <AlbumList v-for="(item, index) in curdata" :key="index" :info="item" />
      </ul>
    </template>
  </BotLoadRequest>
</template>

<script>
import { mixSearch } from "apis/else";
import AlbumList from "comps/card/AlbumList";

export default {
  name: "homesearchalbum",
  components: {
    AlbumList,
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
        mixSearch(this.keyword, 10, ...args).then((res) => {
          let { albums } = res.data.result;
          resolve({
            data: { albums },
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
.home-search-album {
  width: 100%;
}
</style>