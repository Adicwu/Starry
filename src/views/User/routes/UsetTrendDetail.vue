<template>
  <div class="user-trend-detail">
    <BreakHeader title="动态" fixed color="#000" background="#fff" />
    <TrendItem class="_trend" :info="detail" :tool="false"/>
    <van-tabs
      v-model="nav.active"
      class="_tools"
      swipeable
      animated
      background="rgba(0,0,0,0)"
      sticky
      :offset-top="48"
      v-if="flags.load"
    >
      <van-tab :title="nav.list[0].text">
        <UtdChat :detail="detail" />
      </van-tab>
      <van-tab :title="nav.list[1].text">
        <UtdForward />
      </van-tab>
      <van-tab :title="nav.list[2].text">
        <UtdPraise />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UtdChat from "./child/UtdChat";
import UtdPraise from "./child/UtdPraise";
import UtdForward from "./child/UtdForward";
import TrendItem from "comps/item/TrendItem";
export default {
  name: "usertrenddetail",
  components: {
    TrendItem,
    UtdChat,
    UtdPraise,
    UtdForward
  },
  data() {
    return {
      nav: {
        list: [
          { text: "评论", comp: "UtdChat" },
          { text: "转发", comp: "UtdForward" },
          { text: "赞", comp: "UtdPraise" }
        ],
        active: 0
      },
      flags: {
        load: true
      }
    };
  },
  computed: {
    detail() {
      return this.$route.query.detail || false;
    }
  },
  mounted() {
    // this.mainRequest();
  },
  methods: {
    mainRequest() {
      // this.$nextTick(e => {
      //   this.flags.load = true;
      // });
    }
  }
};
</script>
<style lang="less" scoped>
.user-trend-detail {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #fff;
  overflow-y: auto;
  ._trend {
    margin-top: 48px;
  }
  ._tools {
    width: 100%;
    & /deep/ .van-tabs__wrap {
      background: #fff;
      height: 40px;
      .van-tab {
        width: 70px;
        flex: unset;
      }
    }
  }
}
</style>