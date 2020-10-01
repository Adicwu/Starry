<template>
  <div class="song-detail">
    <BotLoadAudioList
      class="song-detail-inside"
      type="list"
      :data="detail.list"
      :listid="detail.id"
      :perpage="10"
      v-if="loadflag"
    >
      <BreakHeader fixed />
      <SdBanner :detail="detail" :isScroll="isScroll" />
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
  </div>
</template>

<script>
import { songlistDetail } from "apis/song";
import SdBanner from "./child/SdBanner";
export default {
  name: "songdetail",
  components: {
    SdBanner
  },
  data() {
    return {
      isScroll: false,
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
      songlistDetail(this.detailId).then(res => {
        let { playlist } = res.data;
        let rel = {
          cover: playlist.coverImgUrl,
          name: playlist.name,
          list: playlist.trackIds,
          playCount: playlist.playCount,
          descrip: playlist.description,
          id: playlist.id,
          creator: {
            avatar: playlist.creator.avatarUrl,
            name: playlist.creator.nickname,
            userId: playlist.userId
          }
        };
        this.detail = { ...rel };
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
@import "~styles/default/song_detail";
</style>
