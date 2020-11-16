<template>
  <div class="home-search-singer">
      <ArtistItem v-for="(item,index) in artists" :key="index" :detail="item" />
      <p v-if="artists.length===0">--没有相关内容--</p> 
  </div>
</template>

<script>
import { mixSearch } from "apis/else";
import ArtistItem from "comps/item/ArtistItem";

export default {
  name: "homesearchsinger",
  components: {
      ArtistItem
  },
  props: {
    keyword: String
  },
  data() {
    return {
      artists: [],
    };
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset() {
      mixSearch(this.keyword, 100, 30).then(res => {
        this.artists = res.data.result.artists;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home-search-singer {
  width: 100%;
  p{
    width: 100%;
    text-align: center;
    font-size: 12px;
    margin-top: 18px;
  }
}
</style>