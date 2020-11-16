<template>
  <li class="song-list-item" @click="toMainPage('/home/songdetail', id)">
    <img :src="cover + squareImgSize" v-if="cover" v-img-lazyload alt />
    <div>
      <span class="text-truncate">{{ title }}</span>
      <p class="text-truncate">
        <slot></slot>
      </p>
    </div>
  </li>
</template>

<script>
export default {
  name: "songlistitem",
  props: {
    cover: String,
    title: String,
    id: Number,
  },
};
</script>

<style scoped lang="less">
.song-list-item {
  display: grid;
  grid-template-columns: 20vw 1fr;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  height: 20vw;
  user-select: none;
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
  img,
  div {
    padding: 10px;
    box-sizing: border-box;
  }
  img {
    border-radius: 24px;
    background: #def;
    background-clip: content-box;
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    span {
      font-size: 16px;
    }
    p {
      font-size: 10px;
      color: #777;
      margin-bottom: 4px;
    }
  }
}
</style>
