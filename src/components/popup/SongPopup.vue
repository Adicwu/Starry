<template>
  <van-popup
    class="song-popup"
    v-model="show"
    round
    position="bottom"
    @close="closePopup"
    v-prevent-back="closePopup"
  >
    <div class="_header" v-if="hasInfo">
      <img :src="info.al.picUrl" alt />
      <div>
        <p class="paragraph-truncate">歌曲：{{info.name}}</p>
        <span class="text-truncate">{{singers}}</span>
      </div>
    </div>
    <ul class="_contain" v-if="hasInfo">
      <li v-for="(item,index) in controls" :key="index" @click="controlsHandler(item.fn)">
        <span :class="item.icon"></span>
        <div class="text-truncate">{{item.text}}</div>
      </li>
    </ul>
    <MovableMask
      get-container="#app"
      v-model="singer.selectVisiable"
      v-prevent-back="closeSingerSelector"
    >
      <RadioItems v-model="singer.selectId">
        <SingerRadioItem
          v-for="(item,index) in singer.selectList"
          :name="index"
          :key="item.id"
          @click.native="singerHandler"
        >{{item.name}}</SingerRadioItem>
      </RadioItems>
    </MovableMask>
  </van-popup>
</template>

<script>
import RadioItems from "comps/form/RadioItems";
import SingerRadioItem from "comps/item/SingerRadioItem";
import MovableMask from "../common/MovableMask";

export default {
  name: "songpopup",
  components: {
    RadioItems,
    SingerRadioItem,
    MovableMask
  },
  data() {
    return {
      show: false,
      singer: {
        selectId: 0,
        selectList: [],
        selectVisiable: false
      },
      controls: [
        {
          icon: "van-icon van-icon-play-circle-o",
          text: "下一首播放",
          fn: "nextPlay"
        },
        {
          icon: "van-icon van-icon-star-o",
          text: "收藏到歌单",
          fn: "empys"
        },
        {
          icon: "fa fa-download",
          text: "下载",
          fn: "downLoad"
        },
        {
          icon: "van-icon van-icon-chat-o",
          text: "评论",
          fn: "empys"
        },
        {
          icon: "fa fa-share-alt",
          text: "分享",
          fn: "empys"
        },
        {
          icon: "van-icon van-icon-contact",
          text: "歌手：",
          fn: "toSinger"
        },
        {
          icon: "fa fa-eercast",
          text: "专辑",
          fn: "toAlbum"
        },
        {
          icon: "van-icon van-icon-tv-o",
          text: "相关视频",
          fn: "toMv"
        },
        {
          icon: "van-icon van-icon-delete",
          text: "删除",
          fn: "empys"
        }
      ],
      info: {}
    };
  },
  computed: {
    singers() {
      return this.info.ar.map(item => item.name).join("/");
    },
    hasInfo() {
      return Object.keys(this.info).length != 0;
    }
  },
  watch: {
    info(val) {
      this.dataInit(val);
    }
  },
  mounted() {
    this.initBus();
  },
  beforeDestroy() {
    this.removeBus();
  },
  methods: {
    initBus() {
      this.$bus.on("openSongPopup", this.openSongPopup);
    },
    removeBus() {
      this.$bus.off("openSongPopup", this.openSongPopup);
    },
    openSongPopup(val) {
      this.show = true;
      this.info = val;
    },
    dataInit(val) {
      this.controls[5].text = `歌手：${this.singers}`;
      this.controls[6].text = `专辑：${val.al.name}`;
    },
    controlsHandler(key) {
      this[key]();
      this.closePopup();
    },
    toMv() {
      let key = this.info.mv;
      if (key === 0) return this.$toast("此音乐莫有mv");
      this.toMainPage("/home/mvdetail", key);
    },
    toSinger() {
      let singer_list = this.info.ar;
      if (singer_list.length > 1) {
        this.singer.selectVisiable = true;
        this.singer.selectList = singer_list;
      } else {
        this.toMainPage("/home/singerdetail", this.info.ar[0].id);
      }
    },
    toAlbum() {
      let key = this.info.al.id;
      if (typeof key === "undefined") return this.$toast("此音乐莫有专辑");
      this.toMainPage("/home/singeralbum", key);
    },
    closeSingerSelector() {
      this.singer.selectVisiable = false;
    },
    singerHandler() {
      let { selectId, selectList } = this.singer;
      this.closeSingerSelector();
      this.toMainPage("/home/singerdetail", selectList[selectId].id);
    },
    nextPlay() {
      let { v, id, name } = this.info;
      let rel = this.$store.commit("insertNextItem", {
        alg: null,
        at: null,
        id,
        v
      });
      this.$toast(`下一首播放，${name}`);
    },
    downLoad() {},
    empys() {
      this.$toast("开发中..");
    },
    closePopup() {
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.song-popup {
  height: 75%;
  ._header {
    box-sizing: border-box;
    padding: 16px;
    display: grid;
    grid-template-columns: 60px 1fr;
    width: 100%;
    height: 92px;
    border-bottom: 1px solid #eee;
    img {
      border-radius: 6px;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0 10px;
      overflow: hidden;
      p {
        width: 100%;
        font-size: 14px;
        margin-bottom: 4px;
      }
      span {
        color: #999;
        font-size: 12px;
        height: 14px;
      }
    }
  }
  ._contain {
    width: 100%;
    height: calc(100% - 60px);
    overflow: auto;
    li {
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 9vw 1fr;
      width: 100%;
      height: 12vw;
      padding: 0 16px;
      &:last-child {
        margin-bottom: 80px;
      }
      &:active {
        background: rgba(0, 0, 0, 0.1);
      }
      span {
        align-self: center;
        justify-self: flex-start;
        &.fa {
          font-size: 20px;
        }
        &.van-icon {
          font-size: 21px;
        }
      }
      div {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        text-indent: 8px;
        font-size: 13px;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>