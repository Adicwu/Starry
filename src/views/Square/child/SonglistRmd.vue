<template>
  <BotLoadRequest class="songlist-rmd" :request="newRmdSonglist" :perpage="12" resword="result">
    <template #contain="{curdata}">
      <div class="_contain">
        <SonglistCard
          v-for="(item,index) in curdata"
          :cover="item.picUrl"
          :title="item.name"
          :id="item.id"
          :count="item.playCount"
          :key="index"
        />
      </div>
    </template>
  </BotLoadRequest>
</template>

<script>
import { rmdSonglist } from "apis/list";
import SonglistCard from "comps/card/SonglistCard";
export default {
  name: "songlistrmd",
  components: {
    SonglistCard
  },
  data() {
    return {};
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {},
    newRmdSonglist(key) {
      return rmdSonglist(key);
    },
    curlistHandler() {}
  }
};
</script>

<style scoped lang="less">
.songlist-rmd {
  width: 100%;
  height: 100%;
  ._contain {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
}
</style>
