<template>
  <div class="audio-list">
    <div class="_bg"></div>
    <label>
      <a v-show="!activeMusic">{{ index }}</a>
      <span class="van-icon van-icon-fire-o" v-show="activeMusic"></span>
    </label>
    <div class="_info">
      <p class="text-truncate">
        {{ detail.name }}
        <a v-if="songNameRemark">({{ songNameRemark }})</a>
      </p>
      <a class="text-truncate">
        <span v-if="!isUseful">VIP</span>
        {{ fullSinger }}
      </a>
    </div>
    <span class="van-icon van-icon-tv-o" @click.stop="toMv"></span>
    <span class="van-icon van-icon-ellipsis" @click.stop="openPopup"></span>
  </div>
</template>

<script>
export default {
  name: "audiolist",
  props: {
    index: Number,
    detail: Object,
    toMore: {
      type: Function,
      default: () => {}
    },
  },
  computed: {
    songNameRemark() {
      return this.detail.alia[0];
    },
    fullSinger() {
      return (
        this.detail.ar.map(item => item.name).join("/") +
        " - " +
        this.detail.al.name
      );
    },
    activeMusic() {
      let key = this.$store.getters.curMusic;
      return typeof key != "undefined" && key.name === this.detail.name;
    },
    isUseful() {
      return this.detail.url != null;
    },
    popupInfo() {
      return this.detail;
    }
  },
  methods: {
    toMv() {
      if (this.detail.mv === 0) return this.$toast("此音乐莫有mv");
      this.toMainPage("/home/mvdetail", this.detail.mv);
    },
    openPopup(){
      this.$bus.emit('openSongPopup',this.popupInfo)
    }
  }
};
</script>

<style lang="less" scoped>
.audio-list {
  position: relative;
  box-sizing: border-box;
  padding: 10px 0;
  padding-right: 10px;
  width: 100%;
  height: 60px;
  display: grid;
  grid-template-columns: 50px 1fr 40px 30px;
  grid-template-rows: 1fr;
  ._bg {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 3;
    &:active {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  label {
    align-self: center;
    justify-self: center;
    color: #999;
    span {
      color: crimson;
      font-size: 1.25rem;
    }
  }
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    color: #b3b3b3;
    z-index: 5;
    &:active {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  ._info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    & > p {
      max-width: 100%;
      color: #333;
      & > a {
        color: #808080;
      }
    }
    & > a {
      display: inline-flex;
      align-items: center;
      max-width: 100%;
      font-size: 0.75rem;
      color: #808080;
      span {
        font-size: 6px;
        color: crimson;
        padding: 0 1px;
        border: 1px solid crimson;
        border-radius: 2px;
        margin-right: 2px;
      }
    }
  }
}
</style>
