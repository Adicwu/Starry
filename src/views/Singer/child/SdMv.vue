<template>
  <BotLoad
    class="singer-detail-mv"
    :data="mvs"
    :perpage="10"
    :isbind="isActive"
    target=".singer-detail"
    v-if="flags.load"
  >
    <div class="_title">
        <span>全部 <a>(共{{mvs.length}}个)</a></span>
        <div>
            <span class="active">全部</span>
            <a>|</a>
            <span>MV</span>
        </div>
    </div>
    <template #contain="{curdata}">
      <VideoList v-for="item in curdata" :key="item.id" :info="item" />
    </template>
  </BotLoad>
</template>

<script>
import { singerMv } from "apis/singer";
import { mvGroup } from "apis/mv";
import VideoList from "comps/card/VideoList";
export default {
  name: "singerdetailmv",
  components: {
    VideoList
  },
  inject: ["nav"],
  data() {
    return {
      flags: {
        load: false
      },
      mvs: [],
      navKey: 3
    };
  },
  computed: {
    pageId() {
      return this.$route.query.id;
    },
    isActive() {
      return this.nav.active === this.navKey;
    }
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      singerMv(this.pageId).then(res => {
        let { mvs } = res.data;
        this.mvs = mvs;
        this.flags.load = true;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.singer-detail-mv {
  width: 100%;
  ._title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 16px;
      padding: 16px 0;
      &>span{
          font-size: 15px;
          font-weight: 800;
          a{
              font-weight: 100;
              color: #999;
              font-size: 12px;
              margin-left: 3px;
          }
      }
      &>div{
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 60px;
          height: 16px;
          font-size: 12px;
          line-height: 12px;
          span{
              &.active{
                  color: crimson;
              }
          }
          a{
            //   margin-top: -4px;
              color: #eee;
          }
      }
  }
}
</style>