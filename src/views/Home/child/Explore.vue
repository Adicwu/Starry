<template>
  <div class="explore" v-scroll-top="scrollTop" v-if="reloadflag">
    <PullRefresh :reloadFn="reloadPage" :disabled="isScrollTop">
      <ExBanner />
      <ExMvTop />
      <ExBoutiqueAudioList />
      <ExRmdRadiosStation />
    </PullRefresh>
  </div>
</template>

<script>
import { hotSonglist } from "apis/song";
import ExBanner from "./child/ExBanner";
import ExMvTop from "./child/ExMvTop";
import ExRmdRadiosStation from "./child/ExRmdRadiosStation";
import ExBoutiqueAudioList from "./child/ExBoutiqueAudioList";
export default {
  name: "explore",
  components: {
    ExBanner,
    ExRmdRadiosStation,
    ExMvTop,
    ExBoutiqueAudioList
  },
  data() {
    return {
      isScrollTop: true,
      reloadflag: true
    };
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      return new Promise(resolve => {
        resolve();
      });
    },
    reloadPage() {
      this.reloadflag = false;
      return new Promise(resolve => {
        setTimeout(() => {
          this.reloadflag = true;
        });
        resolve();
      });
    },
    scrollTop(val) {
      this.isScrollTop = val;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/default/explore";
</style>
