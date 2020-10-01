<template>
  <div class="playlist-sm-card" @click="toMainPage('/home/songdetail', info.id)">
    <img :src="info.coverImgUrl+squareImgSize" alt v-img-lazyload />
    <div class="_info">
      <p class="paragraph-truncate">{{ info.name }}</p>
      <a>{{ info.trackCount }}首</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "playlistsmcard",
  props: {
    info: Object
  }
};
</script>

<style lang="less" scoped>
.playlist-sm-card {
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 1fr;
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
  height: 76px;
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
  img {
    border-radius: 4px;
    background: #def;
  }
  ._info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    box-sizing: border-box;
    p {
      font-size: 14px;
    }
    a {
      margin-top: 4px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.9);
    }
  }
}
</style>
