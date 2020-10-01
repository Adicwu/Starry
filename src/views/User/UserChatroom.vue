<template>
  <div class="user-chatroom">
    <BreakHeader title="我的消息" class="_header" color="#000" />
    <div class="_contain"></div>
    <TabBarReply/>
  </div>
</template>

<script>
import TabBarReply from 'comps/form/TabBarReply'
export default {
  name: "UserChatroom",
  components: {
      TabBarReply
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.user-chatroom {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 800;
  overflow: hidden;
  z-index: 9999;
  ._contain{
      width: 100%;
      height: calc(100% - 48px);
  }
}
</style>