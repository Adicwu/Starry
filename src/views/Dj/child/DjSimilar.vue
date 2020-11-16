<template>
  <div class="dj-detail-similar">
    <div v-loading="!loadFlag">
      <div class="_item" v-for="item in similar" :key="item.id">
        <div class="_cover">
          <img :src="item.picUrl+squareImgSize" alt v-img-loader />
        </div>
        <div class="_info">
          <span class="text-truncate">{{item.name}}</span>
          <p class="text-truncate">{{item.desc}}</p>
          <p>节目：{{item.programCount}}，订阅：34.1w</p>
        </div>
        <input type="button" value="订阅" />
      </div>
    </div>
  </div>
</template>

<script>
import { relatedList } from "apis/else";
import { rmdDj } from "apis/dj";
export default {
  name: "djdetailsimilar",
  props: {
    type: Number
  },
  data() {
    return {
      similar: [],
      loadFlag: false
    };
  },
  computed: {
    pageId() {
      return this.$route.query.id;
    }
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset() {
      rmdDj(this.type).then(res => {
        this.similar = res.data.djRadios;
        this.loadFlag = true;
      });
    }
  }
};
</script>

<style scoped lang="less">
.dj-detail-similar {
  width: 100%;
  background: #fff;
  ._item {
    margin: 10px 0;
    display: grid;
    grid-template-columns: 16vw 1fr 80px;
    padding: 0 16px;
    box-sizing: border-box;
    width: 100%;
    height: 16vw;
    &:active {
      background: rgba(0, 0, 0, 0.1);
    }
    ._cover {
      width: 100%;
      height: 100%;
      background: #def;
      border-radius: 6px;
      overflow: hidden;
    }
    ._info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      padding-left: 10px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      span {
        width: 100%;
        font-size: 14px;
      }
      p {
        margin-top: 4px;
        font-size: 10px;
        color: #707070;
      }
    }
    input[type="button"] {
      display: block;
      justify-self: flex-end;
      align-self: center;
      width: 48px;
      height: 24px;
      border: 1px solid crimson;
      color: crimson;
      border-radius: 20px;
      background: none;
      font-size: 12px;
    }
  }
}
</style>
