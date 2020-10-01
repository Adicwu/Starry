<template>
  <ul class="user-friend-follows">
    <UserItem v-for="(item,index) in follows" followed :key="index" :detail="item" />
    <EmptyTextBox text="暂时还没有粉丝嗷" v-if="follows.length===0" />
  </ul>
</template>

<script>
import { userFollows } from "apis/user";
import UserItem from "comps/item/UserItem";
export default {
  name: "UfFollows",
  components: {
    UserItem
  },
  props: {},
  inject: ["user"],
  data() {
    return {
      follows: []
    };
  },
  computed: {},
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      userFollows(this.user.userid).then(res => {
        this.follows = res.data.follow;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-friend-follows {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  & > li:last-child {
    margin-bottom: 220px;
  }
}
</style>