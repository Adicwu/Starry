<template>
  <div class="myplaylsit">
    <van-tabs v-model="nav.active" animated background="rgba(0,0,0,0)" v-if="loadflag">
      <van-tab v-for="(item, index) in nav.list" :key="index">
        <template #title>
          {{ item.text }}
          <a>{{ item.data.length }}</a>
        </template>
        <div class="myplaylsit-contain">
          <PlaylistSmCard v-for="(item, index) in item.data" :info="item" :key="index" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { userPlaylist } from "apis/user";
import PlaylistSmCard from "comps/card/PlaylistSmCard";
export default {
  name: "myplaylsit",
  inject: ["user"],
  components: {
    PlaylistSmCard
  },
  data() {
    return {
      playlist: [],
      nav: {
        active: 0,
        list: [
          {
            text: "创建歌单",
            data: []
          },
          {
            text: "收藏歌单",
            data: []
          }
        ]
      },
      loadflag: false
    };
  },
  watch: {
    createPlaylist(val) {
      this.nav.list[0].data = val;
    },
    collectPlaylist(val) {
      this.nav.list[1].data = val;
    }
  },
  computed: {
    createPlaylist() {
      return this.playlist.filter(
        (item, index) => item.creator.userId == this.user.userid && index != 0
      );
    },
    collectPlaylist() {
      return this.playlist.filter(
        (item, index) => item.creator.userId != this.user.userid
      );
    }
  },
  mounted() {
    userPlaylist(this.user.userid).then(res => {
      this.playlist = res.data.playlist;
      this.loadflag = true;
    });
  }
};
</script>

<style lang="less" scoped>
.myplaylsit {
  margin-top: 20px;
  width: 100%;
  b {
    padding-left: 16px;
  }
  /deep/.van-tabs__wrap {
    position: unset !important;
    width: unset !important;
    z-index: unset !important;
    .van-tab__text > a {
      font-size: 0.75rem;
    }
  }
  /deep/.van-tabs__content {
    width: unset !important;
    height: unset !important;
    .van-tab__pane {
      position: unset !important;
      height: unset !important;
      overflow: unset !important;
    }
  }
  .myplaylsit-contain {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    box-sizing: border-box;
    padding: 0 10px;
    margin-top: 10px;
  }
}
</style>
