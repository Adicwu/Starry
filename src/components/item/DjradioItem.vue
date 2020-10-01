<template>
  <li class="djradio-item" @click="toMainPage('/home/djdetail', info.id)">
    <img :src="info.picUrl+squareImgSize" v-img-lazyload alt />
    <div>
      <span class="text-truncate">{{info.name}}</span>
      <p class="text-truncate">{{info.dj.nickname}}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: "djradioitem",
  props: {
    info: Object
  },
};
</script>

<style scoped lang="less">
.djradio-item {
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
    padding-left: 0;
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
