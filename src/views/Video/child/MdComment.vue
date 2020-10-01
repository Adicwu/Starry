<template>
  <div class="mv-detail_comment">
    <div class="_hot" v-if="hasHotComments">
      <p>精彩评论</p>
      <ul>
        <CommentlistCard v-for="(item, index) in list.hotComments" :key="index" :info="item" />
      </ul>
    </div>
    <div class="_top" v-if="hasTopComments">
      <p>最新评论</p>
      <ul>
        <CommentlistCard v-for="(item, index) in list.topComments" :key="index" :info="item" />
      </ul>
    </div>
    <div class="_new">
      <p>最新评论</p>
      <ul>
        <CommentlistCard v-for="(item, index) in list.comments" :key="index" :info="item" />
      </ul>
    </div>
  </div>
</template>

<script>
import { mvComment } from "apis/mv";
import { hotComment } from "apis/else";
import CommentlistCard from "comps/card/CommentlistCard";
export default {
  name: "mvdetailcomment",
  components: {
    CommentlistCard
  },
  data() {
    return {
      list: {
        comments: [],
        hotComments: [],
        topComments: []
      },
      loadFlag: false
    };
  },
  computed: {
    hasHotComments() {
      return this.list.hotComments.length > 0;
    },
    hasTopComments() {
      return this.list.topComments.length > 0;
    }
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      let id = this.$parent.mvId;
      Promise.all([mvComment(id), hotComment(id, 1, 4)]).then(res => {
        this.list.comments = res[0].data.comments;
        this.list.hotComments = res[1].data.hotComments;
        this.list.topComments = res[1].data.topComments;
        this.loadFlag = true;
      });
    }
  }
};
</script>

<style scoped lang="less">
.mv-detail_comment {
  position: relative;
  z-index: 1;
  border-top: 8px solid #f5f5f5;
  width: 100%;
  & > div {
    p {
      font-size: 14px;
      padding: 16px 0 0 16px;
      font-weight: 800;
    }
  }
}
</style>
