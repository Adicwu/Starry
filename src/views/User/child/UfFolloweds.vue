<template>
  <ul class="user-friend-followeds">
    <UserItem v-for="(item,index) in followeds" followed :key="index" :detail="item" />
    <EmptyTextBox text="暂时还没有关注人嗷" v-if="followeds.length===0" />
  </ul>
</template>

<script>
import { userFolloweds } from "apis/user";
import UserItem from "comps/item/UserItem";
export default {
  name: "UfFolloweds",
  components: {
    UserItem
  },
  props: {},
  inject: ["user"],
  data() {
    return {
      followeds: []
    };
  },
  computed: {},
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      userFolloweds(this.user.userid).then(res => {
        this.followeds = res.data.followeds;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-friend-followeds {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  & > li:last-child {
    margin-bottom: 220px;
  }
}
</style>