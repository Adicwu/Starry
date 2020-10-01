<template>
  <ul class="user-news-forwards">
    <!-- <PrivateMsgItem v-for="(item,index) in msgs" :key="index" :info="item" /> -->
    <EmptyTextBox text="暂时还没有收到@嗷" v-if="forwards.length===0" />
  </ul>
</template>

<script>
import { forwardsMsg } from "apis/user";
import PrivateMsgItem from "comps/item/PrivateMsgItem";
export default {
  name: "UserNewsForwards",
  components: {
    PrivateMsgItem
  },
  props: {},
  inject: ["user"],
  data() {
    return {
      forwards: []
    };
  },
  computed: {},
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      forwardsMsg(this.user.userid).then(res => {
        this.forwards = res.data.forwards;
        console.log(res.data.forwards);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-news-forwards {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  & > li:last-child {
    margin-bottom: 220px;
  }
}
</style>