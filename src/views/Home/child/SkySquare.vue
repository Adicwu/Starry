<template>
  <BotLoadRequest
    class="skysquare"
    :request="newMv"
    resword="data"
    @breakdata="curlistHandler"
    v-scroll-top="scrollTop"
  >
    <PullRefresh :reloadFn="mainRequest" :disabled="isScrollTop">
      <SsRmdMv />
      <MvLgCard v-for="(item, index) in mv.curlist" :info="item" :key="index" />
    </PullRefresh>
  </BotLoadRequest>
</template>

<script>
import { newMv, rmdMv, rankMv } from "apis/mv";
import SsRmdMv from "./child/SsRmdMv";
import MvLgCard from "comps/card/MvLgCard";
export default {
  name: "skysquare",
  components: {
    SsRmdMv,
    MvLgCard
  },
  data() {
    return {
      mv: {
        list: [],
        curlist: []
      },
      isScrollTop: true,
      loadflag: false
    };
  },
  computed: {},
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      return new Promise(resolve => {
        resolve();
      });
    },
    scrollTop(val) {
      this.isScrollTop = val;
    },
    curlistHandler(val) {
      this.mv.curlist = val;
    },
    newMv(key) {
      return newMv(key);
    }
  }
};
</script>

<style lang="less" scoped>
.skysquare {
  width: 100%;
  height: 100%;
  background: #000;
  padding-top: 44px;
  box-sizing: border-box;
  overflow-y: scroll;
}
</style>
