<template>
  <li class="album-list" @click="toMainPage('/home/singeralbum',info.id)">
    <div class="_cover">
      <img :src="info.picUrl+squareImgSize" alt v-img-lazyload />
    </div>
    <div class="_info">
      <p class="text-truncate">
        {{info.name}}
        <a v-if="hasSongNames">({{songNameTns || songNameElse}})</a>
      </p>
      <span>{{info.publishTime |msToYmd}}{{` 歌曲${info.size}`}}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: "albumlist",
  props: {
    info: Object
  },
  computed: {
    songNameTns() {
      let { info } = this;
      return typeof info.transNames != "undefined" ? info.transNames[0] : "";
    },
    songNameElse() {
      let { info } = this;
      return info.alias[0];
    },
    hasSongNames() {
      return this.songNameTns || this.songNameElse;
    }
  }
};
</script>
<style lang="less" scoped>
.album-list {
  display: grid;
  grid-template-columns: 18vw 1fr;
  box-sizing: border-box;
  padding: 4px 16px;
  width: 100%;
  height: 20vw;
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
  ._cover {
    position: relative;
    width: 100%;
    height: 100%;
    background: #def;
    border-radius: 6px;
    &::before {
      content: "";
      position: absolute;
      top: 5%;
      right: -14%;
      display: block;
      width: 90%;
      height: 90%;
      border-radius: 50%;
      background: #000;
      z-index: -1;
    }
    img {
      position: absolute;
      border-radius: 2px;
      width: 20%;
      height: 20%;
      transform: scale(5) translate(40%, 40%);
    }
  }
  ._info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 6vw;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    p {
      font-size: 4vw;
      margin-bottom: 3px;
      color: #333;
      a {
        color: #999;
      }
    }
    span {
      font-size: 3vw;
      color: #999;
    }
  }
}
</style>