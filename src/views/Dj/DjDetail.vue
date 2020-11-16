<template>
  <div class="dj-detail">
    <BreakHeader title="电台" fixed />
    <div class="dj-detail-cover" ref="cover" :class="{ active: flags.cover }">
      <img :src="detail.picUrl + '?param=700y700'" v-if="detail.picUrl" alt />
      <div class="_info" v-show="flags.contain">
        <div>
          <b>{{ detail.name }}</b>
          <p>共 {{ detail.programCount }} 期</p>
        </div>
      </div>
    </div>
    <transition enter-active-class="animated fadeIn">
      <van-tabs
        v-model="nav.active"
        class="dj-detail-contain"
        swipeable
        animated
        background="rgba(0,0,0,0)"
        sticky
        :offset-top="48"
        v-if="flags.contain"
      >
        <van-tab :title="nav.list[0].text">
          <DjAbout v-if="flags.load" :detail="detail" />
        </van-tab>
        <van-tab :title="nav.list[1].text">
          <DjShow />
        </van-tab>
        <van-tab :title="nav.list[2].text">
          <DjSimilar :type="detail.categoryId" />
        </van-tab>
      </van-tabs>
    </transition>
  </div>
</template>

<script>
import { djDetail } from "apis/dj";
import DjAbout from "./child/DjAbout";
import DjShow from "./child/DjShow";
import DjSimilar from "./child/DjSimilar";
export default {
  name: "djdetail",
  components: {
    DjAbout,
    DjShow,
    DjSimilar,
  },
  data() {
    return {
      nav: {
        list: [
          { text: "详情", comp: "DjAbout" },
          { text: "节目", comp: "DjShow" },
          { text: "相似", comp: "DjSimilar" },
        ],
        active: 0,
      },
      detail: {},
      flags: {
        contain: false,
        load: false,
        cover: false,
      },
    };
  },
  computed: {
    pageId() {
      return this.$route.query.id;
    },
    enterCover() {
      return this.$route.query.cover;
    },
    hasPos() {
      return typeof this.enterCover === "object";
    },
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset() {
      djDetail(this.pageId).then((res) => {
        this.detail = res.data.data;
        this.flags.load = true;
        this.anmCounter();
        setTimeout(() => (this.flags.contain = true), 400);
        setTimeout(() => (this.flags.cover = true), 2400);
      });
    },
    anmCounter() {
      if (!this.hasPos) return;
      let { cover } = this.$refs;
      this.anmHandler(cover, this.enterCover, cover.getBoundingClientRect());
    },
    anmHandler(dom, pos, oldpos) {
      let [xdistance, ydistance] = [pos.x - oldpos.x, pos.y - oldpos.y];
      let keyframes = [
        {
          transform: `translate3d(${xdistance}px, ${ydistance}px,0)`,
          width: `${pos.width}px`,
          height: `${pos.height}px`,
        },
        {
          transform: "translate3d(0,0,0)",
          width: `${oldpos.width}px`,
          height: `${oldpos.height}px`,
        },
      ];
      const options = {
        duration: 400,
      };
      dom.animate(keyframes, options);
    },
  },
};
</script>

<style scoped lang="less">
@import "~styles/default/dj_detail";
</style>
