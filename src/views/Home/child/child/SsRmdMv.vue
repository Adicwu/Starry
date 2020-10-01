<template>
  <div class="skysquare-rmdmv">
    <div class="_title">
      <b>推荐Mv</b>
    </div>
    <Scroll scrollX class="_contain">
      <MvRmdCard v-for="(item, index) in rmdlist" :info="item" :key="index" />
    </Scroll>
  </div>
</template>

<script>
import { rmdMv } from "apis/mv";
import MvRmdCard from "comps/card/MvRmdCard";
export default {
  name: "ssrmdmv",
  components: {
    MvRmdCard
  },
  data() {
    return {
      rmdlist: []
    };
  },
  mounted() {
    rmdMv().then(res => {
      this.rmdlist = res.data.result;
    });
  }
};
</script>

<style lang="less" scoped>
.skysquare-rmdmv {
  margin-top: 10px;
  width: 100%;
  color: #fff;
  ._title {
    margin: 0 16px;
    b {
      font-size: 1.5rem;
    }
  }
  ._contain {
    margin-top: 26px;
    width: 100%;
  }
}
</style>
