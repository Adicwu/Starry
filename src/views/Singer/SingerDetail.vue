<template>
  <div class="singer-detail">
    <BreakHeader fixed class="_header">
      <transition enter-active-class="slideInUp" leave-active-class="slideOutUp">
        <div class="_header-tool" v-show="flags.userinfo">
          <div class="_header-tool-info">
            <b>{{ singer.detail.name }}</b>
            <p v-if="!isLogged">{{singer.detail.musicSize}} 音乐数量</p>
          </div>
          <span v-if="!isLogged">+ 关注</span>
        </div>
      </transition>
    </BreakHeader>
    <div class="singer-detail-cover" ref="cover" :class="{'active':flags.cover}">
      <img :src="singer.detail.picUrl+'?param=700y700'" alt />
      <transition enter-active-class="slideInDown" leave-active-class="slideOutUp">
        <div class="_contain" v-show="!flags.userinfo">
          <div>
            <b>{{singer.detail.name}}</b>
            <p>音乐数量 {{singer.detail.musicSize}}</p>
          </div>
          <span>+ 关注</span>
        </div>
      </transition>
    </div>
    <transition enter-active-class="animated fadeIn">
      <van-tabs
        v-model="nav.active"
        class="singer-detail-contain"
        swipeable
        animated
        background="rgba(0,0,0,0)"
        sticky
        :offset-top="48"
        @scroll="scrollHandler"
        v-if="flags.load"
      >
        <van-tab :title="nav.list[0].text">
          <SdHome :singer="singer" :changeNav="changeNav" />
        </van-tab>
        <van-tab :title="nav.list[1].text">
          <SdSong :artists="singer.artists" />
        </van-tab>
        <van-tab :title="nav.list[2].text">
          <SdAlbum />
        </van-tab>
        <van-tab :title="nav.list[3].text">
          <SdMv />
        </van-tab>
      </van-tabs>
    </transition>
  </div>
</template>

<script>
import { singerDesc, singerArtists } from "apis/singer";
import SdHome from "./child/SdHome";
import SdSong from "./child/SdSong";
import SdAlbum from "./child/SdAlbum";
import SdMv from "./child/SdMv";

export default {
  name: "singerdetail",
  components: {
    SdHome,
    SdSong,
    SdAlbum,
    SdMv
  },
  inject: ["user"],
  provide() {
    return {
      nav: this.nav
    };
  },
  data() {
    return {
      nav: {
        list: [
          { text: "主页", comp: "SdHome" },
          { text: "歌曲", comp: "SdSong" },
          { text: "专辑", comp: "SdAlbum" },
          { text: "视频", comp: "SdMv" }
        ],
        active: 0
      },
      singer: {
        desc: {},
        artists: [],
        hotThree: [],
        cover: "",
        detail: {}
      },
      flags: {
        load: false,
        cover: false,
        userinfo: false
      }
    };
  },
  computed: {
    pageId() {
      return this.$route.query.id;
    },
    isLogged() {
      let { flag, userid } = this.user;
      return flag;
    }
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset() {
      let { pageId } = this;
      Promise.all([singerDesc(pageId), singerArtists(pageId)]).then(res => {
        let { artist, hotSongs } = res[1].data;
        this.singer.desc = res[0].data;
        this.singer.artists = hotSongs;
        this.singer.detail = artist;
        this.singer.hotThree = hotSongs.slice(0, 3);
        this.flags.load = true;

        setTimeout(e => (this.flags.cover = true), 2000);
      });
    },
    scrollHandler(key) {
      this.flags.userinfo != key.isFixed && (this.flags.userinfo = key.isFixed);
    },
    changeNav(val) {
      this.nav.active = val;
    },
    anmCounter() {
      if (!this.hasPos) return;
      let { cover } = this.$refs;
      this.anmHandler(cover, this.enterCover, cover.getBoundingClientRect());
    },
    anmHandler(dom, pos, oldpos) {
      let [xdistance, ydistance] = [pos.x - oldpos.x, pos.y - oldpos.y];
      let keyframes = [
        {
          transform: `translate3d(${xdistance}px, ${ydistance}px,0)`,
          width: `${pos.width}px`,
          height: `${pos.height}px`
        },
        {
          transform: "translate3d(0,0,0)",
          width: `${oldpos.width}px`,
          height: `${oldpos.height}px`
        }
      ];
      const options = {
        duration: 400
      };
      dom.animate(keyframes, options);
    }
  }
};
</script>
<style lang="less" scoped>
@import "~styles/default/singer_detail";
</style>