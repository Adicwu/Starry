<template>
  <PullRefresh :reloadFn="reloadPage" class="explore" v-if="flags.reload">
    <ExBanner @loaded="exBannerLoaded" />
    <transition enter-active-class="animated fadeIn">
      <div v-show="flags.elseBlock">
        <ExMvTop />
        <ExBoutiqueAudioList />
        <ExRmdRadiosStation />
      </div>
    </transition>
  </PullRefresh>
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
    ExBoutiqueAudioList,
  },
  data() {
    return {
      flags: {
        reload: true,
        elseBlock: false,
      },
    };
  },
  mounted() {
    // this.mainRequest();
  },
  methods: {
    mainRequest() {
      return new Promise((resolve) => {
        resolve();
      });
    },
    reloadPage() {
      this.flags.reload = false;
      return new Promise((resolve) => {
        setTimeout(() => {
          this.flags.reload = true;
        });
        resolve();
      });
    },
    exBannerLoaded(res) {
      this.flags.elseBlock = res;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~styles/default/explore";
</style>
