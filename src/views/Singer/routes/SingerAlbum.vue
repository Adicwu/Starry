<template>
  <BotLoadAudioList
    class="singer-album"
    type="list"
    :data="detail.list"
    :listid="detail.id"
    :perpage="10"
    v-if="loadflag"
  >
    <BreakHeader fixed />
    <SdBanner :detail="detail" />
    <div class="_shower">
      <div class="_contain-title">
        <van-icon name="play-circle-o" />播放全部
        <span>（共{{ detail.list.length }}首）</span>
      </div>
      <div class="_contain-tips">
        <van-icon :name="muscicStatus" />
        <p class="text-truncate">
          继续播放：
          <a v-if="hasCurMusic">{{ curMusicName }}</a>
        </p>
        <van-icon name="cross" />
      </div>
    </div>
  </BotLoadAudioList>
</template>

<script>
import { singerAlbum } from "apis/singer";
import SdBanner from "./child/SdBanner";
export default {
  name: "singeralbum",
  components: {
    SdBanner
  },
  data() {
    return {
      detail: {},
      loadflag: false,
      curlist: [],
      sdPopup: {
        info: {},
        flag: false
      }
    };
  },
  computed: {
    detailId() {
      return this.$route.query.id;
    },
    curMusic() {
      return this.$store.getters.curMusic;
    },
    curMusicName() {
      let val = this.$store.state.music.curMusicInfo;
      return val ? val.name : "";
    },
    hasCurMusic() {
      return typeof this.curMusic != "undefined";
    },
    muscicStatus() {
      return this.$store.state.music.status === 0 ? "play" : "pause";
    }
  },
  watch: {
    detailId: {
      immediate: true,
      handler(newVal, oldVal) {
        newVal !== oldVal && this.mainRequest();
      }
    }
  },
  methods: {
    mainRequest() {
      singerAlbum(this.detailId).then(res => {
        console.log(res.data);
        let { album, songs } = res.data,
          albumTransNames = !album.transNames ? "" : `（${album.transNames[0]}）`;
        this.detail = {
          cover: album.picUrl,
          name: album.name + albumTransNames,
          list: songs,
          descrip: album.description,
          createDate: album.publishTime,
          id: album.id,
          singer: {
            name: album.artists[0].name,
            id: album.artists[0].id
          }
        };
        this.loadflag = true;
      });
    },
    currentlist(val) {
      this.curlist = val;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/default/singer_album.less";
</style>
