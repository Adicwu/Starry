<template>
  <ul class="user-news-comments">
    <!-- <PrivateMsgItem v-for="(item,index) in msgs" :key="index" :info="item" /> -->
    <EmptyTextBox text="暂时还没有收到评论嗷" v-if="comments.length===0" />
  </ul>
</template>

<script>
import { commentsMsg } from "apis/user";
import PrivateMsgItem from "comps/item/PrivateMsgItem";
export default {
  name: "UserNewsComments",
  components: {
    PrivateMsgItem
  },
  props: {},
  inject: ["user"],
  data() {
    return {
      comments: []
    };
  },
  computed: {},
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      commentsMsg(this.user.userid).then(res => {
        this.comments = res.data.comments;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-news-comments {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  & > li:last-child {
    margin-bottom: 220px;
  }
}
</style>