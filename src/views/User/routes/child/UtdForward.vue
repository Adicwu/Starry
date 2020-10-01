<template>
  <div class="user-trend-detail-forward">
    <ul class="_contain">
      <CommentlistCard v-for="item in forwards" :key="item.commentId" :info="item" />
      <li class="_contain-none" v-if="!hasForward">暂时还没有转发嗷</li>
    </ul>
  </div>
</template>

<script>
import { eventChat } from "apis/user";
import CommentlistCard from "comps/card/CommentlistCard";
export default {
  name: "usertrenddetailforward",
  components: {
    CommentlistCard
  },
  props: {
    detail: Object
  },
  data() {
    return {
      forwards: []
    };
  },
  computed: {
    threadId() {
      let val = this.detail;
      return val ? val.info.threadId : false;
    },
    hasForward() {
      return this.forwards.length > 0;
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
.user-trend-detail-forward {
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