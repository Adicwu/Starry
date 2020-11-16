<template>
  <div class="songlist-card" @click="toMainPage('/home/songdetail', id)">
    <div class="_cover">
      <img class="fade-ftin" :src="cover + squareImgSize" v-if="imgLoad" alt />
    </div>
    <div class="_msg" :class="{ '_msg-mask': !imgLoad }">{{ title }}</div>
    <div class="_mask" v-if="imgLoad">{{ count | numFormat }}</div>
  </div>
</template>

<script>
export default {
  name: "songlistcard",
  props: {
    cover: String,
    title: String,
    id: Number,
    count: Number,
  },
  data() {
    return {
      imgLoad: false,
    };
  },
  mounted() {
    const img = new Image();
    img.src = this.cover + this.squareImgSize;
    img.onload = (e) => {
      this.imgLoad = true;
    };
  },
};
</script>

<style scoped lang="less">
.songlist-card {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  ._cover {
    position: relative;
    width: 100%;
    padding: 50% 0;
    border-radius: 6px;
    overflow: hidden;
    background: #def;
    img {
      position: absolute;
      top: 40%;
      left: 40%;
      width: 20% !important;
      height: 20% !important;
      transform: scale(5);
    }
  }
  ._msg {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 10px;
    margin-top: 4px;
    &._msg-mask {
      background: #def;
      color: #def;
    }
  }
  ._mask {
    position: absolute;
    top: 10px;
    box-sizing: border-box;
    width: calc(100% - 20px);
    padding-right: 4px;
    padding-top: 2px;
    height: 30px;
    z-index: 3;
    background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
    color: #fff;
    font-size: 9px;
    text-align: right;
    border-radius: 6px;
  }
}
</style>
