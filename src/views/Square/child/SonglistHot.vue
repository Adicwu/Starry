<template>
  <BotLoadRequest class="songlist-hot" :request="newHotSonglist" :perpage="12" resword="playlists">
    <template #contain="{curdata}">
      <div class="_contain">
        <SonglistCard
          v-for="(item,index) in curdata"
          :cover="item.coverImgUrl"
          :title="item.description"
          :id="item.id"
          :count="item.playCount"
          :key="index"
        />
      </div>
    </template>
  </BotLoadRequest>
</template>

<script>
import { userHotSonglist } from "apis/list";
import SonglistCard from "comps/card/SonglistCard";
export default {
  name: "songlisthot",
  components: {
    SonglistCard
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    newHotSonglist(key) {
      return userHotSonglist(key, 0, "hot");
    }
  }
};
</script>

<style scoped lang="less">
.songlist-hot {
  width: 100%;
  height: 100%;
  ._contain {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
}
</style>
