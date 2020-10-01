<template>
  <div class="user-trend-detail-chat">
    <div class="_title">
      <b>最新评论</b>
      <a>{{comments.length}}</a>
    </div>
    <ul class="_contain">
      <CommentlistCard
        v-for="item in comments"
        :key="item.commentId"
        :info="item"
        :pageId="creator"
      />
      <li class="_contain-none" v-if="!hasComment">可可爱爱，没有评论</li>
    </ul>
  </div>
</template>

<script>
import { eventChat } from "apis/user";
import CommentlistCard from "comps/card/CommentlistCard";
export default {
  name: "usertrenddetailchat",
  components: {
    CommentlistCard
  },
  props: {
    detail: {
        type: Object,
        default: {}
    }
  },
  data() {
    return {
      comments: []
    };
  },
  computed: {
    creator() {
      return this.detail.user.userId;
    },
    threadId() {
      return this.detail.info.threadId || false;
    },
    hasComment() {
      return this.comments.length > 0;
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
      if (!this.threadId) return;
      eventChat(this.threadId).then(res => {
        this.comments = res.data.comments;
        console.log(res.data)
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-trend-detail-chat {
  min-height: calc(100vh - 103px);
  margin-bottom: 100px;
  ._title {
    margin: 16px;
    font-size: 14px;
    a {
      font-size: 10px;
      color: #777;
      margin-left: 4px;
    }
  }
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