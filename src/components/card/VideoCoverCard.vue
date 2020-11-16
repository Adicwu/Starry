<template>
  <div class="video-cover-card" ref="contain" @click="toMain">
    <div class="_cover van-icon van-icon-play">
      <img :src="info.coverUrl" v-img-lazyload :style="coverSize" alt />
    </div>
    <div class="_msg paragraph-truncate">{{ info.title }}</div>
    <div class="_creator" v-if="hasCreator">
      <div>
        <img :src="info.creator.avatarUrl" v-img-lazyload alt />
        <span class="text-truncate">{{ info.creator.nickname }}</span>
      </div>
      <span>{{ info.praisedCount }}赞</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "videocovercard",
  props: {
    info: Object,
  },
  data() {
    return {
      coverSize: {},
    };
  },
  computed: {
    hasCreator() {
      return typeof this.info.creator !== "undefined";
    },
  },
  mounted() {
    this.initCoverSize();
  },
  methods: {
    initCoverSize() {
      // let { width, height } = this.info,
      //   { clientWidth } = this.$refs.contain,
      //   clientHeight = (clientWidth / width) * height;
      // this.coverSize = {
      //   width: clientWidth + "px",
      //   height: clientHeight + "px"
      // };
    },
    toMain() {
      let query = {
        pos: this.$refs.contain.getBoundingClientRect(),
        detail: this.info,
      };
      this.$router.push({
        name: "VideoDetail",
        query,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.video-cover-card {
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  margin: 10px 0;
  box-shadow: 0 3px 10px rgba(255, 255, 255, 0.6);
  ._msg {
    margin: 8px 10px 0 10px;
    color: #333;
    font-size: 13px;
  }
  ._cover {
    position: relative;
    width: 100%;
    overflow: hidden;
    img {
      width: 100%;
    }
    &::before {
      position: absolute;
      right: 6px;
      top: 6px;
      padding: 3px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      font-size: 10px;
    }
  }
  ._creator {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    font-size: 11px;
    & > div {
      flex: 1;
      display: flex;
      align-items: center;
      overflow: hidden;
      img {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
      span {
        flex: 1;
        overflow: hidden;
        color: #989898;
        padding-left: 4px;
        box-sizing: border-box;
      }
    }
    & > span {
      align-self: center;
      color: #989898;
      width: 42px;
      overflow: hidden;
      font-size: 11px;
      text-align: right;
    }
  }
}
</style>