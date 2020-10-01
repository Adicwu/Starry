<template>
  <div class="artist-item" @click="toMainPage('/home/singerdetail',detail.id)">
    <img :src="detail.picUrl+squareImgSize" v-img-lazyload alt />
    <p class="text-truncate">
      {{detail.name}}
      <a v-if="artistElseName">{{artistElseName}}</a>
    </p>
    <span v-if="isSettlein">
      <van-icon name="contact" />已入驻
    </span>
  </div>
</template>

<script>
export default {
  name: "artistitem",
  props: {
    detail: Object
  },
  computed: {
    artistElseName() {
      let val = this.detail.alias;
      return val.length > 0 ? `(${val.join("/")})` : false;
    },
    isSettlein() {
      return typeof this.detail.accountId !== "undefined";
    }
  },
};
</script>
<style lang="less" scoped>
.artist-item {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 40px 1fr 54px;
  width: 100%;
  height: 60px;
  padding: 10px 16px;
  user-select: none;
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #def;
  }
  p {
    align-self: center;
    text-indent: 10px;
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    a {
      color: #777;
    }
  }
  span {
    display: flex;
    align-items: center;
    justify-self: flex-end;
    align-self: center;
    font-size: 10px;
    i {
      background: crimson;
      border-radius: 50%;
      color: #fff;
      padding: 2px;
      margin-right: 6px;
    }
  }
}
</style>