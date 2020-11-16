<template>
  <ul class="user-news-notices">
    <!-- <PrivateMsgItem v-for="(item,index) in msgs" :key="index" :info="item" /> -->
    <EmptyTextBox text="暂时还没有收到通知嗷" v-if="notices.length===0" />
  </ul>
</template>

<script>
import { noticesMsg } from "apis/user";
import PrivateMsgItem from "comps/item/PrivateMsgItem";
export default {
  name: "UserNewsNotices",
  components: {
    PrivateMsgItem
  },
  props: {},
  inject: ["user"],
  data() {
    return {
      notices: []
    };
  },
  computed: {},
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      noticesMsg(this.user.userid).then(res => {
        this.notices = res.data.notices;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-news-notices {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  & > li:last-child {
    margin-bottom: 220px;
  }
}
</style>