<template>
  <div class="screen-video" ref="contain">
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <SingleVideo
        class="_player animated"
        ref="player"
        :src="detail.urlInfo.url"
        @statusHanlder="statusHanlder"
        v-if="isReady"
      />
    </transition>
    <transition
      enter-active-class="fadeInRight"
      leave-active-class="fadeOutRight"
    >
      <aside class="_tools animated" v-show="!video.status">
        <div class="_tools-avatar" @click.stop="toCreator">
          <img :src="creator.avatarUrl" alt />
        </div>
        <ul class="_tools-items" @click.stop="toMain">
          <li>
            <i class="fa fa-thumbs-up"></i>
            {{ detail.praisedCount }}
          </li>
          <li>
            <i class="fa fa-commenting"></i>
            {{ detail.commentCount }}
          </li>
          <li>
            <i class="fa fa-share-alt"></i>
            {{ detail.shareCount }}
          </li>
        </ul>
      </aside>
    </transition>
    <footer class="_creator">
      <b class="text-truncate" @click.stop="toCreator"
        >@{{ creator.nickname }}</b
      >
      <p class="text-truncate">{{ detail.title }}</p>
    </footer>
    <div class="_unfold fa fa-arrows-alt" @click.stop="toMain"></div>
  </div>
</template>

<script>
import SingleVideo from "comps/video/SingleVideo";
export default {
  name: "ScreenVideo",
  components: {
    SingleVideo,
  },
  props: {
    detail: Object,
    isReady: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      video: {
        status: false,
      },
    };
  },
  computed: {
    creator() {
      return this.detail.creator;
    },
  },
  methods: {
    toMain() {
      let query = {
        pos: this.$refs.contain.getBoundingClientRect(),
        detail: this.detail,
      };
      this.pausePlayer();
      this.$router.push({
        path: "/home/videodetail",
        query,
      });
    },
    pausePlayer() {
      this.$refs.player.pause();
    },
    toCreator() {
      this.pausePlayer();
      this.$router.push(`/home/userdetail?id=${this.creator.userId}`);
    },
    statusHanlder(val) {
      this.video.status = val;
    },
  },
};
</script>
<style lang="less" scoped>
.screen-video {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 18px;
  // background: #fff;
  & /deep/ ._player {
    video {
      width: unset;
      height: 100%;
    }
    transition: all 0.3s;

    &._active {
      height: 30%;
    }
  }

  ._tools {
    position: absolute;
    bottom: 61px;
    right: 10px;
    width: 46px;
    height: 50%;
    animation-duration: 0.3s;

    ._tools-avatar {
      position: relative;
      width: 46px;
      height: 46px;

      img {
        border-radius: 50%;
      }
    }

    ._tools-items {
      width: 100%;

      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.9);

        i {
          font-size: 30px;
          margin-bottom: 4px;
        }
      }
    }
  }

  ._creator {
    position: absolute;
    bottom: 0;
    padding: 10px 16px;
    box-sizing: border-box;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
    b {
      color: rgba(255, 255, 255, 0.9);
    }

    p {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 4px;
    }
  }

  ._unfold {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0 0 16px rgba(0, 0, 0, 0.6);
  }
}
</style>
