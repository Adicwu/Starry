<template>
  <div class="song-detail-banner">
    <div class="_banner-bg">
      <img :src="detail.cover" alt />
    </div>
    <div class="_banner-info">
      <div class="_banner-cover">
        <img :src="detail.cover+squareImgSize" alt />
        <span>
          <i class="van-icon van-icon-audio"></i>
          {{ detail.playCount | numFormat }}
        </span>
      </div>
      <div class="_banner-msg">
        <p class="paragraph-truncate">{{ detail.name }}</p>
        <div
          class="_banner-msg-creator"
          @click="toMainPage('/home/userdetail',detail.creator.userId)"
        >
          <img :src="detail.creator.avatar+squareImgSize" alt />
          <span>{{ detail.creator.name }}</span>
        </div>
        <div class="_banner-msg-descrip paragraph-truncate">{{ descrip }}</div>
      </div>
    </div>
    <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
      <div class="_banner-else" v-show="!isScroll">
        <IconText v-for="(item, index) in handlenav" :info="item" :key="index" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "sdbanner",
  props: {
    detail: Object,
    isScroll: Boolean
  },
  computed: {
    descrip() {
      return this.detail.descrip || "可可爱爱，没有简介";
    }
  },
  data() {
    return {
      handlenav: [
        {
          icon: "van-icon van-icon-chat-o",
          text: "评论"
        },
        {
          icon: "van-icon van-icon-fire",
          text: "分享"
        },
        {
          icon: "van-icon van-icon-exchange",
          text: "下载"
        },
        {
          icon: "van-icon van-icon-certificate",
          text: "多选"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.song-detail-banner {
  position: sticky;
  top: -270px;
  width: 100%;
  height: 360px;
  background: silver;
  overflow: hidden;
  z-index: 6;

  ._banner-bg {
    position: absolute;
    z-index: 1;

    img {
      filter: blur(120px);
    }
  }

  ._banner-info {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 140px 1fr;
    grid-template-rows: 1fr;
    margin: 0 30px;
    margin-top: 70px;
    height: 110px;

    ._banner-cover {
      position: relative;
      width: 120px;
      height: 120px;
      background: silver;
      border-radius: 8px;

      &::before {
        content: "";
        position: absolute;
        top: 7%;
        right: -6px;
        display: block;
        width: 50%;
        height: 86%;
        border-radius: 0 6px 6px 0;
        background: rgba(255, 255, 255, 0.6);
        z-index: -1;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        display: block;
        width: 100%;
        height: 40px;
        border-radius: 0 0 8px 8px;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.5)
        );
      }

      img {
        position: absolute;
        border-radius: 8px;
      }

      span {
        position: absolute;
        right: 6px;
        bottom: 6px;
        display: flex;
        align-items: center;
        color: #fff;
        z-index: 5;
        font-size: 0.75rem;

        i {
          margin-right: 6px;
        }
      }
    }

    ._banner-msg {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #fff;
      box-sizing: border-box;
      padding: 6px 0;

      & > p {
        line-height: 18px;
      }

      ._banner-msg-creator {
        display: flex;
        align-items: center;
        height: 36px;

        img {
          width: 36px !important;
          border-radius: 50%;
        }

        span {
          margin-left: 8px;
          color: rgba(255, 255, 255, 0.8);
        }
      }

      ._banner-msg-descrip {
        width: 80%;
        font-size: 0.625rem;
        line-height: 12px;
      }
    }
  }

  ._banner-else {
    position: relative;
    z-index: 3;
    margin-top: 30px;
    height: 60px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    align-items: center;
    justify-items: center;
    animation-duration: 0.3s;
  }
}
</style>
