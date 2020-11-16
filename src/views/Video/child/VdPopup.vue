<template>
  <div class="video-detail-popup" :class="{ _active: visiable }">
    <div class="_popup-title">
      评论
      <span>({{ 96 }})</span>
    </div>
    <BotLoadRequest
      v-if="visiable"
      class="_popup-contain"
      offset
      :request="moreComment"
      resword="comments"
    >
      <div class="_hot" v-if="hasHotComments">
        <p>精彩评论</p>
        <ul>
          <CommentlistCard
            v-for="(item, index) in comment.hot"
            :key="index"
            :info="item"
          />
        </ul>
      </div>
      <template #contain="{ curdata }">
        <div class="_def" v-if="hasDefComments">
          <p>最新评论</p>
          <ul>
            <CommentlistCard
              v-for="(item, index) in curdata"
              :key="index"
              :info="item"
            />
          </ul>
        </div>
      </template>
    </BotLoadRequest>
  </div>
</template>

<script>
import { videoComment } from "apis/video";
import CommentlistCard from "comps/card/CommentlistCard";
export default {
  name: "videodetailpopup",
  components: {
    CommentlistCard,
  },
  props: {
    visiable: {
      type: Boolean,
      default: false,
    },
    videoId: String,
  },
  watch: {},
  data() {
    return {
      comment: {
        top: [],
        def: [],
        hot: [],
      },
    };
  },
  computed: {
    hasDefComments() {
      return this.comment.def.length > 0;
    },
    hasHotComments() {
      return this.comment.hot.length > 0;
    },
    hasTopComments() {
      return this.comment.top.length > 0;
    },
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset() {
      videoComment(this.videoId).then((res) => {
        this.initComment(res.data);
      });
    },
    moreComment(...args) {
      return videoComment(this.videoId, ...args);
    },
    initComment(val) {
      let { comments, hotComments, topComments } = val;
      this.comment.hot = hotComments.slice(0, 5);
      this.comment.def = comments;
    },
    close() {
      console.log("close");
      this.$emit("update:visiable", false);
    },
  },
};
</script>
<style lang="less" scoped>
.video-detail-popup {
  position: relative;
  display: grid;
  grid-template-rows: 45px 1fr;
  width: 100%;
  height: 70%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #fff;
  z-index: 10;
  transform: translateY(100vh);
  transition: transform 0.3s;

  &._active {
    transform: translateY(30vh);
  }
  ._popup-title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 16px;
    font-weight: 700;
    font-size: 18px;
    border-bottom: 1px solid #eee;
    span {
      line-height: 22px;
    }
  }
  ._popup-contain {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    ._hot,
    ._def {
      p {
        font-size: 14px;
        padding: 16px 0 0 16px;
        font-weight: 800;
      }
    }
  }
}
</style>