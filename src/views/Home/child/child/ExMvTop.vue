<template>
  <ScrollXBlock v-if="loadflag" class="mv-top-six" title="最热MV" :more="toMain">
    <ViewsBlockCard
      slot="card"
      v-for="(item, index) in info"
      :id="item.id"
      :cover="item.cover+imgSize"
      :name="item.name"
      :elses="item.playCount"
      :key="index"
    />
  </ScrollXBlock>
</template>

<script>
import { mvTop } from "apis/else";
import ScrollXBlock from "comps/block/ScrollXBlock";
import ViewsBlockCard from "comps/card/ViewsBlockCard";
export default {
  name: "exrmvtopsix",
  components: {
    ScrollXBlock,
    ViewsBlockCard
  },
  data() {
    return {
      info: [],
      loadflag: false,
      imgSize: "?param=300y370"
    };
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      mvTop(6).then(res => {
        this.info = res.data.data;
        this.loadflag = true;
      });
    },
    toMain() {
      this.$router.push({
        path: "/home/mvsquare",
        query: {
          type: 0
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mv-top-six {
  margin: 30px 0;
}
</style>
