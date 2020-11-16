<template>
  <BotLoadRequest
    class="song-comment"
    offset
    :perpage="14"
    :request="bLRConfig.fn"
    :resword="bLRConfig.resword"
  >
    <BreakHeader
      class="song-comment__header"
      fixed
      :title="pageTitle"
      color="#000"
      background="#fff"
    />
    <div class="song-comment__banner" @click.stop="toPlay">
      <div class="song-comment__banner-cover">
        <img :src="songCover" alt v-show="hasSongs" />
      </div>
      <div class="song-comment__banner-text">
        <p>{{songTitle}}</p>
        <span>{{songArs}}</span>
      </div>
      <van-icon name="arrow" />
    </div>
    <div class="song-comment__nav">
      <span>评论区</span>
      <ul>
        <li
          v-for="(item,index) in nav"
          :key="index"
          :class="{'_active':index===comment.tips.index}"
          @click="comment.tips.index=index"
        >{{item}}</li>
      </ul>
    </div>
    <template #contain="{curdata}">
      <ul v-loading="!flags.load">
        <CommentlistCard v-for="item in curdata" :key="item.id" :info="item" />
      </ul>
    </template>
  </BotLoadRequest>
</template>

<script>
import { songComment, songDetail } from "apis/song";
import { hotComment } from "apis/else";
import CommentlistCard from "comps/card/CommentlistCard";
export default {
  name: "SongComment",
  components: {
    CommentlistCard
  },
  data() {
    return {
      comment: {
        total: 0,
        tips: {
          list: ["hot", "new"],
          index: 0
        }
      },
      nav: ["最热", "最新"],
      songs: {},
      flags: {
        load: false
      }
    };
  },
  computed: {
    pageId() {
      return this.$route.query.id;
    },
    pageTitle() {
      return `评论 (${this.comment.total})`;
    },
    hasSongs() {
      return typeof this.songs.name !== "undefined";
    },
    songCover() {
      if (!this.hasSongs) return "";
      let { al } = this.songs;
      return `${al.picUrl}?param=300y300`;
    },
    songTitle() {
      if (!this.hasSongs) return "";
      let { alia, name } = this.songs;
      return `${name}（${alia[0]}）`;
    },
    songArs() {
      if (!this.hasSongs) return "";
      let { ar } = this.songs;
      return ar.map(item => item.name).join("/");
    },
    bLRConfig() {
      let { list, index } = this.comment.tips,
        reswords = ["hotComments", "comments"];
      return {
        fn: this[`${list[index]}Comment`],
        resword: reswords[index]
      };
    }
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    async mainRequest() {
      await songDetail(this.pageId).then(res => {
        this.songs = res.data.songs[0];
      });
      await songComment(this.pageId).then(res => {
        this.comment.total = res.data.total;
      });
      this.flags.load = true;
    },
    newComment(...args) {
      return new Promise((resolve, reject) => {
        songComment(this.pageId, ...args)
          .then(res => {
            let { comments } = res.data;
            resolve({
              data: { comments }
            });
          })
          .catch(reject);
      });
    },
    hotComment(...args) {
      return new Promise((resolve, reject) => {
        hotComment(this.pageId, 0, ...args)
          .then(res => {
            let { hotComments } = res.data;
            resolve({
              data: { hotComments }
            });
          })
          .catch(reject);
      });
    },
    toPlay() {
      // this.$router.go(-1);
      // this.$bus.emit('playerOpen');
    }
  }
};
</script>
<style lang="less" scoped>
.song-comment {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 999;
  &__header {
    z-index: 334;
  }
  &__banner {
    display: grid;
    grid-template-columns: 70px 1fr 30px;
    padding: 10px 16px;
    box-sizing: border-box;
    height: 90px;
    margin-top: 48px;
    &:active{
      .click-bg;
    }
    &-cover {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      background: #def;
      overflow: hidden;
    }
    &-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      overflow: hidden;
      p {
        font-size: 13px;
        padding-bottom: 4px;
        .p-truncate(2);
      }
      span {
        font-size: 12px;
        color: #1989fa;
      }
    }
    i {
      align-self: center;
      justify-self: flex-end;
      color: #717171;
    }
  }
  &__nav {
    position: sticky;
    top: 42px;
    padding-left: 16px;
    padding-right: 10px;
    box-sizing: border-box;
    background: #fff;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 6px solid #eee;
    z-index: 333;
    span {
      font-size: 14px;
      font-weight: 800;
    }
    ul {
      display: flex;
      font-size: 12px;
      li {
        padding: 0 8px;
        color: #717171;
        &._active {
          color: #000;
          font-weight: 800;
        }
        &:first-child {
          border-right: 1px solid #eee;
        }
      }
    }
  }
}
</style>