<template>
  <div class="user-trend-detail-praise">
    <ul class="_contain">
      <CommentlistCard v-for="item in praises" :key="item.commentId" :info="item" />
      <li class="_contain-none" v-if="!hasPraise">暂时还没有点赞嗷</li>
    </ul>
  </div>
</template>

<script>
import CommentlistCard from "comps/card/CommentlistCard";
export default {
  name: "usertrenddetailpraise",
  components: {
    CommentlistCard
  },
  props: {
    detail: Object
  },
  data() {
    return {
      praises: []
    };
  },
  computed: {
    threadId() {
      let val = this.detail;
      return val ? val.info.threadId : false;
    },
    hasPraise() {
      return this.praises.length > 0;
    }
  },
  watch: {
    threadId: {
      immediate: true,
      handler(val) {
        this.mainRequset();
      }
    }
  },
  methods: {
    mainRequset() {
      //   if (!this.threadId) return;
      //   eventChat(this.threadId).then(res => {
      //     this.comments = res.data.comments;
      //   });
    }
  }
};
</script>
<style lang="less" scoped>
.user-trend-detail-praise {
  min-height: calc(100vh - 103px);
  margin-bottom: 100px;
  ._contain {
    ._contain-none {
      margin: 40px 20px;
      font-size: 14px;
      color: #777;
      text-align: center;
    }
  }
}
</style>