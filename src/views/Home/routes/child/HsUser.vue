<template>
  <div class="home-search-user">
    <UserItem v-for="(item,index) in users" :key="index" :detail="item" />
  </div>
</template>

<script>
import UserItem from "comps/item/UserItem";
import { mixSearch } from "apis/else";
export default {
  name: "homesearchuser",
  components: {
    UserItem
  },
  props: {
    keyword: String
  },
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset() {
      mixSearch(this.keyword, 1002, 30).then(res => {
        this.users = res.data.result.userprofiles;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home-search-user {
  width: 100%;
}
</style>