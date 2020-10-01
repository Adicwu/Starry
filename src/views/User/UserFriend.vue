<template>
  <div class="user-friend">
    <BreakHeader title="我的消息" class="_header" color="#000" />
    <van-tabs v-model="nav.active" class="user-friend-contain" swipeable animated>
      <van-tab v-for="(item,index) in nav.list" :key="index" :title="item.text">
        <div :is="item.comp"></div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UfFollows from "./child/UfFollows";
import UfFolloweds from "./child/UfFolloweds";
import UfAartistSub from "./child/UfAartistSub";

export default {
  name: "UserFriend",
  components: {
    UfFollows,
    UfFolloweds,
    UfAartistSub
  },
  props: {},
  data() {
    return {
      nav: {
        list: [
          { text: "歌手", comp: "UfAartistSub" },
          { text: "用户", comp: "UfFollows" },
          { text: "粉丝", comp: "UfFolloweds" }
        ],
        active: 0
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.user-friend {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 800;
  overflow: hidden;
  .user-friend-contain {
    width: 100%;
    height: 100%;
    overflow: hidden;

    & /deep/ .van-tabs__wrap {
      background: #fff;
      z-index: 33;
      &::after {
        border-top: none;
      }
      .van-tabs__line {
        width: 30px !important;
        border-radius: 14px;
      }
    }

    & /deep/.van-tabs__content {
      width: 100%;
      height: 100%;
      .van-tab__pane {
        position: absolute;
        height: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>