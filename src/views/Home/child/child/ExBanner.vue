<template>
  <AdCarousel class="explore-banner" height="160px" :autoplay="false" type="card" v-if="loadflag">
    <AdCarouselItem
      class="explore-banner-item"
      v-for="(item, index) in banner"
      @click.native="bannerClick(item)"
      :key="index"
      :keys="index"
    >
      <ImgLoader class="_cover" :src="item.pic+imgSize" />
      <span>{{item.typeTitle}}</span>
    </AdCarouselItem>
  </AdCarousel>
</template>

<script>
import { getBanner } from "apis/else";
import AdCarousel from "comps/carousel/AdCarousel";
import AdCarouselItem from "comps/carousel/AdCarouselItem";
export default {
  name: "exbanner",
  components: {
    AdCarousel,
    AdCarouselItem
  },
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
      getBanner().then(res => {
        this.banner = res.data.banners;
        this.loadflag = true;
      });
    },
    bannerClick(item) {
      switch (item.typeTitle) {
        case "新歌首发":
          this.songAdd(item.song);
          break;
        case "独家":
          this.songAdd(item.song);
          break;
        case "独家自制":
          this.$toast("俺也不知道");
          break;
        case "数字专辑":
          this.$toast("俺也不知道");
          break;
        case "独家专访":
          this.$toast("俺也不知道");
          break;
      }
    },
    songAdd(val) {
      let info = {
        alg: null,
        id: val.id,
        v: null
      };
      this.$store.commit("addCurItem", info);
      let obj = {
        list: [],
        id: null,
        index: 0
      };
      this.$store.dispatch("changeCurMusic", obj);
      this.$bus.emit("playerOpen");
    }
  }
};
</script>

<style lang="less" scoped>
.explore-banner {
  .explore-banner-item {
    border-radius: 6px;
    overflow: hidden;

    & > span {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 4px 6px;
      background: #ed143db8;
      border-top-left-radius: 10px;
      font-size: 10px;
      color: #fff;
      box-sizing: border-box;
    }
  }
}
</style>
