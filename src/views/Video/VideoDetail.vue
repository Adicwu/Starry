<template>
  <div class="video-detail" ref="contain" v-if="detail">
    <BreakHeader fixed />
    <SingleVideo
      class="_player"
      :class="{'_active':flags.popup}"
      :isControllable="!flags.popup"
      :src="detail.urlInfo.url"
      @click.native="closePopup"
    />
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <aside class="_tools" v-show="flags.contain && !flags.popup">
        <div class="_tools-avatar" @click="toCreator">
          <img :src="creator.avatarUrl" alt />
          <span>关注</span>
        </div>
        <ul class="_tools-items">
          <li @click="praiseHanlder">
            <i class="fa fa-thumbs-up" :class="{'praised-active':flags.isPraised}"></i>
            {{detail.praisedCount}}
          </li>
          <li @click="flags.popup=true">
            <i class="fa fa-commenting"></i>
            {{detail.commentCount}}
          </li>
          <li>
            <i class="fa fa-share-alt"></i>
            {{detail.shareCount}}
          </li>
        </ul>
      </aside>
    </transition>

    <footer class="_creator" v-show="flags.contain && !flags.popup">
      <b @click="toCreator">@{{creator.nickname}}</b>
      <p class="paragraph-truncate">{{detail.title}}</p>
    </footer>
    <VdPopup :visiable="flags.popup" :videoId="detail.vid" />
  </div>
</template>

<script>
import SingleVideo from "comps/video/SingleVideo";
import VdPopup from "./child/VdPopup";
export default {
  name: "videodetail",
  components: {
    SingleVideo,
    VdPopup
  },
  data() {
    return {
      flags: {
        contain: false,
        isPraised: false,
        popup: false
      }
    };
  },
  computed: {
    detail() {
      let val = this.$route.query.detail;
      return typeof val === "object" ? val : false;
    },
    enterPos() {
      let val = this.$route.query.pos;
      return typeof val === "object" ? val : false;
    },
    creator() {
      return this.detail.creator;
    }
  },
  mounted() {
    if (!this.detail) return this.$router.replace("/home");
    this.anmCounter();
    setTimeout(e => (this.flags.contain = true), 500);
  },
  methods: {
    anmCounter() {
      if (!this.enterPos) return;
      let { contain } = this.$refs;
      this.anmHandler(contain, this.enterPos, contain.getBoundingClientRect());
    },
    anmHandler(dom, pos, oldpos) {
      let [xdistance, ydistance] = [pos.x - oldpos.x, pos.y - oldpos.y];
      let keyframes = [
        {
          transform: `translate3d(${xdistance}px, ${ydistance}px,0)`,
          width: `${pos.width}px`,
          height: `${pos.height}px`
        },
        {
          transform: "translate3d(0,0,0)",
          width: `${oldpos.width}px`,
          height: `${oldpos.height}px`
        }
      ];
      const options = {
        duration: 400
      };
      dom.animate(keyframes, options);
    },
    praiseHanlder() {
      this.flags.isPraised = !this.flags.isPraised;
    },
    closePopup() {
      this.flags.popup = false;
    },
    toCreator() {
      this.toMainPage("/home/userdetail", this.creator.userId);
    }
  }
};
</script>
<style lang="less" scoped>
@import "~styles/default/video_detail";
</style>