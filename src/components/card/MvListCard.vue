<template>
  <li class="mv-list-card" @click="toMain">
    <div class="mv-list-card-info">
      <h4
        :class="{
          skeleton: !imgflag,
          'text-truncate': info.introduction != undefined,
        }"
      >
        {{ info.title }}
      </h4>
      <p :class="{ skeleton: !imgflag }">{{ creator }}</p>
    </div>
    <div class="mv-list-card-img">
      <img v-if="imgflag" :src="info.coverUrl + rectangleImgSize" alt />
    </div>
  </li>
</template>

<script>
export default {
  name: "mvlistcard",
  props: {
    info: Object,
  },
  data() {
    return {
      imgflag: false,
    };
  },
  computed: {
    creator() {
      return this.info.creator.map((item) => item.userName).join("/");
    },
  },
  mounted() {
    let new_img = new Image();
    new_img.src = this.info.coverUrl + this.rectangleImgSize;
    new_img.onload = () => (this.imgflag = true);
  },
  methods: {
    toMain() {
      let id = Number(this.info.vid);
      isNaN(id)
        ? this.$toast("not num")
        : this.toMainPage("/home/mvdetail", id);
    },
  },
};
</script>

<style scoped lang="less">
.mv-list-card {
  position: relative;
  padding: 16px;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 96px;
  width: 100%;
  height: 86px;
  background-color: #fff;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 2px;
    display: block;
    margin-left: 16px;
    width: 100%;
    height: 1px;
    background: #eee;
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .skeleton {
    background: #f2f3f5 !important;
    color: #f2f3f5 !important;
  }
  & > div {
    overflow: hidden;
  }
  .mv-list-card-info {
    box-sizing: border-box;
    padding-right: 8px;
    h4 {
      font-size: 0.875rem;
      line-height: 16px;
      color: #555;
      word-break: break-all;
    }
    p {
      font-size: 0.625rem;
      line-height: 13px;
      color: #999;
      margin-top: 8px;
      max-height: 26px;
      overflow: hidden;
    }
  }
  .mv-list-card-img {
    display: flex;
    align-items: center;
    height: 54px;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    align-self: center;
    background: #f2f3f5;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
