<template>
  <div class="home">
    <van-tabs
      v-model="nav.active"
      swipeable
      animated
      class="home-contain"
      color="rgba(0,0,0,0)"
      :background="navBackground"
      line-height="0"
    >
      <span class="nav-aside van-icon van-icon-bars" @click="openAside" slot="nav-left"></span>
      <span
        class="nav-aside van-icon van-icon-search"
        @click="toMainPage('/home/search')"
        slot="nav-right"
      ></span>
      <van-tab v-for="(item, index) in nav.list" :key="index" :title="item.text">
        <div :is="item.comp"></div>
      </van-tab>
    </van-tabs>
    <HomeAside ref="homeaside" v-if="user.flag" />
    <SongPopup />
    <transition enter-active-class="fade-ftin" leave-active-class="child-route-out">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Explore from "./child/Explore";
import SkySquare from "./child/SkySquare";
import UserCenter from "./child/UserCenter";
import Village from "./child/Village";
import HomeAside from "./child/HomeAside";
import SongPopup from "comps/popup/SongPopup";
export default {
  name: "home",
  components: {
    Explore,
    SkySquare,
    UserCenter,
    Village,
    HomeAside,
    SongPopup
  },
  inject: ["user"],
  data() {
    return {
      nav: {
        list: [
          { text: "我的", comp: "UserCenter" },
          { text: "发现", comp: "Explore" },
          { text: "云村", comp: "Village" },
          { text: "视频", comp: "SkySquare" }
        ],
        active: 0
      }
    };
  },
  computed: {
    navBackground() {
      return this.nav.active === 0
        ? "linear-gradient(to top,rgba(0,0,0,0),rgba(0,0,0,.4))"
        : "#000";
    },
  },
  mounted() {},
  methods: {
    openAside() {
      let key = this.$refs.homeaside;
      typeof key !== "undefined" && key.open();
	},
  }
};
</script>

<style lang="less" scoped>
@import "~styles/default/home.less";
</style>
