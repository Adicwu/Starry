<template>
  <div class="mv-detail" v-if="loadFlag" ref="contain">
    <div class="_player">
      <transition leave-active-class="animated fadeOut">
        <div class="_player-cover" ref="cover" v-if="!player.canplay">
          <img :src="mvInfo.cover" alt />
        </div>
      </transition>
      <AdVideo :src="mvUrl" :title="mvInfo.name" @canplay="videoCanPlay" v-show="elseloadFlag" />
    </div>
    <transition leave-active-class="animated fadeOut">
      <div class="_info" v-show="elseloadFlag">
        <div class="_info-sname">
          <p ref="sname">{{ mvInfo.name }}</p>
        </div>
        <div class="_info-singer">
          <span ref="singer">{{ mvInfo.artistName }}</span>
        </div>
        <div
          class="_summary-switch fa"
          :class="[summarySwitch ? 'fa-caret-up' : 'fa-caret-down']"
          @click="summarySwitch = !summarySwitch"
        ></div>
      </div>
    </transition>
    <div class="_summary" v-show="summarySwitch">
      <ul>
        <li>{{ mvInfo.playCount }}次观看</li>
      </ul>
      <p>{{ mvInfo.publishTime }} 发布</p>
      <p>{{ mvInfo.desc }}</p>
    </div>
    <transition leave-active-class="animated fadeOut">
      <div class="_tools" v-show="elseloadFlag">
        <span
          v-for="(item, index) in tools"
          class="van-icon"
          :key="index"
          :class="item.icon"
        >{{ item.count }}</span>
      </div>
    </transition>

    <MdRelated v-if="elseloadFlag" />
    <MdComment v-if="elseloadFlag" />
  </div>
</template>

<script>
import { mvDetail } from "apis/mv";
import AdVideo from "comps/video/AdVideo";
import MdRelated from "./child/MdRelated";
import MdComment from "./child/MdComment";
export default {
  name: "mvdetail",
  components: {
    AdVideo,
    MdRelated,
    MdComment
  },
  data() {
    return {
      info: [],
      loadFlag: false,
      elseloadFlag: false,
      player: {
        canplay: false
      },
      tools: [
        {
          icon: "van-icon-good-job-o",
          count: 0
        },
        {
          icon: "van-icon-add-o",
          count: 0
        },
        {
          icon: "van-icon-chat-o",
          count: 0
        },
        {
          icon: "van-icon-fire-o",
          count: 0
        }
      ],
      summarySwitch: false
    };
  },
  computed: {
    mvId() {
      return this.$route.query.id;
    },
    mvInfo() {
      return this.info[0].data.data;
    },
    mvUrl() {
      return this.info[1].data.data.url;
    },
    coverPos() {
      return this.$route.query.cover;
    },
    containPos() {
      return this.$route.query.contain;
    },
    hasPos() {
      return [this.containPos, this.coverPos].every(
        item => typeof item === "object"
      );
    }
  },
  watch: {
    mvId() {
      this.reload();
    }
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    reload() {
      this.loadFlag = false;
      this.$nextTick(this.mainRequest);
    },
    mainRequest() {
      mvDetail(this.mvId).then(res => {
        this.info = res;
        this.toolsData(res[2]);
        this.loadFlag = true;
        this.$nextTick(this.anmCounter);
        setTimeout(() => (this.elseloadFlag = true), 800);
      });
    },
    videoCanPlay(val) {
      this.player.canplay = val;
    },
    toolsData(rel) {
      let { likedCount, commentCount, shareCount } = rel.data,
        arr = [likedCount, 0, commentCount, shareCount];
      this.tools = this.tools.map((item, index) => {
        item.count = arr[index];
        return item;
      });
    },
    anmCounter() {
      if (!this.hasPos) return;
      let { cover, contain } = this.$refs;
      let list = [
        {
          ref: cover,
          pos: this.coverPos,
          oldpos: cover.getBoundingClientRect()
        },
        {
          ref: contain,
          pos: this.containPos,
          oldpos: contain.getBoundingClientRect()
        }
      ];
      let keyframes = [
        {
          keyframe: [
            {
              width: list[0].pos.width + "px"
            },
            {
              width: list[0].oldpos.width + "px"
            }
          ]
        },
        {
          keyframe: [
            {
              width: list[1].pos.width + "px"
            },
            {
              width: list[1].oldpos.width + "px"
            }
          ]
        }
      ];
      list = list.map((item, index) => Object.assign(item, keyframes[index]));
      list.forEach(item =>
        this.anmHandler(item.ref, item.pos, item.oldpos, item.keyframe || [])
      );
    },
    anmHandler(dom, pos, oldpos, keyframe) {
      let [xdistance, ydistance] = [pos.x - oldpos.x, pos.y - oldpos.y];
      let keyframes = [
        {
          transform: `translate3d(${
            xdistance > 0 ? xdistance : pos.right - oldpos.right
          }px, ${ydistance}px,0)`,
          height: `${pos.height}px`
        },
        {
          transform: "translate3d(0,0,0)",
          height: `${oldpos.height}px`
        }
      ];
      if (keyframe.toString())
        keyframes = keyframes.map((item, index) =>
          Object.assign(item, keyframe[index])
        );
      const options = {
        duration: 600,
        easing: "cubic-bezier(0,0,0.32,1)"
      };
      dom.animate(keyframes, options);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/default/mv_detail";
</style>
