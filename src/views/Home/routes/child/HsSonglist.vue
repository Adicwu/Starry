<template>
  <BotLoadRequest
    class="home-search-songlist"
    offset
    :perpage="12"
    :request="mainRequset"
    resword="playlists"
     v-loading="!flags.load"
    @firstLoad="firstLoad"
  >
    <template #contain="{curdata}">
      <SonglistItem
        v-for="(item,index) in curdata"
        :key="index"
        :cover="item.coverImgUrl"
        :title="item.name"
        :id="item.id"
      >{{item.trackCount}}首 by {{item.creator.nickname}} ，播放{{item.playCount|numFormat}}次</SonglistItem>
    </template>
  </BotLoadRequest>
</template>

<script>
import { mixSearch } from "apis/else";
import SonglistItem from "comps/item/SonglistItem";

export default {
  name: "homesearchsomglist",
  components: {
    SonglistItem
  },
  props: {
    keyword: String
  },
  data() {
    return {
      songlist: [],
      flags: {
        load: false,
      },
    };
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset(...args) {
      return new Promise(resolve => {
        mixSearch(this.keyword, 1000, ...args).then(res => {
          let { playlists } = res.data.result;
          resolve({
            data: { playlists }
          });
        });
      });
    },
    firstLoad(res) {
      this.flags.load = res;
    },
  }
};
</script>
<style lang="less" scoped>
.home-search-songlist {
  width: 100%;
}
</style>