<template>
  <div class="circle-card">
    <div class="circle-card-cover" ref="cover">
      <ImgLoader class="_cover" :src="cover+squareImgSize" />
    </div>
    <p class="paragraph-truncate">{{ name }}</p>
    <p class="text-truncate">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "circlecard",
  props: {
    cover: String,
    name: String,
    msg: String
  },
  computed: {
    coverPos() {
      return this.$refs.cover.getBoundingClientRect();
    }
  }
};
</script>

<style lang="less" scoped>
.circle-card {
  float: left;
  margin-left: 18px;
  width: 96px;
  height: 100%;
  .circle-card-cover {
    position: relative;
    width: 100%;
    height: 96px;
    border-radius: 50%;
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.4);
      box-sizing: border-box;
      z-index: 5;
    }
  }
  &:last-child {
    margin-right: 18px;
  }
}
p {
  width: 100%;
  color: #737373;
  text-align: center;
  &:first-of-type {
    height: 30px;
    margin-top: 16px;
    font-size: 14px;
    line-height: 16px;
  }
  &:last-of-type {
    margin-top: 6px;
    color: #c1d1d2;
    font-size: 10px;
  }
}
</style>
