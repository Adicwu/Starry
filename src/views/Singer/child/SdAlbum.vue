<template>
  <BotLoad
    class="singer-detail-album"
    :data="hotAlbums"
    :perpage="10"
    :isbind="isActive"
    target=".singer-detail"
    v-if="flags.load"
  >
    <template #contain="{curdata}">
        <AlbumList v-for="item in curdata" :key="item.id" :info="item"/>
    </template>    
  </BotLoad>
</template>

<script>
import { singerAlbums } from "apis/singer";
import AlbumList from 'comps/card/AlbumList'
export default {
  name: "singerdetailalbum",
  components: {
      AlbumList
  },
  inject: ['nav'],
  data() {
    return {
      flags: {
        load: false
      },
      hotAlbums: [],
      navKey: 2,
    };
  },
  computed: {
    pageId() {
      return this.$route.query.id;
    },
    isActive(){
      return this.nav.active === this.navKey
    }
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      singerAlbums(this.pageId).then(res => {
        let { hotAlbums } = res.data;
        this.hotAlbums = hotAlbums;
        this.flags.load = true;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.singer-detail-album {
  width: 100%;
}
</style>