<template>
  <div class="search-mlog-item" ref="contain" @click="toMain">
    <div class="_cover van-icon van-icon-play" :class="{'cover-fixed-size': !autosize}">
      <img :src="detail.mlogBaseData.coverUrl" v-img-lazyload :style="coverSize" alt />
      <span>{{info.matchFieldContent}}</span>
    </div>
    <div class="_msg paragraph-truncate">{{detail.mlogBaseData.text}}</div>
    <div class="_creator">
      <div>
        <img :src="detail.userProfile.avatarUrl" alt />
        <span class="text-truncate">{{detail.userProfile.nickname}}</span>
      </div>
      <span>{{detail.mlogExtVO.likedCount}}赞</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchmlogitem",
  props: {
    info: Object,
    autosize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      coverSize: {}
    };
  },
  computed: {
    detail() {
      return this.info.resource || false;
    }
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
      // let query = {
      //     pos: this.$refs.contain.getBoundingClientRect(),
      //     detail: this.info
      // };
      // this.$router.push({
      //     name: 'VideoDetail',
      //     query
      // })
    }
  }
};
</script>
<style lang="less" scoped>
.search-mlog-item {
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  margin: 10px 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.125);
  ._msg {
    margin: 8px 10px 0 10px;
    color: #333;
    font-size: 13px;
  }
  ._cover {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: #def;
    &.cover-fixed-size {
      padding: 50% 0;
      img {
        position: absolute;
        top: 0;
      }
    }
    img {
      width: 100%;
    }
    span {
        position: absolute;
        bottom: 6px;
        left: 6px;
        font-size: 10px;
        padding: 0 8px;
        height: 18px;
        line-height: 16px;
        background: rgba(0, 0, 0, .4);
        border-radius: 10px;
        color: rgba(255, 255, 255, .9);
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