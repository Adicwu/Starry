<template>
  <ul class="user-friend-artistsub">
    <ArtistItem v-for="(item,index) in artists" :key="index" :detail="item" />
    <EmptyTextBox text="暂时还没有关注歌手嗷" v-if="artists.length===0" />
  </ul>
</template>

<script>
import { userAartistSub } from "apis/user";
import ArtistItem from "comps/item/ArtistItem";
export default {
  name: "UfAartistSub",
  components: {
    ArtistItem
  },
  props: {},
  inject: ["user"],
  data() {
    return {
      artists: []
    };
  },
  computed: {},
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      userAartistSub().then(res => {
        this.artists = res.data.data;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-friend-artistsub {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  & > li:last-child {
    margin-bottom: 220px;
  }
}
</style>