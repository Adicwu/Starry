<template>
  <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
    <div
      class="tab-player"
      ref="tabplayer"
      :class="{ '_active-contain': switchflag }"
      @click="switchflag = true"
      v-show="containflag"
    >
      <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
        <div
          class="_banner"
          v-show="switchflag"
          :style="{ backgroundImage: `url(${curMusicCover})` }"
        ></div>
      </transition>
      <div
        class="_info"
        v-show="!lyricflag"
        :class="{ '_active-info': switchflag }"
      >
        <p :class="[switchflag ? 'paragraph-truncate' : 'text-truncate']">
          {{ musicName }}
        </p>
        <p class="text-truncate" @click="toSingerDetail">{{ singerName }}</p>
      </div>
      <TpCover v-show="!lyricflag" />
      <TpCricleProgress ref="tpcprogress" v-show="switchflag && !lyricflag" />

      <TpControl v-show="!lyricflag" />
      <div class="_tools" v-show="!lyricflag && switchflag">
        <TpProgress
          :audio="audio"
          :dom="$refs.myaudio"
          :visiable="!lyricflag && switchflag"
        />
        <TpTools :song="curMusic" />
      </div>
      <TpLyric v-show="lyricflag" />
      <TpLists v-show="switchflag" @visiable="tpListsVisiable" ref="tplists" />

      <MovableMask
        get-container="#app"
        v-model="singer.selectVisiable"
        v-prevent-back="closeSingerSelector"
      >
        <RadioItems v-model="singer.selectId">
          <SingerRadioItem
            v-for="(item, index) in singer.selectList"
            :name="index"
            :key="item.id"
            @click.native="singerHandler"
            >{{ item.name }}</SingerRadioItem
          >
        </RadioItems>
      </MovableMask>

      <audio :src="musicUrl" id="myaudio" ref="myaudio" />
    </div>
  </transition>
</template>

<script>
import TpLists from "./child/TpLists";
import TpCricleProgress from "./child/TpCricleProgress";
import TpControl from "./child/TpControl";
import TpCover from "./child/TpCover";
import TpLyric from "./child/TpLyric";
import TpProgress from "./child/TpProgress";
import TpTools from "./child/TpTools";
import RadioItems from "comps/form/RadioItems";
import SingerRadioItem from "comps/item/SingerRadioItem";
import MovableMask from "../common/MovableMask";

export default {
  name: "tabplayer",
  components: {
    TpLists,
    TpCricleProgress,
    TpControl,
    TpProgress,
    TpCover,
    TpLyric,
    TpTools,
    RadioItems,
    MovableMask,
    SingerRadioItem,
  },
  inject: ["user"],
  data() {
    return {
      containflag: true,
      eventflag: false,
      switchflag: false,
      tpListsflag: false,
      cover: {
        y: -20,
        x: -46,
      },
      audio: {
        total: 0,
        current: 0,
      },
      screen: {
        width: 0,
      },
      lyricflag: false,
      singer: {
        selectId: 0,
        selectList: [],
        selectVisiable: false,
      },
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        const excludes = ["/home/mvdetail", "/home/userdetail/usersonglist"];
        this.containflag = !excludes.includes(val.path);
      },
    },
    musicUrl: {
      immediate: true,
      handler(val) {
        if (val != null && !this.eventflag) {
          this.$nextTick(() => {
            this.monitorMusic();
            this.eventflag = true;
          });
        }
      },
    },
    switchflag: {
      immediate: true,
      handler(val) {
        this.screenAnmHandler(val);
        this.$store.commit("changePlayerFlag", val);
      },
    },
    breakFlags(newRes) {
      let key = this.compareLastUnsame(newRes, [false, false, false]);
      let fn = ["close", "closeTpLists", "closeLyric"][key];
      if (key != -1) {
        if (window.history.state != "playerbreak") {
          window.history.pushState("playerbreak", null, null);
        }
        window.onpopstate = this[fn];
      }
    },
  },
  computed: {
    musicUrl() {
      return this.$store.state.music.cururl;
    },
    muscicStatus() {
      return this.$store.state.music.status === 0 ? "play" : "pause";
    },
    curMusic() {
      return this.$store.state.music.curMusicInfo;
    },
    fullMusicName() {
      let info = this.curMusic;
      if (info == null) return "";
      let remark_name = info.alia[0],
        singer = info.ar.map((item) => item.name).join("/");
      return typeof remark_name != "undefined"
        ? `${info.name}(${remark_name}) - ${singer}`
        : `${info.name} - ${singer}`;
    },
    singerName() {
      let info = this.curMusic;
      if (info == null) return "";
      let singer = info.ar.map((item) => item.name).join("/");
      return singer;
    },
    singerId() {
      let info = this.curMusic;
      if (info == null) return "";
      return info.ar[0].id;
    },
    musicName() {
      let info = this.curMusic;
      if (info == null) return "";
      let remark_name = info.alia[0];
      return typeof remark_name != "undefined"
        ? `${info.name}(${remark_name})`
        : `${info.name}`;
    },
    curMusicCover() {
      let size = "?param=711y400",
        dfPath =
          "http://p1.music.126.net/Vxsf58sMyNjqnWVZa9Wbfw==/18991864347187831.jpg";
      return this.curMusic != null
        ? this.curMusic.al.picUrl + size
        : dfPath + size;
    },
    breakFlags() {
      return [this.switchflag, this.tpListsflag, this.lyricflag];
    },
  },
  mounted() {
    this.screen.width = window.innerWidth;
    this.$bus.on("playerOpen", this.open);
  },
  beforeDestroy() {
    this.$refs.myaudio.removeEventListener(
      "timeupdate",
      this.progressBarHandler
    );
    this.$bus.off("playerOpen", this.open);
  },
  methods: {
    monitorMusic() {
      let dom = this.$refs.myaudio;
      dom.volume = this.$store.state.music.volume;
      dom.addEventListener("timeupdate", this.progressBarHandler);
    },
    progressBarHandler(e) {
      let dom = e.target;
      this.audio.total != dom.duration &&
        (this.audio.total = dom.duration.toFixed(2));
      this.audio.current = dom.currentTime.toFixed(2);
      this.$refs.tpcprogress.canvasInit();
    },
    toSingerDetail(e) {
      if (!this.switchflag) return;
      e.stopPropagation();
      let singer_list = this.curMusic.ar;
      if (singer_list.length > 1) {
        this.singer.selectVisiable = true;
        this.singer.selectList = singer_list;
      } else {
        this.close();
        this.toMainPage("/home/singerdetail", this.singerId);
      }
    },
    singerHandler() {
      let { selectId, selectList } = this.singer;
      this.closeSingerSelector();
      this.close();
      this.toMainPage("/home/singerdetail", selectList[selectId].id);
    },
    closeSingerSelector() {
      this.singer.selectVisiable = false;
    },
    close() {
      this.switchflag = false;
    },
    open() {
      this.switchflag = true;
    },
    closeLyric() {
      this.lyricflag = false;
    },
    closeTpLists() {
      this.$refs.tplists.close();
    },
    openLyric() {
      this.lyricflag = true;
    },
    dfBreak() {
      window.history.back();
    },
    compareLastUnsame(arr1, arr2) {
      let res = -1;
      arr1.forEach((item, index) => {
        if (item != arr2[index]) {
          res = index;
        }
      });
      return res;
    },
    tpListsVisiable(val) {
      this.tpListsflag = val;
    },
    screenAnmHandler(val) {
      if (val) {
        let tabplayer = this.$refs.tabplayer;
        let cover = this.$refs.cover;
        this.cover.x = -((tabplayer.clientWidth - 240) / 2);
        this.cover.y = -(window.innerHeight - 240 - 50);
      } else {
        this.cover.x = -46;
        this.cover.y = -20;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./tabplayer";
</style>
