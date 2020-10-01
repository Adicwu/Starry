<template>
  <div class="singer-album-banner">
    <div class="_banner-bg">
      <img :src="detail.cover" alt />
    </div>
    <div class="_banner-info">
      <div class="_banner-cover">
        <img :src="detail.cover" alt />
      </div>
      <div class="_banner-msg">
        <p class="paragraph-truncate">{{ detail.name }}</p>
        <div class="_banner-msg-creator" @click="toMainPage('/home/singerdetail',detail.singer.id)">
          <span>歌手: {{ detail.singer.name }}</span>
          <i class="van-icon van-icon-arrow"></i>
        </div>
        <div class="_banner-msg-descrip">
          <p>发行时间: {{ detail.createDate | msToYmd }}</p>
          <p class="text-truncate">{{ descrip }}</p>
          <i class="van-icon van-icon-arrow"></i>
        </div>
      </div>
    </div>
    <div class="_banner-else">
      <IconText v-for="(item, index) in handlenav" :info="item" :key="index" />
    </div>
  </div>
</template>

<script>
export default {
  name: "singeralbumbanner",
  props: {
    detail: Object
  },
  computed: {
    descrip() {
      return this.detail.descrip;
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
.singer-album-banner {
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
        top: -14%;
        left: 5%;
        display: block;
        width: 90%;
        height: 90%;
        border-radius: 50%;
        background: #000;
        z-index: -1;
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
      width: 100%;
      overflow: hidden;
      flex-direction: column;
      justify-content: space-between;
      color: #fff;
      box-sizing: border-box;
      padding: 6px 0;
      & > p {
        line-height: 18px;
        font-weight: 600;
      }
      ._banner-msg-creator {
        display: flex;
        align-items: center;
        height: 36px;
        font-size: 12px;
        i {
          margin-left: 4px;
        }
        span {
          color: rgba(255, 255, 255, 0.9);
        }
      }

      ._banner-msg-descrip {
        position: relative;
        width: 100%;
        font-size: 0.625rem;
        line-height: 12px;
        color: #eee;
        p {
          max-width: 94%;
        }
        i {
          position: absolute;
          right: 0;
          bottom: 2px;
          font-size: 10px;
        }
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
