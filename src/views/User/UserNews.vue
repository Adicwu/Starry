<template>
  <div class="user-news">
    <BreakHeader title="我的消息" class="_header" color="#000" />
    <van-tabs v-model="nav.active" class="user-news-contain" swipeable animated>
      <van-tab v-for="(item,index) in nav.list" :key="index" :title="item.text">
        <div :is="item.comp"></div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UnPrivate from "./child/UnPrivate";
import UnComments from "./child/UnComments";
import UnForwards from "./child/UnForwards";
import UnNotices from "./child/UnComments";
export default {
  name: "UserNews",
  components: {
    UnPrivate,
    UnComments,
    UnForwards,
    UnNotices
  },
  props: {},
  data() {
    return {
      nav: {
        list: [
          { text: "私信", comp: "UnPrivate" },
          { text: "评论", comp: "UnComments" },
          { text: "@我", comp: "UnForwards" },
          { text: "通知", comp: "UnNotices" }
        ],
        active: 0
      }
    };
  }
};
</script>
<style lang="less" scoped>
.user-news {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 800;
  overflow: hidden;
  .user-news-contain {
    width: 100%;
    height: 100%;
    overflow: hidden;

    & /deep/ .van-tabs__wrap {
      background: #fff;
      z-index: 33;
      &::after {
        border-top: none;
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