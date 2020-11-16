<template>
  <div id="app">
    <transition leave-active-class="animated fadeOut">
      <div class="app-banner" v-if="!load.flag">
        <img src="~static/img/m-music-banner.jpg" alt />
        <span>加载中 {{ load.time }}s</span>
      </div>
    </transition>
    <transition :name="transitionName">
      <keep-alive :exclude="routeExclude">
        <router-view />
      </keep-alive>
    </transition>
    <AAleart />
    <RequestLoader :visiable="!$store.state.loading" />
    <TabPlayer />
  </div>
</template>
<script>
import AAleart from "comps/common/AAleart";
import RequestLoader from "comps/common/RequestLoader";
import TabPlayer from "comps/player/TabPlayer";
export default {
  name: "app",
  components: {
    AAleart,
    RequestLoader,
    TabPlayer
  },
  provide() {
    return {
      user: this.$store.state.user
    };
  },
  data() {
    return {
      transitionName: "",
      routeExclude: "",
      load: {
        time: 3,
        flag: true
      }
    };
  },
  watch: {
    $route(to, from) {
      let routers = ["/", "/home", "/login"];
      let toDepth = routers.indexOf(to.path);
      let fromDepth = routers.indexOf(from.path);
      if (toDepth === -1 || fromDepth === -1) return;
      this.transitionName = toDepth > fromDepth ? "flod-left" : "flod-right";
    }
  },
  mounted() {
    this.mainLoad();
    // this.appBreakLis();
  },
  methods: {
    appBreakLis() {
      document.addEventListener(
        "plusready",
        () => {
          var webview = plus.webview.currentWebview();
          var first = null;
          plus.key.addEventListener("backbutton", () => {
            webview.canBack(e =>
              e.canBack ? webview.back() : webview.close()
            );
            if (this.$route.path == "home" || this.$route.path == "/") {
              if (!first) {
                first = new Date().getTime();
                plus.nativeUI.toast("再按一次退出程序");
                setTimeout(() => (first = null), 1000);
              } else {
                if (new Date().getTime() - first < 1000) plus.runtime.quit();
              }
            }
          });
        },
        false
      );
    },
    mainLoad() {
      let timer = setInterval(e => {
        if (this.load.time-- === 0) {
          clearInterval(timer);
          this.load.flag = true;
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less">
@import "~styles/common/common.less";
@import "~styles/common/ad_animate.css";
@import "~styles/default/app.less";
</style>
