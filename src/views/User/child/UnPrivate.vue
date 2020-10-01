<template>
  <ul class="user-news-private">
    <PrivateMsgItem v-for="(item,index) in msgs" :key="index" :info="item" />
  </ul>
</template>

<script>
import { privateMsg } from "apis/user";
import PrivateMsgItem from "comps/item/PrivateMsgItem";
export default {
  name: "UserNewsPrivate",
  components: {
    PrivateMsgItem
  },
  props: {},
  data() {
    return {
      msgs: []
    };
  },
  computed: {},
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      privateMsg().then(res => {
        this.msgs = res.data.msgs;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-news-private {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  & > li:last-child {
    margin-bottom: 220px;
  }
}
</style>