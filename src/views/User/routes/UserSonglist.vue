<template>
  <div class="user-songlist">
    <BreakHeader title="歌单" color="#000" />
    <van-tabs
      v-model="nav.active"
      class="user-songlist-contain"
      swipeable
      animated
      background="rgba(0,0,0,0)"
      :offset-top="48"
      v-if="flags.load"
      @click="tabClick"
    >
      <van-tab v-for="(item,index) in nav.list" :key="index" :title="item.text">
        <BotLoad class="_lazyload" :perpage="10" :data="item.data">
          <p>-- 共{{item.data.length}}个 --</p>
          <template #contain="{curdata}">
            <SonglistItem
              v-for="item in curdata"
              :cover="item.coverImgUrl"
              :key="item.id"
              :title="item.name"
              :id="item.id"
            >{{ item.trackCount }}首，by{{ item.creator.nickname }}，播放{{ item.playCount | numFormat }}次</SonglistItem>
          </template>
        </BotLoad>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { userPlaylist } from "apis/user";
import SonglistItem from "comps/item/SonglistItem";
export default {
  name: "usersonglist",
  components: {
    SonglistItem
  },
  data() {
    return {
      flags: {
        load: false
      },
      nav: {
        list: [
          { text: "创建的歌单", data: [] },
          { text: "收藏的歌单", data: [] }
        ],
        active: 0
      },
      list: []
    };
  },
  computed: {
    userId() {
      return this.$route.query.id;
    },
    pageType() {
      return this.$route.query.type || 0;
    }
  },
  mounted() {
    this.nav.active = this.pageType;
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      userPlaylist(this.userId).then(res => {
        this.list = res.data.playlist;
        this.blockDataInit();
        this.flags.load = true;
      });
    },
    blockDataInit() {
      this.list.forEach(item => {
        let key = item.creator.userId == this.userId ? 0 : 1;
        this.nav.list[key].data.push(item);
      });
    },
    tabClick(type) {
      let { path, query } = this.$route;
      if (type === query.type) return;
      this.$router.replace({
        path,
        query: {
          ...query,
          type
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-songlist {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #fff;
  .user-songlist-contain {
    height: calc(100% - 48px);
    & /deep/ .van-tabs__content {
      height: calc(100% - 44px);
      .van-tab__pane {
        position: absolute;
        height: 100%;
      }
    }
    ._lazyload {
      p {
        position: sticky;
        top: 0;
        margin: 10px 20px;
        font-size: 14px;
        font-weight: 800;
        text-align: center;
      }
    }
  }
}
</style>