<template>
  <ScrollXBlock v-if="loadflag" class="rmd-radiostation" title="推荐电台" :more="toMore">
    <CircleCard
      slot="card"
      v-for="(item, index) in info"
      :cover="item.picUrl"
      :name="item.name"
      :msg="item.copywriter"
      :key="index"
      @click.native="toMain(item.id)"
    />
  </ScrollXBlock>
</template>

<script>
import { rmdRadiostation } from "apis/else";
import ScrollXBlock from "comps/block/ScrollXBlock";
import CircleCard from "comps/card/CircleCard";
export default {
  name: "exrmdradiosstation",
  components: {
    ScrollXBlock,
    CircleCard
  },
  data() {
    return {
      info: [],
      loadflag: false
    };
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      rmdRadiostation().then(res => {
        this.info = res.data.result;
        this.loadflag = true;
      });
    },
    toMore() {
      this.$router.push("/home/djsquare");
    },
    toMain(id) {}
  }
};
</script>

<style lang="less" scoped>
.rmd-radiostation {
  margin-bottom: 30px;
}
</style>
