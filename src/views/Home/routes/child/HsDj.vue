<template>
  <BotLoadRequest
    class="home-search-album"
    offset
    :perpage="12"
    :request="mainRequset"
    resword="djRadios"
    v-loading="!flags.load"
    @firstLoad="firstLoad"
  >
    <template #contain="{ curdata }">
      <DjradioItem v-for="(item, index) in curdata" :key="index" :info="item" />
    </template>
  </BotLoadRequest>
</template>

<script>
import { mixSearch } from "apis/else";
import DjradioItem from "comps/item/DjradioItem";

export default {
  name: "homesearchmv",
  components: {
    DjradioItem,
  },
  props: {
    keyword: String,
  },
  data() {
    return {
      djRadios: [],
      flags: {
        load: false,
      },
    };
  },
  mounted() {
    this.mainRequset();
  },
  methods: {
    mainRequset(...args) {
      return new Promise((resolve) => {
        mixSearch(this.keyword, 1009, ...args).then((res) => {
          let { djRadios } = res.data.result;
          resolve({
            data: { djRadios },
          });
        });
      });
    },
    firstLoad(res) {
      this.flags.load = res;
    },
  },
};
</script>
<style lang="less" scoped>
.home-search-album {
  width: 100%;
}
</style>