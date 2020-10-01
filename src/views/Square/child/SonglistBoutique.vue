<template>
  <BotLoadRequest
    class="songlist-boutique"
    offset
	lastKey="updateTime"
    :request="mainRequset"
    :perpage="12"
    resword="playlists"
  >
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
import { boutiqueAudioList } from "apis/list";
import SonglistCard from "comps/card/SonglistCard";
export default {
  name: "songlistboutique",
  components: {
    SonglistCard
  },
  methods: {
    mainRequset(...args) {
      return new Promise(resolve => {
        boutiqueAudioList('全部',...args).then(res => {
		  let { playlists } = res.data;
          resolve({
            data: { playlists }
          });
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
.songlist-boutique {
  width: 100%;
  height: 100%;
  ._contain {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
}
</style>
