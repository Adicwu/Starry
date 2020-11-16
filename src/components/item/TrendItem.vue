<template>
  <div class="trend-item" @click="toMain(info)">
    <div class="_title">
      <img
        :src="info.user.avatarUrl + squareImgSize"
        v-if="info.user.avatarUrl"
        alt
        @click.stop="toUser(info.user.userId)"
      />
      <div>
        <p>
          <a @click.stop="toUser(info.user.userId)">{{ info.user.nickname }}</a>
          {{ anneType }}
        </p>
        <span>{{ info.eventTime | dateFormat }}</span>
      </div>
    </div>
    <div class="contain">
      <pre class="_msg" v-html="info.pjson.msg"></pre>
      <div class="_cover" v-if="annexPics.length > 0">
        <div
          :class="[annexPics.length > 1 ? '_cover-item' : '_cover-one']"
          v-for="(item, index) in annexPics"
          :key="index"
        >
          <img :src="item.originUrl" alt />
        </div>
      </div>
      <div
        class="_list"
        v-if="annexList"
        @click.stop="toMainPage('/home/songdetail', annexList.id)"
      >
        <img :src="annexList.coverImgUrl + squareImgSize" alt />
        <div>
          <p>{{ annexList.name }}</p>
          <span>by {{ annexList.creator.nickname }}</span>
        </div>
      </div>
      <div class="_song" v-if="annexSong" @click.stop="playMusic(annexSong.id)">
        <span>
          <img :src="annexSongCover + squareImgSize" alt />
          <i class="van-icon van-icon-play"></i>
        </span>
        <div>
          <p class="text-truncate">{{ annexSong.name }}</p>
          <span>{{ annexSong.artists[0].name }}</span>
        </div>
      </div>
      <div class="_event" v-if="annexEvent" @click.stop="toMain(annexEvent)">
        <div class="_event-msg">
          <a @click.stop="toUser(annexEvent.user.userId)"
            >@{{ annexEvent.user.nickname }}:</a
          >
          <pre class="_msg" :style="{ textIndent: annexEventMsgIndent }">{{
            annexEvent.pjson.msg
          }}</pre>
        </div>
        <div class="_event-cover _cover" v-if="annexEventPics.length > 0">
          <div
            :class="[annexEventPics.length > 1 ? '_cover-item' : '_cover-one']"
            v-for="(item, index) in annexEventPics"
            :key="index"
          >
            <img :src="item.originUrl" alt />
          </div>
        </div>
        <div
          class="_event-list _list"
          v-if="annexEventList"
          @click.stop="toMainPage('/home/songdetail', annexEventList.id)"
        >
          <img :src="annexEventList.coverImgUrl + squareImgSize" alt />
          <div>
            <p>{{ annexEventList.name }}</p>
            <span>by {{ annexEventList.creator.nickname }}</span>
          </div>
        </div>
        <div
          class="_event-song _song"
          v-if="annexEventSong"
          @click.stop="playMusic(annexEventSong.id)"
        >
          <span>
            <img :src="annexEventSongCover + squareImgSize" alt />
            <i class="van-icon van-icon-play"></i>
          </span>
          <div>
            <p class="text-truncate">{{ annexEventSong.name }}</p>
            <span>{{ annexEventSong.artists[0].name }}</span>
          </div>
        </div>
      </div>
      <ul class="_tools" v-if="tool">
        <li v-for="(item, index) in tools" :key="index">
          <i class="van-icon" :class="item.icon"></i>
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "trenditem",
  props: {
    info: Object,
    tool: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tools: [
        {
          icon: "van-icon-exchange",
          text: "转发",
        },
        {
          icon: "van-icon-chat-o",
          text: "评论",
        },
        {
          icon: "van-icon-good-job-o",
          text: "赞",
        },
      ],
    };
  },
  computed: {
    annexList() {
      return this.info.pjson.playlist;
    },
    annexSong() {
      return this.info.pjson.song;
    },
    annexPics() {
      return this.info.pics;
    },
    annexSongCover() {
      if (!this.annexSong) return false;
      let info = this.annexSong.album;
      return info.picUrl || info.img80x80;
    },
    annexEvent() {
      let val = this.info.pjson.event;
      if (typeof val !== "undefined") {
        val.pjson = JSON.parse(val.json);
        return val;
      } else {
        return false;
      }
    },
    annexEventPics() {
      return this.annexEvent ? this.annexEvent.pics : false;
    },
    annexEventList() {
      return this.annexEvent ? this.annexEvent.pjson.playlist : false;
    },
    annexEventSong() {
      return this.annexEvent ? this.annexEvent.pjson.song : false;
    },
    annexEventSongCover() {
      if (!this.annexEventSong) return false;
      let info = this.annexEventSong.album;
      return info.picUrl || info.img80x80;
    },
    annexEventMsgIndent() {
      if (!this.annexEvent) return false;
      return `${(this.annexEvent.user.nickname.length + 1) * 14 + 7}px`;
    },
    anneType() {
      let { annexList, annexSong, annexPics, annexEvent } = this,
        val = "";
      if (annexList) {
        val = "分享歌单：";
      } else if (annexSong) {
        val = "分享歌曲：";
      } else if (annexEvent) {
        val = "转发：";
      } else if (annexPics.length > 0) {
        val = "发布Mlog：";
      }
      return val;
    },
  },
  filters: {
    dateFormat(val) {
      let date = new Date(val),
        year = date.getFullYear(),
        now_year = new Date().getFullYear(),
        final_year = now_year - year >= 1 ? year + "年" : "";
      return `${final_year}${date.getMonth() + 1}月${date.getDate()}日`;
    },
  },
  mounted() {
    this.dataInit(this.info);
  },
  methods: {
    dataInit(val) {
      let keys = ["shareCount", "commentCount", "likedCount"];
      this.tools = this.tools.map((item, index) => {
        let count = val.info[keys[index]];
        count > 0 && (item.text = count);
        return item;
      });
    },
    playMusic(id) {
      let key = {
        info: {
          alg: null,
          id,
          v: null,
        },
        obj: {
          list: [],
          id: null,
          index: 0,
        },
      };
      this.$store.dispatch("newMusic", key).then((res) => {
        this.$bus.emit("playerOpen");
      });
    },
    toMain(detail) {
      let { id } = this.$route.query;
      this.$router.push({
        path: "/home/userdetail/trenddetail",
        query: { detail, id },
      });
    },
    toUser(id) {
      this.toMainPage("/home/userdetail", id);
    },
  },
};
</script>

<style scoped lang="less">
.trend-item {
  width: 100%;
  padding-bottom: 6px;
  user-select: none;
  ._title {
    display: grid;
    grid-template-columns: 40px 1fr;
    margin: 0 16px;
    padding-top: 20px;
    height: 40px;
    img {
      border-radius: 50%;
    }
    div {
      padding-left: 16px;
      color: #686868;
      p {
        font-size: 13px;
        a {
          color: #527baf;
          font-size: 15px;
        }
      }
      span {
        font-size: 10px;
        color: #999999;
      }
    }
  }
  .contain {
    margin-left: 72px;
    margin-right: 16px;
    ._msg {
      margin: 10px 0;
      font-size: 14px;
      white-space: pre-wrap;
    }
    ._cover {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      ._cover-item {
        position: relative;
        width: calc(50% - 10px);
        padding: calc(25% - 5px) 0;
        box-sizing: border-box;
        margin-right: 10px;
        margin-bottom: 10px;
        img {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 4px;
        }
      }
      ._cover-one {
        width: 50%;
        border-radius: 4px;
        margin-bottom: 10px;
      }
    }
    ._list,
    ._song {
      margin: 10px 0;
      display: grid;
      grid-template-columns: 48px 1fr;
      background: #f3f3f3;
      height: 60px;
      border-radius: 10px;
      padding: 6px;
      box-sizing: border-box;
      &:active {
        background: rgba(0, 0, 0, 0.3);
      }
      img {
        border-radius: 6px;
      }
      div {
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
        padding-left: 10px;
        p {
          font-size: 14px;
        }
        span {
          color: #7a7a7a;
          font-size: 10px;
        }
      }
    }
    ._song {
      span {
        position: relative;
        width: 100%;
        height: 48px;
        i {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          &::before {
            color: crimson;
            font-size: 14px;
          }
        }
      }
    }
    ._event {
      box-sizing: border-box;
      padding: 1px 8px;
      width: 100%;
      border-radius: 6px;
      background: #eee;
      margin: 10px 0;
      ._event-msg {
        position: relative;
        a {
          position: absolute;
          top: 0;
          left: 0;
          color: #527baf;
          font-size: 14px;
          line-height: 18px;
        }
        pre {
          line-height: 18px;
        }
      }
      ._event-song {
        background: rgba(255, 255, 255, 0.8);
      }
    }
    ._tools {
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 10px;
      li {
        display: inline-flex;
        align-items: center;
        color: #949494;
        font-size: 12px;
        min-height: 16px;
        margin-right: 20px;
        i {
          color: #656565;
          font-size: 18px;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
