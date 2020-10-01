<template>
  <div class="search-audio-item" @click="changeMusic">
    <div class="_bg"></div>
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
    <span class="van-icon van-icon-tv-o" @click.stop></span>
    <span class="van-icon van-icon-ellipsis" @click.stop></span>
  </div>
</template>
<script>
import { songUrl } from "apis/song";
export default {
  name: "searchaudioitem",
  props: {
    detail: Object
  },
  data() {
    return {
      isUseful: true
    };
  },
  computed: {
    songNameRemark() {
      return this.detail.alias[0];
    },
    fullSinger() {
      return (
        this.detail.artists.map(item => item.name).join("/") +
        " - " +
        this.detail.album.name
      );
    }
  },
  watch: {
    detail: {
      immediate: true,
      deep: true,
      handler(val) {
        setTimeout(() => {
          val.url == null && (this.isUseful = false);
        }, 200);
      }
    }
  },
  methods: {
    changeMusic() {
      if (!this.isUseful) return this.$toast("莫得资源~");
      let key = {
        info: {
          alg: null,
          id: this.detail.id,
          v: null
        },
        obj: {
          list: [],
          id: null,
          index: 0
        }
      };
      this.$store.dispatch("newMusic", key).then(res => {
        this.$bus.emit("playerOpen");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.search-audio-item {
  position: relative;
  box-sizing: border-box;
  padding: 10px 16px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 40px 30px;
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
}
</style>
