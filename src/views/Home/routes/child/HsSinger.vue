<template>
  <div class="home-search-singer">
      <ArtistItem v-for="(item,index) in artists" :key="index" :detail="item" />
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
}
</style>