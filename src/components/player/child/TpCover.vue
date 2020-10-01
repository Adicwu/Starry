<template>
  <div
    class="_cover"
    ref="cover"
    @click.stop="contentHandler"
    :class="{ '_active-content': switchflag }"
    :style="{ transform: `translate(${cover.x}px,${cover.y}px)` }"
  >
    <div class="_cover-cover" :class="{ '_active-content-cover': switchflag }">
      <img :src="curMusicCover+imgSize" alt />
      <van-icon :name="muscicStatus" v-show="!switchflag" />
    </div>
  </div>
</template>
<script>
export default {
  name: "tpcover",
  computed: {
    switchflag() {
      return this.$parent.switchflag;
    },
    curMusicCover() {
      return this.$parent.curMusicCover;
    },
    muscicStatus() {
      return this.$parent.muscicStatus;
    },
    cover() {
      return this.$parent.cover;
    }
  },
  data() {
    return{
		imgSize: "?param=600y600"
	}
  },
  methods: {
    contentHandler() {
      this.switchflag
        ? this.$parent.openLyric()
        : this.$store.commit("musicPlay");
    }
  }
};
</script>
<style lang="less" scoped>
._cover {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60px;
  height: 60px;
  transition: all 0.3s;
  z-index: 3;
  &._active-content {
    width: 240px;
    height: 240px;
  }
  ._cover-cover {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    &._active-content-cover {
      top: 0;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      z-index: 2;
      // background: rgba(0, 0, 0, 0.4);
    }
    &:active::before {
      background: rgba(0, 0, 0, 0.2);
    }
    img {
      position: absolute;
    }
    i {
      z-index: 3;
      font-size: 30px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
