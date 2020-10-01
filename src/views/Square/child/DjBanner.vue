<template>
  <van-swipe :autoplay="3000" class="dj-square-banner">
    <van-swipe-item v-for="(item, index) in banner" :key="index">
      <ImgLoader class="_cover" :src="item.pic+imgSize" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { djBanner } from "apis/dj";
export default {
  name: "djsquarebanner",
  data() {
    return {
      banner: [],
      loadflag: false,
	    imgSize: '?param=800y342'
    };
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      djBanner().then(res => {
        this.banner = res.data.data;
        this.loadflag = true;
      });
    }
  }
};
</script>

<style scoped lang="less">
.dj-square-banner {
  margin: 16px 0;
  overflow: hidden;
  ._cover {
    height: 40vw;
    border-radius: 6px;
    transform: scale(0.9);
    overflow: hidden;
  }
}
</style>
